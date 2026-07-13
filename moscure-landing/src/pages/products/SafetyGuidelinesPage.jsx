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
  'Use only with a 100–240V AC power supply. Never exceed the specified input voltage — using a higher voltage can permanently damage the device and pose a fire hazard.',
  'Always use the original power adapter and power cord supplied with the device. Third-party adapters may not meet the required safety certifications.',
  'Do not operate the device near water, swimming pools, or in areas of high moisture exposure. The device is designed for dry or weather-protected environments only.',
  'Keep both the device and power cord well away from flammable materials and direct heat sources such as stoves, radiators, and candles.',
  'Do not use a frayed, cut, pinched, or otherwise damaged power cord — replace it immediately by contacting Moscure support.',
  'Always unplug the device from the power source before cleaning, inspecting, or moving it to a new location.',
  'Do not run the power cord under rugs, carpets, or through doorways where it may be pinched or damaged over time.',
  'If a power surge or outage occurs while the device is running, unplug it and allow at least 30 seconds before reconnecting to power.',
]

const UV_SAFETY = [
  {
    title: 'Avoid Direct Eye Exposure',
    desc: 'Do not stare directly into the UV LED, especially at distances closer than 1 metre. The UV output is intense at short range and may cause temporary eye discomfort. Supervise children in the same room as the device.',
  },
  {
    title: 'Limit Skin Exposure',
    desc: 'Avoid prolonged skin exposure to the UV light source. The light is designed solely for insect attraction, not human use. If you handle the device while it is on, keep your hands away from the LED aperture.',
  },
  {
    title: 'Not a Therapeutic Light',
    desc: 'The UV wavelength is calibrated for mosquito phototaxis only — it is not a grow light, health lamp, or therapeutic device. Do not use it as a substitute for any medical or cosmetic UV treatment.',
  },
]

const GENERAL = [
  'Keep the device out of reach of children under the age of 10 and pets at all times while it is plugged in and operating.',
  'Do not attempt to disassemble, modify, or perform self-repair on any part of the device. Unauthorized disassembly voids the warranty and may create electrical hazards.',
  'Avoid dropping or subjecting the device to strong physical impact — internal components, including the UV LED, may be damaged and result in reduced performance or failure.',
  'If the device emits unusual smells, smoke, sparks, or sounds, unplug it immediately from the power source and do not reconnect. Contact Moscure support for diagnosis and replacement.',
  'Do not cover or enclose the device during operation. Ensure at least 30 cm of clearance on all sides for proper airflow and heat dissipation.',
  'Regularly inspect the power cord and plug for signs of wear, heat discolouration, or damage. Replace if any abnormality is found.',
]

const PLACEMENT = [
  'Do not install in high-traffic pedestrian areas where people or animals may accidentally contact the device or trip on the power cord.',
  'Keep the power plug and socket area free of dust, moisture, and debris buildup — clogged sockets can cause overheating.',
  'If hung from a fixture, ensure the hook and mounting point are completely secure and rated for at least twice the device\'s weight. Do not allow the device to swing or spin, as this stresses the cable.',
  'Provide adequate ventilation around the device — avoid enclosing it in a cabinet, drawer, or any space where heat can accumulate during extended operation.',
  'Position the device away from direct sunlight, rain, or falling water unless the device is the IPX4-rated outdoor IPO model.',
  'When storing the device for extended periods, clean the collection tray, coil the power cord loosely, and store in a dry, cool location away from direct sunlight.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SafetyGuidelinesPage() {
  const location = useLocation()
  const [product, setProduct] = useState(location.state?.product ?? null)

  useEffect(() => {
    if (!product)    document.title = 'Safety Guidelines – Select Your MOSCURE Product'
    if (product === 'outdoor') document.title = 'Safety Guidelines – MOSCURE IPO 1 | Safe Usage Instructions'
    if (product === 'indoor')  document.title = 'Safety Guidelines – MOSCURE IPI 1 | Indoor Trap Safety'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (!product) meta.content = 'MOSCURE safety guidelines. Select your mosquito trap to view electrical safety, UV precautions, and safe handling instructions for indoor and outdoor use.'
    if (product === 'outdoor') meta.content = 'Complete safety guidelines for the MOSCURE IPO 1 Outdoor Mosquito Trap. Covers electrical safety, UV light precautions, general handling, and safe placement practices to protect your family.'
    if (product === 'indoor')  meta.content = 'Safety guidelines for the MOSCURE IPI 1 Indoor Mosquito Trap. Learn how to safely operate your UV LED mosquito trap around children, pets, and electrical systems.'

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalCreated = !canonical
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    const prevCanonical = canonical.href
    canonical.href = 'https://www.moscure.com/safety/'

    return () => {
      document.title = 'Moscure'
      if (canonicalCreated) canonical.remove()
      else canonical.href = prevCanonical
    }
  }, [product])

  if (!product) return <DocProductSelector docTitle="Safety Guidelines" onSelect={setProduct} indoorPath="/ipi1/safety" />

  return (
    <main>
      <DocHero
        badge="Safety · IPO Outdoor"
        title="Safety Guidelines"
        subtitle="Read and follow all safety instructions before installing and operating your MOSCURE IPO 1 Outdoor Mosquito Trap. Your safety is our highest priority."
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
            or invalidation of your warranty. Keep this document for future reference.
          </p>
        </div>

        {/* ── Electrical Safety ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Zap}
            title="Electrical Safety"
            subtitle="Ensure the correct power supply and a safe electrical environment before operating."
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
            subtitle="The built-in UV LED requires careful awareness around people and prolonged exposure."
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
            subtitle="Everyday precautions for safe, continuous operation around family and pets."
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
            subtitle="Safe installation and positioning practices to prevent accidents and maximise performance."
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
