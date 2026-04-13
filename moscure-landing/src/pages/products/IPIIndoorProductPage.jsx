import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield, HeartPulse, Maximize2, Zap, Battery,
  Sparkles, Ruler, ShieldCheck, Leaf, Volume2, Clock,
  Star, ThumbsUp, CheckCircle2, Camera, Image as ImageIcon,
  Share2, ChevronDown, ChevronUp, Copy, MessageCircle,
} from 'lucide-react'

// ─── Asset imports ────────────────────────────────────────────────────────────
import img1 from '../../assets/product-indoor.png'
import img2 from '../../assets/Indoor_2.jpg'
import img3 from '../../assets/Indoor_3.jpg'
import img4 from '../../assets/Indoor_4.jpg'
import img5 from '../../assets/Indoor_5.jpg'
import decp1 from '../../assets/Indoor_decp_1.jpg'
import decp2 from '../../assets/Indoor_decp_2.jpg'
import decp3 from '../../assets/Indoor_decp_3.jpg'
import decp4 from '../../assets/Indoor_decp_4.jpg'
import decp5 from '../../assets/Indoor_decp_5.jpg'

// ─── Static Data ──────────────────────────────────────────────────────────────

const PRODUCT = {
  id:          'ipi-indoor',
  sku:         'MOSCURE-IPI-001',
  name:        'IPI Indoor Mosquito & Insect Trap',
  fullTitle:   'IPI Indoor Mosquito & Insect Trap 365nm UV LED | Silent Electric Bug Zapper | Covers 400 sq ft | Odor-Free, Chemical-Free | Safe for Kids & Pets | 1.5W Compact Fly Killer | 280g Lightweight',
  brand:       'Moscure',
  originalPrice: 3299,
  price:       2199,
  currency:    '₹',
  inStock:     true,
  rating:      4.8,
  reviewCount: 124,
  badge:       'INDOOR',
}

const PRODUCT_IMAGES = [
  { id: 1, alt: 'Moscure IPI Indoor Mosquito Trap — Front View',           src: img1 },
  { id: 2, alt: 'Moscure IPI Indoor — UV LED Light Active',                src: img2 },
  { id: 3, alt: 'Moscure IPI — Collection Tray Detail',                    src: img3 },
  { id: 4, alt: 'Moscure IPI — Scale & Size Reference (280g)',             src: img4 },
  { id: 5, alt: 'Moscure IPI — Placed in Bedroom Setting',                 src: img5 },
]

const PRODUCT_SPECS = [
  { label: 'Brand',               value: 'Moscure'                   },
  { label: 'Colour',              value: 'White'                     },
  { label: 'Material',            value: 'Plastic'                   },
  { label: 'Product Dimensions',  value: '11.9L × 11.9W × 17.8H cm' },
  { label: 'Item Weight',         value: '280 Grams'                 },
  { label: 'Number of Pieces',    value: '1'                         },
  { label: 'Net Quantity',        value: '1.0 Count'                 },
  { label: 'UPC',                 value: '788792950948'              },
  { label: 'Power Source',        value: 'Corded Electric (1.5W)'    },
]

const PRODUCT_BULLETS = [
  {
    icon: Shield,
    highlight: 'All-in-One Insect Protection',
    text: 'Effectively traps mosquitoes, flies, moths, fruit flies, gnats, drain flies & other flying insects for complete indoor protection.',
  },
  {
    icon: HeartPulse,
    highlight: 'Supports Health & Hygiene',
    text: 'Helps reduce exposure to mosquito-borne diseases like Dengue, Malaria, Chikungunya & Zika by controlling indoor insect activity.',
  },
  {
    icon: Maximize2,
    highlight: 'Indoor Coverage up to 400 sq ft',
    text: 'Covers up to 40 m² (400 sq ft), making it perfect for bedrooms, living rooms, nurseries, kitchens & office spaces.',
  },
  {
    icon: Zap,
    highlight: 'Advanced 365nm UV Attraction Technology',
    text: 'Uses MLID & phototaxis mechanism to silently attract and trap insects without noise, smell, or disturbance.',
  },
  {
    icon: Battery,
    highlight: 'Energy Efficient 24/7 Protection',
    text: 'Consumes only 1.5W power, delivering continuous operation with minimal electricity cost.',
  },
  {
    icon: Sparkles,
    highlight: 'Compact, Modern & Travel-Friendly Design',
    text: 'Sleek and stylish build that blends with interiors; lightweight and easy to carry anywhere.',
  },
  {
    icon: Ruler,
    highlight: 'Perfect Size & Lightweight Build',
    text: 'Dimensions: Ø119 × 178 mm | Weight: 280g, designed for convenient placement on tables, bedside & corners.',
  },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, label: '100% Chemical-Free'   },
  { icon: Leaf,        label: 'Safe for Kids & Pets' },
  { icon: Volume2,     label: 'Silent Operation'      },
  { icon: Clock,       label: '24/7 Protection'       },
]

const DETAIL_IMAGES = [
  { id: 1, alt: 'How Moscure IPI UV LED Trap Works — 365nm Phototaxis Mechanism',                    src: decp1 },
  { id: 2, alt: 'Moscure IPI Coverage Area — 400 sq ft Indoor Protection',                           src: decp2 },
  { id: 3, alt: 'Moscure IPI Chemical-Free vs Traditional Mosquito Coils Comparison',           src: decp3 },
  { id: 4, alt: 'Moscure IPI Easy Maintenance — Clean Collection Tray',                                src: decp4 },
  { id: 5, alt: 'Moscure IPI Indoor Trap in use — Real Results from Indian Homes',                                 src: decp5 },
]

const REVIEWS = [
  {
    id: 1, name: 'Priya Sharma', initials: 'PS', location: 'Delhi, India', rating: 5, date: 'March 2025',
    title: 'Finally — a mosquito solution that actually works',
    body: `We live in a ground floor flat in Delhi and mosquitoes were a constant nightmare. After just 3 days with the Moscure IPI, we noticed a massive difference. Quiet, no smell, and the collection tray had caught more insects than I expected. My 2-year-old sleeps soundly now.`,
    verified: true, helpful: 47,
  },
  {
    id: 2, name: 'Rahul Mehta', initials: 'RM', location: 'Mumbai, India', rating: 5, date: 'February 2025',
    title: 'Replaced our All Out vaporiser — no regrets',
    body: `Was sceptical at first since we've been using chemical vaporisers for years. But my wife has asthma and the fumes were getting worse. The Moscure IPI has been running for 6 weeks now — completely silent, no smell whatsoever. 5 stars.`,
    verified: true, helpful: 39,
  },
  {
    id: 3, name: 'Anjali Krishnan', initials: 'AK', location: 'Bangalore, India', rating: 4, date: 'January 2025',
    title: 'Great product for bedrooms',
    body: `Works really well in our bedroom and nursery. The UV light is subtle and doesn't disturb sleep at all. The only reason I'm giving 4 stars instead of 5 is I wish the cord was a bit longer. But the product itself? Excellent. Caught dozens of insects in the first week.`,
    verified: true, helpful: 22,
  },
  {
    id: 4, name: 'Deepak Verma', initials: 'DV', location: 'Hyderabad, India', rating: 5, date: 'March 2025',
    title: 'The design is premium and it actually works',
    body: `Looks great on my bedside table — my wife thought it was a decorative lamp at first. Then she saw the collection tray. Genuinely impressed by how many insects this catches overnight. We sleep with the windows open now, which we never could before.`,
    verified: true, helpful: 31,
  },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 89, percent: 72 },
  { stars: 4, count: 24, percent: 19 },
  { stars: 3, count:  11, percent:  9 },
  { stars: 2, count:  0, percent:  0 },
  { stars: 1, count:  0, percent:  0 },
]

const TICKER_ITEMS = [
  '✓ 365nm UV LED Technology',
  '✓ Covers 400 Sq Ft',
  '✓ 280g Lightweight',
  '✓ 1.5W Energy Efficient',
  '✓ Catches Dengue & Malaria Vectors',
  '✓ No Refills Ever',
  '✓ 100% Chemical-Free',
  '✓ Silent Operation',
  '✓ Safe for Kids & Pets',
  '✓ Lab Tested in India',
]

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
const SCHEMA_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Moscure IPI Indoor Mosquito & Insect Trap',
  description: '365nm UV LED silent mosquito trap. Covers 400 sq ft. Chemical-free, safe for kids & pets.',
  brand: { '@type': 'Brand', name: 'Moscure' },
  sku: 'MOSCURE-IPI-001',
  mpn: 'IPI-001',
  gtin: '788792950948',
  offers: {
    '@type': 'Offer',
    price: '3299',
    priceCurrency: '',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Moscure' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '124',
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
        <span className="relative inline-block" style={{ width: '1em', height: '1em', fontSize: size === 'lg' ? 20 : size === 'md' ? 16 : 14 }}>
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
      <div className="animated-border">
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
                ? 'border-gradientcyan bg-gradientcyan/5'
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
        <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan font-semibold">
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
          className="w-full flex items-center justify-center gap-1.5 py-3 font-mono text-xs text-gradientcyan hover:bg-white/[0.02] transition-colors border-t border-borderDefault/50"
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
              className="flex gap-3 items-start rounded-lg p-3 border-l-2 border-transparent hover:border-gradientcyan transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradientcyan/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gradientcyan" />
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
            <Icon className="w-3.5 h-3.5 text-gradientcyan" />
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
          <div className="w-10 h-10 rounded-full bg-gradientcyan/20 border border-gradientcyan/30 flex items-center justify-center shrink-0">
            <span className="font-body font-bold text-sm text-gradientcyan">{review.initials}</span>
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-white">{review.name}</p>
            <p className="font-body text-xs text-textMuted">{review.location} · {review.date}</p>
          </div>
        </div>
        {review.verified && (
          <span className="flex items-center gap-1 font-mono text-xs text-gradientcyan shrink-0">
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
          className="w-full rounded-2xl bg-surface border-2 border-dashed border-gradientcyan/20 flex flex-col items-center justify-center gap-3"
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
                i % 2 === 0 ? 'text-gradientcyan' : 'text-textMuted'
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

export default function IPIIndoorProductPage({ onNavigate }) {
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
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    }

    document.title = 'Moscure IPI Indoor Mosquito Trap | UV LED Bug Zapper | Chemical-Free | ₹3,299'

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

    setMeta('description', 'Moscure IPI Indoor Mosquito & Insect Trap uses 365nm UV LED technology to silently attract and trap mosquitoes, flies & gnats. Covers 400 sq ft. 100% chemical-free, safe for kids & pets. Energy efficient 1.5W. Buy now at ₹3,299.')
    setMeta('keywords', 'indoor mosquito trap India, UV mosquito killer, chemical free bug zapper, dengue malaria mosquito trap, silent mosquito catcher, mosquito trap kids safe, Moscure IPI, mosquito trap 400 sq ft, electric insect trap India')
    setMeta('og:title', 'Moscure IPI Indoor Mosquito Trap — ₹3,299', true)
    setMeta('og:description', 'Silent, chemical-free UV LED mosquito trap. Safe for kids & pets. Covers 400 sq ft.', true)
    setMeta('og:url', 'https://moscure.in/products/moscure-ipi-indoor-mosquito-trap', true)
    setMeta('og:type', 'product', true)

    // JSON-LD
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'ipi-schema'
    script.textContent = SCHEMA_JSON
    document.head.appendChild(script)

    return () => {
      document.title = prev.title
      if (prev.desc) setMeta('description', prev.desc)
      document.getElementById('ipi-schema')?.remove()
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://moscure.in/products/moscure-ipi-indoor-mosquito-trap')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent('Check out the Moscure IPI Indoor Mosquito Trap — Chemical-Free, UV LED, ₹3,299\nhttps://moscure.in/products/moscure-ipi-indoor-mosquito-trap')}`,
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
        <ol className="flex items-center gap-2 font-mono text-xs text-textMuted" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <button
              onClick={() => onNavigate?.('landing')}
              className="hover:text-white transition-colors"
              itemProp="name"
            >Home</button>
            <meta itemProp="position" content="1" />
          </li>
          <li><span className="text-gradientcyan">›</span></li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <button
              onClick={() => onNavigate?.('product')}
              className="hover:text-white transition-colors"
              itemProp="name"
            >Products</button>
            <meta itemProp="position" content="2" />
          </li>
          <li><span className="text-gradientcyan">›</span></li>
          <li className="text-white" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">IPI Indoor Mosquito Trap</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </motion.nav>

      {/* ── SECTION 1: Product Hero ──────────────────────────────────── */}
      <section
        id="product-hero"
        ref={heroRef}
        className="relative"
      >
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
              <span className="self-start bg-gradientcyan/10 border border-gradientcyan/40 text-gradientcyan font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                {PRODUCT.badge}
              </span>

              <h1 className="font-body text-xl md:text-2xl text-white font-semibold leading-snug">
                {PRODUCT.fullTitle}
              </h1>

              <p className="font-body text-sm text-textMuted">
                Brand: <span className="text-gradientcyan font-medium">{PRODUCT.brand}</span>
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
                className="font-body text-sm text-textMuted underline cursor-pointer hover:text-gradientcyan transition-colors"
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
              <span className="flex items-center gap-1.5 font-body text-sm text-gradientcyan font-medium">
                <span className="w-2 h-2 rounded-full bg-gradientcyan inline-block" />
                In Stock
              </span>
            </motion.div>

            {/* Block 7 — CTA buttons */}
            <div className="flex flex-col gap-3" ref={ctaRef}>
              <motion.a
                href="https://www.amazon.in/Moscure-Mosquito-Odor-Free-Chemical-Free-Lightweight/dp/B0GCF5LM5B/ref=sr_1_1_sspa?sr=8-1-spons&aref=LNbvtfqxv6&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
              target='blank'
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 245, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-gradientcyan text-background font-display text-xl tracking-wider rounded-xl py-4 w-full"
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
              <ShieldCheck className="w-4 h-4 text-gradientcyan shrink-0 mt-0.5" />
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
                whileHover={{ scale: 1.05, borderColor: '#00F5D4' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gradientcyan" /> WhatsApp
              </motion.button>

              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.05, borderColor: '#00F5D4' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-gradientcyan" />
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>

              <motion.a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Moscure IPI — Chemical-Free Indoor Mosquito Trap. UV LED, 400 sq ft coverage. ₹3,299')}&url=${encodeURIComponent('https://moscure.in/products/moscure-ipi-indoor-mosquito-trap')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: '#00F5D4' }}
                className="flex items-center gap-1.5 bg-surface border border-borderDefault rounded-lg px-3 py-2 font-body text-xs text-textMuted transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-gradientcyan" /> Twitter/X
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
          <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-3">
            📸 SEE IT IN ACTION
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
            MOSCURE IPI INDOOR TRAP — IN DEPTH
          </h2>
          <p className="font-body text-textMuted text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Every detail engineered for silent, effective, chemical-free mosquito control.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {DETAIL_IMAGES.map((img, i) => (
            <DetailImageBlock key={img.id} image={img} index={i} />
          ))}
        </div>
      </section>

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
            <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-3">
              ✦ CUSTOMER REVIEWS
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
              CUSTOMER REVIEWS — MOSCURE IPI INDOOR TRAP
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
          <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan">
            ✓ READY TO PROTECT YOUR HOME?
          </p>

          <div>
            <h3 className="font-display text-4xl md:text-5xl text-white leading-none">
              MOSCURE IPI 
            </h3>
            <p className="font-body text-sm text-textMuted italic mt-2">
              Free delivery on all orders
            </p>
          </div>

          <div className="flex items-center gap-4 w-full max-w-sm">
            <motion.a
              href="https://www.amazon.in/Moscure-Mosquito-Odor-Free-Chemical-Free-Lightweight/dp/B0GCF5LM5B/ref=sr_1_1_sspa?sr=8-1-spons&aref=LNbvtfqxv6&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
              target='blank'
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 245, 212, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center bg-gradientcyan text-background font-display text-xl tracking-wider rounded-xl py-4"
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
                <p className="font-body text-xs text-textMuted">Moscure IPI</p>
              </div>
              <motion.a
                href="https://www.amazon.in/Moscure-Mosquito-Odor-Free-Chemical-Free-Lightweight/dp/B0GCF5LM5B/ref=sr_1_1_sspa?sr=8-1-spons&aref=LNbvtfqxv6&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradientcyan text-background px-6 py-3 rounded-xl font-display text-lg tracking-wider"
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
