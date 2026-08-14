// src/components/kit/Articles.jsx
import { useEffect, useRef, useState } from 'react'
import { FileText, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { apiFetch } from '../../config/api'
import { toShortDate } from '../../utils/formatDate'

function ArticleCard({ a, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={ref}
      className="card-glass group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-eje-accent/50 hover:shadow-[0_25px_60px_-25px_rgb(46_163_221/0.5)]"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={a.img}
          alt={a.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-eje-accent px-3 py-1 font-body text-xs font-semibold text-white">
          {a.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 font-body text-xs text-eje-beige/50">
          <span>{a.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {a.read}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-extrabold leading-snug text-eje-beige">
          {a.title}
        </h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-eje-beige/60">
          {a.excerpt}
        </p>
        {a.link && (
          <a
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1 font-body text-sm font-semibold text-eje-accent transition group-hover:gap-2"
          >
            Read the article
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiFetch('/articles?type=chronicle&limit=50')
      .then((body) => {
        if (cancelled) return
        setArticles(
          (body?.articles || []).map((a) => ({
            tag: a.tag,
            date: toShortDate(a.publishedAt),
            read: `${a.readTimeMinutes} min`,
            title: a.title,
            excerpt: a.excerpt,
            img: a.coverImage,
            link: a.externalUrl,
          })),
        )
      })
      .catch(() => {
        if (!cancelled) setArticles([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const displayed = showAll ? articles : articles.slice(0, 3)

  if (!loading && articles.length === 0) return null

  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-eje-accent/10 px-4 py-2 font-body text-sm font-semibold text-eje-accent">
            <FileText className="h-4 w-4" />
            Our Chronicles
          </span>
          <h2 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem]">
            Articles &amp; Analyses
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-eje-beige/60">
          Dive into our latest articles, filled with sharp analyses and bold reflections on the entrepreneurial world.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((a, i) => (
            <ArticleCard key={a.title + a.date} a={a} index={i} />
          ))}
        </div>

        {/* See more / See less button */}
        {articles.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-eje-accent/30 bg-eje-accent/10 px-8 py-3 font-body text-sm font-semibold text-eje-accent transition hover:bg-eje-accent hover:text-white hover:border-eje-accent"
            >
              {showAll ? (
                <>See less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>See more <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
