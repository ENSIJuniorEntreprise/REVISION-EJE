import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import SectionHeading from './SectionHeading'
import { sectionLinks, services } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function ServicesPreview() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="services" className="scroll-mt-32 bg-eje-dark py-24">
      <SectionHeading
        eyebrow="Our services"
        title={
          <>
            Comprehensive <span className="text-eje-accent">digital expertise</span>
          </>
        }
        subtitle="From scoping to deployment, EJE delivers web, mobile, desktop, and AI solutions with high professional standards."
        links={sectionLinks.services}
      />

      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div key={service.id} {...getRevealProps(0.12 + index * 0.1, reducedMotion)}>
            <TiltCard className="group flex h-full flex-col">
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[10px] bg-eje-accent/10 text-eje-accent transition-all group-hover:bg-eje-accent group-hover:text-white">
                <service.icon className="h-4 w-4" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-eje-beige/70">{service.copy}</p>
              <a href={service.href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-eje-accent transition-opacity hover:opacity-85">
                Learn more
                <ChevronRight className="h-4 w-4" />
              </a>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}