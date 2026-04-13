import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import TrustedByMarquee from '../../components/TrustedByMarquee'
import {
  Shield, HeartPulse, Maximize2, Zap, Battery,
  Droplets, Ruler, ShieldCheck, Wind, Volume2, Clock,
  Star, ThumbsUp, CheckCircle2, Camera, Image as ImageIcon,
  Share2, ChevronDown, ChevronUp, Copy, MessageCircle,
} from 'lucide-react'

// ─── Asset imports ────────────────────────────────────────────────────────────
import img1 from '../../assets/product-outdoor.png'
import img2 from '../../assets/Outdoor_2.jpg'
import img3 from '../../assets/Outdoor_3.jpg'
import img4 from '../../assets/Outdoor_4.jpg'
import img5 from '../../assets/Outdoor_5.jpg'
import img6 from '../../assets/Outdoor_6.jpg'
import decp1 from '../../assets/Outdoor_decp_1.jpg'
import decp2 from '../../assets/Outdoor_decp_2.jpg'
import decp3 from '../../assets/Outdoor_decp_3.jpg'
import decp4 from '../../assets/Outdoor_decp_4.jpg'
import decp5 from '../../assets/Outdoor_decp_5.jpg'

// ─── Static Data ──────────────────────────────────────────────────────────────

const PRODUCT = {
  id:          'ipo-outdoor',
  sku:         'MOSCURE-IPO-001',
  name:        'IPO Outdoor Mosquito & Insect Trap',
  fullTitle:   'IPO Outdoor Mosquito & Insect Trap | 365nm UV LED Trap | Covers 3500 sq ft | Water Resistant, Hangable, Safe & Odor-Free Bug Zapper | 9W Energy-Efficient',
  brand:       'Moscure',
  originalPrice: 21599,
  price:       19500,
  currency:    '₹',
  inStock:     true,
  rating:      4.7,
  reviewCount: 98,
  badge:       'OUTDOOR',
  accentColor: '#FFD60A',
}

const PRODUCT_IMAGES = [
  { id: 1, alt: 'Moscure IPO Outdoor Mosquito Trap — Front View',                  src: img1 },
  { id: 2, alt: 'Moscure IPO Outdoor — 365nm UV LED Light Active',                 src: img2 },
  { id: 3, alt: 'Moscure IPO — Water Resistant Outdoor Housing Detail',            src: img3 },
  { id: 4, alt: 'Moscure IPO — Hanging Installation for Garden & Patio',           src: img4 },
  { id: 5, alt: 'Moscure IPO — Scale & Size Reference (1,205g)',                   src: img5 },
  { id: 6, alt: 'Moscure IPO — Placed in Garden / Outdoor Setting',                src: img6 },
]

const PRODUCT_SPECS = [
  { label: 'Brand',               value: 'Moscure'                   },
  { label: 'Colour',              value: 'Black'                     },
  { label: 'Material',            value: 'Plastic'                   },
  { label: 'Product Dimensions',  value: '11.9L × 11.9W × 17.8H cm' },
  { label: 'Item Weight',         value: '280 Grams'                 },
  { label: 'Number of Pieces',    value: '1'                         },
  { label: 'Net Quantity',        value: '1.0 Count'                 },
  { label: 'Power Source',        value: 'Corded Electric (9W)'      },
  { label: 'Water Resistant',     value: 'Yes (IPX4)'                       },
]

const PRODUCT_BULLETS = [
  {
    icon: Shield,
    highlight: 'Multi-Insect Protection',
    text: 'Traps mosquitoes, flies, moths, fruit flies, drain flies & other flying pests for comprehensive outdoor coverage.',
  },
  {
    icon: HeartPulse,
    highlight: 'Prevents Deadly Diseases',
    text: 'Helps reduce risk of mosquito-borne illnesses like Zika Virus, Dengue, Malaria & Chikungunya by eliminating insects at the source.',
  },
  {
    icon: Maximize2,
    highlight: 'Wide Outdoor Coverage — 3500 sq ft',
    text: 'Effectively protects up to 3500 sq ft, ideal for gardens, patios, balconies & semi-outdoor areas.',
  },
  {
    icon: Zap,
    highlight: '365nm MLID & Phototaxis Technology',
    text: 'Scientifically proven wavelength to attract & trap flying insects silently without chemicals, odour, or noise.',
  },
  {
    icon: Droplets,
    highlight: 'Robust & Hangable Design',
    text: 'Water-resistant body with a hanging option for flexible outdoor installation — engineered for Indian monsoon conditions.',
  },
  {
    icon: Battery,
    highlight: 'Low Power Consumption — 9W',
    text: 'Operates at just 9W, delivering powerful yet energy-efficient performance for continuous 24/7 outdoor protection.',
  },
  {
    icon: Ruler,
    highlight: 'Durable Outdoor Build',
    text: 'Dimensions: Ø260 × 320 mm | Weight: 1,205 g — built heavy-duty for long-lasting outdoor deployment.',
  },
]

const TRUST_BADGES = [
  { icon: Droplets,   label: 'Water Resistant'       },
  { icon: Wind,       label: '3500 sq ft Coverage'        },
  { icon: ShieldCheck, label: '100% Chemical-Free'   },
  { icon: Clock,      label: '24/7 Outdoor Guard'     },
]

const DETAIL_IMAGES = [
  { id: 1, alt: 'How Moscure IPO Outdoor UV LED Trap Works — 365nm Phototaxis Mechanism',               src: decp1 },
  { id: 2, alt: 'Moscure IPO Outdoor Coverage Area — 3500 sq ft Garden & Patio Protection',            src: decp2 },
  { id: 3, alt: 'Moscure IPO Water Resistant Housing — Built for Indian Monsoon Conditions',  src: decp3 },
  { id: 4, alt: 'Moscure IPO Hanging Installation Guide — Garden, Patio, Balcony Setup',       src: decp4 },
  { id: 5, alt: 'Moscure IPO Outdoor Trap Real Results — Effective Mosquito Control',            src: decp5 },
]

const REVIEWS = [
  {
    id: 1, name: 'Vikram Singh', initials: 'VS', location: 'Pune, India', rating: 5, date: 'March 2025',
    title: 'Our garden is finally mosquito-free',
    body: `We have a large terrace garden in Pune and summer evenings were unbearable because of mosquitoes. After hanging the Moscure IPO, the difference was night and day within a week. The yellow light is subtle, and it's been running through light rain with no issues at all. Highly recommended.`,
    verified: true, helpful: 53,
  },
  {
    id: 2, name: 'Meena Patel', initials: 'MP', location: 'Ahmedabad, India', rating: 5, date: 'February 2025',
    title: 'Best outdoor mosquito solution we have tried',
    body: `We tried mosquito coils, sprays, and even an electric bat for years. Nothing worked as consistently as the Moscure IPO. We hang it near our sitting area in the garden every evening and the catch tray is full by morning. 100% worth the price.`,
    verified: true, helpful: 41,
  },
  {
    id: 3, name: 'Arjun Nair', initials: 'AN', location: 'Kochi, India', rating: 4, date: 'January 2025',
    title: 'Great for monsoon season especially',
    body: `Kerala monsoon means non-stop mosquitoes. I was sceptical about leaving an electric device outdoors during rain but the water resistance is genuine — it's been through several heavy showers. The coverage is excellent for our outdoor seating area. Giving 4 stars only because I wish there was a longer power cord option.`,
    verified: true, helpful: 29,
  },
  {
    id: 4, name: 'Sunita Reddy', initials: 'SR', location: 'Hyderabad, India', rating: 5, date: 'March 2025',
    title: 'Premium build quality, excellent performance',
    body: `The build feels very sturdy and premium. We installed it in our farmhouse garden and it covers the entire seating area comfortably. No chemicals, no smell — just perfectly clean air. My kids and guests can finally enjoy evenings outdoors. Worth every rupee.`,
    verified: true, helpful: 37,
  },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 72, percent: 73 },
  { stars: 4, count: 17, percent: 17 },
  { stars: 3, count:  10, percent:  10 },
  { stars: 2, count:  0, percent:  0 },
  { stars: 1, count:  0, percent:  0 },
]

const TICKER_ITEMS = [
  '✓ 365nm UV LED Technology',
  '✓ Covers up to 3500 sq ft Outdoors',
  '✓ Water Resistant Housing',
  '✓ Hangable Design', 
  '✓ 9W Energy Efficient',
  '✓ Catches Dengue & Malaria Vectors',
  '✓ No Refills Ever',
  '✓ 100% Chemical-Free',
  '✓ Monsoon Ready',
  '✓ Lab Tested in India',
]

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
const SCHEMA_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Moscure IPO Outdoor Mosquito & Insect Trap',
  description: '365nm UV LED outdoor mosquito trap. Covers up to 3500 sq ft. Water resistant, hangable. Chemical-free, safe odor-free.',
  brand: { '@type': 'Brand', name: 'Moscure' },
  sku: 'MOSCURE-IPO-001',
  mpn: 'IPO-001',
  offers: {
    '@type': 'Offer',
    price: '21599',
    priceCurrency: '',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Moscure' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '98',
  },
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'
  const full  = Math.floor(rating)
  const frac  = rating - full
  const empty = 5 - full - (frac > 0 ? 1 : 0)

  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className={`${sizeClass} fill-gradientyellow text-gradientyellow`} />
      ))}
      {frac > 0 && (
        <span
          className="relative inline-block"
          style={{ width: '1em', height: '1em', fontSize: size === 'lg' ? 20 : size === 'md' ? 16 : 14 }}
        >
          <Star className={`${sizeClass} text-borderDefault fill-borderDefault absolute inset-0`} />
          <span style={{ width: `${frac * 100}%`, overflow: 'hidden', position: 'absolute', inset: 0, display: 'inline-block' }}>
            <Star className={`${sizeClass} fill-gradientyellow text-gradientyellow`} />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className={`${sizeClass} fill-borderDefault text-borderDefault`} />
      ))}
    </span>
  )
}

function ImageGallery({ images, activeIndex, onSelect }) {
  const active = images[activeIndex]
  return (
    <div>
      {/* Main image */}
      <div className="animated-border-yellow">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {active.src ? (
                <img
                  src={active.src}
                  alt={active.alt}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface">
                  <Camera className="text-textMuted w-12 h-12" />
                  <span className="font-mono text-xs text-textMuted uppercase tracking-widest">
                    [ Product Image {activeIndex + 1} ]
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors shrink-0 ${
              i === activeIndex
                ? 'border-gradientyellow bg-gradientyellow/5'
                : 'border-borderDefault bg-surface hover:border-white/30'
            }`}
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} className="w-full h-full object-contain p-1 bg-white" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-textMuted font-mono text-xs">
                {i + 1}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function SpecsTable({ specs }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? specs : specs.slice(0, 5)

  return (
    <div className="bg-surface rounded-xl border border-borderDefault overflow-hidden">
      <div className="px-4 py-3 border-b border-borderDefault">
        <p className="font-mono text-xs uppercase tracking-widest text-gradientyellow font-semibold">
          Specifications
        </p>
      </div>
      {visible.map((s, i) => (
        <div
          key={s.label}
          className={`flex items-center justify-between py-2.5 px-4 border-b border-borderDefault/50 last:border-0 ${
            i % 2 === 1 ? 'bg-white/[0.02]' : ''
          }`}
        >
          <span className="font-body text-sm text-textMuted">{s.label}</span>
          <span className="font-body text-sm text-white font-medium text-right ml-4">{s.value}</span>
        </div>
      ))}
      {specs.length > 5 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="w-full flex items-center justify-center gap-1.5 py-3 font-mono text-xs text-gradientyellow hover:bg-white/[0.02] transition-colors border-t border-borderDefault/50"
        >
          {showAll ? <><ChevronUp size={14} /> See less</> : <><ChevronDown size={14} /> See more</>}
        </button>
      )}
    </div>
  )
}

function BulletList({ bullets }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <p className="font-mono text-xs uppercase tracking-widest text-textMuted mb-4">
        About This Item
      </p>
      <motion.div
        className="flex flex-col gap-1"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {bullets.map((b) => {
          const Icon = b.icon
          return (
            <motion.div
              key={b.highlight}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="flex gap-3 items-start rounded-lg p-3 border-l-2 border-transparent hover:border-gradientyellow transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradientyellow/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gradientyellow" />
              </div>
              <div>
                <p className="font-body text-sm text-white font-semibold leading-snug">{b.highlight}</p>
                <p className="font-body text-sm text-textMuted leading-relaxed mt-0.5">{b.text}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

function TrustBadgeRow({ badges }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {badges.map((b) => {
        const Icon = b.icon
        return (
          <motion.span
            key={b.label}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="bg-surface border border-borderDefault rounded-full px-3 py-1.5 flex items-center gap-1.5"
          >
            <Icon className="w-3.5 h-3.5 text-gradientyellow" />
            <span className="font-body text-xs text-textMuted">{b.label}</span>
          </motion.span>
        )
      })}
    </motion.div>
  )
}

function RatingBar({ stars, percent, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-body text-sm text-textMuted w-8 shrink-0">{stars} ★</span>
      <div className="flex-1 bg-borderDefault h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradientyellow h-1.5 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: percent / 100 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
        />
      </div>
      <span className="font-body text-sm text-textMuted w-8 text-right shrink-0">{percent}%</span>
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-surface border border-borderDefault rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradientyellow/20 border border-gradientyellow/30 flex items-center justify-center shrink-0">
            <span className="font-body font-bold text-sm text-gradientyellow">{review.initials}</span>
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-white">{review.name}</p>
            <p className="font-body text-xs text-textMuted">{review.location} · {review.date}</p>
          </div>
        </div>
        {review.verified && (
          <span className="flex items-center gap-1 font-mono text-xs text-gradientyellow shrink-0">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </span>
        )}
      </div>

      <div className="mb-2">
        <StarRating rating={review.rating} size="sm" />
      </div>

      <p className="font-body text-base font-semibold text-white mb-2">{review.title}</p>
      <p className="font-body text-sm text-textMuted leading-relaxed mb-4">{review.body}</p>

      <div className="flex items-center gap-1.5 font-body text-xs text-textMuted">
        <ThumbsUp className="w-3.5 h-3.5" />
        <span>{review.helpful} people found this helpful</span>
      </div>
    </motion.div>
  )
}

function DetailImageBlock({ image, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="w-full rounded-2xl"
        />
      ) : (
        <div
          className="w-full rounded-2xl bg-surface border-2 border-dashed border-gradientyellow/20 flex flex-col items-center justify-center gap-3"
          style={{ aspectRatio: '16/9' }}
        >
          <ImageIcon className="w-10 h-10 text-textMuted" />
          <p className="font-mono text-xs text-textMuted uppercase tracking-widest">
            [ {image.caption} — Add Product Image ]
          </p>
          <p className="font-body text-xs text-textMuted italic text-center px-4">
            SEO Alt: &ldquo;{image.alt}&rdquo;
          </p>
        </div>
      )}
      <p className="font-mono text-xs text-textMuted uppercase tracking-widest text-center mt-3">
        {image.caption}
      </p>
    </motion.div>
  )
}

function TrustTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <section className="relative overflow-hidden bg-surface border-y border-borderDefault py-4">
      <div className="marquee-track" style={{ animationDuration: '40s' }}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className={`font-mono uppercase text-xs tracking-widest whitespace-nowrap px-4 ${
                i % 2 === 0 ? 'text-gradientyellow' : 'text-textMuted'
              }`}
            >
              {item}
            </span>
            <span className="text-borderDefault font-mono text-xs">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── Page Root ────────────────────────────────────────────────────────────────

export default function IPOOutdoorProductPage({ onNavigate }) {
  const [activeImage, setActiveImage] = useState(0)
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const heroRef = useRef(null)
  const ctaRef = useRef(null)

  // Mobile sticky CTA: appears once the Buy Now button scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMobileCtaVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    )
    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate product images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(i => (i + 1) % PRODUCT_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // SEO: inject meta tags + JSON-LD
  useEffect(() => {
    const prev = {
      title: document.title,
    }

    document.title = 'Moscure IPO Outdoor Mosquito Trap | UV LED Bug Zapper | 3500 sq ft Coverage | ₹21,599'

    const setMeta = (name, content, prop = false) => {
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Moscure IPO Outdoor Mosquito & Insect Trap uses 365nm UV LED technology to silently trap mosquitoes & flying insects across 3500 sq ft. Water resistant, hangable design. 100% chemical-free. Buy now at ₹21,599.')
    setMeta('keywords', 'outdoor mosquito trap India, UV mosquito killer outdoor, water resistant bug zapper, garden mosquito trap, patio mosquito catcher, dengue malaria mosquito trap outdoor, Moscure IPO, 3500 sq ft outdoor insect trap, hangable mosquito trap India')
    setMeta('og:title', 'Moscure IPO Outdoor Mosquito Trap — ₹21,599', true)
    setMeta('og:description', 'Water resistant, hangable UV LED mosquito trap. Covers 3500 sq ft. Chemical-free, monsoon ready.', true)
    setMeta('og:url', 'https://moscure.in/products/moscure-ipo-outdoor-mosquito-trap', true)
    setMeta('og:type', 'product', true)

    // JSON-LD
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'ipo-schema'
    script.textContent = SCHEMA_JSON
    document.head.appendChild(script)

    return () => {
      document.title = prev.title
      document.getElementById('ipo-schema')?.remove()
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://moscure.in/products/moscure-ipo-outdoor-mosquito-trap')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent('Check out the Moscure IPO Outdoor Mosquito Trap — Chemical-Free, UV LED, 3500 sq ft coverage, ₹21,599\nhttps://moscure.in/products/moscure-ipo-outdoor-mosquito-trap')}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-4"
      >
        <ol
          className="flex items-center gap-2 font-mono text-xs text-textMuted"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <button
              onClick={() => onNavigate?.('landing')}
              className="hover:text-white transition-colors"
              itemProp="name"
            >
              Home
            </button>
            <meta itemProp="position" content="1" />
          </li>
          <li><span className="text-gradientyellow">›</span></li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <button
              onClick={() => onNavigate?.('product')}
              className="hover:text-white transition-colors"
              itemProp="name"
            >
              Products
            </button>
            <meta itemProp="position" content="2" />
          </li>
          <li><span className="text-gradientyellow">›</span></li>
          <li className="text-white" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">IPO Outdoor Mosquito Trap</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </motion.nav>

      {/* ── SECTION 1: Product Hero ──────────────────────────────────── */}
      <section id="product-hero" ref={heroRef} className="relative">
        {/* subtle grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(255,255,255,0.018) 0,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(255,255,255,0.018) 0,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 60px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-10 items-start">

          {/* ── LEFT: sticky image gallery ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:sticky lg:top-[88px]"
          >
            <ImageGallery
              images={PRODUCT_IMAGES}
              activeIndex={activeImage}
              onSelect={setActiveImage}
            />
          </motion.div>

          {/* ── RIGHT: product info ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Block 1 — badge + title + brand */}
            <div className="flex flex-col gap-3">
              <span className="self-start bg-gradientyellow/10 border border-gradientyellow/40 text-gradientyellow font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                {PRODUCT.badge}
              </span>

              <h1 className="font-body text-xl md:text-2xl text-white font-semibold leading-snug">
                {PRODUCT.fullTitle}
              </h1>

              <p className="font-body text-sm text-textMuted">
                Brand: <span className="text-gradientyellow font-medium">{PRODUCT.brand}</span>
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-borderDefault" />

            {/* Block 2 — rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={PRODUCT.rating} size="md" />
              <span className="font-body font-bold text-gradientyellow">{PRODUCT.rating}</span>
              <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-body text-sm text-textMuted underline cursor-pointer hover:text-gradientyellow transition-colors"
              >
                ({PRODUCT.reviewCount.toLocaleString()} reviews)
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-borderDefault" />

            {/* Block 3 — price & stock */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-end gap-3 flex-wrap"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-body text-sm text-textMuted">{PRODUCT.currency}</span>
                <span className="font-display text-3xl text-textMuted line-through mr-2">{PRODUCT.originalPrice.toLocaleString('en-IN')}</span>
                <span className="font-display text-5xl text-white leading-none">
                  ₹{PRODUCT.price.toLocaleString('en-IN')}
                </span>
                <span className="font-mono text-xs text-textMuted uppercase"></span>
              </div>
              <span className="flex items-center gap-1.5 font-body text-sm text-gradientyellow font-medium">
                <span className="w-2 h-2 rounded-full bg-gradientyellow inline-block" />
                In Stock
              </span>
            </motion.div>

            {/* Block 7 — CTA buttons */}
            <div className="flex flex-col gap-3" ref={ctaRef}>
              <motion.a
                href="https://www.amazon.in/Moscure-Outdoor-Mosquito-Insect-Energy-Efficient/dp/B0GJ6FY1XD/ref=sr_1_6?sr=8-6"
                target='blank'
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 214, 10, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 text-background font-display text-xl tracking-wider rounded-xl py-4 w-full"
                style={{ backgroundColor: PRODUCT.accentColor }}
              >
                BUY NOW →
              </motion.a>

              <motion.button
                onClick={() => onNavigate?.('contact')}
                whileHover={{ borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 border border-white/20 text-white font-body font-medium rounded-xl py-4 w-full transition-colors"
              >
                CONTACT FOR INQUIRY
              </motion.button>
            </div>

            {/* Block 4 — trust badges */}
            <TrustBadgeRow badges={TRUST_BADGES} />

            {/* Warranty note */}
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-gradientyellow shrink-0 mt-0.5" />
              <p className="font-body text-xs text-textMuted leading-relaxed">
                <span className="text-white font-medium">1-Year Limited Warranty</span> — free repair or replacement for manufacturing defects. Non-transferable; original proof of purchase required.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-borderDefault" />

            {/* Block 5 — specs table */}
            <SpecsTable specs={PRODUCT_SPECS} />

            {/* Block 6 — about this item bullets */}
            <BulletList bullets={PRODUCT_BULLETS} />

            {/* Block 8 — share row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-body text-xs text-textMuted">Share:</span>

              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.05, borderColor: '#FFD60A' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gradientyellow" /> WhatsApp
              </motion.button>

              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.05, borderColor: '#FFD60A' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-gradientyellow" />
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>

              <motion.a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Moscure IPO — Chemical-Free Outdoor Mosquito Trap. UV LED, 3500 sq ft coverage. ₹21,599')}&url=${encodeURIComponent('https://moscure.in/products/moscure-ipo-outdoor-mosquito-trap')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: '#FFD60A' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-gradientyellow" /> Twitter/X
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: Trust Ticker ──────────────────────────────────── */}
      <TrustTicker />

      {/* ── SECTION 3: Product Detail Images ────────────────────────── */}
      <section id="product-details" className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-3">
            📸 SEE IT IN ACTION
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
            MOSCURE IPO OUTDOOR TRAP — IN DEPTH
          </h2>
          <p className="font-body text-textMuted text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Engineered for India's outdoors — gardens, patios, balconies, and beyond.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {DETAIL_IMAGES.map((img, i) => (
            <DetailImageBlock key={img.id} image={img} index={i} />
          ))}
        </div>
      </section>

      <TrustedByMarquee />

      {/* ── SECTION 4: Reviews ───────────────────────────────────────── */}
      <section id="reviews" className="relative bg-surface border-t border-borderDefault py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gradientyellow mb-3">
              ✦ CUSTOMER REVIEWS
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              CUSTOMER REVIEWS — MOSCURE IPO OUTDOOR TRAP
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: rating summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-[88px] self-start bg-background border border-borderDefault rounded-2xl p-6 flex flex-col gap-6"
            >
              <div className="text-center">
                <p className="font-display text-7xl text-gradientyellow leading-none">
                  {PRODUCT.rating}
                </p>
                <p className="font-body text-sm text-textMuted mt-1">out of 5</p>
                <div className="flex justify-center mt-2">
                  <StarRating rating={PRODUCT.rating} size="lg" />
                </div>
                <p className="font-body text-sm text-textMuted mt-2">
                  {PRODUCT.reviewCount} total reviews
                </p>
              </div>

              <div className="h-px bg-borderDefault" />

              <div className="flex flex-col gap-3">
                {RATING_BREAKDOWN.map((row, i) => (
                  <RatingBar key={row.stars} {...row} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Right: review cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {REVIEWS.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Final CTA strip ───────────────────────────────── */}
      <section id="product-cta" className="bg-surface border-t border-borderDefault py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-gradientyellow">
            ✓ READY TO PROTECT YOUR OUTDOOR SPACE?
          </p>

          <div>
            <h3 className="font-display text-4xl md:text-5xl text-white leading-none">
              MOSCURE IPO 
            </h3>
            <p className="font-body text-sm text-textMuted italic mt-2">
              Free delivery on all orders
            </p>
          </div>

          <div className="flex items-center gap-4 w-full max-w-sm">
            <motion.a
              href="https://www.amazon.in/Moscure-Outdoor-Mosquito-Insect-Energy-Efficient/dp/B0GJ6FY1XD/ref=sr_1_6?sr=8-6"
              target="_blank"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 214, 10, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center text-background font-display text-xl tracking-wider rounded-xl py-4"
              style={{ backgroundColor: PRODUCT.accentColor }}
            >
              BUY NOW →
            </motion.a>

            <motion.button
              onClick={() => onNavigate?.('product')}
              whileHover={{ borderColor: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 border border-white/20 text-white font-body font-medium rounded-xl py-4 transition-colors"
            >
              View All Products
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Mobile sticky CTA bar ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileCtaVisible && (
          <motion.div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-borderDefault px-4 py-3"
            style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
              <div>
                <p className="font-body text-xs text-textMuted">Moscure IPO</p>
                <p className="font-display text-2xl text-gradientyellow leading-none">₹21,599</p>
              </div>
              <motion.a
                href="https://www.amazon.in/Moscure-Outdoor-Mosquito-Insect-Energy-Efficient/dp/B0GJ6FY1XD/ref=sr_1_6?sr=8-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="text-background px-6 py-3 rounded-xl font-display text-lg tracking-wider"
                style={{ backgroundColor: PRODUCT.accentColor }}
              >
                BUY NOW →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
