# ⚖️ MOSCURE — Comparison Page Blueprint
**Version:** 1.0  
**Page:** `/comparison` — The Moscure Advantage  
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS  
**File:** `src/pages/ComparisonPage.jsx` — **SINGLE FILE, all sections inline**

> All global design tokens (colors, typography, spacing, animation patterns) inherit from  
> `MOSCURE_LANDING_PAGE_REQUIREMENTS.md`. Page-specific additions documented here.

---

## 1. PAGE GOAL

Demolish the buyer's hesitation. Show — with data, contrast, and visual drama — that every alternative (Good Knight, All Out, Mortein, HIT, coils, rackets) leaves the family exposed while Moscure seals the gap. Every section escalates the case until the CTA feels inevitable.

---

## 2. PAGE STRUCTURE (Single File)

```
ComparisonPage.jsx
  ├── <Navbar />
  │
  ├── SECTION 1: Hero — "WHY MOSCURE WINS"
  ├── SECTION 2: "THE MOSCURE ADVANTAGE" — Full Comparison Table
  ├── SECTION 3: "THE VERDICT" — Head-to-Head Brand Cards
  ├── SECTION 4: "MAKE THE SMART CHOICE" — CTA
  │
  └── <Footer />
```

---

## 3. PAGE-SPECIFIC ANIMATION ADDITIONS

| Pattern | Where | Config |
|---|---|---|
| **✗ stamp reveal** | Competitor cells in table | Scale from `2 → 1` with red flash, `duration: 0.3`, on row enter |
| **✓ check draw-in** | Moscure cells | SVG stroke animation `strokeDashoffset 100 → 0`, `duration: 0.5` |
| **Row scan highlight** | Table rows on hover | Full-row background sweep left→right, `gradientcyan` at 4% |
| **Brand card flip** | Verdict cards on hover | CSS `rotateY(4deg)` perspective tilt (not full flip), `whileHover` |
| **Score bar fill** | Verdict score bars | Width `0 → score%` on `whileInView`, stagger per bar |
| **Glitch flash** | Competitor brand names | CSS glitch keyframe fires once on viewport enter — subtle, 0.3s |
| **Winner badge pulse** | Moscure winner tag | `scale: [1, 1.08, 1]` loop, 2s, `gradientcyan` glow |
| **Counter** | Hero stat numbers | `useMotionValue` count-up on mount |
| **Horizontal scroll** | Table on mobile | `overflow-x: auto` with inertia scroll, snap columns |

---

## 4. STATIC DATA

```js
// ─── All data inline in ComparisonPage.jsx ───────────────────────

// From the uploaded image — THE MOSCURE ADVANTAGE table
const ADVANTAGE_TABLE = {
  columns: ['Type', 'Technology', 'Insects Targeted', 'Health Impact', 'Application', 'Water Resistant', 'Coverage'],
  rows: [
    {
      id: 'moscure',
      isMoscure: true,
      label: 'Moscure Trap',
      icon: null,                             // placeholder: [ ICON ]
      technology: 'Patent UV-LED · MLID & Phototaxis Technology',
      insects: 'Mosquito, Fly, Moth, Fruit-Fly, Yellow Jacket, Beetle, Gnats',
      health: ['100% Chemical & Smoke-Free', 'Safe for Kids & Pets', 'Continuous 24/7 Protection'],
      application: 'Indoor & Outdoor',
      waterResistant: true,
      coverage: 'Large (up to 300 sq. m)',
    },
    {
      id: 'racket',
      isMoscure: false,
      label: 'Electric Racket',
      icon: null,
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
      icon: null,
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
      label: 'Mosquito Spray (HIT / Mortein)',
      icon: null,
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
      label: 'Liquid Vaporiser (All Out / Good Knight)',
      icon: null,
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
      label: 'Coil (Maxo / Mortein)',
      icon: null,
      technology: 'Chemical smoke repellent',
      insects: 'Mosquito',
      health: ['Smoke = 100 cigarette equivalent', 'Not advised for indoor use', 'Fire hazard risk'],
      application: 'Outdoor / Semi-indoor',
      waterResistant: false,
      coverage: 'Small–medium area only',
    },
  ]
};

// Brand-level head-to-head cards for SECTION 3 — THE VERDICT
const VERDICT_BRANDS = [
  {
    id: 'good-knight',
    name: 'Good Knight',
    company: 'Godrej (Liquid Vaporiser)',
    marketShare: '51% mat segment',
    scores: {
      chemical_free: 10,    // out of 100
      coverage: 30,
      child_safe: 35,
      effectiveness: 55,
      maintenance: 40,
    },
    moscureScores: {
      chemical_free: 100,
      coverage: 92,
      child_safe: 100,
      effectiveness: 95,
      maintenance: 90,
    },
    verdict: 'Chemical-based liquid releases toxins 24/7 in enclosed spaces. Needs frequent ₹99 refills. Effective in one room only. No outdoor use.',
    accentColor: 'gradientpink',
  },
  {
    id: 'all-out',
    name: 'All Out',
    company: 'SC Johnson (Vaporiser)',
    marketShare: '69% vaporiser segment',
    scores: {
      chemical_free: 10,
      coverage: 30,
      child_safe: 30,
      effectiveness: 50,
      maintenance: 35,
    },
    moscureScores: {
      chemical_free: 100,
      coverage: 92,
      child_safe: 100,
      effectiveness: 95,
      maintenance: 90,
    },
    verdict: 'Transfluthrin-based vaporiser. Popular but chemical. Indoor-only. Needs power + refills permanently. No protection for gardens or outdoor spaces.',
    accentColor: 'gradientyellow',
  },
  {
    id: 'mortein',
    name: 'Mortein',
    company: 'Reckitt Benckiser (Spray/Coil)',
    marketShare: '33% coil segment',
    scores: {
      chemical_free: 5,
      coverage: 25,
      child_safe: 20,
      effectiveness: 45,
      maintenance: 50,
    },
    moscureScores: {
      chemical_free: 100,
      coverage: 92,
      child_safe: 100,
      effectiveness: 95,
      maintenance: 90,
    },
    verdict: 'Aerosol spray and coils. Reactive, not preventive. High inhalation risk. Harmful chemicals unsafe around babies. Smoke-based coil equivalent to 100 cigarettes.',
    accentColor: 'gradientcyan',
  },
  {
    id: 'hit',
    name: 'HIT Spray',
    company: 'Godrej (Insecticide Spray)',
    marketShare: 'Leading spray brand',
    scores: {
      chemical_free: 0,
      coverage: 20,
      child_safe: 10,
      effectiveness: 40,
      maintenance: 60,
    },
    moscureScores: {
      chemical_free: 100,
      coverage: 92,
      child_safe: 100,
      effectiveness: 95,
      maintenance: 90,
    },
    verdict: 'Highly flammable chemical spray. Kills on contact but offers zero ongoing protection. Toxic if inhaled. Must clear the room after spraying. Zero passive defense.',
    accentColor: 'gradientpink',
  },
];

// Hero stats
const HERO_STATS = [
  { value: 6, suffix: '+',   label: 'Competitor Types Compared',  color: 'gradientcyan'   },
  { value: 7, suffix: '',    label: 'Categories Evaluated',       color: 'gradientyellow' },
  { value: 1, suffix: '',    label: 'Clear Winner',               color: 'gradientpink'   },
];

// WHY MOSCURE WINS — 4 hero reasons
const WHY_MOSCURE = [
  {
    id: 1,
    stat: '0',
    statSuffix: ' Chemicals',
    label: 'vs. Toxic Alternatives',
    description: 'Every competitor — from Good Knight to Mortein to HIT — uses chemical compounds that are inhaled by your family 24/7. Moscure uses patented UV-LED phototaxis. Zero toxins. Ever.',
    icon: 'ShieldCheck',
    color: 'gradientcyan',
  },
  {
    id: 2,
    stat: '300',
    statSuffix: 'sq. m',
    label: 'vs. One-Room Vaporisers',
    description: 'All Out and Good Knight vaporisers protect a single small room. Moscure IPO covers your entire garden, terrace, or outdoor space. One device. Total coverage.',
    icon: 'Maximize2',
    color: 'gradientyellow',
  },
  {
    id: 3,
    stat: '24/7',
    statSuffix: '',
    label: 'vs. Spray-and-Pray',
    description: 'HIT and Mortein sprays are reactive — they kill what's already in the room. Moscure works passively and continuously, trapping mosquitoes before they reach you.',
    icon: 'Clock',
    color: 'gradientpink',
  },
  {
    id: 4,
    stat: '5+',
    statSuffix: ' Species',
    label: 'vs. Single-Pest Products',
    description: 'Rackets and glue traps are limited. Moscure's phototaxis technology attracts and eliminates mosquitoes, flies, moths, beetles, gnats, and more — all in one device.',
    icon: 'Target',
    color: 'gradientcyan',
  },
];

// Score criteria labels for verdict cards
const SCORE_CRITERIA = [
  { key: 'chemical_free', label: 'Chemical-Free' },
  { key: 'coverage',      label: 'Coverage Area' },
  { key: 'child_safe',    label: 'Child & Pet Safe' },
  { key: 'effectiveness', label: 'Effectiveness' },
  { key: 'maintenance',   label: 'Low Maintenance' },
];
```

---

## 5. SECTION SPECIFICATIONS

---

### SECTION 1 — Hero: "WHY MOSCURE WINS"

**Background:** `#0A0A0A` base. Faint diagonal hatching at 3% opacity (CSS `repeating-linear-gradient` at 45°). Radial glow from `gradientcyan` at 6% top-center.

**Top Label (centered):**
```
[⚔ THE DEFINITIVE VERDICT]
```
- Pill badge, `Space Mono uppercase`, `bg-gradientcyan/10 border border-gradientcyan/40 text-gradientcyan`

**Hero Heading (centered):**
```
WHY
MOSCURE WINS         ← "WINS" in gradient-cyan-yellow text
```
- `Bebas Neue text-8xl md:text-[10rem]`
- Word stagger slide-up on mount

**Subtext (centered, max-w-2xl):**
> India's mosquito repellent market is dominated by chemical-based brands that mask the problem while creating new ones. We built something different. Here's the proof.

**3-Stat Row (below subtext, max-w-3xl centered, `mt-12`):**

Each stat — `bg-surface/60 border border-borderDefault rounded-2xl px-8 py-6`:
```
6+                  ← Bebas Neue text-5xl gradientcyan
Competitor Types    ← Space Mono text-xs uppercase text-textMuted
Compared
```

**4 Reason Cards below stats (`grid-cols-1 md:grid-cols-2 gap-6 mt-16`):**

Each card — `.animated-border` inner `bg-surface`:
```
┌──────────────────────────────────┐
│  [Icon]            [STAT LARGE]  │  ← Icon left, big stat top-right
│                    0 Chemicals   │  ← Bebas Neue text-4xl accent color
│                    vs. Toxic...  │  ← Space Mono text-xs muted
│                                  │
│  Card description paragraph      │  ← DM Sans text-sm text-textMuted
└──────────────────────────────────┘
```

**Animations:**
- Badge → H1 words → subtext → stats → cards (sequential delays)
- Reason cards: `staggerChildren: 0.15` from bottom
- Stat in each card: count-up on card enter (for numeric stats)

---

### SECTION 2 — "THE MOSCURE ADVANTAGE" (Comparison Table)

**Section Label:** `📊 HEAD TO HEAD`

**Section Heading:**
```
THE MOSCURE
ADVANTAGE
```
- `ADVANTAGE` in `gradient-yellow-cyan` text

**Subtext:** Data derived from lab tests and product specifications of leading Indian mosquito repellent brands.

---

**Table Structure:**

Full-width table, `max-w-7xl mx-auto`, horizontal scroll on mobile with snap.

**Header Row:**
```
┌──────────────┬──────────────┬───────────────┬───────────────┬─────────────┬──────────┬──────────────┐
│  TYPE        │  TECHNOLOGY  │  INSECTS      │  HEALTH       │ APPLICATION │  WATER   │  COVERAGE    │
│              │              │  TARGETED     │  IMPACT       │             │  RESIST. │  AREA        │
└──────────────┴──────────────┴───────────────┴───────────────┴─────────────┴──────────┴──────────────┘
```
- Header: `bg-surface border-b-2 border-gradientcyan`
- Label: `Space Mono text-xs uppercase text-textMuted tracking-wider`

**Moscure Row (always first, pinned):**
- Background: `bg-gradientcyan/5 border-l-2 border-gradientcyan`
- "MOSCURE TRAP" label in `gradientcyan font-bold`
- Each cell: positive data in `text-white`
- Water Resistant cell: animated ✓ SVG checkmark draw-in, `gradientcyan`
- Coverage: `gradientcyan font-bold`
- Left edge: 3px `gradientcyan` accent border
- Small `BEST CHOICE` badge on the row label

**Competitor Rows:**
- Background: `bg-surface` alternating with `bg-surface/60`
- Water Resistant: animated ✗ icon, `gradientpink`, scale-in on row enter
- Health Impact bullets: each starts with `-` in `gradientpink`
- Coverage: `text-textMuted italic`
- Brand name in parentheses (Good Knight, All Out, etc.): `text-textMuted text-xs`

**Mobile View:** horizontal scroll container, Moscure column sticky on left, others scroll right

**Table Cell Animation (per row, `whileInView staggerChildren: 0.04`):**
- Each row fades in from `y: 20`
- ✗ marks: `scale: 2 → 1` flash effect, `gradientpink`
- ✓ marks: SVG stroke dash animation

**Below table — sourcing note:**
> *Data based on publicly available product specifications from Good Knight, All Out, Mortein, and HIT. Tested effectiveness figures from Moscure internal lab data.*

---

### SECTION 3 — "THE VERDICT" (Brand Head-to-Head Cards)

**Section Label:** `🏆 BRAND BY BRAND`

**Section Heading:**
```
THE
VERDICT
```
- `VERDICT` in `gradient-pink-yellow` text

**Subtext:**
> We went brand-by-brand. This is what we found.

**Layout:** 2×2 grid on desktop, 1-col on mobile (4 brand cards)

---

**Verdict Card Design (`.animated-border`):**

```
┌────────────────────────────────────────────────┐
│  [Brand Logo Placeholder]    GOOD KNIGHT       │
│                              Godrej · Vaporiser│
│                              51% mat market    │
│                                                │
│  ─────  SCORE COMPARISON  ─────                │
│                                                │
│  Chemical-Free                                 │
│  MOSCURE   ████████████████████  100%         │
│  GOOD KNIGHT █░░░░░░░░░░░░░░░░░  10%          │
│                                                │
│  Coverage Area                                 │
│  MOSCURE   ███████████████████░  92%          │
│  GOOD KNIGHT ████░░░░░░░░░░░░░░  30%          │
│                                                │
│  [... 3 more criteria ...]                     │
│                                                │
│  ─────────────────────────────────             │
│                                                │
│  THE VERDICT:                                  │
│  "Chemical-based liquid releases toxins 24/7..." │
│                                                │
│  [MOSCURE WINS ✓]    ← winner badge            │
└────────────────────────────────────────────────┘
```

**Score Bar Design (per criterion):**
- Row label: `Space Mono text-xs uppercase text-textMuted`
- Moscure bar: `bg-gradientcyan rounded-full h-1.5` — fills to `score%`
- Competitor bar: `bg-gradientpink/40 rounded-full h-1.5` — fills to competitor score
- Percentage shown at bar end in matching color, `text-xs`

**Brand Logo Placeholder:**
```jsx
<div className="w-14 h-14 rounded-xl border-2 border-dashed border-borderDefault 
                bg-surface flex items-center justify-center">
  <span className="text-textMuted text-xs Space Mono">LOGO</span>
</div>
```

**Verdict Text:** `DM Sans text-sm text-textMuted italic border-l-2 border-accent pl-3`

**Winner Badge:**
```
[ ✓ MOSCURE WINS ]
```
- `bg-gradientcyan/10 border border-gradientcyan text-gradientcyan`
- `Space Mono text-xs font-bold uppercase`
- `animate: { scale: [1, 1.06, 1] }` loop, 2.5s

**Card Animations:**
- Cards: `staggerChildren: 0.15` from bottom
- Score bars: fill sequentially on card enter, `staggerChildren: 0.1`
- Moscure bar fills fast `duration: 0.8`, competitor fills slow `duration: 1.2` (psychological effect)
- Card `whileHover`: subtle `rotateY(3deg) rotateX(-1deg)` perspective tilt

---

### SECTION 4 — "MAKE THE SMART CHOICE" (CTA)

**Background:** Full-width. Dark `bg-background`. Central radial glow mixing `gradientcyan` + `gradientyellow` at 6% opacity. Subtle noise texture at 3%.

**Decorative: Trophy SVG** (large, faint, `text-white/3`, positioned center-right, `text-[20rem]`) — very slowly rotates on Y axis via CSS.

**Content (Left-aligned on desktop, centered on mobile):**

```
[SECTION LABEL]   🏆 THE CHOICE IS CLEAR

[H2]              MAKE THE
                  SMART CHOICE     ← "SMART" gradient-cyan-yellow

[Body]            Join thousands of Indian families who've replaced
                  chemical repellents with Moscure's scientifically
                  proven, 100% chemical-free protection.
                  
                  No refills. No toxins. No compromises.

[FEATURE PILLS]
  [✓ Chemical-Free]  [✓ Covers 300 sq.m]  [✓ Child & Pet Safe]
  [✓ Indoor & Outdoor]  [✓ 24/7 Protection]

[BUTTONS]
  [VIEW PRODUCTS →]    [CONTACT US]
```

**Feature Pills:**
- `bg-surface border border-borderDefault rounded-full px-4 py-1.5`
- `✓` in `gradientcyan`
- `DM Sans text-sm text-white`
- `flex-wrap gap-3 mt-6`

**Primary Button:** `gradientcyan` solid, `text-background font-bold rounded-full`, `whileHover` glow `0 0 30px #00F5D480`

**Secondary Button:** Ghost, `border border-white/20`, hover `bg-white/5`

**Right Side (desktop only) — Live comparison mini-widget:**

```
┌──────────────────────────────┐
│  [animated-border card]      │
│                              │
│  OTHERS spend ₹800/year      │  ← DM Sans, text-textMuted, strikethrough effect
│  on refills alone            │
│                              │
│  MOSCURE                     │
│  One-time investment         │  ← gradientcyan
│  Zero recurring cost         │
│  ✓ No refills ever           │
│                              │
│  ₹3,299  /  ₹21,599          │  ← Bebas Neue, price highlight
│  Indoor  /  Outdoor          │
└──────────────────────────────┘
```

**Animations:**
- Left content: stagger word-by-word heading, then pills pop in one by one `staggerChildren: 0.08`
- Right widget: slides in from right `delay: 0.4`
- Buttons: scale from `0.85` `delay: 0.6`
- Feature pills: subtle bounce `scale: [0, 1.1, 1]` stagger

---

## 6. COMPONENT STRUCTURE (inside single file)

```jsx
// ComparisonPage.jsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Maximize2, Clock, Target,
  Check, X, Trophy
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Static Data (all inline) ────────────────────────────────────
const ADVANTAGE_TABLE = { ... }
const VERDICT_BRANDS = [ ... ]
const HERO_STATS = [ ... ]
const WHY_MOSCURE = [ ... ]
const SCORE_CRITERIA = [ ... ]

// ─── Sub-components (same file) ──────────────────────────────────

const StatBadge = ({ value, suffix, label, color }) => { ... }

const ReasonCard = ({ item, index }) => { ... }
// WHY MOSCURE WINS grid cards

const TableRow = ({ row, index }) => { ... }
// Single row in the comparison table, animated on whileInView

const CheckCell = ({ value }) => (
  // ✓ SVG animated stroke draw, or ✗ scale-in red icon
)

const ScoreBar = ({ label, moscureScore, competitorScore, color, index }) => { ... }
// Dual bar row used in verdict cards

const VerdictCard = ({ brand, index }) => { ... }
// Full brand verdict card with score bars

const FeaturePill = ({ label, index }) => { ... }
// CTA section animated pills

// ─── Page Component ──────────────────────────────────────────────
export default function ComparisonPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar />

      {/* SECTION 1 — Why Moscure Wins */}
      <section id="why-moscure" className="..."> ... </section>

      {/* SECTION 2 — The Moscure Advantage Table */}
      <section id="advantage" className="..."> ... </section>

      {/* SECTION 3 — The Verdict */}
      <section id="verdict" className="..."> ... </section>

      {/* SECTION 4 — Make the Smart Choice */}
      <section id="smart-choice" className="..."> ... </section>

      <Footer />
    </div>
  )
}
```

---

## 7. NEW LUCIDE-REACT ICONS NEEDED

```js
import {
  ShieldCheck,   // Reason card: chemical-free
  Maximize2,     // Reason card: coverage
  Clock,         // Reason card: 24/7
  Target,        // Reason card: species
  Check,         // Table ✓ cell
  X,             // Table ✗ cell
  Trophy,        // CTA decorative + label
  ChevronRight,  // CTA button arrows
  Zap,           // Optional: hero accent
} from 'lucide-react'
```

---

## 8. CSS ADDITIONS (index.css)

```css
/* Score bar fill transition */
.score-bar-fill {
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

/* SVG checkmark stroke animation */
@keyframes drawCheck {
  from { stroke-dashoffset: 50; }
  to   { stroke-dashoffset: 0; }
}
.check-draw {
  stroke-dasharray: 50;
  animation: drawCheck 0.5s ease-out forwards;
}

/* Glitch flash on competitor name — fires once on enter */
@keyframes glitchFlash {
  0%   { transform: translate(0); opacity: 1; }
  20%  { transform: translate(-2px, 1px); opacity: 0.8; }
  40%  { transform: translate(2px, -1px); clip-path: inset(30% 0 50% 0); }
  60%  { transform: translate(-1px, 2px); opacity: 0.9; }
  80%  { transform: translate(1px, -2px); }
  100% { transform: translate(0); opacity: 1; }
}
.glitch-once {
  animation: glitchFlash 0.35s ease-out 1;
}

/* Table row hover scan */
.table-row-hover:hover {
  background: linear-gradient(90deg, transparent, #00F5D408, transparent);
}
```

---

## 9. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 640px`) | Table: horizontal scroll with snap; 4 verdict cards in 1 column; CTA stacked vertical; right widget hidden |
| Tablet (`640–1024px`) | Verdict cards 2×2; table full-width scroll; CTA side-by-side |
| Desktop (`> 1024px`) | Full 7-column table visible; 2×2 verdict grid; CTA split layout with mini-widget |

---

## 10. SECTION IDs (for Nav smooth scroll)

```
#why-moscure    ← WHY MOSCURE WINS
#advantage      ← THE MOSCURE ADVANTAGE table
#verdict        ← THE VERDICT brand cards
#smart-choice   ← CTA
```

---

## 11. IMAGE / ICON PLACEHOLDERS

| Asset | Placeholder |
|---|---|
| All competitor brand logos (4) | `w-14 h-14 rounded-xl border-dashed border-borderDefault` + `Space Mono "LOGO"` |
| Product type icons (Racket, Spray, etc.) | Use lucide-react `Zap`, `Droplets`, `Wind`, `Flame`, `Plug`, `Circle` as stand-ins |
| Moscure trap icon | Text-based `MOSCURE` in `gradientcyan` or lucide `ShieldCheck` |
| Trophy illustration (CTA bg) | lucide `Trophy` at `text-[20rem] text-white/3` |

---

## 12. KEY IMPLEMENTATION NOTES

- **Single file** — `ADVANTAGE_TABLE`, `VERDICT_BRANDS`, all sub-components, and page component all in `ComparisonPage.jsx`. Only `Navbar` and `Footer` imported externally.
- **Table sticky header** — Use `position: sticky; top: 0; z-index: 10` on the header row with `bg-background/95 backdrop-blur` so it stays visible during long table scroll on desktop.
- **Moscure row sticky** on mobile — Consider `position: sticky; left: 0` for the product type column so the label stays anchored during horizontal scroll.
- **Score bar psychology** — Moscure bar fills in `0.8s` (fast, confident); competitor bar fills in `1.4s` (slow, labored). Small but effective visual cue.
- **No third-party brand logos** — Only use placeholder boxes. Logos would require licensing. Brand *names as text* are fine for comparison purposes.
- **`.animated-border`** — Applied to: all 4 WHY MOSCURE cards, all 4 verdict cards, CTA mini-widget. Table rows use simpler hover highlight, not animated borders (too noisy at scale).
- **`whileInView once: true`** — All scroll animations. Margin `"-80px"` for early trigger.
- **Competitive claims** — All competitor data is based on publicly available product specs (chemical compositions, room coverage stated on packaging). The `sourcing note` below the table should always be present.
- **Verdict card active state** — On mobile, cards start collapsed (show brand name + winner badge only), tap to expand score bars. `useState(expandedBrand)` pattern, same as disease accordion.
