import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Gift } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RakshaBandhanPopup({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user has already closed it in this session (optional, but good UX)
    const hasSeen = sessionStorage.getItem('rakshabandhan_popup_seen')
    if (!hasSeen) {
      // Delay popup by 2 seconds
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // End date: Aug 27th, 2026 23:59:59
    const targetDate = new Date('2026-08-27T23:59:59').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('rakshabandhan_popup_seen', 'true')
  }

  const handleShopNow = () => {
    handleClose()
    if (onNavigate) {
      onNavigate('ipiIndoor')
    } else {
      navigate('/products/moscure-ipi-indoor-mosquito-trap')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface border border-borderDefault shadow-2xl"
          >
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradientpink/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradientyellow/20 rounded-full blur-3xl" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 text-textMuted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradientpink/10 border border-gradientpink/30 flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-gradientpink" />
              </div>
              
              <h2 className="font-display text-3xl text-white mb-2 leading-tight">
                Raksha Bandhan <span className="text-gradientpink">Special</span>
              </h2>
              
              <p className="font-body text-textMuted mb-4">
                Protect your loved ones this Raksha Bandhan with the <strong className="text-white">Moscure IPI Indoor Trap</strong>.
              </p>

              <div className="flex items-center justify-center gap-3 mb-6 bg-white/5 py-3 px-6 rounded-xl border border-white/10">
                <span className="font-display text-2xl text-textMuted line-through decoration-textMuted/50">₹1,899</span>
                <span className="font-display text-5xl text-gradientcyan font-bold drop-shadow-[0_0_15px_rgba(0,245,212,0.3)]">₹1,099</span>
              </div>

              <div className="bg-background/50 border border-borderDefault rounded-xl p-4 w-full mb-6">
                <div className="flex items-center justify-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-gradientyellow">
                  <Clock className="w-4 h-4" />
                  <span>Limited Time Offer</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="font-display text-3xl text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="font-mono text-[10px] text-textMuted uppercase">Days</span>
                  </div>
                  <span className="text-2xl text-textMuted mb-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="font-display text-3xl text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="font-mono text-[10px] text-textMuted uppercase">Hours</span>
                  </div>
                  <span className="text-2xl text-textMuted mb-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="font-display text-3xl text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="font-mono text-[10px] text-textMuted uppercase">Mins</span>
                  </div>
                  <span className="text-2xl text-textMuted mb-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="font-display text-3xl text-gradientcyan">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="font-mono text-[10px] text-textMuted uppercase">Secs</span>
                  </div>
                </div>
                <p className="font-body text-[10px] text-textMuted mt-3">Offer ends August 27th, 2026</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShopNow}
                className="w-full py-4 rounded-xl bg-gradientcyan text-background font-display text-lg tracking-wide shadow-[0_0_20px_rgba(0,245,212,0.3)]"
              >
                SHOP NOW →
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
