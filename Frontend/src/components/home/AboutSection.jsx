import { motion } from 'framer-motion'
import ImageWithFallback from '../ImageWithFallback'
import TiltCard from '../ui/TiltCard'
import SectionHeading from './SectionHeading'
import { media } from '../../assets/media'
import { milestones, pillars, sectionLinks } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

const trianglePositions = ['lg:col-start-2', 'lg:col-start-1 lg:-mt-8', 'lg:col-start-3 lg:-mt-8']

export default function AboutSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="about" className="scroll-mt-32 bg-eje-dark py-24">
      <SectionHeading
        eyebrow="A propos de nous"
        title={
          <>
            ENSI Junior Entreprise, <span className="text-eje-accent">partenaire digital</span> de vos ambitions.
          </>
        }
        subtitle="Association etudiante basee a l'ENSI en Tunisie, EJE accompagne startups, ONG et PME avec des solutions digitales fiables, accessibles et utiles."
        links={sectionLinks.about}
      />

      <div className="container grid grid-cols-1 items-start gap-16 lg:grid-cols-[1.05fr_1fr]">
        <motion.div className="relative" {...getRevealProps(0.08, reducedMotion)}>
          <div className="image-frame aspect-[4/3]">
            <ImageWithFallback
              src={media.images.aboutPrimary}
              alt="Équipe EJE"
              wrapperClassName="h-full w-full"
              className="h-full w-full object-cover"
              fallbackLabel="Équipe EJE"
            />
          </div>

          <div className="card-glass absolute -bottom-6 left-6 hidden max-w-xs p-4 md:block">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-eje-accent">Depuis 2006</p>
            <p className="text-sm text-eje-beige/80">EJE connecte excellence academique et execution terrain.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className={`h-full ${trianglePositions[index] ?? ''}`}
              {...getRevealProps(0.14 + index * 0.08, reducedMotion)}
            >
              <TiltCard
                as="article"
                className="card-glass group h-full p-6 transition-all duration-300 hover:border-eje-accent/60 hover:shadow-[0_10px_20px_rgba(46,163,221,0.15)]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-eje-accent/10 transition-all group-hover:bg-eje-accent group-hover:text-white">
                  <pillar.icon className="h-4 w-4" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-eje-beige/65">{pillar.copy}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="container mt-14 grid grid-cols-1 gap-4 md:grid-cols-3" {...getRevealProps(0.24, reducedMotion)}>
        {milestones.map((milestone) => (
          <article key={milestone.year} className="card-glass rounded-[10px] border border-eje-accent/30 bg-eje-dark/70 p-5">
            <p className="mb-2 text-xl font-bold text-eje-accent">{milestone.year}</p>
            <p className="text-sm leading-relaxed text-eje-beige/85">{milestone.title}</p>
          </article>
        ))}
      </motion.div>
    </section>
  )
}
