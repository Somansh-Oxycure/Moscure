import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  BookOpen, Cpu, Star, Wrench, Zap,
  Droplets, Wind, CheckCircle, Settings,
} from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, SpecTable, StepRow, Divider, DocPageNav,
} from '../../components/DocComponents'
import DocProductSelector from '../../components/DocProductSelector'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPECS = [
  { label: 'Model',             value: 'MC-IPO 1' },
  { label: 'Power Input',       value: '100–240V AC' },
  { label: 'Power Consumption', value: '10.6W' },
  { label: 'Dimensions',        value: '260mm × 320mm' },
  { label: 'Weight',            value: '1,132g' },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Energy-Efficient LED',
    desc: 'Optimized UV wavelength tuned to mosquito phototaxis response — powerful attraction at minimal wattage.',
  },
  {
    icon: Droplets,
    title: 'Chemical-Free Operation',
    desc: 'No pesticides, sprays, or consumables. Safe for family, children, and pets around the clock.',
  },
  {
    icon: Wind,
    title: 'Water-Resistant Build',
    desc: 'Engineered to withstand outdoor humidity, moisture, and light rain across all seasons.',
  },
  {
    icon: Settings,
    title: 'Zero Consumables',
    desc: 'No replacement bulbs, no refills needed. Plug in once and let it operate continuously.',
  },
  {
    icon: CheckCircle,
    title: 'Easy Maintenance',
    desc: 'Slide-out collection tray design — clean in minutes with basic household tools.',
  },
  {
    icon: BookOpen,
    title: 'Silent Dehydration Mechanism',
    desc: 'Trapped insects die through natural dehydration — no chemicals, no zapping noise.',
  },
]

const HOW_IT_WORKS = [
  'The precision-tuned UV LED emits light at the exact wavelength (365nm) that activates mosquito phototaxis — the biological light-seeking behaviour hardwired into mosquitoes. This draws insects from up to several metres away, far more effectively than visible light or generic UV sources.',
  'A built-in fan creates a gentle, steady suction airflow that silently pulls approaching mosquitoes through the inlet opening and into the sealed collection container below. The fan speed is optimised to attract insects without creating noise or drafts that would disturb sleep or work.',
  'Trapped inside and cut off from air and moisture, mosquitoes die through natural dehydration within hours — effectively and without any chemicals, noise, or zapping sounds. The sealed container prevents escape and makes emptying clean and mess-free.',
]

const MAINTENANCE = [
  'Clean the collection container at least once per week to maintain peak trapping efficiency — a full container reduces airflow and lowers the trap\'s effectiveness.',
  'Always unplug the device from the power source before starting any cleaning. Never clean the device while it is connected to mains power.',
  'Slide out the collection tray or container according to the product\'s design. Tap out trapped insects into a bin, then wash the container with mild soap and lukewarm water.',
  'Avoid using harsh chemicals, bleach, or abrasive scrubbers on any part of the device — these can damage the plastic housing and UV LED coating.',
  'Rinse all washed components thoroughly with clean water and allow them to dry completely before reassembling and reconnecting to power. Never reassemble damp parts.',
  'Wipe down the exterior housing with a dry or slightly damp cloth monthly to remove dust build-up around the air intake grilles.',
  'Inspect the UV LED periodically. If the blue/violet glow appears significantly dimmer than when the device was new, contact Moscure support for assessment.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserManualPage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product)    document.title = 'User Manual – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'User Manual – MOSCURE IPO 1 | Outdoor Mosquito Trap Guide'
    if (product === 'indoor')  document.title = 'User Manual – MOSCURE IPI 1 | Indoor Mosquito Trap Guide'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE product user manual. Select your indoor or outdoor mosquito trap to view technical specifications, key features, how it works, and maintenance guidance.'
    if (product === 'outdoor') meta.content = 'Complete user manual for the MOSCURE IPO 1 outdoor mosquito trap. Learn how 365nm UV phototaxis technology works, product specs, key features, and how to maintain your device for long-term performance.'
    if (product === 'indoor')  meta.content = 'Complete user manual for the MOSCURE IPI 1 indoor mosquito trap. Learn about UV LED phototaxis technology, technical specs, key features, and step-by-step maintenance instructions.'

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalCreated = !canonical
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    const prevCanonical = canonical.href
    canonical.href = 'https://www.moscure.com/user-manual/'

    return () => {
      document.title = 'Moscure'
      if (canonicalCreated) canonical.remove()
      else canonical.href = prevCanonical
    }
  }, [product])

  if (!product) return <DocProductSelector docTitle="User Manual" onSelect={setProduct} indoorPath="/ipi1/user-manual" />

  return (
    <main>
      <DocHero
        badge="Documentation · IPO Outdoor"
        title="User Manual"
        subtitle="Everything you need to get the most out of your MOSCURE IPO 1 Outdoor Mosquito Trap. Model: MC-IPO 1."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPO 1', href: '/products/moscure-ipo-outdoor-mosquito-trap' },
          { label: 'User Manual' },
        ]}
        onBack={() => setProduct(null)}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 space-y-0">

        {/* ── Product Overview ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Cpu}
            title="Product Overview"
            subtitle="Technical specifications for the MC-IPO 1 outdoor mosquito trap."
          />
          <SpecTable rows={SPECS} />
        </DocSection>

        <Divider />

        {/* ── Key Features ──────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Star}
            title="Key Features"
            subtitle="Purpose-built for effective, chemical-free outdoor mosquito control."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <InfoCard key={title} icon={icon} title={title} highlight>
                {desc}
              </InfoCard>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── How It Works ──────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={BookOpen}
            title="How It Works"
            subtitle="Three-step science behind Moscure's effectiveness."
          />
          <div className="flex flex-col gap-3">
            {HOW_IT_WORKS.map((step, i) => (
              <StepRow key={i} index={i}>{step}</StepRow>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── Maintenance ───────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Wrench}
            title="Maintenance"
            subtitle="Keep your device performing at its best with minimal effort."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={MAINTENANCE} />
          </div>
        </DocSection>

      </div>
      <DocPageNav product="outdoor" current="user-manual" />
    </main>
  )
}
