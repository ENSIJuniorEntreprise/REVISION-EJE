import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { sectionLinks } from './homeData'
import { media } from '../../assets/media'
import ImageWithFallback from '../ImageWithFallback'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

const AUTO_SCROLL_SPEED = 46
const SPEED_EASING = 8

const originalPartnersCount = media.partners.length
const marqueePartners = [...media.partners, ...media.partners]

const clampLoopOffset = (offset, loopWidth) => {
  if (!loopWidth) {
    return offset
  }

  let nextOffset = offset

  while (nextOffset <= -loopWidth) {
    nextOffset += loopWidth
  }

  while (nextOffset > 0) {
    nextOffset -= loopWidth
  }

  return nextOffset
}

export default function PartnersSection() {
  const reducedMotion = usePrefersReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const trackRef = useRef(null)
  const loopWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const speedRef = useRef(reducedMotion ? 0 : AUTO_SCROLL_SPEED)
  const targetSpeedRef = useRef(reducedMotion ? 0 : AUTO_SCROLL_SPEED)
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
  })

  const syncTrackPosition = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }
  }, [])

  useEffect(() => {
    const nextTargetSpeed = reducedMotion || isHovered || isDragging ? 0 : AUTO_SCROLL_SPEED
    targetSpeedRef.current = nextTargetSpeed
  }, [isDragging, isHovered, reducedMotion])

  useEffect(() => {
    const measureLoop = () => {
      if (!trackRef.current) {
        return
      }

      loopWidthRef.current = trackRef.current.scrollWidth / 2
      offsetRef.current = clampLoopOffset(offsetRef.current, loopWidthRef.current)
      syncTrackPosition()
    }

    measureLoop()
    window.addEventListener('resize', measureLoop)

    return () => window.removeEventListener('resize', measureLoop)
  }, [syncTrackPosition])

  useEffect(() => {
    let frameId = null
    let lastTimestamp = window.performance.now()

    const tick = (timestamp) => {
      const deltaSeconds = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp

      const easing = Math.min(1, deltaSeconds * SPEED_EASING)
      speedRef.current += (targetSpeedRef.current - speedRef.current) * easing

      if (Math.abs(speedRef.current) < 0.02) {
        speedRef.current = 0
      }

      if (speedRef.current !== 0) {
        offsetRef.current = clampLoopOffset(offsetRef.current - speedRef.current * deltaSeconds, loopWidthRef.current)
        syncTrackPosition()
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [syncTrackPosition])

  const handlePointerDown = useCallback(
    (event) => {
      const canDragWithPointer = event.pointerType === 'touch' || isHovered

      if (!canDragWithPointer) {
        return
      }

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startOffset: offsetRef.current,
      }

      speedRef.current = 0
      targetSpeedRef.current = 0
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [isHovered],
  )

  const handlePointerMove = useCallback(
    (event) => {
      const drag = dragRef.current

      if (!drag.active || drag.pointerId !== event.pointerId) {
        return
      }

      const deltaX = event.clientX - drag.startX
      offsetRef.current = clampLoopOffset(drag.startOffset + deltaX, loopWidthRef.current)
      syncTrackPosition()
    },
    [syncTrackPosition],
  )

  const handlePointerEnd = useCallback((event) => {
    const drag = dragRef.current

    if (!drag.active || drag.pointerId !== event.pointerId) {
      return
    }

    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startOffset: offsetRef.current,
    }

    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  return (
    <section className="bg-eje-dark pb-24">
      <SectionHeading
        eyebrow="Nos Partenaires"
        title={
          <>
            Ils font confiance à <span className="text-eje-accent">EJE</span>.
          </>
        }
        subtitle="Un réseau d'organisations qui avancent avec nous sur le long terme."
        links={sectionLinks.partners}
      />

      <motion.div className="container" {...getRevealProps(0.12, reducedMotion)}>
        <div
          className={`partners-marquee select-none ${isDragging ? 'cursor-grabbing' : isHovered ? 'cursor-grab' : ''}`}
          role="region"
          aria-label="Défilement des logos partenaires ENSI Junior Entreprise"
          style={{ touchAction: 'pan-y' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <div ref={trackRef} className="partners-track">
            {marqueePartners.map((logo, index) => {
              const isDuplicate = index >= originalPartnersCount

              return (
                <div key={`${logo.src}-${index}`} className="partner-logo-card group" aria-hidden={isDuplicate ? 'true' : undefined}>
                  <ImageWithFallback
                    src={logo.src}
                    alt={isDuplicate ? '' : `Logo partenaire ${logo.name}`}
                    wrapperClassName="h-10 w-full"
                    className="h-10 w-full object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    fallbackLabel={logo.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
