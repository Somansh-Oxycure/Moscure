import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { X, Check, Shield, Wind, Zap, Droplets } from 'lucide-react'
import { BRAND_VALUES, DISEASES_DATA, COMPARISON_DATA, FEATURES_DATA } from '../data/staticData'
import TrustedByMarquee from '../components/TrustedByMarquee'
import productImg from '../assets/product.png'
import mosquitoSvg from '../assets/mosquito-silhouette.svg'

// ─── Hero ────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

const BADGE_ITEMS = ['✓ Chemical Free', '✓ Safe for Kids', '✓ MLID LED Proven']

function HeroSection({ onNavigate }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const mosquitoY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const mosquitoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,77,109,0.05) 0%, transparent 70%)' }}
        />
      </div>

      <motion.div
        style={{ y: mosquitoY, opacity: mosquitoOpacity }}
        className="absolute bottom-0 right-8 w-64 md:w-80 lg:w-96 pointer-events-none select-none"
      >
        <img
          src={mosquitoSvg}
          alt=""
          aria-hidden="true"
          className="w-full opacity-[0.06] text-gradientcyan"
          style={{ filter: 'invert(1)' }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <div className="flex flex-col">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-gradientcyan text-sm font-mono tracking-widest uppercase">
                ⚡ THE ULTIMATE DEFENSE
              </span>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-hidden"
            >
              <motion.h1
                className="font-display leading-none tracking-wide"
                
              >
                <motion.span variants={wordVariants} style={{ fontSize: 'clamp(64px, 9vw, 120px)' }} className="block text-white heading-glow">ELIMINATE</motion.span>
                <motion.span variants={wordVariants} style={{ fontSize: 'clamp(64px, 9vw, 120px)' }} className="block gradient-text-full italic">MOSQUITO</motion.span>
                <motion.span variants={wordVariants} style={{ fontSize: 'clamp(64px, 9vw, 120px)' }} className="block text-gradientpink heading-glow">DANGER</motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              custom={0.7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className=" text-textMuted font-body text-base md:text-lg leading-relaxed max-w-md"
            >
              <span className="text-white font-medium">Moscure</span> 
              {' '}eliminates mosquito threats everywhere—scientifically proven and certified indoor and outdoor protection for <span className="text-white font-body">Homes, Offces</span> {' '} and <span className="text-white font-body">Public spaces</span> 
            </motion.p>
              
              

            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                onClick={() => onNavigate('product')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,212,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradientcyan text-background font-bold font-mono text-sm px-8 py-4 rounded-full shadow-lg shadow-gradientcyan/20 transition-all"
              >
                BUY NOW <span className="text-base">→</span>
              </motion.a>
              <motion.a
                href="#comparison"
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-white/20 text-white font-bold font-mono text-sm px-8 py-4 rounded-full transition-all hover:bg-white/5"
              >
                COMPARE ↓
              </motion.a>
            </motion.div>

            <motion.div
              custom={1.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-3"
            >
              {BADGE_ITEMS.map((badge, i) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-surface border border-borderDefault text-gradientcyan font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{ animationDelay: `${i * 0.3}s`, animation: 'floatBadge 3s ease-in-out infinite' }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center h-[500px] md:h-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute right-4 top-6 w-[72%] h-[88%] rounded-2xl overflow-hidden hero-card-glow-pink"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(#111, #111), linear-gradient(135deg, #FFD60A, #FF4D6D)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                transform: 'rotate(2deg)',
              }}
            >
              <img
                src={productImg}
                alt="Moscure UV LED Mosquito Trap"
                className="w-full h-full object-contain p-6 mix-blend-luminosity opacity-80"
                style={{ backgroundColor: '#0d1a15' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              whileHover={{ scale: 1.03 }}
              className="absolute left-2 bottom-4 w-[68%] h-[80%] rounded-2xl overflow-hidden hero-card-glow z-10 cursor-pointer"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(#0a1812, #0a1812), linear-gradient(135deg, #00F5D4, #FFD60A)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <img
                src={productImg}
                alt="Moscure UV LED Mosquito Trap"
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #FF4D6D, #FFD60A)',
                    transform: 'rotate(-35deg) translateX(-50%) translateY(0)',
                    width: '250%',
                    left: '50%',
                    bottom: '75%',
                  }}
                >
                  <div className="marquee-track font-mono text-sm font-bold tracking-widest text-white py-3" style={{ animationDuration: '90s' }}>
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className="px-6 shrink-0">
                        SLEEP IN PEACE  ·  NO MORE BUZZING  ·  MOSCURE  ·  SLEEP IN PEACE · NO MORE BUZZING  ·  MOSCURE ·
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0, type: 'spring', stiffness: 200 }}
              className="absolute top-4 left-0 z-20 bg-surface border border-gradientcyan/40 rounded-2xl px-4 py-3 shadow-xl shadow-gradientcyan/10"
              style={{ animation: 'floatBadge 4s ease-in-out infinite' }}
            >
              <div className="font-mono text-[10px] text-gradientcyan/70 uppercase tracking-widest mb-1">Coverage up to</div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl text-gradientcyan leading-none">3500</span>
                <span className="font-mono text-xs text-textMuted uppercase tracking-wider">sq.ft</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2, type: 'spring', stiffness: 200 }}
              className="absolute bottom-16 right-0 z-20 bg-surface border border-gradientyellow/40 rounded-2xl px-4 py-3 shadow-xl shadow-gradientyellow/10"
              style={{ animation: 'floatBadge 3.5s ease-in-out 0.7s infinite' }}
            >
              <div className="font-mono text-[9px] text-gradientyellow/70 uppercase tracking-widest mb-1">⚡ Powered by</div>
              <div className="font-display text-xl text-white leading-tight tracking-wide">MLID</div>
              <div className="font-mono text-[10px] text-gradientyellow uppercase tracking-widest mt-0.5">Technology</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── Brand Values Ticker ──────────────────────────────────────────────────────

function BrandValuesTicker() {
  const items = [...BRAND_VALUES, ...BRAND_VALUES]

  return (
    <section className="relative overflow-hidden bg-surface border-y border-borderDefault py-4">
      <div className="marquee-track" style={{ animationDuration: '45s' }}>
        {items.map((value, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className={`font-mono uppercase text-xs tracking-widest whitespace-nowrap px-4 ${
                i % 3 === 0 ? 'text-gradientcyan' : i % 3 === 1 ? 'text-textMuted' : 'text-gradientyellow'
              }`}
            >
              {value}
            </span>
            <span className="text-borderDefault font-mono text-xs">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── Diseases ─────────────────────────────────────────────────────────────────

function CountUpStat({ value, isInView }) {
  const ref = useRef(null)
  const numericPart = parseFloat(value)
  const suffix = value.replace(/[\d.]/g, '')

  useEffect(() => {
    if (!isInView || !ref.current) return
    const controls = animate(0, numericPart, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = (Number.isInteger(numericPart) ? Math.round(v) : v.toFixed(1)) + suffix
        }
      },
    })
    return controls.stop
  }, [isInView, numericPart, suffix])

  return <span ref={ref} className="tabular-nums">0{suffix}</span>
}

function DiseaseCard({ disease, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative bg-surface rounded-2xl p-8 border border-borderDefault overflow-hidden group cursor-default"
      style={{ '--card-color': disease.color, '--card-glow': disease.color + '33' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]"
        style={{ background: `linear-gradient(90deg, ${disease.gradientFrom}, ${disease.gradientTo})`, boxShadow: `0 0 12px ${disease.color}60` }}
      />
      <div className="absolute bottom-2 right-2 w-32 h-40 pointer-events-none select-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
        <img src={mosquitoSvg} alt="" aria-hidden="true" className="w-full h-full" style={{ filter: 'invert(1)' }} />
      </div>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${disease.color}15` }}
      />
      <div className="font-display text-6xl leading-none mb-1" style={{ color: disease.color }}>
        <CountUpStat value={disease.stat} isInView={isInView} />
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-textMuted mb-5">{disease.statLabel}</div>
      <div className="h-px mb-5 opacity-30" style={{ background: `linear-gradient(90deg, ${disease.color}, transparent)` }} />
      <h3 className="font-body font-bold text-xl text-white mb-3">{disease.name}</h3>
      <p className="font-body text-sm text-textMuted leading-relaxed">{disease.description}</p>
    </motion.div>
  )
}

function DiseasesSection({ onNavigate }) {
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="diseases" className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, x: -40 }}
          animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 flex justify-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-gradientpink">⚠ The Silent Killer</span>
        </motion.div>

        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-display leading-none" style={{ fontSize: 'clamp(56px, 7vw, 100px)' }}>
              <span className="text-white heading-glow">KNOW YOUR</span>
              
              <span className="gradient-text-pink-yellow ml-5">ENEMY</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-lg text-textMuted font-body text-sm leading-relaxed"
          >
            Mosquitoes are the{' '}
            <span className="text-gradientpink font-semibold">Deadliest Animals on Earth</span>. In
            India, the threat is real and growing. Don&apos;t be a statistic.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DISEASES_DATA.map((disease, i) => (
            <DiseaseCard key={disease.id} disease={disease} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => onNavigate('diseases')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(255,77,109,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-gradientpink/40 text-gradientpink font-bold font-mono text-sm px-8 py-3.5 rounded-full transition-all hover:bg-gradientpink/10"
          >
            KNOW MORE ABOUT DISEASES <span className="text-base">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Comparison ───────────────────────────────────────────────────────────────

function ComparisonSection({ onNavigate }) {
  const headingRef = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })
  const isCardInView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <section id="comparison" className="bg-surface/40 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 flex justify-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-gradientyellow">US VS THE REST</span>
        </motion.div>

        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display leading-none"
            style={{ fontSize: 'clamp(44px, 5.5vw, 80px)' }}
          >
            <span className="text-white heading-glow">WHY MOSCURE</span>
            
            <span className="gradient-text-yellow-cyan ml-4">WINS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-textMuted font-body text-sm leading-relaxed"
          >
            Every other solution compromises on safety, effectiveness, or
            convenience. Moscure refuses to.
          </motion.p>
        </div>

        {/* Table-style comparison card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-borderDefault"
        >
          {/* Shimmer sweep */}
          {isCardInView && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 0.2, 0] }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.15), transparent)' }}
            />
          )}

          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-borderDefault">
            <div className="px-5 py-4 bg-surface/60">
              <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted/60">Criteria</span>
            </div>
            <div className="px-5 py-4 bg-red-950/20 border-l border-red-900/20 flex items-center gap-2">
              <div className="shrink-0 bg-red-500/20 rounded-full p-1">
                <X size={11} className="text-red-400" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-400">Others</span>
            </div>
            <div className="relative px-5 py-4 bg-cyan-950/15 border-l border-gradientcyan/20 flex items-center gap-2">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #00F5D4, #FFD60A)' }} />
              <div className="shrink-0 bg-gradientcyan/20 rounded-full p-1">
                <Check size={11} className="text-gradientcyan" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-gradientcyan">Moscure</span>
            </div>
          </div>

          {/* Data rows */}
          {COMPARISON_DATA.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={isCardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
              className={`grid grid-cols-[1fr_1fr_1fr] border-b border-borderDefault last:border-b-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
            >
              {/* Criteria */}
              <div className="px-5 py-3.5 bg-surface/30 flex items-center">
                <span className="font-mono text-xs uppercase tracking-wider text-textMuted font-medium">{item.criteria}</span>
              </div>
              {/* Others */}
              <div className="px-5 py-3.5 bg-red-950/10 border-l border-red-900/15 flex items-center">
                <span className="font-body text-sm text-red-300/80">{item.others}</span>
              </div>
              {/* Moscure */}
              <div className="px-5 py-3.5 bg-cyan-950/10 border-l border-gradientcyan/10 flex items-center">
                <span className="font-body text-sm text-gradientcyan font-medium">{item.moscure}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isCardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            onClick={() => onNavigate('comparison')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(255,214,10,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-gradientyellow/40 text-gradientyellow font-bold font-mono text-sm px-8 py-3.5 rounded-full transition-all hover:bg-gradientyellow/10"
          >
            SEE FULL COMPARISON <span className="text-base">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const ICON_MAP = { Shield, Wind, Zap, Droplets }

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const Icon = ICON_MAP[feature.icon]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="relative bg-surface rounded-2xl p-8 border border-borderDefault group cursor-default overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${feature.gradientFrom}, ${feature.gradientTo})` }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${feature.gradientFrom}40, 0 0 30px ${feature.gradientFrom}15` }}
      />
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
        style={{ background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` }}
      >
        {Icon && <Icon size={22} className="text-background" strokeWidth={2.5} />}
      </motion.div>
      <h3 className="font-display text-2xl text-white mb-3 tracking-wide">{feature.title}</h3>
      <p className="font-body text-sm text-textMuted leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}

function FeaturesSection({ onNavigate }) {
  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="features" className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 flex justify-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-gradientcyan">✦ WHY IT WORKS</span>
        </motion.div>

        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display leading-none"
            style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
          >
            <span className="text-white heading-glow">BUILT</span>
            
            <span className="gradient-text-cyan-pink ml-5">DIFFERENT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-textMuted font-body text-sm leading-relaxed"
          >
            Four engineering decisions that make Moscure the most effective
            mosquito defense money can buy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES_DATA.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => onNavigate('product')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,245,212,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-gradientcyan/40 text-gradientcyan font-bold font-mono text-sm px-8 py-3.5 rounded-full transition-all hover:bg-gradientcyan/10"
          >
            EXPLORE THE PRODUCT <span className="text-base">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection({ onNavigate }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cta" className="relative py-28 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 noise-overlay"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0,245,212,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(255,77,109,0.07) 0%, transparent 60%),
            linear-gradient(135deg, rgba(0,245,212,0.04) 0%, rgba(255,77,109,0.04) 100%),
            #0A0A0A
          `,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display text-[clamp(80px,18vw,220px)] leading-none font-black text-white opacity-[0.025] tracking-tighter whitespace-nowrap">
          MOSCURE
        </span>
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-gradientcyan/10 border border-gradientcyan/20 text-gradientcyan font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full">
            🌙 JOIN THE MOVEMENT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display leading-none mb-6"
          style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
        >
          <span className="text-white heading-glow">RECLAIM</span>
          <br />
          <span className="gradient-text-full">YOUR NIGHTS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-textMuted font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Join thousands of Indian families who have switched to a safer, smarter
          way of mosquito protection. No chemicals. No compromise.
          Just peaceful nights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => onNavigate('product')}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(0,245,212,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gradientcyan text-background font-bold font-mono text-sm px-10 py-4 rounded-full shadow-xl shadow-gradientcyan/25 transition-all"
          >
            BUY NOW <span className="text-base">→</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,77,109,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-white/20 text-white font-bold font-mono text-sm px-10 py-4 rounded-full transition-all hover:border-gradientpink/50 hover:text-gradientpink hover:bg-gradientpink/5"
          >
            CONTACT US
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '10,000+', label: 'Families Protected' },
            { value: '100%', label: 'Chemical Free' },
            { value: '3500', label: 'Sq ft Coverage' },
            { value: '24/7', label: 'Silent Protection' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-white">{stat.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-textMuted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage({ onNavigate }) {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <BrandValuesTicker />
      <DiseasesSection onNavigate={onNavigate} />
      <TrustedByMarquee />
      <ComparisonSection onNavigate={onNavigate} />
      <FeaturesSection onNavigate={onNavigate} />
      <CTASection onNavigate={onNavigate} />
    </main>
  )
}
