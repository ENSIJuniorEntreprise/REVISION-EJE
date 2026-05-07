import ejeLogo from '../assets/EJE_White.png'
export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Montserrat:wght@400;500;600;700&display=swap');
        .footer {
          background: #191b26;
          padding-top: 3.5rem;
          font-family: 'Montserrat', sans-serif;
          color: #e0ded2;
        }
        .footer__grid {
          max-width: 100%; margin: 0 auto;
          padding: 0 4rem 3rem;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 0; align-items: start;
        }
        .footer__logo-row {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.9rem; margin-top:0.1rem;
                }
        .footer__globe { width: 52px; height: 52px; flex-shrink: 0; }
        .footer__logo-name { font-size: 1rem; font-weight: 700; color: #e0ded2; letter-spacing: 0.01em; }
        .footer__tagline { font-size: 0.83rem; color: rgba(224,222,210,0.5); line-height: 1.65; max-width: 240px; margin-bottom: 1.8rem; }
        .footer__slogan { font-family: 'Photograph Signature', cursive; font-size: 2rem; color: #2ea3dd; letter-spacing: 0.02em; line-height: 1.3; }
        .footer__col-title { font-size: 0.92rem; font-weight: 700; color: #e0ded2; letter-spacing: 0.04em; margin-bottom: 1.4rem; }
        .footer__nav { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; }
        .footer__nav a { font-size: 0.88rem; color: rgba(224,222,210,0.5); text-decoration: none; transition: color 0.2s ease; }
        .footer__nav a:hover { color: #2ea3dd; }
        .footer__contact-list { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; margin-bottom: 1.8rem; }
        .footer__contact-item { display: flex; align-items: center; gap: 0.65rem; font-size: 0.87rem; color: rgba(224,222,210,0.5); }
        .footer__contact-item a { color: rgba(224,222,210,0.5); text-decoration: none; transition: color 0.2s; }
        .footer__contact-item a:hover { color: #2ea3dd; }
        .footer__contact-icon {
          width: 28px; height: 28px;
          border: 1px solid rgba(46,163,221,0.35); border-radius: 4px;
          background: rgba(46,163,221,0.08);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .footer__contact-icon svg { width: 13px; height: 13px; stroke: #2ea3dd; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .footer__socials { display: flex; gap: 0.65rem; }
        .footer__social-btn {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(224,222,210,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(224,222,210,0.5); text-decoration: none;
          transition: all 0.22s ease;
        }
        .footer__social-btn:hover { background: #2ea3dd; border-color: #2ea3dd; color: #fff; transform: translateY(-2px); }
        .footer__social-btn svg { width: 15px; height: 15px; fill: currentColor; }
        .footer__divider { max-width: 100%; margin: 0 4rem; height: 1px; background: rgba(224,222,210,0.1); }
        .footer__bottom { padding: 1.25rem 2rem; text-align: center; }
        .footer__copy { font-size: 0.78rem; color: rgba(224,222,210,0.5); letter-spacing: 0.02em; }
        .footer__brand, .footer__grid > nav, .footer__contact, .footer__legal {
          padding-top: 0;
          align-self: start;
        }
        .footer__col-title {
          margin-top: 0;
        }
        @media (max-width: 768px) {
          .footer__grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .footer__brand { grid-column: 1 / -1; }
          .footer__legal { grid-column: 1 / 2; }
        }
        @media (max-width: 480px) {
          .footer__grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="footer" aria-label="Pied de page">
        <div className="footer__grid">

          {/* Column 1: Brand */}
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img src={ejeLogo} alt="Logo ENSI Junior Entreprise" className='footer__globe' />
              <span className="footer__logo-name">ENSI Junior Entreprise</span>
            </div>
            <p className="footer__tagline">
                The student association connecting<br/>
                businesses with the talents of tomorrow.
            </p>
            <p className="footer__slogan" aria-label="Always Striving For Greatness">
              Always Striving For Greatness
            </p>
          </div>

          {/* Column 2: Navigation */}
          <nav aria-label="Navigation footer">
            <h3 className="footer__col-title">Navigation</h3>
            <ul className="footer__nav">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#actualites">Actualités</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          {/* Column 4: Legally */}
          <div className="footer__legal">
            <h3 className="footer__col-title">Legally</h3>
            <ul className="footer__nav">
              <li><a href="#">Legal Mention</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Moral Report</a></li>
              <li><a href="#">Financial Report</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer__contact">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__contact-list" aria-label="Informations de contact">
              <li className="footer__contact-item">
                <div className="footer__contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                </div>
                <a href="mailto:contact@ensi-je.com">contact@ensi-je.com</a>
              </li>
              <li className="footer__contact-item">
                <div className="footer__contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <span>+216 XX XXX XXX</span>
              </li>
              <li className="footer__contact-item">
                <div className="footer__contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span>ENSI, Manouba, Tunisie</span>
              </li>
            </ul>
            <div className="footer__socials" aria-label="Réseaux sociaux">
              <a href="https://www.facebook.com/ENSI.Junior.Entreprise" className="footer__social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/ensijunior/" className="footer__social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/ensi-junior-entreprise/" className="footer__social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com/@ENSIJuniorEntreprise" className="footer__social-btn" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="footer__divider" aria-hidden="true"></div>
        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2026 ENSI Junior Entreprise. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  )
}
