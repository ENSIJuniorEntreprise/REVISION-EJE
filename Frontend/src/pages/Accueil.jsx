import { useCallback, useEffect, useState } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import { AnimatePresence } from 'framer-motion'
import AboutSection from '../components/home/AboutSection'
import CtaSection from '../components/home/CtaSection'
import FaqSection from '../components/home/FaqSection'
import HeroSection from '../components/home/HeroSection'
import HomePreloader from '../components/home/HomePreloader'
import PartnersSection from '../components/home/PartnersSection'
import ServicesPreview from '../components/home/ServicesPreview'
import WhyEjeSection from '../components/home/WhyEjeSection'

const HOME_PRELOADER_STORAGE_KEY = 'eje.home.preloader.seen'
const MIN_DARK_PRELOADER_MS = 1000
const HERO_READY_FALLBACK_MS = 5200

const shouldDisplayPreloader = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.sessionStorage.getItem(HOME_PRELOADER_STORAGE_KEY) !== '1'
}

export default function Accueil() {
  const lenis = useLenis()
  const [showPreloader, setShowPreloader] = useState(shouldDisplayPreloader)
  const [startGradientPhase, setStartGradientPhase] = useState(false)
  const [isHeroBackgroundReady, setIsHeroBackgroundReady] = useState(!showPreloader)
  const [minimumIntroElapsed, setMinimumIntroElapsed] = useState(!showPreloader)
  const [pageLoaded, setPageLoaded] = useState(!showPreloader)

  useEffect(() => {
    if (!showPreloader) {
      return undefined
    }

    const minimumDelay = window.setTimeout(() => {
      setMinimumIntroElapsed(true)
    }, MIN_DARK_PRELOADER_MS)

    return () => {
      window.clearTimeout(minimumDelay)
    }
  }, [showPreloader])

  useEffect(() => {
    if (!showPreloader) {
      return undefined
    }

    const fallbackReadyTimeout = window.setTimeout(() => {
      setIsHeroBackgroundReady(true)
    }, HERO_READY_FALLBACK_MS)

    return () => {
      window.clearTimeout(fallbackReadyTimeout)
    }
  }, [showPreloader])

  useEffect(() => {
    if (!showPreloader || startGradientPhase) {
      return
    }

    if (!minimumIntroElapsed || !isHeroBackgroundReady) {
      return
    }

    setStartGradientPhase(true)
  }, [showPreloader, startGradientPhase, minimumIntroElapsed, isHeroBackgroundReady])

  useEffect(() => {
    if (!showPreloader) {
      return undefined
    }

    if (lenis) {
      lenis.stop()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (lenis) {
        lenis.start()
      }
    }
  }, [lenis, showPreloader])

  const handleHeroBackgroundReady = useCallback(() => {
    setIsHeroBackgroundReady(true)
  }, [])

  const handlePreloaderGradientComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(HOME_PRELOADER_STORAGE_KEY, '1')
    }

    setShowPreloader(false)
  }, [])

  const handlePreloaderExited = useCallback(() => {
    setStartGradientPhase(false)
    setPageLoaded(true)
  }, [])

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait" onExitComplete={handlePreloaderExited}>
        {showPreloader ? (
          <HomePreloader
            key="home-preloader"
            startGradientPhase={startGradientPhase}
            onGradientComplete={handlePreloaderGradientComplete}
          />
        ) : null}
      </AnimatePresence>

      <HeroSection isReady={pageLoaded} onBackgroundReady={handleHeroBackgroundReady} />
      <AboutSection />
      <ServicesPreview />
      <WhyEjeSection />
      <PartnersSection />
      <CtaSection />
      <FaqSection />
    </div>
  )
}