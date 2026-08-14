import { useEffect, useRef, useState } from 'react'

// Attach the returned ref to an element; `visible` flips to true (and stays
// true) the first time that element scrolls into view. Unlike useReveal,
// which toggles a CSS class, this exposes the boolean directly for callers
// that need it to drive per-element inline transforms/animation timing.
export default function useIntersection(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}
