import { useEffect, useState } from 'react'
import AppRouter from './routes/AppRouter'
import Loader from './components/Loader'
import { AuthProvider } from './admin/AuthContext'

const LOADER_DURATION_MS = 3500
const EXIT_FADE_MS = 600
const REDUCED_MOTION_DURATION_MS = 300
const IS_ADMIN_ROUTE = window.location.pathname.startsWith('/admin')

function App() {
  const [phase, setPhase] = useState(IS_ADMIN_ROUTE ? 'done' : 'loading') // 'loading' -> 'exiting' -> 'done'

  useEffect(() => {
    if (IS_ADMIN_ROUTE) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = prefersReducedMotion ? REDUCED_MOTION_DURATION_MS : LOADER_DURATION_MS
    const fade = prefersReducedMotion ? 0 : EXIT_FADE_MS

    const exitTimer = setTimeout(() => setPhase('exiting'), Math.max(total - fade, 0))
    const doneTimer = setTimeout(() => setPhase('done'), total)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <AuthProvider>
      {phase !== 'loading' && <AppRouter />}
      {phase !== 'done' && <Loader exiting={phase === 'exiting'} />}
    </AuthProvider>
  )
}

export default App
