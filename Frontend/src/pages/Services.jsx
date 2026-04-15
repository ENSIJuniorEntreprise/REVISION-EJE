export default function Services() {
  const serviceBlocks = [
    {
      id: 'web',
      title: 'Développement Web',
      copy: 'Conception de plateformes web performantes, maintenables et orientées conversion.',
    },
    {
      id: 'mobile',
      title: 'Solutions Mobiles',
      copy: 'Applications mobiles iOS et Android pensées pour la fluidité et la fiabilité.',
    },
    {
      id: 'desktop',
      title: 'Développement Desktop',
      copy: 'Applications desktop robustes pour automatiser vos flux métier essentiels.',
    },
    {
      id: 'chatbot',
      title: 'Développement Chatbots',
      copy: 'Assistants conversationnels et workflows IA pour accélérer support et acquisition.',
    },
  ]

  return (
    <section className="page-placeholder bg-eje-dark pb-24">
      <div className="container section-heading">
        <p className="eyebrow">Services EJE</p>
        <h1 className="section-title">
          Des expertises ciblées pour des <span className="text-eje-accent">résultats mesurables</span>.
        </h1>
        <p className="section-subtitle">Chaque bloc ci-dessous correspond aux ancres utilisées depuis la page Accueil.</p>
      </div>

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        {serviceBlocks.map((service) => (
          <article key={service.id} id={service.id} className="card-glass scroll-mt-32 p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-eje-accent">#{service.id}</p>
            <h2 className="mb-3 text-2xl font-bold">{service.title}</h2>
            <p className="text-eje-beige/70">{service.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}