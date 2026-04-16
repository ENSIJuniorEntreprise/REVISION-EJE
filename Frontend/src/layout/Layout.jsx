import { useEffect, useState } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import { Outlet, useLocation } from 'react-router-dom'
import HomeTabSelector from '../components/HomeTabSelector'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ABOUT_SECTION_TRIGGER_OFFSET = 140

export default function Layout() {
  const location = useLocation()
  const lenis = useLenis()
  const [showHomeTabSelector, setShowHomeTabSelector] = useState(false)
  const isHomeRoute = location.pathname === '/'

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const targetId = decodeURIComponent(location.hash.replace('#', ''))
    if (!targetId) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollOffset = -108

    const scrollToTarget = () => {
      const target = document.getElementById(targetId)
      if (!target) {
        return false
      }

      if (lenis) {
        lenis.scrollTo(target, { offset: scrollOffset, immediate: prefersReducedMotion })
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + scrollOffset
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      }

      return true
    }

    let retryId = null
    const frame = window.requestAnimationFrame(() => {
      if (!scrollToTarget()) {
        retryId = window.setTimeout(scrollToTarget, 180)
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (retryId !== null) {
        window.clearTimeout(retryId)
      }
    }
  }, [lenis, location.hash, location.pathname])

  useEffect(() => {
    if (!isHomeRoute) {
      setShowHomeTabSelector(false)
      return undefined
    }

    let frameId = null
    let retryId = null

    const updateHomeThresholdState = () => {
      const aboutSection = document.getElementById('about')
      if (!aboutSection) {
        setShowHomeTabSelector(false)
        return false
      }

      const shouldShowTabs = aboutSection.getBoundingClientRect().top <= ABOUT_SECTION_TRIGGER_OFFSET
      setShowHomeTabSelector((currentState) => (currentState === shouldShowTabs ? currentState : shouldShowTabs))
      return true
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateHomeThresholdState()
      })
    }

    updateHomeThresholdState()
    retryId = window.setInterval(() => {
      if (updateHomeThresholdState()) {
        window.clearInterval(retryId)
        retryId = null
      }
    }, 220)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      if (retryId !== null) {
        window.clearInterval(retryId)
      }

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isHomeRoute, location.pathname])

  return (
    <div className="app-shell">
      <Navbar isHidden={showHomeTabSelector && isHomeRoute} />
      <main className="app-main">
        <Outlet />
      </main>
      <HomeTabSelector visible={showHomeTabSelector && isHomeRoute} />
      <Footer />
    </div>
  )
}