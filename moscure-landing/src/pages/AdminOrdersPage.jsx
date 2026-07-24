// src/pages/AdminOrdersPage.jsx
// Password-protected admin panel to view all orders and update status/vendor ID.
// Authentication is a simple hardcoded password check on client + the service role
// key is ONLY used in the Express backend (never exposed here).
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Lock, Loader2, RefreshCw, ChevronDown, Package, Truck, CheckCircle2, Clock, AlertCircle, Save, Search, X } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'pending',    label: 'Pending' },
  { value: 'confirmed',  label: 'Confirmed' },
  { value: 'packed',     label: 'Packed' },
  { value: 'dispatched', label: 'Out for Delivery' },
  { value: 'delivered',  label: 'Delivered' },
]

const STATUS_COLORS = {
  pending:    'text-yellow-400',
  confirmed:  'text-cyan-400',
  packed:     'text-blue-400',
  dispatched: 'text-purple-400',
  delivered:  'text-green-400',
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple client-side check — the actual admin API routes are protected server-side too
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      onLogin()
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-gradientcyan" />
          </div>
          <h1 className="font-display text-3xl text-white">Admin Panel</h1>
          <p className="text-sm text-white/40 mt-1">Moscure Order Management</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/3 border border-white/8 rounded-2xl p-6">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
          />
          {error && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
          <button
            type="submit"
            className="bg-gradientcyan text-background font-display text-lg tracking-wider py-3 rounded-xl"
          >
            Sign In →
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Order Row ─────────────────────────────────────────────────────────────────
function OrderRow({ order, onSave }) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(order.status)
  const [vendorId, setVendorId] = useState(order.vendor_order_id ?? '')
  const [estDelivery, setEstDelivery] = useState(order.estimated_delivery ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const createdAt = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
  const totalINR = (order.amount_paise / 100).toLocaleString('en-IN')

  const handleSave = async () => {
    setSaving(true)
    await onSave(order.id, { status, vendor_order_id: vendorId || null, estimated_delivery: estDelivery || null })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const isDirty = status !== order.status || vendorId !== (order.vendor_order_id ?? '') || estDelivery !== (order.estimated_delivery ?? '')

  return (
    <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-white/3 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs font-mono font-bold ${STATUS_COLORS[status]}`}>
              ● {STATUS_OPTIONS.find(s => s.value === status)?.label}
            </span>
            <span className="text-xs text-white/30 font-mono">{createdAt}</span>
          </div>
          <p className="text-sm text-white/70 mt-0.5 truncate">
            {order.address?.name} · {order.address?.email}
          </p>
          <p className="text-xs text-white/35 font-mono mt-0.5">
            {order.items?.map(i => `${i.name} ×${i.qty}`).join(', ')}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-base text-white">₹{totalINR}</p>
          <ChevronDown size={14} className={`text-white/30 mx-auto mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded admin controls */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/8 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping address */}
              <div>
                <p className="text-xs text-white/35 font-mono uppercase tracking-wider mb-2">Shipping Address</p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {order.address?.name}<br />
                  {order.address?.phone} · {order.address?.email}<br />
                  {order.address?.line1}{order.address?.line2 ? `, ${order.address.line2}` : ''}<br />
                  {order.address?.city}, {order.address?.state} – {order.address?.pincode}
                </p>
              </div>

              {/* Admin controls */}
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-white/35 font-mono uppercase tracking-wider block mb-1">Order Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gradientcyan/50 transition-colors"
                  >
                    {STATUS_OPTIONS.map(s => {
                      const statusLevels = { pending: 0, confirmed: 1, packed: 2, dispatched: 3, delivered: 4 }
                      const currentLevel = statusLevels[order.status] ?? 0
                      const optionLevel = statusLevels[s.value] ?? 0
                      const isDisabled = optionLevel < currentLevel

                      return (
                        <option
                          key={s.value}
                          value={s.value}
                          disabled={isDisabled}
                          className={isDisabled ? 'bg-[#0a0a0a] text-white/30' : 'bg-[#0a0a0a] text-white'}
                        >
                          {s.label} {isDisabled ? '(Locked)' : ''}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/35 font-mono uppercase tracking-wider block mb-1">Vendor Order ID</label>
                  <input
                    value={vendorId}
                    onChange={e => setVendorId(e.target.value)}
                    placeholder="e.g. VEND-98765"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/35 font-mono uppercase tracking-wider block mb-1">Estimated Delivery Date</label>
                  <input
                    type="date"
                    value={estDelivery}
                    onChange={e => setEstDelivery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gradientcyan/50 transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: isDirty ? 1.02 : 1 }}
                  whileTap={{ scale: isDirty ? 0.98 : 1 }}
                  onClick={handleSave}
                  disabled={!isDirty || saving}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-mono transition-all ${
                    saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    isDirty ? 'bg-gradientcyan text-background' :
                    'bg-white/5 text-white/25 cursor-not-allowed'
                  }`}
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
                </motion.button>
              </div>

              {/* Payment info */}
              <div className="md:col-span-2 border-t border-white/5 pt-3">
                <p className="text-xs text-white/25 font-mono">
                  Razorpay Order: {order.razorpay_order_id ?? '—'} · Payment: {order.razorpay_payment_id ?? '—'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchOrders = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'x-admin-password': import.meta.env.VITE_ADMIN_PASSWORD },
      })
      if (!res.ok) throw new Error('Failed to load orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const handleSave = async (orderId, updates) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': import.meta.env.VITE_ADMIN_PASSWORD,
        },
        body: JSON.stringify(updates),
      })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o))
    } catch (err) {
      console.error('Save error:', err)
    }
  }

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q ||
      o.address?.name?.toLowerCase().includes(q) ||
      o.address?.email?.toLowerCase().includes(q) ||
      o.address?.phone?.includes(q) ||
      o.vendor_order_id?.toLowerCase().includes(q) ||
      o.razorpay_payment_id?.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  // Stats
  const stats = STATUS_OPTIONS.map(s => ({
    ...s,
    count: orders.filter(o => o.status === s.value).length,
  }))

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-gradientcyan uppercase tracking-widest mb-1">Admin</p>
            <h1 className="font-display text-3xl text-white">Order Management</h1>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-2 transition-colors font-mono"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.value} className="bg-white/3 border border-white/8 rounded-xl p-3 text-center">
              <p className={`font-display text-2xl ${STATUS_COLORS[s.value]}`}>{s.count}</p>
              <p className="text-xs text-white/35 font-mono mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, payment ID…"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gradientcyan/50 transition-colors"
          >
            <option value="all" className="bg-[#0a0a0a]">All Statuses</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value} className="bg-[#0a0a0a]">{s.label}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 text-white/40 py-16">
            <Loader2 size={20} className="animate-spin" />
            <span className="font-mono text-sm">Loading orders…</span>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 text-red-400 text-sm">{error}</div>
        )}

        {!loading && !error && (
          <>
            <p className="text-xs text-white/30 font-mono mb-3">{filtered.length} order{filtered.length !== 1 ? 's' : ''}</p>
            <div className="flex flex-col gap-3">
              {filtered.map(order => (
                <OrderRow key={order.id} order={order} onSave={handleSave} />
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-white/30 text-sm py-12 font-mono">No orders match your filters.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminOrdersPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1')

  return (
    <>
      <Helmet>
        <title>Admin – Moscure Orders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {authed ? <AdminDashboard /> : <AdminLogin onLogin={() => setAuthed(true)} />}
    </>
  )
}
