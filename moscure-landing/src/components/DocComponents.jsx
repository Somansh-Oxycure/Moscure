import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Wrench, FileText, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function DocHero({ badge, title, subtitle, breadcrumb, onBack }) {
  return (
    <section className="relative bg-surface border-b border-borderDefault overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradientcyan/5 via-transparent to-gradientpink/5 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradientcyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 relative">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-gradientcyan transition-colors duration-200 uppercase tracking-widest mb-6 group"
          >
            <ChevronRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Product Selection
          </button>
        )}

        {/* Breadcrumb */}
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="font-mono text-xs text-textMuted hover:text-gradientcyan transition-colors duration-200 uppercase tracking-widest"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-mono text-xs text-gradientcyan uppercase tracking-widest">
                    {crumb.label}
                  </span>
                )}
                {i < breadcrumb.length - 1 && (
                  <ChevronRight size={12} className="text-borderDefault flex-shrink-0" />
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gradientcyan/30 bg-gradientcyan/10 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradientcyan animate-pulse" />
            <span className="text-xs font-mono text-gradientcyan uppercase tracking-widest">{badge}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-5xl md:text-7xl text-white leading-none mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-base md:text-lg text-textMuted max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

// ─── Section wrapper ───────────────────────────────────────────────────────────
export function DocSection({ children, className = '' }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className={`py-10 ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ─── Section heading with icon ─────────────────────────────────────────────────
export function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      {Icon && (
        <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-gradientcyan/10 border border-gradientcyan/20 mt-0.5">
          <Icon size={20} className="text-gradientcyan" />
        </div>
      )}
      <div>
        <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">{title}</h2>
        {subtitle && (
          <p className="font-body text-sm text-textMuted mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

// ─── Info card ─────────────────────────────────────────────────────────────────
export function InfoCard({ icon: Icon, title, children, highlight = false, accentColor = 'cyan' }) {
  const borderClass =
    accentColor === 'pink'
      ? 'hover:border-gradientpink/40'
      : accentColor === 'yellow'
      ? 'hover:border-gradientyellow/40'
      : 'hover:border-gradientcyan/40'

  const barClass =
    accentColor === 'pink'
      ? 'from-gradientpink'
      : accentColor === 'yellow'
      ? 'from-gradientyellow'
      : 'from-gradientcyan'

  return (
    <div
      className={`group relative p-5 rounded-2xl border border-borderDefault bg-surface hover:bg-surfaceHover transition-all duration-300 ${borderClass}`}
    >
      {highlight && (
        <div
          className={`absolute top-0 left-6 w-10 h-px bg-gradient-to-r ${barClass} to-transparent`}
        />
      )}
      {Icon && (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradientcyan/10 border border-gradientcyan/20 mb-3 group-hover:bg-gradientcyan/20 transition-colors duration-300">
          <Icon size={17} className="text-gradientcyan" />
        </div>
      )}
      {title && (
        <h3 className="font-body font-semibold text-white text-sm mb-2 leading-snug">{title}</h3>
      )}
      <div className="font-body text-sm text-textMuted leading-relaxed">{children}</div>
    </div>
  )
}

// ─── Bullet list ───────────────────────────────────────────────────────────────
export function BulletList({ items, accentColor = 'cyan' }) {
  const dotClass =
    accentColor === 'pink'
      ? 'bg-gradientpink'
      : accentColor === 'yellow'
      ? 'bg-gradientyellow'
      : 'bg-gradientcyan'

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 group">
          <span className={`flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${dotClass}`} />
          <span className="font-body text-sm text-textMuted leading-relaxed group-hover:text-white transition-colors duration-200">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Spec table ────────────────────────────────────────────────────────────────
export function SpecTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-borderDefault">
      <table className="w-full text-sm font-body">
        <tbody>
          {rows.map(({ label, value }, i) => (
            <tr
              key={label}
              className={`border-b border-borderDefault last:border-0 transition-colors duration-200 hover:bg-gradientcyan/5 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surfaceHover'
              }`}
            >
              <td className="px-5 py-3.5 text-textMuted font-mono text-xs uppercase tracking-widest whitespace-nowrap">
                {label}
              </td>
              <td className="px-5 py-3.5 text-white font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Numbered step row ─────────────────────────────────────────────────────────
export function StepRow({ index, children }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-borderDefault bg-surface hover:border-gradientcyan/30 hover:bg-surfaceHover transition-all duration-300">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradientcyan/10 border border-gradientcyan/30 text-gradientcyan font-mono text-xs font-bold">
        {String(index + 1).padStart(2, '0')}
      </div>
      <p className="font-body text-sm text-textMuted leading-relaxed pt-1">{children}</p>
    </div>
  )
}

// ─── Icon row ─────────────────────────────────────────────────────────────────
export function IconRow({ icon: Icon, children, accentColor = 'cyan' }) {
  const iconClass =
    accentColor === 'yellow' ? 'text-gradientyellow' : 'text-gradientcyan'

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-borderDefault bg-surface hover:border-gradientcyan/30 hover:bg-surfaceHover transition-all duration-300">
      <Icon size={16} className={`flex-shrink-0 mt-0.5 ${iconClass}`} />
      <p className="font-body text-sm text-textMuted leading-relaxed">{children}</p>
    </div>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────
export function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-borderDefault to-transparent my-2" />
  )
}

// ─── Doc page mini navigator ──────────────────────────────────────────────────
const INDOOR_LINKS = [
  { key: 'user-manual',  label: 'User Manual',  icon: BookOpen,    path: '/ipi1/user-manual' },
  { key: 'installation', label: 'Installation', icon: Wrench,      path: '/ipi1/installation-guide' },
  { key: 'warranty',     label: 'Warranty',     icon: FileText,    path: '/ipi1/warranty' },
  { key: 'safety',       label: 'Safety',       icon: ShieldCheck, path: '/ipi1/safety' },
]
const OUTDOOR_LINKS = [
  { key: 'user-manual',  label: 'User Manual',  icon: BookOpen,    path: '/user-manual' },
  { key: 'installation', label: 'Installation', icon: Wrench,      path: '/installation-guide' },
  { key: 'warranty',     label: 'Warranty',     icon: FileText,    path: '/warranty' },
  { key: 'safety',       label: 'Safety',       icon: ShieldCheck, path: '/safety' },
]

export function DocPageNav({ product, current }) {
  const navigate = useNavigate()
  const links = product === 'indoor' ? INDOOR_LINKS : OUTDOOR_LINKS

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-1 p-2 rounded-2xl border border-borderDefault bg-background/90 backdrop-blur-md shadow-2xl"
    >
      <p className="font-mono text-[9px] text-textMuted uppercase tracking-widest px-2 pt-1 pb-1.5 border-b border-borderDefault">
        {product === 'indoor' ? 'IPI Indoor' : 'IPO Outdoor'}
      </p>
      {links.map(({ key, label, icon: Icon, path }) => {
        const isActive = key === current
        return (
          <button
            key={key}
            onClick={() => {
              if (isActive) return
              if (product === 'outdoor') {
                navigate(path, { state: { product: 'outdoor' } })
              } else {
                navigate(path)
              }
            }}
            disabled={isActive}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
              isActive
                ? 'bg-gradientcyan/15 border border-gradientcyan/30 text-gradientcyan cursor-default'
                : 'text-textMuted hover:bg-surfaceHover hover:text-white cursor-pointer'
            }`}
          >
            <Icon size={13} className="flex-shrink-0" />
            <span className="font-body text-xs font-medium whitespace-nowrap">{label}</span>
            {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gradientcyan" />}
          </button>
        )
      })}
    </motion.div>
  )
}
