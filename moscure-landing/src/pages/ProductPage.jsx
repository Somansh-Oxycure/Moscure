import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import {
  Target, Wind, Shield, Volume2, CloudRain, Droplets, CheckCircle2,
  FlaskConical, ShieldCheck,
} from 'lucide-react'
import { PRODUCTS_DATA, STATS_DATA, PRODUCT_FEATURES, HOW_IT_WORKS } from '../data/staticData'
import indoorImg from '../assets/product-indoor.png'
import outdoorImg from '../assets/product-outdoor.png'

const PRODUCT_IMAGES = { indoor: indoorImg, outdoor: outdoorImg }

const ICON_MAP = { Target, Wind, Shield, Volume2, CloudRain, Droplets, CheckCircle2 }

// ─────────────────────────────────────────────────────────
// SECTION 1 — Products Hero + Cards
// ─────────────────────────────────────────────────────────

function ProductCard({ product, onNavigate }) {
  const imgSrc = PRODUCT_IMAGES[product.id]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="animated-border h-full"
    >
      <div className="bg-surface rounded-2xl overflow-hidden flex flex-col h-full">

        {/* Full-bleed image panel */}
        <div className="relative h-64 overflow-hidden shrink-0 bg-white">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-contain p-8"
          />
          {/* Gradient bleed into card body */}
          <div
            className="absolute inset-x-0 bottom-0 h-8 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(17,17,17,0.35))' }}
          />
          {/* Badge overlaid top-left */}
          <span className={`absolute top-4 left-4 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border bg-[#111111]/85 ${product.accentBorder} ${product.accentClass}`}>
            {product.badge}
          </span>
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-4 p-5 flex-1">

          {/* Name + model */}
          <div>
            <h3 className="font-display text-3xl text-white leading-none">{product.name}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-textMuted mt-1">{product.model}</p>
          </div>

          {/* 3 key specs */}
          <div className="flex flex-col gap-2">
            {product.specs.slice(0, 3).map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted">{s.label}</span>
                <span className="font-body text-xs font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mt-auto pt-3 border-t border-borderDefault/60">
            <span className="font-display text-4xl leading-none" style={{ color: product.accentColor }}>{product.price}</span>
            <span className="font-mono text-xs text-textMuted uppercase">{product.priceLabel}</span>
          </div>

          {/* CTA — solid accent fill */}
          <motion.button
            onClick={() => {
              if (product.id === 'indoor' && onNavigate) {
                onNavigate('ipiIndoor')
              } else if (product.id === 'outdoor' && onNavigate) {
                onNavigate('ipoOutdoor')
              }
            }}
            whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${product.accentColor}45` }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-full font-mono text-sm font-bold text-background transition-shadow"
            style={{ backgroundColor: product.accentColor }}
          >
            VIEW DETAILS →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function ProductsHeroSection({ onNavigate }) {
  return (
    <section id="products" className="relative overflow-hidden min-h-screen">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.025) 0,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(255,255,255,0.025) 0,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 60px)' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradientcyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        {/* Hero header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4">
            ✦ OUR LINEUP
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-wide mb-6">
            MOSCURE <span className="gradient-text-cyan-pink">PRODUCTS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} className="font-body text-textMuted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced mosquito-catching technology tested on all disease-carrying species in India.
            Safe, effective, and reliable protection for indoor and outdoor environments.
          </motion.p>
        </div>

        {/* 2-col card grid — constrained width so cards aren't huge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PRODUCTS_DATA.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <ProductCard product={product} onNavigate={onNavigate} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION 2 — Tested Species + Stat Boxes
// ─────────────────────────────────────────────────────────

function StatNumber({ stat, suffix, accent }) {
  const ref = useRef(null)
  const motionVal = useMotionValue(0)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const accentColors = { gradientcyan: '#00F5D4', gradientyellow: '#FFD60A', gradientpink: '#FF4D6D' }

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(motionVal, stat, {
      duration: 1.8, ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix },
    })
    return ctrl.stop
  }, [inView, stat, suffix, motionVal])

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl leading-none"
      style={{ color: accentColors[accent] ?? '#00F5D4' }}>0{suffix}</span>
  )
}

const TESTED_SPECIES_LIST = [
  { name: 'Aedes aegypti',           disease: 'Dengue · Chikungunya' },
  { name: 'Anopheles stephensi',     disease: 'Malaria' },
  { name: 'Culex quinquefasciatus',  disease: 'Filariasis · West Nile' },
  { name: 'All major species',       disease: 'Tested in controlled environments' },
]

function TestedSpeciesSection() {
  const speciesRef = useRef(null)
  const speciesInView = useInView(speciesRef, { once: true, margin: '-60px' })

  return (
    <section id="tested" className="relative overflow-hidden py-24 md:py-32 bg-surface/40">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradientpink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientpink mb-4">
            🔬 SCIENCE-BACKED
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide mb-6">
            TESTED ON ALL <span className="gradient-text-pink-yellow">MOSQUITO SPECIES</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }} className="font-body text-textMuted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Moscure has been rigorously tested against{' '}
            <span className="text-white font-medium">Aedes aegypti</span> (dengue),{' '}
            <span className="text-white font-medium">Anopheles</span> (malaria), and{' '}
            <span className="text-white font-medium">Culex</span> (various diseases).
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Stat boxes */}
          <motion.div className="grid grid-cols-2 gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {STATS_DATA.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="animated-border"
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
                <div className="bg-surface rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-center min-h-[140px]">
                  {item.prefix && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted h-[12px]">{item.prefix}</span>
                  )}
                  <StatNumber stat={item.stat} suffix={item.suffix} accent={item.accent} />
                  <span className="font-mono text-xs uppercase tracking-widest text-textMuted">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Species list */}
          <div ref={speciesRef} className="divide-y divide-borderDefault/50">
            <p className="font-mono text-xs uppercase tracking-widest text-textMuted pb-4">Tested Species</p>
            {TESTED_SPECIES_LIST.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: 30 }}
                animate={speciesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-start gap-4 py-4">
                <motion.span initial={{ scale: 0 }} animate={speciesInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: 'spring', stiffness: 300 }}
                  className="text-gradientcyan font-bold text-lg leading-tight mt-0.5 shrink-0">✓</motion.span>
                <div>
                  <p className="font-body font-semibold text-white text-base italic">{s.name}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-textMuted mt-0.5">{s.disease}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION 3 — Features Grid
// ─────────────────────────────────────────────────────────

function TagBadge({ tag, delay }) {
  const isOutdoor = tag === 'Outdoor'
  return (
    <motion.span initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay, type: 'spring', stiffness: 300 }}
      className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${isOutdoor ? 'bg-gradientyellow/10 border-gradientyellow/40 text-gradientyellow' : 'bg-gradientcyan/10 border-gradientcyan/40 text-gradientcyan'}`}>
      {tag}
    </motion.span>
  )
}

function FeaturesGridSection() {
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradientcyan/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-4">
            ⚡ WHAT MAKES IT WORK
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide">
            ENGINEERED FOR <span className="gradient-text-yellow-cyan">INDIA</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Target
            return (
              <motion.div key={feature.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }} className="animated-border h-full">
                <div className="bg-surface rounded-2xl p-6 md:p-7 flex flex-col gap-5 h-full">
                  <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` }}>
                    <Icon size={22} className="text-background" strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-display text-xl text-white leading-tight">{feature.title}</h3>
                    <p className="font-body text-sm text-textMuted leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="border-t border-borderDefault/60" />
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {feature.tags.map((tag, ti) => <TagBadge key={tag} tag={tag} delay={0.3 + i * 0.08 + ti * 0.05} />)}
                    </div>
                    <span className="font-body text-xs italic text-textMuted">{feature.tagline}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION 4 — How It Works
// ─────────────────────────────────────────────────────────

function HowItWorksSection() {
  const connectorRef = useRef(null)
  const connectorInView = useInView(connectorRef, { once: true, margin: '-60px' })

  return (
    <section id="how-it-works" className="relative overflow-hidden py-24 md:py-32 bg-surface/40">
      <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-gradientyellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-4">
            ⚙ THE MECHANISM
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide">
            HOW <span className="gradient-text-yellow-cyan">MOSCURE</span> WORKS
          </motion.h2>
        </div>

        {/* Desktop: 3 cols with connector arrows */}
        <div ref={connectorRef} className="hidden md:flex items-stretch gap-0">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? Target
            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <motion.div className="animated-border flex-1"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="bg-surface rounded-2xl p-7 md:p-8 relative overflow-hidden h-full flex flex-col gap-6">
                    {/* Ghost number */}
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.07 }} viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
                      className="absolute top-3 right-4 font-display text-[110px] leading-none select-none pointer-events-none"
                      style={{ color: step.accentColor }}>{step.step}</motion.span>
                    {/* Icon */}
                    <motion.div animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${step.accentColor}20` }}>
                      <Icon size={26} style={{ color: step.accentColor }} strokeWidth={2} />
                    </motion.div>
                    {/* Text */}
                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-textMuted">{step.step}</span>
                        <div className="flex-1 h-px bg-borderDefault" />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl leading-none" style={{ color: step.accentColor }}>{step.title}</h3>
                      <p className="font-body text-sm text-textMuted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <motion.div initial={{ opacity: 0, scale: 0 }}
                    animate={connectorInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
                    className="px-2 shrink-0 text-borderDefault font-display text-2xl select-none">→</motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex md:hidden flex-col">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? Target
            return (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center w-10 shrink-0">
                  <motion.div animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.accentColor}20`, border: `2px solid ${step.accentColor}60` }}>
                    <Icon size={18} style={{ color: step.accentColor }} strokeWidth={2} />
                  </motion.div>
                  {i < HOW_IT_WORKS.length - 1 && <div className="flex-1 w-px bg-borderDefault mt-2" />}
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }} className="flex-1 pb-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-textMuted mb-1">{step.step}</p>
                  <h3 className="font-display text-2xl leading-none mb-2" style={{ color: step.accentColor }}>{step.title}</h3>
                  <p className="font-body text-sm text-textMuted leading-relaxed">{step.description}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION 5 — Lab Tested
// ─────────────────────────────────────────────────────────

const LAB_SPECIES = [
  { name: 'Aedes aegypti',          disease: 'Dengue · Chikungunya' },
  { name: 'Anopheles stephensi',    disease: 'Malaria' },
  { name: 'Culex quinquefasciatus', disease: 'Filariasis' },
  { name: 'All major species',      disease: 'Tested in controlled environments' },
]

function LabTestedSection() {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-60px' })
  const speciesRef = useRef(null)
  const speciesInView = useInView(speciesRef, { once: true, margin: '-40px' })

  return (
    <section id="lab-tested" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-gradientcyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4">
            🧪 CERTIFIED SCIENCE
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide">
            LABORATORY <span className="gradient-text-cyan-pink">TESTED</span>
          </motion.h2>
        </div>

        <motion.div ref={cardRef} initial={{ opacity: 0, scale: 0.95 }}
          animate={cardInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="animated-border max-w-5xl mx-auto">
          <div className="bg-surface rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 0% 0%, rgba(0,245,212,0.06) 0%, transparent 60%), #111111' }}>
            <FlaskConical size={220} className="absolute -bottom-10 -right-10 text-gradientcyan/5 pointer-events-none select-none" strokeWidth={1} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 relative z-10">
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display text-5xl md:text-6xl text-white leading-none mb-4">
                    LABORATORY<br /><span className="gradient-text-cyan-pink">TESTED</span>
                  </h3>
                  <p className="font-body text-sm text-textMuted leading-relaxed">
                    Moscure has undergone rigorous testing in certified laboratories across India.
                    Proven effective against all major disease-carrying mosquito species in both
                    controlled and real-world conditions.
                  </p>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="border border-dashed border-gradientcyan/30 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gradientcyan/40 flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} className="text-gradientcyan/60" />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-gradientcyan">Certified Lab Testing</span>
                    <span className="font-body text-xs text-textMuted">Government-approved facility · India</span>
                  </div>
                 
                </motion.div>
              </motion.div>

              {/* Right — species */}
              <div ref={speciesRef} className="flex flex-col gap-0">
                <p className="font-mono text-xs uppercase tracking-widest text-textMuted mb-4">Tested Species</p>
                <div className="divide-y divide-borderDefault/50">
                  {LAB_SPECIES.map((s, i) => (
                    <motion.div key={s.name} initial={{ opacity: 0, x: 20 }}
                      animate={speciesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }} className="flex items-start gap-3 py-4">
                      <motion.span initial={{ scale: 0 }} animate={speciesInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.1, type: 'spring', stiffness: 300 }}
                        className="text-gradientcyan font-bold text-base leading-tight mt-0.5 shrink-0">✓</motion.span>
                      <div>
                        <p className="font-body font-semibold text-white text-base italic leading-tight">{s.name}</p>
                        <p className="font-mono text-xs uppercase tracking-wider text-textMuted mt-0.5">{s.disease}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION 6 — Bottom CTA
// ─────────────────────────────────────────────────────────

function BottomCTASection({ onNavigate }) {
  return (
    <section className="relative overflow-hidden py-20 bg-surface/40 border-t border-borderDefault">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,245,212,0.04) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4">
          JOIN THE MOVEMENT
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide mb-6">
          RECLAIM YOUR <span className="gradient-text-cyan-pink">NIGHTS</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }} className="font-body text-textMuted text-base md:text-lg max-w-xl mx-auto mb-10">
          Join thousands of Indian families who have switched to a safer, smarter way of mosquito protection.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center justify-center gap-4 flex-wrap">
          <motion.a href="#products" whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,212,0.4)' }} whileTap={{ scale: 0.97 }}
            className="bg-gradientcyan text-background font-bold font-mono text-sm px-8 py-3.5 rounded-full transition-shadow duration-300">
            SHOP NOW →
          </motion.a>
          <motion.button onClick={() => onNavigate?.('landing')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="border border-white/20 text-textMuted hover:text-white font-mono text-sm px-8 py-3.5 rounded-full transition-colors">
            ← BACK TO HOME
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────

export default function ProductPage({ onNavigate }) {
  return (
    <main>
      <ProductsHeroSection onNavigate={onNavigate} />
      <TestedSpeciesSection />
      <FeaturesGridSection />
      <HowItWorksSection />
      <LabTestedSection />
      <BottomCTASection onNavigate={onNavigate} />
    </main>
  )
}
