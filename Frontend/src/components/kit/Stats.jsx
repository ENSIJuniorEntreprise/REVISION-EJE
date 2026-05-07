import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 80, suffix: '+', label: 'Clients', tag: 'Business' },
  { value: 22000, suffix: '+', label: 'Followers', tag: 'Community' },
  { value: 100, suffix: '+', label: 'Projects Delivered', tag: 'Projects' },
  { value: 1000, suffix: '+', label: 'Newsletter Subscribers', tag: 'Newsletter' },
]

function useCountUp(target, duration = 2500, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

function StatCard({ value, suffix, label, tag, started }) {
  const count = useCountUp(value, 2500, started)
  return (
    <div className="card-glass group flex flex-col items-center justify-center gap-3 px-6 py-10 text-center transition hover:-translate-y-1 hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]">
      <div className="font-heading text-5xl font-extrabold text-eje-accent sm:text-[3rem]">
        {count}{suffix}
      </div>
      <div className="font-body text-base font-semibold text-eje-beige">{label}</div>
      <span className="rounded-full bg-eje-beige/10 px-3 py-1 font-body text-xs text-eje-beige">
        {tag}
      </span>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  return (
    <section ref={sectionRef} id="stats" className="bg-eje-dark/80 px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem]">
            Key Figures
          </h2>
          <p className="mt-4 font-body text-base text-eje-beige/60">
            Our impact at a glance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}