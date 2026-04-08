import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  return (
    <nav className="bg-slate-950/90 backdrop-blur sticky top-0 z-50 border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-slate-200">
        <div className="flex items-center gap-3 font-semibold text-BEIGE">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full  bg-slate-900">

          <img src="assets/logo.png" alt="Logo" />
          </span>
          ENSI JUNIOR ENTREPRISE
        </div>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-300'}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}