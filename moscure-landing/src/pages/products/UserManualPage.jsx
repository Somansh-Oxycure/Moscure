import { useEffect, useState } from 'react'
import {
  BookOpen, Cpu, Star, Wrench, Zap,
  Droplets, Wind, CheckCircle, Settings,
} from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, SpecTable, StepRow, Divider,
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
  'The precision-tuned UV LED emits light at the exact wavelength that activates mosquito phototaxis (light-seeking behavior), drawing them from up to several metres away.',
  'A built-in fan creates a gentle, steady suction airflow that silently pulls approaching mosquitoes through the inlet opening and into the sealed collection container.',
  'Trapped inside and cut off from air and moisture, mosquitoes die through natural dehydration — effectively and without any chemicals, noise, or zapping.',
]

const MAINTENANCE = [
  'Clean the collection container at least once per week to maintain peak trapping efficiency.',
  'Always unplug the device from the power source before starting any cleaning.',
  'Wash the container with mild soap and lukewarm water — avoid harsh chemicals or abrasives.',
  'Rinse thoroughly and allow all components to dry completely before reassembling and reconnecting.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserManualPage() {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!product)    document.title = 'User Manual – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'User Manual – MOSCURE IPO 1 | Outdoor Mosquito Trap'
    if (product === 'indoor')  document.title = 'User Manual – MOSCURE IPI 1 | Indoor Mosquito Trap'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE product user manual. Select your indoor or outdoor mosquito trap to view specifications, features, and maintenance guidance.'
    if (product === 'outdoor') meta.content = 'Complete user manual for the MOSCURE IPO 1 outdoor mosquito trap. Covers product specifications, key features, how it works, and maintenance instructions.'
    if (product === 'indoor')  meta.content = 'User manual for the MOSCURE IPI 1 indoor mosquito trap. Coming soon.'

    return () => { document.title = 'Moscure' }
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
    </main>
  )
}
