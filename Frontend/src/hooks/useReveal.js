import { useEffect, useRef } from 'react'

// Attach the returned ref to an element styled with the shared `.reveal` /
// `.reveal-left` / `.reveal-right` classes (see index.css). Adds the `.in`
// class the first time the element scrolls into view, triggering the
// fade/slide-in transition once, then disconnects.
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
