import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import indoorImg from '../assets/product-indoor.png'
import outdoorImg from '../assets/product-outdoor.png'

const PRODUCTS = [
  {
    id: 'indoor',
    badge: 'INDOOR',
    name: 'IPI 1',
    fullName: 'IPI Indoor Mosquito & Insect Trap',
    desc: '365nm UV · 400 sq ft · 1.5W USB · Portable · Silent fan suction',
    img: indoorImg,
  },
  {
    id: 'outdoor',
    badge: 'OUTDOOR',
    name: 'IPO 1',
    fullName: 'IPO Outdoor Mosquito & Insect Trap',
    desc: '365nm UV · 3,500 sq ft · 9W · Water-resistant · Hangable',
    img: outdoorImg,
  },
]

const DOC_TITLES = {
  'User Manual':        'complete usage & specifications',
  'Installation Guide': 'setup, placement & mounting guide',
  'Warranty Info':      'coverage, exclusions & claims',
  'Safety Guidelines':  'electrical, UV & handling safety',
}

export default function DocProductSelector({ docTitle, onSelect, indoorPath }) {
  const navigate = useNavigate()
  const subtitle = DOC_TITLES[docTitle] ?? 'documentation'

  const handleClick = (productId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (productId === 'indoor' && indoorPath) {
      navigate(indoorPath)
    } else {
      onSelect(productId)
    }
  }

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-surface border-b border-borderDefault overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gradientcyan/5 via-transparent to-gradientpink/5 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradientcyan/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gradientcyan/30 bg-gradientcyan/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradientcyan animate-pulse" />
            <span className="text-xs font-mono text-gradientcyan uppercase tracking-widest">Documentation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-5xl md:text-7xl text-white leading-none mb-4"
          >
            {docTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-base md:text-lg text-textMuted max-w-lg mx-auto leading-relaxed"
          >
            Select your Moscure product to view its{' '}
            <span className="text-white">{subtitle}</span>.
          </motion.p>
        </div>
      </section>

      {/* ── Product Cards ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
      

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.button
              key={product.id}
              onClick={() => handleClick(product.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative flex flex-col items-center text-left rounded-2xl border border-borderDefault bg-surface hover:border-gradientcyan/50 hover:bg-surfaceHover transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gradientcyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-gradientcyan/30 bg-background/80 text-gradientcyan backdrop-blur-sm">
                  {product.badge}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative w-full bg-gradient-to-b from-surfaceHover to-surface pt-14 pb-4 flex items-center justify-center h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradientcyan/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={product.img}
                  alt={product.fullName}
                  className="h-48 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="w-full p-6 border-t border-borderDefault">
                <h2 className="font-display text-2xl text-white mb-1">{product.fullName}</h2>
                <p className="font-body text-sm text-textMuted leading-relaxed mb-5">{product.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-textMuted uppercase tracking-widest">
                    View {docTitle}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-borderDefault bg-background group-hover:border-gradientcyan/50 group-hover:bg-gradientcyan/10 transition-all duration-300">
                    <ArrowRight size={14} className="text-textMuted group-hover:text-gradientcyan group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  )
}

// ─── Coming Soon view for indoor (reusable) ───────────────────────────────────
export function DocComingSoon({ pageTitle, onBack }) {
  return (
    <main>
      <section className="relative bg-surface border-b border-borderDefault overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gradientyellow/5 via-transparent to-gradientcyan/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 relative">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-gradientcyan transition-colors duration-200 uppercase tracking-widest mb-6 group"
          >
            <ChevronRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Product Selection
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gradientyellow/30 bg-gradientyellow/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gradientyellow animate-pulse" />
            <span className="text-xs font-mono text-gradientyellow uppercase tracking-widest">IPI Indoor · Coming Soon</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-4">
            {pageTitle}
          </h1>
          <p className="font-body text-base text-textMuted max-w-xl leading-relaxed">
            We're preparing the IPI Indoor documentation. Check back soon — it will be available shortly.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradientyellow/10 border border-gradientyellow/20">
          <Clock size={28} className="text-gradientyellow" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-white mb-2">Documentation in Progress</h2>
          <p className="font-body text-sm text-textMuted max-w-sm leading-relaxed">
            The IPI Indoor <span className="text-white">{pageTitle}</span> is being finalised. In the meantime,
            contact our support team if you need immediate assistance.
          </p>
        </div>
        <a
          href="mailto:operations@moscure.com"
          className="inline-flex items-center gap-2 bg-gradientcyan/10 border border-gradientcyan/30 text-gradientcyan font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gradientcyan/20 transition-colors duration-200"
        >
          Contact Support →
        </a>
      </section>
    </main>
  )
}
