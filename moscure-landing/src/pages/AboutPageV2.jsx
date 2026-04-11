import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Megaphone, Leaf, Users, HeartHandshake, CheckCircle2, ArrowDown,
} from 'lucide-react'

// ─── Static Data ──────────────────────────────────────────────────────────────

const COMMITMENT_PILLARS = [
  {
    id: 1,
    Icon: Megaphone,
    title: 'Creating Awareness',
    body: 'Raising awareness around mosquito-borne diseases in communities that need it most — before the outbreak, not after.',
    gradient: 'from-gradientpink to-gradientyellow',
    color: '#FF4D6D',
  },
  {
    id: 2,
    Icon: Leaf,
    title: 'Chemical-Free Living',
    body: 'Encouraging safer, chemical-free living environments across India — one home at a time.',
    gradient: 'from-gradientyellow to-gradientcyan',
    color: '#FFD60A',
  },
  {
    id: 3,
    Icon: Users,
    title: 'Expanding Access',
    body: 'Expanding access to effective protection in underserved communities where mosquito-borne disease hits hardest.',
    gradient: 'from-gradientcyan to-gradientpink',
    color: '#00F5D4',
  },
  {
    id: 4,
    Icon: HeartHandshake,
    title: 'Healthcare Partnerships',
    body: 'Supporting efforts that improve preventive health and hygiene through institutional partnerships and grassroots programs.',
    gradient: 'from-gradientpink via-gradientyellow to-gradientcyan',
    color: '#FF4D6D',
  },
]

const CSR_INITIATIVES = [
  'Spreading awareness about mosquito-borne diseases in vulnerable communities',
  'Promoting chemical-free living environments',
  'Supporting access to safe protection in underserved areas',
  'Partnering with institutions to improve preventive healthcare',
]

const VISION_STATEMENTS = [
  { text: 'No child sleeps under the threat of mosquito-borne diseases', accent: '#FF4D6D' },
  { text: 'No family depends on harmful chemicals for protection', accent: '#FFD60A' },
  { text: 'No environment becomes unsafe after sunset', accent: '#00F5D4' },
]

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── WordReveal ────────────────────────────────────────────────────────────────

function WordReveal({ text, className, stagger = 0.025, delay = 0 }) {
  const words = text.split(' ')
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }
  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: 'inline-block', marginRight: '0.28em' }}>
          {w}
        </motion.span>
      ))}
    </motion.p>
  )
}

// ─── SectionDivider ────────────────────────────────────────────────────────────

function SectionDivider({ number, accent = '#00F5D4' }) {
  return (
    <div className="flex items-center gap-4 max-w-3xl mx-auto px-6 my-12">
      <motion.div
        className="flex-1 border-t border-borderDefault"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ transformOrigin: 'left' }}
      />
      <span
        className="font-mono text-xs uppercase tracking-[0.3em] shrink-0"
        style={{ color: accent }}
      >
        — {number} —
      </span>
      <motion.div
        className="flex-1 border-t border-borderDefault"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{ transformOrigin: 'right' }}
      />
    </div>
  )
}

// ─── ChapterHeading ────────────────────────────────────────────────────────────

function ChapterHeading({  line1, line2, accentLine = 2, accentColor }) {
  return (
    <motion.div
      custom={0}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="max-w-4xl mx-auto px-6 mb-12"
    >
      
      <h2 className="font-display leading-none">
        <span className={`block text-5xl md:text-7xl lg:text-8xl ${accentLine === 1 ? '' : 'text-white'}`}
          style={accentLine === 1 ? { color: accentColor } : {}}>
          {line1}
        </span>
        <span className={`block text-5xl md:text-7xl lg:text-8xl ${accentLine === 2 ? '' : 'text-white'}`}
          style={accentLine === 2 ? { color: accentColor } : {}}>
          {line2}
        </span>
      </h2>
    </motion.div>
  )
}

// ─── PillarCard ────────────────────────────────────────────────────────────────

function PillarCard({ pillar, index }) {
  const { Icon, title, body, color } = pillar
  return (
    <motion.div
      variants={staggerItem}
      className="animated-border rounded-2xl"
    >
      <div className="bg-surface rounded-2xl p-6 h-full flex flex-col gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon size={22} color={color} />
        </div>
        <h4 className="font-display text-2xl text-white">{title}</h4>
        <p className="font-body text-sm text-textMuted leading-relaxed flex-1">{body}</p>
      </div>
    </motion.div>
  )
}

// ─── VisionLine ────────────────────────────────────────────────────────────────

function VisionLine({ text, accent, index }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
      className="vision-line py-6 border-b border-borderDefault/30 flex items-center gap-6 cursor-default"
      style={{ borderLeft: `4px solid ${accent}`, paddingLeft: '1.5rem' }}
    >
      <span
        className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight"
        style={{ color: accent }}
      >
        {text.toUpperCase()}
      </span>
    </motion.div>
  )
}

// ─── CSRRow ────────────────────────────────────────────────────────────────────

function CSRRow({ text, index }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-start gap-3 py-4 border-b border-borderDefault/50 last:border-0"
    >
      <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradientcyan" />
      <span className="font-body text-base text-white/80 leading-relaxed">{text}</span>
    </motion.div>
  )
}

// ─── ContactForm ───────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', problem: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    if (!form.city.trim()) e.city = "City is required"
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email address required"
    }
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSending(true)

    try {
      const formattedMessage = `🚨 MOSCURE SERVICE REQUEST (AREA VISIT)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Request Received: ${new Date().toLocaleString("en-IN", {
timeZone: "Asia/Kolkata",
dateStyle: "medium",
timeStyle: "short"
})}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 CUSTOMER LOCATION DETAILS

• Name: ${form.name}
• Phone: ${form.phone}
• Email: ${form.email || "Not provided"}
• City / Area: ${form.city}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🦟 PROBLEM REPORTED

${form.problem || "No problem description provided"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 NEXT STEP

Customer is expecting:
• Callback
• Area visit
• Free assessment
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PRIORITY: HIGH
This is a potential on-ground service lead.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source: Moscure “Problem in Your Area” Form
      `
      const res = await fetch("https://formspree.io/f/mqegrprd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: formattedMessage,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setErrors({})
        setForm({ name: '', phone: '', email: '', city: '', problem: '' })
      } else {
        alert("Failed to send message.")
      }
    } catch (error) {
      alert("Something went wrong.")
    } finally {
      setSending(false)
    }
  }

  const inputClass = (field) =>
    `w-full bg-surfaceHover border border-borderDefault rounded-xl px-4 py-3.5 text-white font-body text-base placeholder-textMuted/60 focus:outline-none transition-all duration-200 ${
      errors[field]
        ? "border-gradientpink/70 focus:border-gradientpink focus:ring-2 focus:ring-gradientpink/15"
        : "focus:border-gradientcyan focus:shadow-[0_0_0_3px_rgba(0,245,212,0.1)]"
    }`

  const labelClass = 'block font-mono text-xs uppercase tracking-wider text-textMuted mb-1.5'

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }
  const formContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-gradientcyan text-6xl mb-5">✓</div>
          <p className="font-display text-4xl text-white mb-3">Thank You!</p>
          <p className="font-body text-textMuted">
            We've received your message. Our team will reach out within 24 hours.
          </p>
        </motion.div>
      ) : (
        <div className="animated-border rounded-2xl">
          <div className="bg-surface rounded-2xl p-8">
            <p className="font-body font-semibold text-white text-lg mb-1">
              Get Protection For Your Area
            </p>
            <p className="font-body text-sm text-textMuted mb-8">
              We'll reach out within 24 hours.
            </p>
            <motion.form
              variants={formContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fieldVariants}>
                <label className={labelClass}>Full Name *</label>
                <input name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your full name" className={inputClass('name')} />
                {errors.name && <p className="text-gradientpink text-xs mt-1">{errors.name}</p>}
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className={labelClass}>Phone Number *</label>
                <input name="phone" required value={form.phone} onChange={handleChange}
                  placeholder="+91  XXXXX XXXXX" className={inputClass('phone')} />
                {errors.phone && <p className="text-gradientpink text-xs mt-1">{errors.phone}</p>}
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className={labelClass}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={inputClass('email')} />
                {errors.email && <p className="text-gradientpink text-xs mt-1">{errors.email}</p>}
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className={labelClass}>City / Area *</label>
                <input name="city" required value={form.city} onChange={handleChange}
                  placeholder="Delhi, Mumbai, Bengaluru…" className={inputClass('city')} />
                {errors.city && <p className="text-gradientpink text-xs mt-1">{errors.city}</p>}
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className={labelClass}>Describe the Problem</label>
                <textarea name="problem" rows={4} value={form.problem} onChange={handleChange}
                  placeholder="Describe the mosquito problem in your area…"
                  className={`${inputClass('problem')} resize-none`} />
                {errors.problem && <p className="text-gradientpink text-xs mt-1">{errors.problem}</p>}
              </motion.div>
              <motion.div variants={{ ...fieldVariants, visible: { ...fieldVariants.visible, transition: { delay: 0.5, duration: 0.4 } } }}>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,245,212,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradientcyan text-background font-display text-xl tracking-wider rounded-xl py-4 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "SENDING..." : "CONTACT US — WE'LL HELP →"}
                </motion.button>
                <p className="font-body text-xs text-textMuted italic mt-3 text-center">
                  * We'll never share your details.
                </p>
              </motion.div>
            </motion.form>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function AboutPageV2({ onNavigate }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  useEffect(() => {
    document.title = 'Our Story | Moscure — Beyond Business'
    return () => { document.title = 'Moscure' }
  }, [])

  return (
    <div className="bg-background text-textPrimary min-h-screen">

      {/* ── Reading progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan"
        style={{ scaleX }}
      />

      {/* ════════════════════════════════════════════════════════════
          HERO — About Moscure
      ════════════════════════════════════════════════════════════ */}
      <section id="about-hero" className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[700px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at top left, rgba(0,245,212,0.05) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at bottom right, rgba(255,77,109,0.04) 0%, transparent 65%)' }}
          />
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="font-display text-[22vw] text-white/[0.02] whitespace-nowrap leading-none">
            MOSCURE
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 w-full">
          {/* Eyebrow */}
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-xs text-gradientcyan uppercase tracking-[0.3em] block mb-10"
          >
            ⬡ OUR STORY
          </motion.span>

          {/* Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            className="mb-10"
          >
            {['ABOUT', 'MOSCURE'].map((line, i) => (
              <div className="overflow-hidden" key={i}>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                  className={`font-display text-6xl md:text-8xl lg:text-[9rem] block leading-none ${
                    i === 1 ? 'gradient-text-cyan-pink' : 'text-white'
                  }`}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Draw-in rule */}
          <motion.div
            className="border-t border-white/20 mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.7, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Tagline */}
          <WordReveal
            text="Beyond mosquito control — a commitment to public health, chemical-free living, and every family's right to protection."
            className="font-body text-xl md:text-2xl text-white/70 leading-[1.8] max-w-2xl"
            stagger={0.025}
            delay={0.8}
          />

          {/* Scroll hint */}
          <motion.div
            custom={1.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mt-16"
          >
            <div className="scroll-indicator">
              <ArrowDown size={16} className="text-textMuted" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-textMuted">
              Read our story
            </span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — Opening: "The Acceptance"
      ════════════════════════════════════════════════════════════ */}
      <SectionDivider number="01" accent="white" />

      <section id="opening" className="relative min-h-screen flex items-center py-16 overflow-hidden">
        {/* Background vignette */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(255,77,109,0.04) 0%, transparent 65%)' }} />
        </div>


        <div className="relative max-w-3xl mx-auto px-6 w-full">
          

          {/* Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            className="mb-8"
          >
            {['BEYOND BUSINESS:', 'A PUBLIC HEALTH', 'RESPONSIBILITY'].map((line, i) => (
              <div className="overflow-hidden" key={i}>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                  className="font-display text-5xl md:text-7xl lg:text-8xl text-white block leading-none"
                  style={line === 'RESPONSIBILITY' ? { borderBottom: '3px solid #FF4D6D', display: 'inline-block' } : {}}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>
          

          {/* Draw-in rule */}
          <motion.div
            className="border-t border-white/20 mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.7, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Essay body */}
          <div className="flex flex-col gap-8">
            <WordReveal
              text="There was always something unsettling about the way we lived with mosquitoes."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="Not the bites. Not the irritation. But the acceptance."
              className="font-body text-xl text-white font-medium leading-[1.9]"
              stagger={0.06}
            />
            <WordReveal
              text="For something so small, mosquitoes have quietly remained one of the most dangerous threats to human life — spreading diseases like dengue, malaria, and chikungunya, affecting millions every year."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="Somewhere along the way, a compromise became normal: to protect ourselves from mosquitoes, we had to expose ourselves to something else."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="That never felt right."
              className="font-body text-xl text-white font-medium leading-[1.9]"
              stagger={0.06}
            />
          </div>
        </div>
      </section>

      <SectionDivider number="02" accent="#FFD60A" />

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — "The Shift"
      ════════════════════════════════════════════════════════════ */}
      <section id="shift" className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2"
            style={{ background: 'radial-gradient(ellipse at left, rgba(255,214,10,0.03) 0%, transparent 65%)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <ChapterHeading
            line1="THE SHIFT"
            line2="FROM ACCEPTANCE TO ACTION"
            accentLine={2}
            accentColor="#FFD60A"
          />

          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="animated-border rounded-2xl my-16"
          >
            <div className="relative bg-surface rounded-2xl px-10 py-10">
              <span className="font-display text-[7rem] leading-none text-gradientyellow/30 absolute -top-4 left-4 select-none">"</span>
              <p className="font-body text-2xl md:text-4xl text-white font-light italic leading-tight relative z-10 pl-4">
                Why does protection have to come with side effects?
              </p>
              <span className="font-display text-[7rem] leading-none text-gradientyellow/30 absolute -bottom-10 right-4 select-none">"</span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <WordReveal
              text="What started as curiosity quickly became something deeper."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="This wasn't just a product problem. It was a gap in how we approached everyday health and safety."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="We realized that mosquito protection had always been treated as a temporary fix — not as a problem worth solving completely."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="And that realization changed everything."
              className="font-body text-xl font-semibold leading-[1.9] text-gradientyellow"
              stagger={0.06}
            />
          </div>
        </div>
      </section>

      <SectionDivider number="03" accent="#00F5D4" />

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — "Rethinking the Problem"
      ════════════════════════════════════════════════════════════ */}
      <section id="rethink" className="relative py-12">
        <div className="relative max-w-4xl mx-auto px-6">
          <ChapterHeading
            number="03"
            line1="RETHINKING THE PROBLEM,"
            line2="NOT THE PRODUCT"
            accentLine={2}
            accentColor="#00F5D4"
          />

          {/* Two-column prose + question */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="flex flex-col gap-6">
              <WordReveal
                text="We didn't set out to improve what already existed. We stepped back."
                className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
                stagger={0.025}
              />
              <WordReveal
                text='Instead of asking "How do we repel mosquitoes better?" we asked:'
                className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
                stagger={0.025}
              />
            </div>

            <motion.div
              custom={0}
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="border-l-2 border-gradientcyan pl-6 flex items-center"
            >
              <p className="font-display  md:text-4xl text-gradientcyan  leading-tight">
                "How do we eliminate them — safely, effectively, and continuously?"
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col gap-8 max-w-2xl">
            <WordReveal
              text="That question led to years of research, experimentation, and refinement."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="We studied mosquito behavior. We tested technologies. We built, failed, rebuilt, and improved."
              className="font-body text-lg md:text-xl text-white font-medium leading-[1.9]"
              stagger={0.04}
            />
            <WordReveal
              text="Not to create another option — but to create a different approach entirely."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
          </div>
        </div>
      </section>

      <SectionDivider number="04" accent="#FF4D6D" />

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — "When Innovation Became Responsibility"
      ════════════════════════════════════════════════════════════ */}
      <section id="responsibility" className="relative py-12">
        <div className="relative max-w-4xl mx-auto px-6">
          <ChapterHeading
            number="04"
            line1="WHEN INNOVATION"
            line2="BECAME RESPONSIBILITY"
            accentLine={2}
            accentColor="#FF4D6D"
          />

          {/* Realization strip */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="realization-strip border-borderDefault py-8 my-12 -mx-6 px-6"
          >
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-body text-xl md:text-2xl text-white font-medium leading-snug">
                Mosquitoes are not a seasonal inconvenience.
              </p>
              <p className="font-body text-lg md:text-xl text-white/70 mt-1">
                They are a public health challenge.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8 max-w-2xl">
            <WordReveal
              text="And solving that comes with responsibility."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <WordReveal
              text="At Moscure, we began to see our role differently — not just as innovators, but as contributors to a larger cause."
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
            <div className="flex flex-col gap-1">
              <WordReveal
                text="A cause where protection should not depend on awareness,"
                className="font-body text-lg md:text-xl text-white/90 leading-[1.9]"
                stagger={0.035}
              />
              <WordReveal
                text="income,"
                className="font-body text-lg md:text-xl text-white/70 leading-[1.9]"
                stagger={0.05}
              />
              <WordReveal
                text="or access."
                className="font-body text-lg md:text-xl text-white/50 leading-[1.9]"
                stagger={0.06}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider number="05" accent="#FFD60A" />

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — "A Commitment Beyond Business"
      ════════════════════════════════════════════════════════════ */}
      <section id="commitment" className="relative py-12">
        <div className="relative max-w-4xl mx-auto px-6">
          <ChapterHeading
            number="05"
            line1="A COMMITMENT"
            line2="BEYOND BUSINESS"
            accentLine={2}
            accentColor="#FFD60A"
          />

          <div className="max-w-2xl mb-12">
            <WordReveal
              text="Today, our work extends beyond products. We are committed to:"
              className="font-body text-lg md:text-xl text-white/85 leading-[1.9]"
              stagger={0.025}
            />
          </div>

          {/* Pillar cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {COMMITMENT_PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </motion.div>

          {/* Closing line */}
          <WordReveal
            text="Because the real impact of protection is not measured in units sold — but in risks reduced, and lives made safer."
            className="font-body text-lg md:text-xl text-white/80 italic text-center max-w-2xl mx-auto mt-14 leading-relaxed"
            stagger={0.04}
          />
        </div>
      </section>

      <SectionDivider number="06" accent="#00F5D4" />

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — "The Future We Are Building"
      ════════════════════════════════════════════════════════════ */}
      <section id="future" className="relative py-12">
        <div className="relative max-w-4xl mx-auto px-6">
          <ChapterHeading
            number="06"
            line1="THE FUTURE"
            line2="WE ARE BUILDING"
            accentLine={2}
            accentColor="#00F5D4"
          />

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="font-body text-lg text-white/70 mb-8 max-w-2xl"
          >
            We envision a world where:
          </motion.p>

          {/* Vision statements */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col"
          >
            {VISION_STATEMENTS.map((v, i) => (
              <VisionLine key={i} text={v.text} accent={v.accent} index={i} />
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 text-center"
          >
            
            <motion.div
              className="h-px bg-gradientcyan mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: '12rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — CSR Initiatives
      ════════════════════════════════════════════════════════════ */}
      <section id="csr" className="py-12 bg-surface border-y border-borderDefault">
        <div className="max-w-4xl mx-auto px-6">
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-4 text-center"
          >
            🤝 OUR CSR COMMITMENT
          </motion.p>

          <ChapterHeading
            number=""
            line1="THROUGH OUR CSR"
            line2="INITIATIVES"
            accentLine={2}
            accentColor="#00F5D4"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-4"
          >
            {CSR_INITIATIVES.map((text, i) => (
              <CSRRow key={i} text={text} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 8 — Contact Form
      ════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-16 md:py-24 overflow-visible">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at top left, rgba(0,245,212,0.08) 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
            style={{ background: 'radial-gradient(ellipse at bottom right, rgba(255,77,109,0.06) 0%, transparent 60%)' }} />
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span className="font-display text-[15vw] text-white/[0.02] leading-none">PROTECT</span>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Label */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="font-mono text-s uppercase tracking-widest text-gradientcyan mb-6 text-center"
          >
            📞 REACH US OUT
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — emotional copy */}
            <motion.div
              custom={0}
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:sticky lg:top-28 self-start"
            >
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
              <p className="font-mono text-xs text-textMuted uppercase tracking-widest mb-4 leading-relaxed">
                Because no life should be lost due to lack of protection.
              </p>

              <h2 className="font-display text-5xl md:text-7xl text-white leading-none mb-2">
                Mosquito Problems<br />
                <span className="text-gradientcyan">IN YOUR AREA?</span>
              </h2>

              <h3 className="font-display text-4xl text-white leading-none mb-3">
                We Can Help!
              </h3>
              <p className="font-body text-lg text-white/80 leading-normal  mb-4">
                If you're facing mosquito issues in your area, we're here to provide effective, chemical-free solutions.
              </p>

              <p className="font-display text-5xl text-gradientpink mb-4">Call us Now.</p>

              <a
                href="tel:+918010111177"
                className="font-body text-2xl text-white font-medium hover:text-gradientcyan transition-colors duration-200 flex items-center gap-3 mb-8"
              >
                📞 +91 80101 11177
              </a>

              {/* Promise strip */}
              <div className="bg-surface border border-gradientcyan/20 rounded-xl p-5">
                {['We\'ll visit your area', 'Free assessment', 'No obligation'].map((p) => (
                  <div key={p} className="flex items-center gap-3 py-1.5">
                    <CheckCircle2 size={16} className="text-gradientcyan shrink-0" />
                    <span className="font-body text-sm text-white">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              custom={0}
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
