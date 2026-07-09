import { media } from '../assets/media'

export default function APropos() {
  return (
    <>
      <section className="section-shell" style={{ backgroundImage: `url(${media.images.aboutPrimary})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div className="page-curtain animate-veil" style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, rgba(31,33,45,0.6), rgba(31,33,45,0.6))' }} />
          <div className="container" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
            <h1 className="section-title animate-hero-zoom">À propos de <span style={{ color: 'var(--eje-accent)' }}>ENSI Junior Entreprise</span></h1>
            <p className="animate-rise" style={{ maxWidth: 800, margin: '0.8rem auto' }}>Créativité — Professionnalisme — Excellence</p>
            <a href="#qui" className="btn btn-outline">Découvrir</a>
          </div>
        </div>
      </section>

      <section id="qui" className="section-shell" style={{ padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h2 className="section-title">Qui sommes-nous?</h2>
            <p>Fondée en 2006, l'ENSI Junior Entreprise (EJE) est une association à but non lucratif visant l'initiation des étudiants à la vie entrepreneuriale. Pendant 20 ans, nous nous sommes consacrés à l'excellence et l'innovation.</p>
          </div>
          <div style={{ width: 320 }}>
            <img src={media.images.aboutSecondary} alt="Equipe EJE" style={{ width: '100%', borderRadius: 8 }} />
          </div>
        </div>

        <div className="container" style={{ marginTop: '2rem' }}>
          <h3>Nos valeurs</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div className="card-glass p-6">Créativité</div>
            <div className="card-glass p-6">Professionnalisme</div>
            <div className="card-glass p-6">Excellence</div>
          </div>
        </div>
      </section>
    </>
  )
}
