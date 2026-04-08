# 🦟 MOSCURE — Diseases Page Blueprint
**Version:** 1.0  
**Page:** `/diseases` — Mosquito-Borne Diseases  
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS  
**File:** `src/pages/DiseasesPage.jsx` — **SINGLE FILE, all sections inline**

> All global design tokens (colors, typography, spacing, animation patterns) inherit from  
> `MOSCURE_LANDING_PAGE_REQUIREMENTS.md`. Only page-specific additions are documented here.

---

## 1. PAGE GOAL

Educate visitors on the severity of mosquito-borne diseases in India. Use urgency, data, and storytelling to build emotional resonance — then channel that into a clear action: buy Moscure. Every section should feel like a warning and a solution simultaneously.

---

## 2. PAGE STRUCTURE (Single File)

```
DiseasesPage.jsx
  ├── <Navbar />                          ← Shared import
  │
  ├── SECTION 1: Hero Alert Banner        ← Full-screen opening
  ├── SECTION 2: Disease Cards           ← 4 expandable disease entries
  ├── SECTION 3: Protection Steps        ← "How to Protect Your Family"
  ├── SECTION 4: CTA Banner              ← "Don't Wait for an Outbreak"
  │
  └── <Footer />                         ← Shared import
```

---

## 3. PAGE-SPECIFIC ANIMATION ADDITIONS

| Pattern | Where | Config |
|---|---|---|
| **Alert pulse ring** | Hero badge "CRITICAL ALERT" | CSS `@keyframes alertPulse` — expanding ring at `gradientpink`, 2s infinite |
| **Stat counter** | Hero 3 stats | `useMotionValue` + `animate()` count-up on mount |
| **Disease card accordion** | Section 2 cards | Framer `AnimatePresence` height expand, `staggerChildren` on sub-items |
| **Progress bar fill** | Affected regions bar | Width `0 → %` on viewport enter, `duration: 1.2` |
| **Danger level indicator** | Each disease card header | Animated fill bar left→right on card expand |
| **Stagger list reveal** | Symptoms, prevention lists | `staggerChildren: 0.06` per list item, slide from left |
| **Alert ticker** | Below hero | CSS marquee, red/pink text, repeating warning message |
| **Protection step icons** | Section 3 | Sequential reveal — each step enters after previous, `delay: index * 0.15` |
| **Background scan line** | Full page subtle | CSS `repeating-linear-gradient` horizontal lines at 2% opacity, very subtle |

---

## 4. STATIC DATA

```js
// All data lives inside DiseasesPage.jsx (no external import needed)

const HERO_STATS = [
  { stat: 40, suffix: 'M+', label: 'Cases Annually in India', color: 'gradientpink' },
  { stat: 3000, suffix: '+',  label: 'Deaths Each Year',        color: 'gradientyellow' },
  { stat: 100, suffix: '%',  label: 'Preventable with Protection', color: 'gradientcyan' },
];

const DISEASES_DATA = [
  {
    id: 'dengue',
    name: 'Dengue Fever',
    mosquito: 'Aedes aegypti',
    biteTime: 'Daytime biter',
    dangerLevel: 85,           // percentage for danger bar
    accentColor: 'gradientpink',
    borderGradient: 'from-gradientpink to-gradientyellow',
    keyFact: `Dengue is a leading cause of serious illness and death in some Asian and Latin 
      American countries. In India, millions are at risk annually, with outbreaks peaking 
      during monsoon season. A single bite can be deadly. Moscure protects day and night.`,
    symptoms: [
      'High fever & severe headache',
      'Pain behind the eyes',
      'Joint and muscle pain',
      'Fatigue, nausea, vomiting',
      'Skin rash',
      'Severe cases: plasma leakage, bleeding, organ impairment',
    ],
    affectedRegions: [
      { name: 'Delhi NCR', severity: 90 },
      { name: 'Mumbai', severity: 85 },
      { name: 'Uttar Pradesh', severity: 80 },
      { name: 'West Bengal', severity: 75 },
      { name: 'Maharashtra', severity: 78 },
    ],
    prevention: [
      'Eliminate stagnant water in pots, tires, and coolers',
      'Use mosquito repellents and wear protective clothing',
      'Ensure windows and doors have screens',
      'Moscure targets all disease-carrying mosquitoes indoors and outdoors',
    ],
    urgencyTag: '⚠ MONSOON SEASON PEAK',
  },
  {
    id: 'malaria',
    name: 'Malaria',
    mosquito: 'Anopheles',
    biteTime: 'Dusk & dawn biter',
    dangerLevel: 78,
    accentColor: 'gradientyellow',
    borderGradient: 'from-gradientyellow to-gradientcyan',
    keyFact: `Malaria, caused by Plasmodium parasites, remains a significant public health 
      challenge in India. Over 1.5 million cases are still reported annually. Children and 
      pregnant women are particularly vulnerable. Choose proven protection for your family.`,
    symptoms: [
      'Fever, chills, and sweating',
      'Severe headache',
      'Nausea and vomiting',
      'Body aches and general malaise',
      'Severe cases: organ failure, seizures, coma',
      'Can be fatal if untreated',
    ],
    affectedRegions: [
      { name: 'Odisha', severity: 92 },
      { name: 'Chhattisgarh', severity: 88 },
      { name: 'Jharkhand', severity: 85 },
      { name: 'Madhya Pradesh', severity: 80 },
      { name: 'North-East States', severity: 76 },
    ],
    prevention: [
      'Use insecticide-treated bed nets',
      'Spray insecticides indoors',
      'Eliminate mosquito breeding sites',
      'Avoid outdoor activity during dusk and dawn',
      'Moscure provides continuous protection when Anopheles are most active',
    ],
    urgencyTag: '⚠ 1.5M CASES ANNUALLY',
  },
  {
    id: 'chikungunya',
    name: 'Chikungunya',
    mosquito: 'Aedes aegypti & Aedes albopictus',
    biteTime: 'Daytime biter',
    dangerLevel: 65,
    accentColor: 'gradientcyan',
    borderGradient: 'from-gradientcyan to-gradientpink',
    keyFact: `Chikungunya has seen recurrent outbreaks in India. While rarely fatal, its 
      debilitating joint pain can persist for months or years, severely impacting quality 
      of life. Many survivors are unable to perform daily tasks. Moscure helps prevent 
      this suffering.`,
    symptoms: [
      'Sudden onset fever',
      'Severe joint pain in hands and feet',
      'Headache and muscle pain',
      'Joint swelling and rash',
      'Long-lasting joint pain distinguishes it from other diseases',
      'Chronic pain lasting months to years',
    ],
    affectedRegions: [
      { name: 'Karnataka', severity: 82 },
      { name: 'Maharashtra', severity: 78 },
      { name: 'Andhra Pradesh', severity: 75 },
      { name: 'Tamil Nadu', severity: 70 },
      { name: 'Kerala', severity: 68 },
    ],
    prevention: [
      'Use repellents and wear long sleeves',
      'Stay in screened or air-conditioned areas',
      'Remove all potential breeding grounds near your home',
      'Moscure targets both Aedes species for complete protection',
    ],
    urgencyTag: '⚠ RECURRENT OUTBREAKS',
  },
  {
    id: 'japanese-encephalitis',
    name: 'Japanese Encephalitis',
    mosquito: 'Culex',
    biteTime: 'Night biter',
    dangerLevel: 95,
    accentColor: 'gradientpink',
    borderGradient: 'from-gradientpink via-gradientyellow to-gradientcyan',
    keyFact: `Japanese Encephalitis is a serious viral brain infection with a 20–30% fatality 
      rate. 30–50% of survivors suffer permanent neurological or psychiatric damage. This 
      silent threat can devastate entire families. Moscure offers a crucial line of defense 
      against Culex mosquitoes, active at night.`,
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
      { name: 'Bihar', severity: 88 },
      { name: 'Assam', severity: 82 },
      { name: 'West Bengal', severity: 78 },
      { name: 'Tamil Nadu', severity: 65 },
    ],
    prevention: [
      'Vaccination is key in endemic areas',
      'Use mosquito nets treated with insecticide',
      'Eliminate breeding sites near rice paddies and pig farms',
      'Culex mosquitoes are active at night — Moscure's 24/7 protection is vital',
    ],
    urgencyTag: '💀 20–30% FATALITY RATE',
  },
];

const PROTECTION_STEPS = [
  {
    step: '01',
    icon: 'ShieldCheck',
    title: 'USE MOSCURE',
    description: 'Install Moscure devices in key areas of your home and garden to catch mosquitoes before they ever get the chance to bite.',
    highlight: 'Chemical-free. Always on. Always protecting.',
    color: 'gradientcyan',
  },
  {
    step: '02',
    icon: 'Droplets',
    title: 'ELIMINATE BREEDING',
    description: 'Remove standing water from containers, pots, coolers, and drains regularly. Mosquitoes need just a bottle cap of water to breed.',
    highlight: 'Weekly checks save lives.',
    color: 'gradientyellow',
  },
  {
    step: '03',
    icon: 'Activity',
    title: 'EARLY DETECTION',
    description: 'Seek medical attention immediately if you or a family member experience sudden fever, joint pain, or any suspicious symptoms.',
    highlight: 'Hours matter. Don\'t delay.',
    color: 'gradientpink',
  },
  {
    step: '04',
    icon: 'Bell',
    title: 'STAY INFORMED',
    description: 'Monitor local health advisories and outbreak reports in your area. Stay ahead of seasonal disease spikes, especially during monsoon.',
    highlight: 'Knowledge is protection.',
    color: 'gradientcyan',
  },
];
```

---

## 5. SECTION SPECIFICATIONS

---

### SECTION 1 — Hero Alert Banner

**Background:** `#0A0A0A` base with a dramatic radial glow — `gradientpink` at 8% opacity from top-center, bleeding downward. Subtle scan-line texture overlay at 3% opacity.

**Top Alert Badge (centered):**
```
[⚠ CRITICAL HEALTH ALERT]
```
- Pill badge: `bg-gradientpink/10 border border-gradientpink/50 text-gradientpink`
- `Space Mono uppercase text-sm tracking-widest`
- Animated pulse ring: expanding circle behind badge, `gradientpink` at 20% opacity, `@keyframes alertPulse` infinite 2s

**Hero Heading (centered):**
```
MOSQUITO-BORNE
DISEASES           ← "DISEASES" with gradient-pink-yellow text
```
- `Bebas Neue`, massive — `text-7xl md:text-9xl`
- Word-stagger slide-up on mount

**Subtext (centered, max-w-2xl):**
> Every year, millions of Indians are affected by mosquito-borne diseases. Understanding these threats is the first step to protecting your family.

**Stat Row (3 columns, centered, `mt-16`):**

Each stat box — `bg-surface/60 border border-borderDefault rounded-2xl px-8 py-6`:
```
40M+                  ← Bebas Neue text-5xl, accent color, count-up animation
Cases Annually        ← Space Mono text-xs uppercase text-textMuted
in India
```

**Animations:**
- Badge fades in first, `delay: 0`
- Heading words stagger `delay: 0.2`
- Subtext fades `delay: 0.6`
- Stat boxes stagger scale-in `delay: 0.8, staggerChildren: 0.15`
- Count-up runs after boxes appear

**Alert Ticker (below stats, full-width strip):**
```
⚠ DENGUE IS ACTIVE IN YOUR CITY  ·  40M+ CASES IN INDIA EVERY YEAR  ·  PROTECT YOUR FAMILY NOW  ·  ...repeats
```
- `bg-gradientpink/10 border-y border-gradientpink/20`
- `Space Mono text-xs text-gradientpink uppercase`
- CSS `animation: marquee 25s linear infinite`

---

### SECTION 2 — Disease Cards (Expandable Accordion)

**Layout:** Vertical stack — one card per disease, full-width (max-w-5xl centered)

**Card Default State (Collapsed):**

```
┌─────────────────────────────────────────────────────────┐  ← animated-border
│  [URGENCY TAG]           [MOSQUITO SPECIES]  [EXPAND +] │
│                                                         │
│  Dengue Fever                    ←── Bebas Neue text-4xl│
│                                                         │
│  Aedes aegypti · Daytime biter   ←── Space Mono muted   │
│                                                         │
│  [DANGER LEVEL BAR ████████░░ 85%]                      │
│   DANGER LEVEL                                          │
└─────────────────────────────────────────────────────────┘
```

**Danger Level Bar:**
- Label: `Space Mono text-xs uppercase text-textMuted`
- Track: `bg-borderDefault h-1.5 rounded-full w-full`
- Fill: gradient (`from-gradientpink to-gradientyellow`), animates width `0 → 85%` on enter
- Percentage shown right-aligned in accent color

**Expand Button (`+` / `−`):**
- Top-right of card
- `whileHover: { rotate: 90 }` on the `+` icon
- Framer `AnimatePresence` rotates to `−` when open

---

**Card Expanded State:**

Framer `motion.div` with `initial: {height: 0, opacity: 0}` → `animate: {height: 'auto', opacity: 1}`

Expanded content uses a 2-column layout:

**Left Column — Symptoms & Key Fact:**
```
[SECTION MINI-LABEL]  KEY FACTS

[keyFact paragraph]   ← DM Sans text-sm text-textMuted

─────────────────────

[SECTION MINI-LABEL]  SYMPTOMS

• High fever & severe headache     ← stagger-in list items
• Pain behind the eyes             ← each with accent color bullet
• Joint and muscle pain
• ...
```

**Right Column — Affected Regions & Prevention:**
```
[SECTION MINI-LABEL]  AFFECTED REGIONS

Delhi NCR      ████████████░░  90%   ← animated progress bars
Mumbai         ███████████░░░  85%
Uttar Pradesh  ██████████░░░░  80%
...

─────────────────────

[SECTION MINI-LABEL]  PREVENTION

✓ Eliminate stagnant water sources   ← stagger-in with ✓ icons
✓ Use repellents and screens
✓ Moscure targets all vectors        ← this item highlighted in accent color
```

**Bottom of expanded card — Moscure callout strip:**
```
┌────────────────────────────────────────────────────┐
│  🛡  Moscure protects against [Disease Name]       │
│      Our UV trap targets [mosquito species]        │
│      specifically. Chemical-free. Always on.       │
└────────────────────────────────────────────────────┘
```
- `bg-gradientcyan/5 border border-gradientcyan/20 rounded-xl p-4`
- Shield icon in `gradientcyan`
- Small `[View Product →]` link in `gradientcyan`

**Accordion Behavior:**
- Only one card can be open at a time
- Click open card header to collapse
- `useReducer` or `useState(activeId)` pattern
- Cards are spaced with `gap-4`, not flush

**Animations (per card):**
- Card enters from bottom, `staggerChildren: 0.15` across all 4 cards
- Danger bar fills on card enter (not on expand)
- Expanded content: list items stagger `staggerChildren: 0.06` from left
- Progress bars fill sequentially `staggerChildren: 0.1`
- Moscure callout strip fades in last `delay: 0.4` after expand

---

### SECTION 3 — Protection Steps

**File section label:** `🛡 YOUR DEFENSE PLAN`

**Section Heading:**
```
HOW TO PROTECT
YOUR FAMILY
```
- `Bebas Neue text-6xl md:text-7xl`
- "FAMILY" in `gradient-cyan-pink` text

**Subtext:** *(none needed — heading is clear)*

**Layout:** 2×2 grid on desktop, single column on mobile

**Step Card Design:**

```
┌────────────────────────────────────────┐
│  [01]              [Icon circle]       │
│  Space Mono                            │
│                                        │
│  USE MOSCURE        ← Bebas Neue 2xl   │
│                                        │
│  Install Moscure devices in key areas  │
│  of your home...    ← DM Sans text-sm  │
│                                        │
│  ──────────────────                    │
│  Chemical-free. Always on.             │
│  ← italic DM Sans text-xs accent color │
└────────────────────────────────────────┘
```

**Step Number:** `Space Mono text-xs text-textMuted` top-left  
**Icon Circle:** `w-12 h-12 rounded-full` with accent color at 15% bg, icon in accent color  
**Divider:** `border-t border-borderDefault/50`  
**Highlight text:** `italic text-xs` in card's `color` accent  

**Cards:** `.animated-border` on all 4

**Step 01 (USE MOSCURE)** has a subtly different treatment:
- Slightly larger card padding
- Inner `bg-gradientcyan/5` tint
- Small `[Install Now →]` link at bottom in `gradientcyan`

**Animations:**
- Section heading: stagger word reveal
- Cards: sequential entry (not simultaneous stagger) — each card enters after previous finishes `delay: index * 0.2`
- Icon circles: `whileHover: { rotate: 15, scale: 1.1 }` spring
- Highlight text: fades in separately `delay: 0.3` after card text

---

### SECTION 4 — CTA Banner

**Background:** Full-width dark section  
- Diagonal `conic-gradient` overlay at 6% opacity (`gradientpink` → `gradientcyan`)
- Subtle noise texture layer at 4%
- Decorative: large faded `⚠` warning symbol centered behind content, `text-white/3`, `text-[30rem]`

**Content (centered):**

```
[LABEL]   ⏰ ACT NOW — DON'T WAIT

[H2]      DON'T WAIT FOR
          AN OUTBREAK

[Body]    Protect your family today with Moscure.
          Prevention is always better than cure.

[CTAs]    [VIEW PRODUCT →]    [CONTACT US]
```

**Heading Style:**
- `Bebas Neue text-6xl md:text-8xl text-white`
- "OUTBREAK" — `gradientpink` text with glow `text-shadow: 0 0 40px #FF4D6D60`

**CTA Buttons:**
- `VIEW PRODUCT →` — solid `gradientcyan`, `text-background font-bold`, rounded-full
- `CONTACT US` — ghost, `border border-white/20`, hover fills with `white/10`

**Bottom micro-text:**
```
Join 10,000+ Indian families already protected by Moscure.
```
- `DM Sans text-xs text-textMuted italic`

**Animations:**
- Giant `⚠` watermark: very slow rotate `animate: { rotate: 360 }`, duration `120s`, linear, infinite — barely perceptible
- Heading: stagger word reveal on viewport enter
- Buttons: scale in from `0.8` `delay: 0.5`
- `whileHover` on primary button: glow shadow `0 0 30px gradientcyan at 50%`

---

## 6. COMPONENT STRUCTURE (inside single file)

```jsx
// DiseasesPage.jsx

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { ShieldCheck, Droplets, Activity, Bell, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Static Data (inline) ────────────────────────────────────────
const HERO_STATS = [ ... ]
const DISEASES_DATA = [ ... ]
const PROTECTION_STEPS = [ ... ]

// ─── Sub-components (all in same file) ───────────────────────────

const AlertTicker = () => { ... }

const StatBox = ({ stat, suffix, label, color, index }) => { ... }
// Uses useMotionValue + animate() for count-up

const DangerBar = ({ level, color }) => { ... }
// Animated width fill on whileInView

const RegionBar = ({ name, severity, color, index }) => { ... }
// Progress bar with stagger delay

const DiseaseCard = ({ disease, isOpen, onToggle }) => { ... }
// Accordion card with AnimatePresence expansion

const ProtectionStepCard = ({ step, index }) => { ... }
// Animated step card

// ─── Page Component ──────────────────────────────────────────────
export default function DiseasesPage() {
  const [activeDisease, setActiveDisease] = useState(null)

  const toggleDisease = (id) => {
    setActiveDisease(prev => prev === id ? null : id)
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar />

      {/* SECTION 1 — Hero */}
      <section id="hero" className="..."> ... </section>

      {/* SECTION 2 — Diseases */}
      <section id="diseases" className="..."> ... </section>

      {/* SECTION 3 — Protection Steps */}
      <section id="protection" className="..."> ... </section>

      {/* SECTION 4 — CTA */}
      <section id="cta" className="..."> ... </section>

      <Footer />
    </div>
  )
}
```

---

## 7. NEW LUCIDE-REACT ICONS NEEDED

```js
import {
  ShieldCheck,   // Protection step 01
  Droplets,      // Protection step 02
  Activity,      // Protection step 03
  Bell,          // Protection step 04
  ChevronDown,   // Disease card expand
  ChevronUp,     // Disease card collapse
  AlertTriangle, // Hero badge, ticker
  Shield,        // Moscure callout strip
} from 'lucide-react'
```

---

## 8. CSS ADDITIONS (index.css)

```css
/* Alert pulse ring — hero badge */
@keyframes alertPulse {
  0%   { transform: scale(1);   opacity: 0.4; }
  70%  { transform: scale(2.2); opacity: 0;   }
  100% { transform: scale(2.2); opacity: 0;   }
}
.alert-pulse::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 2px solid #FF4D6D;
  animation: alertPulse 2s ease-out infinite;
}

/* Scan-line texture — full page */
.scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.015) 2px,
    rgba(255,255,255,0.015) 4px
  );
  pointer-events: none;
}
```

---

## 9. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 640px`) | Stats 1×3 column stack; disease card regions bar hidden (show as text list); protection steps 1-col; CTA heading `text-4xl` |
| Tablet (`640–1024px`) | Stats row 3-col compact; disease cards full-width; protection 2×2 |
| Desktop (`> 1024px`) | Full layout; disease expanded cards 2-col; stats prominent row |

---

## 10. SECTION IDs (for Nav smooth scroll)

```
#hero         ← Hero alert banner
#diseases     ← Disease accordion cards
#protection   ← Protection steps
#cta          ← Don't Wait CTA
```

---

## 11. KEY IMPLEMENTATION NOTES

- **Single file** — All section markup lives inside `DiseasesPage.jsx`. Sub-components like `DiseaseCard`, `StatBox`, `DangerBar` are defined in the same file above the default export. No imports from other section files.
- **Accordion state** — `useState(null)` for `activeDisease` (stores ID string). `AnimatePresence` wraps the expanded content. `mode="wait"` ensures smooth transition.
- **Count-up animation** — Reuse the same `useMotionValue` + `animate()` pattern from Landing Page `DiseasesSection`. Run on component mount (not `whileInView`) since hero is always visible on load.
- **`.animated-border`** — Applied to all disease cards, all protection step cards. Same CSS mixin from Landing Page blueprint.
- **`whileInView once: true`** — All non-hero animations use this. Set `margin: "-80px"` to trigger slightly before full entry.
- **Disease card default open** — Consider setting `useState('dengue')` as default so the first card starts open, showing users what to expect from the interaction.
- **Moscure mentions** — Each disease card's prevention section ends with a Moscure-specific point (already in data). The Moscure callout strip at the bottom of each expanded card reinforces the product link without being heavy-handed.
- **Page title / meta** — Add `<title>Mosquito-Borne Diseases in India | Moscure</title>` in `index.html` or via a `useEffect` document.title setter in the page component.
