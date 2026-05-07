import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ejeLogo from '../assets/EJE_White.png'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
          font-family: 'Montserrat', sans-serif;
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
          font-family: 'Montserrat', sans-serif;
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

      <nav className="navbar" aria-label="Navigation principale">
        <div className="navbar__logo">
          <img src={ejeLogo} alt="Logo ENSI Junior Entreprise" />
        </div>
        <ul className="navbar__links">
          <li><NavLink to="/" end>Accueil</NavLink></li>
          <li><NavLink to="/apropos">À propos</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/actualites">Actualités</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <button className="navbar__cta">
          Demander un devis <span aria-hidden="true">→</span>
        </button>
        <button className="navbar__hamburger" aria-label="Ouvrir le menu mobile"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Accueil</NavLink>
        <NavLink to="/apropos" onClick={() => setMenuOpen(false)}>À propos</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink>
        <NavLink to="/actualites" onClick={() => setMenuOpen(false)}>Actualités</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <button className="navbar__cta" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
          Demander un devis <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}
