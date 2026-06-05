import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { media } from '../../assets/media'
import { revealTransition, usePrefersReducedMotion } from './motionPresets'

const SLIDE_HOLD_MS = 2000
const SLIDE_TRANSITION_SECONDS = 1.8

const getHeroItemAnimation = (reducedMotion, delay = 0) => {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0, transition: { duration: 0 } },
    }
  }

  return {
    initial: { opacity: 0, y: 52 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ...revealTransition,
        delay,
      },
    },
  }
}

export default function HeroSection({ isReady = true, onBackgroundReady }) {
  const reducedMotion = usePrefersReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [failedSlides, setFailedSlides] = useState([])
  const hasNotifiedBackgroundReady = useRef(false)
  const slides = useMemo(() => media.images.slideshow ?? [media.images.hero], [])
  const displaySlides = useMemo(() => {
    const filteredSlides = slides.filter((slide) => !failedSlides.includes(slide))
    return filteredSlides.length > 0 ? filteredSlides : [media.images.hero]
  }, [failedSlides, slides])

  useEffect(() => {
    if (activeSlide < displaySlides.length) {
      return
    }

    setActiveSlide(0)
  }, [activeSlide, displaySlides.length])

  useEffect(() => {
    if (reducedMotion || displaySlides.length <= 1) {
      return undefined
    }

    const rotation = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % displaySlides.length)
    }, SLIDE_HOLD_MS)

    return () => {
      window.clearInterval(rotation)
    }
  }, [displaySlides.length, reducedMotion])

  const notifyBackgroundReady = useCallback(() => {
    if (hasNotifiedBackgroundReady.current) {
      return
    }

    hasNotifiedBackgroundReady.current = true
    if (typeof onBackgroundReady === 'function') {
      onBackgroundReady()
    }
  }, [onBackgroundReady])

  const heroMotionState = isReady ? 'animate' : 'initial'
  const signatureAnimation = getHeroItemAnimation(reducedMotion, 0.08)
  const titleAnimation = getHeroItemAnimation(reducedMotion, 0.16)
  const bodyAnimation = getHeroItemAnimation(reducedMotion, 0.24)
  const actionsAnimation = getHeroItemAnimation(reducedMotion, 0.32)

  const handleSlideError = useCallback(
    (event) => {
      const brokenSlide = event.currentTarget.getAttribute('src')
      if (brokenSlide) {
        setFailedSlides((currentFailedSlides) => {
          if (currentFailedSlides.includes(brokenSlide)) {
            return currentFailedSlides
          }

          return [...currentFailedSlides, brokenSlide]
        })
      }

      notifyBackgroundReady()
    },
    [notifyBackgroundReady],
  )

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={displaySlides[activeSlide]}
            src={displaySlides[activeSlide]}
            alt="ENSI Junior Entreprise visual background"
            className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] max-w-none object-cover opacity-35"
            loading="eager"
            fetchPriority="high"
            onLoad={notifyBackgroundReady}
            onError={handleSlideError}
            initial={
              reducedMotion
                ? { opacity: 0.35, scale: 1 }
                : { opacity: 0, scale: 1.08 }
            }
            animate={
              reducedMotion
                ? { opacity: 0.35, scale: 1 }
                : {
                    opacity: 0.35,
                    scale: 1,
                    transition: {
                      duration: SLIDE_TRANSITION_SECONDS,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            exit={
              reducedMotion
                ? { opacity: 0.35 }
                : {
                    opacity: 0,
                    scale: 0.985,
                    transition: {
                      duration: SLIDE_TRANSITION_SECONDS,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-eje-dark/40 via-eje-dark/80 to-eje-dark" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.p
            className="mb-6 font-signature text-4xl text-eje-accent md:text-6xl"
            initial={signatureAnimation.initial}
            animate={heroMotionState === 'animate' ? signatureAnimation.animate : signatureAnimation.initial}
          >
            Always in pursuit of excellence
          </motion.p>

          <motion.h1
            className="mb-8 text-5xl font-bold leading-[1.06] md:text-7xl"
            initial={titleAnimation.initial}
            animate={heroMotionState === 'animate' ? titleAnimation.animate : titleAnimation.initial}
          >
            Digital excellence
            <br />
            <span className="inline-block text-eje-beige">serving your ambitions.</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-2xl text-lg text-eje-beige/80 md:text-xl"
            initial={bodyAnimation.initial}
            animate={heroMotionState === 'animate' ? bodyAnimation.animate : bodyAnimation.initial}
          >
            EJE supports startups, NGOs, and SMEs with useful, high-performance, and sustainable solutions.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={actionsAnimation.initial}
            animate={heroMotionState === 'animate' ? actionsAnimation.animate : actionsAnimation.initial}
          >
            <Link to="/contact" className="btn btn-primary gap-2 text-lg">
              Request a quote
              <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
