# 🛒 MOSCURE — IPI Indoor Product Page Blueprint
**Version:** 1.0
**Page:** `/products/moscure-ipi-indoor-mosquito-trap`
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS
**File:** `src/pages/products/IPIIndoorProductPage.jsx` — **SINGLE FILE**

---

## 1. SEO STRATEGY

### URL
```
/products/moscure-ipi-indoor-mosquito-trap
```
> Short, keyword-rich, hyphenated. No IDs, no query strings.

### Meta Tags (inject via `useEffect` or React Helmet)
```html
<title>Moscure IPI Indoor Mosquito Trap | UV LED Bug Zapper | Chemical-Free | ₹3,299</title>

<meta name="description"
  content="Moscure IPI Indoor Mosquito & Insect Trap uses 365nm UV LED technology to silently
  attract and trap mosquitoes, flies & gnats. Covers 375 sq ft. 100% chemical-free, safe for
  kids & pets. Energy efficient 1.5W. Buy now at ₹3,299." />

<meta name="keywords"
  content="indoor mosquito trap India, UV mosquito killer, chemical free bug zapper,
  dengue malaria mosquito trap, silent mosquito catcher, mosquito trap kids safe,
  Moscure IPI, mosquito trap 375 sq ft, electric insect trap India" />

<!-- Open Graph -->
<meta property="og:title"       content="Moscure IPI Indoor Mosquito Trap — ₹3,299" />
<meta property="og:description" content="Silent, chemical-free UV LED mosquito trap. Safe for kids & pets. Covers 375 sq ft." />
<meta property="og:image"       content="/images/products/ipi/og-image.jpg" /> <!-- placeholder -->
<meta property="og:url"         content="https://moscure.in/products/moscure-ipi-indoor-mosquito-trap" />
<meta property="og:type"        content="product" />

<!-- Schema.org Product JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Moscure IPI Indoor Mosquito & Insect Trap",
  "description": "365nm UV LED silent mosquito trap. Covers 375 sq ft. Chemical-free, safe for kids & pets.",
  "brand": { "@type": "Brand", "name": "Moscure" },
  "sku": "MOSCURE-IPI-001",
  "mpn": "IPI-001",
  "gtin": "788792950948",
  "offers": {
    "@type": "Offer",
    "price": "3299",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "Moscure" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124"
  }
}
</script>
```

---

## 2. PAGE STRUCTURE (Single File)

```
IPIIndoorProductPage.jsx
  ├── <Navbar />
  │
  ├── SECTION 1: Breadcrumb + Product Hero         ← Sticky left / scroll right
  │     ├── Left: Image Gallery (sticky)
  │     └── Right: Product Info (scrollable)
  │
  ├── SECTION 2: Marquee Trust Strip               ← Between hero and detail images
  │
  ├── SECTION 3: Product Detail Images             ← Full-width explainer images
  │
  ├── SECTION 4: Reviews                           ← Static review cards
  │
  ├── SECTION 5: "You're Protected" CTA Strip      ← Final nudge
  │
  └── <Footer />
```

---

## 3. STATIC DATA

```js
// ─── All inline in IPIIndoorProductPage.jsx ──────────────────────

const PRODUCT = {
  id:          'ipi-indoor',
  sku:         'MOSCURE-IPI-001',
  url:         'moscure-ipi-indoor-mosquito-trap',
  name:        'IPI Indoor Mosquito & Insect Trap',
  fullTitle:   'IPI Indoor Mosquito & Insect Trap 365nm UV LED | Silent Electric Bug Zapper | Covers 375 sq ft | Odor-Free, Chemical-Free | Safe for Kids & Pets | 1.5W Compact Fly Killer | 280g Lightweight',
  brand:       'Moscure',
  price:       3299,
  currency:    '₹',
  inStock:     true,
  rating:      4.8,
  reviewCount: 124,
  badge:       'INDOOR',
  badgeColor:  'gradientcyan',
};

// Images — all placeholders until client uploads
// Format: { id, alt, src } — src points to /public/images/products/ipi/
const PRODUCT_IMAGES = [
  { id: 1, alt: 'Moscure IPI Indoor Mosquito Trap — Front View',      src: null },
  { id: 2, alt: 'Moscure IPI Indoor — UV LED Light Active',           src: null },
  { id: 3, alt: 'Moscure IPI — Collection Tray Detail',               src: null },
  { id: 4, alt: 'Moscure IPI — Scale & Size Reference (280g)',        src: null },
  { id: 5, alt: 'Moscure IPI — Placed in Bedroom Setting',            src: null },
  { id: 6, alt: 'Moscure IPI — Placed in Kitchen Setting',            src: null },
];

// Right panel specs table
const PRODUCT_SPECS = [
  { label: 'Brand',               value: 'Moscure'                    },
  { label: 'Colour',              value: 'White'                      },
  { label: 'Material',            value: 'Plastic'                    },
  { label: 'Product Dimensions',  value: '11.9L × 11.9W × 17.8H cm'  },
  { label: 'Item Weight',         value: '280 Grams'                  },
  { label: 'Number of Pieces',    value: '1'                          },
  { label: 'Net Quantity',        value: '1.0 Count'                  },
  { label: 'UPC',                 value: '788792950948'               },
  { label: 'Power Source',        value: 'Corded Electric (1.5W)'     },
];

// About this item bullets
const PRODUCT_BULLETS = [
  {
    icon: 'Shield',
    highlight: 'All-in-One Insect Protection',
    text: 'Effectively traps mosquitoes, flies, moths, fruit flies, gnats, drain flies & other flying insects for complete indoor protection.',
  },
  {
    icon: 'HeartPulse',
    highlight: 'Supports Health & Hygiene',
    text: 'Helps reduce exposure to mosquito-borne diseases like Dengue, Malaria, Chikungunya & Zika by controlling indoor insect activity.',
  },
  {
    icon: 'Maximize2',
    highlight: 'Indoor Coverage',
    text: 'Covers up to 35 m² (375 sq ft), making it perfect for bedrooms, living rooms, nurseries, kitchens & office spaces.',
  },
  {
    icon: 'Zap',
    highlight: 'Advanced 365nm UV Attraction Technology',
    text: 'Uses MLID & phototaxis mechanism to silently attract and trap insects without noise, smell, or disturbance.',
  },
  {
    icon: 'Battery',
    highlight: 'Energy Efficient 24/7 Protection',
    text: 'Consumes only 1.5W power, delivering continuous operation with minimal electricity cost.',
  },
  {
    icon: 'Sparkles',
    highlight: 'Compact, Modern & Travel-Friendly Design',
    text: 'Sleek and stylish build that blends with interiors; lightweight and easy to carry anywhere.',
  },
  {
    icon: 'Ruler',
    highlight: 'Perfect Size & Lightweight Build',
    text: 'Dimensions: Ø119 × 178 mm | Weight: 280g, designed for convenient placement on tables, bedside & corners.',
  },
];

// Quick trust badges (below price)
const TRUST_BADGES = [
  { icon: 'ShieldCheck',  label: '100% Chemical-Free'    },
  { icon: 'Leaf',         label: 'Safe for Kids & Pets'  },
  { icon: 'Volume2',      label: 'Silent Operation'       },
  { icon: 'Clock',        label: '24/7 Protection'        },
];

// Detail images section — placeholders
// Client adds actual lifestyle/explainer images
const DETAIL_IMAGES = [
  {
    id: 1,
    alt:     'How Moscure IPI UV LED Trap Works — 365nm Phototaxis Mechanism',
    caption: 'How It Works',
    src:     null,
  },
  {
    id: 2,
    alt:     'Moscure IPI Coverage Area — 375 sq ft Indoor Protection',
    caption: 'Coverage Explained',
    src:     null,
  },
  {
    id: 3,
    alt:     'Moscure IPI Chemical-Free vs Traditional Mosquito Coils Comparison',
    caption: 'Chemical-Free Advantage',
    src:     null,
  },
  {
    id: 4,
    alt:     'Moscure IPI Easy Maintenance — Clean Collection Tray',
    caption: 'Easy Maintenance',
    src:     null,
  },
];

// Static reviews
const REVIEWS = [
  {
    id:       1,
    name:     'Priya Sharma',
    location: 'Delhi, India',
    rating:   5,
    date:     'March 2025',
    title:    'Finally — a mosquito solution that actually works',
    body:     `We live in a ground floor flat in Delhi and mosquitoes were a constant nightmare. After just 3 days with the Moscure IPI, we noticed a massive difference. Quiet, no smell, and the collection tray had caught more insects than I expected. My 2-year-old sleeps soundly now.`,
    verified: true,
    helpful:  47,
  },
  {
    id:       2,
    name:     'Rahul Mehta',
    location: 'Mumbai, India',
    rating:   5,
    date:     'February 2025',
    title:    'Replaced our All Out vaporiser — no regrets',
    body:     `Was sceptical at first since we've been using chemical vaporisers for years. But my wife has asthma and the fumes were getting worse. The Moscure IPI has been running for 6 weeks now — completely silent, no smell whatsoever. 5 stars.`,
    verified: true,
    helpful:  39,
  },
  {
    id:       3,
    name:     'Anjali Krishnan',
    location: 'Bangalore, India',
    rating:   4,
    date:     'January 2025',
    title:    'Great product for bedrooms',
    body:     `Works really well in our bedroom and nursery. The UV light is subtle and doesn't disturb sleep at all. The only reason I'm giving 4 stars instead of 5 is I wish the cord was a bit longer. But the product itself? Excellent. Caught dozens of insects in the first week.`,
    verified: true,
    helpful:  22,
  },
  {
    id:       4,
    name:     'Deepak Verma',
    location: 'Hyderabad, India',
    rating:   5,
    date:     'March 2025',
    title:    'The design is premium and it actually works',
    body:     `Looks great on my bedside table — my wife thought it was a decorative lamp at first. Then she saw the collection tray. Genuinely impressed by how many insects this catches overnight. We sleep with the windows open now, which we never could before.`,
    verified: true,
    helpful:  31,
  },
];

// Rating distribution (for stars breakdown bar)
const RATING_BREAKDOWN = [
  { stars: 5, count: 89, percent: 72 },
  { stars: 4, count: 21, percent: 17 },
  { stars: 3, count:  8, percent:  6 },
  { stars: 2, count:  4, percent:  3 },
  { stars: 1, count:  2, percent:  2 },
];
```

---

## 4. SECTION SPECIFICATIONS

---

### BREADCRUMB (Below Navbar)

```
Home  ›  Products  ›  IPI Indoor Mosquito Trap
```

- `Space Mono text-xs text-textMuted`
- `›` separator in `gradientcyan`
- `Home` and `Products` are `<Link>` elements
- Last item (current page): `text-white`
- `whileInView`: fade in `delay: 0.1`

---

### SECTION 1 — Product Hero (Sticky Left / Scroll Right)

**This is the most technically complex section.**

**Outer wrapper:**
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6
            items-start">
```

---

#### LEFT PANEL — Image Gallery (Sticky)

**Sticky behavior:**
```css
.image-panel-sticky {
  position: sticky;
  top: 80px;            /* navbar height */
  height: calc(100vh - 100px);
  overflow: hidden;
}
```

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │                                                  │   │
│  │            MAIN PRODUCT IMAGE                    │   │  ← aspect-square
│  │          [PLACEHOLDER — 600×600]                 │   │    rounded-2xl
│  │                                                  │   │    animated-border
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐        │
│  │ 1  │  │ 2  │  │ 3  │  │ 4  │  │ 5  │  │ 6  │        │  ← Thumbnails
│  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘        │    w-14 h-14
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Main Image Area:**
- `.animated-border` wrapper
- Inner: `bg-surface rounded-2xl aspect-square` — if `src` is `null`, show placeholder:
  ```jsx
  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
    <Camera className="text-textMuted w-12 h-12" />
    <span className="Space Mono text-xs text-textMuted uppercase tracking-widest">
      [ Product Image {activeImage} ]
    </span>
  </div>
  ```
- If `src` provided: `<img src={src} alt={alt} className="w-full h-full object-contain p-4" />`
- Transition between images: Framer `AnimatePresence` with `mode="wait"`, `opacity: 0 → 1` + `scale: 0.97 → 1`, `duration: 0.3`

**Thumbnail Strip:**
- `flex gap-2 mt-3 flex-wrap`
- Each thumbnail: `w-14 h-14 rounded-lg border-2 cursor-pointer`
  - Inactive: `border-borderDefault bg-surface`
  - Active: `border-gradientcyan bg-gradientcyan/5`
  - `whileHover: { scale: 1.08 }` spring
  - Click: `setActiveImage(index)`
- Placeholder thumbnails:
  ```jsx
  <div className="w-14 h-14 rounded-lg bg-surface border-2 border-borderDefault
                  flex items-center justify-center text-textMuted text-xs Space Mono">
    {index + 1}
  </div>
  ```

**State:** `const [activeImage, setActiveImage] = useState(0)`

---

#### RIGHT PANEL — Product Info (Scrollable)

`overflow-y: auto` — scrolls independently (the sticky left panel stays fixed)

**On mobile:** Image gallery becomes normal flow (no sticky), info stacks below.

---

**Block 1 — Title & Brand:**

```
[BADGE]   INDOOR

IPI Indoor Mosquito & Insect Trap 365nm UV LED | Silent Electric
Bug Zapper | Covers 375 sq ft | Odor-Free, Chemical-Free | Safe
for Kids & Pets | 1.5W Compact Fly Killer | 280g Lightweight

Brand: Moscure
```

- Badge: `bg-gradientcyan/10 border border-gradientcyan/40 text-gradientcyan Space Mono text-xs px-3 py-1 rounded-full`
- Title: `DM Sans text-xl md:text-2xl text-white font-semibold leading-snug`
  - SEO note: this is the `<h1>` — exact product title, keyword-rich
- Brand: `DM Sans text-sm text-textMuted` + `Moscure` in `gradientcyan`

---

**Block 2 — Rating Row:**

```
★★★★★  4.8   (124 reviews)   ↓ Jump to reviews
```

- Stars: filled `gradientyellow` SVGs (custom, not emoji) — 4 full + 0.8 partial
- `4.8`: `DM Sans font-bold text-gradientyellow`
- `(124 reviews)`: `DM Sans text-sm text-textMuted underline cursor-pointer` — smooth scrolls to reviews section
- `whileHover: { color: gradientcyan }`

---

**Block 3 — Price & Stock:**

```
₹3,299 INR
● In Stock
```

- `₹`: `DM Sans text-sm text-textMuted`
- `3,299`: `Bebas Neue text-5xl text-white`
- `INR`: `Space Mono text-xs text-textMuted`
- In Stock: `● gradientcyan dot` + `DM Sans text-sm text-gradientcyan font-medium`
- Animate: price slides up from `y: 10` + fades in `delay: 0.3`

---

**Block 4 — Trust Badges Row:**

```
[🛡 100% Chemical-Free]  [🌿 Safe for Kids & Pets]  [🔇 Silent]  [⏰ 24/7]
```

- `flex flex-wrap gap-2`
- Each: `bg-surface border border-borderDefault rounded-full px-3 py-1.5 flex items-center gap-1.5`
- Icon: lucide, `w-3.5 h-3.5 text-gradientcyan`
- Label: `DM Sans text-xs text-textMuted`
- `staggerChildren: 0.08` fade-in on page load

---

**Block 5 — Specs Table (Collapsible):**

```
Brand              Moscure
Colour             White
Material           Plastic
Product Dimensions 11.9L × 11.9W × 17.8H cm
Item Weight        280 Grams
Number of Pieces   1
Net Quantity       1.0 Count
UPC                788792950948
Power Source       Corded Electric (1.5W)
                   [See less ↑] / [See more ↓]
```

**Table Design:**
- `bg-surface rounded-xl border border-borderDefault overflow-hidden`
- Row: `flex justify-between py-2.5 px-4 border-b border-borderDefault/50`
- Label: `DM Sans text-sm text-textMuted`
- Value: `DM Sans text-sm text-white`
- Even rows: `bg-white/[0.02]`

**Collapse behavior:**
- Show first 5 rows by default
- `[See more]` expands to all 9 rows — Framer `AnimatePresence height 0 → auto`
- `useState(false)` for `showAllSpecs`

---

**Block 6 — "About This Item" Bullets:**

```
ABOUT THIS ITEM

• All-in-One Insect Protection
  Effectively traps mosquitoes, flies, moths...

• Supports Health & Hygiene
  Helps reduce exposure to mosquito-borne...

• [... 5 more bullets ...]
```

**Label:** `Space Mono text-xs uppercase tracking-widest text-textMuted`

**Each bullet row:**
```
┌───────────────────────────────────────────────────────┐
│  [Icon]   All-in-One Insect Protection               │
│           Effectively traps mosquitoes, flies...     │
└───────────────────────────────────────────────────────┘
```
- Icon: `w-8 h-8 rounded-lg bg-gradientcyan/10 flex items-center justify-center`, icon `w-4 h-4 text-gradientcyan` — lucide icon from `PRODUCT_BULLETS[].icon`
- Highlight text: `DM Sans text-sm text-white font-semibold`
- Body text: `DM Sans text-sm text-textMuted leading-relaxed`
- Animate: `staggerChildren: 0.08` slide from `y: 12 → 0` on `whileInView`
- `whileHover`: row background `bg-white/[0.02]`, left accent bar appears (`border-l-2 border-gradientcyan`)

---

**Block 7 — CTA Buttons:**

```
┌────────────────────────────────────────────┐
│            BUY NOW  →                      │  ← gradientcyan fill, rounded-xl, full-width
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│            CONTACT FOR INQUIRY             │  ← ghost, border-white/20
└────────────────────────────────────────────┘
```

- Primary: `bg-gradientcyan text-background Bebas Neue text-xl tracking-wider rounded-xl py-4 w-full`
  - `whileHover: { scale: 1.02, boxShadow: '0 0 30px rgba(0, 245, 212, 0.4)' }`
  - `whileTap: { scale: 0.98 }`
- Secondary: `border border-white/20 text-white DM Sans font-medium rounded-xl py-4 w-full`
  - links to `/about#contact`

**Sticky CTA on mobile:**
```css
/* Mobile only — fixed bottom bar */
@media (max-width: 1024px) {
  .mobile-cta-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid #2A2A2A;
    padding: 12px 16px;
  }
}
```

---

**Block 8 — Share Row (below CTAs):**

```
Share:  [WhatsApp]  [Copy Link]  [Twitter/X]
```

- Small icon buttons, `bg-surface border border-borderDefault rounded-lg px-3 py-2`
- `DM Sans text-xs text-textMuted`
- `whileHover: { scale: 1.05, borderColor: gradientcyan }`

---

### SECTION 2 — Trust Strip Marquee

Same component as Landing Page `BrandValuesTicker` — reuse it here between hero and detail images.

**Content:**
```
✓ 365nm UV LED Technology  ·  ✓ Covers 375 Sq Ft  ·  ✓ 280g Lightweight  ·
✓ 1.5W Energy Efficient  ·  ✓ Catches Dengue & Malaria Vectors  ·  ✓ No Refills Ever  ·
```

- `bg-surface border-y border-borderDefault py-4`
- CSS marquee, `Space Mono text-xs uppercase text-gradientcyan` alternating with `text-textMuted`

---

### SECTION 3 — Product Detail Images

**File section label:** `📸 SEE IT IN ACTION`

**Section Heading (SEO):**
```html
<h2>Moscure IPI Indoor Trap — In Depth</h2>
```
- `Bebas Neue text-5xl text-white` (rendered visually large, not small)

**Layout:** Full-width stacked images with captions

Each detail image block:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              DETAIL IMAGE PLACEHOLDER                            │  ← aspect-[16/9] full-width
│              [ How It Works — add image ]                        │    rounded-2xl
│              caption: "How It Works"                             │    bg-surface border-dashed
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Placeholder design:**
```jsx
<div className="w-full aspect-[16/9] rounded-2xl bg-surface border-2 border-dashed
                border-gradientcyan/20 flex flex-col items-center justify-center gap-3">
  <ImageIcon className="w-10 h-10 text-textMuted" />
  <p className="Space Mono text-xs text-textMuted uppercase tracking-widest">
    [ {image.caption} — Add Product Image ]
  </p>
  <p className="DM Sans text-xs text-textMuted italic">
    SEO Alt: "{image.alt}"
  </p>
</div>
```

**When real images added:**
```jsx
<img
  src={image.src}
  alt={image.alt}     // ← SEO-optimized alt text already in data
  loading="lazy"
  className="w-full aspect-[16/9] rounded-2xl object-cover"
/>
```

**Below each image:** caption in `Space Mono text-xs text-textMuted uppercase text-center mt-2`

**Animations:**
- Each image block: `opacity: 0 → 1` + `y: 30 → 0` on `whileInView`, `once: true`
- Stagger if multiple images visible at once: `delay: index * 0.1`

---

### SECTION 4 — Reviews

**SEO heading:**
```html
<h2>Customer Reviews — Moscure IPI Indoor Trap</h2>
```
- `Bebas Neue text-5xl`

**Layout: 2-column on desktop**

**Left: Rating Summary Panel**

```
┌──────────────────────────────────────┐
│                                      │
│            4.8 / 5                   │  ← Bebas Neue text-7xl gradientyellow
│         ★ ★ ★ ★ ★                    │  ← 5 star icons gradientyellow
│         124 total reviews            │  ← DM Sans text-sm text-textMuted
│                                      │
│  ─────────────────────────────────   │
│                                      │
│  5 ★  ████████████████████░  72%     │  ← Rating breakdown bars
│  4 ★  ████░░░░░░░░░░░░░░░░  17%     │
│  3 ★  █░░░░░░░░░░░░░░░░░░░   6%     │
│  2 ★  ░░░░░░░░░░░░░░░░░░░░   3%     │
│  1 ★  ░░░░░░░░░░░░░░░░░░░░   2%     │
│                                      │
└──────────────────────────────────────┘
```

**Breakdown bar:**
- Track: `bg-borderDefault h-1.5 rounded-full`
- Fill: `bg-gradientyellow h-1.5 rounded-full` — `scaleX: 0 → percent/100` on `whileInView`
- Row: `flex items-center gap-3 text-sm DM Sans`

**Right: Individual Review Cards**

```
┌──────────────────────────────────────────────────────────┐
│  [Avatar initials]   Priya Sharma              ✓ Verified │
│  PS (gradientcyan    Delhi, India                         │
│  initial circle)     March 2025                           │
│                                                           │
│  ★★★★★                                                    │
│                                                           │
│  Finally — a mosquito solution that actually works        │  ← DM Sans font-semibold text-white
│                                                           │
│  We live in a ground floor flat in Delhi...               │  ← DM Sans text-sm text-textMuted
│                                                           │
│  Helpful? [👍 47 people found this helpful]               │
└──────────────────────────────────────────────────────────┘
```

**Avatar circle:** `w-10 h-10 rounded-full bg-gradientcyan/20 border border-gradientcyan/30 flex items-center justify-center`
- Initials: `DM Sans font-bold text-sm text-gradientcyan`

**Verified badge:** `Space Mono text-xs text-gradientcyan` + `CheckCircle2 w-3 h-3`

**Star row:** filled `gradientyellow` stars, DM Sans size

**Review title:** `DM Sans text-base font-semibold text-white`

**Review body:** `DM Sans text-sm text-textMuted leading-relaxed`

**Helpful row:** `DM Sans text-xs text-textMuted` | `ThumbsUp w-3.5 h-3.5` icon

**Card design:** `bg-surface border border-borderDefault rounded-2xl p-6`

**No `.animated-border` on review cards** — keep it clean, trustworthy, not flashy

**Animations:**
- Summary panel: scale from `0.95` on `whileInView`
- Breakdown bars: stagger fill `staggerChildren: 0.08`
- Review cards: `staggerChildren: 0.1` from bottom

---

### SECTION 5 — "You're Protected" Final CTA Strip

**Full-width `bg-surface border-t border-borderDefault py-16`**

**Centered layout:**

```
[LABEL]   ✓ READY TO PROTECT YOUR HOME?

[H3]      Moscure IPI — ₹3,299
          Free delivery on all orders

[BUTTONS]
  [BUY NOW →]       [VIEW ALL PRODUCTS]
```

- H3: `Bebas Neue text-4xl text-white`
- Price: `text-gradientcyan`
- "Free delivery...": `DM Sans text-sm text-textMuted italic`
- Animate: standard fade + slide up on `whileInView`

---

## 5. STICKY SCROLL MECHANICS — TECHNICAL SPEC

This is the core interaction of the page. Two approaches, pick one:

### Approach A — CSS Sticky (Simpler, Recommended)

```jsx
// Outer container
<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-16 items-start
                max-w-7xl mx-auto px-6 py-12">

  {/* LEFT — Sticky image panel */}
  <div className="lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-100px)]">
    <ImageGallery />
  </div>

  {/* RIGHT — Scrollable info */}
  <div className="flex flex-col gap-8">
    <TitleBlock />
    <RatingRow />
    <PriceBlock />
    <TrustBadges />
    <SpecsTable />
    <BulletPoints />
    <CTAButtons />
    <ShareRow />
  </div>

</div>
```

The CSS `position: sticky; top: 88px` on the left panel handles everything. The right panel scrolls naturally. When right panel is fully scrolled, sticky naturally releases.

### Approach B — Framer useScroll (More Control)

```jsx
const rightPanelRef = useRef(null)
const { scrollYProgress } = useScroll({
  target: rightPanelRef,
  offset: ['start start', 'end end']
})
// Use scrollYProgress to control opacity/scale of left panel
// when right panel reaches end (scrollYProgress === 1)
```

**Recommendation: Use Approach A (CSS sticky) for reliability across all browsers. Approach B for enhanced effect if needed.**

---

## 6. COMPONENT STRUCTURE (Single File)

```jsx
// IPIIndoorProductPage.jsx

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  Shield, HeartPulse, Maximize2, Zap, Battery,
  Sparkles, Ruler, ShieldCheck, Leaf, Volume2, Clock,
  Star, ThumbsUp, CheckCircle2, Camera, Image as ImageIcon,
  Share2, ChevronDown, ChevronUp
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BrandValuesTicker from '../../components/BrandValuesTicker'

// ─── Static Data ─────────────────────────────────────────────────
const PRODUCT        = { ... }
const PRODUCT_IMAGES = [ ... ]
const PRODUCT_SPECS  = [ ... ]
const PRODUCT_BULLETS= [ ... ]
const TRUST_BADGES   = [ ... ]
const DETAIL_IMAGES  = [ ... ]
const REVIEWS        = [ ... ]
const RATING_BREAKDOWN = [ ... ]

// ─── Sub-components ──────────────────────────────────────────────

const StarRating = ({ rating, size = 'sm' }) => { ... }
// Renders filled/partial/empty stars in gradientyellow

const ImageGallery = ({ images, activeIndex, onSelect }) => { ... }
// Main image + thumbnail strip

const SpecsTable = ({ specs }) => { ... }
// Collapsible specs table

const BulletList = ({ bullets }) => { ... }
// Animated bullet list with icons

const TrustBadgeRow = ({ badges }) => { ... }
// Horizontal badge row

const RatingBar = ({ stars, count, percent, index }) => { ... }
// Single breakdown bar row

const ReviewCard = ({ review, index }) => { ... }
// Individual review card

const DetailImageBlock = ({ image, index }) => { ... }
// Placeholder or real image with caption + alt

// ─── Page ────────────────────────────────────────────────────────
export default function IPIIndoorProductPage() {
  const [activeImage, setActiveImage]     = useState(0)
  const [showAllSpecs, setShowAllSpecs]   = useState(false)
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false)

  // Mobile CTA: show fixed bottom bar after scrolling past hero
  const heroRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMobileCtaVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  // SEO meta tags
  useEffect(() => {
    document.title = 'Moscure IPI Indoor Mosquito Trap | UV LED Bug Zapper | Chemical-Free | ₹3,299'
    // inject meta tags and JSON-LD here
  }, [])

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-3">...</nav>

      {/* SECTION 1 — Product Hero */}
      <section ref={heroRef} id="product-hero" className="...">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto px-6 py-8">
          {/* LEFT — sticky */}
          <div className="lg:sticky lg:top-[88px]">
            <ImageGallery ... />
          </div>
          {/* RIGHT — scrollable info */}
          <div className="flex flex-col gap-8"> ... </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <BrandValuesTicker items={TICKER_ITEMS} />

      {/* SECTION 3 — Detail Images */}
      <section id="product-details" className="..."> ... </section>

      {/* SECTION 4 — Reviews */}
      <section id="reviews" className="..."> ... </section>

      {/* SECTION 5 — CTA Strip */}
      <section id="product-cta" className="..."> ... </section>

      {/* Mobile CTA Bar */}
      <AnimatePresence>
        {mobileCtaVisible && (
          <motion.div
            className="mobile-cta-bar lg:hidden"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="DM Sans text-xs text-textMuted">Moscure IPI</p>
                <p className="Bebas Neue text-2xl text-gradientcyan">₹3,299</p>
              </div>
              <button className="bg-gradientcyan text-background px-6 py-3
                                 rounded-xl Bebas Neue text-lg">
                BUY NOW →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
```

---

## 7. NEW LUCIDE-REACT ICONS NEEDED

```js
import {
  Shield,       HeartPulse,   Maximize2,
  Zap,          Battery,      Sparkles,
  Ruler,        ShieldCheck,  Leaf,
  Volume2,      Clock,        Star,
  ThumbsUp,     CheckCircle2, Camera,
  Image,        Share2,       ChevronDown,
  ChevronUp,    Copy,         Phone,
  MessageCircle // WhatsApp substitute
} from 'lucide-react'
```

---

## 8. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 1024px`) | No sticky — image gallery full-width, info stacks below; mobile CTA fixed bottom bar appears after hero; detail images single-column; reviews single-column |
| Desktop (`≥ 1024px`) | Full sticky left panel; 2-col reviews; detail images full-width |

---

## 9. FILE LOCATION & ROUTING

```
src/
└── pages/
    └── products/
        ├── IPIIndoorProductPage.jsx      ← THIS FILE
        └── IPOOutdoorProductPage.jsx     ← Next product (same pattern)
```

**In `App.jsx` (or router config):**
```jsx
// If using React Router v6:
<Route
  path="/products/moscure-ipi-indoor-mosquito-trap"
  element={<IPIIndoorProductPage />}
/>
```

**From Products page (`/products`), "View Details" button links:**
```jsx
<Link to="/products/moscure-ipi-indoor-mosquito-trap">
  VIEW DETAILS →
</Link>
```

---

## 10. SEO CHECKLIST

- [x] `<h1>` = full product title (keyword-rich, one per page)
- [x] `<h2>` = "Customer Reviews — Moscure IPI Indoor Trap" (secondary keyword)
- [x] `<h2>` = "Moscure IPI Indoor Trap — In Depth" (detail images section)
- [x] All images have descriptive, keyword-rich `alt` attributes
- [x] `<img loading="lazy" />` on detail images
- [x] JSON-LD Product schema (price, rating, availability, brand, UPC)
- [x] URL slug: `/products/moscure-ipi-indoor-mosquito-trap`
- [x] Open Graph meta tags for social sharing
- [x] `<title>` includes product name, key feature, price
- [x] `<meta name="description">` under 160 characters, action-oriented
- [x] Breadcrumb with `<nav>` + Schema.org BreadcrumbList (add to JSON-LD)
- [x] "In Stock" availability reflected in schema
- [x] Review count + average rating in schema (`aggregateRating`)

---

## 11. KEY IMPLEMENTATION NOTES

- **Sticky scroll** — Use CSS `position: sticky` (Approach A). Most reliable. Test that `lg:sticky lg:top-[88px]` aligns with actual navbar height.
- **Image state** — `useState(0)` for `activeImage`. `AnimatePresence mode="wait"` on main image for smooth cross-fade between gallery images.
- **SEO alt text** — Already defined in `PRODUCT_IMAGES[].alt` and `DETAIL_IMAGES[].alt`. These are keyword-optimized. Do not skip them.
- **No `.animated-border` on specs table or review cards** — Keep product info area clean and credible (Amazon-like trust). Animated borders only on: main product image frame, CTA buttons (hover glow only).
- **Mobile CTA bar** — Appears when the hero CTA buttons scroll out of view (using `IntersectionObserver` on the hero ref). Slides up with Framer `AnimatePresence`. Contains price + BUY NOW.
- **Detail images** — These are the client's responsibility. The placeholder `div` already contains the correct SEO `alt` text so the client knows exactly what image to put where.
- **Reviews** — `id="reviews"` on the section. The rating row in the right panel has a `<a href="#reviews">` anchor for smooth scroll.
- **Schema JSON-LD** — Inject via `useEffect` creating a `<script>` tag, or add directly to `public/index.html` if product pages are static. For dynamic injection, use a `<Helmet>` equivalent.
- **Second product** — `IPOOutdoorProductPage.jsx` follows the exact same template. Change `PRODUCT`, `PRODUCT_IMAGES`, `PRODUCT_BULLETS`, `PRODUCT_SPECS`, URL, and meta tags. Reuse all sub-components.
