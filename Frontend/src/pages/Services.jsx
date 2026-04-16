import { optionalAddOns, services } from '../components/home/homeData'

export default function Services() {
  return (
    <section className="page-placeholder bg-eje-dark pb-24">
      <div className="container section-heading">
        <p className="eyebrow">Nos services</p>
        <h1 className="section-title">
          Une offre logicielle <span className="text-eje-accent">de bout en bout</span>
        </h1>
        <p className="section-subtitle">Services principaux et options complementaires pour accelerer vos projets et securiser leur execution.</p>
      </div>

      <div className="container grid grid-cols-1 gap-6 lg:grid-cols-4">
        {services.map((service) => (
          <article key={service.id} id={service.id} className="card-glass scroll-mt-32 p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-eje-accent">Service principal</p>
            <h2 className="mb-3 text-2xl font-bold">{service.title}</h2>
            <p className="text-eje-beige/70">{service.copy}</p>
          </article>
        ))}
      </div>

      <div className="container mt-8">
        <article className="card-glass p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-eje-accent">Options complementaires</p>
          <h2 className="mb-6 text-3xl font-bold">Capacites additionnelles</h2>

          <ul className="grid grid-cols-1 gap-4 text-eje-beige/85 md:grid-cols-2 lg:grid-cols-3">
            {optionalAddOns.map((addOn) => (
              <li key={addOn} className="rounded-[10px] border border-eje-beige/10 bg-eje-dark/55 p-4 text-lg">
                • {addOn}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}