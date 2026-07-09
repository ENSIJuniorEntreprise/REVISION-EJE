import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactLenis } from '@studio-freight/react-lenis'
import App from './App.jsx'
import './index.css'

function SmoothScrollProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  const options = useMemo(
    () => ({
      lerp: prefersReducedMotion ? 1 : 0.16,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: prefersReducedMotion ? 1 : 1.2,
      touchMultiplier: 1,
      syncTouch: !prefersReducedMotion,
    }),
    [prefersReducedMotion],
  )

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </React.StrictMode>,
)