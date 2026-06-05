import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

function SectionPills({ links }) {
  return (
    <div className="section-links">
      {links.map((link) =>
        link.href ? (
          <a key={link.label} href={link.href} className="section-link-pill">
            {link.label}
            <ChevronRight className="h-4 w-4" />
          </a>
        ) : (
          <Link key={link.label} to={link.to} className="section-link-pill">
            {link.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ),
      )}
    </div>
  )
}

export default function SectionHeading({ eyebrow, title, subtitle, links, delay = 0 }) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div className="container section-heading" {...getRevealProps(delay, reducedMotion)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {links?.length ? <SectionPills links={links} /> : null}
    </motion.div>
  )
}
