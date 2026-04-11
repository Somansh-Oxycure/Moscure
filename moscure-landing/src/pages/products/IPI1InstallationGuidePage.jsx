import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, ArrowUpDown, Plug, Lightbulb, Sun,
  Battery, Smartphone, Monitor,
} from 'lucide-react'
import {
  DocHero, DocSection, SectionHeading, InfoCard,
  BulletList, IconRow, Divider, DocPageNav,
} from '../../components/DocComponents'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACEMENT = [
  'Use in dark or dimly lit rooms — competing ambient light sources reduce the UV lamp\'s attraction power significantly.',
  'Position away from primary seating and sleeping areas so mosquitoes are drawn toward the trap, not toward people.',
  'Keep in a low-wind environment; drafts and ceiling fans disrupt the trap\'s suction and drastically reduce capture rates.',
  'For wall-adjacent placement, position the unit 30–60 cm from walls to allow optimal 360° airflow and UV light spread.',
]

const POWER_SOURCES = [
  {
    icon: Monitor,
    title: 'Laptop or Desktop USB',
    desc: 'Plug directly into any USB-A port on your laptop or computer — ideal for a desk, study room, or office.',
  },
  {
    icon: Battery,
    title: 'Power Bank',
    desc: 'Use any standard 5V USB power bank for complete portability — ideal for travel, guestrooms, or camping.',
  },
  {
    icon: Smartphone,
    title: '5V Mobile Adapter',
    desc: 'Any standard phone charger with 5V output and minimum 0.3A current will power the device reliably.',
  },
]

const USAGE_TIPS = [
  'Keep the device powered ON continuously — especially overnight — for the best long-term mosquito reduction results.',
  'Dusk, night, and dawn are peak mosquito activity windows; ensure the device remains fully operational during these periods.',
  'Place in a calm, shaded area away from open doors and windows to prevent airflow interference with the trap suction.',
  'Avoid frequent on/off cycling — sustained continuous operation dramatically outperforms intermittent use.',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IPI1InstallationGuidePage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Installation Guide – MOSCURE IPI 1 | USB Mosquito Trap Setup'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta.content =
      'Step-by-step installation guide for the MOSCURE IPI 1 USB mosquito trap. Ideal placement, height recommendations, power setup options, and best usage tips.'

    return () => { document.title = 'Moscure' }
  }, [])

  return (
    <main>
      <DocHero
        badge="IPI Indoor · Setup"
        title="Installation Guide"
        subtitle="Set up your MOSCURE IPI 1 for maximum mosquito capture — indoors, at home, travelling, or on the go."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'IPI 1', href: '/products/moscure-ipi-indoor-mosquito-trap' },
          { label: 'Installation Guide' },
        ]}
        onBack={() => navigate('/installation-guide')}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* ── Optimal Placement ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={MapPin}
            title="Optimal Placement"
            subtitle="Where you place your IPI 1 is the single biggest driver of its effectiveness."
          />
          <div className="p-6 rounded-2xl border border-borderDefault bg-surface">
            <BulletList items={PLACEMENT} />
          </div>
        </DocSection>

        <Divider />

        {/* ── Height Guidelines ───────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={ArrowUpDown}
            title="Height Guidelines"
            subtitle="Position within the ideal range to intercept peak mosquito flight paths."
          />
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-gradientcyan/20 bg-gradientcyan/5">
            <div className="flex-shrink-0 text-center">
              <div className="font-display text-6xl text-gradientcyan leading-none">1.0</div>
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
              Place the IPI 1 between{' '}
              <strong className="text-white">1 and 2 metres</strong> above the ground.
              Avoid positions below 50 cm — mosquitoes rarely fly that close to the floor and interception rates drop sharply.
            </p>
          </div>
        </DocSection>

        <Divider />

        {/* ── Power Setup ─────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Plug}
            title="Power Setup"
            subtitle="Connect via Micro USB (Type B) to any of these compatible power sources."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {POWER_SOURCES.map(({ icon, title, desc }) => (
              <InfoCard key={title} icon={icon} title={title} highlight>
                {desc}
              </InfoCard>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradientcyan/5 border border-gradientcyan/15">
            <Plug size={14} className="text-gradientcyan flex-shrink-0" />
            <p className="font-mono text-xs text-textMuted">
              Minimum required: <span className="text-white">5V / 0.3A</span> &nbsp;·&nbsp; Recommended: standard phone charger or USB power bank
            </p>
          </div>
        </DocSection>

        <Divider />

        {/* ── Usage Tips ──────────────────────────────────────────────────── */}
        <DocSection>
          <SectionHeading
            icon={Lightbulb}
            title="Usage Tips"
            subtitle="Best practices for consistent, long-term performance."
          />
          <div className="flex flex-col gap-3">
            {USAGE_TIPS.map((tip, i) => (
              <IconRow key={i} icon={Sun}>{tip}</IconRow>
            ))}
          </div>
        </DocSection>

      </div>
      <DocPageNav product="indoor" current="installation" />
    </main>
  )
}
