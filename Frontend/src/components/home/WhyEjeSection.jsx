import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from '../ui/TiltCard'
import SectionHeading from './SectionHeading'
import { sectionLinks, stats } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

const COUNTER_DURATION_MS = 1400

const parseStatValue = (rawValue) => {
  const match = String(rawValue).match(/^(\D*)(\d+)(.*)$/)
  if (!match) {
    return { prefix: '', numeric: 0, suffix: String(rawValue) }
  }

  return {
    prefix: match[1],
    numeric: Number(match[2]),
    suffix: match[3],
  }
}

export default function WhyEjeSection() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.32 })
  const parsedStats = useMemo(() => stats.map((stat) => parseStatValue(stat.value)), [])
  const [animatedValues, setAnimatedValues] = useState(() => parsedStats.map(() => 0))

  useEffect(() => {
    if (!sectionInView) {
      return undefined
    }

    const targets = parsedStats.map((stat) => stat.numeric)

    if (reducedMotion) {
      setAnimatedValues(targets)
      return undefined
    }

    let frameId = null
    let startTime = null

    const tick = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / COUNTER_DURATION_MS, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setAnimatedValues(targets.map((target) => Math.round(target * easedProgress)))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [parsedStats, reducedMotion, sectionInView])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-eje-dark py-24">
      <div className="milestone-background" aria-hidden="true" />
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Why EJE"
          title={
            <>
              Our <span className="text-eje-accent">strengths</span>
            </>
          }
          subtitle="A committed team, controlled execution, and measurable results at every step."
          links={sectionLinks.reasons}
        />

        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} className="h-full" {...getRevealProps(0.14 + index * 0.08, reducedMotion)}>
              <TiltCard
                as="article"
                className="card-glass group h-full p-6 text-center transition-all duration-300 hover:border-eje-accent/60 hover:shadow-[0_10px_20px_rgba(46,163,221,0.15)]"
              >
                <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-eje-beige/10 transition-all group-hover:bg-eje-accent group-hover:text-white">
                  <stat.icon className="h-4 w-4" />
                </div>
                <p className="mb-2 text-4xl font-bold">
                  {`${parsedStats[index].prefix}${sectionInView ? animatedValues[index] : 0}${parsedStats[index].suffix}`}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-eje-beige/75">{stat.label}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
