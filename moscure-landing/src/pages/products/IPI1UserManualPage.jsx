import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Cpu, Star, BookOpen, Wrench,
  Zap, Plug, Package, Droplets, Settings,
  ShieldCheck, Wind,
} from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, SpecTable, StepRow, Divider,
} from '../../components/DocComponents'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPECS = [
  { label: 'Model',             value: 'MC-IPI 1' },
  { label: 'Power Input',       value: '5V DC via USB' },
  { label: 'Power Consumption', value: '1.5W' },
  { label: 'Dimensions',        value: '119mm × 178mm' },
  { label: 'Weight',            value: '280g' },
  { label: 'Connectivity',      value: 'Micro USB (Type B)' },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Energy-Efficient UV LED',
    desc: '365nm wavelength UV light precisely tuned to mosquito phototaxis — powerful attraction at only 1.5W.',
  },
  {
    icon: Package,
    title: 'Ultra-Portable Design',
    desc: 'Weighing just 280g with a compact foldable build — slips into a bag for travel, camping, or desk use.',
  },
  {
    icon: Plug,
    title: 'Universal USB Power',
    desc: 'Runs on any 5V USB source — laptop port, power bank, or mobile charger. No wall socket required.',
  },
  {
    icon: Droplets,
    title: 'Chemical-Free & Odor-Free',
    desc: 'No pesticides, sprays, or harmful gases. Completely safe for children, pets, and sensitive individuals.',
  },
  {
    icon: Settings,
    title: 'Zero Consumables',
    desc: 'No replacement bulbs, no refills needed. Plug in and let it operate — no recurring costs.',
  },
  {
    icon: Wind,
    title: 'Removable Collection Net',
    desc: 'Slide-out net design for quick, hygienic disposal of trapped insects — cleaned in under a minute.',
  },
  {
    icon: ShieldCheck,
    title: 'Silent Dehydration Mechanism',
    desc: 'Captured mosquitoes die through natural dehydration in the sealed net — no noise, no chemicals.',
  },
  {
    icon: BookOpen,
    title: 'Optimised UV Wavelength',
    desc: 'Precisely calibrated output activates the mosquito phototaxis instinct for maximum lure effectiveness.',
  },
]

const HOW_IT_WORKS = [
  'The 365nm UV LED emits light at a wavelength specifically calibrated to activate mosquito phototaxis (light-seeking behaviour), drawing them towards the device from the surrounding area.',
  'A silent internal fan generates a continuous, steady airflow that pulls approaching mosquitoes through the inlet and into the removable collection net — without noise or disturbance.',
  'Trapped inside the sealed net and cut off from air and moisture, mosquitoes die through natural dehydration — safely and without any chemicals, sprays, or noise.',
]

const MAINTENANCE = [
  'Clean the collection net at least once per week to maintain peak trapping effectiveness.',
  'Always unplug the USB cable from the power source before performing any cleaning.',
  'Remove the collection net from the device and empty trapped insects into a bin.',
  'Wash the net and container with warm, mildly soapy water to remove any residue.',
  'Allow all parts to dry completely before reassembling and reconnecting the device.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IPI1UserManualPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'User Manual – MOSCURE IPI 1 | Portable USB Mosquito Trap'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content =
      'Complete user manual for the MOSCURE IPI 1 portable USB mosquito trap. Covers product specifications, key features, how it works, and maintenance instructions.'

    return () => { document.title = 'Moscure' }
  }, [])

  return (
    <main>
      <DocHero
        badge="IPI Indoor · Documentation"
        title="User Manual"
        subtitle="Complete usage guide for the MOSCURE IPI 1 — your compact, USB-powered indoor mosquito trap. Model: MC-IPI 1."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPI 1', href: '/products/moscure-ipi-indoor-mosquito-trap' },
          { label: 'User Manual' },
        ]}
        onBack={() => navigate('/user-manual')}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 space-y-0">

        {/* ── Product Overview ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Cpu}
            title="Product Overview"
            subtitle="Technical specifications for the MC-IPI 1 portable indoor mosquito trap."
          />
          <SpecTable rows={SPECS} />
        </DocSection>

        <Divider />

        {/* ── Key Features ──────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Star}
            title="Key Features"
            subtitle="Built for quiet, chemical-free indoor protection — compact enough to go anywhere."
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
            subtitle="Three-step science behind silent, effective indoor mosquito capture."
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
            subtitle="Keep your IPI 1 performing at its best with minimal effort."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={MAINTENANCE} />
          </div>
        </DocSection>

      </div>
    </main>
  )
}
