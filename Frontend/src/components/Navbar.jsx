import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLenis } from '@studio-freight/react-lenis'
import useApiData from '../hooks/useApiData'
import { resolveMediaUrl } from '../config/api'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const lenis = useLenis()
  const { data: settings } = useApiData('/site-settings', { logoUrl: '/assets/Logoo.png' })

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          background-color: #1f212d;
          padding: 0.9rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 999;
          font-family: 'Proxima Nova', sans-serif;
          font-weight:800;
        }
        .navbar__logo { height: 48px; width: auto; flex-shrink: 0; }
        .navbar__logo img { height: 100%; width: auto; object-fit: contain; }
        .navbar__links {
          display: flex; gap: 3.25rem; list-style: none;
          flex-grow: 1; justify-content: center;
        }
        .navbar__links a {
          color: #e0ded2; text-decoration: none;
          font-size: 1.05rem; font-family: inherit;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding-bottom: 0.3rem;
          border-bottom: 2px solid transparent;
          transition: all 0.25s ease;
          
        }
        .navbar__links a:hover, .navbar__links a.active {
          color: #2ea3dd; border-bottom-color: #2ea3dd;
        }
        .navbar__cta {
          background-color: #2ea3dd; color: white; border: none;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 1rem; font-weight: 600;
          padding: 0.75rem 2.2rem; border-radius: 999px;
          cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
          transition: background-color 0.25s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .navbar__cta:hover { background-color: #1b87bb; transform: translateY(-1px); }
        .navbar__cta:active { transform: translateY(0); }
        .navbar__hamburger {
          display: none; flex-direction: column; gap: 4px;
          cursor: pointer; background: none; border: none; padding: 0;
        }
        .navbar__hamburger span {
          width: 24px; height: 2px; background-color: #e0ded2;
          display: block; transition: all 0.3s ease;
        }
        .mobile-menu {
          display: none;
          position: fixed; top: 70px; left: 0; width: 100%;
          background-color: #1f212d;
          padding: 1.5rem 2rem; z-index: 998;
          border-top: 1px solid rgba(224,222,210,0.1);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          flex-direction: column; gap: 1rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          color: #e0ded2; text-decoration: none;
          font-family: 'Proxima Nova', sans-serif;
          font-size: 1rem; font-weight: 500;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(224,222,210,0.1);
          transition: color 0.2s;
        }
        .mobile-menu a:hover, .mobile-menu a.active { color: #2ea3dd; }
        @media (max-width: 992px) {
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
          .navbar { gap: 1rem; }
          .navbar__cta { display: none; }
        }
      `}</style>

      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar__logo">
          <img src={resolveMediaUrl(settings.logoUrl)} alt="ENSI Junior Entreprise logo" />
        </div>
        <ul className="navbar__links">
          <li><NavLink to="/" end onClick={scrollToTop}>Home</NavLink></li>
          <li><NavLink to="/a-propos" onClick={scrollToTop}>About</NavLink></li>
          <li><NavLink to="/services" onClick={scrollToTop}>Services</NavLink></li>
          <li><NavLink to="/actualites" onClick={scrollToTop}>News</NavLink></li>
          <li><NavLink to="/contact" onClick={scrollToTop}>Contact</NavLink></li>
        </ul>
        <NavLink to="/contact" className="navbar__cta" onClick={scrollToTop}>
          Request a Quote <span aria-hidden="true">→</span>
        </NavLink>
        <button className="navbar__hamburger" aria-label="Open mobile menu"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => { setMenuOpen(false); scrollToTop(); }}>Home</NavLink>
        <NavLink to="/a-propos" onClick={() => { setMenuOpen(false); scrollToTop(); }}>About</NavLink>
        <NavLink to="/services" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Services</NavLink>
        <NavLink to="/actualites" onClick={() => { setMenuOpen(false); scrollToTop(); }}>News</NavLink>
        <NavLink to="/contact" onClick={() => { setMenuOpen(false); scrollToTop(); }}>Contact</NavLink>
        <NavLink to="/contact" className="navbar__cta" style={{ marginTop: '0.5rem', justifyContent: 'center', textAlign: 'center' }} onClick={() => { setMenuOpen(false); scrollToTop(); }}>
          Request a Quote <span aria-hidden="true">→</span>
        </NavLink>
      </div>
    </>
  )
}
