# 🦟 MOSCURE — Products Page Blueprint
**Version:** 1.0  
**Page:** `/product` — Products Showcase  
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS  
**Theme:** Consistent with Landing Page — Dark (#0A0A0A), neon accents (Pink / Yellow / Cyan)

> All global design tokens (colors, typography, spacing, animation patterns) inherit from  
> `MOSCURE_LANDING_PAGE_REQUIREMENTS.md`. Only page-specific additions are documented here.

---

## 1. PAGE GOAL

Convert visitors browsing products into buyers. Educate them on what makes Moscure superior through scientific credibility, clear feature storytelling, and a transparent step-by-step mechanism — all within an immersive, animated single page.

---

## 2. PAGE STRUCTURE

```
<ProductPage>
  ├── <Navbar />                          ← Shared component (same as Landing)
  ├── <ProductsHeroSection />             ← Section 1 — Heading + 2 Product Cards
  ├── <ProductDetailDrawer />             ← Inline expandable detail panel (accordion-style)
  ├── <TestedSpeciesSection />            ← Section 2 — "Tested on All Species" + 4 stat boxes
  ├── <FeaturesGridSection />             ← Section 3 — 6 Feature Cards
  ├── <HowItWorksSection />               ← Section 4 — 3-Step Process
  ├── <LabTestedSection />                ← Section 5 — Big credibility card
  └── <Footer />                          ← Shared component (same as Landing)
```

---

## 3. ANIMATION STRATEGY (Page-Specific)

Inherits all base patterns from Landing Page blueprint. Additional patterns for this page:

| Pattern | Where | Config |
|---|---|---|
| **Animated gradient border** | All feature cards, product cards, lab card | CSS `@keyframes gradientRotate` — hue-rotating border via `conic-gradient` pseudo-element, 3s loop |
| **Product card flip / expand** | View Details trigger | Framer `AnimatePresence` + `layoutId` for smooth height expansion |
| **Step number count reveal** | How It Works 01/02/03 | Individual digit fade+scale on viewport enter, stagger 0.2s |
| **Shimmer sweep on stat boxes** | Tested section stats | CSS `@keyframes shimmer` sweep left→right on mount |
| **Floating product image** | Product cards | Framer `animate: { y: [0, -12, 0] }` infinite loop, duration 4s |
| **Tag badge pop** | Feature card tags (Indoor/Outdoor) | `whileInView: { scale: [0, 1.1, 1] }` spring on entry |

### Moving Gradient Border — Global Mixin
```css
/* index.css — reusable moving border */
.animated-border {
  position: relative;
  border-radius: 1rem;
}
.animated-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--angle),
    #FF4D6D, #FFD60A, #00F5D4, #FF4D6D
  );
  animation: borderSpin 3s linear infinite;
  z-index: -1;
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes borderSpin {
  to { --angle: 360deg; }
}
```
> Wrap card content in `bg-surface` inner div to create the border illusion.  
> Apply class `.animated-border` to: product cards, feature cards, lab tested card, stat boxes.

---

## 4. SECTION SPECIFICATIONS

---

### SECTION 1 — Products Hero + Product Cards

**File:** `src/sections/ProductsHeroSection.jsx`

#### 1A — Hero Header (Centered)

```
[SECTION LABEL]   ✦ OUR LINEUP

[H1]              MOSCURE PRODUCTS

[Body — max-w-2xl centered]
                  Advanced mosquito-catching technology tested on all
                  disease-carrying species in India. Safe, effective,
                  and reliable protection for indoor and outdoor
                  environments.
```

**Animations:**
- Heading: word-by-word stagger slide-up on mount (`staggerChildren: 0.08`)
- Subtext: fade in `delay: 0.5`
- Decorative: faint grid pattern background at 4% opacity (CSS `background-image: repeating-linear-gradient`)

---

#### 1B — Product Cards (2 columns on desktop, stacked on mobile)

**Data:**

```js
const PRODUCTS_DATA = [
  {
    id: 'indoor',
    badge: 'INDOOR',
    name: 'Moscure Indoor',
    unit: 'IPI Unit',
    tagline: 'Peaceful, Uninterrupted Indoor Living',
    description: `Introducing the Moscure IPI Unit — an advanced indoor solution for
      controlling mosquitoes and flies. Non-hazardous and safe for indoor environments,
      it covers up to 35 sq. m using efficient trapping technology to reduce pests
      effectively. Compact, lightweight, quieter than a wall clock, maintenance-free,
      and easy to power.`,
    price: '₹3,299',
    currency: 'INR',
    coverage: '35 sq. m',
    environment: 'Indoor',
    accentColor: 'gradientcyan',
    gradient: 'from-gradientcyan to-gradientyellow',
    specs: [
      { label: 'Coverage', value: 'Up to 35 sq. m' },
      { label: 'Noise Level', value: '< 30 dB' },
      { label: 'Power', value: 'USB / Plug-in' },
      { label: 'Maintenance', value: 'Maintenance-Free' },
      { label: 'Safety', value: 'Child & Pet Safe' },
    ]
  },
  {
    id: 'outdoor',
    badge: 'OUTDOOR',
    name: 'Moscure Outdoor',
    unit: 'IPO Unit',
    tagline: 'Bug-Free Outdoor Spaces, Year-Round',
    description: `Introducing the Moscure IPO Unit — a safe and effective outdoor
      mosquito and fly control solution. Non-hazardous and eco-friendly, it's designed
      for all-weather use with a water-resistant build. Covering up to 300 sq. m, it
      uses advanced trapping technology to reduce pests efficiently. Easy to install
      and low on maintenance.`,
    price: '₹21,599',
    currency: 'INR',
    coverage: '300 sq. m',
    environment: 'Outdoor',
    accentColor: 'gradientyellow',
    gradient: 'from-gradientyellow to-gradientpink',
    specs: [
      { label: 'Coverage', value: 'Up to 300 sq. m' },
      { label: 'Build', value: 'All-Weather Resistant' },
      { label: 'Power', value: 'Standard Plug-in' },
      { label: 'Installation', value: 'Easy Mount' },
      { label: 'Safety', value: 'Eco-Friendly' },
    ]
  }
];
```

**Card Design:**

Each card is `.animated-border` wrapped:

```
┌─────────────────────────────────┐  ← animated-border wrapper
│  [BADGE]  INDOOR / OUTDOOR      │  ← Space Mono pill badge, accent color
│                                 │
│  [PRODUCT IMAGE PLACEHOLDER]    │  ← aspect-square, floating animation
│  (centered, ~60% card width)    │
│                                 │
│  Moscure Indoor                 │  ← Bebas Neue text-3xl
│  IPI Unit                       │  ← Space Mono text-sm text-textMuted
│                                 │
│  [Description — 3 lines max]    │  ← DM Sans text-sm text-textMuted
│                                 │
│  ────────────────────           │
│                                 │
│  ₹3,299 INR                     │  ← Bebas Neue text-4xl accent color
│                                 │
│  [VIEW DETAILS ↓]  [BUY NOW →]  │  ← Two CTAs
└─────────────────────────────────┘
```

**Product Image Placeholder:**
```jsx
<div className="aspect-square w-3/5 mx-auto rounded-xl 
                border-2 border-dashed border-gradientcyan/30 
                bg-surface flex items-center justify-center">
  <span className="text-textMuted text-xs Space Mono uppercase tracking-widest">
    [ Product Image ]
  </span>
</div>
```

**CTA Buttons:**
- `VIEW DETAILS ↓` — ghost button, border accent color, opens inline detail panel
- `BUY NOW →` — solid accent color fill button

**Animations:**
- Cards: stagger in from bottom (`staggerChildren: 0.2`)
- Product image: infinite gentle float (`y: [0, -12, 0]`, duration 4s)
- Price: count-up on viewport enter
- Card `whileHover`: very subtle scale `1.02`, shadow intensifies

---

#### 1C — Product Detail Drawer (Inline Expansion)

**File:** `src/components/ProductDetailDrawer.jsx`

**Trigger:** "VIEW DETAILS ↓" button on each product card

**Behavior:**
- Clicking expands an inline panel **below the 2-card grid** (full width), not a modal
- Uses Framer `AnimatePresence` + `motion.div` with `initial: {height: 0, opacity: 0}` → `animate: {height: 'auto', opacity: 1}`
- Only one panel open at a time (clicking a different product collapses current, expands new)
- `layoutId` on product name for shared element transition

**Drawer Layout (3 columns):**

```
[Product Image Large]   [Specs Table]          [Extended Description + Buy CTA]
  Placeholder           Coverage: 35 sq. m     Full product description
  aspect-[3/4]          Noise: < 30 dB         
  animated-border       Power: USB             [BUY NOW →]  ₹3,299
                        Maintenance-Free       [WhatsApp Order]   ← placeholder link
                        Child & Pet Safe
```

**Spec Table Rows:**
- `bg-surface/50 border-b border-borderDefault`
- Label: `Space Mono text-xs text-textMuted uppercase`
- Value: `DM Sans text-sm text-white font-medium`

**Close Button:** `✕` top-right corner of the expanded panel, `whileHover` rotate 90°

---

### SECTION 2 — Tested Species + Stat Boxes

**File:** `src/sections/TestedSpeciesSection.jsx`

**Section Label:** `🔬 SCIENCE-BACKED`

**Section Heading:**
```
TESTED ON ALL
MOSQUITO SPECIES
```

**Subtext (centered, max-w-2xl):**
> Moscure has been rigorously tested against Aedes aegypti (dengue), Anopheles (malaria), and Culex (various diseases). Our technology ensures maximum catch rate in both indoor and outdoor environments.

---

**Stat Boxes (4 boxes in a row):**

```js
const STATS_DATA = [
  { stat: '100%', label: 'Lab Tested', accent: 'gradientpink' },
  { stat: '95%',  label: 'Catch Rate', accent: 'gradientyellow' },
  { stat: '300',  sub: 'sq. mt', label: 'Max Coverage', accent: 'gradientcyan' },
  { stat: '24/7', label: 'Non-Stop Protection', accent: 'gradientpink' },
];
```

**Box Design:** `.animated-border` + inner `bg-surface`:
```
┌───────────────┐
│               │  ← animated-border (moving gradient)
│     100%      │  ← Bebas Neue text-5xl accent color
│   LAB TESTED  │  ← Space Mono text-xs uppercase text-textMuted
│               │
└───────────────┘
```

**Animations:**
- Boxes: stagger scale-in from center (`staggerChildren: 0.1`)
- Stat numbers: shimmer sweep left→right on enter
- `whileHover`: glow intensifies, scale `1.05`

---

### SECTION 3 — Features Grid

**File:** `src/sections/FeaturesGridSection.jsx`

**Section Label:** `⚡ WHAT MAKES IT WORK`

**Section Heading:** `ENGINEERED FOR INDIA`

**Data:**
```js
const PRODUCT_FEATURES = [
  {
    id: 1,
    title: 'Targeted Mosquito Lure System',
    description: 'Scientifically developed to attract all disease-causing mosquito species prevalent in India — Dengue, Malaria, and Chikungunya vectors. Traps, not just repels.',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'Eliminates Disease-Carriers',
    icon: 'Target',           // lucide-react
    gradient: 'from-gradientpink to-gradientyellow',
  },
  {
    id: 2,
    title: 'Silent & Odorless Operation',
    description: 'Whisper-quiet and completely odorless. No buzzing, no chemical smells. Sleep, work, or relax while Moscure works invisibly in the background.',
    tags: ['Indoor'],
    tagline: 'Peaceful, Chemical-Free Protection',
    icon: 'Volume2',
    gradient: 'from-gradientyellow to-gradientcyan',
  },
  {
    id: 3,
    title: 'All-Weather Durable Design',
    description: 'Built for India\'s extremes — scorching summers, heavy monsoons. Weather-resistant construction delivers consistent performance year-round without faltering.',
    tags: ['Outdoor'],
    tagline: 'Reliable in Any Climate',
    icon: 'CloudRain',
    gradient: 'from-gradientcyan to-gradientpink',
  },
  {
    id: 4,
    title: 'Eco-Friendly & Child-Safe',
    description: '100% chemical-free and non-toxic. Safe for children, pets, and the environment. Protection that doesn\'t compromise your family\'s health or the planet.',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'Safe for Family & Planet',
    icon: 'Leaf',
    gradient: 'from-gradientpink via-gradientcyan to-gradientyellow',
  },
  {
    id: 5,
    title: 'Wide Area Coverage',
    description: 'From intimate bedrooms (35 sq. m) to expansive gardens (300 sq. m), Moscure scales to your space. A comprehensive shield — not a band-aid solution.',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'Comprehensive Space Protection',
    icon: 'Maximize2',
    gradient: 'from-gradientyellow to-gradientpink',
  },
  {
    id: 6,
    title: 'Effortless Setup & Low Maintenance',
    description: 'Plug-and-play simplicity. No complicated installations, no constant refills, no expertise needed. Immediate protection from the moment you unbox.',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'Instant, Hassle-Free Defense',
    icon: 'Settings2',
    gradient: 'from-gradientcyan to-gradientyellow',
  },
];
```

**Card Design (`.animated-border`):**

```
┌──────────────────────────────────────┐
│  [Icon in gradient square]           │  ← icon wrapped in gradient pill, top-left
│                                      │
│  Targeted Mosquito Lure System       │  ← Bebas Neue text-xl text-white
│                                      │
│  Description text (3 lines max)      │  ← DM Sans text-sm text-textMuted
│                                      │
│  ──────────────────                  │
│                                      │
│  [Indoor] [Outdoor]    tagline →     │  ← Space Mono pill badges + italic tagline
└──────────────────────────────────────┘
```

**Tag Badge Design:**
- `Indoor` → `bg-gradientcyan/10 border border-gradientcyan/40 text-gradientcyan`
- `Outdoor` → `bg-gradientyellow/10 border border-gradientyellow/40 text-gradientyellow`
- Both → show both badges

**Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

**Animations:**
- Cards: `staggerChildren: 0.1` from bottom
- Icon square: `whileHover: { rotate: 8, scale: 1.1 }`
- Tag badges: pop in with `scale: [0, 1.2, 1]` spring stagger after card enters

---

### SECTION 4 — How It Works

**File:** `src/sections/HowItWorksSection.jsx`

**Section Label:** `⚙ THE MECHANISM`

**Section Heading:** `HOW MOSCURE WORKS`

**Data:**
```js
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'ATTRACT',
    description: 'UV light and CO₂ simulation attract mosquitoes from up to 50 feet away, precisely mimicking human biological presence — irresistible to disease vectors.',
    icon: 'Zap',
    color: 'gradientpink',
  },
  {
    step: '02',
    title: 'CAPTURE',
    description: 'A powerful yet whisper-silent suction fan creates a precision vacuum, pulling attracted mosquitoes directly into the sealed collection chamber.',
    icon: 'Wind',
    color: 'gradientyellow',
  },
  {
    step: '03',
    title: 'ELIMINATE',
    description: 'The dehydration chamber ensures zero escape. Captured mosquitoes are eliminated continuously, delivering uninterrupted protection around the clock.',
    icon: 'ShieldCheck',
    color: 'gradientcyan',
  },
];
```

**Layout:** 3 columns on desktop, vertical timeline on mobile

**Desktop Card Design:**
```
         ↑ connecting dashed line between cards (decorative)
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  01             │    │  02             │    │  03             │
│  [LARGE NUM]    │ →  │  [LARGE NUM]    │ →  │  [LARGE NUM]    │
│                 │    │                 │    │                 │
│  [Icon circle]  │    │  [Icon circle]  │    │  [Icon circle]  │
│                 │    │                 │    │                 │
│  ATTRACT        │    │  CAPTURE        │    │  ELIMINATE      │
│  Description    │    │  Description    │    │  Description    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Step Number:** `Bebas Neue text-8xl opacity-10 absolute top-4 right-4` (ghost large number behind content)

**Icon Circle:** Solid circle with step's accent color at 15% opacity, icon at accent color

**Connector Arrow:** `→` or decorative dashed `border-t-2 border-dashed border-borderDefault` between cards (hidden on mobile)

**Card:** `.animated-border`, inner `bg-surface`, `p-8 rounded-2xl`

**Mobile:** Vertical with numbered step circles on left, content on right (timeline style)

**Animations:**
- Step number ghost: fade in `opacity: [0, 0.08]` on enter
- Cards: stagger left-to-right `staggerChildren: 0.2`
- Connector line: draws in (width 0→100%) after cards enter, `delay: 0.6`
- Icon circle: pulse `scale: [1, 1.1, 1]` loop, subtle, 3s

---

### SECTION 5 — Lab Tested (Big Credibility Card)

**File:** `src/sections/LabTestedSection.jsx`

**Section Label:** `🧪 CERTIFIED SCIENCE`

**Section Heading:** `LABORATORY TESTED`

**Layout:** Single large `.animated-border` card, full-width (max-w-4xl centered)

**Card Interior (2 columns):**

**Left Column:**
```
LABORATORY
TESTED               ← Bebas Neue display text, large

Moscure has undergone rigorous testing in certified
laboratories across India. Our device has proven
effective against all major disease-carrying
mosquito species.
                     ← DM Sans body text

[Decorative microscope / lab icon — large, faded]
```

**Right Column (species list):**
```
✓  Aedes aegypti
   Dengue · Chikungunya         ← smaller, text-textMuted

✓  Anopheles stephensi
   Malaria

✓  Culex quinquefasciatus
   Filariasis

✓  All tested in controlled
   environments

━━━━━━━━━━━━━━━━━

[CERTIFICATION BADGE PLACEHOLDER]
Certified Lab Testing
[View Test Report →]            ← ghost button, placeholder link
```

**Species Row Design:**
- `✓` icon: `text-gradientcyan font-bold`
- Species name: `DM Sans font-semibold text-white text-base`
- Disease: `Space Mono text-xs text-textMuted uppercase`
- Row separator: `border-b border-borderDefault/50`

**Card Background:** Subtle `bg-gradient-to-br from-surface to-background`, inner glow radial at `gradientcyan` 5% from top-left corner

**Certification Badge Placeholder:**
```jsx
<div className="border border-dashed border-gradientcyan/30 rounded-xl p-4 
                flex items-center gap-3 mt-6">
  <div className="w-12 h-12 rounded-full border-2 border-dashed 
                  border-gradientcyan/40 flex items-center justify-center">
    <span className="text-xs text-textMuted">CERT</span>
  </div>
  <div>
    <p className="text-white text-sm font-medium">Certified Lab Testing</p>
    <p className="text-textMuted text-xs">India Certified Facility</p>
  </div>
</div>
```

**Animations:**
- Card: scale from `0.95` + fade on enter
- Species rows: stagger in from right `staggerChildren: 0.1`
- `✓` icons: draw-in scale `[0, 1.3, 1]` spring per row
- Card border: `.animated-border` continuous spin

---

## 5. FILE / FOLDER ADDITIONS

```
src/
├── pages/
│   └── ProductPage.jsx               ← Route: /product (or imported in App.jsx)
├── sections/
│   ├── ProductsHeroSection.jsx       ← NEW
│   ├── TestedSpeciesSection.jsx      ← NEW
│   ├── FeaturesGridSection.jsx       ← NEW
│   ├── HowItWorksSection.jsx         ← NEW
│   └── LabTestedSection.jsx          ← NEW
├── components/
│   └── ProductDetailDrawer.jsx       ← NEW (inline expandable panel)
└── data/
    └── staticData.js                 ← ADD: PRODUCTS_DATA, PRODUCT_FEATURES, 
                                              HOW_IT_WORKS, STATS_DATA
```

---

## 6. NEW LUCIDE-REACT ICONS NEEDED

```js
import {
  Target,       // Feature: Lure System
  Volume2,      // Feature: Silent Operation
  CloudRain,    // Feature: All-Weather
  Leaf,         // Feature: Eco-Friendly
  Maximize2,    // Feature: Wide Coverage
  Settings2,    // Feature: Easy Setup
  Zap,          // How It Works: Attract
  Wind,         // How It Works: Capture
  ShieldCheck,  // How It Works: Eliminate
  FlaskConical, // Lab section icon
  ChevronDown,  // View Details toggle
  X,            // Close drawer
} from 'lucide-react';
```

---

## 7. PLACEHOLDER CONVENTIONS (Page-Specific)

| Asset | Placeholder |
|---|---|
| Indoor product image (card) | `aspect-square` dashed border card, label `[ IPI Unit Image ]`, `border-gradientcyan/30` |
| Outdoor product image (card) | Same, `border-gradientyellow/30`, label `[ IPO Unit Image ]` |
| Indoor product image (drawer) | `aspect-[3/4]` tall, label `[ IPI Full View ]` |
| Outdoor product image (drawer) | Same, label `[ IPO Full View ]` |
| Certification badge logo | Dashed circle, label `CERT` |
| Test report link | `href="#"` with `[View Test Report →]` |

---

## 8. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 640px`) | Product cards stack vertically; drawer becomes full-width accordion; stats 2×2 grid; features 1-col; How It Works vertical timeline |
| Tablet (`640–1024px`) | Product cards 2-col; features 2-col; How It Works 3-col compact |
| Desktop (`> 1024px`) | Full layout as specified; max-w-7xl container |

---

## 9. KEY IMPLEMENTATION NOTES

- **No routing library yet** — `ProductPage.jsx` can be imported conditionally in `App.jsx` via a simple state toggle (`currentPage`), or set up React Router when needed. Keep the `<Navbar>` active link highlight on `PRODUCT` when on this page.
- **`.animated-border` applies to:** Product cards, all 4 stat boxes, all 6 feature cards, all 3 How It Works cards, and the Lab Tested card.
- **`ProductDetailDrawer`** uses `layoutId` prop tied to `product.id` for smooth shared-element animation when switching between products.
- **Stat count-up** in `TestedSpeciesSection` — use same pattern as `DiseasesSection` from Landing Page (`useMotionValue` + `animate()`), but for `100`, `95`, `300`.
- **Section IDs** for smooth-scroll from Navbar: `#products`, `#tested`, `#features`, `#how-it-works`, `#lab-tested`.
- **`whileInView` once: true** on all section animations — consistent with Landing Page.
- **Performance** — `LazyMotion` + `domAnimation` (same as Landing Page); the animated border uses CSS `@property` which has excellent browser support in 2025.
