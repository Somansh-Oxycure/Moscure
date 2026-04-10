import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, Users, Shield, Leaf, TriangleAlert, Wind } from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, IconRow, Divider,
} from '../../components/DocComponents'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ELECTRICAL = [
  'Use only a 5V DC power supply. Never use a higher-voltage adapter as it will damage the device.',
  'Ensure the power source provides a minimum of 0.3A current — lower output causes unreliable operation.',
  'Do not use incompatible, counterfeit, or non-certified USB adapters or cables.',
  'Always connect the USB cable to the device first, then connect to the power source.',
  'Unplug immediately if the device emits unusual smells, heat, sparks, or sounds.',
]

const UV_SAFETY = [
  {
    title: 'Avoid Direct Eye Exposure',
    desc: 'Do not stare directly into the UV LED, especially at distances closer than 1 metre. UV output is intense at short range.',
  },
  {
    title: 'Limit Skin Exposure',
    desc: 'Avoid prolonged direct skin exposure to the UV light. The light is designed for insect attraction only — not human use.',
  },
  {
    title: 'Not a Therapeutic Device',
    desc: 'The UV wavelength is calibrated solely for mosquito phototaxis and is not suitable as a grow light, health lamp, or therapy device.',
  },
]

const GENERAL = [
  'Keep the device out of reach of children and pets while plugged in and operating.',
  'Do not attempt to disassemble, modify, or self-repair any part of the device.',
  'Avoid dropping or subjecting the device to physical impact — internal components are precision-calibrated.',
  'Do not expose the device to rain, humidity, or liquid submersion — the IPI 1 is designed for indoor dry use only.',
]

const USAGE_SAFETY = [
  'Maintain at least 1 metre of clearance between the device and regular seating, sleeping, or working positions.',
  'Do not place in high-traffic pedestrian areas where people or pets may accidentally knock or contact the device.',
  'Never touch or obstruct the fan inlet or outlet while the device is powered on.',
  'Always unplug before moving the device to a new location — do not carry it while connected.',
]

const ENVIRONMENTAL = [
  'Do not place near UV-sensitive materials such as certain plastics, artworks, photographs, or fabrics.',
  'Avoid operating near open doors or windows where strong drafts will interfere with fan suction performance.',
  'Keep the device away from direct sunlight — ambient UV from sunlight reduces the trap\'s relative attractiveness to mosquitoes.',
  'Ensure adequate ventilation around the device; do not enclose it in a cabinet or enclosed space.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IPI1SafetyGuidelinesPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Safety Guidelines – MOSCURE IPI 1 | USB Mosquito Trap Safety'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content =
      'Important safety guidelines for the MOSCURE IPI 1 USB mosquito trap. Covers electrical safety, UV light precautions, general handling, usage safety, and environmental guidelines.'

    return () => { document.title = 'Moscure' }
  }, [])

  return (
    <main>
      <DocHero
        badge="IPI Indoor · Safety"
        title="Safety Guidelines"
        subtitle="Read and follow all safety instructions before installing and operating your MOSCURE IPI 1."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPI 1', href: '/products/moscure-ipi-indoor-mosquito-trap' },
          { label: 'Safety Guidelines' },
        ]}
        onBack={() => navigate('/safety')}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Warning banner ──────────────────────────────────────────────── */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradientyellow/5 border border-gradientyellow/30 mb-2">
          <TriangleAlert size={24} className="text-gradientyellow flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="font-body text-sm text-textMuted leading-relaxed">
            <strong className="text-white">Read all instructions before use.</strong>{' '}
            Failure to follow these safety guidelines may result in personal injury, property damage,
            or invalidation of your product warranty.
          </p>
        </div>

        {/* ── Electrical Safety ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Zap}
            title="Electrical Safety"
            subtitle="The IPI 1 is USB powered — use only a compatible 5V power source."
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
            subtitle="Everyday precautions for safe, continuous indoor operation."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={GENERAL} />
          </div>
        </DocSection>

        <Divider />

        {/* ── Usage Safety ────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Shield}
            title="Usage Safety"
            subtitle="Safe operating distances and practices to protect everyone nearby."
          />
          <div className="flex flex-col gap-3">
            {USAGE_SAFETY.map((item, i) => (
              <IconRow key={i} icon={TriangleAlert} accentColor="yellow">{item}</IconRow>
            ))}
          </div>
        </DocSection>

        <Divider />

        {/* ── Environmental Safety ────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Leaf}
            title="Environmental Safety"
            subtitle="Placement conditions that protect both the device and your space."
          />
          <div className="flex flex-col gap-3">
            {ENVIRONMENTAL.map((item, i) => (
              <IconRow key={i} icon={Wind}>{item}</IconRow>
            ))}
          </div>
        </DocSection>

      </div>
    </main>
  )
}
