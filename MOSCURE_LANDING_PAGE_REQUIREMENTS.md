# 🦟 MOSCURE — Landing Page Blueprint
**Version:** 1.0  
**Type:** Static Landing Page  
**Stack:** React + Vite · ShadCN UI · Framer Motion · Tailwind CSS

---

## 1. PROJECT OVERVIEW

| Field | Detail |
|---|---|
| **Product** | Moscure UV LED Mosquito Trap |
| **Tagline** | "Kane Machar Ki Chutti" |
| **Primary Goal** | Showcase the product, educate on mosquito-borne diseases, convert visitors to buyers |
| **Target Audience** | Indian families, health-conscious homeowners, parents with young children |
| **Tone** | Bold · Scientific · Trustworthy · Slightly Aggressive (anti-mosquito war theme) |
| **Theme** | Dark background (#0A0A0A), neon accent palette (Pink / Yellow / Cyan), military/tactical meets clean-tech |

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

```css
/* tailwind.config.js — extend colors */
colors: {
  background:     '#0A0A0A',
  surface:        '#111111',
  surfaceHover:   '#1A1A1A',
  gradientpink:   '#FF4D6D',
  gradientyellow: '#FFD60A',
  gradientcyan:   '#00F5D4',
  textPrimary:    '#FFFFFF',
  textMuted:      '#8A8A8A',
  borderDefault:  '#2A2A2A',
}
```

### 2.2 Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Hero | `Bebas Neue` | 400 | Section headers, hero titles |
| Body | `DM Sans` | 300–500 | Paragraphs, descriptions |
| Label / Tag | `Space Mono` | 400 | Stat labels, nav items, badges |

> **Import via Google Fonts** in `index.html`

### 2.3 Gradient Definitions

```css
/* Reusable gradient classes in index.css */
.gradient-pink-yellow  { background: linear-gradient(135deg, #FF4D6D, #FFD60A); }
.gradient-yellow-cyan  { background: linear-gradient(135deg, #FFD60A, #00F5D4); }
.gradient-cyan-pink    { background: linear-gradient(135deg, #00F5D4, #FF4D6D); }
.gradient-full         { background: linear-gradient(135deg, #FF4D6D, #00F5D4, #FFD60A); }
```

### 2.4 Shared Component Patterns

- **Cards:** `bg-surface border border-borderDefault rounded-2xl` + top gradient accent bar (3px)
- **Buttons Primary:** Solid `gradientcyan` background, `text-background`, `font-bold`, rounded-full
- **Buttons Secondary:** Transparent, `border border-white/20`, hover reveals gradient border
- **Section Wrapper:** `max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32`
- **Section Label:** Small uppercase `Space Mono` tag in color accent, above every section heading

---

## 3. ANIMATION STRATEGY (Framer Motion)

| Pattern | Where Used | Config |
|---|---|---|
| **Fade + Slide Up** | All section entries | `initial: {opacity:0, y:40}` → `animate: {opacity:1, y:0}` `duration: 0.6` |
| **Stagger Children** | Cards, feature tiles, comparison rows | `staggerChildren: 0.1` on parent |
| **Viewport Trigger** | Every section except Hero | `whileInView` + `viewport: {once: true, margin: "-100px"}` |
| **Scroll-linked parallax** | Hero background mosquito silhouette | `useScroll` + `useTransform` |
| **Hover Scale** | Cards, CTA buttons, nav links | `whileHover: {scale: 1.04}` |
| **Marquee / Ticker** | Brand values strip | CSS `animation: marquee 20s linear infinite` |
| **Number Count-up** | Disease stat numbers | `useMotionValue` + `useEffect` with `animate()` |
| **Gradient border pulse** | Disease cards on hover | Framer `animate` cycling hue or CSS keyframes |

---

## 4. PAGE STRUCTURE

```
<App>
  └── <LandingPage>
        ├── <Navbar />                    ← Section 0
        ├── <HeroSection />               ← Section 1
        ├── <BrandValuesTicker />         ← Section 1.5 (between hero and diseases)
        ├── <DiseasesSection />           ← Section 2
        ├── <ComparisonSection />         ← Section 3
        ├── <FeaturesSection />           ← Section 4  (from FEATURES_DATA)
        ├── <CTASection />                ← Section 5
        └── <Footer />                    ← Section 6
```

---

## 5. SECTION SPECIFICATIONS

---

### SECTION 0 — Navbar

**File:** `src/components/Navbar.jsx`

**Behavior:**
- Fixed top, `z-50`
- Background: `bg-background/80 backdrop-blur-md` on scroll (initially transparent)
- Framer: `useScroll` to detect scroll > 50px → animate background opacity

**Layout (left → center → right):**
```
[MOSCURE LOGO + tagline]   [HOME · PRODUCT · SHOP · DISEASES · COMPARISON · ABOUT · CONTACT]   [BUY NOW →]
```

**Logo:** Text-based — `MOSCURE` in `Bebas Neue`, `gradientcyan` color; small italic `DM Sans` tagline below

**Nav Links:** `Space Mono`, `text-sm`, hover underline in `gradientcyan`

**CTA Button:** `BUY NOW` — `gradientcyan` pill button, `text-background font-bold`

**Mobile:** Hamburger icon → slide-down drawer with full nav links (Framer `AnimatePresence`)

---

### SECTION 1 — Hero

**File:** `src/sections/HeroSection.jsx`

**Background:**
- Solid `#0A0A0A`
- Faint radial gradient glow: `gradientcyan` at ~15% opacity emanating from center-right
- Decorative large mosquito SVG silhouette (bottom-right), parallax scroll (moves up slower than content)

**Content (Left Column, ~50% width):**
```
[LABEL]  ⚡ THE ULTIMATE DEFENSE
[H1]     CATCH EVERY
         MOSQUITO           ← "EVERY" rendered with gradient-full text

[Body]   The ultimate defense against Dengue and Malaria.
         Moscure is the scientifically proven, chemical-free
         solution for your home.

[CTAs]   [BUY NOW →]  [COMPARE ↓]
```

**Right Column (~50% width):**
- Product image placeholder: dark rounded card (`aspect-[3/4]`), dashed border `border-gradientcyan/40`, centered label `[PRODUCT IMAGE]`
- Decorative neon frame border animation (CSS `@keyframes border-glow`)
- Small floating badge: "✓ Chemical Free" / "✓ Safe for Kids" — positioned absolutely, animated `y` float

**Animations:**
- H1 words stagger in from bottom on mount
- CTA buttons fade in with `delay: 0.8`
- Product card slides in from right `delay: 0.4`
- Parallax mosquito silhouette linked to `useScroll`

---

### SECTION 1.5 — Brand Values Ticker

**File:** `src/components/BrandValuesTicker.jsx`

**Data:** `BRAND_VALUES` array

**Layout:** Full-width horizontal strip, `bg-surface border-y border-borderDefault`, `py-4`

**Behavior:** Infinite scroll marquee (CSS `animation: marquee 20s linear infinite`), items separated by `·` dividers

**Style:** `Space Mono uppercase text-sm tracking-widest`, alternating `text-gradientcyan` and `text-textMuted`

---

### SECTION 2 — Diseases (Know Your Enemy)

**File:** `src/sections/DiseasesSection.jsx`

**Data:** `DISEASES_DATA`

**Reference:** Image 1 in the brief

**Section Label:** `⚠ THE SILENT KILLER` in `gradientpink`

**Section Heading:**
```
KNOW YOUR
ENEMY          ← "ENEMY" in gradientpink italic
```

**Subtext (right-aligned):**
> "Mosquitoes are the deadliest animals on Earth. In India, the threat is real and growing. Don't be a statistic."

**Cards (3 columns on desktop, 1 on mobile):**

Each card (`bg-surface rounded-2xl p-8 border border-borderDefault`):
- Top: 3px gradient border (color from `borderColor` field)
- Stat number: `text-5xl font-bold Bebas Neue` in card's color
- Sub-label: `Space Mono text-xs uppercase text-textMuted`
- Divider line
- Disease Name: `DM Sans font-bold text-xl text-white`
- Description: `DM Sans text-sm text-textMuted leading-relaxed`
- Background: faint watermark mosquito SVG (bottom-right, 20% opacity)

**Animations:**
- Section heading: slide in from left
- Cards: stagger from bottom (`staggerChildren: 0.15`)
- Stat numbers: count-up on viewport enter
- Cards: `whileHover` scale + top border glow intensifies

---

### SECTION 3 — Comparison

**File:** `src/sections/ComparisonSection.jsx`

**Data:** `COMPARISON_DATA`

**Section Label:** `⚖ VS THE REST`

**Section Heading:** `WHY MOSCURE WINS`

**Layout:**
- 3-column table: `CRITERIA | OTHERS ✗ | MOSCURE ✓`
- Header row: `Others` in `text-textMuted`, `Moscure` in `gradientcyan`

**Row Design (each `COMPARISON_DATA` item):**
```
[Criteria label]   [Others cell — red/muted]   [Moscure cell — cyan/green]
```
- Others cell: subtle `bg-red-950/20 border-red-900/30`, ✗ icon, muted text
- Moscure cell: subtle `bg-cyan-950/20 border-gradientcyan/30`, ✓ icon, cyan text
- Row hover: full row background lightens slightly

**Mobile:** Stack rows vertically — show `OTHERS` block above `MOSCURE` block per criterion

**Animations:**
- Rows reveal with stagger from top
- Moscure column cells have a subtle shimmer sweep animation on viewport enter

---

### SECTION 4 — Features

**File:** `src/sections/FeaturesSection.jsx`

**Data:** `FEATURES_DATA` (uses lucide-react icons: Shield, Wind, Zap, Droplets)

**Section Label:** `✦ WHY IT WORKS`

**Section Heading:** `BUILT DIFFERENT`

**Layout:** 2×2 grid on desktop, 1-col on mobile

**Card Design:**
- Icon: wrapped in a small square with the card's gradient as background (e.g. `gradient-pink-yellow`), `rounded-xl p-3`
- Title: `Bebas Neue text-2xl text-white`
- Description: `DM Sans text-sm text-textMuted`
- Hover: gradient border appears, card lifts with shadow

**Animations:**
- Cards stagger in from bottom
- Icon wrapper rotates slightly on card hover (`whileHover: {rotate: 5}`)

---

### SECTION 5 — CTA (Reclaim Your Nights)

**File:** `src/sections/CTASection.jsx`

**Background:** Full-width dark section with diagonal gradient overlay (`gradientcyan` → `gradientpink` at 5–8% opacity). Optional noise texture overlay for depth.

**Content (centered):**
```
[SMALL LABEL]   JOIN THE MOVEMENT

[H2]            RECLAIM YOUR NIGHTS

[Body]          Join thousands of Indian families who have switched
                to a safer, smarter way of mosquito protection.

[BUTTONS]       [BUY NOW →]    [CONTACT US]
```

**Decorative:** Large faint "MOSCURE" text watermark behind content, 4% opacity

**Animations:**
- Content fades up on viewport enter
- Buttons: `whileHover` scale + glow shadow in respective button color

---

### SECTION 6 — Footer

**File:** `src/components/Footer.jsx`

**Background:** `bg-surface border-t border-borderDefault`

**Layout (4 columns on desktop, stacked on mobile):**

| Column | Content |
|---|---|
| **Col 1 — Brand** | Moscure logo + 2-line tagline. Short brand description (placeholder). Social icons (Instagram, Facebook, Twitter/X) as SVG icon buttons |
| **Col 2 — Quick Links** | Home · Product · Shop · Diseases · Comparison · About Us · Contact |
| **Col 3 — Resources** | User Manual · Installation Guide · FAQs · Warranty Info · Safety Guidelines |
| **Col 4 — Contact** | 📍 Address placeholder · 📞 Phone placeholder · ✉ Email placeholder · Small "Get in Touch" CTA button |

**Bottom Bar:** `border-t border-borderDefault mt-12 pt-6 flex justify-between`
- Left: `© 2025 Moscure. All rights reserved.`
- Right: `Privacy Policy · Terms of Service`

**Link style:** `DM Sans text-sm text-textMuted hover:text-gradientcyan transition-colors`

---

## 6. FILE / FOLDER STRUCTURE

```
moscure-landing/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── mosquito-silhouette.svg       ← decorative SVG
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── BrandValuesTicker.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── DiseasesSection.jsx
│   │   ├── ComparisonSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   └── CTASection.jsx
│   ├── data/
│   │   └── staticData.js                 ← DISEASES_DATA, COMPARISON_DATA, FEATURES_DATA, BRAND_VALUES
│   ├── lib/
│   │   └── utils.js                      ← cn() helper from ShadCN
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                         ← Tailwind directives + custom CSS vars + marquee keyframes
├── tailwind.config.js                    ← Extended colors + font families
├── vite.config.js
├── index.html                            ← Google Fonts import
└── package.json
```

---

## 7. DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11",
    "lucide-react": "^0.383.0",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4",
    "vite": "^5",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

**ShadCN Components needed (init with `npx shadcn-ui@latest init`):**
- `Button` — used in Navbar CTA and CTA section
- `Badge` — used for floating hero badges and section labels
- `Separator` — used in disease cards and footer

---

## 8. RESPONSIVE BREAKPOINTS

| Breakpoint | Layout Changes |
|---|---|
| `sm` (640px) | Single column cards, stacked hero |
| `md` (768px) | 2-col features grid; hero side-by-side |
| `lg` (1024px) | Full 3-col disease cards; comparison full table |
| `xl` (1280px) | Max container width locks at `max-w-7xl` |

---

## 9. PLACEHOLDER CONVENTIONS

Where real assets are missing, use these consistent placeholders:

| Asset | Placeholder |
|---|---|
| Hero product image | `bg-surface border-2 border-dashed border-gradientcyan/40 rounded-2xl aspect-[3/4]` with centered label |
| Product image 2 (smaller) | Same style, `aspect-square` |
| Logo image | Text logo `MOSCURE` in `Bebas Neue gradientcyan` |
| Address | `123, Sector 5, Gurugram, Haryana 122001` |
| Phone | `+91 98765 43210` |
| Email | `support@moscure.in` |
| Social links | `#` href |

---

## 10. IMPLEMENTATION ORDER (Suggested)

1. **Bootstrap** — Vite + React setup, Tailwind config with custom colors/fonts, ShadCN init
2. **`index.css`** — CSS vars, marquee keyframe, global resets, Tailwind directives
3. **`staticData.js`** — Paste all provided data constants
4. **`Navbar.jsx`** — Fixed nav with scroll detection
5. **`HeroSection.jsx`** — Hero with animations (most complex section)
6. **`BrandValuesTicker.jsx`** — Marquee strip
7. **`DiseasesSection.jsx`** — Cards with count-up stats
8. **`ComparisonSection.jsx`** — Table with reveal animations
9. **`FeaturesSection.jsx`** — 2×2 grid
10. **`CTASection.jsx`** — Simple CTA block
11. **`Footer.jsx`** — 4-column footer
12. **`App.jsx`** — Assemble all sections, add global smooth scroll

---

## 11. KEY DESIGN DECISIONS & NOTES

- **No backend / no routing** — single `App.jsx`, all sections inline. Nav links use `href="#section-id"` anchor scroll.
- **Smooth scroll** — Add `html { scroll-behavior: smooth; }` in `index.css`
- **`whileInView` once** — All scroll animations use `viewport: { once: true }` so they don't replay on scroll-up
- **ShadCN Button variant** — Override default ShadCN button to match brand colors via `className` prop; do not retheme ShadCN globally for now
- **Image imports** — All placeholder divs should accept an optional `src` prop so swapping in real images later requires zero refactoring
- **Accessibility** — All icon-only buttons need `aria-label`; color contrast of cyan on dark background passes AA
- **Performance** — Framer Motion `LazyMotion` + `domAnimation` feature bundle to reduce JS size
