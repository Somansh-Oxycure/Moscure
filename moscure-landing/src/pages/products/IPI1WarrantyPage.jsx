import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, XCircle, FileText, AlertTriangle, Phone } from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading,
  BulletList, IconRow, Divider,
} from '../../components/DocComponents'

// ─── Data ─────────────────────────────────────────────────────────────────────

const COVERAGE = [
  '1-year limited warranty from the date of the original retail purchase.',
  'Free repair or replacement for defects arising from manufacturing faults or material failures.',
  'Covers electrical and mechanical failures occurring under stated normal operating conditions.',
]

const EXCLUSIONS = [
  'Physical damage caused by misuse, accidents, drops, or negligence.',
  'Damage resulting from use with an incompatible or non-standard power source (must be 5V USB, min 0.3A).',
  'Unauthorized modifications, disassembly, or attempts at self-repair of any component.',
  'Cosmetic damage including scratches, dents, and discolouration from normal wear and tear.',
  'Loss of performance due to failure to perform regular cleaning and maintenance.',
]

const NOTES = [
  'Keep your original warranty card and proof of purchase — these are required for all warranty claims.',
  'No duplicate warranty card will be issued under any circumstances.',
  'The warranty is non-transferable and applies exclusively to the original purchaser.',
  'To initiate a claim, contact Moscure support with your purchase receipt and a description of the fault.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IPI1WarrantyPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Warranty Information – MOSCURE IPI 1 | Portable Mosquito Trap'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content =
      'MOSCURE IPI 1 warranty details — 1-year limited warranty coverage, exclusions, and how to make a warranty claim for your USB mosquito trap.'

    return () => { document.title = 'Moscure' }
  }, [])

  return (
    <main>
      <DocHero
        badge="IPI Indoor · Warranty"
        title="Warranty Info"
        subtitle="Your MOSCURE IPI 1 is built to last. Here's exactly what's covered, what's not, and how to make a claim."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPI 1', href: '/products/moscure-ipi-indoor-mosquito-trap' },
          { label: 'Warranty' },
        ]}
        onBack={() => navigate('/warranty')}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Warranty badge ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-gradientcyan/5 border border-gradientcyan/20 mb-2">
          <ShieldCheck size={36} className="text-gradientcyan flex-shrink-0" />
          <div>
            <div className="font-display text-3xl text-white leading-tight">
              1-Year Limited Warranty
            </div>
            <p className="font-body text-sm text-textMuted mt-1">
              Coverage begins from the date of original retail purchase.
            </p>
          </div>
        </div>

        {/* ── Coverage ────────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={ShieldCheck}
            title="What's Covered"
            subtitle="Manufacturing defects are fully covered at no cost to you."
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
            subtitle="Please read carefully to protect your warranty entitlement."
          />
          <div className="flex flex-col gap-3">
            {NOTES.map((note, i) => (
              <IconRow key={i} icon={AlertTriangle} accentColor="yellow">{note}</IconRow>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── Contact to claim ────────────────────────────────────────────── */}
        <DocSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-borderDefault bg-surface">
            <div className="flex items-center gap-4">
              <Phone size={20} className="text-gradientcyan flex-shrink-0" />
              <div>
                <p className="font-body font-semibold text-white text-sm">Need to make a claim?</p>
                <p className="font-body text-sm text-textMuted mt-0.5">
                  Contact our support team with proof of purchase.
                </p>
              </div>
            </div>
            <a
              href="mailto:operations@moscure.com"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gradientcyan/10 border border-gradientcyan/30 text-gradientcyan font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gradientcyan/20 transition-colors duration-200"
            >
              Contact Support →
            </a>
          </div>
        </DocSection>

      </div>
    </main>
  )
}
