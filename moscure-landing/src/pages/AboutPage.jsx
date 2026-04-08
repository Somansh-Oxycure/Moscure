import { useState, useRef, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
} from 'framer-motion'
import { animate } from 'framer-motion'
import {
  FlaskConical,
  Heart,
  BookOpen,
  Users,
  Cpu,
  ChevronDown,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react'

import imgDengue from '../assets/dengue.jpg'
import productImg from '../assets/product.png'
import outdoorImg from '../assets/product-outdoor.png'
import mosquitoSvg from '../assets/mosquito-silhouette.svg'

// ─── Static Data ──────────────────────────────────────────────────────────────

const STORY_CHAPTERS = [
  {
    id: 'origin',
    year: 'THE PROBLEM',
    title: 'A Preventable Crisis',
    body: `Mosquitoes kill more humans than any other animal on Earth. In India alone,
      millions suffer every year from Dengue, Malaria, and Chikungunya — diseases that
      are entirely preventable. Yet the market was full of chemical sprays, smoky coils,
      and temporary band-aid solutions that masked the problem while creating new ones.`,
    accent: '#FF4D6D',
    img: imgDengue,
    imgAlt: 'Mosquito-borne disease crisis in India',
  },
  {
    id: 'idea',
    year: 'THE IDEA',
    title: 'Science Over Chemicals',
    body: `Moscure was created to challenge the outdated, chemical-heavy approach to
      mosquito control. Instead of temporary relief through sprays and coils, the
      founders built around a simple but powerful principle: use science to eliminate
      the mosquito, not just repel it for a few hours.`,
    accent: '#FFD60A',
    img: productImg,
    imgAlt: 'Moscure UV-LED mosquito trap device',
  },
  {
    id: 'mission',
    year: 'THE MISSION',
    title: 'Breaking the Disease Cycle',
    body: `The goal was never just comfort — it was public health. Moscure focuses on
      science-driven, human-safe mosquito control that targets the problem at its source,
      reducing mosquito presence and breaking the cycle of disease transmission for
      families, communities, and cities across India.`,
    accent: '#00F5D4',
    img: outdoorImg,
    imgAlt: 'Moscure outdoor protection for Indian families',
  },
]

const VALUES_DATA = [
  {
    id: 'science',
    icon: FlaskConical,
    title: 'Scientifically Proven Protection',
    tagline: 'Tested. Trusted. Effective.',
    gradient: 'from-gradientpink to-gradientyellow',
    accentColor: '#FF4D6D',
    body: `Moscure is rigorously tested against all types of mosquitoes prevalent in
      India, including those carrying Dengue, Malaria, and Chikungunya. Our formulations
      are developed with cutting-edge research to ensure maximum efficacy and safety,
      providing a superior solution compared to conventional methods.`,
    mission: `To provide unparalleled, scientifically-backed protection against
      mosquito-borne diseases, safeguarding every home and outdoor space with
      trusted efficacy.`,
    impact: `Customers gain peace of mind knowing they are protected by a product
      proven effective against India's most dangerous mosquito threats, significantly
      reducing health risks for their families and communities.`,
  },
  {
    id: 'family',
    icon: Heart,
    title: 'Family Health & Safety',
    tagline: 'Safe for the ones who matter most.',
    gradient: 'from-gradientyellow to-gradientcyan',
    accentColor: '#FFD60A',
    body: `We prioritize the well-being of your family. Moscure's technology is
      carefully developed to be highly effective against mosquitoes while being
      completely safe for use around children and pets, both indoors and outdoors.
      We address the fear of disease with a reliable, non-toxic solution.`,
    mission: `To empower families with a safe, reliable solution that protects them
      from mosquito-borne illnesses, fostering a healthier, worry-free living
      environment for everyone.`,
    impact: `Families can enjoy indoor and outdoor activities without constant worry
      about mosquito bites and disease — leading to healthier, happier lives for
      every member of the household.`,
  },
  {
    id: 'awareness',
    icon: BookOpen,
    title: 'Awareness & Empowerment',
    tagline: 'Knowledge is the first line of defense.',
    gradient: 'from-gradientcyan to-gradientpink',
    accentColor: '#00F5D4',
    body: `Moscure is committed to raising awareness about the dangers of
      mosquito-borne diseases in India. We provide factual information, highlight
      the risks, and offer practical solutions — empowering our community to take
      proactive steps and make informed choices about their protection.`,
    mission: `To educate and equip individuals with the knowledge and tools necessary
      to combat mosquito threats effectively, fostering a more informed, proactive,
      and protected society across India.`,
    impact: `Through increased awareness, individuals are better equipped to understand
      risks and choose effective protection — leading to a collective reduction in
      disease incidence and a more resilient, informed community.`,
  },
]

const WHY_CHOOSE = [
  {
    id: 1,
    icon: Heart,
    title: 'FAMILY FIRST',
    description: 'Every decision we make prioritizes the health and safety of your loved ones. Always.',
    accentColor: '#FF4D6D',
    gradient: 'from-gradientpink to-gradientyellow',
  },
  {
    id: 2,
    icon: FlaskConical,
    title: 'PRECISION TESTED',
    description: 'Rigorously tested against all disease-carrying mosquito species found across India.',
    accentColor: '#FFD60A',
    gradient: 'from-gradientyellow to-gradientcyan',
  },
  {
    id: 3,
    icon: Users,
    title: 'TRUSTED BY THOUSANDS',
    description: 'Join families across India who have made Moscure their first line of defense.',
    accentColor: '#00F5D4',
    gradient: 'from-gradientcyan to-gradientpink',
  },
  {
    id: 4,
    icon: Cpu,
    title: 'INNOVATIVE TECH',
    description: 'Cutting-edge UV-LED phototaxis technology that works silently and effectively 24/7.',
    accentColor: '#FF4D6D',
    gradient: 'from-gradientpink via-gradientyellow to-gradientcyan',
  },
]

const COMMITMENT_STATS = [
  { value: 100, suffix: '%',  label: 'Satisfaction Guarantee', color: '#00F5D4', pulseClass: 'stat-pulse-1' },
  { value: 24,  suffix: '/7', label: 'Customer Support',       color: '#FFD60A', pulseClass: 'stat-pulse-2' },
  { value: 5,   suffix: '★',  label: 'Customer Rating',        color: '#FF4D6D', pulseClass: 'stat-pulse-3' },
]

const SPECIES_PILLS = [
  { name: 'Aedes aegypti',              disease: 'Dengue · Chikungunya', color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',  border: 'rgba(255,77,109,0.25)' },
  { name: 'Anopheles stephensi',        disease: 'Malaria',              color: '#FFD60A', bg: 'rgba(255,214,10,0.08)',  border: 'rgba(255,214,10,0.25)' },
  { name: 'Culex quinquefasciatus',     disease: 'Filariasis',           color: '#00F5D4', bg: 'rgba(0,245,212,0.08)',   border: 'rgba(0,245,212,0.25)'  },
  { name: 'All environments tested',    disease: 'Indoor & Outdoor',     color: '#FFFFFF', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)' },
]

const CTA_TRUST = [
  '✓ 100% Chemical-Free',
  '✓ Lab Tested',
  '✓ 24/7 Protection',
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const slowWordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const staggerContainer = (stagger = 0.12) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
})

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 18 } },
}

// ─── Helper: Split text into word spans ──────────────────────────────────────

function WordReveal({ text, className = '' }) {
  const words = text.trim().split(/\s+/)
  return (
    <motion.span
      className={className}
      variants={slowWordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.25em]">
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ─── Sub-Component: CommitmentStat ───────────────────────────────────────────

function CommitmentStat({ stat, index }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, stat.value, {
      duration: 2.2,
      delay: 0.4 + index * 0.2,
      ease: 'easeOut',
    })
    const unsub = count.on('change', (v) => setDisplay(Math.round(v)))
    return () => { controls.stop(); unsub() }
  }, [inView, stat.value, index])

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: 0.2 + index * 0.15 }}
      className={`${stat.pulseClass} flex flex-col items-center justify-center gap-2 bg-surface border border-borderDefault px-8 py-8 rounded-2xl min-w-[140px] flex-1`}
    >
      <span className="font-display text-5xl md:text-6xl leading-none" style={{ color: stat.color }}>
        {display}{stat.suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-textMuted text-center mt-1">
        {stat.label}
      </span>
    </motion.div>
  )
}

// ─── Sub-Component: TimelineChapter ─────────────────────────────────────────

function TimelineChapter({ chapter, index }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative flex items-start gap-0 w-full">
      {/* ── Desktop zigzag ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-start gap-0">
        {/* Left content cell */}
        <div className={`${isEven ? 'flex' : 'hidden md:flex'} justify-end pr-10 pt-2`}>
          {isEven && (
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="max-w-md w-full"
            >
              <ChapterCard chapter={chapter} index={index} />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: [0, 1.4, 1] } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
            className="w-4 h-4 rounded-full border-2 border-background z-10 shrink-0 mt-2"
            style={{ backgroundColor: chapter.accent }}
          />
        </div>

        {/* Right content cell */}
        <div className={`${!isEven ? 'flex' : 'hidden md:flex'} justify-start pl-10 pt-2`}>
          {!isEven && (
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="max-w-md w-full"
            >
              <ChapterCard chapter={chapter} index={index} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile single-column ── */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: [0, 1.4, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="w-3.5 h-3.5 rounded-full border-2 border-background z-10 shrink-0 mt-2"
          style={{ backgroundColor: chapter.accent }}
        />
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex-1"
        >
          <ChapterCard chapter={chapter} index={index} />
        </motion.div>
      </div>
    </div>
  )
}

function ChapterCard({ chapter, index }) {
  return (
    <div className="bg-surface/60 border border-borderDefault rounded-2xl p-6 md:p-8">
      <span
        className="font-mono text-xs uppercase tracking-widest mb-3 block"
        style={{ color: chapter.accent }}
      >
        {chapter.year}
      </span>
      <h3 className="font-display text-3xl text-white mb-3 leading-tight">{chapter.title}</h3>
      <p className="font-body text-sm text-textMuted leading-relaxed mb-5">{chapter.body}</p>
      {/* Real image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="aspect-video rounded-xl overflow-hidden border border-borderDefault"
        style={{ borderColor: `${chapter.accent}30` }}
      >
        <img
          src={chapter.img}
          alt={chapter.imgAlt}
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
      </motion.div>
    </div>
  )
}

// ─── Sub-Component: ValueCard (accordion) ────────────────────────────────────

function ValueCard({ value, isOpen, onToggle }) {
  const Icon = value.icon

  return (
    <motion.div
      variants={scaleIn}
      className="animated-border w-full"
    >
      <div className="bg-surface rounded-2xl overflow-hidden">
        {/* Top gradient accent */}
        <div className={`h-0.5 w-full bg-gradient-to-r ${value.gradient}`} />

        {/* Header — always visible */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-6 text-left hover:bg-surfaceHover transition-colors duration-200"
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${value.accentColor}20` }}
          >
            <motion.div
              animate={isOpen ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Icon size={20} style={{ color: value.accentColor }} />
            </motion.div>
          </div>

          {/* Title & tagline */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl text-white leading-tight">{value.title}</h3>
            <p className="font-body italic text-sm text-textMuted mt-0.5">{value.tagline}</p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="shrink-0"
          >
            <ChevronDown size={20} className="text-textMuted" />
          </motion.div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="border-t border-borderDefault pt-5 mb-5">
                  <p className="font-body text-sm text-textMuted leading-relaxed">{value.body}</p>
                </div>

                <motion.div
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Mission sub-card */}
                  <motion.div variants={fadeUp} className="bg-background rounded-xl border border-borderDefault p-4">
                    <span
                      className="font-mono text-xs uppercase tracking-widest mb-2 block"
                      style={{ color: value.accentColor }}
                    >
                      🎯 Mission
                    </span>
                    <p className="font-body text-sm text-white leading-relaxed">{value.mission}</p>
                  </motion.div>

                  {/* Impact sub-card */}
                  <motion.div variants={fadeUp} className="bg-background rounded-xl border border-borderDefault p-4">
                    <span
                      className="font-mono text-xs uppercase tracking-widest mb-2 block"
                      style={{ color: value.accentColor }}
                    >
                      💥 Impact
                    </span>
                    <p className="font-body text-sm text-textMuted leading-relaxed">{value.impact}</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Sub-Component: WhyTile ──────────────────────────────────────────────────

function WhyTile({ item, index }) {
  const Icon = item.icon

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      className="animated-border"
    >
      <div className="bg-surface rounded-2xl p-8 flex flex-col items-center text-center h-full">
        {/* Icon with orbit ring */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          {/* Orbit ring — desktop only */}
          <div
            className="hidden md:block absolute inset-0 rounded-full border orbit-ring"
            style={{ borderColor: `${item.accentColor}25` }}
          />
          {/* Icon square */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.gradient}`}
            style={{ opacity: 0.85 }}
          >
            <Icon size={28} className="text-background" style={{ color: '#0A0A0A' }} />
          </motion.div>
        </div>

        <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
        <p className="font-body text-sm text-textMuted leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Sub-Component: SpeciesPill ──────────────────────────────────────────────

function SpeciesPill({ pill, index }) {
  return (
    <motion.div
      variants={slideFromRight}
      className="flex items-start gap-3 rounded-xl px-5 py-3.5 border"
      style={{ background: pill.bg, borderColor: pill.border }}
    >
      <motion.div
        variants={popIn}
        custom={index}
        className="mt-0.5 shrink-0"
      >
        <CheckCircle2 size={16} style={{ color: pill.color }} />
      </motion.div>
      <div>
        <p className="font-body font-medium text-sm text-white">{pill.name}</p>
        <p className="font-mono text-xs text-textMuted mt-0.5">{pill.disease}</p>
      </div>
    </motion.div>
  )
}

// ─── Sub-Component: TrustPill ────────────────────────────────────────────────

function TrustPill({ label, index }) {
  return (
    <motion.span
      variants={popIn}
      custom={index}
      className="bg-surface border border-borderDefault rounded-full px-5 py-2 font-body text-sm text-white"
    >
      <span className="text-gradientcyan mr-1">{label.slice(0, 1)}</span>
      {label.slice(1)}
    </motion.span>
  )
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AboutPage({ onNavigate }) {
  const [activeValue, setActiveValue] = useState('science')
  const heroRef = useRef(null)

  const { scrollY } = useScroll()
  const watermarkX = useTransform(scrollY, [0, 500], [0, -20])
  const ctaWatermarkY = useTransform(scrollY, [2000, 4000], [0, -40])

  const toggleValue = (id) => {
    setActiveValue((prev) => (prev === id ? null : id))
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="about-hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-background noise-overlay"
      >
        {/* Radial glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-0 w-[500px] h-[500px] -translate-x-1/3 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/4 right-0 w-[400px] h-[400px] translate-x-1/4 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,77,109,0.04) 0%, transparent 70%)' }}
          />
        </div>

        {/* Decorative mosquito silhouette */}
        <div className="absolute bottom-0 right-0 w-64 md:w-[28rem] pointer-events-none select-none opacity-[0.04]">
          <img src={mosquitoSvg} alt="" aria-hidden="true" className="w-full" style={{ filter: 'invert(1)' }} />
        </div>

        {/* MOSCURE watermark */}
        <motion.div
          style={{ x: watermarkX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-display text-[22vw] text-white/[0.02] whitespace-nowrap leading-none">
            MOSCURE
          </span>
        </motion.div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
          {/* Section label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 mb-6"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-gradientcyan">
              ⬡ OUR STORY
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 overflow-hidden"
          >
            <div className="font-display text-[5rem] sm:text-8xl md:text-[10rem] leading-none text-white">
              {['ABOUT'].map((word, i) => (
                <motion.div key={i} variants={wordVariant} className="block">
                  {word}
                </motion.div>
              ))}
              <motion.div variants={wordVariant} className="block gradient-text-cyan-pink">
                MOSCURE
              </motion.div>
            </div>
          </motion.div>

          {/* Mission line — word-by-word reveal */}
          <div className="max-w-3xl mb-12">
            <WordReveal
              text="We're on a mission to protect every Indian family from mosquito-borne diseases through innovative technology and unwavering commitment to health."
              className="font-body text-xl md:text-2xl text-textMuted leading-relaxed"
            />
          </div>

          {/* Scroll indicator */}
          <motion.div
            custom={1.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2"
          >
            <div className="scroll-indicator">
              <ArrowDown size={16} className="text-textMuted" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-textMuted">
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — THE MOSCURE STORY
      ═══════════════════════════════════════════════════════════ */}
      <section id="story" className="relative py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientpink mb-4"
          >
            📖 OUR ORIGINS
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">THE MOSCURE</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-pink-yellow">STORY</motion.span>
            </div>
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Vertical center line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <motion.div
                className="w-full h-full origin-top"
                style={{ background: 'linear-gradient(to bottom, #FF4D6D, #FFD60A, #00F5D4)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </div>

            {/* Vertical left-edge line — mobile */}
            <div className="md:hidden absolute left-1.5 top-0 bottom-0 w-px">
              <motion.div
                className="w-full h-full origin-top"
                style={{ background: 'linear-gradient(to bottom, #FF4D6D, #FFD60A, #00F5D4)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </div>

            {/* Chapters */}
            <div className="flex flex-col gap-16 md:gap-20">
              {STORY_CHAPTERS.map((chapter, index) => (
                <TimelineChapter key={chapter.id} chapter={chapter} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — OUR MISSION
      ═══════════════════════════════════════════════════════════ */}
      <section id="mission" className="relative py-24 md:py-36 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-4"
          >
            🎯 WHAT DRIVES US
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">OUR</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-yellow-cyan">MISSION</motion.span>
            </div>
          </motion.div>

          {/* 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left — quote + prose */}
            <div className="relative">
              {/* Decorative quote mark */}
              <span
                className="absolute -top-8 -left-4 font-display text-[9rem] leading-none pointer-events-none select-none"
                style={{ color: 'rgba(0,245,212,0.08)' }}
                aria-hidden="true"
              >
                "
              </span>

              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex flex-col gap-5"
              >
                <motion.p variants={fadeUp} className="font-body text-lg text-white leading-relaxed">
                  Every year, millions of Indians suffer from mosquito-borne diseases.
                  We believe this is preventable.
                </motion.p>
                <motion.p variants={fadeUp} className="font-body text-base text-textMuted leading-relaxed">
                  Moscure was created to provide a safe, effective, and reliable solution
                  that works 24/7 to protect families across India. Our technology has been
                  rigorously tested against all major disease-carrying mosquito species
                  found in India — proven to eliminate, not just repel.
                </motion.p>
                <motion.p variants={fadeUp} className="font-body italic text-sm text-gradientcyan">
                  This is our promise. This is our purpose.
                </motion.p>
              </motion.div>
            </div>

            {/* Right — species pills */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-textMuted mb-5">
                Rigorously Tested Against:
              </p>
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-3"
              >
                {SPECIES_PILLS.map((pill, i) => (
                  <SpeciesPill key={pill.name} pill={pill} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — OUR VALUES
      ═══════════════════════════════════════════════════════════ */}
      <section id="values" className="relative py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4"
          >
            💡 WHAT WE STAND FOR
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">OUR</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-yellow-cyan">VALUES</motion.span>
            </div>
          </motion.div>

          {/* Accordion stack */}
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col gap-4"
          >
            {VALUES_DATA.map((value) => (
              <ValueCard
                key={value.id}
                value={value}
                isOpen={activeValue === value.id}
                onToggle={() => toggleValue(value.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — WHY CHOOSE MOSCURE
      ═══════════════════════════════════════════════════════════ */}
      <section id="why-choose" className="relative py-24 md:py-36 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientpink mb-4"
          >
            ⭐ THE DIFFERENCE
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">WHY CHOOSE</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-cyan-pink">MOSCURE</motion.span>
            </div>
          </motion.div>

          {/* 2×2 tiles */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {WHY_CHOOSE.map((item, index) => (
              <WhyTile key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — OUR COMMITMENT
      ═══════════════════════════════════════════════════════════ */}
      <section id="commitment" className="relative py-24 md:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-4"
          >
            🤝 OUR PROMISE
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">OUR</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-pink-yellow">COMMITMENT</motion.span>
            </div>
          </motion.div>

          {/* 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left — prose */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <motion.p variants={slideFromLeft} className="font-body text-base text-textMuted leading-loose">
                We are committed to continuous innovation and improvement. Our research team
                works tirelessly to enhance Moscure's effectiveness, ensuring it remains the
                most advanced mosquito-catching solution in India.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="h-px bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan opacity-30"
              />
              <motion.p variants={slideFromLeft} className="font-body text-base text-textMuted leading-loose">
                We believe that every family deserves protection from mosquito-borne diseases.
                That's why we've made Moscure accessible, reliable, and backed by comprehensive
                customer support — available every hour of every day.
              </motion.p>
            </motion.div>

            {/* Right — stat circles */}
            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-row gap-4 items-center justify-center lg:justify-end flex-wrap"
            >
              {COMMITMENT_STATS.map((stat, index) => (
                <CommitmentStat key={stat.label} stat={stat} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — JOIN THE MOSCURE FAMILY (CTA)
      ═══════════════════════════════════════════════════════════ */}
      <section id="join" className="relative py-24 md:py-40 overflow-hidden noise-overlay">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-background pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,245,212,0.05) 0%, rgba(255,77,109,0.04) 100%)',
            }}
          />
        </div>

        {/* FAMILY watermark */}
        <motion.div
          style={{ y: ctaWatermarkY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-display text-[18vw] text-white/[0.025] whitespace-nowrap leading-none">
            FAMILY
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientpink mb-6"
          >
            ❤ BECOME PART OF THE MISSION
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="font-display text-6xl md:text-8xl leading-none">
              <motion.span variants={wordVariant} className="block text-white">JOIN THE</motion.span>
              <motion.span variants={wordVariant} className="block gradient-text-cyan-pink">MOSCURE FAMILY</motion.span>
            </div>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-body text-base text-textMuted max-w-2xl mx-auto leading-loose mb-10"
          >
            Experience the difference that advanced technology and genuine care can make
            in protecting your family from mosquito-borne disease.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {CTA_TRUST.map((label, i) => (
              <TrustPill key={label} label={label} index={i} />
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,245,212,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.('product')}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-mono font-bold text-sm text-background bg-gradientcyan tracking-widest uppercase transition-all"
            >
              View Product →
            </motion.button>
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.('landing')}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-mono font-bold text-sm text-white border border-white/20 tracking-widest uppercase transition-all"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
