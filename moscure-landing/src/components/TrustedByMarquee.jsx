import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import tajLogo from '../assets/Taj_Hotels_logo.svg'
import oberoiLogo from '../assets/Oberoi_Hotels__Resorts_Logo.svg'
import leelaLogo from '../assets/The_Leela_Palaces_Hotels_and_Resorts_Logo.svg'
import tridentLogo from '../assets/Trident_svg.svg'
import karmaLogo from '../assets/Karma_Lakeland.png'
import marriottLogo from '../assets/jw-marriott-logo.png'
import shangrilaLogo from '../assets/shangri-la-2-logo-png-transparent.svg'
import claridgesLogo from '../assets/The_Claridges.png'
import lodhiLogo from '../assets/The_Lodhi.svg'
import ibisLogo from '../assets/Ibis_Hotel_Logo .svg'

const HOTELS = [
  { name: 'The Leela Palace',    location: 'New Delhi, India',               logo: leelaLogo,    logoStyle: { height: '600px' } },
  { name: 'The Oberoi',          location: 'Gurugram, India',                logo: oberoiLogo,   logoStyle: { height: '200px' } },
  { name: 'Trident',             location: 'Gurugram, India',                logo: tridentLogo,  logoStyle: { height: '120px' } },
  { name: 'Karma Lakelands',     location: 'Gurugram, India',                logo: karmaLogo,    logoStyle: { height: '130px' } },
  { name: 'The Leela Ambience',  location: 'Gurugram, India',                logo: leelaLogo,    logoStyle: { height: '600px' } },
  { name: 'JW Marriott Hotel',   location: 'Aerocity, New Delhi, India',     logo: marriottLogo, logoStyle: { height: '360px' } },
  { name: 'Shangri-La Eros',     location: 'New Delhi, India',               logo: shangrilaLogo,logoStyle: { height: '270px' } },
  { name: 'Taj Palace',          location: 'New Delhi, India',               logo: tajLogo,      logoStyle: { height: '90px' } },
  { name: 'The Claridges',       location: 'New Delhi, India',               logo: claridgesLogo,logoStyle: { height: '500px' } },
  { name: 'The Lodhi',           location: 'New Delhi, India',               logo: lodhiLogo,    logoStyle: { height: '540px' } },
  { name: 'ibis Hotel',          location: 'Golf Course Road, Gurugram, India', logo: ibisLogo,  logoStyle: { height: '108px' } },
]

const CARD_W = 300
const GAP = 20
const CARD_SCROLL = CARD_W + GAP
const ONE_SET = HOTELS.length * CARD_W + (HOTELS.length - 1) * GAP

// Triple the list so we always have cards on both sides
const ITEMS = [...HOTELS, ...HOTELS, ...HOTELS]

function HotelCard({ hotel, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -6 }}
      style={{
        minWidth: '300px',
        maxWidth: '300px',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
      className="group relative flex-shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-default"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: 'linear-gradient(90deg, #FFD60A, #00F5D4)' }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(255,214,10,0.07), 0 16px 48px rgba(0,245,212,0.08)' }}
      />

      {/* Logo zone */}
      <div
        className="relative flex items-center justify-center h-36 w-full px-8"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {hotel.logo ? (
          <img
            src={hotel.logo}
            alt={hotel.name}
            className="w-auto object-contain opacity-55 group-hover:opacity-95 transition-all duration-500"
            style={{
              filter: 'invert(1) brightness(10) saturate(0)',
              maxWidth: '200px',
              ...hotel.logoStyle,
            }}
          />
        ) : (
          <span className="font-display text-5xl text-white/10 group-hover:text-white/20 transition-colors duration-300 select-none">
            {hotel.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Text zone */}
      <div className="flex flex-col px-6 py-5">
        <span className="font-body font-semibold text-white/85 text-[15px] leading-snug tracking-wide group-hover:text-white transition-colors duration-300">
          {hotel.name}
        </span>
        <div className="mt-2.5 mb-2 h-px bg-gradient-to-r from-white/10 to-transparent group-hover:from-gradientcyan/30 transition-all duration-500" />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.18em] group-hover:text-white/55 transition-colors duration-300">
          {hotel.location}
        </span>
      </div>
    </motion.div>
  )
}

export default function TrustedByMarquee() {
  const headingRef = useRef(null)
  const scrollRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  // Start at the middle copy so both directions have room
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = ONE_SET
    }
  }, [])

  // After scroll settles, silently snap back to the middle copy
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let timer = null

    const handleScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (el.scrollLeft < ONE_SET) {
          el.scrollLeft += ONE_SET          // was in first copy → jump to middle
        } else if (el.scrollLeft >= ONE_SET * 2) {
          el.scrollLeft -= ONE_SET          // was in third copy → jump to middle
        }
      }, 150)
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * CARD_SCROLL, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-background py-20 md:py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,212,0.04) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-gradientcyan">
            ✦ Where We Are Used
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display leading-none"
          style={{ fontSize: 'clamp(42px, 5.5vw, 80px)' }}
        >
          <span className="text-white heading-glow">TRUSTED BY</span>
          <span className="gradient-text-yellow-cyan ml-4">THE FINEST</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-lg mx-auto text-textMuted font-body text-sm leading-relaxed"
        >
          India&apos;s most prestigious hotels choose Moscure for chemical-free,{' '}
          <span className="text-white font-medium">silent protection</span> — because
          their guests deserve nothing less.
        </motion.p>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Left fade */}
        <div
          className="absolute left-6 md:left-12 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-6 md:right-12 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
        />

        {/* Scrollable track — scrollbar hidden */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ITEMS.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} index={i % HOTELS.length} isInView={isInView} />
          ))}
        </div>
      </motion.div>

      {/* Arrow buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-center gap-4 mt-10"
      >
        <motion.button
          onClick={() => scroll(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll left"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white/40 hover:border-white/25 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-300"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </motion.button>
        <motion.button
          onClick={() => scroll(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll right"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white/40 hover:border-white/25 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-300"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </motion.button>
      </motion.div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-borderDefault to-transparent" />
      </div>
    </section>
  )
}
