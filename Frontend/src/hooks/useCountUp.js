import { useEffect, useRef, useState } from 'react'

// Attach the returned ref to the element the number lives in. Once it scrolls
// into view, animates from 0 up to `target` with an ease-out cubic curve.
export default function useCountUp(target, { duration = 1600, threshold = 0.3 } = {}) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        let start = null
        const step = (timestamp) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, threshold])

  return [ref, count]
}
