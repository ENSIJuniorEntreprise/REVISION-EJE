import { useReducedMotion } from 'framer-motion'

export const revealTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
}

export const revealViewport = {
  once: true,
  amount: 0.22,
}

const reducedMotionRevealProps = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0 },
  transition: { duration: 0 },
}

export const getRevealProps = (delay = 0, reducedMotion = false) => {
  if (reducedMotion) {
    return reducedMotionRevealProps
  }

  return {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: revealViewport,
    transition: { ...revealTransition, delay },
  }
}

export const usePrefersReducedMotion = () => Boolean(useReducedMotion())
