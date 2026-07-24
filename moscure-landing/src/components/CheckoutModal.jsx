// src/components/CheckoutModal.jsx
// Full checkout flow: Cart → Address → Payment → Success
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, MapPin, User, Phone, Mail, Package, CheckCircle2, Loader2, AlertCircle, Truck } from 'lucide-react'
import { loadRazorpayScript } from '../lib/razorpay'
import { supabase } from '../lib/supabase'
import { getShippingInfo, getEstimatedDeliveryLabel } from '../data/shippingRates'

// ─── Step indicator ──────────────────────────────────────────────────────────
const STEPS = ['Cart', 'Delivery', 'Payment']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
            i < current ? 'bg-gradientcyan text-background' :
            i === current ? 'border-2 border-gradientcyan text-gradientcyan' :
            'border border-white/20 text-white/30'
          }`}>
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          <span className={`text-xs font-mono tracking-wider transition-colors ${
            i === current ? 'text-white' : 'text-white/30'
          }`}>{label}</span>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-px transition-colors ${i < current ? 'bg-gradientcyan' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Input field ─────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-mono text-white/50 uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gradientcyan/60 focus:bg-white/8 transition-all ${className}`}
    />
  )
}

// ─── Step 1: Cart ────────────────────────────────────────────────────────────
function CartStep({ product, qty, onQtyChange, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
          {product.image
            ? <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            : <Package size={32} className="text-white/20" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-gradientcyan uppercase tracking-widest mb-1">{product.badge}</p>
          <p className="font-display text-base text-white leading-tight">{product.name}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-display text-xl text-white">{product.currency}{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-white/30 line-through">{product.currency}{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60 font-mono">QUANTITY</span>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors font-bold text-lg"
          >−</button>
          <span className="w-8 text-center font-mono text-white font-bold">{qty}</span>
          <button
            onClick={() => onQtyChange(Math.min(10, qty + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors font-bold text-lg"
          >+</button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 flex justify-between items-center">
        <span className="text-sm text-white/60">Total</span>
        <span className="font-display text-2xl text-white">
          {product.currency}{(product.price * qty).toLocaleString('en-IN')}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full bg-gradientcyan text-background font-display text-lg tracking-wider py-4 rounded-xl flex items-center justify-center gap-2"
      >
        Continue to Delivery <ChevronRight size={18} />
      </motion.button>
    </div>
  )
}

// ─── Step 2: Delivery Details ─────────────────────────────────────────────────
function DeliveryStep({ form, onChange, errors, onNext, onBack, shippingInfo, deliveryLabel, onTestOrder }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Full Name *" error={errors.name}>
          <Input name="name" value={form.name} onChange={onChange} placeholder="Ravi Kumar" />
        </Field>
        <Field label="Phone *" error={errors.phone}>
          <Input name="phone" value={form.phone} onChange={onChange} placeholder="9876543210" maxLength={10} />
        </Field>
      </div>

      <Field label="Email *" error={errors.email}>
        <Input name="email" type="email" value={form.email} onChange={onChange} placeholder="ravi@example.com" />
      </Field>

      <Field label="Address Line 1 *" error={errors.line1}>
        <Input name="line1" value={form.line1} onChange={onChange} placeholder="House / Flat No., Street Name" />
      </Field>

      <Field label="Address Line 2" error={errors.line2}>
        <Input name="line2" value={form.line2} onChange={onChange} placeholder="Landmark, Colony (optional)" />
      </Field>

      <div className="grid grid-cols-3 gap-3">
        <Field label="City *" error={errors.city}>
          <Input name="city" value={form.city} onChange={onChange} placeholder="Mumbai" />
        </Field>
        <Field label="State *" error={errors.state}>
          <Input name="state" value={form.state} onChange={onChange} placeholder="Maharashtra" />
        </Field>
        <Field label="Pincode *" error={errors.pincode}>
          <Input name="pincode" value={form.pincode} onChange={onChange} placeholder="400001" maxLength={6} />
        </Field>
      </div>

      {/* Delivery Estimate */}
      {form.pincode?.length === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-2 border rounded-lg px-3 py-2.5 mt-1 ${shippingInfo?.isSupported === false ? 'bg-red-500/10 border-red-500/20' : 'bg-gradientcyan/10 border-gradientcyan/20'}`}
        >
          {shippingInfo?.isSupported === false ? <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" /> : <Truck size={15} className="text-gradientcyan shrink-0 mt-0.5" />}
          <div>
            <p className={`text-xs font-mono leading-relaxed ${shippingInfo?.isSupported === false ? 'text-red-400' : 'text-gradientcyan'}`}>{deliveryLabel}</p>
            {shippingInfo?.isSupported && (
              shippingInfo.shippingCost === 0
                ? <p className="text-xs text-green-400 mt-0.5">✓ Free Delivery</p>
                : <p className="text-xs text-white/60 mt-0.5">Shipping: ₹{shippingInfo.shippingCost}</p>
            )}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-4 py-3 border border-white/15 rounded-xl text-white/60 hover:text-white text-sm font-mono transition-colors"
          >
            <ChevronLeft size={15} /> Back
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="flex-1 bg-gradientcyan text-background font-display text-lg tracking-wider py-3 rounded-xl flex items-center justify-center gap-2"
          >
            Proceed to Pay <ChevronRight size={18} />
          </motion.button>
        </div>
        {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
          <button
            type="button"
            onClick={onTestOrder}
            className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl py-2.5 font-mono text-xs transition-colors"
          >
            [DEV ONLY] Place Test Order (Skip Payment)
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Processing ───────────────────────────────────────────────────────
function ProcessingStep() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative">
        <Loader2 size={48} className="text-gradientcyan animate-spin" />
      </div>
      <div className="text-center">
        <p className="font-display text-xl text-white">Opening Payment…</p>
        <p className="text-sm text-white/40 mt-1 font-mono">Do not close this window</p>
      </div>
    </div>
  )
}

// ─── Step 4: Success ─────────────────────────────────────────────────────────
function SuccessStep({ orderId, deliveryLabel, onClose, onGoToOrders }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
      >
        <CheckCircle2 size={40} className="text-green-400" />
      </motion.div>

      <div>
        <h3 className="font-display text-3xl text-white mb-1">Order Placed!</h3>
        <p className="text-white/50 text-sm font-mono">Your Moscure is on its way.</p>
      </div>

      {orderId && (
        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3">
          <p className="text-xs text-white/40 font-mono mb-1">ORDER ID</p>
          <p className="font-mono text-gradientcyan text-sm tracking-wider">{orderId}</p>
        </div>
      )}

      {deliveryLabel && (
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Truck size={15} className="text-gradientcyan" />
          <span>{deliveryLabel}</span>
        </div>
      )}

      <p className="text-xs text-white/40 font-mono px-4">
        A confirmation email has been sent. You can track your order in My Orders.
      </p>

      <div className="flex flex-col gap-3 w-full pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoToOrders}
          className="w-full bg-gradientcyan text-background font-display text-lg tracking-wider py-3 rounded-xl"
        >
          View My Orders
        </motion.button>
        <button
          onClick={onClose}
          className="text-sm text-white/40 hover:text-white/70 transition-colors font-mono"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function CheckoutModal({ product, isOpen, onClose, onGoToOrders }) {
  const [step, setStep] = useState(0)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: '', pincode: '',
  })
  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState(null)
  const [globalError, setGlobalError] = useState(null)
  const [shippingInfo, setShippingInfo] = useState(null)
  const [deliveryLabel, setDeliveryLabel] = useState('')

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0); setQty(1); setOrderId(null); setGlobalError(null); setErrors({})
        setForm({ name: '', email: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' })
      }, 300)
    }
  }, [isOpen])

  // Update shipping info when pincode changes
  useEffect(() => {
    if (form.pincode?.length === 6) {
      const info = getShippingInfo(form.pincode, product.sku)
      setShippingInfo(info)
      setDeliveryLabel(getEstimatedDeliveryLabel(form.pincode, product.sku))
    } else {
      setShippingInfo(null)
      setDeliveryLabel('')
    }
  }, [form.pincode])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }, [errors])

  const validateDelivery = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit mobile number'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email'
    if (!form.line1.trim()) e.line1 = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!/^\d{6}$/.test(form.pincode)) {
      e.pincode = 'Enter valid 6-digit pincode'
    } else if (shippingInfo?.isSupported === false) {
      e.pincode = 'Delivery not available'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleTestOrder = async () => {
    setStep(2) // processing
    setGlobalError(null)
    try {
      const shippingCost = shippingInfo?.shippingCost ?? 0
      const totalAmount = product.price * qty + shippingCost
      const mockOrderId = 'pay_mock_' + Math.random().toString(36).substr(2, 9)
      const mockPaymentId = 'pay_mock_id_' + Math.random().toString(36).substr(2, 9)

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()

      // Save order to Supabase directly
      const { data: savedOrder, error: saveError } = await supabase
        .from('orders')
        .insert({
          user_id: session?.user?.id ?? null,
          razorpay_order_id: mockOrderId,
          razorpay_payment_id: mockPaymentId,
          items: [{ sku: product.sku, name: product.name, qty, price: product.price }],
          address: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          amount_paise: totalAmount * 100,
          status: 'confirmed',
          estimated_delivery: (() => {
            if (!shippingInfo) return null
            let daysAdded = 0
            let date = new Date()
            while (daysAdded < shippingInfo.estimatedDays.max) {
              date.setDate(date.getDate() + 1)
              if (date.getDay() !== 0) daysAdded++
            }
            return date.toISOString().split('T')[0]
          })(),
        })
        .select()
        .single()

      if (saveError) throw new Error(saveError.message)

      setOrderId(savedOrder?.id ?? mockPaymentId)
      setStep(3) // success
    } catch (err) {
      setGlobalError(err.message)
      setStep(1)
    }
  }

  const handlePayment = async () => {
    setStep(2) // processing
    setGlobalError(null)
    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error('Razorpay failed to load. Check your internet connection.')

      const shippingCost = shippingInfo?.shippingCost ?? 0
      const totalAmount = product.price * qty + shippingCost

      // 1. Create order on our backend
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, currency: 'INR' }),
      })
      if (!orderRes.ok) throw new Error('Failed to create order. Please try again.')
      const razorpayOrder = await orderRes.json()

      // 2. Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Moscure',
        description: product.name,
        image: '/Moscure-logo-red-line.png',
        order_id: razorpayOrder.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#00F5D4' },
        handler: async (response) => {
          // 3. Verify payment on backend
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          const verifyData = await verifyRes.json()
          if (!verifyData.success) throw new Error('Payment verification failed.')

          // 4. Get current user session (may be null for guests)
          const { data: { session } } = await supabase.auth.getSession()

          // 5. Save order to Supabase
          const { data: savedOrder, error: saveError } = await supabase
            .from('orders')
            .insert({
              user_id: session?.user?.id ?? null,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              items: [{ sku: product.sku, name: product.name, qty, price: product.price }],
              address: {
                name: form.name,
                email: form.email,
                phone: form.phone,
                line1: form.line1,
                line2: form.line2,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
              },
              amount_paise: razorpayOrder.amount,
              status: 'confirmed',
              estimated_delivery: (() => {
                // Calculate max estimated delivery date
                if (!shippingInfo) return null
                let daysAdded = 0
                let date = new Date()
                while (daysAdded < shippingInfo.estimatedDays.max) {
                  date.setDate(date.getDate() + 1)
                  if (date.getDay() !== 0) daysAdded++
                }
                return date.toISOString().split('T')[0]
              })(),
            })
            .select()
            .single()

          if (saveError) console.error('Order save error:', saveError)

          setOrderId(savedOrder?.id ?? response.razorpay_payment_id)
          setStep(3) // success
        },
        modal: {
          ondismiss: () => {
            // User closed Razorpay without paying — go back to delivery step
            setStep(1)
          },
        },
      }

      const rz = new window.Razorpay(options)
      rz.on('payment.failed', (resp) => {
        setGlobalError(resp.error.description || 'Payment failed. Please try again.')
        setStep(1)
      })
      rz.open()
    } catch (err) {
      setGlobalError(err.message)
      setStep(1)
    }
  }

  const totalAmount = product ? product.price * qty + (shippingInfo?.shippingCost ?? 0) : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step < 2 ? onClose : undefined}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10"
            style={{ background: '#0e0e0e' }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-white tracking-wider">
                  {step === 3 ? 'Order Confirmed' : 'Checkout'}
                </h2>
                {step !== 2 && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {step < 3 && step !== 2 && <StepIndicator current={step} />}

              {/* Global error */}
              {globalError && step !== 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 text-sm text-red-400"
                >
                  <AlertCircle size={15} />
                  {globalError}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <CartStep product={product} qty={qty} onQtyChange={setQty} onNext={() => setStep(1)} />
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <DeliveryStep
                      form={form}
                      onChange={handleChange}
                      errors={errors}
                      shippingInfo={shippingInfo}
                      deliveryLabel={deliveryLabel}
                      onBack={() => setStep(0)}
                      onNext={() => { if (validateDelivery()) handlePayment() }}
                      onTestOrder={() => { if (validateDelivery()) handleTestOrder() }}
                    />
                    {/* Order summary row */}
                    <div className="mt-4 border-t border-white/10 pt-4 flex justify-between text-sm">
                      <span className="text-white/50 font-mono">ORDER TOTAL</span>
                      <span className="font-display text-white text-base">
                        ₹{totalAmount.toLocaleString('en-IN')}
                        {shippingInfo?.shippingCost === 0 && <span className="text-xs text-green-400 ml-2">(+₹0 shipping)</span>}
                      </span>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ProcessingStep />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <SuccessStep
                      orderId={orderId}
                      deliveryLabel={deliveryLabel}
                      onClose={onClose}
                      onGoToOrders={onGoToOrders}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
