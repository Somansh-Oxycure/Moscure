import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import {
  ShieldCheck, Maximize2, Clock, Target,
  Check, X, Trophy, ChevronRight,
  Zap, Droplets, Flame, Plug, ChevronDown,
} from 'lucide-react'

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerWords = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const ADVANTAGE_TABLE = {
  columns: ['Type', 'Technology', 'Insects Targeted', 'Health Impact', 'Application', 'Water Resistant', 'Coverage'],
  rows: [
    {
      id: 'moscure',
      isMoscure: true,
      label: 'Moscure Trap',
      Icon: ShieldCheck,
      technology: 'Patented MLID & Phototaxis Technology',
      insects: 'Mosquito, Fly, Moth, Fruit-Fly, Yellow Jacket, Beetle, Gnats',
      health: ['100% Chemical & Smoke-Free', 'Safe for Kids & Pets', 'Continuous 24/7 Protection'],
      application: 'Indoor & Outdoor',
      waterResistant: true,
      coverage: 'Large (up to 3230 sq ft)',
    },
    {
      id: 'racket',
      isMoscure: false,
      label: 'Electric Racket',
      Icon: Zap,
      technology: 'Electrocution',
      insects: 'Mosquito, Fly',
      health: ['Manual use — not passive', 'Adult supervision required', 'No all-day protection'],
      application: 'Indoor & Outdoor',
      waterResistant: false,
      coverage: 'Localised only',
    },
    {
      id: 'glue',
      isMoscure: false,
      label: 'Glue / Velcro Trap',
      Icon: Target,
      technology: 'Adhesive glue trap',
      insects: 'Mosquito, Flying Insects',
      health: ['No harmful emissions', 'Limited catch capacity', 'Frequent replacement needed'],
      application: 'Indoor only',
      waterResistant: false,
      coverage: 'Corners & entry points only',
    },
    {
      id: 'spray',
      isMoscure: false,
      label: 'Chemical Spray',
      Icon: Droplets,
      technology: 'Chemical insecticide aerosol',
      insects: 'Mosquito',
      health: ['High inhalation risk', 'Unsafe near children & pets', 'Not preventive — reactive only'],
      application: 'Indoor & Outdoor',
      waterResistant: false,
      coverage: 'Spot / local area only',
    },
    {
      id: 'vaporiser',
      isMoscure: false,
      label: 'Liquid Vaporiser',
      Icon: Plug,
      technology: 'Chemical-based heated repellent',
      insects: 'Mosquito, Fly, Moth',
      health: ['Irritant in poor ventilation', 'Chemical emissions 24/7', 'Constant refills needed'],
      application: 'Indoor only',
      waterResistant: false,
      coverage: 'Small–medium room only',
    },
    {
      id: 'coil',
      isMoscure: false,
      label: 'Mosquito Coil',
      Icon: Flame,
      technology: 'Chemical smoke repellent',
      insects: 'Mosquito',
      health: ['Smoke ≈ 100 cigarette equivalent', 'Not advised for indoor use', 'Fire hazard risk'],
      application: 'Outdoor / Semi-indoor',
      waterResistant: false,
      coverage: 'Small–medium area only',
    },
  ],
}

const VERDICT_TYPES = [
  {
    id: 'spray',
    name: 'Chemical Spray',
    subtitle: 'Insecticide Aerosol',
    Icon: Droplets,
    description:
      'Highly reactive — kills on contact but offers zero passive protection. Toxic if inhaled. Must clear the room after use. High inhalation risk. No ongoing defense.',
    scores: { chemical_free: 0, coverage: 22, child_safe: 10, effectiveness: 42, maintenance: 55 },
    moscureScores: { chemical_free: 100, coverage: 92, child_safe: 100, effectiveness: 95, maintenance: 90 },
    accentClass: 'text-gradientpink',
    accentBg: 'bg-gradientpink/10',
    accentBorder: 'border-gradientpink/30',
    accentHex: '#FF4D6D',
  },
  {
    id: 'vaporiser',
    name: 'Liquid Vaporiser',
    subtitle: 'Chemical-Based Heated Repellent',
    Icon: Plug,
    description:
      'Emits chemical compounds continuously in enclosed spaces. Indoor-only with limited coverage. Requires power and constant refills. Irritant in poor ventilation.',
    scores: { chemical_free: 10, coverage: 30, child_safe: 32, effectiveness: 52, maintenance: 37 },
    moscureScores: { chemical_free: 100, coverage: 92, child_safe: 100, effectiveness: 95, maintenance: 90 },
    accentClass: 'text-gradientyellow',
    accentBg: 'bg-gradientyellow/10',
    accentBorder: 'border-gradientyellow/30',
    accentHex: '#FFD60A',
  },
  {
    id: 'coil',
    name: 'Mosquito Coil',
    subtitle: 'Chemical Smoke Repellent',
    Icon: Flame,
    description:
      'Burning coil releases smoke equivalent to 100 cigarettes. Not advised for indoor use. Fire hazard. Covers only a small outdoor zone with no passive protection.',
    scores: { chemical_free: 5, coverage: 20, child_safe: 8, effectiveness: 35, maintenance: 65 },
    moscureScores: { chemical_free: 100, coverage: 92, child_safe: 100, effectiveness: 95, maintenance: 90 },
    accentClass: 'text-gradientpink',
    accentBg: 'bg-gradientpink/10',
    accentBorder: 'border-gradientpink/30',
    accentHex: '#FF4D6D',
  },
  {
    id: 'racket',
    name: 'Electric Racket',
    subtitle: 'Manual Electrocution Device',
    Icon: Zap,
    description:
      'Active manual use only — requires adult supervision and swinging effort. Zero protection during sleep. Covers only arm reach. No passive or preventive defense.',
    scores: { chemical_free: 80, coverage: 15, child_safe: 45, effectiveness: 38, maintenance: 72 },
    moscureScores: { chemical_free: 100, coverage: 92, child_safe: 100, effectiveness: 95, maintenance: 90 },
    accentClass: 'text-gradientcyan',
    accentBg: 'bg-gradientcyan/10',
    accentBorder: 'border-gradientcyan/30',
    accentHex: '#00F5D4',
  },
]

const HERO_STATS = [
  { value: 5, suffix: '+', label: 'Product Types Compared', color: 'text-gradientcyan' },
  { value: 7, suffix: '',  label: 'Categories Evaluated',   color: 'text-gradientyellow' },
  { value: 1, suffix: '',  label: 'Clear Winner',           color: 'text-gradientpink' },
]

const WHY_MOSCURE = [
  {
    id: 1,
    stat: '0',
    statSuffix: ' Chemicals',
    label: 'vs. Toxic Alternatives',
    description:
      'Chemical sprays, vaporisers, and coils flood your home with toxins inhaled by your family 24/7. Moscure uses patented MLID and Phototaxis technology. Zero chemicals. Ever.',
    Icon: ShieldCheck,
    color: 'text-gradientcyan',
    hex: '#00F5D4',
  },
  {
    id: 2,
    stat: '300',
    statSuffix: ' sq.m',
    label: 'vs. Single-Room Solutions',
    description:
      'Liquid vaporisers and coils protect a single small zone. Moscure covers your entire garden, terrace, or outdoor space. One device. Total coverage — inside and out.',
    Icon: Maximize2,
    color: 'text-gradientyellow',
    hex: '#FFD60A',
  },
  {
    id: 3,
    stat: '24/7',
    statSuffix: '',
    label: 'vs. Reactive Sprays',
    description:
      'Aerosol sprays only kill what is already in the room. Moscure works passively and continuously, trapping insects before they ever reach you — even while you sleep.',
    Icon: Clock,
    color: 'text-gradientpink',
    hex: '#FF4D6D',
  },
  {
    id: 4,
    stat: '5+',
    statSuffix: ' Species',
    label: 'vs. Single-Pest Products',
    description:
      "Coils and sprays target only mosquitoes. Moscure's phototaxis technology eliminates mosquitoes, flies, moths, beetles, gnats, and more — all in one device.",
    Icon: Target,
    color: 'text-gradientcyan',
    hex: '#00F5D4',
  },
]

const SCORE_CRITERIA = [
  { key: 'chemical_free', label: 'Chemical-Free'    },
  { key: 'coverage',      label: 'Coverage Area'    },
  { key: 'child_safe',    label: 'Child & Pet Safe' },
  { key: 'effectiveness', label: 'Effectiveness'    },
  { key: 'maintenance',   label: 'Low Maintenance'  },
]

const CTA_PILLS = [
  'Chemical-Free',
  'Covers 3230 sq ft',
  'Child & Pet Safe',
  'Indoor & Outdoor',
  '24/7 Protection',
]

// ─── CountUp ──────────────────────────────────────────────────────────────────

function CountUp({ to, duration = 1.6, suffix = '' }) {
  const ref = useRef(null)
  const motionVal = useMotionValue(0)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return controls.stop
  }, [inView, to, suffix, duration, motionVal])

  return <span ref={ref}>0{suffix}</span>
}

// ─── StatBadge ────────────────────────────────────────────────────────────────

function StatBadge({ stat, index }) {
  const isNumeric = !isNaN(Number(stat.value))

  return (
    <motion.div
      variants={itemFade}
      className="flex flex-col items-center gap-1 bg-surface/60 border border-borderDefault rounded-2xl px-8 py-6 flex-1 min-w-[140px]"
    >
      <span className={`font-display text-5xl leading-none ${stat.color}`}>
        {isNumeric ? (
          <CountUp to={stat.value} suffix={stat.suffix} />
        ) : (
          `${stat.value}${stat.suffix}`
        )}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted text-center leading-snug">
        {stat.label}
      </span>
    </motion.div>
  )
}

// ─── ReasonCard ───────────────────────────────────────────────────────────────

function ReasonCard({ item }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isNumeric = !isNaN(Number(item.stat.replace(/\+/, '')))

  return (
    <motion.div
      ref={ref}
      variants={itemFade}
      whileHover={{ y: -4 }}
      className="animated-border"
    >
      <div className="bg-surface rounded-2xl p-6 h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${item.hex}18` }}
          >
            <item.Icon size={20} style={{ color: item.hex }} />
          </div>
          <div className="text-right">
            <p className={`font-display text-4xl leading-none ${item.color}`}>
              {isNumeric ? (
                <>{item.stat}{item.statSuffix}</>
              ) : (
                `${item.stat}${item.statSuffix}`
              )}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-textMuted mt-0.5">
              {item.label}
            </p>
          </div>
        </div>
        <p className="font-body text-sm text-textMuted leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

// ─── CheckCell ────────────────────────────────────────────────────────────────

function CheckCell({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (value) {
    return (
      <div ref={ref} className="flex justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className={inView ? 'check-draw' : ''}
          stroke="#00F5D4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4,11 9,16 18,6" />
        </svg>
      </div>
    )
  }

  return (
    <div ref={ref} className="flex justify-center">
      <motion.div
        initial={{ scale: 2, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <X size={18} className="text-gradientpink" />
      </motion.div>
    </div>
  )
}

// ─── TableRow ─────────────────────────────────────────────────────────────────

function TableRow({ row, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`table-row-hover transition-colors ${
        row.isMoscure
          ? 'bg-gradientcyan/5 border-l-2 border-l-gradientcyan'
          : index % 2 === 0
            ? 'bg-surface'
            : 'bg-surface/60'
      }`}
    >
      {/* Type */}
      <td className={`px-5 py-4 ${row.isMoscure ? 'sticky left-0 z-10 bg-[#0D1A18]' : 'sticky left-0 z-10 bg-[#111111]'}`}>
        <div className="flex items-center gap-2.5 min-w-[160px]">
          {row.isMoscure ? (
            <ShieldCheck size={18} className="text-gradientcyan shrink-0" />
          ) : (
            <row.Icon size={16} className="text-textMuted shrink-0" />
          )}
          <div>
            <p className={`font-mono text-xs font-bold ${row.isMoscure ? 'text-gradientcyan' : 'text-white'}`}>
              {row.label}
            </p>
            {row.isMoscure && (
              <span className="font-mono text-[9px] uppercase tracking-widest bg-gradientcyan/15 text-gradientcyan border border-gradientcyan/30 rounded-full px-2 py-0.5 mt-1 inline-block">
                BEST CHOICE
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Technology */}
      <td className="px-5 py-4">
        <p className={`font-body text-xs leading-snug max-w-[200px] ${row.isMoscure ? 'text-white font-medium' : 'text-textMuted'}`}>
          {row.technology}
        </p>
      </td>

      {/* Insects Targeted */}
      <td className="px-5 py-4">
        <p className={`font-body text-xs leading-snug max-w-[180px] ${row.isMoscure ? 'text-white font-medium' : 'text-textMuted'}`}>
          {row.insects}
        </p>
      </td>

      {/* Health Impact */}
      <td className="px-5 py-4">
        <ul className="flex flex-col gap-1 max-w-[200px]">
          {row.health.map((h) => (
            <li key={h} className="flex items-start gap-1.5">
              <span className={`font-mono text-xs shrink-0 ${row.isMoscure ? 'text-gradientcyan' : 'text-gradientpink'}`}>
                {row.isMoscure ? '✓' : '—'}
              </span>
              <span className={`font-body text-xs leading-snug ${row.isMoscure ? 'text-white' : 'text-textMuted'}`}>
                {h}
              </span>
            </li>
          ))}
        </ul>
      </td>

      {/* Application */}
      <td className="px-5 py-4">
        <p className={`font-body text-xs ${row.isMoscure ? 'text-white font-medium' : 'text-textMuted'}`}>
          {row.application}
        </p>
      </td>

      {/* Water Resistant */}
      <td className="px-5 py-4 text-center">
        <CheckCell value={row.waterResistant} />
      </td>

      {/* Coverage */}
      <td className="px-5 py-4">
        <p className={`font-body text-xs ${row.isMoscure ? 'text-gradientcyan font-bold' : 'text-textMuted italic'}`}>
          {row.coverage}
        </p>
      </td>
    </motion.tr>
  )
}

// ─── ScoreBar ─────────────────────────────────────────────────────────────────

function ScoreBar({ label, moscureScore, competitorScore, accentHex, index, inView }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted">{label}</span>

      {/* Moscure bar */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-gradientcyan w-14 shrink-0">MOSCURE</span>
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradientcyan"
            initial={{ width: 0 }}
            animate={inView ? { width: `${moscureScore}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-mono text-[9px] text-gradientcyan w-7 text-right shrink-0">{moscureScore}%</span>
      </div>

      {/* Competitor bar */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-textMuted w-14 shrink-0">OTHERS</span>
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: `${accentHex}60` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${competitorScore}%` } : { width: 0 }}
            transition={{ duration: 1.4, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-mono text-[9px] text-textMuted w-7 text-right shrink-0">{competitorScore}%</span>
      </div>
    </div>
  )
}

// ─── VerdictCard ──────────────────────────────────────────────────────────────

function VerdictCard({ brand, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotateY: 2, rotateX: -1 }}
      style={{ perspective: 800 }}
      className="animated-border"
    >
      <div className="bg-surface rounded-2xl p-6 h-full flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${brand.accentBg} ${brand.accentBorder}`}
          >
            <brand.Icon size={20} className={brand.accentClass} />
          </div>
          <div className="flex-1">
            <p className="font-display text-2xl text-white leading-none">{brand.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-textMuted mt-0.5">
              {brand.subtitle}
            </p>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={onToggle}
            className="md:hidden w-7 h-7 rounded-full border border-borderDefault flex items-center justify-center text-textMuted shrink-0 mt-0.5"
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>
        </div>

        {/* Score Bars — always visible on md+, toggled on mobile */}
        <div className={`flex flex-col gap-3 ${isExpanded ? 'block' : 'hidden md:flex'}`}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-textMuted">Score Comparison</p>
          {SCORE_CRITERIA.map((c, i) => (
            <ScoreBar
              key={c.key}
              label={c.label}
              moscureScore={brand.moscureScores[c.key]}
              competitorScore={brand.scores[c.key]}
              accentHex={brand.accentHex}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Verdict */}
        <div className={`border-l-2 border-gradientcyan/40 pl-3 mt-auto ${isExpanded ? 'block' : 'hidden md:block'}`}>
          <p className="font-mono text-[9px] uppercase tracking-widest text-gradientcyan mb-1">The Verdict</p>
          <p className="font-body text-xs text-textMuted italic leading-relaxed">{brand.description}</p>
        </div>

        {/* Winner badge */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="self-start bg-gradientcyan/10 border border-gradientcyan/40 rounded-full px-4 py-1.5"
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gradientcyan flex items-center gap-1.5">
            <Check size={11} />
            MOSCURE WINS
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── FeaturePill ──────────────────────────────────────────────────────────────

function FeaturePill({ label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex items-center gap-2 bg-surface border border-borderDefault rounded-full px-4 py-1.5"
    >
      <Check size={12} className="text-gradientcyan shrink-0" />
      <span className="font-body text-sm text-white">{label}</span>
    </motion.div>
  )
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ComparisonPage({ onNavigate }) {
  const [expandedCard, setExpandedCard] = useState(null)

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const handleToggle = (id) => setExpandedCard((prev) => (prev === id ? null : id))

  return (
    <div className="bg-background text-textPrimary overflow-x-hidden">

      {/* ─── SECTION 1 — WHY MOSCURE WINS ─────────────────────────────────────── */}
      <section
        id="why-moscure"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)' }}
          />
          {/* Diagonal hatching */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #00F5D4 0px, #00F5D4 1px, transparent 1px, transparent 12px)',
            }}
          />
        </div>

        <div ref={heroRef} className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">

          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="flex justify-center mb-6"
          >
            <span className="font-mono text-xs uppercase tracking-widest bg-gradientcyan/10 border border-gradientcyan/40 text-gradientcyan rounded-full px-4 py-1.5">
              ⚔ THE DEFINITIVE VERDICT
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="text-center mb-6"
          >
            {['WHY', 'MOSCURE WINS'].map((word, i) => (
              <motion.div key={word} variants={wordVariants}>
                <h1
                  className={`font-display leading-none ${i === 1 ? 'gradient-text-cyan-pink' : 'text-white'} text-7xl md:text-[9rem]`}
                >
                  {word}
                </h1>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="font-body text-base text-textMuted text-center max-w-2xl mx-auto leading-relaxed mb-12"
          >
            India's repellent market is dominated by chemical-based products that mask the problem
            while creating new ones. We built something different. Here's the proof.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {HERO_STATS.map((s, i) => (
              <StatBadge key={s.label} stat={s} index={i} />
            ))}
          </motion.div>

          {/* 4 Reason Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {WHY_MOSCURE.map((item) => (
              <ReasonCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2 — THE MOSCURE ADVANTAGE TABLE ──────────────────────────── */}
      <section id="advantage" className="relative py-20 md:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest bg-surface border border-borderDefault text-textMuted rounded-full px-4 py-1.5">
              📊 HEAD TO HEAD
            </span>
          </motion.div>

          {/* Section heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-4"
          >
            {['THE MOSCURE', 'ADVANTAGE'].map((word, i) => (
              <motion.div key={word} variants={wordVariants}>
                <h2
                  className={`font-display leading-none ${i === 1 ? 'gradient-text-yellow-cyan' : 'text-white'} text-5xl md:text-7xl`}
                >
                  {word}
                </h2>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm text-textMuted text-center max-w-xl mx-auto mb-10"
          >
            Data derived from lab tests and publicly available product specifications of leading
            mosquito repellent categories.
          </motion.p>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-borderDefault">
            <table className="w-full min-w-[900px] border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-surface border-b-2 border-gradientcyan/30 sticky top-0 z-10 backdrop-blur-md">
                  {ADVANTAGE_TABLE.columns.map((col) => (
                    <th key={col} className="px-5 py-4 text-left first:sticky first:left-0 first:z-20 first:bg-surface">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted">
                        {col}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADVANTAGE_TABLE.rows.map((row, i) => (
                  <TableRow key={row.id} row={row} index={i} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Sourcing note */}
          <p className="font-body text-xs text-textMuted text-center mt-5 italic max-w-2xl mx-auto">
            * Data based on publicly available product specifications for each repellent category.
            Effectiveness figures from Moscure internal lab data.
          </p>
        </div>
      </section>

      {/* ─── SECTION 3 — THE VERDICT ──────────────────────────────────────────── */}
      <section id="verdict" className="relative py-20 md:py-28">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,77,109,0.05) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest bg-surface border border-borderDefault text-textMuted rounded-full px-4 py-1.5">
              🏆 CATEGORY BY CATEGORY
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-4"
          >
            {['THE', 'VERDICT'].map((word, i) => (
              <motion.div key={word} variants={wordVariants}>
                <h2
                  className={`font-display leading-none ${i === 1 ? 'gradient-text-pink-yellow' : 'text-white'} text-5xl md:text-7xl`}
                >
                  {word}
                </h2>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm text-textMuted text-center max-w-xl mx-auto mb-12"
          >
            We went category by category across every alternative on the market. This is what we found.
          </motion.p>

          {/* Verdict cards 2×2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERDICT_TYPES.map((brand, i) => (
              <VerdictCard
                key={brand.id}
                brand={brand}
                index={i}
                isExpanded={expandedCard === brand.id}
                onToggle={() => handleToggle(brand.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 — MAKE THE SMART CHOICE ───────────────────────────────── */}
      <section
        id="smart-choice"
        className="relative py-24 md:py-32 overflow-hidden noise-overlay"
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,245,212,0.05) 0%, rgba(255,214,10,0.03) 40%, transparent 70%)' }}
          />
        </div>

        {/* Decorative trophy */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none">
          <Trophy
            size={320}
            className="text-white/[0.025]"
            style={{ animation: 'rotateTrophy 20s linear infinite' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — content */}
            <div>
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <Trophy size={15} className="text-gradientyellow" />
                <span className="font-mono text-xs uppercase tracking-widest text-gradientyellow">
                  THE CHOICE IS CLEAR
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                variants={staggerWords}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="mb-6"
              >
                {['MAKE THE', 'SMART CHOICE'].map((word, i) => (
                  <motion.div key={word} variants={wordVariants}>
                    <h2 className={`font-display leading-none ${i === 1 ? 'gradient-text-cyan-pink' : 'text-white'} text-5xl md:text-7xl`}>
                      {word}
                    </h2>
                  </motion.div>
                ))}
              </motion.div>

              {/* Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <p className="font-body text-sm text-textMuted leading-relaxed mb-3">
                  Join thousands of Indian families who've replaced chemical repellents with
                  Moscure's scientifically proven, 100% chemical-free protection.
                </p>
                <p className="font-mono text-sm text-white">
                  No refills. No toxins. No compromises.
                </p>
              </motion.div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {CTA_PILLS.map((label, i) => (
                  <FeaturePill key={label} label={label} index={i} />
                ))}
              </div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={() => onNavigate?.('product')}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,245,212,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-gradientcyan text-background font-mono font-bold text-sm rounded-full px-7 py-3.5"
                >
                  VIEW PRODUCTS <ChevronRight size={16} />
                </motion.button>
                <motion.button
                  onClick={() => onNavigate?.('landing')}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 border border-white/20 text-white font-mono text-sm rounded-full px-7 py-3.5 transition-colors"
                >
                  CONTACT US
                </motion.button>
              </motion.div>
            </div>

            {/* Right — cost comparison widget (desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block animated-border"
            >
              <div className="bg-surface rounded-2xl p-8 flex flex-col gap-6">

                {/* Others */}
                <div className="flex flex-col gap-2 pb-6 border-b border-borderDefault">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-textMuted">
                    Chemical alternatives
                  </p>
                  <p className="font-display text-3xl text-white/50 line-through decoration-gradientpink">
                    ₹800+<span className="text-xl">/year</span>
                  </p>
                  <p className="font-body text-xs text-textMuted">
                    Ongoing refills, replacements &amp; hidden costs — forever.
                  </p>
                  <div className="flex flex-col gap-1.5 mt-2">
                    {['Constant refills needed', 'Multiple products per room', 'Toxic exposure every day'].map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <X size={11} className="text-gradientpink shrink-0" />
                        <span className="font-body text-xs text-textMuted">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moscure */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gradientcyan">
                    Moscure — One-time investment
                  </p>
                  <motion.p
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="font-display text-4xl text-gradientcyan"
                  >
                    ₹3,299 <span className="text-xl text-textMuted">/ ₹21,599</span>
                  </motion.p>
                  <p className="font-mono text-xs text-white">Indoor  /  Outdoor</p>
                  <div className="flex flex-col gap-1.5 mt-2">
                    {['Zero recurring cost', 'No refills. Ever.', '100% chemical-free protection'].map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <Check size={11} className="text-gradientcyan shrink-0" />
                        <span className="font-body text-xs text-white">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}
