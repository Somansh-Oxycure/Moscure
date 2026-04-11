import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Anchor, ArrowUpDown, Lightbulb, Sun, Shield } from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, IconRow, Divider, DocPageNav,
} from '../../components/DocComponents'
import DocProductSelector from '../../components/DocProductSelector'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACEMENT = [
  'Maintain at least 1 metre clearance from people and regular seating positions for comfortable coexistence.',
  'Optimally position the device 3 metres away from primary outdoor seating or rest areas for maximum interception.',
  'Avoid proximity to competing light sources — street lamps, decorative lighting, or porch lights reduce effectiveness.',
  'Install in a shaded or covered outdoor area such as a patio, verandah, gazebo, or garden shelter.',
  'Shield the device from direct wind exposure; airflow interference reduces fan suction and trapping efficiency.',
]

const MOUNTING_OPTIONS = [
  {
    icon: Shield,
    title: 'Surface Placement',
    desc: 'Set on any flat, stable surface at the recommended height. Ensure the base is level and the device cannot be knocked over.',
  },
  {
    icon: Anchor,
    title: 'Suspended / Hanging',
    desc: 'Use the built-in hanging hook to suspend from a ceiling, beam, hook, or tree branch. Ensure the fixture can safely support at least 2 kg.',
  },
]

const USAGE_TIPS = [
  'Keep the device powered ON continuously — especially overnight — for the best long-term mosquito reduction results.',
  'Dusk and dawn are peak mosquito activity hours; ensure the device is fully operational during these windows.',
  'Always keep the device upright; tilting or angling the body affects internal fan airflow and collection efficiency.',
  'Avoid frequently switching the device on and off — sustained operation dramatically outperforms intermittent use.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InstallationGuidePage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product)    document.title = 'Installation Guide – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'Installation Guide – MOSCURE IPO 1 | Setup & Placement'
    if (product === 'indoor')  document.title = 'Installation Guide – MOSCURE IPI 1'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE installation guide. Select your indoor or outdoor mosquito trap to view setup and placement instructions.'
    if (product === 'outdoor') meta.content = 'Step-by-step installation guide for the MOSCURE IPO 1. Learn optimal placement, mounting options, ideal height, and usage tips.'
    if (product === 'indoor')  meta.content = 'Installation guide for the MOSCURE IPI 1. Coming soon.'

    return () => { document.title = 'Moscure' }
  }, [product])

  if (!product) return <DocProductSelector docTitle="Installation Guide" onSelect={setProduct} indoorPath="/ipi1/installation-guide" />

  return (
    <main>
      <DocHero
        badge="Setup · IPO Outdoor"
        title="Installation Guide"
        subtitle="Set up your MOSCURE IPO 1 correctly to maximise mosquito trapping efficiency from day one."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPO 1', href: '/products/moscure-ipo-outdoor-mosquito-trap' },
          { label: 'Installation Guide' },
        ]}
        onBack={() => setProduct(null)}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Placement Guidelines ────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={MapPin}
            title="Placement Guidelines"
            subtitle="Where you place your device directly determines how effective it is."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={PLACEMENT} />
          </div>
        </DocSection>

        <Divider />

        {/* ── Mounting Options ────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Anchor}
            title="Mounting Options"
            subtitle="Choose the installation method that best fits your space."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOUNTING_OPTIONS.map(({ icon, title, desc }) => (
              <InfoCard key={title} icon={icon} title={title} highlight>
                {desc}
              </InfoCard>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── Height Recommendations ──────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={ArrowUpDown}
            title="Height Recommendations"
            subtitle="Ideal operating height for maximum mosquito interception."
          />
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-gradientcyan/20 bg-gradientcyan/5">
            <div className="flex-shrink-0 text-center">
              <div className="font-display text-6xl text-gradientcyan leading-none">1.5</div>
              <div className="font-mono text-xs text-textMuted mt-1.5 uppercase tracking-widest">Min (m)</div>
            </div>
            <div className="hidden sm:block h-16 w-px bg-borderDefault" />
            <div className="block sm:hidden h-px w-16 bg-borderDefault" />
            <div className="flex-shrink-0 text-center">
              <div className="font-display text-6xl text-gradientcyan leading-none">2.0</div>
              <div className="font-mono text-xs text-textMuted mt-1.5 uppercase tracking-widest">Max (m)</div>
            </div>
            <div className="hidden sm:block h-16 w-px bg-borderDefault" />
            <div className="block sm:hidden h-px w-16 bg-borderDefault" />
            <p className="font-body text-sm text-textMuted leading-relaxed text-center sm:text-left">
              Mount or place the device between{' '}
              <strong className="text-white">1.5 and 2 metres</strong> above the ground. This range
              aligns with typical mosquito flight paths and maximises UV light coverage across the area.
            </p>
          </div>
        </DocSection>

        <Divider />

        {/* ── Usage Tips ──────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Lightbulb}
            title="Usage Tips"
            subtitle="Best practices to get consistent, long-term results."
          />
          <div className="flex flex-col gap-3">
            {USAGE_TIPS.map((tip, i) => (
              <IconRow key={i} icon={Sun}>{tip}</IconRow>
            ))}
          </div>
        </DocSection>

      </div>
      <DocPageNav product="outdoor" current="installation" />
    </main>
  )
}
