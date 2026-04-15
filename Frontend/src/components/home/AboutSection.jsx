import { motion } from 'framer-motion'
import ImageWithFallback from '../ImageWithFallback'
import SectionHeading from './SectionHeading'
import { media } from '../../assets/media'
import { pillars, sectionLinks } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function AboutSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="about" className="scroll-mt-32 bg-eje-dark py-24">
      <SectionHeading
        eyebrow="Qui sommes-nous"
        title={
          <>
            ENSI Junior Entreprise transforme les <span className="text-eje-accent">idées ambitieuses</span> en solutions concrètes.
          </>
        }
        subtitle="Fondée en 2006, EJE est une association à but non lucratif affiliée à l'ENSI. Notre mission : préparer les talents aux standards du monde professionnel tout en créant de la valeur pour nos partenaires."
        links={sectionLinks.about}
      />

      <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
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

          <div className="card-glass absolute -bottom-6 -right-6 hidden max-w-xs p-4 md:block">
            <div className="image-frame mb-3 h-28 w-full border-0">
              <ImageWithFallback
                src={media.images.aboutSecondary}
                alt="Projet ENSI Junior Entreprise"
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover"
                fallbackLabel="Projet EJE"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-bold text-eje-beige">10+</p>
                <p className="text-xs uppercase tracking-wider text-eje-beige/70">Ans d'expérience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-eje-beige">150+</p>
                <p className="text-xs uppercase tracking-wider text-eje-beige/70">Projets livrés</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className="card-glass group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-eje-accent/60 hover:shadow-[0_10px_20px_rgba(46,163,221,0.15)]"
              {...getRevealProps(0.14 + index * 0.08, reducedMotion)}
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-eje-accent/10 transition-all group-hover:bg-eje-accent group-hover:text-white">
                <pillar.icon className="h-4 w-4" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-eje-beige/65">{pillar.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
