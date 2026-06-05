import { motion } from 'framer-motion'
import ImageWithFallback from '../ImageWithFallback'
import TiltCard from '../ui/TiltCard'
import SectionHeading from './SectionHeading'
import { media } from '../../assets/media'
import { milestones, pillars, sectionLinks } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function AboutSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="about" className="scroll-mt-32 bg-eje-dark py-24">
      <SectionHeading
        eyebrow="About us"
        title={
          <>
            ENSI Junior Entreprise, the <span className="text-eje-accent">digital partner</span> for your ambitions.
          </>
        }
        subtitle="A student association based at ENSI in Tunisia, EJE supports startups, NGOs, and SMEs with reliable, accessible, and useful digital solutions."
        links={sectionLinks.about}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div className="relative" {...getRevealProps(0.08, reducedMotion)}>
          <div className="image-frame aspect-[4/3] w-full">
            <ImageWithFallback
              src={media.images.aboutPrimary}
              alt="EJE team"
              wrapperClassName="h-full w-full"
              className="h-full w-full rounded-[10px] object-cover"
              fallbackLabel="EJE team"
            />
          </div>

          <div className="absolute bottom-4 right-4 z-10 max-w-[240px] rounded-[10px] border border-eje-beige/20 bg-white/10 p-4 backdrop-blur-md sm:-bottom-6 sm:-right-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-eje-accent">Since 2008</p>
            <p className="text-sm text-eje-beige/80">EJE connects academic excellence with real-world execution.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className={`h-full ${index === 0 ? 'sm:col-span-2' : ''}`}
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
