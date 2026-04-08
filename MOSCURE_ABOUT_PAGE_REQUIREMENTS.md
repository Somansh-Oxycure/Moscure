# 🏢 MOSCURE — About Us Page Blueprint
**Version:** 1.0  
**Page:** `/about` — About Moscure  
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS  
**File:** `src/pages/AboutPage.jsx` — **SINGLE FILE, all sections inline**

> All global design tokens (colors, typography, spacing, animation patterns) inherit from  
> `MOSCURE_LANDING_PAGE_REQUIREMENTS.md`. Only page-specific additions are documented here.

---

## 1. PAGE GOAL

Build trust and emotional connection. Convert a curious visitor into a believer by showing the *why* behind Moscure — the mission, the science, the values, the people-first DNA — before nudging them toward the product. This page should feel human, credible, and inspiring.

**Tone shift from other pages:** Slightly warmer and more narrative than the aggressive tactical tone of the Comparison or Diseases pages. Still bold, still dark-themed, but with more breathing room and storytelling weight.

---

## 2. PAGE STRUCTURE (Single File)

```
AboutPage.jsx
  ├── <Navbar />
  │
  ├── SECTION 1: Hero — "ABOUT MOSCURE"
  ├── SECTION 2: "THE MOSCURE STORY" — Narrative + visual
  ├── SECTION 3: "OUR MISSION" — Mission statement + stat pills
  ├── SECTION 4: "OUR VALUES" — 3 accordion value cards
  ├── SECTION 5: "WHY CHOOSE MOSCURE" — 4 icon tiles
  ├── SECTION 6: "OUR COMMITMENT" — Stats + prose
  ├── SECTION 7: "JOIN THE MOSCURE FAMILY" — CTA
  │
  └── <Footer />
```

---

## 3. PAGE-SPECIFIC ANIMATION ADDITIONS

| Pattern | Where | Config |
|---|---|---|
| **Typewriter cursor** | Hero mission line | CSS `@keyframes blink` after text renders, `border-right` blink |
| **Timeline draw-in** | Story section vertical line | `scaleY: 0 → 1` top-to-bottom on `whileInView`, `duration: 1.2` |
| **Chapter dot pulse** | Story timeline nodes | `scale: [1, 1.3, 1]` stagger as line draws past each node |
| **Value card accordion** | OUR VALUES cards | Framer `AnimatePresence` height expand; only one open at a time |
| **Icon orbit ring** | WHY CHOOSE tiles | Decorative SVG ring slowly rotates behind each icon, CSS `animation: spin 12s linear infinite` |
| **Commitment counter** | 100% / 24/7 / 5★ | `useMotionValue` count-up, but for `100` → suffix `%` |
| **Parallax text** | "MOSCURE" watermark in story | `useScroll + useTransform` slight horizontal drift |
| **Quote reveal** | Mission quote | Each word opacity `0 → 1` stagger at `0.04s` intervals — like reading word-by-word |
| **Value icon morph** | On card open | Icon `whileHover: { rotate: [0, -10, 10, 0] }` spring wobble |

---

## 4. STATIC DATA

```js
// ─── All data inline in AboutPage.jsx ────────────────────────────

const STORY_CHAPTERS = [
  {
    id: 'origin',
    year: 'THE PROBLEM',
    title: 'A Preventable Crisis',
    body: `Mosquitoes kill more humans than any other animal on Earth. In India alone, 
      millions suffer every year from Dengue, Malaria, and Chikungunya — diseases that 
      are entirely preventable. Yet the market was full of chemical sprays, smoky coils, 
      and temporary band-aid solutions that masked the problem while creating new ones.`,
    accent: 'gradientpink',
  },
  {
    id: 'idea',
    year: 'THE IDEA',
    title: 'Science Over Chemicals',
    body: `Moscure was created to challenge the outdated, chemical-heavy approach to 
      mosquito control. Instead of temporary relief through sprays and coils, the 
      founders built around a simple but powerful principle: use science to eliminate 
      the mosquito, not just repel it for a few hours.`,
    accent: 'gradientyellow',
  },
  {
    id: 'mission',
    year: 'THE MISSION',
    title: 'Breaking the Disease Cycle',
    body: `The goal was never just comfort — it was public health. Moscure focuses on 
      science-driven, human-safe mosquito control that targets the problem at its source, 
      reducing mosquito presence and breaking the cycle of disease transmission for 
      families, communities, and cities across India.`,
    accent: 'gradientcyan',
  },
];

const VALUES_DATA = [
  {
    id: 'science',
    icon: 'FlaskConical',
    title: 'Scientifically Proven Protection',
    tagline: 'Tested. Trusted. Effective.',
    gradient: 'from-gradientpink to-gradientyellow',
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
    icon: 'Heart',
    title: 'Family Health & Safety',
    tagline: 'Safe for the ones who matter most.',
    gradient: 'from-gradientyellow to-gradientcyan',
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
    icon: 'BookOpen',
    title: 'Awareness & Empowerment',
    tagline: 'Knowledge is the first line of defense.',
    gradient: 'from-gradientcyan to-gradientpink',
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
];

const WHY_CHOOSE = [
  {
    id: 1,
    icon: 'Heart',
    title: 'FAMILY FIRST',
    description: 'Every decision we make prioritizes the health and safety of your loved ones. Always.',
    color: 'gradientpink',
    gradient: 'from-gradientpink to-gradientyellow',
  },
  {
    id: 2,
    icon: 'FlaskConical',
    title: 'PRECISION TESTED',
    description: 'Rigorously tested against all disease-carrying mosquito species found across India.',
    color: 'gradientyellow',
    gradient: 'from-gradientyellow to-gradientcyan',
  },
  {
    id: 3,
    icon: 'Users',
    title: 'TRUSTED BY THOUSANDS',
    description: 'Join families across India who have made Moscure their first line of defense.',
    color: 'gradientcyan',
    gradient: 'from-gradientcyan to-gradientpink',
  },
  {
    id: 4,
    icon: 'Cpu',
    title: 'INNOVATIVE TECH',
    description: 'Cutting-edge UV-LED phototaxis technology that works silently and effectively 24/7.',
    color: 'gradientpink',
    gradient: 'from-gradientpink via-gradientyellow to-gradientcyan',
  },
];

const COMMITMENT_STATS = [
  { value: 100, suffix: '%', label: 'Satisfaction Guarantee', color: 'gradientcyan'   },
  { value: 24,  suffix: '/7', label: 'Customer Support',      color: 'gradientyellow' },
  { value: 5,   suffix: '★',  label: 'Customer Rating',       color: 'gradientpink'   },
];
```

---

## 5. SECTION SPECIFICATIONS

---

### SECTION 1 — Hero: "ABOUT MOSCURE"

**Background:** `#0A0A0A`. Radial gradient glow — `gradientcyan` at 6% top-left bleeding to `gradientpink` at 4% bottom-right. Faint grain texture at 3%.

**Decorative:** Large faded `MOSCURE` text watermark (`Bebas Neue text-[20vw] text-white/[0.02]`), horizontally centered, `useScroll + useTransform` drifts it 20px left as user scrolls down.

**Layout (full viewport height, centered content):**

```
[LABEL]   ⬡ OUR STORY

[H1]      ABOUT
          MOSCURE          ← gradient-cyan-pink text on "MOSCURE"

[Mission line — typewriter effect]
          We're on a mission to protect every Indian family from
          mosquito-borne diseases through innovative technology
          and unwavering commitment to health.

[Scroll indicator]   ↓ Scroll to explore
```

**Heading:** `Bebas Neue text-8xl md:text-[11rem]` — one of the largest type treatments in the site

**Mission line:** `DM Sans text-xl md:text-2xl text-textMuted max-w-3xl` — rendered with word-by-word opacity stagger (typewriter word reveal, not character-by-character)

**Scroll indicator:** Animated `↓` chevron, `animate: { y: [0, 8, 0] }` infinite 1.5s. `Space Mono text-xs text-textMuted uppercase tracking-widest`

**Animations:**
- Label fades `delay: 0`
- H1 words stagger slide-up `delay: 0.2, staggerChildren: 0.08`
- Mission words reveal `delay: 0.7, staggerChildren: 0.04` (slower, deliberate)
- Scroll indicator fades in `delay: 1.4`
- Watermark MOSCURE: `useTransform(scrollY, [0, 500], [0, -20])` horizontal drift

---

### SECTION 2 — "THE MOSCURE STORY"

**Section Label:** `📖 OUR ORIGINS`

**Section Heading:**
```
THE MOSCURE
STORY
```
`STORY` in `gradient-pink-yellow` text

**Layout:** Vertical timeline — center line on desktop, left-edge line on mobile

**Timeline Structure:**

```
                    │  ← central vertical line, scaleY 0→1 draws down
                    │
          ●─────────┤  THE PROBLEM          ← dot on line, line extends right
                    │  "A Preventable Crisis"
                    │  [body text]
                    │  [Image/Illustration Placeholder]
                    │
          ●─────────┤  THE IDEA
                    │  "Science Over Chemicals"
                    │  [body text]
                    │
          ●─────────┤  THE MISSION
                    │  "Breaking the Disease Cycle"
                    │  [body text]
                    │
```

**Desktop:** Alternating left/right layout — odd chapters align content right of line, even chapters align left (zigzag pattern)

**Mobile:** All content right of left-edge line, full-width

**Chapter Card Design:**

```
┌────────────────────────────────────────┐
│  [YEAR TAG]  THE PROBLEM               │  ← Space Mono text-xs accent color
│                                        │
│  A Preventable Crisis                  │  ← Bebas Neue text-3xl text-white
│                                        │
│  Body paragraph text...                │  ← DM Sans text-sm text-textMuted
│                                        │
│  [Decorative illustration placeholder] │  ← dashed border div, aspect-video
└────────────────────────────────────────┘
```

**Timeline Dot:** `w-4 h-4 rounded-full bg-accent border-2 border-background`, accent = chapter's color

**Connecting line:** `w-0.5 bg-gradient-to-b from-gradientpink via-gradientyellow to-gradientcyan`

**Illustration Placeholders (one per chapter):**
```jsx
<div className="aspect-video rounded-xl border-2 border-dashed 
                border-accent/30 bg-surface/50 flex items-center justify-center mt-4">
  <span className="Space Mono text-xs text-textMuted uppercase tracking-widest">
    [ Chapter Illustration ]
  </span>
</div>
```

**Animations:**
- Timeline line: `scaleY: 0 → 1` `transformOrigin: top`, `duration: 1.4` on `whileInView`
- Each dot: `scale: [0, 1.4, 1]` when line reaches it (stagger `delay: index * 0.4`)
- Each chapter card: slides in from its side (left/right alternating) as dot pulses
- Chapter illustration: fades in last `delay: 0.3` after text

---

### SECTION 3 — "OUR MISSION"

**Section Label:** `🎯 WHAT DRIVES US`

**Section Heading:**
```
OUR
MISSION
```

**Layout:** 2-column on desktop — left: quote/prose, right: mosquito stat pills

**Left Column:**

```
[LARGE OPENING QUOTE MARK — decorative]

Every year, millions of Indians suffer from         ← DM Sans text-lg text-white
mosquito-borne diseases. We believe this           leading-relaxed
is preventable.

[second paragraph — smaller]
Moscure was created to provide a safe, effective,  ← DM Sans text-base text-textMuted
and reliable solution that works 24/7 to protect
families across India. Our technology has been
rigorously tested against all major disease-
carrying mosquito species found in India...

[Closing line, accent color]
This is our promise. This is our purpose.          ← DM Sans italic gradientcyan text-sm
```

**Large decorative `"` quote mark:** `Bebas Neue text-[10rem] text-gradientcyan/15 absolute -top-8 -left-4 pointer-events-none select-none`

**Right Column — Species Tested Pills:**

```
┌──────────────────────────────────┐
│  RIGOROUSLY TESTED AGAINST:      │  ← Space Mono text-xs uppercase text-textMuted
│                                  │
│  [✓] Aedes aegypti               │  ← pill: bg-gradientpink/10 border-gradientpink/30
│       Dengue · Chikungunya       │
│                                  │
│  [✓] Anopheles stephensi         │  ← pill: bg-gradientyellow/10
│       Malaria                    │
│                                  │
│  [✓] Culex quinquefasciatus      │  ← pill: bg-gradientcyan/10
│       Filariasis                 │
│                                  │
│  [✓] All environments tested     │  ← pill: bg-white/5
│       Indoor & Outdoor           │
└──────────────────────────────────┘
```

**Pill Design:**
- `bg-accent/10 border border-accent/30 rounded-xl px-5 py-3`
- `✓` in accent color, `DM Sans font-medium text-white text-sm`
- Sub-disease: `Space Mono text-xs text-textMuted`

**Animations:**
- Quote text: word-by-word reveal, `staggerChildren: 0.03`
- Each species pill: stagger slide from right `staggerChildren: 0.12`
- `✓` icons: scale pop `[0, 1.3, 1]` spring, stagger with pills

---

### SECTION 4 — "OUR VALUES"

**Section Label:** `💡 WHAT WE STAND FOR`

**Section Heading:**
```
OUR
VALUES
```
`VALUES` in `gradient-yellow-cyan` text

**Layout:** Vertical accordion stack, `max-w-4xl mx-auto` (centered, narrower than other sections)

**Card Collapsed State:**

```
┌──────────────────────────────────────────────────────────────┐  ← animated-border
│  [Icon]   Scientifically Proven Protection    [expand +]     │
│           Tested. Trusted. Effective.                        │
│           [3px gradient top border, card's gradient]         │
└──────────────────────────────────────────────────────────────┘
```

- Icon: wrapped in `w-10 h-10 rounded-lg` with card's gradient at 20% opacity
- Title: `Bebas Neue text-2xl text-white`
- Tagline: `DM Sans italic text-sm text-textMuted`
- Expand icon: `ChevronDown`, `whileHover: { rotate: 180 }`, Framer `AnimatePresence` rotation

**Card Expanded State (Framer `motion.div height 0 → auto`):**

```
─────────────────────────────────────────────────────

[body paragraph — DM Sans text-sm text-textMuted leading-relaxed]

TWO NESTED ROWS:

┌─────────────────────────────────┐
│  🎯 MISSION                     │  ← Space Mono uppercase text-xs accent color
│  "To provide unparalleled..."   │  ← DM Sans text-sm text-white
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💥 IMPACT                      │  ← Space Mono uppercase text-xs accent color
│  "Customers gain peace..."      │  ← DM Sans text-sm text-textMuted
└─────────────────────────────────┘
```

**Mission/Impact sub-cards:**
- `bg-surface/60 border border-borderDefault rounded-xl p-4`
- `2-column grid gap-4 mt-4`

**Accordion state:** `useState(activeValue)` — one card open at a time (like disease page)

**Animations:**
- Cards stagger enter `staggerChildren: 0.15`
- Expand height: `initial: {height: 0, opacity: 0}` → `{height: 'auto', opacity: 1}`
- Mission/Impact rows stagger in after body text `staggerChildren: 0.1 delay: 0.2`
- Icon wobble `rotate: [0, -8, 8, 0]` spring when card opens

---

### SECTION 5 — "WHY CHOOSE MOSCURE"

**Section Label:** `⭐ THE DIFFERENCE`

**Section Heading:**
```
WHY CHOOSE
MOSCURE
```

**Layout:** 2×2 grid on desktop, 1-col on mobile

**Tile Design (`.animated-border`):**

```
┌────────────────────────────────────┐
│                                    │
│     [Large icon — gradient square] │
│     Slow decorative orbit ring     │
│     behind icon (CSS spin)         │
│                                    │
│     FAMILY FIRST                   │  ← Bebas Neue text-2xl text-white
│                                    │
│     Every decision we make         │  ← DM Sans text-sm text-textMuted
│     prioritizes the health...      │
│                                    │
└────────────────────────────────────┘
```

**Icon Block:**
- Icon: `w-8 h-8` in accent color
- Gradient square bg: `w-16 h-16 rounded-2xl` with tile's gradient at 20% opacity, `mx-auto mb-6`
- Orbit ring: `w-24 h-24 rounded-full border border-accent/20 absolute` centered behind icon, `animation: spin 12s linear infinite`

**Content:** Center-aligned within card

**Animations:**
- Tiles: `staggerChildren: 0.12` from bottom
- Icon square: `whileHover: { rotate: 10, scale: 1.1 }` spring
- Orbit ring: CSS `animation: spin` starts on tile enter

---

### SECTION 6 — "OUR COMMITMENT"

**Section Label:** `🤝 OUR PROMISE`

**Section Heading:**
```
OUR
COMMITMENT
```

**Layout:** 2-column on desktop — left: prose, right: 3 stat circles

**Left Column (prose):**

```
We are committed to continuous innovation and
improvement. Our research team works tirelessly
to enhance Moscure's effectiveness, ensuring it
remains the most advanced mosquito-catching
solution in India.

[separator line — gradient]

We believe that every family deserves protection
from mosquito-borne diseases. That's why we've
made Moscure accessible, reliable, and backed
by comprehensive customer support.
```

- `DM Sans text-base text-textMuted leading-loose`
- Separator: `h-px bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan my-6 opacity-30`

**Right Column — 3 Commitment Stat Circles:**

Each circle — `.animated-border` (circular variant: `border-radius: 9999px`):

```
      ╔══════════╗
     ║            ║   ← animated-border circular
     ║    100%    ║   ← Bebas Neue text-4xl accent color, count-up
     ║ SATISFACTION║   ← Space Mono text-xs uppercase text-textMuted
     ║  GUARANTEE ║
      ╚══════════╝
```

- `w-36 h-36 rounded-full` inner bg-surface
- Three circles arranged: large center (24/7), two flanking
- Or: 3-column row if preferred (simpler to implement)

**Alternate layout (simpler):** Horizontal row of 3 boxes, same `.animated-border` style as hero stats

**Animations:**
- Prose: lines stagger reveal from left `staggerChildren: 0.1`
- Stat circles: scale-in from `0.5` `staggerChildren: 0.15`
- Count-up on `whileInView`
- Circles: gentle pulse `scale: [1, 1.04, 1]` loop, each with offset timing

---

### SECTION 7 — "JOIN THE MOSCURE FAMILY" (CTA)

**Background:** Full-width dark section. Diagonal gradient overlay `gradientcyan → gradientpink` at 5% opacity. Subtle noise at 3%.

**Decorative:** Large faded `FAMILY` text behind content, `Bebas Neue text-[18vw] text-white/[0.025]`, centered

**Content (centered):**

```
[LABEL]   ❤ BECOME PART OF THE MISSION

[H2]      JOIN THE
          MOSCURE FAMILY     ← "FAMILY" in gradient-cyan-pink

[Body]    Experience the difference that advanced technology
          and genuine care can make in protecting
          your family from mosquito-borne disease.

[TRUST ROW — 3 inline pills]
  [ ✓ 100% Chemical-Free ]   [ ✓ Lab Tested ]   [ ✓ 24/7 Protection ]

[BUTTONS]
  [ VIEW PRODUCT → ]     [ CONTACT US ]
```

**Trust Row Pills:** `bg-surface border border-borderDefault rounded-full px-5 py-2`  
`DM Sans text-sm text-white` + `✓` in `gradientcyan`

**Primary Button:** Solid `gradientcyan`, rounded-full, `whileHover` glow  
**Secondary Button:** Ghost `border border-white/20`, hover `bg-white/5`

**Animations:**
- FAMILY watermark: `useScroll + useTransform` drifts upward as page scrolls to CTA
- Heading: stagger word reveal
- Trust pills: `staggerChildren: 0.08` pop-in `scale: [0, 1.1, 1]`
- Buttons: scale from `0.85` delay `0.6`
- `whileHover` primary: `boxShadow: 0 0 40px #00F5D450`

---

## 6. COMPONENT STRUCTURE (inside single file)

```jsx
// AboutPage.jsx

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  FlaskConical, Heart, BookOpen, Users, Cpu,
  ChevronDown, Target, Zap, Quote
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Static Data (all inline) ────────────────────────────────────
const STORY_CHAPTERS = [ ... ]
const VALUES_DATA    = [ ... ]
const WHY_CHOOSE     = [ ... ]
const COMMITMENT_STATS = [ ... ]

// ─── Sub-components (same file) ──────────────────────────────────

const TimelineChapter = ({ chapter, index, isEven }) => { ... }
// Story timeline chapter card — alternates left/right on desktop

const SpeciesPill = ({ name, disease, color, index }) => { ... }
// Mission section tested species pill

const ValueCard = ({ value, isOpen, onToggle }) => { ... }
// Accordion value card — expandable

const WhyTile = ({ item, index }) => { ... }
// Icon tile with orbit ring animation

const CommitmentStat = ({ stat, index }) => { ... }
// Animated stat circle/box

const TrustPill = ({ label, index }) => { ... }
// CTA trust pills

// ─── Page Component ──────────────────────────────────────────────
export default function AboutPage() {
  const [activeValue, setActiveValue] = useState('science') // default open
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const watermarkX = useTransform(scrollY, [0, 500], [0, -20])

  const toggleValue = (id) => {
    setActiveValue(prev => prev === id ? null : id)
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar />

      {/* SECTION 1 — Hero */}
      <section id="about-hero" ref={heroRef} className="min-h-screen ..."> ... </section>

      {/* SECTION 2 — Story */}
      <section id="story" className="..."> ... </section>

      {/* SECTION 3 — Mission */}
      <section id="mission" className="..."> ... </section>

      {/* SECTION 4 — Values */}
      <section id="values" className="..."> ... </section>

      {/* SECTION 5 — Why Choose */}
      <section id="why-choose" className="..."> ... </section>

      {/* SECTION 6 — Commitment */}
      <section id="commitment" className="..."> ... </section>

      {/* SECTION 7 — CTA */}
      <section id="join" className="..."> ... </section>

      <Footer />
    </div>
  )
}
```

---

## 7. NEW LUCIDE-REACT ICONS NEEDED

```js
import {
  FlaskConical,  // Value: Science
  Heart,         // Value: Family + WHY tile
  BookOpen,      // Value: Awareness
  Users,         // WHY tile: Trusted
  Cpu,           // WHY tile: Innovative Tech
  Target,        // Hero label / mission
  Quote,         // Mission section decorative
  ChevronDown,   // Value accordion expand
  Leaf,          // Optional: eco commitment
} from 'lucide-react'
```

---

## 8. CSS ADDITIONS (index.css)

```css
/* Scroll indicator bounce */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0);   opacity: 1;   }
  50%       { transform: translateY(8px); opacity: 0.5; }
}
.scroll-indicator {
  animation: scrollBounce 1.8s ease-in-out infinite;
}

/* Icon orbit ring */
@keyframes orbitSpin {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}
.orbit-ring {
  animation: orbitSpin 12s linear infinite;
  transform-origin: center;
}

/* Commitment stat pulse */
@keyframes statPulse {
  0%, 100% { transform: scale(1);    }
  50%       { transform: scale(1.04); }
}
.stat-pulse-1 { animation: statPulse 3s ease-in-out infinite; }
.stat-pulse-2 { animation: statPulse 3s ease-in-out 1s infinite; }
.stat-pulse-3 { animation: statPulse 3s ease-in-out 2s infinite; }
```

---

## 9. IMAGE / PLACEHOLDER CONVENTIONS (Page-Specific)

| Asset | Placeholder |
|---|---|
| Chapter 1 illustration | `aspect-video dashed border-gradientpink/30` label `[ The Problem — Illustration ]` |
| Chapter 2 illustration | Same, `border-gradientyellow/30`, label `[ The Idea — Lab / Tech Visual ]` |
| Chapter 3 illustration | Same, `border-gradientcyan/30`, label `[ The Mission — India Map / Family ]` |
| Team / founders photo | `aspect-video border-dashed border-gradientcyan/30` label `[ Team Photo ]` — Optional, add below Story if desired |
| About hero background texture | CSS grain/noise only, no image placeholder needed |

---

## 10. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 640px`) | Hero type `text-6xl`; timeline single-column left-edge; mission 1-col (species pills below quote); values accordion full-width; why-choose 1-col; commitment stats row 3-col compact; CTA stacked |
| Tablet (`640–1024px`) | Timeline zigzag but tighter; values max-w-full; why-choose 2×2; commitment 2-col |
| Desktop (`> 1024px`) | Full zigzag timeline; mission 2-col; commitment 2-col; full layout |

---

## 11. SECTION IDs (for Nav smooth scroll)

```
#about-hero    ← About hero
#story         ← The Moscure Story
#mission       ← Our Mission
#values        ← Our Values
#why-choose    ← Why Choose Moscure
#commitment    ← Our Commitment
#join          ← Join the Family CTA
```

---

## 12. KEY IMPLEMENTATION NOTES

- **Single file** — All section markup and sub-components inside `AboutPage.jsx`. Only `Navbar`, `Footer` imported.
- **Warmest page in the site** — Use slightly more `leading-loose` and `text-base` (not just `text-sm`) in body copy. Give sections more `py-24 md:py-36` breathing room than the product-focused pages.
- **Default open value card** — `useState('science')` so the first value is open on load. Prevents empty-looking accordion.
- **Timeline zigzag** — Use `index % 2 === 0` to determine left/right placement of chapter content. On mobile, always stack right.
- **Watermark text** — Two instances: `MOSCURE` in hero, `FAMILY` in CTA section. Both use `useScroll + useTransform` for parallax drift. Keep opacity extremely low (`2–3%`) to avoid visual noise.
- **Orbit ring** — Pure CSS `animation: orbitSpin`. Apply only on desktop (`hidden md:block`). On mobile, skip it — too much distraction on small screens.
- **`whileInView once: true`** — All scroll animations. Section label + heading enter together, then content stagger.
- **Value card default state** — First card (`science`) is open on mount. This gives the page visual weight immediately without requiring interaction.
- **No team/founders section** — Not included in the content brief. A placeholder div can be added between Story and Mission if the client wants to add it later: `{/* TODO: Team Section — add when photos available */}`.
