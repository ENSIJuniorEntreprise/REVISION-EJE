import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function CtaSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="actualites" className="scroll-mt-32 bg-eje-dark py-24">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div className="card-glass flex h-full flex-col items-center p-10 text-center" {...getRevealProps(0.04, reducedMotion)}>
          <div className="mb-8 flex min-h-[160px] w-full flex-col items-center justify-center">
            <h2 className="mb-4 text-4xl font-bold">
              Pret a lancer votre prochain <span className="text-eje-accent">projet digital</span> ?
            </h2>
            <p className="max-w-md text-eje-beige/70">
              Partagez votre vision: EJE construit une feuille de route claire et une execution solide.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary mt-auto gap-2 px-8">
            Demander un devis
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div className="card-glass flex h-full flex-col items-center p-10 text-center" {...getRevealProps(0.14, reducedMotion)}>
          <div className="mb-8 flex min-h-[160px] w-full flex-col items-center justify-center">
            <h2 className="mb-4 text-4xl font-bold text-eje-beige">Actualites EJE</h2>
            <p className="max-w-md text-eje-beige/70">Suivez nos projets, evenements et annonces pour rester connecte a la vie de la Junior.</p>
          </div>
          <Link to="/actualites" className="btn btn-outline mt-auto gap-2 px-8">
            Voir les actualites
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
