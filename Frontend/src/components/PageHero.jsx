import { ChevronDown } from 'lucide-react'

// Staggered entrance element: fades/rises/blurs in via the shared `.animate-rise`
// keyframes (see index.css). `delay` is in seconds, matching the rest of the site's heroes.
export function Rise({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag className={`animate-rise ${className}`} style={{ animationDelay: `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

// Full-bleed page hero: curtain reveal + slow image zoom + veil fade, matching the
// News page's original entrance animation. Reused across every page's hero so the
// site-wide entrance choreography stays identical.
export default function PageHero({
  image,
  imageAlt = '',
  imgClassName = '',
  overlay = true,
  decoration = null,
  scrollTo,
  scrollLabel = 'Scroll down',
  contentClassName = 'max-w-5xl',
  children,
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="page-curtain" aria-hidden="true" />
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover animate-hero-zoom ${imgClassName}`}
        />
      )}
      <div className="absolute inset-0 bg-eje-dark animate-veil" />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgb(31 33 45 / 0.45) 0%, rgb(31 33 45 / 0) 35%, rgb(31 33 45 / 0) 55%, rgb(31 33 45 / 0.55) 78%, rgb(31 33 45 / 0.9) 92%, rgb(31 33 45 / 1) 100%)',
          }}
        />
      )}
      {decoration}
      <div className={`relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center ${contentClassName}`}>
        {children}
      </div>
      {scrollTo && (
        <Rise
          as="a"
          href={scrollTo}
          delay={1.5}
          aria-label={scrollLabel}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-eje-beige/35 transition hover:text-eje-beige/70"
        >
          <ChevronDown className="h-7 w-7 animate-bounce" />
        </Rise>
      )}
    </section>
  )
}
