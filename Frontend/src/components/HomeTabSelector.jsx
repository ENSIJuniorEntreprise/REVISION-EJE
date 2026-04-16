import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLenis } from '@studio-freight/react-lenis'

const tabs = [
  { sectionId: 'about', label: 'A propos' },
  { sectionId: 'services', label: 'Services' },
  { sectionId: 'actualites', label: 'Actualites' },
  { sectionId: 'contact', label: 'Contact' },
]

const HOME_SCROLL_OFFSET = -108

export default function HomeTabSelector({ visible = false }) {
  const lenis = useLenis()
  const sectionIds = useMemo(() => tabs.map((tab) => tab.sectionId), [])
  const [activeSectionId, setActiveSectionId] = useState(tabs[0].sectionId)

  useEffect(() => {
    if (!visible) {
      return undefined
    }

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    if (!sections.length) {
      return undefined
    }

    const syncActiveSectionFromViewport = () => {
      const viewportAnchor = window.innerHeight * 0.38
      let nextSectionId = sections[0].id
      let bestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - viewportAnchor)
        if (distance < bestDistance) {
          bestDistance = distance
          nextSectionId = section.id
        }
      })

      setActiveSectionId((currentId) => (currentId === nextSectionId ? currentId : nextSectionId))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryA.boundingClientRect.top - entryB.boundingClientRect.top)

        if (intersectingEntries.length > 0) {
          const nextSectionId = intersectingEntries[0].target.id
          setActiveSectionId((currentId) => (currentId === nextSectionId ? currentId : nextSectionId))
          return
        }

        syncActiveSectionFromViewport()
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    syncActiveSectionFromViewport()
    window.addEventListener('scroll', syncActiveSectionFromViewport, { passive: true })
    window.addEventListener('resize', syncActiveSectionFromViewport)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', syncActiveSectionFromViewport)
      window.removeEventListener('resize', syncActiveSectionFromViewport)
    }
  }, [sectionIds, visible])

  const handleTabClick = useCallback(
    (event, sectionId) => {
      event.preventDefault()

      const targetSection = document.getElementById(sectionId)
      if (!targetSection) {
        return
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setActiveSectionId(sectionId)

      if (lenis) {
        lenis.scrollTo(targetSection, { offset: HOME_SCROLL_OFFSET, immediate: prefersReducedMotion })
      } else {
        const top = targetSection.getBoundingClientRect().top + window.scrollY + HOME_SCROLL_OFFSET
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      }

      window.history.replaceState(null, '', `#${sectionId}`)
    },
    [lenis],
  )

  return (
    <nav
      className={`home-tab-selector hidden md:block ${visible ? 'home-tab-selector-visible' : ''}`}
      aria-label="Navigation rapide accueil"
      aria-hidden={!visible}
    >
      <div className="home-tab-shell">
        {tabs.map((tab) => (
          <button
            key={tab.sectionId}
            type="button"
            className={`home-tab-link ${activeSectionId === tab.sectionId ? 'home-tab-link-active' : ''}`}
            onClick={(event) => handleTabClick(event, tab.sectionId)}
            aria-current={activeSectionId === tab.sectionId ? 'true' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
