import { useEffect } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout() {
  const location = useLocation()
  const lenis = useLenis()

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

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}