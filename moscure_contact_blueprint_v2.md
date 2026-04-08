# 🦟 MOSCURE --- Contact Page Blueprint (V2)

**Version:** 2.0\
**Stack:** React + Vite · Tailwind · ShadCN · Framer Motion\
**IMPORTANT:** Follow existing design system EXACTLY. Do NOT introduce
new styles.

------------------------------------------------------------------------

# 1. PAGE STRUCTURE

`<ContactPage>`{=html} ├── Navbar (reuse) ├── ContactHero ├──
ContactMain (Form + Info) ├── FAQSection └── Footer (reuse)

------------------------------------------------------------------------

# 2. SECTION --- CONTACT HERO

## Layout

Centered, same spacing as other sections.

## Content

\[LABEL\] ⚡ CONTACT\
\[H1\] GET IN TOUCH\
\[SUBTEXT\] Have questions about Moscure? Our team is ready to assist
you.

## Styling

-   Same hero typography
-   Same glow background
-   Same animation (fade + slide up)

------------------------------------------------------------------------

# 3. SECTION --- CONTACT MAIN

## Layout

2-column grid (desktop) 1-column stacked (mobile)

------------------------------------------------------------------------

## LEFT --- INQUIRY FORM

### Fields

-   Full Name
-   Email Address
-   Phone Number
-   City
-   Subject (Dropdown)
    -   General Inquiry
    -   Order Support
    -   Bulk Orders
    -   Warranty
-   Message (textarea)

------------------------------------------------------------------------

### Design

-   Card: bg-surface border border-borderDefault rounded-2xl p-8
-   Inputs:
    -   bg-background
    -   border border-borderDefault
    -   focus:border-gradientcyan
    -   rounded-lg
-   Button:
    -   gradientcyan
    -   full width
    -   text-background font-bold

------------------------------------------------------------------------

### Animation

-   Form fades in from left
-   Fields stagger slightly

------------------------------------------------------------------------

### EMAIL FUNCTIONALITY (IMPORTANT)

When user submits:

Send email to: somansh2002@gmail.com

### Email Format:

Subject: New Inquiry --- Moscure Website

Body:

Name: {Full Name} Email: {Email} Phone: {Phone} City: {City} Subject:
{Selected Option}

Message: {User Message}

------------------------------------------------------------------------

## RIGHT --- CONTACT INFORMATION

### Card Design

Same as form card

------------------------------------------------------------------------

### Content

CONTACT INFORMATION\
Reach out to us through any of these channels.

------------------------------------------------------------------------

EMAIL US\
operations@moscure.com\
We'll respond within 24 hours

------------------------------------------------------------------------

CALL US\
+91-8010111177\
Mon-Sat, 9 AM - 6 PM IST

------------------------------------------------------------------------

VISIT US\
Gurugram, Haryana

------------------------------------------------------------------------

BUSINESS HOURS

Monday - Friday\
9:00 AM - 6:00 PM

Saturday\
10:00 AM - 4:00 PM

Sunday\
Closed

------------------------------------------------------------------------

### Animation

-   Fade in from right
-   Each block stagger

------------------------------------------------------------------------

# 4. SECTION --- FAQ

## Layout

Single column (like accordion or stacked cards)

------------------------------------------------------------------------

## Questions

### 1. How long does delivery take?

We deliver across India within 5-7 business days.

### 2. Is there a warranty?

Yes! 2-year comprehensive warranty.

### 3. How do I install Moscure?

Installation takes less than 5 minutes.

### 4. Can I return if not satisfied?

30-day money-back guarantee.

------------------------------------------------------------------------

## Design

-   Same card style
-   Hover effect same as features
-   Optional accordion (ShadCN)

------------------------------------------------------------------------

## Animation

-   Stagger cards
-   Fade up

------------------------------------------------------------------------

# 5. FOOTER

Reuse existing Footer.jsx\
NO changes

------------------------------------------------------------------------

# 6. RESPONSIVE

Mobile: - Stack form above contact info - Reduce padding - Full width
button

------------------------------------------------------------------------

# 7. FINAL NOTES

-   DO NOT add new sections
-   DO NOT change design system
-   DO NOT experiment with colors
-   ONLY reuse existing patterns

Goal: Clean, consistent, functional contact page.
