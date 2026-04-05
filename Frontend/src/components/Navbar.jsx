import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronRight, Menu, X } from 'lucide-react'
import { media } from '../assets/media'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'A propos' },
  { to: '/services', label: 'Services' },
  { to: '/actualites', label: 'Actualites' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-text-secondary/10 bg-[#171a27]/80 py-3 backdrop-blur-xl' : 'bg-transparent py-6'
      }`}
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
            <span className="text-xs font-bold leading-tight text-accent">Entreprise</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-text-secondary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn btn-primary hidden gap-2 px-5 py-2 text-sm sm:flex">
            Demander un devis
            <ChevronRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-text-secondary transition-colors hover:text-accent lg:hidden"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="container flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border-b border-text-secondary/5 py-2 text-lg font-medium ${isActive ? 'text-accent' : 'text-text-secondary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link to="/contact" className="btn btn-primary mt-4 w-full justify-center">
            Demander un devis
          </Link>
        </div>
      </div>
    </header>
  )
}