// server/index.js
// Express API server for Moscure — handles Razorpay payment flow and admin routes.
// Runs on port 3001. Nginx proxies /api/* from port 80 → port 3001.

import './polyfill.js'

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3001

// ─── CORS config ──────────────────────────────────────────────────────────────
// In production: restrict to your actual domain
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',')
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}))

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString()
  }
}))

// ─── Razorpay client ──────────────────────────────────────────────────────────
// Toggle between test and live keys via RAZORPAY_MODE env var
const isTestMode = process.env.RAZORPAY_MODE !== 'live'
const keyId = isTestMode
  ? (process.env.RAZORPAY_TEST_KEY_ID || process.env.VITE_RAZORPAY_TEST_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID)
  : (process.env.RAZORPAY_LIVE_KEY_ID || process.env.VITE_RAZORPAY_LIVE_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID)
const keySecret = isTestMode
  ? process.env.RAZORPAY_TEST_KEY_SECRET
  : process.env.RAZORPAY_LIVE_KEY_SECRET

const razorpay = new Razorpay({
  key_id: keyId || 'dummy_key',
  key_secret: keySecret || 'dummy_secret',
})

console.log(`[Razorpay] Running in ${isTestMode ? 'TEST' : 'LIVE'} mode`)

// ─── Admin auth middleware ────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  const pwd = req.headers['x-admin-password']
  const adminPwd = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD
  if (!pwd || pwd !== adminPwd) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// ─── Supabase API Helpers (Direct REST calls to bypass heavy SDK) ────────────
function getSupabaseCreds() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase URL or Key missing in server environment.')
  return { url, key }
}

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: isTestMode ? 'test' : 'live', timestamp: new Date().toISOString() })
})

// ─── POST /api/create-order ───────────────────────────────────────────────────
// Creates a Razorpay order and saves a pending order in the database.
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', user_id, items, address, estimated_delivery } = req.body
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    const options = {
      amount: Math.round(amount * 100), // convert INR → paise
      currency,
      receipt: `moscure_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    if (items && address) {
      const { url, key } = getSupabaseCreds()
      const insertRes = await fetch(`${url}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          user_id: user_id || null,
          razorpay_order_id: order.id,
          items,
          address,
          amount_paise: order.amount,
          status: 'pending',
          estimated_delivery: estimated_delivery || null
        })
      })
      const savedOrder = await insertRes.json()
      if (!insertRes.ok) throw new Error(savedOrder.message || 'Supabase INSERT error')
      
      return res.json({ ...order, key_id: keyId, db_order_id: savedOrder[0].id })
    }

    res.json({ ...order, key_id: keyId })
  } catch (err) {
    console.error('[create-order]', err)
    res.status(500).json({ error: err.message || 'Failed to create order' })
  }
})

// ─── POST /api/verify-payment ─────────────────────────────────────────────────
// Verifies Razorpay payment signature using HMAC SHA256 and confirms order.
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment fields' })
    }

    const secret = isTestMode
      ? process.env.RAZORPAY_TEST_KEY_SECRET
      : process.env.RAZORPAY_LIVE_KEY_SECRET

    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (expectedSignature === razorpay_signature) {
      const { url, key } = getSupabaseCreds()
      const patchRes = await fetch(`${url}/rest/v1/orders?razorpay_order_id=eq.${razorpay_order_id}`, {
        method: 'PATCH',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          status: 'confirmed',
          razorpay_payment_id: razorpay_payment_id
        })
      })
      
      const patchData = await patchRes.json()
      if (!patchRes.ok) console.error('Supabase update failed in verify-payment:', patchData)

      res.json({ success: true, order: patchData?.[0] })
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature' })
    }
  } catch (err) {
    console.error('[verify-payment]', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── POST /api/razorpay-webhook ───────────────────────────────────────────────
app.post('/api/razorpay-webhook', async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!secret) return res.status(200).send('Webhook secret not configured')

    const signature = req.headers['x-razorpay-signature']
    if (!signature) return res.status(400).send('Missing signature')

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody)
      .digest('hex')

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature')
    }

    const event = req.body
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      let razorpay_order_id = event.payload?.payment?.entity?.order_id || event.payload?.order?.entity?.id
      let razorpay_payment_id = event.payload?.payment?.entity?.id

      if (razorpay_order_id) {
        const { url, key } = getSupabaseCreds()
        await fetch(`${url}/rest/v1/orders?razorpay_order_id=eq.${razorpay_order_id}`, {
          method: 'PATCH',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'confirmed',
            ...(razorpay_payment_id && { razorpay_payment_id })
          })
        })
      }
    }

    res.json({ status: 'ok' })
  } catch (err) {
    console.error('[webhook]', err)
    res.status(500).send('Webhook error')
  }
})

// ─── GET /api/admin/orders ────────────────────────────────────────────────────
app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const { url, key } = getSupabaseCreds()
    const response = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Supabase GET error')
    res.json(data)
  } catch (err) {
    console.error('[admin/orders GET]', err)
    res.status(500).json({ error: err.message })
  }
})

// ─── PATCH /api/admin/orders/:id ─────────────────────────────────────────────
app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { status, vendor_order_id, estimated_delivery } = req.body

    const allowedStatuses = ['pending', 'confirmed', 'packed', 'dispatched', 'delivered']
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' })
    }

    const { url, key } = getSupabaseCreds()

    if (status !== undefined) {
      const getRes = await fetch(`${url}/rest/v1/orders?id=eq.${id}&select=status`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
      })
      const currentData = await getRes.json()
      const currentOrder = currentData?.[0]

      const statusLevels = { pending: 0, confirmed: 1, packed: 2, dispatched: 3, delivered: 4 }
      const currentLevel = statusLevels[currentOrder?.status] ?? 0
      const newLevel = statusLevels[status] ?? 0

      if (newLevel < currentLevel) {
        return res.status(400).json({ error: `Cannot revert order status from '${currentOrder?.status}' back to '${status}'.` })
      }
    }

    const updates = {}
    if (status !== undefined) updates.status = status
    if (vendor_order_id !== undefined) updates.vendor_order_id = vendor_order_id
    if (estimated_delivery !== undefined) updates.estimated_delivery = estimated_delivery

    const patchRes = await fetch(`${url}/rest/v1/orders?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(updates)
    })
    
    const patchData = await patchRes.json()
    if (!patchRes.ok) throw new Error(patchData.message || 'Supabase PATCH error')
    
    res.json(patchData[0])
  } catch (err) {
    console.error('[admin/orders PATCH]', err)
    res.status(500).json({ error: err.message })
  }
})

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Moscure API] Server running on port ${PORT}`)
})
