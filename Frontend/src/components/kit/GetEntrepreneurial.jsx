import { useEffect, useRef, useState } from 'react'
import { Users, Briefcase, Award, Calendar, MapPin, ExternalLink, Star } from 'lucide-react'
import bg1 from '../../assets/ge-bg.jpg'
import bg2 from '../../assets/ge-bg2.jpg'
import bg3 from '../../assets/ge-bg3.jpg'
import bg4 from '../../assets/ge-bg4.jpg'
import bg5 from '../../assets/ge-bg5.jpg'

const images = [bg1, bg2, bg3, bg4, bg5]

function useCountUp(target, duration = 2500, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function StatItem({ icon: Icon, value, suffix, label, started }) {
  const count = useCountUp(value, 2500, started)
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-7 w-7 text-eje-accent mb-1" strokeWidth={1.5} />
      <span className="font-heading text-4xl font-extrabold text-eje-accent sm:text-5xl">
        {count}{suffix}
      </span>
      <span className="font-body text-sm text-eje-beige/70 tracking-wide">{label}</span>
    </div>
  )
}

export default function GetEntrepreneurial() {
  const statsRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)

  // Stats count-up trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="Get Entrepreneurial Event"
    >
      {/* Slideshow images — same style as Hero */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: i === currentBg ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark veil — same as Hero's animate-veil */}
      <div className="absolute inset-0 bg-eje-dark/70" style={{ zIndex: 1 }} />

      {/* Gradient — same as Hero */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-eje-dark/40 via-transparent to-eje-dark"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center flex flex-col items-center gap-8" style={{ zIndex: 3 }}>

        {/* Badge */}
        <div className="animate-rise flex items-center gap-2 rounded-full border border-eje-accent/30 bg-eje-accent/10 px-4 py-1.5 text-sm font-semibold text-eje-accent backdrop-blur-sm">
          <Star className="h-4 w-4 fill-eje-accent" />
          Major Event
        </div>

        {/* Title */}
        <h1
          className="animate-rise font-heading text-5xl font-extrabold leading-tight tracking-tight text-eje-beige sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.2s' }}
        >
          Get{' '}
          <span className="text-eje-accent">Entrepreneurial</span>
        </h1>

        {/* Description */}
        <p
          className="animate-rise max-w-2xl font-body text-base leading-relaxed text-eje-beige/75 sm:text-lg"
          style={{ animationDelay: '0.4s' }}
        >
          Our flagship annual event dedicated to innovation,
           entrepreneurship and business creation. 
           An immersive day to connect creative minds and the leaders of tomorrow.
        </p>

        {/* Date & Location */}
        <div
          className="animate-rise flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-eje-beige/80"
          style={{ animationDelay: '0.55s' }}
        >
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-eje-accent" strokeWidth={1.8} />
            15 October 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-eje-accent" strokeWidth={1.8} />
            UTICA, Tunis
          </span>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="animate-rise flex flex-wrap items-start justify-center gap-12 pt-2"
          style={{ animationDelay: '0.7s' }}
        >
          <StatItem icon={Users}     value={500} suffix="+" label="Participants" started={started} />
          <StatItem icon={Briefcase} value={30}  suffix="+" label="Speakers" started={started} />
          <StatItem icon={Award}     value={3}   suffix=""  label="Editions"     started={started} />
        </div>

        {/* CTA Button */}
        <a
          href="#"
          className="animate-rise mt-2 inline-flex items-center gap-3 rounded-full bg-eje-accent px-8 py-4 font-heading text-base font-bold text-white shadow-[0_8px_30px_-8px_rgba(46,163,221,0.7)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_-8px_rgba(46,163,221,0.8)]"
          style={{ animationDelay: '0.85s' }}
        >
          <ExternalLink className="h-5 w-5" strokeWidth={2} />
            Visit the site — coming soon
        </a>

        {/* Slide indicators */}
        <div className="animate-rise flex gap-2" style={{ animationDelay: '1s' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBg(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentBg ? 'w-6 bg-eje-accent' : 'w-2 bg-eje-beige/30 hover:bg-eje-beige/60'
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}