import { media } from '../assets/media'

export default function APropos() {
  return (
    <>
      <style>{`
        .about-hero { position: relative; background-size: cover; background-position: center; }
        .about-hero .hero-inner { min-height: 100vh; display:flex; align-items:center; justify-content:center; position:relative; }
        .about-hero .veil { position:absolute; inset:0; background:linear-gradient(to bottom, rgba(31,33,45,0.65), rgba(31,33,45,0.8)); z-index:0 }
        .about-hero .hero-content { position:relative; z-index:1; text-align:center; color:white }
        .about-hero .eyebrow { color: #e0ded2; margin-bottom: 0.5rem; letter-spacing:0.18em; text-transform:uppercase; }
        .about-title { font-family: Gilroy, heading, system-ui, -apple-system, 'Segoe UI', Roboto; font-size: clamp(3rem, 9vw, 88px); line-height:0.92; font-weight:900; margin:0; text-transform:none; }
        .about-title .brand { display:inline-block; }
        .about-sub { color: rgba(224,222,210,0.95); margin-top:1rem; font-size:1.05rem }

        /* decorative lines around eyebrow */
        .hero-eyebrow-wrap{ display:flex; align-items:center; gap:1rem; justify-content:center; margin-bottom:0.75rem }
        .hero-eyebrow-wrap::before, .hero-eyebrow-wrap::after { content:''; width:6rem; height:2px; background:rgba(255,255,255,0.35); }

        .values-track { display:flex; align-items:center; justify-content:center; gap:4.5rem; position:relative; padding:4rem 0 }
        .values-track .line { position:absolute; left:8%; right:8%; height:4px; background: rgba(224,222,210,0.06); top:50%; transform:translateY(-50%); z-index:0 }
        .values-track .line-end { position:absolute; width:12px; height:12px; border-radius:999px; background:rgba(224,222,210,0.95); top:50%; transform:translateY(-50%); z-index:2 }
        .values-track .line-end.left { left:7.6% }
        .values-track .line-end.right { right:7.6% }
        .value-item { position:relative; z-index:1; width:280px; text-align:center }
        .value-circle { width:150px; height:150px; border-radius:999px; background:#f6f2e8; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; box-shadow: 0 18px 36px rgba(0,0,0,0.55); }
        .value-label { font-weight:800; color:#2ea3dd; letter-spacing:0.02em }
        .value-desc { color: rgba(31,33,45,0.95); max-width:220px; margin:0 auto; font-size:0.95rem; line-height:1.45 }

        .stats-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:3rem; text-align:center; padding:3.25rem 0 }
        .stats-grid > div { color: rgba(224,222,210,0.95) }
        .stats-grid .num { font-size:1.8rem; font-weight:900; margin-bottom:0.6rem }
        .stats-grid .label { text-transform:uppercase; font-size:0.85rem; letter-spacing:0.08em; color:rgba(224,222,210,0.65) }

        .axes-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:1.5rem }
        .axis-card { border:2px solid rgba(224,222,210,0.06); padding:1.35rem; border-radius:12px; background:transparent; min-height:140px; display:flex; gap:1rem; align-items:flex-start; flex-direction:column; justify-content:flex-start; text-align:center; transition:transform .28s var(--ease-standard), box-shadow .28s var(--ease-standard); }
        .axis-card:hover{ transform:translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.55); }
        .axis-card h4{ margin:0 0 0.5rem 0 }
        .axis-icon { width:44px; height:44px; display:inline-flex; align-items:center; justify-content:center; background:rgba(46,163,221,0.06); border-radius:8px }

        .prestations { display:grid; grid-template-columns:1fr 1fr; gap:2rem; align-items:start; position:relative; padding-top:2rem }
        .prestations::before { content:''; position:absolute; left:50%; top:5%; bottom:5%; width:2px; background: rgba(224,222,210,0.06); transform:translateX(-50%) }
        .prest-left, .prest-right { display:flex; flex-direction:column; gap:1.25rem; align-items:flex-start }
        .prest-right { align-items:flex-end }
        .prest-card { border:2px solid rgba(224,222,210,0.06); padding:0.9rem 1.6rem; border-radius:12px; background:transparent; max-width:480px; position:relative; transition:transform .28s var(--ease-standard), box-shadow .28s var(--ease-standard); }
        .prest-card:hover{ transform:translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.55); }
        .prest-card.small{ max-width:360px }
        .prest-card::after { content:''; position:absolute; width:14px; height:14px; border-radius:999px; background:#1f212d; border:4px solid rgba(224,222,210,0.95); box-shadow:0 10px 20px rgba(0,0,0,0.5); top:50%; transform:translateY(-50%)}
        .prest-left .prest-card::after { right:-86px }
        .prest-right .prest-card::after { left:-86px }
        .prest-card .icon { display:inline-flex; width:22px; height:22px; align-items:center; justify-content:center; margin-right:0.75rem }

        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2,1fr) } .prestations { grid-template-columns: 1fr } .prestations::before { left:6% } .prest-right{align-items:flex-start} }
      `}</style>

      {/* Hero - full screen with big split title */}
      <section className="section-shell about-hero" style={{ backgroundImage: `url(${media.images.aboutPrimary})` }}>
          <div className="hero-inner">
          <div className="veil animate-veil" />
          <div className="container hero-content">
            <div className="hero-eyebrow-wrap"><span className="eyebrow">A propos de</span></div>
            <h1 className="about-title animate-hero-zoom"><span className="brand" style={{color:'var(--eje-accent)', marginRight:8}}>ENSI</span><span className="brand" style={{color:'#fff'}}>Junior</span><br/><span style={{display:'block', marginTop:8, fontSize:'1.25rem', fontWeight:800}}>Entreprise</span></h1>
            <p className="about-sub animate-rise">Créativité — Professionnalisme — Excellence</p>
            <div style={{marginTop:'1.25rem'}}>
              <a href="#qui" className="btn btn-outline">Découvrir</a>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section id="qui" className="section-shell" style={{padding:'3.5rem 0'}}>
        <div className="container" style={{display:'flex',gap:'2rem',alignItems:'center'}}>
          <div style={{flex:1}}>
            <h2 className="section-title"><span style={{color:'var(--eje-accent)'}}>Qui</span> sommes-nous?</h2>
            <p style={{color:'rgba(224,222,210,0.85)'}}>Fondée en <strong>2006</strong>, l'ENSI Junior Entreprise (EJE) est une association à but non lucratif ayant pour finalité l'initiation des étudiants à la vie entrepreneuriale. Pendant <strong>20 ans</strong>, notre association s'est consacrée à définir sa propre trajectoire vers l'excellence, l'innovation et l'expertise.</p>
          </div>
          <div style={{width:340}}>
            <img src={media.images.aboutSecondary} alt="Equipe EJE" style={{width:'100%', borderRadius:8, boxShadow:'0 10px 30px rgba(0,0,0,0.4)'}} />
          </div>
        </div>
      </section>

      {/* Nos valeurs - horizontal track with circles */}
      <section className="section-shell" style={{padding:'2rem 0 3rem'}}>
        <div className="container">
          <h3 style={{textAlign:'center', marginBottom:'1.25rem'}}><span style={{color:'var(--eje-accent)'}}>Nos</span> valeurs</h3>
          <div className="values-track">
            <span className="line" />
            <span className="line-end left" />
            <span className="line-end right" />
            <div className="value-item">
              <div className="value-circle"><div className="value-label">Créa</div></div>
              <div className="value-desc">Nous repoussons les limites de l'innovation pour offrir des solutions originales et sur mesure.</div>
            </div>
            <div className="value-item">
              <div className="value-circle"><div className="value-label">Pro</div></div>
              <div className="value-desc">Rigueur, engagement et respect des délais dans chaque projet que nous réalisons.</div>
            </div>
            <div className="value-item">
              <div className="value-circle"><div className="value-label">Exc</div></div>
              <div className="value-desc">Nous visons l'excellence dans chaque détail, de la conception à la livraison.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="section-shell" style={{padding:'2rem 0'}}>
        <div className="container">
          <h3 style={{textAlign:'center', marginBottom:'1.25rem'}}><span style={{color:'var(--eje-accent)'}}>Chiffres</span> Clés</h3>
          <div className="stats-grid">
            <div><div className="num">+75</div><div className="label">Clients satisfaits</div></div>
            <div><div className="num">+78</div><div className="label">Projets élaborés</div></div>
            <div><div className="num">+48</div><div className="label">Formations et workshops</div></div>
            <div><div className="num">+35</div><div className="label">Entreprises collaboratrices</div></div>
            <div><div className="num">7</div><div className="label">Visites d'entreprise/ an</div></div>
            <div><div className="num">9</div><div className="label">Partenaires multinationaux</div></div>
          </div>
        </div>
      </section>

      {/* Nos Axes */}
      <section className="section-shell" style={{padding:'2rem 0'}}>
        <div className="container">
          <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Nos <span style={{color:'var(--eje-accent)'}}>Axes</span></h3>
          <div className="axes-grid">
            <div className="axis-card"> 
              <div className="axis-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#2ea3dd"/><path d="M2 17l10 5 10-5" stroke="#2ea3dd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4>Axe formation</h4>
                <p>Workshops intensifs et formations techniques pour élever les compétences.</p>
              </div>
            </div>
            <div className="axis-card"> 
              <div className="axis-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12l4 4 16-10" stroke="#2ea3dd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4>Axe projet</h4>
                <p>Projets concrets et challengeants pour des clients réels.</p>
              </div>
            </div>
            <div className="axis-card"> 
              <div className="axis-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="14" rx="2" stroke="#2ea3dd" strokeWidth="1.6"/><path d="M8 8h8" stroke="#2ea3dd" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <div>
                <h4>Axe événementiel</h4>
                <p>Organisation d'événements à fort impact pour connecter l'académique et le professionnel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Prestations - timeline style */}
      <section className="section-shell" style={{padding:'2rem 0 4rem'}}>
        <div className="container">
          <h3 style={{textAlign:'center', marginBottom:'1rem'}}>Nos <span style={{color:'var(--eje-accent)'}}>Prestations</span></h3>
          <div className="prestations">
            <div className="prest-left">
              <div className="prest-card">&lt;&gt; Conception et Développement de Sites Web</div>
              <div className="prest-card">Développement d'Applications Mobiles</div>
            </div>
            <div className="prest-right">
              <div className="prest-card">Développement de Supports Logiciel</div>
              <div className="prest-card">Conception et Déploiement des Agents ChatBot</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
