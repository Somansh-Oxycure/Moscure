import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'HOME',       href: '#home',        page: 'landing' },
  { label: 'PRODUCT',    href: '#products',    page: 'product' },
  { label: 'DISEASES',   href: '#hero',        page: 'diseases' },
  { label: 'COMPARISON', href: '#comparison',  page: 'comparison' },
  { label: 'ABOUT US',   href: '#about-hero',  page: 'about' },
  { label: 'ABOUT V2',   href: '#about-hero',  page: 'about-v2' },
  { label: 'CONTACT',    href: '#contact-hero', page: 'contact' },
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
    if (link.page === 'product') {
      e.preventDefault()
      onNavigate?.('product')
    } else if (link.page === 'diseases') {
      e.preventDefault()
      onNavigate?.('diseases')
    } else if (link.page === 'comparison') {
      e.preventDefault()
      onNavigate?.('comparison')
    } else if (link.page === 'about') {
      e.preventDefault()
      onNavigate?.('about')
    } else if (link.page === 'about-v2') {
      e.preventDefault()
      onNavigate?.('about-v2')
    } else if (link.page === 'contact') {
      e.preventDefault()
      onNavigate?.('contact')
    } else if (location.pathname !== '/') {
      e.preventDefault()
      onNavigate?.('landing')
    }
  }

  const isActiveLink = (link) => {
    if (link.page === 'product') return location.pathname === '/product'
    if (link.page === 'diseases') return location.pathname === '/diseases'
    if (link.page === 'comparison') return location.pathname === '/comparison'
    if (link.page === 'about') return location.pathname === '/about'
    if (link.page === 'about-v2') return location.pathname === '/about-v2'
    if (link.page === 'contact') return location.pathname === '/contact'
    return location.pathname === '/' && link.label === 'HOME'
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-borderDefault shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto mt-4 mb-2 px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate?.('landing')}
            className="flex items-center self-center gap-3 group shrink-0"
          >
            <img
              src={logoImg}
              alt="Moscure Logo"
              className="h-24 w-auto object-contain brightness-150"
            />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link, e)}
                  className={`relative px-3 py-1.5 font-mono text-xs tracking-widest transition-colors duration-200 group ${
                    isActiveLink(link)
                      ? 'text-gradientcyan'
                      : 'text-textMuted hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-px bg-gradientcyan transition-transform duration-300 origin-left ${
                      isActiveLink(link)
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
            <motion.button
              onClick={() => onNavigate?.('product')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 bg-gradientcyan text-background font-bold font-mono text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-gradientcyan/30 transition-shadow duration-300"
            >
              BUY NOW
              <span className="text-base leading-none">→</span>
            </motion.button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
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
            <ul className="flex flex-col px-6 py-4 gap-1">
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
                    className={`block py-3 font-mono text-sm tracking-widest border-b border-borderDefault transition-colors ${
                      isActiveLink(link)
                        ? 'text-gradientcyan'
                        : 'text-textMuted hover:text-gradientcyan'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4 pb-2">
                <button
                  onClick={() => { onNavigate?.('product'); setMobileOpen(false) }}
                  className="w-full text-center bg-gradientcyan text-background font-bold font-mono text-sm px-6 py-3 rounded-full"
                >
                  BUY NOW →
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
