// src/pages/MyOrdersPage.jsx
// Customer-facing order tracking page — login via Email OTP (Supabase)
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail, Package, Truck, CheckCircle2, Clock, Loader2, LogOut, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:    { label: 'Awaiting Confirmation', color: 'text-yellow-400',  bg: 'bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  confirmed:  { label: 'Order Confirmed',        color: 'text-gradientcyan', bg: 'bg-gradientcyan/10 border-gradientcyan/20', icon: CheckCircle2 },
  packed:     { label: 'Packed',                 color: 'text-blue-400',    bg: 'bg-blue-400/10 border-blue-400/20',    icon: Package },
  dispatched: { label: 'Out for Delivery',       color: 'text-purple-400',  bg: 'bg-purple-400/10 border-purple-400/20', icon: Truck },
  delivered:  { label: 'Delivered',              color: 'text-green-400',   bg: 'bg-green-400/10 border-green-400/20',  icon: CheckCircle2 },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
      <Icon size={11} /> {cfg.label}
    </span>
  )
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  const createdAt = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  const totalINR = (order.amount_paise / 100).toLocaleString('en-IN')
  const deliveryDate = order.estimated_delivery
    ? new Date(order.estimated_delivery).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    : null

  return (
    <motion.div
      layout
      className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden"
    >
      {/* Card header */}
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-white/35 font-mono mb-1">ORDER · {createdAt}</p>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={order.status} />
            {order.vendor_order_id && (
              <span className="text-xs text-white/40 font-mono">Ref: {order.vendor_order_id}</span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-lg text-white">₹{totalINR}</p>
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-xs text-white/40 hover:text-gradientcyan flex items-center gap-1 transition-colors mt-0.5"
          >
            {expanded ? 'Less' : 'Details'} {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/8 pt-4 flex flex-col gap-3">
              {/* Items */}
              <div>
                <p className="text-xs text-white/35 font-mono uppercase tracking-wider mb-2">Items Ordered</p>
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/70">{item.name} × {item.qty}</span>
                    <span className="text-white/50">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Delivery estimate */}
              {deliveryDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Truck size={13} className="text-gradientcyan" />
                  <span className="text-white/60">
                    {order.status === 'delivered' ? 'Delivered on' : 'Expected by'} <span className="text-white">{deliveryDate}</span>
                  </span>
                </div>
              )}

              {/* Shipping address */}
              {order.address && (
                <div>
                  <p className="text-xs text-white/35 font-mono uppercase tracking-wider mb-1">Shipping To</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {order.address.name}, {order.address.phone}<br />
                    {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ''}<br />
                    {order.address.city}, {order.address.state} – {order.address.pincode}
                  </p>
                </div>
              )}

              {/* Payment ID */}
              <p className="text-xs text-white/25 font-mono">
                Payment ID: {order.razorpay_payment_id ?? '—'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── OTP Login Form ───────────────────────────────────────────────────────────
function OtpLoginForm() {
  const { signInWithOtp, verifyOtp } = useAuth()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [stage, setStage] = useState('email') // 'email' | 'otp'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true); setError(null)
    const { error } = await signInWithOtp(email)
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true); setStage('otp')
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otp) return
    setLoading(true); setError(null)
    const { error } = await verifyOtp(email, otp)
    setLoading(false)
    if (error) setError('Invalid or expired code. Try again.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo / heading */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-3">My Orders</p>
          <h1 className="font-display text-4xl text-white mb-2">Track Your Order</h1>
          <p className="text-sm text-white/40">
            {stage === 'email'
              ? 'Enter your email to receive a one-time login code.'
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <AnimatePresence mode="wait">
            {stage === 'email' ? (
              <motion.form key="email-form" onSubmit={handleSendOtp} className="flex flex-col gap-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradientcyan text-background font-display text-lg tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Login Code →'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form key="otp-form" onSubmit={handleVerifyOtp} className="flex flex-col gap-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-wider">6-Digit Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    maxLength={6}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-center text-2xl font-mono tracking-[0.5em] text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full bg-gradientcyan text-background font-display text-lg tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Sign In →'}
                </motion.button>
                <button type="button" onClick={() => { setStage('email'); setOtp(''); setError(null) }}
                  className="text-xs text-white/30 hover:text-white/60 text-center transition-colors">
                  ← Use a different email
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Logged-in orders view ────────────────────────────────────────────────────
function OrdersView({ user, onSignOut }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      // Match by user_id OR matching email in shipping address
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`user_id.eq.${user.id},address->>email.eq.${user.email}`)
        .order('created_at', { ascending: false })
      setLoading(false)
      if (error) { setError(error.message); return }
      setOrders(data)
    }
    fetchOrders()
  }, [user.id, user.email])

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-gradientcyan uppercase tracking-widest mb-1">My Orders</p>
            <h1 className="font-display text-3xl text-white">Your Orders</h1>
            <p className="text-sm text-white/40 mt-1">{user.email}</p>
          </div>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-2 transition-colors font-mono"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center gap-3 text-white/40 py-12 justify-center">
            <Loader2 size={20} className="animate-spin" />
            <span className="font-mono text-sm">Loading orders…</span>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 text-red-400 text-sm">{error}</div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-20">
            <Package size={40} className="text-white/15 mx-auto mb-4" />
            <p className="text-white/40 font-mono text-sm">No orders yet.</p>
            <p className="text-white/25 text-xs mt-1">Your orders will appear here once you make a purchase.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MyOrdersPage() {
  const { user, loading, signOut } = useAuth()

  return (
    <>
      <Helmet>
        <title>My Orders – Moscure</title>
        <meta name="description" content="Track your Moscure mosquito trap orders." />
        <meta name="robots" content="noindex" />
      </Helmet>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 size={32} className="text-gradientcyan animate-spin" />
        </div>
      ) : user ? (
        <OrdersView user={user} onSignOut={signOut} />
      ) : (
        <OtpLoginForm />
      )}
    </>
  )
}
