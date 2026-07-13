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
  'Maintain at least 1 metre clearance from people and regular seating positions for comfortable coexistence. Never position the device directly above where people eat, sleep, or sit for extended periods.',
  'Optimally position the device 3 metres away from primary outdoor seating or rest areas for maximum mosquito interception before they reach occupied zones.',
  'Avoid proximity to competing light sources — street lamps, decorative garden lighting, or porch lights significantly reduce effectiveness by diluting the UV attraction signal.',
  'Install in a shaded or covered outdoor area such as a patio, verandah, gazebo, or garden shelter. Direct exposure to harsh sunlight can degrade the plastic housing over time.',
  'Shield the device from direct wind exposure above 20 km/h; airflow interference reduces the fan\'s suction force and significantly lowers trapping efficiency.',
  'For best results, position the device in areas where mosquitoes are known to breed or rest — near standing water features, garden ponds, dense vegetation, or shaded corners.',
]

const MOUNTING_OPTIONS = [
  {
    icon: Shield,
    title: 'Surface Placement',
    desc: 'Set on any flat, stable, non-slip surface at the recommended height. Ensure the base is level and the device cannot be knocked over by wind, children, or animals. Use a rubber mat underneath for extra stability.',
  },
  {
    icon: Anchor,
    title: 'Suspended / Hanging',
    desc: 'Use the built-in hanging hook to suspend from a ceiling beam, hook, or tree branch. Ensure the fixture and hook can safely support at least 2 kg. Verify stability before leaving the device unattended.',
  },
]

const USAGE_TIPS = [
  'Keep the device powered ON continuously — especially overnight — for the best long-term mosquito reduction results. Mosquitoes are most active during the 3–4 hours after dusk and before dawn.',
  'Dusk and dawn are peak mosquito activity hours; ensure the device is fully operational during these windows for maximum impact. Do not switch it off during these periods.',
  'Always keep the device upright; tilting or angling the body affects internal fan airflow dynamics, reduces suction efficiency, and may allow trapped insects to escape the collection container.',
  'Avoid frequently switching the device on and off — sustained operation over days and weeks dramatically outperforms intermittent use. The trap works cumulatively to reduce local mosquito populations.',
  'In the first two weeks of operation, you may notice a higher catch rate as the local mosquito population is initially drawn in. This is expected and indicates the device is working effectively.',
  'For multi-room or large outdoor spaces, consider using multiple units to maximise coverage. The IPO outdoor model covers up to 3500 sq ft, while the IPI indoor model covers 400 sq ft.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InstallationGuidePage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product)    document.title = 'Installation Guide – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'Installation Guide – MOSCURE IPO 1 | Setup, Placement & Usage Tips'
    if (product === 'indoor')  document.title = 'Installation Guide – MOSCURE IPI 1 | Indoor Setup & Placement'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE installation guide. Select your indoor or outdoor mosquito trap to view complete setup, placement, mounting, and usage instructions.'
    if (product === 'outdoor') meta.content = 'Step-by-step installation guide for the MOSCURE IPO 1 outdoor mosquito trap. Learn optimal placement, mounting options (surface or hanging), ideal height between 1.5–2m, and usage tips for best results.'
    if (product === 'indoor')  meta.content = 'Installation guide for the MOSCURE IPI 1 indoor mosquito trap. Learn optimal indoor placement, setup instructions, and tips for maximising coverage up to 400 sq ft.'

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalCreated = !canonical
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    const prevCanonical = canonical.href
    canonical.href = 'https://www.moscure.com/installation-guide/'

    return () => {
      document.title = 'Moscure'
      if (canonicalCreated) canonical.remove()
      else canonical.href = prevCanonical
    }
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
