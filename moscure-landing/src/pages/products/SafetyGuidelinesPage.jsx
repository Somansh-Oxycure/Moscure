import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Zap, Eye, Users, Package, TriangleAlert } from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, IconRow, Divider, DocPageNav,
} from '../../components/DocComponents'
import DocProductSelector from '../../components/DocProductSelector'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ELECTRICAL = [
  'Use only with a 100–240V AC power supply. Never exceed the specified input voltage.',
  'Always use the original power adapter and power cord supplied with the device.',
  'Do not operate the device near water, swimming pools, or in areas of high moisture exposure.',
  'Keep both the device and power cord well away from flammable materials and direct heat sources.',
  'Do not use a frayed, cut, or otherwise damaged power cord — replace it immediately.',
]

const UV_SAFETY = [
  {
    title: 'Avoid Direct Eye Exposure',
    desc: 'Do not stare directly into the UV LED, especially at distances closer than 1 metre. The UV output is intense at short range.',
  },
  {
    title: 'Limit Skin Exposure',
    desc: 'Avoid prolonged skin exposure to the UV light source. The light is designed solely for insect attraction, not human use.',
  },
  {
    title: 'Not a Therapeutic Light',
    desc: 'The UV wavelength is calibrated for mosquito phototaxis only — it is not a grow light, health lamp, or therapeutic device.',
  },
]

const GENERAL = [
  'Keep the device out of reach of children and pets at all times while it is plugged in and operating.',
  'Do not attempt to disassemble, modify, or perform self-repair on any part of the device.',
  'Avoid dropping or subjecting the device to strong physical impact — internal components may be damaged.',
  'If the device emits unusual smells, smoke, sparks, or sounds, unplug immediately and contact support.',
]

const PLACEMENT = [
  'Do not install in high-traffic pedestrian areas where people or animals may accidentally contact the device.',
  'Keep the power plug and socket area free of dust, moisture, and debris buildup.',
  'If hung from a fixture, ensure the hook and mounting point are completely secure. Do not swing or spin the device.',
  'Provide adequate ventilation around the device — avoid enclosing it where heat can accumulate.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SafetyGuidelinesPage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product)    document.title = 'Safety Guidelines – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'Safety Guidelines – MOSCURE IPO 1 | Safe Usage Instructions'
    if (product === 'indoor')  document.title = 'Safety Guidelines – MOSCURE IPI 1'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE safety guidelines. Select your mosquito trap to view electrical safety, UV precautions, and handling instructions.'
    if (product === 'outdoor') meta.content = 'Important safety guidelines for the MOSCURE IPO 1. Covers electrical safety, UV light precautions, general handling, and safe placement practices.'
    if (product === 'indoor')  meta.content = 'Safety guidelines for the MOSCURE IPI 1. Coming soon.'

    return () => { document.title = 'Moscure' }
  }, [product])

  if (!product) return <DocProductSelector docTitle="Safety Guidelines" onSelect={setProduct} indoorPath="/ipi1/safety" />

  return (
    <main>
      <DocHero
        badge="Safety · IPO Outdoor"
        title="Safety Guidelines"
        subtitle="Read and follow all safety instructions before installing and operating your MOSCURE IPO 1."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPO 1', href: '/products/moscure-ipo-outdoor-mosquito-trap' },
          { label: 'Safety Guidelines' },
        ]}
        onBack={() => setProduct(null)}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Warning banner ──────────────────────────────────────────────── */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradientyellow/5 border border-gradientyellow/30 mb-2">
          <TriangleAlert size={24} className="text-gradientyellow flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="font-body text-sm text-textMuted leading-relaxed">
            <strong className="text-white">Read all instructions before use.</strong>{' '}
            Failure to follow these safety guidelines may result in personal injury, property damage,
            or invalidation of your warranty.
          </p>
        </div>

        {/* ── Electrical Safety ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Zap}
            title="Electrical Safety"
            subtitle="Ensure the correct power supply and a safe electrical environment."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={ELECTRICAL} />
          </div>
        </DocSection>

        <Divider />

        {/* ── UV Safety ───────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Eye}
            title="UV Light Safety"
            subtitle="The built-in UV LED requires careful awareness around people."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {UV_SAFETY.map(({ title, desc }) => (
              <InfoCard key={title} icon={Eye} title={title} highlight accentColor="yellow">
                {desc}
              </InfoCard>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── General Safety ──────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Users}
            title="General Safety"
            subtitle="Everyday precautions for safe, continuous operation."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={GENERAL} />
          </div>
        </DocSection>

        <Divider />

        {/* ── Placement Safety ────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Package}
            title="Handling & Placement"
            subtitle="Safe installation and positioning practices to prevent accidents."
          />
          <div className="flex flex-col gap-3">
            {PLACEMENT.map((item, i) => (
              <IconRow key={i} icon={TriangleAlert} accentColor="yellow">{item}</IconRow>
            ))}
          </div>
        </DocSection>

      </div>
      <DocPageNav product="outdoor" current="safety" />
    </main>
  )
}
