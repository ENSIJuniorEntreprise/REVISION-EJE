import { Link } from 'react-router-dom'
import { media } from '../assets/media'

export default function Accueil() {
  return (
    <>
      {/* Hero */}
      <section className="section-shell" style={{ backgroundImage: `url(${media.images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div className="page-curtain animate-veil" style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, rgba(31,33,45,0.6), rgba(31,33,45,0.6))' }} />
          <div className="container" style={{ padding: '0 1.25rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h1 className="section-title animate-hero-zoom" style={{ color: 'white', marginBottom: '0.5rem' }}>
              L'excellence <span style={{ color: 'var(--eje-accent)' }}>au service de</span> vos ambitions.
            </h1>
            <p className="animate-rise" style={{ color: 'rgba(224,222,210,0.9)', marginBottom: '1.6rem' }}>Innovation. Excellence. Créativité.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary animate-hero-zoom">Demander un devis →</Link>
              <a href="#services" className="btn btn-outline">Découvrir</a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Features */}
      <section id="services" className="section-shell" style={{ padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h2 className="section-title">Des Solutions Numériques qui <span style={{ color: 'var(--eje-accent)' }}>Inspirent.</span></h2>
            <p style={{ color: 'rgba(224,222,210,0.8)', maxWidth: 560 }}>Chez EJE, nous ne nous contentons pas de créer des logiciels ; nous concevons des expériences. Notre équipe d'experts livre des produits qui redéfinissent les industries.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.6rem' }}>
              <div className="card-glass" style={{ padding: '1rem' }}>10+<div>ANS D'EXPERIENCE</div></div>
              <div className="card-glass" style={{ padding: '1rem' }}>150+<div>PROJETS LIVRÉS</div></div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="card-glass p-6">Créativité<br/><small>Des solutions innovantes.</small></div>
            <div className="card-glass p-6">Fiabilité<br/><small>Systèmes sécurisés et évolutifs.</small></div>
            <div className="card-glass p-6">Précision<br/><small>Stratégies alignées avec vos objectifs.</small></div>
            <div className="card-glass p-6">Collaboration<br/><small>Vos partenaires de croissance.</small></div>
          </div>
        </div>
      </section>

      {/* Stack / Services */}
      <section className="section-shell" style={{ padding: '4rem 0', background: 'transparent' }}>
        <div className="container">
          <h2 className="section-title">Un Stack Technique Complet.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            <div className="card-glass p-6">Développement Web</div>
            <div className="card-glass p-6">Solutions Mobiles</div>
            <div className="card-glass p-6">Développement Desktop</div>
          </div>
        </div>
      </section>
    </>
  )
}