import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Share2, UserCheck, Bell, Trash2, Mail, MapPin, Phone, ChevronRight } from 'lucide-react'

const LAST_UPDATED = 'August 1, 2026'
const EFFECTIVE_DATE = 'August 1, 2026'

const sections = [
  { id: 'information-we-collect', label: 'Information We Collect', icon: Eye },
  { id: 'how-we-use', label: 'How We Use Your Data', icon: UserCheck },
  { id: 'cookies', label: 'Cookies & Tracking', icon: Shield },
  { id: 'sharing', label: 'Data Sharing', icon: Share2 },
  { id: 'security', label: 'Data Security', icon: Lock },
  { id: 'your-rights', label: 'Your Rights', icon: Bell },
  { id: 'retention', label: 'Data Retention', icon: Trash2 },
  { id: 'contact', label: 'Contact Us', icon: Mail },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function SectionCard({ id, icon: Icon, label, accent = 'cyan', children }) {
  const accentMap = {
    cyan: 'from-gradientcyan to-[#00B5A0]',
    pink: 'from-gradientpink to-[#C9253F]',
    yellow: 'from-gradientyellow to-[#E6BF00]',
  }
  const borderMap = {
    cyan: 'border-gradientcyan/25',
    pink: 'border-gradientpink/25',
    yellow: 'border-gradientyellow/25',
  }
  const textMap = {
    cyan: 'text-gradientcyan',
    pink: 'text-gradientpink',
    yellow: 'text-gradientyellow',
  }
  const bgMap = {
    cyan: 'bg-gradientcyan/10',
    pink: 'bg-gradientpink/10',
    yellow: 'bg-gradientyellow/10',
  }

  return (
    <motion.div
      id={id}
      variants={fadeUp}
      className={`relative bg-surface border ${borderMap[accent]} rounded-2xl overflow-hidden mb-8`}
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${accentMap[accent]}`} />
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${bgMap[accent]} border ${borderMap[accent]}`}>
            <Icon size={20} className={textMap[accent]} aria-hidden="true" />
          </div>
          <h2 className={`font-display text-2xl md:text-3xl ${textMap[accent]}`}>{label.toUpperCase()}</h2>
        </div>
        <div className="space-y-4 font-body text-textMuted leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function Highlight({ children }) {
  return <strong className="text-white font-semibold">{children}</strong>
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <ChevronRight size={14} className="text-gradientcyan mt-1 shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SubHeading({ children }) {
  return <h3 className="font-display text-lg text-white mt-6 mb-2">{children}</h3>
}

export default function PrivacyPolicyPage() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen pt-36 pb-24">
      <Helmet>
        <title>Privacy Policy | Moscure</title>
        <meta
          name="description"
          content="Moscure's Privacy Policy — learn how we collect, use, and protect your personal data in compliance with India's Digital Personal Data Protection Act 2023 and international standards."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://moscure.in/privacy-policy" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gradientcyan/40 bg-gradientcyan/10 text-gradientcyan font-mono text-xs uppercase tracking-widest mb-6">
            🔒 Legal
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">
            PRIVACY{' '}
            <span
              className="bg-gradient-to-r from-gradientcyan via-[#00D4C0] to-gradientpink bg-clip-text text-transparent"
            >
              POLICY
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6">
            <div>
              <p className="font-mono text-xs text-textMuted uppercase tracking-widest">Last Updated</p>
              <p className="font-body text-white text-sm mt-1">{LAST_UPDATED}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-textMuted uppercase tracking-widest">Effective Date</p>
              <p className="font-body text-white text-sm mt-1">{EFFECTIVE_DATE}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-textMuted uppercase tracking-widest">Jurisdiction</p>
              <p className="font-body text-white text-sm mt-1">India (DPDP Act 2023)</p>
            </div>
          </div>
          <p className="font-body text-textMuted max-w-2xl text-sm md:text-base leading-relaxed">
            At <Highlight>Moscure</Highlight>, your privacy is as important to us as the safety of your family.
            This policy explains how we handle your personal data when you visit{' '}
            <span className="text-gradientcyan">moscure.in</span>, purchase our products, or interact with our
            services — in full compliance with India's{' '}
            <Highlight>Digital Personal Data Protection (DPDP) Act, 2023</Highlight> and international best
            practices.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Sticky Table of Contents ── */}
          <aside className="lg:w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-surface border border-borderDefault rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-textMuted mb-4">Contents</p>
                <nav aria-label="Privacy policy table of contents">
                  <ul className="space-y-1">
                    {sections.map(({ id, label, icon: Icon }) => (
                      <li key={id}>
                        <button
                          onClick={() => scrollTo(id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left font-body text-sm text-textMuted hover:text-gradientcyan hover:bg-gradientcyan/5 transition-all duration-200 group"
                        >
                          <Icon size={13} className="shrink-0 group-hover:text-gradientcyan" aria-hidden="true" />
                          <span>{label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Quick notice */}
              <div className="mt-4 bg-gradientcyan/5 border border-gradientcyan/20 rounded-2xl p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-gradientcyan mb-2">Quick Note</p>
                <p className="font-body text-xs text-textMuted leading-relaxed">
                  We never sell your personal data. Your information is used solely to deliver and improve your
                  Moscure experience.
                </p>
              </div>
            </motion.div>
          </aside>

          {/* ── Main Content ── */}
          <motion.main
            aria-label="Privacy policy content"
            className="flex-1 min-w-0"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Intro / Scope */}
            <motion.div
              variants={fadeUp}
              className="bg-surface border border-borderDefault rounded-2xl p-8 md:p-10 mb-8"
            >
              <div className="h-[3px] w-full bg-gradient-to-r from-gradientpink via-gradientyellow to-gradientcyan rounded-full mb-8 -mt-8 md:-mt-10 -mx-8 md:-mx-10 w-[calc(100%+4rem)]" />
              <p className="font-body text-textMuted leading-relaxed text-sm md:text-base">
                This Privacy Policy applies to <Highlight>Moscure</Highlight> (operated by its parent company based
                in Gurugram, Haryana, India) and covers all interactions through our website{' '}
                <span className="text-gradientcyan">moscure.in</span>, mobile communications, and customer support
                channels. By using our website or purchasing our products, you agree to the data practices described
                herein.
              </p>
              <p className="font-body text-textMuted leading-relaxed text-sm md:text-base mt-4">
                If you do not agree with this policy, please discontinue use of our services. For questions, contact
                us at{' '}
                <a href="mailto:operations@moscure.com" className="text-gradientcyan hover:underline">
                  operations@moscure.com
                </a>
                .
              </p>
            </motion.div>

            {/* 2. Information We Collect */}
            <SectionCard id="information-we-collect" icon={Eye} label="Information We Collect" accent="cyan">
              <p>
                We collect only the information necessary to process your orders, deliver your products, and provide
                quality support. This includes:
              </p>

              <SubHeading>2.1 Information You Provide Directly</SubHeading>
              <BulletList
                items={[
                  'Full name, email address, phone number when you place an order or contact us',
                  'Delivery address and billing address for order fulfilment',
                  'Payment details (processed securely via third-party gateways — we do not store card numbers)',
                  'Messages, queries, and feedback submitted through our contact form',
                  'Warranty registration details including product serial number',
                ]}
              />

              <SubHeading>2.2 Information Collected Automatically</SubHeading>
              <BulletList
                items={[
                  'IP address, browser type, device type, and operating system',
                  'Pages visited, time spent on pages, and click-through paths',
                  'Referring URLs and search terms used to find our site',
                  'Session identifiers and analytics data via cookies (see Section 4)',
                ]}
              />

              <SubHeading>2.3 Information from Third Parties</SubHeading>
              <BulletList
                items={[
                  'Order and logistics data from our shipping partners (e.g., Shiprocket, Delhivery)',
                  'Payment confirmation from payment processors (e.g., Razorpay, PayU)',
                  'Social media profile data if you choose to connect via social login',
                ]}
              />
            </SectionCard>

            {/* 3. How We Use Your Data */}
            <SectionCard id="how-we-use" icon={UserCheck} label="How We Use Your Data" accent="pink">
              <p>
                Your data is used exclusively to operate and improve our services. We rely on the following{' '}
                <Highlight>lawful bases</Highlight> under the DPDP Act 2023:
              </p>

              <SubHeading>3.1 Order Processing & Fulfilment (Contract)</SubHeading>
              <BulletList
                items={[
                  'Processing and confirming your purchase orders',
                  'Arranging delivery and providing shipment tracking',
                  'Managing warranty claims, replacements, and after-sales support',
                  'Sending order confirmation and delivery notification emails/SMS',
                ]}
              />

              <SubHeading>3.2 Legitimate Business Interests</SubHeading>
              <BulletList
                items={[
                  'Improving our website user experience and product listings',
                  'Detecting and preventing fraudulent transactions',
                  'Analysing purchase trends to manage inventory effectively',
                  'Maintaining records required for tax and regulatory compliance',
                ]}
              />

              <SubHeading>3.3 With Your Consent (Marketing)</SubHeading>
              <BulletList
                items={[
                  'Sending promotional emails, product launches, and seasonal offers',
                  'Personalising advertisements on third-party platforms (Google, Meta)',
                  'Sending WhatsApp messages about your order status or new products',
                ]}
              />
              <p className="mt-3 text-xs border border-gradientpink/20 bg-gradientpink/5 text-gradientpink/80 rounded-xl px-4 py-3">
                ⚠ You may withdraw your marketing consent at any time by clicking "Unsubscribe" in any email or
                contacting us at operations@moscure.com.
              </p>
            </SectionCard>

            {/* 4. Cookies */}
            <SectionCard id="cookies" icon={Shield} label="Cookies & Tracking" accent="yellow">
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and
                understand how visitors interact with our content.
              </p>

              <SubHeading>4.1 Types of Cookies We Use</SubHeading>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-borderDefault">
                      <th className="text-left py-2 pr-4 font-mono uppercase tracking-widest text-white">Type</th>
                      <th className="text-left py-2 pr-4 font-mono uppercase tracking-widest text-white">Purpose</th>
                      <th className="text-left py-2 font-mono uppercase tracking-widest text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderDefault">
                    {[
                      ['Strictly Necessary', 'Session management, security, cart persistence', 'Session'],
                      ['Analytics', 'Google Analytics — page views & user behaviour', '2 years'],
                      ['Marketing', 'Meta Pixel, Google Ads conversion tracking', '90 days'],
                      ['Preferences', 'Remembering your language and display settings', '1 year'],
                    ].map(([type, purpose, duration]) => (
                      <tr key={type}>
                        <td className="py-3 pr-4 text-gradientyellow font-medium">{type}</td>
                        <td className="py-3 pr-4 text-textMuted">{purpose}</td>
                        <td className="py-3 text-textMuted">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <SubHeading>4.2 Managing Cookies</SubHeading>
              <p>
                You can disable non-essential cookies through your browser settings or our cookie consent banner.
                Note that disabling strictly necessary cookies may affect site functionality. Most browsers allow
                you to refuse cookies via settings → privacy → cookies.
              </p>
            </SectionCard>

            {/* 5. Data Sharing */}
            <SectionCard id="sharing" icon={Share2} label="Data Sharing" accent="cyan">
              <p>
                We <Highlight>do not sell, rent, or trade</Highlight> your personal information to third parties.
                We share data only where necessary to provide our services, under strict confidentiality obligations.
              </p>

              <SubHeading>5.1 Service Providers (Data Processors)</SubHeading>
              <BulletList
                items={[
                  'Logistics & shipping partners (for order delivery and tracking)',
                  'Payment gateways (Razorpay / PayU) for secure transaction processing',
                  'Cloud infrastructure providers (for website hosting and data storage)',
                  'Email and SMS service providers (for transactional communications)',
                  'Analytics platforms (Google Analytics) for website performance insights',
                ]}
              />

              <SubHeading>5.2 Legal Disclosures</SubHeading>
              <p>
                We may disclose your data where required to comply with applicable law, a court order, government
                authority request, or to enforce our legal rights. We will notify you of such disclosures where
                legally permitted to do so.
              </p>

              <SubHeading>5.3 Business Transfers</SubHeading>
              <p>
                In the event of a merger, acquisition, or sale of business assets, your data may be transferred to
                the successor entity. You will be notified via email and/or a prominent notice on our website prior
                to any transfer.
              </p>
            </SectionCard>

            {/* 6. Data Security */}
            <SectionCard id="security" icon={Lock} label="Data Security" accent="pink">
              <p>
                We implement industry-standard technical and organisational measures to protect your personal data
                from unauthorised access, loss, or misuse.
              </p>

              <BulletList
                items={[
                  'All data transmissions are encrypted via TLS/SSL (HTTPS)',
                  'Payment data is handled by PCI-DSS compliant payment processors — card numbers are never stored on our servers',
                  'Access to personal data is restricted to authorised personnel on a need-to-know basis',
                  'Our systems are regularly monitored for vulnerabilities and security incidents',
                  'Passwords are hashed using industry-standard algorithms; we do not store plain-text passwords',
                ]}
              />

              <p className="mt-4">
                While we take every precaution to safeguard your data, no method of transmission over the internet
                is 100% secure. In the event of a data breach that poses a risk to your rights, we will notify
                you and the relevant authorities as required by law.
              </p>
            </SectionCard>

            {/* 7. Your Rights */}
            <SectionCard id="your-rights" icon={Bell} label="Your Rights" accent="yellow">
              <p>
                Under the <Highlight>Digital Personal Data Protection (DPDP) Act, 2023</Highlight> and applicable
                law, you have the following rights regarding your personal data:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  { right: 'Right to Access', desc: 'Request a copy of the personal data we hold about you.' },
                  { right: 'Right to Correction', desc: 'Request correction of inaccurate or incomplete data.' },
                  { right: 'Right to Erasure', desc: 'Request deletion of your data where no legitimate basis exists for retention.' },
                  { right: 'Right to Withdraw Consent', desc: 'Withdraw marketing consent at any time without penalty.' },
                  { right: 'Right to Grievance', desc: 'Raise a grievance with our Data Protection Officer.' },
                  { right: 'Right to Nominate', desc: 'Nominate another individual to exercise rights on your behalf in case of death or incapacity.' },
                ].map(({ right, desc }) => (
                  <div
                    key={right}
                    className="bg-gradientyellow/5 border border-gradientyellow/15 rounded-xl p-4"
                  >
                    <p className="text-gradientyellow font-mono text-xs uppercase tracking-wider mb-1">{right}</p>
                    <p className="text-textMuted text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                To exercise any of these rights, email us at{' '}
                <a href="mailto:operations@moscure.com" className="text-gradientcyan hover:underline">
                  operations@moscure.com
                </a>{' '}
                with subject line <Highlight>"Data Rights Request"</Highlight>. We will respond within{' '}
                <Highlight>30 days</Highlight> of receiving your request.
              </p>
            </SectionCard>

            {/* 8. Data Retention */}
            <SectionCard id="retention" icon={Trash2} label="Data Retention" accent="cyan">
              <p>
                We retain your personal data only for as long as necessary for the purposes described in this
                policy, or as required by applicable law:
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-borderDefault">
                      <th className="text-left py-2 pr-4 font-mono uppercase tracking-widest text-white">Data Type</th>
                      <th className="text-left py-2 font-mono uppercase tracking-widest text-white">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderDefault">
                    {[
                      ['Order & transaction records', '7 years (GST / tax compliance)'],
                      ['Customer account data', 'Duration of account + 2 years post-closure'],
                      ['Marketing consent records', '3 years from consent date'],
                      ['Support & complaint records', '2 years from resolution'],
                      ['Website analytics (cookies)', 'Up to 2 years'],
                      ['Warranty registration data', 'Warranty period + 1 year'],
                    ].map(([type, period]) => (
                      <tr key={type}>
                        <td className="py-3 pr-4 text-white">{type}</td>
                        <td className="py-3 text-textMuted">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                After the applicable retention period, data is securely deleted or anonymised. You may request
                early deletion subject to our legal retention obligations.
              </p>
            </SectionCard>

            {/* Children's Privacy */}
            <motion.div
              variants={fadeUp}
              className="bg-gradientpink/5 border border-gradientpink/25 rounded-2xl p-8 md:p-10 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradientpink/10 border border-gradientpink/25 text-2xl">
                  👨‍👩‍👧
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-gradientpink">CHILDREN'S PRIVACY</h2>
              </div>
              <p className="font-body text-textMuted leading-relaxed text-sm md:text-base">
                Moscure products are designed for families, but our online services are intended for individuals
                aged <Highlight>18 years and above</Highlight>. We do not knowingly collect personal data from
                children under 18. If we become aware that a child has provided us personal data without verifiable
                parental consent, we will promptly delete such information. Parents or guardians who believe their
                child has submitted personal data to us should contact us immediately at{' '}
                <a href="mailto:operations@moscure.com" className="text-gradientcyan hover:underline">
                  operations@moscure.com
                </a>
                .
              </p>
            </motion.div>

            {/* Third-Party Links */}
            <motion.div
              variants={fadeUp}
              className="bg-surface border border-borderDefault rounded-2xl p-8 md:p-10 mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl text-gradientyellow mb-4">
                THIRD-PARTY LINKS
              </h2>
              <p className="font-body text-textMuted leading-relaxed text-sm md:text-base">
                Our website may contain links to third-party websites, including e-commerce platforms (e.g., Amazon,
                Flipkart) and social media channels. This Privacy Policy applies only to{' '}
                <span className="text-gradientcyan">moscure.in</span>. We are not responsible for the privacy
                practices of external sites and encourage you to review their policies before providing any personal
                data.
              </p>
            </motion.div>

            {/* Changes to this Policy */}
            <motion.div
              variants={fadeUp}
              className="bg-surface border border-borderDefault rounded-2xl p-8 md:p-10 mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl text-gradientcyan mb-4">
                CHANGES TO THIS POLICY
              </h2>
              <p className="font-body text-textMuted leading-relaxed text-sm md:text-base">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                or applicable law. When we make material changes, we will update the{' '}
                <Highlight>"Last Updated"</Highlight> date at the top of this page and, where appropriate, notify
                you via email. Your continued use of our website after any changes constitutes your acceptance of
                the updated policy.
              </p>
            </motion.div>

            {/* 9. Contact */}
            <SectionCard id="contact" icon={Mail} label="Contact Us" accent="pink">
              <p>
                For any privacy-related queries, data rights requests, or grievances, please reach our{' '}
                <Highlight>Data Protection Officer (DPO)</Highlight>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <a
                  href="mailto:operations@moscure.com"
                  className="flex items-center gap-3 bg-gradientpink/5 border border-gradientpink/20 rounded-xl p-4 hover:bg-gradientpink/10 transition-colors group"
                  aria-label="Email Moscure DPO"
                >
                  <Mail size={18} className="text-gradientpink shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-gradientpink uppercase tracking-wider mb-0.5">Email</p>
                    <p className="font-body text-xs text-textMuted group-hover:text-white transition-colors break-all">
                      operations@moscure.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919217339695"
                  className="flex items-center gap-3 bg-gradientcyan/5 border border-gradientcyan/20 rounded-xl p-4 hover:bg-gradientcyan/10 transition-colors group"
                  aria-label="WhatsApp Moscure support"
                >
                  <Phone size={18} className="text-gradientcyan shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-gradientcyan uppercase tracking-wider mb-0.5">WhatsApp us on :</p>
                    <p className="font-body text-xs text-textMuted group-hover:text-white transition-colors">
                      +91 9217339695
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 bg-gradientyellow/5 border border-gradientyellow/20 rounded-xl p-4">
                  <MapPin size={18} className="text-gradientyellow shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-gradientyellow uppercase tracking-wider mb-0.5">Address</p>
                    <p className="font-body text-xs text-textMuted leading-relaxed">
                      DLF Corporate Greens, Tower No-4,<br />
                      12th Floor, Sec-74A,<br />
                      Gurugram, Haryana – 122004
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-textMuted">
                We aim to respond to all data-related enquiries within <Highlight>30 business days</Highlight>.
                If you are not satisfied with our response, you may lodge a complaint with the{' '}
                <a
                  href="https://www.meity.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gradientcyan hover:underline"
                >
                  Data Protection Board of India
                </a>{' '}
                once established under the DPDP Act 2023.
              </p>
            </SectionCard>
          </motion.main>
        </div>
      </div>
    </div>
  )
}
