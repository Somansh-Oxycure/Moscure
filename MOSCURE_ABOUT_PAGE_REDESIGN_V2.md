# 🌍 MOSCURE — About Page Redesign Blueprint
**Version:** 2.0 (Redesign)
**Page:** `/about` — Beyond Business: A Public Health Responsibility
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS
**File:** `src/pages/AboutPage.jsx` — **SINGLE FILE, all sections inline**

> All global design tokens (colors, typography, spacing, animation patterns) inherit from
> `MOSCURE_LANDING_PAGE_REQUIREMENTS.md`. Page-specific additions documented here.

---

## 1. PAGE GOAL & TONE DIRECTION

This page is **not a product page**. It is a **manifesto**.

The content is written in a slow, reflective, journalistic voice — it builds tension, asks hard questions, and arrives at conviction. The design must honour that voice:

- **Long scroll, editorial pacing** — generous whitespace, text as the hero
- **Dark and cinematic** — like a documentary, not a brochure
- **Emotional weight before action** — the CTA form arrives only after the reader has been moved
- **Minimal decoration, maximum typography** — let the writing breathe; animations support, never distract

**Key design reference:** Think long-form essay layout — *The Atlantic* or *Aeon* — but dark-themed, with Moscure's neon accents used sparingly and deliberately as punctuation marks.

---

## 2. PAGE STRUCTURE (Single File)

```
AboutPage.jsx
  ├── <Navbar />
  │
  ├── SECTION 1: Opening — "The Acceptance"           ← Full-screen essay opener
  ├── SECTION 2: "The Shift" — Acceptance to Action   ← Pull quote + pivot
  ├── SECTION 3: "Rethinking the Problem"             ← The question that changed everything
  ├── SECTION 4: "When Innovation Became Responsibility" ← The mission deepens
  ├── SECTION 5: "A Commitment Beyond Business"       ← CSR / Values list
  ├── SECTION 6: "The Future We Are Building"         ← Vision statements
  ├── SECTION 7: CSR Initiatives                      ← 4 commitment pillars
  ├── SECTION 8: Contact / Help Form                  ← "Call us Now" — community form
  │
  └── <Footer />
```

---

## 3. PAGE-SPECIFIC ANIMATION STRATEGY

| Pattern | Where | Config |
|---|---|---|
| **Word-by-word opacity reveal** | All essay paragraphs | Each word: `opacity: 0 → 1`, `staggerChildren: 0.025`, triggered on `whileInView` — mimics reading speed |
| **Horizontal rule draw-in** | Section dividers (`---`) | `scaleX: 0 → 1`, `transformOrigin: left`, `duration: 1.0` |
| **Pull quote scale reveal** | "Why does protection have to come with side effects?" | `scale: 0.92 → 1` + `opacity: 0 → 1`, `duration: 0.8` |
| **Numbered chapter fade** | Chapter headings | `x: -30 → 0` + `opacity: 0 → 1` per chapter on enter |
| **Vision list stagger** | "No child sleeps..." bullets | Each line slides up `staggerChildren: 0.12` |
| **CSR pillar cards** | 4 commitment cards | `staggerChildren: 0.1` from bottom, `.animated-border` |
| **Form field reveal** | Contact form inputs | Each field fades in `staggerChildren: 0.08` after heading |
| **Accent line pulse** | Decorative accent lines | `opacity: [0.3, 1, 0.3]` breathe loop, 3s |
| **Scroll progress bar** | Fixed top of page | Thin `gradientcyan → gradientpink` bar fills as user scrolls — shows reading progress |

---

## 4. STATIC DATA

```js
// ─── All inline in AboutPage.jsx ─────────────────────────────────

const CHAPTERS = [
  {
    id: 'acceptance',
    number: '01',
    heading: 'Beyond Business',
    subheading: 'A Public Health Responsibility',
    accent: 'gradientpink',
  },
  {
    id: 'shift',
    number: '02',
    heading: 'The Shift',
    subheading: 'From Acceptance to Action',
    accent: 'gradientyellow',
  },
  {
    id: 'rethinking',
    number: '03',
    heading: 'Rethinking the Problem,',
    subheading: 'Not the Product',
    accent: 'gradientcyan',
  },
  {
    id: 'responsibility',
    number: '04',
    heading: 'When Innovation',
    subheading: 'Became Responsibility',
    accent: 'gradientpink',
  },
  {
    id: 'commitment',
    number: '05',
    heading: 'A Commitment',
    subheading: 'Beyond Business',
    accent: 'gradientyellow',
  },
  {
    id: 'future',
    number: '06',
    heading: 'The Future',
    subheading: 'We Are Building',
    accent: 'gradientcyan',
  },
];

const COMMITMENT_PILLARS = [
  {
    id: 1,
    icon: 'Megaphone',
    title: 'Creating Awareness',
    body: 'Raising awareness around mosquito-borne diseases in communities that need it most — before the outbreak, not after.',
    gradient: 'from-gradientpink to-gradientyellow',
  },
  {
    id: 2,
    icon: 'Leaf',
    title: 'Chemical-Free Living',
    body: 'Encouraging safer, chemical-free living environments across India — one home at a time.',
    gradient: 'from-gradientyellow to-gradientcyan',
  },
  {
    id: 3,
    icon: 'Users',
    title: 'Expanding Access',
    body: 'Expanding access to effective protection in underserved communities where mosquito-borne disease hits hardest.',
    gradient: 'from-gradientcyan to-gradientpink',
  },
  {
    id: 4,
    icon: 'HeartHandshake',
    title: 'Healthcare Partnerships',
    body: 'Supporting efforts that improve preventive health and hygiene through institutional partnerships and grassroots programs.',
    gradient: 'from-gradientpink via-gradientyellow to-gradientcyan',
  },
];

const CSR_INITIATIVES = [
  'Spreading awareness about mosquito-borne diseases in vulnerable communities',
  'Promoting chemical-free living environments',
  'Supporting access to safe protection in underserved areas',
  'Partnering with institutions to improve preventive healthcare',
];

const VISION_STATEMENTS = [
  { text: 'No child sleeps under the threat of mosquito-borne diseases', accent: 'gradientpink' },
  { text: 'No family depends on harmful chemicals for protection', accent: 'gradientyellow' },
  { text: 'No environment becomes unsafe after sunset', accent: 'gradientcyan' },
];
```

---

## 5. SECTION SPECIFICATIONS

---

### READING PROGRESS BAR (Global — Fixed)

**Position:** `fixed top-0 left-0 z-[60] h-0.5 w-full`

```jsx
// Uses useScroll + useTransform
const { scrollYProgress } = useScroll()
// scaleX from 0 → 1 tied to scroll progress

<motion.div
  className="fixed top-0 left-0 z-[60] h-0.5 origin-left
             bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan"
  style={{ scaleX: scrollYProgress }}
/>
```

Sits above the Navbar (z-60 vs Navbar z-50).

---

### SECTION 1 — Opening: "The Acceptance"

**Full viewport height hero, no product imagery — pure typography.**

**Background:**
- `#0A0A0A` solid
- Very subtle radial vignette: `gradientpink` at 4% opacity bleeding from top-right
- Faint grain noise at 3%
- Decorative: a single large mosquito SVG silhouette (same asset as Landing page), bottom-right, `opacity-[0.04]`, no animation

**Layout (centered, `max-w-3xl mx-auto px-6`):**

```
[CHAPTER NUMBER]  01

[HEADING]         BEYOND BUSINESS:
                  A PUBLIC HEALTH
                  RESPONSIBILITY

[RULE]            ─────────────────────  ← draw-in animation

[OPENING TEXT — essay style, word-by-word reveal]
```

**Chapter Number:**
- `Space Mono text-xs text-textMuted uppercase tracking-[0.3em]`
- e.g. `— 01 —`

**Heading:**
- `Bebas Neue text-6xl md:text-8xl text-white`
- "RESPONSIBILITY" gets a 3px gradient-pink underline (not text color — just a bottom border)
- Stagger: `staggerChildren: 0.07` per word

**Essay Text — 5 paragraphs (verbatim from content brief):**

```
There was always something unsettling about the way we lived
with mosquitoes.

Not the bites. Not the irritation. But the acceptance.

For something so small, mosquitoes have quietly remained one of
the most dangerous threats to human life — spreading diseases
like dengue, malaria, and chikungunya, affecting millions every year.

...

Somewhere along the way, a compromise became normal:
To protect ourselves from mosquitoes, we had to expose ourselves
to something else.

That never felt right.
```

**Typography:**
- `DM Sans text-lg md:text-xl text-white/85 leading-[1.9] max-w-2xl`
- Short punchy lines (e.g. "That never felt right.") get `text-white font-medium` for emphasis
- The phrase "a compromise became normal:" gets an inline `gradientpink` color highlight

**Word-by-word reveal:** Apply as Framer children on each paragraph's `motion.p`, words as `motion.span`. `staggerChildren: 0.025` per `whileInView` — feels like the reader's eyes are scanning.

**Animations:**
- Chapter number: fade `delay: 0`
- Heading words: stagger `delay: 0.2`
- Rule: draw-in `delay: 0.7`
- Paragraphs: each paragraph triggers on its own `whileInView` — NOT all at once

---

### SECTION 2 — "The Shift From Acceptance to Action"

**Background:** Same dark base. Subtle `gradientyellow` glow at 3% from left edge.

**Section Divider (between sections — reused throughout page):**
```
━━━  02  ━━━━━━━━━━━━━━━━━━━━━━━━━
```
- `Space Mono text-xs text-textMuted`
- Lines: `border-t border-borderDefault`, left label `— 02 —`
- `scaleX: 0 → 1` draw-in animation

**Chapter Heading:**
```
THE SHIFT
FROM ACCEPTANCE TO ACTION
```
- `Bebas Neue text-5xl md:text-7xl`
- "FROM ACCEPTANCE TO ACTION" in `gradientyellow`

**Pull Quote Block — the central visual anchor of this section:**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   "  Why does protection have to come                    │
│      with side effects?                            "     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Pull Quote Design:**
- `max-w-3xl mx-auto my-16`
- Left: large decorative `"` in `gradientyellow` at 30% opacity, `Bebas Neue text-[8rem] absolute -left-8 -top-8`
- Right: same closing `"`
- Quote text: `DM Sans text-2xl md:text-4xl text-white font-light italic leading-tight`
- Border: `.animated-border` wrapper (continuous gradient spin) — this is the ONE place on this editorial page where animated-border appears, making the pull quote feel alive
- Animation: `scale: 0.92 → 1`, `opacity: 0 → 1`, spring, on `whileInView`

**Essay continuation (word-by-word per paragraph):**

```
What started as curiosity quickly became something deeper.

This wasn't just a product problem. It was a gap in how we
approached everyday health and safety.

We realized that mosquito protection had always been treated
as a temporary fix — not as a problem worth solving completely.

And that realization changed everything.
```

- "And that realization changed everything." → `text-gradientyellow font-semibold` — feels like a chapter-closing beat

---

### SECTION 3 — "Rethinking the Problem, Not the Product"

**Chapter Heading:**
```
RETHINKING THE PROBLEM,
NOT THE PRODUCT
```
- `Bebas Neue text-5xl md:text-7xl`
- "NOT THE PRODUCT" in `gradientcyan`

**Two-column layout on desktop:**

**Left column (prose):**
```
We didn't set out to improve what already existed.
We stepped back.

Instead of asking "How do we repel mosquitoes better?"
we asked:
```

**Right column — the question, large and isolated:**
```
"How do we eliminate them —
safely, effectively,
and continuously?"
```
- `Bebas Neue text-3xl md:text-5xl text-gradientcyan`
- Slight left border: `border-l-2 border-gradientcyan pl-6`
- Slide in from right `x: 40 → 0` on `whileInView`

**Back to full-width prose:**
```
That question led to years of research, experimentation,
and refinement.

We studied mosquito behavior. We tested technologies.
We built, failed, rebuilt, and improved.

Not to create another option — but to create a different
approach entirely.
```

- "We built, failed, rebuilt, and improved." → Each word `text-white font-medium` — the rhythm of this line should be felt
- "a different approach entirely." → `gradientcyan` color

---

### SECTION 4 — "When Innovation Became Responsibility"

**Chapter Heading:**
```
WHEN INNOVATION
BECAME RESPONSIBILITY
```
- `BECAME RESPONSIBILITY` in `gradientpink`

**Special layout — this section has a "realization moment" visual:**

**Realization Strip (full-width, `bg-surface border-y border-borderDefault py-8 my-12`):**
```
   [left decorative line]   Mosquitoes are not a seasonal inconvenience.   [right decorative line]
                            They are a public health challenge.
```
- Centered text, `DM Sans text-xl md:text-2xl text-white font-medium`
- Decorative lines: `flex-1 border-t border-gradientpink/30`
- The strip has a subtle `gradientpink` glow on left and right edges

**Prose continues:**
```
And solving that comes with responsibility.

At Moscure, we began to see our role differently — not just
as innovators, but as contributors to a larger cause.

A cause where protection should not depend on awareness,
income, or access.
```

- "A cause where protection should not depend on awareness, income, or access." → Split into 3 lines, each line in slightly lighter gray, building a rhythm: `text-white/90`, `text-white/70`, `text-white/50` — fading like an echo

---

### SECTION 5 — "A Commitment Beyond Business"

**Chapter Heading:**
```
A COMMITMENT
BEYOND BUSINESS
```
- "BEYOND BUSINESS" in `gradientyellow`

**Prose + commitment list:**

```
Today, our work extends beyond products.

We are committed to:
```

**4 Commitment Pillars (grid `2×2` on desktop, `1-col` mobile):**

Each card — `.animated-border`:

```
┌──────────────────────────────────┐
│  [Icon in gradient square]       │
│                                  │
│  Creating Awareness              │  ← Bebas Neue text-xl
│                                  │
│  Raising awareness around        │  ← DM Sans text-sm text-textMuted
│  mosquito-borne diseases in      │
│  communities that need it most.  │
└──────────────────────────────────┘
```

**Closing line (centered, below cards):**

```
Because the real impact of protection is not measured in units sold —
but in risks reduced, and lives made safer.
```

- `DM Sans text-lg md:text-xl text-white/80 italic text-center max-w-2xl mx-auto mt-12`
- Animate: word stagger on `whileInView`, slightly slower (`staggerChildren: 0.04`)
- "risks reduced, and lives made safer." → `gradientyellow font-semibold not-italic`

---

### SECTION 6 — "The Future We Are Building"

**Chapter Heading:**
```
THE FUTURE
WE ARE BUILDING
```
- "WE ARE BUILDING" in `gradientcyan`

**Prose:**
```
We envision a world where:
```

**3 Vision Statements — displayed as large typographic lines:**

```
NO CHILD SLEEPS UNDER THE THREAT      ← Bebas Neue text-4xl md:text-6xl text-gradientpink
OF MOSQUITO-BORNE DISEASES            ← continues

NO FAMILY DEPENDS ON HARMFUL          ← text-gradientyellow
CHEMICALS FOR PROTECTION

NO ENVIRONMENT BECOMES UNSAFE         ← text-gradientcyan
AFTER SUNSET
```

**Design treatment:**
- Each vision is a full-width line block
- Left edge has a `4px` accent color border
- Each line separated by a subtle `border-b border-borderDefault/30`
- Animate: each line slides in from `x: -60 → 0` with `staggerChildren: 0.15`
- `whileHover`: line background lightens slightly, accent border brightens

**Closing statement (centered, after the 3 lines):**

```
A world where safety is not a compromise — but a given.
```

- `DM Sans text-2xl md:text-3xl text-white font-light italic`
- Centered, `max-w-2xl mx-auto mt-12`
- Animate: fade + scale from `0.95` on `whileInView`
- Decorative: thin `gradientcyan` underline animates width `0 → 100%` after text appears

---

### SECTION 7 — CSR Initiatives

**Background:** Full-width `bg-surface border-y border-borderDefault` strip — visually separates story from action

**Section Label:** `🤝 OUR CSR COMMITMENT`

**Section Heading:**
```
THROUGH OUR CSR
INITIATIVES
```

**4 Initiative rows (full-width list, not cards):**

```
┌──────────────────────────────────────────────────────────┐
│  ·  Spreading awareness about mosquito-borne diseases    │
│     in vulnerable communities                 [01]       │
├──────────────────────────────────────────────────────────┤
│  ·  Promoting chemical-free living environments          │
│                                               [02]       │
├──────────────────────────────────────────────────────────┤
│  ·  Supporting access to safe protection in              │
│     underserved areas                         [03]       │
├──────────────────────────────────────────────────────────┤
│  ·  Partnering with institutions to improve              │
│     preventive healthcare                     [04]       │
└──────────────────────────────────────────────────────────┘
```

**Row design:**
- `flex items-center justify-between py-5 border-b border-borderDefault`
- Left: `·` bullet in `gradientcyan`, `DM Sans text-base text-white`
- Right: `[01]` in `Space Mono text-xs text-textMuted`
- Row `whileHover`: `gradientcyan/5` background, `·` brightens, number slides right `x: 0 → 4`
- Animate: rows stagger in from left `staggerChildren: 0.1`

---

### SECTION 8 — Contact Form: "We'll Help You"

**This is the emotional climax of the page — design accordingly.**

**Background:** `bg-background`. Strong radial glow: `gradientcyan` at 8% + `gradientpink` at 6% from opposite corners — most dramatic glow on the page so far.

**Decorative:** Faint large text `PROTECT` watermark behind form, `text-white/[0.02] Bebas Neue text-[15vw]`

**Section Label:** `📞 REACH OUT`

**Two-column layout on desktop:**

---

**LEFT COLUMN — Emotional Copy:**

```
[SMALL LABEL]   Because no life should be lost
                due to lack of protection.

[H2]            IF THERE ARE
                PROBLEMS IN
                YOUR AREA      ← "YOUR AREA" in gradientcyan

[Body — paragraph, DM Sans text-lg text-white/80 leading-loose]
                If there are any problems in your area
                of mosquitoes, contact us.

                We'll help you and your loved ones
                be protected.

[EMPHASIS LINE — large]
                Call us Now.   ← Bebas Neue text-5xl text-gradientpink

[PHONE PLACEHOLDER]
                📞 +91 98765 43210   ← DM Sans text-2xl text-white font-medium
                                      hover: gradientcyan color transition

[PROMISE STRIP]
┌──────────────────────────────┐
│  ✓ We'll visit your area     │
│  ✓ Free assessment           │
│  ✓ No obligation             │
└──────────────────────────────┘
```

- Promise strip: `bg-surface border border-gradientcyan/20 rounded-xl p-4 mt-6`
- `✓` in `gradientcyan`, `DM Sans text-sm text-white`

---

**RIGHT COLUMN — Contact Form:**

```
┌────────────────────────────────────────┐  ← animated-border
│                                        │
│  [FORM HEADING]                        │
│  Get Protection For Your Area          │  ← DM Sans font-semibold text-white
│  We'll reach out within 24 hours.      │  ← text-textMuted text-sm
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Full Name *                     │  │  ← Input fields
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Phone Number *                  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Email Address                   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  City / Area *                   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Describe the mosquito problem   │  │  ← textarea, 4 rows
│  │  in your area...                 │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [SUBMIT BUTTON]                       │
│  [ CONTACT US — WE'LL HELP → ]         │  ← gradientcyan fill, full width
│                                        │
│  * We'll never share your details.     │  ← text-textMuted text-xs italic
└────────────────────────────────────────┘
```

**Form Card:** `.animated-border` wrapper, inner `bg-surface rounded-2xl p-8`

**Input Field Style:**
```css
.form-input {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  color: white;
  font-family: 'DM Sans';
  width: 100%;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #00F5D4;   /* gradientcyan */
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 245, 212, 0.1);
}
.form-input::placeholder {
  color: #8A8A8A;
  font-size: 0.875rem;
}
```

**Submit Button:** Full-width, `gradientcyan` solid fill, `text-background Bebas Neue text-xl tracking-wider`, rounded-xl, `whileHover: { scale: 1.02, boxShadow: '0 0 30px rgba(0, 245, 212, 0.4)' }`

**Form field labels:** `Space Mono text-xs uppercase text-textMuted tracking-wider mb-1`

**Form Animations:**
- Form card: slides in from right `x: 60 → 0` on `whileInView`
- Each input field: `staggerChildren: 0.08` fade + slide from `y: 10 → 0`
- Left copy: slides from left `x: -40 → 0`
- Submit button: scales from `0.95` last, `delay: 0.5`

**Note:** Form is UI-only (no backend). `onSubmit` handler can call `e.preventDefault()` and show a success state:

```jsx
// Success state (replaces form)
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="text-center py-12"
>
  <div className="text-gradientcyan text-6xl mb-4">✓</div>
  <p className="Bebas Neue text-3xl text-white">Thank You!</p>
  <p className="DM Sans text-textMuted mt-2">
    We've received your message. Our team will reach out within 24 hours.
  </p>
</motion.div>
```

---

## 6. SECTION TRANSITIONS (Page-Wide)

Between each section, use a consistent **section divider component:**

```jsx
const SectionDivider = ({ number, accent = 'gradientcyan' }) => (
  <div className="flex items-center gap-4 max-w-3xl mx-auto px-6 my-16">
    <motion.div
      className="flex-1 border-t border-borderDefault"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ transformOrigin: 'left' }}
    />
    <span className={`Space Mono text-xs text-${accent} uppercase tracking-[0.3em]`}>
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
```

---

## 7. COMPONENT STRUCTURE (Single File)

```jsx
// AboutPage.jsx

import { useState, useRef } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring
} from 'framer-motion'
import {
  Megaphone, Leaf, Users, HeartHandshake,
  Phone, ChevronRight, CheckCircle2
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Static Data ─────────────────────────────────────────────────
const CHAPTERS           = [ ... ]
const COMMITMENT_PILLARS = [ ... ]
const CSR_INITIATIVES    = [ ... ]
const VISION_STATEMENTS  = [ ... ]

// ─── Utilities ───────────────────────────────────────────────────
const WordReveal = ({ text, className, stagger = 0.025, delay = 0 }) => {
  // Splits text into words, wraps each in motion.span
  // Used throughout ALL essay paragraphs
}

// ─── Sub-components ──────────────────────────────────────────────
const SectionDivider = ({ number, accent }) => { ... }
const PullQuote      = ({ text })           => { ... }
const VisionLine     = ({ text, accent, index }) => { ... }
const PillarCard     = ({ pillar, index })  => { ... }
const CSRRow         = ({ text, number, index }) => { ... }
const ContactForm    = ()                   => {
  const [submitted, setSubmitted] = useState(false)
  // form state, handleSubmit
}

// ─── Page ────────────────────────────────────────────────────────
export default function AboutPage() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="bg-background text-textPrimary min-h-screen">

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-[60] h-0.5 origin-left
                   bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      <section id="opening">  ...  </section>
      <SectionDivider number="02" accent="gradientyellow" />

      <section id="shift">    ...  </section>
      <SectionDivider number="03" accent="gradientcyan" />

      <section id="rethink">  ...  </section>
      <SectionDivider number="04" accent="gradientpink" />

      <section id="responsibility"> ... </section>
      <SectionDivider number="05" accent="gradientyellow" />

      <section id="commitment"> ... </section>
      <SectionDivider number="06" accent="gradientcyan" />

      <section id="future">   ...  </section>

      <section id="csr">      ...  </section>

      <section id="contact">  ...  </section>

      <Footer />
    </div>
  )
}
```

---

## 8. TYPOGRAPHY RULES (Page-Specific)

This page has stricter typographic rules than others — it's editorial:

| Element | Style |
|---|---|
| Chapter number | `Space Mono text-xs tracking-[0.3em] text-textMuted uppercase` |
| Chapter heading | `Bebas Neue text-5xl md:text-7xl lg:text-8xl` |
| Chapter subheading accent word | Chapter's accent color (Pink/Yellow/Cyan rotates per chapter) |
| Essay body | `DM Sans text-lg md:text-xl text-white/85 leading-[1.9] max-w-2xl` |
| Emphasis lines (short punchy) | `DM Sans text-xl text-white font-medium` |
| Pull quote | `DM Sans text-2xl md:text-4xl text-white font-light italic` |
| Vision statements | `Bebas Neue text-4xl md:text-6xl` in accent color |
| Closing lines | `DM Sans text-2xl font-light italic text-white` |
| Form labels | `Space Mono text-xs uppercase tracking-wider text-textMuted` |
| Form inputs | `DM Sans text-base text-white` |

**Max width for essay text:** `max-w-2xl mx-auto px-6` — narrower than other pages. Long-form reading comfort.

---

## 9. CSS ADDITIONS (index.css)

```css
/* Reading progress bar — handled via Framer, no extra CSS needed */

/* Essay paragraph word-reveal — handled via Framer motion.span */

/* Realization strip glow edges */
.realization-strip {
  position: relative;
}
.realization-strip::before,
.realization-strip::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
}
.realization-strip::before {
  left: 0;
  background: linear-gradient(to right, rgba(255, 77, 109, 0.15), transparent);
}
.realization-strip::after {
  right: 0;
  background: linear-gradient(to left, rgba(255, 77, 109, 0.15), transparent);
}

/* Vision line hover */
.vision-line:hover {
  background: rgba(255, 255, 255, 0.02);
}

/* Form input focus glow */
.form-input:focus {
  border-color: #00F5D4;
  box-shadow: 0 0 0 3px rgba(0, 245, 212, 0.1);
}
```

---

## 10. RESPONSIVE BEHAVIOR

| Breakpoint | Key Changes |
|---|---|
| Mobile (`< 640px`) | Essay max-width full; chapter headings `text-4xl`; pull quote `text-xl`; section 3 single column; vision lines `text-3xl`; form full-width stacked below copy |
| Tablet (`640–1024px`) | Section 3 side-by-side but tighter; commitment cards 2×2; CSR rows full-width |
| Desktop (`> 1024px`) | Max container `max-w-4xl` for essay sections (wider than typical `max-w-2xl` body, narrower than `max-w-7xl` product pages) |

---

## 11. SECTION IDs

```
#opening         ← "The Acceptance"
#shift           ← "From Acceptance to Action"
#rethink         ← "Rethinking the Problem"
#responsibility  ← "When Innovation Became Responsibility"
#commitment      ← "A Commitment Beyond Business"
#future          ← "The Future We Are Building"
#csr             ← CSR Initiatives
#contact         ← Contact Form
```

---

## 12. KEY IMPLEMENTATION NOTES

- **`WordReveal` component is the backbone of this page.** Build it first, test it, then apply it to every paragraph. It should accept `text`, `className`, `stagger`, `delay` props and split by whitespace.
- **`whileInView once: true` on every element** — margin `"-60px"`. Since this is a long scroll page, aggressive early triggering feels more natural.
- **Reading progress bar** — use `useSpring(scrollYProgress, { stiffness: 400, damping: 90 })` for a smooth, slightly lagged fill that feels physical.
- **Form is static / UI-only** — `useState({ name, phone, email, city, problem })` + `useState(false)` for submitted state. No fetch call. On submit: `e.preventDefault()`, `setSubmitted(true)`, animate success state in.
- **`.animated-border`** appears ONLY on: the pull quote block, the 4 commitment pillar cards, and the contact form card. Everywhere else, keep it clean. This restraint makes those three elements feel more special.
- **The `WordReveal` stagger timing matters:** `0.025s` for body text feels natural. `0.04s` for the closing "a world where safety is not a compromise" line feels more deliberate. `0.06s` for the pull quote feels weighty.
- **No team photos, no founders** — content doesn't mention them. Don't add placeholders that suggest they're coming if they may not.
- **Page title:** `<title>Our Story | Moscure — Beyond Business</title>`
- **Navbar active state:** `ABOUT US` highlighted when on this page.
- **This page should feel slow and intentional on purpose** — resist adding too many simultaneous animations. The essay voice demands restraint. One thing animates at a time.
