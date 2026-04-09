import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import logoImg from '../assets/logo.png'

const QUICK_LINKS = [
  { label: 'Home',       href: '#home',       page: 'landing' },
  { label: 'Product',    href: '#products',   page: 'product' },
  { label: 'Diseases',   href: '#diseases',   page: 'diseases' },
  { label: 'Comparison', href: '#comparison', page: 'comparison' },
  { label: 'About Us',   href: '#about-hero', page: 'about' },
  { label: 'Contact',    href: '#contact-hero', page: 'contact' },
]

const RESOURCES = [
  { label: 'User Manual', href: '#' },
  { label: 'Installation Guide', href: '#' },
  { label: 'FAQs', href: '#' },
  { label: 'Warranty Info', href: '#' },
  { label: 'Safety Guidelines', href: '#' },
]

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mos_cure' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Twitter, label: 'Twitter / X', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
]

export default function Footer({ onNavigate }) {
  const handleLink = (link, e) => {
    e.preventDefault()
    if (link.page === 'product') {
      onNavigate?.('product')
    } else if (link.page === 'diseases') {
      onNavigate?.('diseases')
    } else if (link.page === 'comparison') {
      onNavigate?.('comparison')
    } else if (link.page === 'about') {
      onNavigate?.('about')
    } else if (link.page === 'contact') {
      onNavigate?.('contact')
    } else {
      onNavigate?.('landing')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="bg-surface border-t border-borderDefault">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <button onClick={() => { onNavigate?.('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-left">
              <img src={logoImg} alt="Moscure" className="h-24 brightness-125 w-auto object-contain" />
            </button>
            <p className="font-body text-sm text-textMuted leading-relaxed">
              India&apos;s most effective MLID and Phototaxis technology mosquito trap. Chemical-free,
              family-safe protection against Dengue, Malaria, and Chikungunya.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target='blank'
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-borderDefault hover:scale-125 text-gradientcyan transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(link, e)}
                    className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-5">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5">
              {RESOURCES.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="text-base mt-0.5">📍</span>
                <span className="font-body text-sm text-textMuted leading-relaxed">
                  DLF Corporate Greens, <br /> Tower No-4, 12th Floor 1207 <br /> to 1212 and 1214 to 1216, <br /> Southern peripheral Rd, Sec-74A, Gurugram, Haryana- <br /> 122004
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">📞</span>
                <a
                  href="tel:+918010111177"
                  className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors"
                >
                  +91 80101 11177
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">✉</span>
                <a
                  href="mailto:operations@moscure.com"
                  className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors"
                >
                  operations@moscure.com
                </a>
              </li>
            </ul>
            <a
              href="#contact-hero"
              onClick={(e) => { e.preventDefault(); onNavigate?.('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="mt-6 inline-flex items-center gap-2 bg-gradientcyan/10 border border-gradientcyan/30 text-gradientcyan font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-gradientcyan/20 transition-colors duration-200"
            >
              Get In Touch →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-borderDefault mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-textMuted">
            © 2026 Moscure. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors">
              Privacy Policy
            </a>
            <span className="text-borderDefault">·</span>
            <a href="#" className="font-body text-sm text-textMuted hover:text-gradientcyan transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
