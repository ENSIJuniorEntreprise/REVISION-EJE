import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { media } from '../../assets/media'

const BRAND_TEXT = 'ENSI Junior Entreprise'
const GRADIENT_PHASE_MS = 1500

const shellTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
}

export default function HomePreloader({ startGradientPhase = false, onGradientComplete }) {
  const prefersReducedMotion = useReducedMotion()
  const characters = Array.from(BRAND_TEXT)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (!startGradientPhase || hasCompletedRef.current) {
      return undefined
    }

    const timeoutDuration = prefersReducedMotion ? 220 : GRADIENT_PHASE_MS
    const completionTimeout = window.setTimeout(() => {
      hasCompletedRef.current = true
      if (typeof onGradientComplete === 'function') {
        onGradientComplete()
      }
    }, timeoutDuration)

    return () => {
      window.clearTimeout(completionTimeout)
    }
  }, [onGradientComplete, prefersReducedMotion, startGradientPhase])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-eje-dark px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: shellTransition }}
      exit={{ opacity: 0, transition: shellTransition }}
      aria-label="Chargement de la page d'accueil"
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={startGradientPhase ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : GRADIENT_PHASE_MS / 1000,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background:
            'linear-gradient(135deg, rgb(var(--eje-accent-rgb) / 0.94) 0%, rgb(var(--eje-accent-rgb) / 0.5) 58%, rgb(var(--eje-dark-rgb) / 0.96) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-7 text-center md:flex-row md:gap-6 md:text-left">
        <motion.img
          src={media.logos.primary}
          alt="Logo ENSI Junior Entreprise"
          className="h-16 w-auto md:h-20"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="text-2xl font-bold tracking-[0.03em] text-eje-beige md:text-4xl">
          <span className="sr-only">{BRAND_TEXT}</span>

          {prefersReducedMotion ? (
            <span aria-hidden="true">{BRAND_TEXT}</span>
          ) : (
            <motion.span
              className="inline-flex flex-wrap justify-center md:justify-start"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.18,
                    staggerChildren: 0.042,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              {characters.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  className={char === ' ' ? 'mx-[0.16em]' : ''}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.66,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
