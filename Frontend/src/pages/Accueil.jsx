import { Link } from 'react-router-dom'
import { media } from '../assets/media'

export default function Accueil() {
  return (
    <>
      <style>{`
        :root{ --eje-accent: #2ea3dd }
        /* Page-specific styles to match captures */
        .hero-acc { position:relative; background-size:cover; background-position:center; }
        .hero-inner { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative }
        .hero-curtain{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(21,40,52,0.7), rgba(31,33,45,0.88)); z-index:0 }
        .hero-content{ position:relative; z-index:1; text-align:center; padding:0 1rem }
        .hero-title{ font-family:Gilroy, heading, system-ui; font-weight:900; line-height:0.9; color: var(--eje-accent); font-size: clamp(48px, 8.5vw, 110px); text-wrap:balance; letter-spacing:-0.02em }
        .hero-title .accent{ color: var(--eje-accent) }
        .hero-sub{ color: rgba(224,222,210,0.95); margin-top:0.5rem; font-size:1.05rem }
        .hero-ctas{ display:flex; gap:1rem; justify-content:center; margin-top:1.5rem }
        .btn-hero { background: linear-gradient(180deg, #40b9f0, #1fa3dd); color:white; padding:16px 34px; border-radius:28px; font-weight:800; box-shadow: 0 18px 30px rgba(5,68,96,0.42); border:0 }
        .btn-outline-hero { border:2px solid rgba(46,163,221,0.18); color:rgba(224,222,210,0.95); padding:12px 28px; border-radius:28px; background:transparent }

        /* Section 2 - solutions */
        .solutions { padding:5.5rem 0 }
        .solutions .left { max-width:720px }
        .solutions .big-h { font-family:Gilroy, heading; font-weight:900; font-size: clamp(40px,6.5vw,72px); line-height:0.95; color:var(--eje-accent); margin-bottom:0.6rem }
        .feature-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:1rem }
        .feature-card { background: rgba(16,18,24,0.88); border-radius:14px; padding:1.6rem; box-shadow: 0 20px 48px rgba(0,0,0,0.6); border:1px solid rgba(46,163,221,0.06); color: #e7e3dc }
        .feature-card h4{ color:var(--eje-accent); font-weight:900; font-size:1.05rem; margin-bottom:6px }
        .feature-icon { width:56px; height:56px; background:rgba(46,163,221,0.12); border-radius:12px; display:inline-flex; align-items:center; justify-content:center; margin-bottom:0.8rem }
        .stats-pills { display:flex; gap:1rem; margin-top:1.6rem }
        .stat-pill { background: rgba(16,18,24,0.82); padding:14px 18px; border-radius:12px; min-width:140px; text-align:center; }
        .stat-pill .num{ font-weight:900; font-size:1.6rem; color:#f3efe6 }

        /* Section 3 - stack cards */
        .stack { padding:4.5rem 0 }
        .stack-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:1rem }
        .stack-card{ background: rgba(16,18,24,0.92); padding:2.1rem; border-radius:14px; color:#e7e3dc; box-shadow:0 22px 48px rgba(0,0,0,0.6); border:1px solid rgba(46,163,221,0.04) }
        .stack-card h4{ color:var(--eje-accent); font-weight:900 }
        .stack-card.big{ grid-column:2 / span 1; transform:translateY(30px); }

        /* Section 4 - stats bar & partners */
        .metrics { background: linear-gradient(180deg, rgba(6,20,30,0.9), rgba(10,12,18,0.96)); padding:3rem 0; border-top:1px solid rgba(46,163,221,0.06); border-bottom:1px solid rgba(46,163,221,0.06) }
        .metrics-grid{ display:grid; grid-template-columns: repeat(4,1fr); gap:1rem; text-align:center }
        .metric{ color:#e7e3dc }
        .metric .val{ font-size:1.6rem; font-weight:900 }

        /* Section 5 - CTA / footer blocks */
        .cta-row{ display:grid; grid-template-columns:1fr 1fr; gap:1rem; padding:3rem 0 }
        .cta-block{ background: rgba(16,18,24,0.9); padding:2.2rem; border-radius:18px; color:#e7e3dc; border:1px solid rgba(46,163,221,0.06) }

        @media(max-width:1024px){ .stack-grid{ grid-template-columns: repeat(2,1fr) } .stack-card.big{ transform:none } .metrics-grid{ grid-template-columns: repeat(2,1fr) } .cta-row{ grid-template-columns:1fr } .solutions { padding:3.5rem 0 } }
        @media(max-width:768px){ .hero-title{ font-size:40px; text-align:center } .solutions .left{ max-width:100% } .feature-grid{ grid-template-columns:1fr } .stack-grid{ grid-template-columns:1fr } .partners-track{ gap:18px } }
        @media(max-width:640px){ .hero-title{ font-size:32px } .feature-grid{ grid-template-columns:1fr } .metrics-grid{ grid-template-columns:1fr } .cta-row{ grid-template-columns:1fr } .partners-track{ animation-duration:36s } }
        /* Force headings blue and bold across this page */
        .hero-title, .big-h, h2, h3, h4 { color: var(--eje-accent) !important; font-weight:900 !important }
        /* Partners marquee */
        .partners-wrap{ overflow:hidden; margin-top:14px }
        .partners-track{ display:flex; gap:28px; align-items:center; white-space:nowrap; animation:scroll-left 24s linear infinite }
        .partners-wrap:hover .partners-track{ animation-play-state:paused }
        .partner-item{ display:inline-flex; align-items:center; justify-content:center; padding:6px 12px }
        @keyframes scroll-left{ 0%{ transform:translateX(0) } 100%{ transform:translateX(-50%) } }
      `}</style>

      {/* Capture 1 - Header / Hero */}
      <section className="hero-acc" style={{ backgroundImage: 'url(' + media.images.hero + ')' }}>
        <div className="hero-inner">
          <div className="hero-curtain" />
          <div className="container hero-content">
            <h1 className="hero-title">
              L'excellence <span className="accent">au service de</span><br/> vos ambitions.
            </h1>
            <p className="hero-sub">Innovation. Excellence. Créativité.</p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn-hero">Demander un devis →</Link>
              <a href="#solutions" className="btn-outline-hero">Découvrir</a>
            </div>
          </div>
        </div>
      </section>

      {/* Capture 2 - Solutions / Features */}
      <section id="solutions" className="solutions">
        <div className="container" style={{ display:'flex', gap: '2rem', alignItems:'flex-start' }}>
          <div className="left">
            <div style={{color:'var(--eje-accent)', fontWeight:700, marginBottom:8}}>QUI SOMMES‑NOUS</div>
            <h2 className="big-h">Des Solutions Numériques<br/>qui <span style={{color:'var(--eje-accent)'}}>Inspirent.</span></h2>
            <p style={{color:'rgba(224,222,210,0.85)', marginTop:12}}>Chez EJE, nous ne nous contentons pas de créer des logiciels ; nous concevons des expériences. Notre équipe de développeurs et de designers d'élite travaille à l'intersection de la créativité et de l'excellence technique pour livrer des produits qui redéfinissent les industries.</p>
            <div className="stats-pills">
              <div className="stat-pill"><div className="num">10+</div><div style={{fontSize:12, color:'rgba(224,222,210,0.6)'}}>ANS D'EXPERIENCE</div></div>
              <div className="stat-pill"><div className="num">150+</div><div style={{fontSize:12, color:'rgba(224,222,210,0.6)'}}>PROJETS LIVRÉS</div></div>
            </div>
          </div>

          <div style={{flex:1}}>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#2ea3dd"/></svg></div>
                <h4 style={{margin:0, fontSize:18}}>Créativité</h4>
                <p style={{color:'rgba(224,222,210,0.75)', marginTop:8}}>Des solutions innovantes qui repoussent les limites du conventionnel.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 12l4 4 16-10" stroke="#2ea3dd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <h4 style={{margin:0, fontSize:18}}>Fiabilité</h4>
                <p style={{color:'rgba(224,222,210,0.75)', marginTop:8}}>Architecturer des systèmes sécurisés et évolutifs qui résistent au temps et au trafic.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#2ea3dd"/></svg></div>
                <h4 style={{margin:0, fontSize:18}}>Précision</h4>
                <p style={{color:'rgba(224,222,210,0.75)', marginTop:8}}>Des stratégies de développement ciblées qui s'alignent parfaitement avec vos objectifs commerciaux.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v12H4z" stroke="#2ea3dd" strokeWidth="1.6"/></svg></div>
                <h4 style={{margin:0, fontSize:18}}>Collaboration</h4>
                <p style={{color:'rgba(224,222,210,0.75)', marginTop:8}}>Vos partenaires de croissance, travaillant comme une extension de votre équipe interne.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capture 3 - Stack / Services */}
      <section className="stack">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:20}}>
            <div style={{color:'var(--eje-accent)', fontWeight:700}}>Nos Services</div>
            <h2 className="big-h">Un Stack Technique <span style={{color:'var(--eje-accent)'}}>Complet.</span></h2>
            <p style={{color:'rgba(224,222,210,0.8)', maxWidth:760, margin:'0 auto'}}>De la découverte initiale au déploiement final, nous offrons une expertise technique de bout en bout dans tous les domaines numériques modernes.</p>
          </div>
          <div className="stack-grid">
            <div className="stack-card">
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:44,height:44,background:'rgba(46,163,221,0.12)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="#2ea3dd" strokeWidth="1.6"/></svg></div>
                <div>
                  <h4 style={{margin:0}}>Développement Web</h4>
                  <p style={{marginTop:8,color:'rgba(224,222,210,0.75)'}}>Applications web sur mesure construites avec les frameworks les plus récents pour la vitesse et l'évolutivité.</p>
                </div>
              </div>
            </div>
            <div className="stack-card big">
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:44,height:44,background:'rgba(46,163,221,0.12)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="2" stroke="#2ea3dd" strokeWidth="1.6"/></svg></div>
                <div>
                  <h4 style={{margin:0}}>Solutions Mobiles</h4>
                  <p style={{marginTop:8,color:'rgba(224,222,210,0.75)'}}>Expériences fluides sur iOS et Android conçues avec Flutter et React Native.</p>
                </div>
              </div>
            </div>
            <div className="stack-card">
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:44,height:44,background:'rgba(46,163,221,0.12)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="#2ea3dd" strokeWidth="1.6"/></svg></div>
                <div>
                  <h4 style={{margin:0}}>Développement Desktop</h4>
                  <p style={{marginTop:8,color:'rgba(224,222,210,0.75)'}}>Applications desktop sur mesure construites pour la performance et l'évolutivité.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{display:'grid', justifyItems:'center', marginTop:24}}>
            <div className="stack-card" style={{maxWidth:680}}>
              <h4 style={{margin:0}}>Développement Chatbots</h4>
              <p style={{marginTop:8,color:'rgba(224,222,210,0.75)'}}>Automatisation intelligente, Chatbots alimentés par l'IA et FAQ intelligentes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capture 4 - Metrics & Partners */}
      <section className="metrics">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:18}}>
            <div style={{color:'var(--eje-accent)', fontWeight:700}}>Nos Actualités</div>
            <h2 className="big-h">Pourquoi L'ENSI Junior Entreprise?</h2>
            <p style={{color:'rgba(224,222,210,0.75)'}}>Raisons pour lesquelles vous allez travailler avec nous</p>
          </div>
          <div className="metrics-grid">
            <div className="metric"><div className="val">99%</div><div style={{fontSize:12,color:'rgba(224,222,210,0.6)'}}>SATISFACTION CLIENT</div></div>
            <div className="metric"><div className="val">12+</div><div style={{fontSize:12,color:'rgba(224,222,210,0.6)'}}>PARTENAIRES RENOMMÉS</div></div>
            <div className="metric"><div className="val">45%</div><div style={{fontSize:12,color:'rgba(224,222,210,0.6)'}}>CROISSANCE MOYENNE</div></div>
            <div className="metric"><div className="val">3+</div><div style={{fontSize:12,color:'rgba(224,222,210,0.6)'}}>PRIX D'EXCELLENCE</div></div>
          </div>

          <div style={{marginTop:28, textAlign:'center'}}>
            <h3 style={{color:'var(--eje-accent)', fontWeight:900, fontSize:20}}>Nos partenaires</h3>
            <p style={{color:'rgba(224,222,210,0.6)', marginBottom:10}}>Ceux qui nous ont fait confiance</p>
            <div className="partners-wrap">
              <div className="partners-track">
                {media.partners && [...media.partners.slice(0,8), ...media.partners.slice(0,8)].map((p, idx) => (
                  <div key={p.name+idx} className="partner-item"><img src={p.src} alt={p.name} style={{height:56, objectFit:'contain', display:'block'}}/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capture 5 - CTA blocks / Footer-like last section */}
      <section style={{padding:'3rem 0'}}>
        <div className="container">
          <div className="cta-row">
            <div className="cta-block">
              <h3 style={{fontSize:28, margin:0}}>Prêt à Créer Votre<br/>Prochain <span style={{color:'var(--eje-accent)'}}>Chef-d'oeuvre?</span></h3>
              <p style={{color:'rgba(224,222,210,0.75)', marginTop:12}}>Nous sommes impatients de découvrir votre vision. Contactez nous directement en cliquant ce bouton là :</p>
              <div style={{marginTop:14}}><Link to="/contact" className="btn-hero">Demander un devis →</Link></div>
            </div>
            <div className="cta-block">
              <h3 style={{fontSize:28, margin:0}}>Contactez<br/> <span style={{color:'var(--eje-accent)'}}>Nous</span></h3>
              <p style={{color:'rgba(224,222,210,0.75)', marginTop:12}}>Remplissez le formulaire et travaillons ensemble.</p>
              <div style={{marginTop:14}}><Link to="/contact" className="btn-outline-hero">Formulaire →</Link></div>
            </div>
          </div>

          {/* FAQ & subscribe (simplified for parity) */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:36}}>
            <div>
              <h3 style={{fontSize:28, margin:0}}>Questions Fréquentes</h3>
              <p style={{color:'rgba(224,222,210,0.6)'}}>Abonnez-vous à notre newsletter</p>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <input placeholder="votre.email@example.com" style={{flex:1, padding:'12px 14px', borderRadius:999, border:'1px solid rgba(46,163,221,0.06)', background:'transparent', color:'#e7e3dc'}} />
                <button className="btn-hero">Envoyer</button>
              </div>
            </div>
            <div>
              <div style={{display:'grid', gap:12}}>
                <div style={{padding:12, borderRadius:10, border:'1px solid rgba(46,163,221,0.04)', background:'rgba(16,18,24,0.85)'}}>Qu'est-ce que ENSI Junior Entreprise ?</div>
                <div style={{padding:12, borderRadius:10, border:'1px solid rgba(46,163,221,0.04)', background:'rgba(16,18,24,0.85)'}}>Où trouver les articles ?</div>
                <div style={{padding:12, borderRadius:10, border:'1px solid rgba(46,163,221,0.04)', background:'rgba(16,18,24,0.85)'}}>Que sont les magazines ?</div>
                <div style={{padding:12, borderRadius:10, border:'1px solid rgba(46,163,221,0.04)', background:'rgba(16,18,24,0.85)'}}>Quel est le prochain événement ?</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}