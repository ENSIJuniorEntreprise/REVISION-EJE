import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { sectionLinks, stats } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function WhyEjeSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden bg-eje-dark py-24">
      <div className="milestone-background" aria-hidden="true" />
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Pourquoi EJE"
          title={
            <>
              Pourquoi choisir <span className="text-eje-accent">ENSI Junior Entreprise</span> ?
            </>
          }
          subtitle="Une équipe engagée, un pilotage clair et des résultats mesurables à chaque étape."
          links={sectionLinks.reasons}
        />

        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="card-glass group p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-eje-accent/60 hover:shadow-[0_10px_20px_rgba(46,163,221,0.15)]"
              {...getRevealProps(0.14 + index * 0.08, reducedMotion)}
            >
              <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-eje-beige/10 transition-all group-hover:bg-eje-accent group-hover:text-white">
                <stat.icon className="h-4 w-4" />
              </div>
              <p className="mb-2 text-4xl font-bold">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-eje-beige/75">{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
