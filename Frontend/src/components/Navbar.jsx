import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronRight, Menu, X } from 'lucide-react'
import { media } from '../assets/media'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    let lastScrolledState = false

    const handleScroll = () => {
      const nextScrolledState = window.scrollY > 20

      if (nextScrolledState === lastScrolledState) {
        return
      }

      lastScrolledState = nextScrolledState
      setIsScrolled(nextScrolledState)
    }

    lastScrolledState = window.scrollY > 20
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-eje-beige/10 bg-eje-dark/90 py-3 backdrop-blur-xl' : 'bg-transparent py-6'
      } ${isReady ? 'nav-load-enter-active' : 'nav-load-enter'}`}
    >
      <nav className="container flex items-center justify-between" aria-label="Navigation principale">
        <Link to="/" className="group flex items-center gap-3" aria-label="ENSI Junior Entreprise">
          <img
            src={media.logos.primary}
            alt="Logo ENSI Junior Entreprise"
            className="h-10 w-auto transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold leading-tight">ENSI Junior</span>
            <span className="text-xs font-bold leading-tight text-eje-accent">Entreprise</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-eje-accent ${isActive ? 'text-eje-accent' : 'text-eje-beige'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn btn-primary navbar-cta hidden gap-2 px-5 py-2 text-sm sm:flex">
            Demander un devis
            <ChevronRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-eje-beige transition-colors hover:text-eje-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark lg:hidden"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`} aria-hidden={!isMenuOpen}>
        <div className="container flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border-b border-eje-beige/5 py-2 text-lg font-medium ${isActive ? 'text-eje-accent' : 'text-eje-beige'}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link to="/contact" className="btn btn-primary navbar-cta mt-4 w-full justify-center">
            Demander un devis
          </Link>
        </div>
      </div>
    </header>
  )
}