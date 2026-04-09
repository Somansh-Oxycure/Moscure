import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, animate, useInView } from 'framer-motion'
import {
  ShieldCheck, Droplets, Activity, Bell,
  ChevronDown, AlertTriangle, Shield,
} from 'lucide-react'

import imgDengue        from '../assets/dengue.jpg'
import imgDengueDecp    from '../assets/dengue_decp.jpg'
import imgMalaria       from '../assets/Malaria.jpg'
import imgMalariaDecp   from '../assets/Malaria_decp.jpg'
import imgChikungunya      from '../assets/Chikungunya,jpg.jpg'
import imgChikungunyaDecp  from '../assets/Chikungunya_decp.jpg'
import imgJE            from '../assets/Japanese_Encephalitis.jpg'
import imgJEDecp        from '../assets/Japanese_Encephalitis_decp.jpg'

// ─── Local mosquito images ────────────────────────────────────────────────────
const MOSQUITO_IMAGES = {
  dengue:                imgDengue,
  malaria:               imgMalaria,
  chikungunya:           imgChikungunya,
  japanese_encephalitis: imgJE,
}

const MOSQUITO_IMAGES_DECP = {
  dengue:                imgDengueDecp,
  malaria:               imgMalariaDecp,
  chikungunya:           imgChikungunyaDecp,
  japanese_encephalitis: imgJEDecp,
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const HERO_STATS = [
  { stat: 700,  suffix: 'M+', label: 'People Infected by Mosquitoes Globally Each Year', color: '#FF4D6D' },
  { stat: 830,  suffix: 'K+', label: 'Global Deaths From Mosquito Diseases Annually',     color: '#FFD60A' },
  { stat: 40,   suffix: 'M+', label: 'Cases in India Every Year',                        color: '#00F5D4' },
]

const DISEASES_DATA = [
  {
    id: 'dengue',
    name: 'Dengue Fever',
    mosquito: 'Aedes aegypti',
    mosquitoLabel: 'Yellow Fever Mosquito',
    biteTime: 'Daytime biter',
    dangerLevel: 85,
    accentColor: '#FF4D6D',
    urgencyTag: '⚠ 390M+ GLOBAL INFECTIONS YEARLY',
    keyFact: `Dengue is the world's fastest-spreading mosquito-borne disease, infecting an estimated
      390 million people globally every year — 96 million of which are clinically apparent.
      In India, 40 million+ cases are recorded annually, peaking during monsoon season.
      A single bite can be deadly. Moscure protects day and night.`,
    symptoms: [
      'High fever & severe headache',
      'Pain behind the eyes',
      'Joint and muscle pain',
      'Fatigue, nausea, vomiting',
      'Skin rash',
      'Severe cases: plasma leakage, bleeding, organ impairment',
    ],
    affectedRegions: [
      { name: 'Delhi NCR',     severity: 90 },
      { name: 'Mumbai',        severity: 85 },
      { name: 'Uttar Pradesh', severity: 80 },
      { name: 'West Bengal',   severity: 75 },
      { name: 'Maharashtra',   severity: 78 },
    ],
    prevention: [
      'Eliminate stagnant water in pots, tires, and coolers',
      'Use mosquito repellents and wear protective clothing',
      'Ensure windows and doors have screens',
      'Moscure targets all disease-carrying mosquitoes indoors and outdoors',
    ],
  },
  {
    id: 'malaria',
    name: 'Malaria',
    mosquito: 'Anopheles',
    mosquitoLabel: 'Malaria Mosquito',
    biteTime: 'Dusk & dawn biter',
    dangerLevel: 78,
    accentColor: '#FFD60A',
    urgencyTag: '⚠ 249M CASES GLOBALLY IN 2023',
    keyFact: `Malaria killed 608,000 people globally in 2023 alone — one child every two minutes.
      WHO reported 249 million cases worldwide, with Sub-Saharan Africa and South Asia bearing
      the heaviest burden. In India, over 1.5 million official cases are reported annually;
      the true burden is estimated to be far higher. Children under 5 are most at risk.`,
    symptoms: [
      'Fever, chills, and sweating',
      'Severe headache',
      'Nausea and vomiting',
      'Body aches and general malaise',
      'Severe cases: organ failure, seizures, coma',
      'Can be fatal if untreated',
    ],
    affectedRegions: [
      { name: 'Odisha',           severity: 92 },
      { name: 'Chhattisgarh',     severity: 88 },
      { name: 'Jharkhand',        severity: 85 },
      { name: 'Madhya Pradesh',   severity: 80 },
      { name: 'North-East States',severity: 76 },
    ],
    prevention: [
      'Use insecticide-treated bed nets',
      'Spray insecticides indoors',
      'Eliminate mosquito breeding sites',
      'Avoid outdoor activity during dusk and dawn',
      'Moscure provides continuous protection when Anopheles are most active',
    ],
  },
  {
    id: 'chikungunya',
    name: 'Chikungunya',
    mosquito: 'Aedes aegypti & Aedes albopictus',
    mosquitoLabel: 'Asian Tiger Mosquito',
    biteTime: 'Daytime biter',
    dangerLevel: 65,
    accentColor: '#00F5D4',
    urgencyTag: '⚠ SPREAD TO 110+ COUNTRIES',
    keyFact: `Chikungunya has expanded to over 110 countries across Asia, Africa, Europe, and the
      Americas, putting billions at risk. India accounts for a major share of global outbreaks.
      While rarely fatal, its debilitating joint pain can persist for months or years —
      many survivors cannot perform daily tasks long after infection.`,
    symptoms: [
      'Sudden onset fever',
      'Severe joint pain in hands and feet',
      'Headache and muscle pain',
      'Joint swelling and rash',
      'Long-lasting joint pain distinguishes it from other diseases',
      'Chronic pain lasting months to years',
    ],
    affectedRegions: [
      { name: 'Karnataka',        severity: 82 },
      { name: 'Maharashtra',      severity: 78 },
      { name: 'Andhra Pradesh',   severity: 75 },
      { name: 'Tamil Nadu',       severity: 70 },
      { name: 'Kerala',           severity: 68 },
    ],
    prevention: [
      'Use repellents and wear long sleeves',
      'Stay in screened or air-conditioned areas',
      'Remove all potential breeding grounds near your home',
      'Moscure targets both Aedes species for complete protection',
    ],
  },
  {
    id: 'japanese_encephalitis',
    name: 'Japanese Encephalitis',
    mosquito: 'Culex',
    mosquitoLabel: 'Common House Mosquito',
    biteTime: 'Night biter',
    dangerLevel: 95,
    accentColor: '#FF4D6D',
    urgencyTag: '💀 68,000 CASES · 20–30% FATALITY',
    keyFact: `Japanese Encephalitis causes 68,000+ clinical cases globally every year, making it the
      leading cause of viral encephalitis in Asia. With a 20–30% fatality rate and 30–50% of
      survivors suffering permanent neurological damage, it devastates families across 24 countries.
      Asia bears 99% of the global burden. Moscure is a vital nightly line of defense.`,
    symptoms: [
      'High fever and severe headache',
      'Neck stiffness and disorientation',
      'Seizures and coma in severe cases',
      'Paralysis (especially in children)',
      'Permanent neurological damage in survivors',
      '20–30% fatality rate in clinical cases',
    ],
    affectedRegions: [
      { name: 'Uttar Pradesh', severity: 90 },
      { name: 'Bihar',         severity: 88 },
      { name: 'Assam',         severity: 82 },
      { name: 'West Bengal',   severity: 78 },
      { name: 'Tamil Nadu',    severity: 65 },
    ],
    prevention: [
      'Vaccination is key in endemic areas',
      'Use mosquito nets treated with insecticide',
      'Eliminate breeding sites near rice paddies',
      'Culex mosquitoes are active at night — Moscure\'s 24/7 protection is vital',
    ],
  },
]

const PROTECTION_STEPS = [
  {
    step: '01',
    Icon: ShieldCheck,
    title: 'USE MOSCURE',
    description: 'Install Moscure devices in key areas of your home and garden to catch mosquitoes before they ever get the chance to bite.',
    highlight: 'Chemical-free. Always on. Always protecting.',
    color: '#00F5D4',
    primary: true,
  },
  {
    step: '02',
    Icon: Droplets,
    title: 'ELIMINATE BREEDING',
    description: 'Remove standing water from containers, pots, coolers, and drains regularly. Mosquitoes need just a bottle cap of water to breed.',
    highlight: 'Weekly checks save lives.',
    color: '#FFD60A',
    primary: false,
  },
  {
    step: '03',
    Icon: Activity,
    title: 'EARLY DETECTION',
    description: 'Seek medical attention immediately if you or a family member experience sudden fever, joint pain, or any suspicious symptoms.',
    highlight: "Hours matter. Don't delay.",
    color: '#FF4D6D',
    primary: false,
  },
  {
    step: '04',
    Icon: Bell,
    title: 'STAY INFORMED',
    description: 'Monitor local health advisories and outbreak reports in your area. Stay ahead of seasonal disease spikes, especially during monsoon.',
    highlight: 'Knowledge is protection.',
    color: '#00F5D4',
    primary: false,
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
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

const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const listItem = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── AlertTicker ─────────────────────────────────────────────────────────────
function AlertTicker() {
  const MESSAGE =
    '⚠ DENGUE INFECTS 390M+ PEOPLE GLOBALLY EVERY YEAR  ·  MALARIA KILLED 608,000 IN 2023 ALONE  ·  40M+ CASES IN INDIA ANNUALLY  ·  MOSQUITOES: WORLD\'S DEADLIEST ANIMAL  ·  MOSCURE — CHEMICAL-FREE PROTECTION  ·  '
  const repeated = MESSAGE.repeat(4)
  return (
    <div className="relative overflow-hidden border-y border-gradientpink/20 bg-gradientpink/5 py-3">
      <div className="marquee-track whitespace-nowrap ">
        <span className="font-mono text-xs text-gradientpink uppercase tracking-widest px-4">
          {repeated}
        </span>
        <span className="font-mono text-xs text-gradientpink uppercase tracking-widest px-4" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  )
}

// ─── StatBox with count-up ────────────────────────────────────────────────────
function StatBox({ stat, suffix, label, color, index }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, stat, {
      duration: 2.2,
      delay: 0.9 + index * 0.18,
      ease: 'easeOut',
    })
    const unsubscribe = count.on('change', (v) => setDisplay(Math.round(v)))
    return () => { controls.stop(); unsubscribe() }
  }, [stat, index])

  return (
    <motion.div
      custom={0.8 + index * 0.15}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-2 bg-surface/60 border border-borderDefault rounded-2xl px-8 py-6 min-w-[160px]"
    >
      <span className="font-display text-5xl leading-none" style={{ color }}>
        {display}{suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-textMuted text-center">
        {label}
      </span>
    </motion.div>
  )
}

// ─── DangerBar ────────────────────────────────────────────────────────────────
function DangerBar({ level, color }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs uppercase tracking-widest text-textMuted">Danger Level</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-borderDefault overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #FFD60A)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── RegionBar ────────────────────────────────────────────────────────────────
function RegionBar({ name, severity, color, index }) {
  return (
    <motion.div
      variants={listItem}
      className="mb-3"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-xs text-white/70">{name}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{severity}%</span>
      </div>
      <div className="h-1 rounded-full bg-borderDefault overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${severity}%` }}
          transition={{ duration: 1.0, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

// ─── DiseaseCard ──────────────────────────────────────────────────────────────
function DiseaseCard({ disease, isOpen, onToggle, onNavigate }) {
  const { id, name, mosquito, mosquitoLabel, biteTime, dangerLevel, accentColor,
    urgencyTag, keyFact, symptoms, affectedRegions, prevention } = disease

  const imgSrc  = MOSQUITO_IMAGES[id]
  const imgDecp = MOSQUITO_IMAGES_DECP[id]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${disease.accentColor}25` }}
    >
      {/* Card inner background */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isOpen
            ? `linear-gradient(135deg, #111111 0%, ${disease.accentColor}08 100%)`
            : '#111111',
        }}
      >
        {/* ── Card Header (always visible) ── */}
        <button
          onClick={() => onToggle(id)}
          className="w-full text-left px-6 py-5 focus:outline-none"
        >
          <div className="flex items-start gap-4">
            {/* Mosquito image — dramatic close-up thumbnail */}
            <div className="relative shrink-0 mt-1">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden"
                style={{
                  boxShadow: `0 0 0 2px ${accentColor}40, 0 0 20px ${accentColor}30`,
                }}
              >
                <img
                  src={imgSrc}
                  alt={`${mosquitoLabel} — ${mosquito}`}
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                {/* Red tint overlay for threat feel */}
                <div
                  className="absolute inset-0 mix-blend-multiply rounded-xl"
                  style={{ background: `${accentColor}20` }}
                />
              </div>
              {/* Pulse ring on image */}
              <div
                className="absolute inset-0 rounded-xl animate-ping"
                style={{
                  border: `1px solid ${accentColor}50`,
                  animationDuration: '2.5s',
                }}
              />
            </div>

            {/* Disease info */}
            <div className="flex-1 min-w-0">
              {/* Top row: urgency tag + expand icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                    background: `${accentColor}10`,
                  }}
                >
                  {urgencyTag}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} color={accentColor} />
                </motion.div>
              </div>

              {/* Disease name */}
              <h3 className="font-display text-3xl md:text-4xl text-white leading-none mb-1">
                {name}
              </h3>

              {/* Species row */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="font-mono text-xs text-white/70">
                  <span style={{ color: accentColor }}>▲</span> {mosquito}
                </span>
                <span className="w-px h-3 bg-borderDefault" />
                <span className="font-mono text-xs text-white/70">{biteTime}</span>
                <span className="w-px h-3 bg-borderDefault" />
                <span className="font-mono text-[10px] text-white/50 italic">{mosquitoLabel}</span>
              </div>
            </div>
          </div>

          {/* Danger Level Bar */}
          <div className="mt-4">
            <DangerBar level={dangerLevel} color={accentColor} />
          </div>
        </button>

        {/* ── Expanded Content ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Divider */}
              <div className="mx-6 border-t border-borderDefault/50" />

              {/* Large Mosquito Feature Image */}
              <div className="relative mx-6 mt-5 rounded-xl overflow-hidden h-48 md:h-64">
                <img
                  src={imgDecp}
                  alt={`${mosquitoLabel} macro photograph`}
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.2) saturate(1.1) brightness(0.85)' }}
                  onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}25 0%, transparent 40%, transparent 60%, ${accentColor}15 100%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Species label on image */}
                <div className="absolute bottom-3 left-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                    {mosquitoLabel} · {mosquito}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className="font-mono text-[10px] px-2 py-1 rounded-full border backdrop-blur-sm"
                    style={{ color: accentColor, borderColor: `${accentColor}50`, background: `${accentColor}15` }}
                  >
                    ACTUAL SPECIES
                  </span>
                </div>
              </div>

              {/* Two-column content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6">
                {/* Left — Key Fact + Symptoms */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                    — KEY FACTS
                  </p>
                  <p className="font-body text-sm text-white/75 leading-relaxed mb-5">
                    {keyFact}
                  </p>

                  <div className="border-t border-borderDefault/40 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                      — SYMPTOMS
                    </p>
                    <motion.ul
                      variants={staggerList}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {symptoms.map((s) => (
                        <motion.li key={s} variants={listItem} className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0 text-xs" style={{ color: accentColor }}>●</span>
                          <span className="font-body text-sm text-white/75">{s}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                {/* Right — Affected Regions + Prevention */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                    — AFFECTED REGIONS
                  </p>
                  <motion.div
                    variants={staggerList}
                    initial="hidden"
                    animate="visible"
                  >
                    {affectedRegions.map((r, i) => (
                      <RegionBar key={r.name} name={r.name} severity={r.severity} color={accentColor} index={i} />
                    ))}
                  </motion.div>

                  <div className="border-t border-borderDefault/40 pt-4 mt-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                      — PREVENTION
                    </p>
                    <motion.ul
                      variants={staggerList}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {prevention.map((p, i) => (
                        <motion.li
                          key={p}
                          variants={listItem}
                          className="flex items-start gap-2"
                        >
                          <span
                            className="mt-0.5 shrink-0 text-xs font-bold"
                            style={{ color: i === prevention.length - 1 ? accentColor : '#C0C0C0' }}
                          >
                            ✓
                          </span>
                          <span
                            className="font-body text-sm"
                            style={{
                              color: i === prevention.length - 1 ? accentColor : '#C0C0C0',
                              fontWeight: i === prevention.length - 1 ? 600 : 400,
                            }}
                          >
                            {p}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </div>

              {/* Moscure Callout Strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mx-6 mb-6 rounded-xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(0, 245, 212, 0.04)',
                  border: '1px solid rgba(0, 245, 212, 0.2)',
                }}
              >
                <Shield size={28} className="shrink-0" color="#00F5D4" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-white font-semibold">
                    Moscure protects against {name}
                  </p>
                  <p className="font-body text-xs text-white/65 mt-0.5">
                    Our MLID and Phototaxis Technology trap targets <span className="text-gradientcyan">{mosquito}</span> specifically.
                    Chemical-free. Always on.
                  </p>
                </div>
                <button onClick={() => onNavigate('product')} className="shrink-0 font-mono text-xs text-gradientcyan hover:opacity-80 transition-opacity whitespace-nowrap">
                  View Product →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── ProtectionStepCard ───────────────────────────────────────────────────────
function ProtectionStepCard({ step, index, onNavigate }) {
  const { step: number, Icon, title, description, highlight, color, primary } = step
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl group"
      style={{
        border: primary ? '1px solid rgba(0,245,212,0.3)' : '1px solid #2A2A2A',
      }}
    >
      <div
        className="relative h-full rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: primary ? 'rgba(0, 245, 212, 0.04)' : '#111111' }}
      >
        {/* Top row: step number + icon */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-textMuted">{number}</span>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: `${color}20` }}
          >
            <Icon size={22} color={color} />
          </motion.div>
        </div>

        {/* Title */}
        <h4 className="font-display text-2xl text-white leading-tight">{title}</h4>

        {/* Description */}
        <p className="font-body text-sm text-textMuted leading-relaxed flex-1">{description}</p>

        {/* Divider + highlight */}
        <div className="border-t border-borderDefault/50 pt-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="font-body text-xs italic"
            style={{ color }}
          >
            {highlight}
          </motion.p>
        </div>

        {/* Primary card: extra CTA */}
        {primary && (
          <button onClick={() => onNavigate('product')} className="font-mono text-xs text-gradientcyan hover:opacity-80 transition-opacity text-left mt-1">
            Install Now →
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main DiseasesPage ────────────────────────────────────────────────────────
export default function DiseasesPage({ onNavigate }) {
  const [activeDisease, setActiveDisease] = useState('dengue')

  useEffect(() => {
    document.title = 'Mosquito-Borne Diseases in India | Moscure'
    return () => { document.title = 'Moscure' }
  }, [])

  const toggleDisease = (id) => {
    setActiveDisease((prev) => (prev === id ? null : id))
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen relative">
      {/* Subtle scan-line texture — full page */}
      <div className="fixed inset-0 scanlines pointer-events-none z-0" />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — Hero Alert Banner                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] -translate-y-1/4"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,77,109,0.08) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-8 w-full">
          {/* CRITICAL ALERT badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative inline-flex items-center gap-2 mb-8"
          >
            <div className="alert-pulse relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-sm tracking-widest uppercase bg-gradientpink/10 border-gradientpink/50 text-gradientpink">
              <AlertTriangle size={14} />
              CRITICAL HEALTH ALERT
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={wordVariants}
                className="font-display text-7xl md:text-9xl text-white leading-none block"
              >
                MOSQUITO-BORNE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={wordVariants}
                className="font-display text-7xl md:text-9xl leading-none block gradient-text-pink-yellow"
              >
                DISEASES
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-base md:text-lg text-textMuted max-w-2xl leading-relaxed mb-14"
          >
            Every year, over 700 million people worldwide are infected by mosquito-borne diseases —
            claiming more than 830,000 lives. In India alone, 40 million+ cases strike annually.
            Understanding these threats is the first step to protecting your family.
          </motion.p>

          {/* Stat Row */}
          <div className="flex flex-wrap justify-center gap-4">
            {HERO_STATS.map((s, i) => (
              <StatBox key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* Alert Ticker */}
        <AlertTicker />
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — Disease Cards (Accordion)                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="diseases" className="relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px flex-1 bg-borderDefault" />
            <span className="font-mono text-xs uppercase tracking-widest text-textMuted">
              🦟 Know Your Enemy
            </span>
            <div className="h-px flex-1 bg-borderDefault" />
          </motion.div>

          {/* Section heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="overflow-hidden">
              <motion.h2 variants={wordVariants} className="font-display text-5xl md:text-7xl text-white leading-none">
                THE THREATS
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={wordVariants} className="font-display text-5xl md:text-7xl gradient-text-pink-yellow leading-none">
                YOU FACE
              </motion.h2>
            </div>
          </motion.div>

          {/* Disease Accordion Cards */}
          <div className="flex flex-col gap-4">
            {DISEASES_DATA.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                isOpen={activeDisease === disease.id}
                onToggle={toggleDisease}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — Protection Steps                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="protection" className="relative py-20 md:py-28 bg-surface/30">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[400px]"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(0,245,212,0.06) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4 text-center"
          >
            🛡 YOUR DEFENSE PLAN
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="overflow-hidden">
              <motion.h2 variants={wordVariants} className="font-display text-5xl md:text-7xl text-white leading-none">
                HOW TO PROTECT
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={wordVariants} className="font-display text-5xl md:text-7xl gradient-text-cyan-pink leading-none">
                YOUR FAMILY
              </motion.h2>
            </div>
          </motion.div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROTECTION_STEPS.map((step, i) => (
              <ProtectionStepCard key={step.step} step={step} index={i} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — CTA Banner                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative py-28 md:py-36 overflow-hidden noise-overlay">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] -translate-y-1/3"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,77,109,0.07) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[350px]"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(0,245,212,0.05) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-widest text-gradientpink mb-6"
          >
            ⏰ ACT NOW — DON'T WAIT
          </motion.p>

          {/* Heading */}
          <motion.div
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="overflow-hidden">
              <motion.h2 variants={wordVariants} className="font-display text-6xl md:text-8xl text-white leading-none">
                DON'T WAIT FOR
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={wordVariants}
                className="font-display text-6xl md:text-8xl leading-none"
                style={{
                  color: '#FF4D6D',
                  textShadow: '0 0 40px rgba(255,77,109,0.4)',
                }}
              >
                AN OUTBREAK
              </motion.h2>
            </div>
          </motion.div>

          {/* Body */}
          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-body text-base md:text-lg text-textMuted max-w-xl mx-auto mb-10"
          >
            Protect your family today with Moscure.
            Prevention is always better than cure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.5}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => onNavigate('product')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,245,212,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full font-mono text-sm uppercase tracking-widest font-bold text-background transition-all"
              style={{ background: '#00F5D4' }}
            >
              VIEW PRODUCT →
            </motion.button>

            <motion.button
              onClick={() => onNavigate('contact')}
              whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full font-mono text-sm uppercase tracking-widest text-white border border-white/20 transition-all"
            >
              CONTACT US
            </motion.button>
          </motion.div>

          {/* Micro-text */}
          <motion.p
            custom={0.7}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-body text-xs text-textMuted italic mt-8"
          >
            Join 10,000+ Indian families already protected by Moscure.
          </motion.p>
        </div>
      </section>
    </div>
  )
}
