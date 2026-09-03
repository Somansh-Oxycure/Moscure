// src/pages/AdminOrdersPage.jsx
// Password-protected admin panel to view all orders and update status/vendor ID.
// Authentication is a simple hardcoded password check on client + the service role
// key is ONLY used in the Express backend (never exposed here).
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Lock, Loader2, RefreshCw, ChevronDown, Package, Truck, CheckCircle2, Clock, AlertCircle, Save, Search, X, Download, History } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'unpaid',     label: 'Unpaid' },
  { value: 'confirmed',  label: 'Confirmed' },
  { value: 'packed',     label: 'Packed' },
  { value: 'dispatched', label: 'Out for Delivery' },
  { value: 'delivered',  label: 'Delivered' },
]

const STATUS_COLORS = {
  unpaid:     'text-red-500',
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
    <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden hover:bg-white/5 transition-colors">
      {/* Row header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full px-5 py-4 flex items-center gap-4 text-left transition-colors"
      >
        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-xs font-mono font-bold ${STATUS_COLORS[order.status]}`}>
                ● {STATUS_OPTIONS.find(s => s.value === order.status)?.label}
              </span>
            </div>
            <p className="text-xs text-white/40 font-mono">ID: {order.id.slice(0,8)}</p>
          </div>
          <div>
            <p className="text-sm text-white/80 font-medium truncate">{order.address?.name}</p>
            <p className="text-xs text-white/40 truncate">{order.address?.email}</p>
          </div>
          <div>
             <span className="text-xs text-white/40 font-mono block">{createdAt}</span>
             <p className="text-xs text-white/50 truncate mt-0.5">
              {order.items?.length} item(s)
            </p>
          </div>
           <div className="text-right flex-shrink-0 md:text-left">
            <p className="font-display text-base text-white">₹{totalINR}</p>
          </div>
        </div>
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
          <ChevronDown size={16} className={`text-white/60 transition-transform ${expanded ? 'rotate-180' : ''}`} />
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
            <div className="px-5 pb-5 border-t border-white/8 pt-6">
              
              {/* Tables Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
                {/* Customer Details Table */}
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden h-full">
                  <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                    <h3 className="text-sm font-mono text-white/70 uppercase tracking-wider">Customer Details</h3>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-white/5">
                        <th className="py-3 px-4 text-xs text-white/40 font-mono font-normal w-1/3">Name</th>
                        <td className="py-3 px-4 text-sm text-white/80">{order.address?.name}</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <th className="py-3 px-4 text-xs text-white/40 font-mono font-normal">Email</th>
                        <td className="py-3 px-4 text-sm text-white/80">{order.address?.email}</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <th className="py-3 px-4 text-xs text-white/40 font-mono font-normal">Phone</th>
                        <td className="py-3 px-4 text-sm text-white/80">{order.address?.phone}</td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-xs text-white/40 font-mono font-normal align-top">Address</th>
                        <td className="py-3 px-4 text-sm text-white/80">
                          {order.address?.line1}{order.address?.line2 ? `, ${order.address.line2}` : ''}<br />
                          {order.address?.city}, {order.address?.state} – {order.address?.pincode}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Order Items & Payment Table */}
                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                      <h3 className="text-sm font-mono text-white/70 uppercase tracking-wider">Order Items</h3>
                    </div>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="py-2 px-4 text-xs text-white/40 font-mono font-normal">Item</th>
                          <th className="py-2 px-4 text-xs text-white/40 font-mono font-normal text-right">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item, idx) => (
                          <tr key={idx} className="border-b border-white/5 last:border-0">
                            <td className="py-2.5 px-4 text-sm text-white/80">{item.name}</td>
                            <td className="py-2.5 px-4 text-sm text-white/80 text-right font-mono">{item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                     <div className="bg-white/5 px-4 py-2.5 border-b border-white/10">
                      <h3 className="text-xs font-mono text-white/70 uppercase tracking-wider">Payment Details</h3>
                    </div>
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        <tr className="border-b border-white/5">
                          <th className="py-2 px-4 text-xs text-white/40 font-mono font-normal w-1/3">Razorpay Order</th>
                          <td className="py-2 px-4 text-xs text-white/70 font-mono">{order.razorpay_order_id ?? '—'}</td>
                        </tr>
                        <tr>
                          <th className="py-2 px-4 text-xs text-white/40 font-mono font-normal">Payment ID</th>
                          <td className="py-2 px-4 text-xs text-white/70 font-mono">{order.razorpay_payment_id ?? '—'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Status History Timeline */}
              {order.status_history && order.status_history.length > 0 && (
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-6">
                  <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
                    <History size={16} className="text-white/40" />
                    <h3 className="text-sm font-mono text-white/70 uppercase tracking-wider">Status History</h3>
                  </div>
                  <div className="p-5 flex gap-4 overflow-x-auto hide-scrollbar">
                    {order.status_history.map((hist, idx) => {
                       const histStatus = STATUS_OPTIONS.find(s => s.value === hist.status)
                       const histDate = new Date(hist.timestamp).toLocaleDateString('en-IN', {
                         day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                       })
                       return (
                         <div key={idx} className="flex-shrink-0 bg-white/5 border border-white/10 rounded-lg p-3 min-w-[140px]">
                           <div className={`text-xs font-mono font-bold mb-1 ${STATUS_COLORS[hist.status]}`}>
                             ● {histStatus?.label || hist.status}
                           </div>
                           <div className="text-xs text-white/40 font-mono">
                             {histDate}
                           </div>
                         </div>
                       )
                    })}
                  </div>
                </div>
              )}

              {/* Admin Controls Area */}
              <div className="bg-[#0a0a0a] rounded-xl border border-white/10 p-5">
                 <h3 className="text-sm font-mono text-gradientcyan uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Save size={16} /> Admin Controls
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                  <div>
                    <label className="text-xs text-white/40 font-mono uppercase tracking-wider block mb-2">Update Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gradientcyan/50 transition-colors"
                    >
                      {STATUS_OPTIONS.map(s => {
                        const statusLevels = { unpaid: 0, confirmed: 1, packed: 2, dispatched: 3, delivered: 4 }
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
                    <label className="text-xs text-white/40 font-mono uppercase tracking-wider block mb-2">Vendor Order ID</label>
                    <input
                      value={vendorId}
                      onChange={e => setVendorId(e.target.value)}
                      placeholder="e.g. VEND-98765"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gradientcyan/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-mono uppercase tracking-wider block mb-2">Est. Delivery Date</label>
                    <div className="flex gap-3">
                      <input
                        type="date"
                        value={estDelivery}
                        onChange={e => setEstDelivery(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gradientcyan/50 transition-colors min-w-[130px]"
                      />
                      <motion.button
                        whileHover={{ scale: isDirty ? 1.05 : 1 }}
                        whileTap={{ scale: isDirty ? 0.95 : 1 }}
                        onClick={handleSave}
                        disabled={!isDirty || saving}
                        className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg text-sm font-mono transition-all shrink-0 ${
                          saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          isDirty ? 'bg-gradientcyan text-background' :
                          'bg-white/5 text-white/25 cursor-not-allowed border border-transparent'
                        }`}
                      >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : (saved ? <CheckCircle2 size={16} /> : <Save size={16} />)}
                        <span className="hidden sm:inline">{saved ? 'Saved' : saving ? 'Saving…' : 'Save'}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
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
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (filtered.length === 0) return
                const headers = ['Order ID', 'Date', 'Status', 'Customer Name', 'Email', 'Phone', 'Address', 'Items', 'Total (INR)']
                const csvRows = filtered.map(o => {
                  const date = new Date(o.created_at).toLocaleString('en-IN')
                  const address = `${o.address?.line1 || ''} ${o.address?.line2 || ''}, ${o.address?.city || ''}, ${o.address?.state || ''} - ${o.address?.pincode || ''}`
                  const items = o.items?.map(i => `${i.name} (x${i.qty})`).join('; ')
                  const amount = (o.amount_paise / 100).toFixed(2)
                  return [o.id, date, o.status, o.address?.name || '', o.address?.email || '', o.address?.phone || '', address, items, amount].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
                })
                const csvContent = [headers.join(','), ...csvRows].join('\n')
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 text-sm text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={13} /> Export CSV
            </button>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-2 transition-colors font-mono"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
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
