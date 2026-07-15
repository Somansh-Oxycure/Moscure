import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo.webp'

const NAV_LINKS = [
  { label: 'HOME', href: '/', page: 'landing' },
  { label: 'PRODUCT', href: '/product', page: 'product' },
  { label: 'DISEASES', href: '/diseases', page: 'diseases' },
  { label: 'COMPARISON', href: '/comparison', page: 'comparison' },
  { label: 'ABOUT US', href: '/about', page: 'about' },
  { label: 'CONTACT', href: '/contact', page: 'contact' },
]

export default function Navbar({ onNavigate }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (link, e) => {
    setMobileOpen(false)
    // Allow normal navigation — href is already the real URL
    // Only prevent default if we want to use the onNavigate handler for SPA routing
    e.preventDefault()
    onNavigate?.(link.page)
  }

  const isActiveLink = (link) => {
    if (link.page === 'landing') return location.pathname === '/'
    return location.pathname.startsWith(link.href) && link.href !== '/'
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-borderDefault shadow-lg shadow-black/40'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto mt-4 mb-2 px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo — crawlable Link instead of button */}
          <Link
            to="/"
            onClick={() => onNavigate?.('landing')}
            className="flex items-center self-center gap-3 group shrink-0"
            aria-label="Moscure — Go to Homepage"
          >
            <img
              src={logoImg}
              alt="Moscure UV mosquito trap official logo"
              width={96}
              height={96}
              className="h-24 w-auto object-contain brightness-150"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link, e)}
                  className={`relative px-3 py-1.5 font-mono text-xs tracking-widest transition-colors duration-200 group ${isActiveLink(link)
                      ? 'text-gradientcyan'
                      : 'text-textMuted hover:text-white'
                    }`}
                  aria-current={isActiveLink(link) ? 'page' : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-px bg-gradientcyan transition-transform duration-300 origin-left ${isActiveLink(link)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/product"
              onClick={() => onNavigate?.('product')}
              className="hidden md:inline-flex items-center gap-2 bg-gradientcyan text-background font-bold font-mono text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-gradientcyan/30 hover:scale-105 active:scale-97 transition-all duration-300"
              aria-label="Browse Moscure mosquito trap products"
            >
              Browse
              <span className="text-base leading-none">→</span>
            </Link>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 text-textMuted hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-borderDefault overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1" role="navigation" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    className={`block py-3 font-mono text-sm tracking-widest border-b border-borderDefault transition-colors ${isActiveLink(link)
                        ? 'text-gradientcyan'
                        : 'text-textMuted hover:text-gradientcyan'
                      }`}
                    aria-current={isActiveLink(link) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4 pb-2">
                <Link
                  to="/product"
                  onClick={() => { onNavigate?.('product'); setMobileOpen(false) }}
                  className="block w-full text-center bg-gradientcyan text-background font-bold font-mono text-sm px-6 py-3 rounded-full"
                  aria-label="Discover Moscure mosquito trap products"
                >
                  Discover Moscure →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
