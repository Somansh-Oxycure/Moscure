import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShieldCheck, XCircle, FileText, AlertTriangle, Phone } from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading,
  BulletList, IconRow, Divider, DocPageNav,
} from '../../components/DocComponents'
import DocProductSelector from '../../components/DocProductSelector'

// ─── Data ─────────────────────────────────────────────────────────────────────

const COVERAGE = [
  '1-year limited warranty from the date of the original retail purchase, covering all manufacturing defects.',
  'Free repair or replacement of defective components arising from manufacturing faults or material failures, at Moscure\'s discretion.',
  'Covers electrical and mechanical failures that occur under stated normal operating conditions as described in the User Manual.',
  'Warranty service is fulfilled within 7–14 business days of receiving the defective product at the Moscure service centre.',
  'If a defective product cannot be repaired, Moscure will replace it with the same or an equivalent model at no additional cost to the customer.',
]

const EXCLUSIONS = [
  'Physical damage caused by misuse, accidents, drops, liquid spills, or negligence not covered under the warranty.',
  'Damage resulting from use with an incorrect power supply voltage, overloaded circuits, or non-original power adapters.',
  'Unauthorized modifications, component replacements, or any attempt to disassemble the device by persons other than Moscure-authorised technicians.',
  'Cosmetic damage including scratches, dents, discolouration, and surface wear from normal everyday use.',
  'Damage caused by exposure to conditions exceeding the product\'s rated environmental specifications, such as outdoor use for an indoor-only model.',
  'Loss of performance due to failure to perform regular cleaning and maintenance as outlined in the User Manual.',
  'Damage caused by power surges, lightning strikes, acts of nature, or other events beyond reasonable control.',
  'Products with a damaged, altered, or missing serial number or warranty sticker.',
]

const NOTES = [
  'Keep your original warranty card and proof of purchase (invoice or receipt) in a safe place — these documents are required for all warranty claims to be processed.',
  'No duplicate warranty card will be issued under any circumstances. Retain your original documentation from the point of purchase.',
  'The warranty is non-transferable and applies exclusively to the original purchaser. It cannot be transferred if the product is resold or gifted.',
  'To initiate a warranty claim, contact Moscure support at operations@moscure.com with your purchase receipt, a description of the issue, and clear photos of the defect.',
  'Moscure reserves the right to inspect the product before approving any warranty claim. Decisions made by Moscure\'s technical team are final.',
  'Shipping costs to the Moscure service centre are the customer\'s responsibility; return shipping for repaired or replaced products is covered by Moscure.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WarrantyPage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product) document.title = 'Warranty Information – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'Warranty Information – MOSCURE IPO 1 | 1-Year Limited Warranty'
    if (product === 'indoor') document.title = 'Warranty Information – MOSCURE IPI 1 | 1-Year Limited Warranty'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE product warranty information. Select your indoor or outdoor mosquito trap to view full coverage terms, exclusions, and how to make a warranty claim.'
    if (product === 'outdoor') meta.content = 'MOSCURE IPO 1 warranty details — 1-year limited warranty covering manufacturing defects. Learn what\'s covered, what\'s not, and how to initiate a warranty claim with proof of purchase.'
    if (product === 'indoor') meta.content = 'MOSCURE IPI 1 warranty details — 1-year limited warranty covering manufacturing defects. Learn what\'s covered, what\'s not, and how to initiate a warranty claim with proof of purchase.'

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalCreated = !canonical
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    const prevCanonical = canonical.href
    canonical.href = 'https://www.moscure.com/warranty/'

    return () => {
      document.title = 'Moscure'
      if (canonicalCreated) canonical.remove()
      else canonical.href = prevCanonical
    }
  }, [product])

  if (!product) return <DocProductSelector docTitle="Warranty Info" onSelect={setProduct} indoorPath="/ipi1/warranty" />

  return (
    <main>
      <DocHero
        badge="Warranty · IPO Outdoor"
        title="Warranty Info"
        subtitle="Your MOSCURE IPO 1 is built to last. Here's exactly what's covered, what's excluded, and how to make a claim if you ever need to."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPO 1', href: '/products/moscure-ipo-outdoor-mosquito-trap' },
          { label: 'Warranty' },
        ]}
        onBack={() => setProduct(null)}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Warranty badge ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-gradientcyan/5 border border-gradientcyan/20 mb-2">
          <ShieldCheck size={36} className="text-gradientcyan flex-shrink-0" aria-hidden="true" />
          <div>
            <div className="font-display text-3xl text-white leading-tight">
              1-Year Limited Warranty
            </div>
            <p className="font-body text-sm text-textMuted mt-1">
              Coverage begins from the date of the original retail purchase. Keep your proof of purchase safe.
            </p>
          </div>
        </div>

        {/* ── Coverage ────────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={ShieldCheck}
            title="What's Covered"
            subtitle="Defects arising from manufacturing are fully covered at no cost to you during the warranty period."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={COVERAGE} />
          </div>
        </DocSection>

        <Divider />

        {/* ── Exclusions ──────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={XCircle}
            title="What's Not Covered"
            subtitle="The following situations fall outside the scope of warranty coverage."
          />
          <div className="p-6 rounded-2xl border border-gradientpink/20 bg-gradientpink/5">
            <ul className="flex flex-col gap-3">
              {EXCLUSIONS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-gradientpink"
                    aria-hidden="true"
                  />
                  <span className="font-body text-sm text-textMuted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </DocSection>

        <Divider />

        {/* ── Important Notes ─────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={FileText}
            title="Important Notes"
            subtitle="Please read carefully to protect your warranty entitlement and understand the claims process."
          />
          <div className="flex flex-col gap-3">
            {NOTES.map((note, i) => (
              <IconRow key={i} icon={AlertTriangle} accentColor="yellow">{note}</IconRow>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── Contact to claim ────────────────────────────────────────────── */}
        {/* <DocSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-borderDefault bg-surface">
            <div className="flex items-center gap-4">
              <Phone size={20} className="text-gradientcyan flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-body font-semibold text-white text-sm">Need to make a claim?</p>
                <p className="font-body text-sm text-textMuted mt-0.5">
                  Contact our support team with proof of purchase and a description of the defect.
                </p>
              </div>
            </div>
            <a
              href="mailto:operations@moscure.com"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gradientcyan/10 border border-gradientcyan/30 text-gradientcyan font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gradientcyan/20 transition-colors duration-200"
              aria-label="Email Moscure support to initiate a warranty claim"
            >
              Contact Support →
            </a>
          </div>
        </DocSection> */}

      </div>
      <DocPageNav product="outdoor" current="warranty" />
    </main>
  )
}
