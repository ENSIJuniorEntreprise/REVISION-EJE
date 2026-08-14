import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { apiFetch } from '../../config/api'
import { toIsoDate } from '../../utils/formatDate'

export default function LatestNews() {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const visible = 3
  const max = Math.max(news.length - visible, 0)

  useEffect(() => {
    let cancelled = false
    apiFetch('/articles/recent?type=news&limit=6')
      .then((body) => {
        if (cancelled) return
        setNews((body?.articles || []).map((a) => ({ date: toIsoDate(a.publishedAt), title: a.title, img: a.coverImage })))
      })
      .catch(() => {
        if (!cancelled) setNews([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const scrollTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, max))
    setCurrent(clamped)
    if (!trackRef.current) return
    const cardWidth = trackRef.current.children[0]?.offsetWidth + 24
    trackRef.current.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' })
  }, [max])

  // Auto-play
  useEffect(() => {
    if (max <= 0) return
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = prev >= max ? 0 : prev + 1
        const cardWidth = trackRef.current?.children[0]?.offsetWidth + 24
        trackRef.current?.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [max])

  if (!loading && news.length === 0) return null

  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl">
                Latest  News
            </h2>
            <p className="mt-2 font-body text-base text-eje-beige/55">
                Stay informed about everything that's happening.
            </p>
          </div>
          {max > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo(current - 1)}
                disabled={current === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-eje-beige/20 text-eje-beige/60 transition hover:border-eje-accent hover:text-eje-accent disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTo(current + 1)}
                disabled={current >= max}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-eje-beige/20 text-eje-beige/60 transition hover:border-eje-accent hover:text-eje-accent disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="mt-12 flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {news.map((n) => (
            <article
              key={n.title + n.date}
              className="group cursor-pointer flex-shrink-0"
              style={{ width: 'calc((100% - 48px) / 3)', scrollSnapAlign: 'start' }}
            >
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <img
                  src={n.img}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-eje-dark/20" />
              </div>
              <div className="mt-4 font-body text-sm font-semibold text-eje-accent">{n.date}</div>
              <h3 className="mt-2 font-body text-lg font-extrabold text-eje-beige transition group-hover:text-eje-accent">
                {n.title}
              </h3>
            </article>
          ))}
        </div>

        {/* Dots */}
        {max > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-eje-accent' : 'w-2 bg-eje-beige/25 hover:bg-eje-beige/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
