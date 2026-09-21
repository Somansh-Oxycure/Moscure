import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import VideoTestimonials from '../components/VideoTestimonials'
import TrustedByMarquee from '../components/TrustedByMarquee'
import { Link, useNavigate } from 'react-router-dom'
import {
  Shield, HeartPulse, Maximize2, Zap, Battery,
  Droplets, Ruler, ShieldCheck, Wind, Volume2, Clock,
  Star, ThumbsUp, CheckCircle2, Camera, Image as ImageIcon,
  Share2, ChevronDown, ChevronUp, Copy, MessageCircle, Plus, Minus,
  Globe, MapPin, Bug, Skull, AlertTriangle, BarChart2, Users,
  Utensils, PersonStanding, TrendingDown, MessageSquareWarning,
  Coins, Umbrella, HandCoins, Home, Building, Warehouse, Store,
  Instagram, Facebook, Twitter, Linkedin
} from 'lucide-react'
import CheckoutModal from '../components/CheckoutModal'

// ─── Asset imports ────────────────────────────────────────────────────────────
import logoImg from '../assets/logo.webp'
import img1 from '../assets/product-outdoor.png'
import img2 from '../assets/Outdoor_2.jpg'
import img3 from '../assets/Outdoor_3.jpg'
import img4 from '../assets/new_section/indept.png'
import img5 from '../assets/Outdoor_5.jpg'
import img6 from '../assets/Outdoor_6.jpg'
import decp1 from '../assets/Outdoor_decp_1.jpg'
import decp2 from '../assets/Outdoor_decp_2.jpg'
import decp3 from '../assets/Outdoor_decp_3.jpg'
import decp4 from '../assets/Outdoor_decp_4.jpg'
import decp5 from '../assets/Outdoor_decp_5.jpg'
import comparisonTableImg from '../assets/comparison_table.png'
import homeImg from '../assets/new_section/IMG_1.png'
import villaImg from '../assets/new_section/IMG_2.png'
import farmhouseImg from '../assets/new_section/IMG_3.png'
import cafeImg from '../assets/new_section/IMG_4.png'
import mosquitoIcon from '../assets/new_section/Machaar no_1.png'
import mothIcon from '../assets/new_section/Machaar no_2.png'
import yellowJacketIcon from '../assets/new_section/Machaar no_3.png'
import flyIcon from '../assets/new_section/Machaar no_4.png'

// ─── Certification Assets ───────────────────────────────────────────────────────
import bisIcon from '../assets/BIS-Hallmark-White.svg'
import nablIcon from '../assets/nabl-india-seeklogo.png'

// ─── Static Data ──────────────────────────────────────────────────────────────

const PRODUCT = {
  id: 'ipo-outdoor-landing',
  sku: 'MOSCURE-IPO-001',
  name: 'IPO Outdoor Mosquito & Insect Trap (Landing Page)',
  fullTitle: 'IPO Outdoor Mosquito & Insect Trap | 365nm UV LED Trap | Covers 3500 sq ft | Water Resistant, Hangable, Safe & Odor-Free Bug Trapper | 9W Energy-Efficient',
  brand: 'Moscure',
  originalPrice: 25000,
  price: 12999,
  currency: '₹',
  inStock: true,
  rating: 4.7,
  reviewCount: 98,
  badge: 'OUTDOOR',
  accentColor: '#FFD60A',
}

const PRODUCT_IMAGES = [
  { id: 1, alt: 'Moscure IPO Outdoor Mosquito Trap — Front View', src: img1 },
  { id: 2, alt: 'Moscure IPO Outdoor — 365nm UV LED Light Active', src: img2 },
  {
    id: 'vid1',
    type: 'youtube',
    src: 'a8qVmWTwoYw',
    thumbnail: img1,
    alt: 'Moscure IPO Outdoor Video'
  },
  { id: 3, alt: 'Moscure IPO — Water Resistant Outdoor Housing Detail', src: img3 },
  { id: 4, alt: 'Moscure IPO — Hanging Installation for Garden & Patio', src: img4 },
  { id: 5, alt: 'Moscure IPO — Scale & Size Reference (1,205g)', src: img5 },
  { id: 6, alt: 'Moscure IPO — Placed in Garden / Outdoor Setting', src: img6 },
]

const PRODUCT_SPECS = [
  { label: 'Brand', value: 'Moscure' },
  { label: 'Colour', value: 'Black' },
  { label: 'Material', value: 'Plastic' },
  { label: 'Product Dimensions', value: '11.9L × 11.9W × 17.8H cm' },
  { label: 'Item Weight', value: '280 Grams' },
  { label: 'Number of Pieces', value: '1' },
  { label: 'Net Quantity', value: '1.0 Count' },
  { label: 'Power Source', value: 'Corded Electric (9W)' },
  { label: 'Water Resistant', value: 'Yes (IPX4)' },
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
  { icon: Droplets, label: 'Water Resistant' },
  { icon: Wind, label: '3500 sq ft Coverage' },
  { icon: ShieldCheck, label: '100% Chemical-Free' },
  { icon: Clock, label: '24/7 Outdoor Guard' },
]

const DETAIL_IMAGES = [
  { id: 1, alt: 'How Moscure IPO Outdoor UV LED Trap Works — 365nm Phototaxis Mechanism', src: decp1 },
  { id: 2, alt: 'Moscure IPO Outdoor Coverage Area — 3500 sq ft Garden & Patio Protection', src: decp2 },
  { id: 3, alt: 'Moscure IPO Water Resistant Housing — Built for Indian Monsoon Conditions', src: decp3 },
  { id: 4, alt: 'Moscure IPO Hanging Installation Guide — Garden, Patio, Balcony Setup', src: decp4 },
  { id: 5, alt: 'Moscure IPO Outdoor Trap Real Results — Effective Mosquito Control', src: decp5 },
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
  { stars: 3, count: 10, percent: 10 },
  { stars: 2, count: 0, percent: 0 },
  { stars: 1, count: 0, percent: 0 },
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
  '@graph': [
    {
      '@type': 'Product',
      name: 'Moscure IPO Outdoor Mosquito & Insect Trap',
      description: '365nm UV LED outdoor mosquito trap. Covers up to 3500 sq ft. Water resistant, hangable. Chemical-free, safe odor-free.',
      image: [
        'https://www.moscure.com/assets/product-outdoor.png'
      ],
      brand: { '@type': 'Brand', name: 'Moscure' },
      sku: 'MOSCURE-IPO-001',
      mpn: 'IPO-001',
      url: 'https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap',
      offers: {
        '@type': 'Offer',
        price: '12999',
        priceCurrency: 'INR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: 'https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap',
        seller: { '@type': 'Organization', name: 'Moscure' },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IN',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'INR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        reviewCount: '98',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.moscure.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://www.moscure.com/product'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'IPO Outdoor Mosquito Trap',
          item: 'https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap'
        }
      ]
    }
  ]
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'
  const full = Math.floor(rating)
  const frac = rating - full
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  // Reset video state when active image changes
  useEffect(() => {
    setIsExpanded(false)
    setIsMuted(true)
  }, [activeIndex])

  return (
    <div>
      {/* Expanded Video Overlay */}
      <AnimatePresence>
        {isExpanded && (active.type === 'video' || active.type === 'youtube') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            onClick={() => { setIsExpanded(false); setIsMuted(true) }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`relative w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black ${active.type === 'youtube' ? 'max-w-[400px] h-[85vh]' : 'max-w-4xl'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setIsExpanded(false); setIsMuted(true) }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/20"
              >
                ✕
              </button>
              {active.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${active.src}?autoplay=1&mute=0&rel=0&playsinline=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <video
                  src={active.src}
                  autoPlay
                  controls
                  className="w-full h-full max-h-[85vh] object-contain bg-black"
                  onEnded={() => { setIsExpanded(false); setIsMuted(true) }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {active.type === 'video' || active.type === 'youtube' ? (
                <div className="w-full h-full relative cursor-pointer overflow-hidden bg-black" onClick={() => { setIsExpanded(true); setIsMuted(false) }}>
                  {active.type === 'youtube' ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${active.src}?autoplay=1&mute=1&loop=1&playlist=${active.src}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full border-0 object-contain"
                      ></iframe>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={active.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : active.src ? (
                <img
                  src={active.src}
                  alt={active.alt}
                  width={600}
                  height={600}
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
            className={`w-14 h-14 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors shrink-0 ${i === activeIndex
              ? 'border-gradientyellow bg-gradientyellow/5'
              : 'border-borderDefault bg-surface hover:border-white/30'
              }`}
          >
            {img.type === 'video' || img.type === 'youtube' ? (
              <div className="w-full h-full bg-black relative flex items-center justify-center">
                {img.thumbnail && <img src={img.thumbnail} alt={img.alt} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                <Volume2 className="w-5 h-5 text-white relative z-10" />
              </div>
            ) : img.src ? (
              <img src={img.src} alt={img.alt} width={100} height={100} className="w-full h-full object-contain p-1 bg-white" />
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
          className={`flex items-center justify-between py-2.5 px-4 border-b border-borderDefault/50 last:border-0 ${i % 2 === 1 ? 'bg-white/[0.02]' : ''
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
          width={800}
          height={450}
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
              className={`font-mono uppercase text-xs tracking-widest whitespace-nowrap px-4 ${i % 2 === 0 ? 'text-gradientyellow' : 'text-textMuted'
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

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-borderDefault rounded-xl overflow-hidden mb-3 bg-surface">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left font-body font-bold text-white hover:bg-white/5 transition-colors">
        {question}
        {open ? <Minus className="w-5 h-5 text-gradientyellow" /> : <Plus className="w-5 h-5 text-gradientyellow" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-4 pt-0 text-sm text-textMuted font-body mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ─── Page Root ────────────────────────────────────────────────────────────────

export default function IPOLandingPage({ onNavigate }) {
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const heroRef = useRef(null)
  const ctaRef = useRef(null)

  // Track ViewContent event for Meta Pixel
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'ViewContent',
      content_name: PRODUCT.name,
      content_ids: [PRODUCT.sku],
      content_type: 'product',
      value: PRODUCT.price,
      currency: PRODUCT.currency === '₹' ? 'INR' : PRODUCT.currency
    })
  }, [])

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
    const active = PRODUCT_IMAGES[activeImage]
    if (active?.type === 'video' || active?.type === 'youtube') return // Don't auto-rotate if video is active

    const timer = setInterval(() => {
      setActiveImage(i => (i + 1) % PRODUCT_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [activeImage])



  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent('Check out the Moscure IPO Outdoor Mosquito Trap — Chemical-Free, UV LED, 3500 sq ft coverage, ₹12,999\nhttps://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap')}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      <Helmet>
        <title>Moscure IPO Outdoor Mosquito Trap | UV LED Bug Trapper | 3500 sq ft Coverage | ₹12,999</title>
        <meta name="description" content="Moscure IPO Outdoor Mosquito & Insect Trap uses 365nm UV LED technology to silently trap mosquitoes & flying insects across 3500 sq ft. Water resistant, hangable design. 100% chemical-free. Buy now at ₹12,999." />
        <meta name="keywords" content="outdoor mosquito trap India, UV mosquito killer outdoor, water resistant bug trapper, garden mosquito trap, patio mosquito catcher, dengue malaria mosquito trap outdoor, Moscure IPO, 3500 sq ft outdoor insect trap, hangable mosquito trap India" />
        <meta property="og:title" content="Moscure IPO Outdoor Mosquito Trap — ₹12,999" />
        <meta property="og:description" content="Water resistant, hangable UV LED mosquito trap. Covers 3500 sq ft. Chemical-free, monsoon ready." />
        <meta property="og:url" content="https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://www.moscure.com/products/moscure-ipo-outdoor-mosquito-trap" />
        <script type="application/ld+json" id="ipo-schema">
          {SCHEMA_JSON}
        </script>
      </Helmet>

      {/* ── SECTION 0: Navbar ──────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 h-16 md:h-20 flex items-center px-6 md:px-12">
        <div className="flex items-center">
          <img
            src={logoImg}
            alt="Moscure Logo"
            className="h-16 md:h-16 w-auto"
          />
        </div>
      </nav>

      {/* ── SECTION 1: Product Hero ──────────────────────────────────── */}
      <div className="pt-24 md:pt-28" />
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
              className="flex items-center gap-3 flex-wrap"
            >
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none font-bold">
                  ₹{PRODUCT.price.toLocaleString('en-IN')}
                </span>
                <span className="font-display text-xl sm:text-2xl text-textMuted line-through">
                  ₹{PRODUCT.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="flex items-center gap-1.5 font-body text-sm text-gradientyellow font-medium">
                <span className="w-2 h-2 rounded-full bg-gradientyellow inline-block" />
                In Stock
              </span>
            </motion.div>

            {/* Block 7 — CTA buttons */}
            <div className="flex flex-col gap-3" ref={ctaRef}>
              <motion.button
                onClick={() => setCheckoutOpen(true)}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 214, 10, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 text-background font-display text-xl tracking-wider rounded-xl py-4 w-full"
                style={{ backgroundColor: PRODUCT.accentColor }}
              >
                BUY NOW →
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

            {/* Block 8 — share row (Removed for landing page) */}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: Trust Ticker ──────────────────────────────────── */}
      <TrustTicker />

      {/* ── SECTION 4: Video Testimonials ────────────────────────────── */}
      <VideoTestimonials accent="yellow" />

      {/* ── SECTION 2.5: WHY THE ISSUE IS BIGGER THAN YOU THINK ────────────────────────── */}
      <section className="relative bg-[#090909] py-16 md:py-24 border-b border-borderDefault">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="mb-12">
            <div className="w-16 h-1.5 bg-gradientyellow mb-4"></div>
            <h2 className="font-display text-4xl md:text-[54px] text-white uppercase leading-none tracking-tight">
              WHY THE ISSUE IS <br />
              <span className="text-gradientyellow">BIGGER</span> THAN YOU THINK
            </h2>
            <p className="font-body text-textMuted mt-4 text-lg">Data in iconmed pointers.</p>
          </div>

          {/* HEALTH IMPACT */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                <HeartPulse className="w-10 h-10 text-gradientyellow" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide uppercase">HEALTH IMPACT</h3>
                  <div className="hidden md:block w-32 h-px bg-white/20"></div>
                </div>
                <p className="font-mono text-[10px] text-textMuted uppercase tracking-[0.2em] mt-1">Health Surveys</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Global */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-8 pb-10">
                <div className="flex items-center gap-5 border-b border-white/10 pb-6 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                    <Globe className="w-8 h-8 text-gradientyellow" />
                  </div>
                  <h4 className="font-display text-white text-3xl">Global</h4>
                </div>
                <ul className="space-y-10">
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Skull className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-gradientyellow text-3xl leading-none">700k+</p>
                      <p className="font-body text-sm text-textMuted mt-1">vector deaths yearly</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">Malaria: <span className="text-gradientyellow text-3xl leading-none">610k</span></p>
                      <p className="font-body text-sm text-textMuted mt-1">deaths/year<br />mostly kids below 5</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">Dengue: <span className="text-gradientyellow text-3xl leading-none">96 million</span></p>
                      <p className="font-body text-sm text-textMuted mt-1">cases yearly</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* India */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-8 pb-10">
                <div className="flex items-center gap-5 border-b border-white/10 pb-6 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                    <MapPin className="w-8 h-8 text-gradientyellow" />
                  </div>
                  <h4 className="font-display text-white text-3xl">India</h4>
                </div>
                <ul className="space-y-10">
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">Dengue: <span className="text-gradientyellow text-3xl leading-none">200k+</span></p>
                      <p className="font-body text-sm text-textMuted mt-1">cases/year</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">Malaria: <span className="text-gradientyellow text-3xl leading-none">250k</span></p>
                      <p className="font-body text-sm text-textMuted mt-1">cases/year</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">Chikungunya: <span className="text-gradientyellow text-3xl leading-none">50k</span></p>
                      <p className="font-body text-sm text-textMuted mt-1">cases/year</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Other Pests */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-8 pb-10">
                <div className="flex items-center gap-5 border-b border-white/10 pb-6 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                    <Bug className="w-8 h-8 text-gradientyellow" />
                  </div>
                  <h4 className="font-display text-white text-3xl">Other Pests</h4>
                </div>
                <ul className="space-y-10">
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-2xl leading-none">Roaches</p>
                      <p className="font-body text-sm text-textMuted mt-2">Trigger early asthma<br />in kids</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Bug className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-2xl leading-none">Houseflies</p>
                      <p className="font-body text-sm text-textMuted mt-2">Spread cholera</p>
                    </div>
                  </li>
                  <li className="flex gap-5 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-2xl leading-none">Rodents</p>
                      <p className="font-body text-sm text-textMuted mt-2">Cause leptospirosis</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BUSINESS IMPACT */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                <BarChart2 className="w-10 h-10 text-gradientyellow" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide uppercase">BUSINESS IMPACT</h3>
                  <div className="hidden md:block w-32 h-px bg-white/20"></div>
                </div>
                <p className="font-mono text-[10px] text-textMuted uppercase tracking-[0.2em] mt-1">Hospitality Sector Surveys</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Loss */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-8 pb-10">
                <div className="flex items-center gap-5 border-b border-white/10 pb-6 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                    <Users className="w-8 h-8 text-gradientyellow" />
                  </div>
                  <h4 className="font-display text-white text-3xl">Customer Loss</h4>
                </div>
                <ul className="space-y-10">
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Utensils className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">81%</p>
                      <p className="font-body text-sm text-textMuted">never return if pest<br />on food</p>
                    </div>
                  </li>
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <PersonStanding className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">76%</p>
                      <p className="font-body text-sm text-textMuted">leave if pest in<br />dining area</p>
                    </div>
                  </li>
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <TrendingDown className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">50%</p>
                      <p className="font-body text-sm text-textMuted">drop repeat visits<br />on sight</p>
                    </div>
                  </li>
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MessageSquareWarning className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">56%</p>
                      <p className="font-body text-sm text-textMuted">post bad online<br />reviews</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Revenue Loss */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-8 pb-10">
                <div className="flex items-center gap-5 border-b border-white/10 pb-6 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gradientyellow flex items-center justify-center shrink-0">
                    <Coins className="w-8 h-8 text-gradientyellow" />
                  </div>
                  <h4 className="font-display text-white text-3xl">Revenue Loss</h4>
                </div>
                <ul className="space-y-10">
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Umbrella className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">30%</p>
                      <p className="font-body text-sm text-textMuted">patio seating loss<br />in monsoon</p>
                    </div>
                  </li>
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <HandCoins className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">50%</p>
                      <p className="font-body text-sm text-textMuted">diners ask for<br />full refund</p>
                    </div>
                  </li>
                  <li className="flex gap-6 items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <TrendingDown className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="font-display text-[40px] text-gradientyellow w-24 leading-none">20%</p>
                      <p className="font-body text-sm text-textMuted">drop in sales<br />after sighting</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2.6: HOW MOSCURE PROTECTS YOU ────────────────────────── */}
      <section className="relative bg-background py-16 md:py-24 border-b border-borderDefault">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider mb-1">
            HOW MOSCURE
          </h2>
          <h2 className="font-display text-4xl md:text-6xl text-gradientyellow uppercase tracking-wider">
            PROTECTS YOU FROM THESE
          </h2>

          <div className="flex items-center justify-center gap-2 mt-8 mb-6">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gradientyellow flex items-center gap-2">
              <Camera className="w-3 h-3 md:w-4 md:h-4" /> SEE IT IN ACTION
            </span>
          </div>

          <div className="mb-10">
            <h3 className="font-display text-2xl md:text-4xl text-white uppercase tracking-wide">
              MOSCURE IPO OUTDOOR TRAP — IN DEPTH
            </h3>
            <p className="font-body text-sm md:text-base text-textMuted mt-3">
              Engineered for India's outdoors — gardens, patios, balconies, and beyond.
            </p>
          </div>

          <div className="mt-8 max-w-5xl mx-auto">
            {/* Placeholder for the diagram image */}
            <img
              src={img4}
              alt="Moscure Trap In Depth Diagram"
              className="w-full h-auto rounded-2xl object-cover border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2.6.5: ATTRACTION & TRAPPING ────────────────────────── */}
      <section className="relative bg-[#090909] py-12 md:py-16 border-b border-borderDefault">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
            <div className="max-w-2xl">
              <p className="font-mono text-gradientyellow text-sm font-bold tracking-[0.2em] mb-2 uppercase">
                Engineered For
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wide leading-tight mb-3">
                Mosquito Attraction & Trapping
              </h2>
              <p className="font-body text-sm text-textMuted max-w-lg leading-relaxed">
                A science-backed combination of light, airflow and a secure collection system to attract, trap and contain mosquitoes effectively in outdoor environments.
              </p>
            </div>

            {/* Right Side Text with Vertical Line */}
            <div className="hidden md:flex items-center gap-6 border-l border-white/20 pl-6 h-full py-1">
              <p className="font-mono text-[10px] md:text-xs text-textMuted uppercase tracking-widest leading-loose w-32">
                Science<br />For A More<br />Pest-Free<br />Tomorrow
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="relative flex justify-center mb-8">
            {/* Subtle glow behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>
            <img
              src={img1}
              alt="Moscure Trap"
              className="relative z-10 w-full max-w-xs object-contain drop-shadow-2xl"
            />
          </div>

          {/* Grid of Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Card 1 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">365nm UV-A</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  Emits a specific wavelength proven to attract mosquitoes effectively.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Bug className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">Phototaxis</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  Mosquitoes are naturally drawn to UV light, a behavior known as phototaxis.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Wind className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">Suction</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  A powerful suction system pulls in mosquitoes as they approach the light.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Wind className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">Airflow</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  Optimized airflow ensures efficient capture from multiple directions.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">Collection Mechanism</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  Trapped mosquitoes are held securely in a closed basket, preventing escape.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-surface/30 border border-white/5 hover:border-gradientyellow/30 transition-colors rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gradientyellow flex items-center justify-center shrink-0 mt-0.5">
                <Globe className="w-4 h-4 text-gradientyellow" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <h4 className="font-display text-base text-white mb-1.5">Coverage</h4>
                <p className="font-body text-xs text-textMuted leading-relaxed mb-3">
                  Designed for wide outdoor coverage, protecting larger spaces effectively.
                </p>
                <button className="font-display text-[10px] text-gradientyellow tracking-wider uppercase hover:text-white transition-colors mt-auto">
                  Read More +
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2.7: OUR CERTIFICATIONS ────────────────────────── */}
      <section className="relative bg-[#090909] py-16 md:py-24 border-b border-borderDefault">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gradientyellow mb-4 font-semibold">
            OUR CERTIFICATIONS
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-3 uppercase tracking-wide font-bold">
            TRUSTED. TESTED. CERTIFIED.
          </h2>
          <p className="font-body text-[15px] text-textMuted mb-12">
            Backed by recognised laboratories and regulatory bodies for safety, performance and reliability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="rounded-2xl border border-borderDefault bg-surface/50 p-6 flex items-center gap-6 hover:border-gradientyellow/50 transition-colors">
              <img src={bisIcon} alt="BIS Hallmark" className="h-16 w-auto shrink-0" />
              <span className="font-body text-[15px] font-semibold text-white">BIS Certified</span>
            </div>
            <div className="rounded-2xl border border-borderDefault bg-surface/50 p-6 flex items-center gap-6 hover:border-gradientyellow/50 transition-colors">
              <ShieldCheck className="w-16 h-16 text-white shrink-0" />
              <span className="font-body text-[15px] font-semibold text-white">(CIB&RC) Certified</span>
            </div>
            <div className="rounded-2xl border border-borderDefault bg-surface/50 p-6 flex items-center gap-6 hover:border-gradientyellow/50 transition-colors">
              <img src={nablIcon} alt="NABL India" className="h-16 w-auto brightness-0 invert shrink-0" />
              <span className="font-body text-[15px] font-semibold text-white">NABL / ISO 17025 Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2.8: SMALL PICTURES COLLECTION ────────────────────────── */}
      <section className="relative bg-[#090909] py-16 md:py-24 border-b border-borderDefault">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-gradientyellow mx-auto mb-6"></div>
            <h2 className="text-white text-3xl md:text-4xl font-body mb-2">Protect your family from insects</h2>
            <h2 className="text-white text-5xl md:text-7xl font-display font-bold uppercase tracking-wide">
              Even <span className="text-gradientyellow">Outdoors</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
            <div className="flex flex-col items-center">
              <img src={mosquitoIcon} alt="Mosquitoes" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" />
              <span className="text-white font-body text-sm md:text-base">Mosquitoes</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={mothIcon} alt="Moths" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" />
              <span className="text-white font-body text-sm md:text-base">Moths</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={yellowJacketIcon} alt="Yellow Jackets" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" />
              <span className="text-white font-body text-sm md:text-base text-center leading-tight">Yellow<br />Jackets</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={flyIcon} alt="Flies" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4" />
              <span className="text-white font-body text-sm md:text-base">Flies</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={homeImg} alt="For Homes" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <Home className="w-8 h-8 text-gradientyellow" />
                <span className="text-white text-2xl font-display tracking-wide">For Homes</span>
              </div> */}
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={villaImg} alt="For Villas" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <Building className="w-8 h-8 text-gradientyellow" />
                <span className="text-white text-2xl font-display tracking-wide">For Villas</span>
              </div> */}
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={farmhouseImg} alt="For Farmhouses" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div> */}
              {/* <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <Warehouse className="w-8 h-8 text-gradientyellow" />
                <span className="text-white text-2xl font-display tracking-wide">For Farmhouses</span>
              </div> */}
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={cafeImg} alt="For Cafés, Restaurants & Hotels" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <Store className="w-8 h-8 text-gradientyellow" />
                <span className="text-white text-2xl font-display tracking-wide">For Cafés, Restaurants & Hotels</span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2.9: RESPONSIVE TABLE ────────────────────────── */}
      <section className="relative bg-background py-16 md:py-24 border-b border-borderDefault">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-white">Feature Comparison</h2>
          </div>
          <div className="rounded-xl overflow-hidden border border-borderDefault bg-surface/50 flex justify-center p-2 md:p-4">
            <img
              src={comparisonTableImg}
              alt="Feature Comparison Table"
              className="w-full max-w-2xl h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      <TrustedByMarquee />

      {/* ── SECTION 4: Video Testimonials ────────────────────────────── */}
      {/* removed */}

      {/* ── SECTION 5: Reviews ───────────────────────────────────────── */}
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

      {/* ── SECTION 4.5: FAQs ───────────────────────────────────────── */}
      <section id="faqs" className="relative bg-background py-16 md:py-24 border-t border-borderDefault">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-white">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <div className="flex flex-col">
            <FAQItem question="Does it really catch mosquitoes?" answer="Yes! The IPO Outdoor Trap is scientifically proven to attract and trap mosquitoes, flies, and other flying insects using advanced 365nm UV LED technology and phototaxis." />
            <FAQItem question="How long should I run it?" answer="For best results, we recommend running the trap 24/7, or at least from dusk till dawn when mosquitoes are most active." />
            <FAQItem question="Does it work immediately?" answer="You will start seeing catches from the first night, but for a significant reduction in the mosquito population, allow 3-7 days of continuous operation." />
            <FAQItem question="Does it kill mosquitoes?" answer="It traps them. The powerful downward airflow pulls insects into the bottom tray where they safely dehydrate and die without any zapping sounds or smells." />
            <FAQItem question="How much electricity does it consume?" answer="The trap is extremely energy-efficient, consuming only 9W of power. Running it 24/7 will barely impact your electricity bill." />
            <FAQItem question="Is it noisy?" answer="Not at all. The internal fan operates very quietly, so it won't disturb your outdoor relaxation or sleep." />
            <FAQItem question="Can I keep it outdoors?" answer="Yes, the IPO trap is specially engineered for outdoor use. It features a durable, water-resistant housing." />
            <FAQItem question="What happens in rain?" answer="The water-resistant design protects the trap during rain. It is monsoon-ready and can be left outside during normal showers." />
            <FAQItem question="How often do I clean it?" answer="We recommend emptying the catch tray once a week, or whenever it gets full. It takes less than a minute." />
            <FAQItem question="Does it need refills?" answer="No! The trap works purely on UV light and airflow. It is 100% chemical-free and never requires any liquid or mat refills." />
            <FAQItem question="What is the warranty?" answer="The Moscure IPO comes with a 1-Year Limited Warranty covering manufacturing defects." />
            <FAQItem question="What if I have a large garden?" answer="The trap covers up to 3500 sq ft. For very large or complex gardens, we recommend placing multiple units strategically to ensure full coverage." />
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
            <motion.button
              onClick={() => setCheckoutOpen(true)}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 214, 10, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center text-background font-display text-xl tracking-wider rounded-xl py-4 w-full"
              style={{ backgroundColor: PRODUCT.accentColor }}
            >
              BUY NOW →
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 6: Footer ───────────────────────────────────────── */}
      <footer className="bg-background pt-16 pb-8 px-6 md:px-12 border-t border-borderDefault">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 mb-12">
          {/* Left Side: Logo & Socials */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="">
              <img src={logoImg} alt="Moscure Logo" className="h-28 w-auto pl-10" />

            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-borderDefault flex items-center justify-center hover:border-teal-400 transition-colors group">
                <Instagram className="w-4 h-4 text-teal-400/80 group-hover:text-teal-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderDefault flex items-center justify-center hover:border-teal-400 transition-colors group">
                <Facebook className="w-4 h-4 text-teal-400/80 group-hover:text-teal-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderDefault flex items-center justify-center hover:border-teal-400 transition-colors group">
                <Twitter className="w-4 h-4 text-teal-400/80 group-hover:text-teal-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderDefault flex items-center justify-center hover:border-teal-400 transition-colors group">
                <Linkedin className="w-4 h-4 text-teal-400/80 group-hover:text-teal-400" />
              </a>
            </div>
          </div>

          {/* Right Side: Description */}
          <div className="flex-1 max-w-3xl md:pt-4 flex flex-col gap-6">
            <p className="font-body text-[15px] text-textMuted leading-relaxed">
              India's advanced mosquito trap using MLID and Phototaxis technology for chemical-free, family-safe protection against mosquito-borne diseases.
            </p>
            <div className="flex items-center gap-6">
              <img src={bisIcon} alt="BIS Hallmark Certification" className="h-12 w-auto opacity-75 hover:opacity-100 transition-opacity" />
              <img src={nablIcon} alt="NABL India Certification" className="h-12 w-auto opacity-75 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="max-w-7xl mx-auto border-t border-borderDefault/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-sm text-textMuted">
            © 2026 Moscure. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link to="/privacy-policy" className="font-body text-sm text-textMuted hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-borderDefault/50 hidden md:inline">•</span>
            <Link to="/terms-of-service" className="font-body text-sm text-textMuted hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-borderDefault/50 hidden md:inline">•</span>
            <Link to="/refund-policy" className="font-body text-sm text-textMuted hover:text-white transition-colors">Refund & Replacement Policy</Link>
          </div>
        </div>
      </footer>

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
                <p className="font-display text-2xl text-gradientyellow leading-none">₹{PRODUCT.price.toLocaleString('en-IN')}</p>
              </div>
              <motion.button
                onClick={() => setCheckoutOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="text-background px-6 py-3 rounded-xl font-display text-lg tracking-wider"
                style={{ backgroundColor: PRODUCT.accentColor }}
              >
                BUY NOW →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Checkout Modal ───────────────────────────────────────── */}
      <CheckoutModal
        product={{ ...PRODUCT, image: img1 }}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onGoToOrders={() => { setCheckoutOpen(false); navigate('/my-orders') }}
      />
    </>
  )
}
