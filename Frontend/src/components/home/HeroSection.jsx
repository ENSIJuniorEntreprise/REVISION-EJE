import { useCallback } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ImageWithFallback from '../ImageWithFallback'
import { media } from '../../assets/media'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function HeroSection() {
  const lenis = useLenis()
  const reducedMotion = usePrefersReducedMotion()

  const handleDiscoverClick = useCallback(
    (event) => {
      event.preventDefault()

      const target = document.getElementById('about')
      if (!target) {
        return
      }

      const offset = -104

      if (lenis) {
        lenis.scrollTo(target, { offset, immediate: reducedMotion })
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' })
      }

      window.history.replaceState(null, '', '#about')
    },
    [lenis, reducedMotion],
  )

  return (
    <section className="relative flex min-h-screen items-center pt-20">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={media.images.hero}
          alt="Fond visuel ENSI Junior Entreprise"
          loading="eager"
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover opacity-35"
          fallbackLabel="Showreel EJE"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-eje-dark/40 via-eje-dark/80 to-eje-dark" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.p className="mb-6 font-signature text-4xl text-eje-accent md:text-6xl" {...getRevealProps(0.06, reducedMotion)}>
            Always Striving for Greatness
          </motion.p>

          <motion.h1 className="mb-8 text-5xl font-bold leading-[1.06] md:text-7xl" {...getRevealProps(0.14, reducedMotion)}>
            L'excellence digitale
            <br />
            <span className="inline-block text-eje-beige">au service de vos ambitions.</span>
          </motion.h1>

          <motion.p className="mb-10 max-w-2xl text-lg text-eje-beige/80 md:text-xl" {...getRevealProps(0.22, reducedMotion)}>
            EJE accompagne startups, PME et institutions avec des produits utiles, performants et durables.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" {...getRevealProps(0.28, reducedMotion)}>
            <Link to="/contact" className="btn btn-primary gap-2 text-lg">
              Demander un devis
              <ChevronRight className="h-5 w-5" />
            </Link>
            <a href="#about" onClick={handleDiscoverClick} className="btn btn-outline text-lg">
              Découvrir
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
