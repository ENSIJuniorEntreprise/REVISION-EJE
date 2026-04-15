import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { sectionLinks, services } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function ServicesSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-eje-dark py-24">
      <SectionHeading
        eyebrow="Nos Services"
        title={
          <>
            Une expertise tech <span className="text-eje-accent">complète</span> pour vos projets.
          </>
        }
        subtitle="De l'idée au déploiement, EJE livre vite, proprement et avec des standards professionnels élevés."
        links={sectionLinks.services}
      />

      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.article
            key={service.id}
            className="group flex flex-col rounded-[10px] border border-eje-beige/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-eje-accent/60 hover:shadow-[0_10px_20px_rgba(46,163,221,0.15)]"
            {...getRevealProps(0.12 + index * 0.1, reducedMotion)}
          >
            <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[10px] bg-eje-accent/10 text-eje-accent transition-all group-hover:bg-eje-accent group-hover:text-white">
              <service.icon className="h-4 w-4" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-eje-beige/70">{service.copy}</p>
            <a href={service.href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-eje-accent transition-opacity hover:opacity-85">
              En savoir plus
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
