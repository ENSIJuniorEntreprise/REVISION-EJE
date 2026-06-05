import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { sectionLinks } from './homeData'
import { media } from '../../assets/media'
import ImageWithFallback from '../ImageWithFallback'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

const AUTO_ADVANCE_MS = 4000

const getLogosPerSlide = () => {
  if (typeof window === 'undefined') {
    return 6
  }

  if (window.innerWidth < 768) {
    return 2
  }

  if (window.innerWidth < 1280) {
    return 4
  }

  return 6
}

export default function PartnersSection() {
  const reducedMotion = usePrefersReducedMotion()
  const [logosPerSlide, setLogosPerSlide] = useState(getLogosPerSlide)
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = useMemo(() => {
    const chunks = []

    for (let index = 0; index < media.partners.length; index += logosPerSlide) {
      chunks.push(media.partners.slice(index, index + logosPerSlide))
    }

    return chunks
  }, [logosPerSlide])

  useEffect(() => {
    const handleViewportResize = () => {
      setLogosPerSlide(getLogosPerSlide())
    }

    window.addEventListener('resize', handleViewportResize)

    return () => {
      window.removeEventListener('resize', handleViewportResize)
    }
  }, [])

  useEffect(() => {
    if (activeSlide < slides.length) {
      return
    }

    setActiveSlide(0)
  }, [activeSlide, slides.length])

  useEffect(() => {
    if (reducedMotion || slides.length <= 1) {
      return undefined
    }

    const autoAdvance = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, AUTO_ADVANCE_MS)

    return () => {
      window.clearInterval(autoAdvance)
    }
  }, [reducedMotion, slides.length])

  const handlePreviousSlide = useCallback(() => {
    setActiveSlide((currentSlide) => (currentSlide === 0 ? slides.length - 1 : currentSlide - 1))
  }, [slides.length])

  const handleNextSlide = useCallback(() => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
  }, [slides.length])

  const handleIndicatorClick = useCallback((slideIndex) => {
    setActiveSlide(slideIndex)
  }, [])

  const hasManySlides = slides.length > 1

  return (
    <section className="bg-eje-dark pb-24">
      <SectionHeading
        eyebrow="Our partners"
        title={
          <>
            They trust <span className="text-eje-accent">EJE</span>.
          </>
        }
        subtitle="A network of companies and institutions building with us for the long term."
        links={sectionLinks.partners}
      />

      <motion.div className="container" {...getRevealProps(0.12, reducedMotion)}>
        <div className="partners-carousel" role="region" aria-label="ENSI Junior Entreprise partner logos carousel">
          {hasManySlides ? (
            <button
              type="button"
              className="partners-arrow partners-arrow-left"
              aria-label="Show previous partners"
              onClick={handlePreviousSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          <div className="partners-viewport">
            <div className="partners-slides" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide, slideIndex) => (
                <ul key={`partners-slide-${slideIndex}`} className="partners-slide" aria-hidden={slideIndex !== activeSlide ? 'true' : undefined}>
                  {slide.map((logo) => (
                    <li key={`${logo.src}-${slideIndex}`} className="partner-logo-card-modern group">
                      <ImageWithFallback
                        src={logo.src}
                        alt={`Partner logo ${logo.name}`}
                        wrapperClassName="h-16 w-full md:h-[4.75rem]"
                        className="partners-logo-image h-16 w-full object-contain md:h-[4.75rem]"
                        fallbackLabel={logo.name}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {hasManySlides ? (
            <button
              type="button"
              className="partners-arrow partners-arrow-right"
              aria-label="Show next partners"
              onClick={handleNextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        {hasManySlides ? (
          <div className="partners-indicators" role="tablist" aria-label="Partner carousel indicators">
            {slides.map((_, slideIndex) => (
              <button
                key={`partners-indicator-${slideIndex}`}
                type="button"
                className={`partners-indicator ${slideIndex === activeSlide ? 'partners-indicator-active' : ''}`}
                aria-label={`Go to partner logos page ${slideIndex + 1}`}
                aria-current={slideIndex === activeSlide ? 'true' : 'false'}
                onClick={() => handleIndicatorClick(slideIndex)}
              />
            ))}
          </div>
        ) : null}
      </motion.div>
    </section>
  )
}
