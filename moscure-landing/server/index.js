// server/index.js
// Express API server for Moscure — handles Razorpay payment flow and admin routes.
// Runs on port 3001. Nginx proxies /api/* from port 80 → port 3001.

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import Razorpay from 'razorpay'

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

app.use(express.json())

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

// ─── Supabase admin client (service role — only used server-side) ─────────────
let supabaseAdmin = null
async function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin
  const { createClient } = await import('@supabase/supabase-js')
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase URL or Key missing in server environment.')
  }
  supabaseAdmin = createClient(url, key)
  return supabaseAdmin
}

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: isTestMode ? 'test' : 'live', timestamp: new Date().toISOString() })
})

// ─── POST /api/create-order ───────────────────────────────────────────────────
// Creates a Razorpay order — must be called from the frontend before opening checkout.
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    const options = {
      amount: Math.round(amount * 100), // convert INR → paise
      currency,
      receipt: `moscure_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (err) {
    console.error('[create-order]', err)
    res.status(500).json({ error: err.message || 'Failed to create order' })
  }
})

// ─── POST /api/verify-payment ─────────────────────────────────────────────────
// Verifies Razorpay payment signature using HMAC SHA256.
app.post('/api/verify-payment', (req, res) => {
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
      res.json({ success: true })
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature' })
    }
  } catch (err) {
    console.error('[verify-payment]', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── GET /api/admin/orders ────────────────────────────────────────────────────
// Returns all orders — admin only. Uses Supabase service role to bypass RLS.
app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const db = await getSupabaseAdmin()
    const { data, error } = await db
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('[admin/orders GET]', err)
    res.status(500).json({ error: err.message })
  }
})

// ─── PATCH /api/admin/orders/:id ─────────────────────────────────────────────
// Updates order status, vendor_order_id, and estimated_delivery — admin only.
app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { status, vendor_order_id, estimated_delivery } = req.body

    const allowedStatuses = ['pending', 'confirmed', 'packed', 'dispatched', 'delivered']
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' })
    }

    const db = await getSupabaseAdmin()

    if (status !== undefined) {
      const { data: currentOrder, error: fetchErr } = await db
        .from('orders')
        .select('status')
        .eq('id', id)
        .single()

      if (fetchErr) throw fetchErr

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

    const { data, error } = await db
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('[admin/orders PATCH]', err)
    res.status(500).json({ error: err.message })
  }
})

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Moscure API] Server running on port ${PORT}`)
})
