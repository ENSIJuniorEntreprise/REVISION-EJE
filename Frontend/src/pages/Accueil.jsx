import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe,
  MessageSquare,
  Monitor,
  Smartphone,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { media } from '../assets/media'

const services = [
  {
    title: 'Développement Web',
    icon: Globe,
    copy: "Applications web sur mesure construites pour la vitesse et l'évolutivité.",
  },
  {
    title: 'Solutions Mobiles',
    icon: Smartphone,
    copy: 'Expériences fluides sur iOS et Android pensées pour une adoption rapide.',
  },
  {
    title: 'Développement Desktop',
    icon: Monitor,
    copy: 'Applications desktop robustes pour moderniser vos opérations internes.',
  },
  {
    title: 'Développement Chatbots',
    icon: MessageSquare,
    copy: 'Automatisation intelligente, assistants IA et FAQ dynamiques.',
  },
]

const pillars = [
  {
    title: 'Créativité',
    icon: Star,
    copy: 'Des solutions innovantes qui dépassent les approches conventionnelles.',
  },
  {
    title: 'Fiabilité',
    icon: CheckCircle2,
    copy: 'Des systèmes sécurisés et évolutifs qui tiennent la charge dans le temps.',
  },
  {
    title: 'Précision',
    icon: TrendingUp,
    copy: "Des plans d'exécution alignés sur vos objectifs produits et business.",
  },
  {
    title: 'Collaboration',
    icon: Users,
    copy: 'Une équipe qui opère comme une extension de vos talents internes.',
  },
]

const stats = [
  { label: 'Satisfaction Client', value: '99%', icon: Star },
  { label: 'Partenaires Renommés', value: '23+', icon: Users },
  { label: 'Croissance Moyenne', value: '45%', icon: TrendingUp },
  { label: "Prix d'Excellence", value: '3+', icon: Award },
]

const faqs = [
  {
    q: "Qu'est-ce que l'ENSI Junior Entreprise ?",
    a: "L'ENSI Junior Entreprise est une association étudiante qui opère comme une agence digitale.",
  },
  {
    q: 'Où trouver les articles ?',
    a: 'Vous pouvez retrouver nos publications dans la section Actualités du site.',
  },
  {
    q: 'Que sont les magazines ?',
    a: 'Nous publions régulièrement des magazines techniques et associatifs sur nos activités.',
  },
  {
    q: 'Quel est le prochain événement ?',
    a: 'Consultez notre calendrier dans la section Actualités pour les prochains rendez-vous.',
  },
  {
    q: 'Comment nous contacter ?',
    a: 'Via le formulaire de contact ou directement à contact@ensi-je.com.',
  },
  {
    q: "Pourquoi s'abonner ?",
    a: 'Pour suivre nos projets, événements et opportunités de collaboration.',
  },
]

const PARTNERS_PER_SLIDE = 8

const chunkBy = (list, size) => {
  const chunks = []

  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size))
  }

  return chunks
}

export default function Accueil() {
  const partnerSlides = useMemo(() => chunkBy(media.partners, PARTNERS_PER_SLIDE), [])
  const [activeSlide, setActiveSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? partnerSlides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % partnerSlides.length)
  }

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(query.matches)

    update()

    if (query.addEventListener) {
      query.addEventListener('change', update)
      return () => query.removeEventListener('change', update)
    }

    query.addListener(update)
    return () => query.removeListener(update)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || partnerSlides.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(handleNext, 4000)
    return () => window.clearInterval(timer)
  }, [prefersReducedMotion, partnerSlides.length])

  const onTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX)
  }

  const onTouchEnd = (event) => {
    if (touchStartX === null) {
      return
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX

    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }

    setTouchStartX(null)
  }

  return (
    <div className="overflow-hidden">
      <section className="relative flex min-h-screen items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={media.images.hero}
            alt="Hero background"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary/80 to-bg-primary" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="mb-6 font-signature text-4xl text-accent md:text-6xl">Always Striving For Greatness</p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.1] md:text-7xl">
              L'excellence <br />
              <span className="-mt-4 mb-2 inline-block lowercase italic text-accent">au service de</span> <br />
              vos ambitions.
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-text-secondary/80 md:text-xl">
              Innovation. Excellence. Créativité. ENSI Junior Entreprise accompagne startups, PME et institutions
              dans la conception et le développement de solutions innovantes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary gap-2 text-lg">
                Demander un devis
                <ChevronRight className="h-5 w-5" />
              </Link>
              <a href="#about" className="btn btn-outline text-lg">
                Découvrir
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative bg-bg-primary py-24">
        <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-text-secondary/10">
              <img src={media.images.aboutPrimary} alt="Équipe EJE" className="h-full w-full object-cover" />
            </div>
            <div className="card-glass absolute -bottom-8 -right-8 hidden max-w-xs p-5 md:block">
              <img src={media.images.aboutSecondary} alt="Projet EJE" className="mb-4 h-32 w-full rounded-lg object-cover" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-3xl font-bold text-accent">10+</p>
                  <p className="text-xs uppercase tracking-wider text-text-secondary/70">Ans d'expérience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">150+</p>
                  <p className="text-xs uppercase tracking-wider text-text-secondary/70">Projets livrés</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">Qui sommes-nous</p>
            <h2 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
              Des solutions numériques qui <span className="text-accent">inspirent.</span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-text-secondary/70">
              Chez EJE, nous ne nous contentons pas de créer des logiciels. Notre équipe de développeurs et designers
              travaille à l'intersection de la créativité et de l'excellence technique pour livrer des produits qui
              transforment les usages.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="card-glass group p-6 transition-colors hover:border-accent/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-all group-hover:bg-accent group-hover:text-[#0d1a23]">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary/60">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171a27] py-24">
        <div className="container mb-16 text-center">
          <p className="eyebrow justify-center">Nos Services</p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Un stack technique <span className="text-accent">complet.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary/60">
            De la découverte initiale au déploiement final, nous couvrons les domaines numériques modernes de bout en
            bout.
          </p>
        </div>

        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="card-glass group p-8 transition-all duration-500 hover:bg-accent/5">
              <service.icon className="mb-6 h-10 w-10 text-accent transition-transform group-hover:scale-110" />
              <h3 className="mb-4 text-xl font-bold">{service.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-text-secondary/60">{service.copy}</p>
              <Link to="/services" className="flex items-center gap-2 text-xs font-bold text-accent hover:underline">
                VOIR PLUS <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-primary py-24">
        <div className="container mb-20 text-center">
          <p className="eyebrow justify-center">Nos Actualités</p>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Pourquoi <span className="text-accent">ENSI Junior Entreprise ?</span>
          </h2>
          <p className="text-text-secondary/60">Raisons pour lesquelles vous allez travailler avec nous</p>
        </div>

        <div className="container mb-24 grid grid-cols-2 gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-text-secondary/5 transition-all group-hover:bg-accent group-hover:text-[#0d1a23]">
                <stat.icon className="h-8 w-8" />
              </div>
              <p className="mb-2 text-4xl font-bold">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary/50">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Nos <span className="text-accent">partenaires</span>
            </h2>
            <p className="text-text-secondary/60">Ceux qui nous font confiance</p>
          </div>

          <div className="relative" role="region" aria-label="Carrousel des logos partenaires">
            <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div
                className="flex transition-transform duration-500 ease-standard"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {partnerSlides.map((slide, slideIndex) => (
                  <div key={`slide-${slideIndex}`} className="grid w-full shrink-0 grid-cols-2 place-items-center gap-6 px-1 sm:grid-cols-3 md:grid-cols-4">
                    {slide.map((logo) => (
                      <img
                        key={logo.src}
                        src={logo.src}
                        alt={`Logo partenaire ${logo.name}`}
                        className="h-12 w-auto max-w-[140px] object-contain opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {partnerSlides.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button type="button" className="carousel-button" onClick={handlePrev} aria-label="Précédent">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/60" aria-live="polite">
                  {activeSlide + 1} / {partnerSlides.length}
                </p>
                <button type="button" className="carousel-button" onClick={handleNext} aria-label="Suivant">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#171a27] py-24">
        <div className="container mb-24 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-accent/30 bg-accent/5 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Prêt à créer votre prochain <span className="text-accent">chef-d'œuvre ?</span>
            </h2>
            <p className="mb-8 max-w-md text-text-secondary/70">
              Nous sommes impatients de découvrir votre vision. Contactez-nous directement.
            </p>
            <Link to="/contact" className="btn btn-primary gap-2 px-8">
              Demander un devis
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl border border-text-secondary/10 bg-text-secondary/5 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-accent">Contactez-nous</h2>
            <p className="mb-8 max-w-md text-text-secondary/70">Remplissez le formulaire et travaillons ensemble.</p>
            <Link to="/contact" className="btn btn-outline gap-2 border-accent/50 px-8 text-accent">
              Formulaire
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="container grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-bold">Questions fréquentes</h2>
            <p className="mb-8 text-text-secondary/60">Abonnez-vous à notre newsletter</p>
            <form className="flex max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="votre.email@example.com"
                className="flex-1 rounded-[10px] border border-text-secondary/10 bg-text-secondary/5 px-6 py-3 focus:border-accent focus:outline-none"
              />
              <button type="submit" className="btn btn-primary px-8">
                Envoyer
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="card-glass overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-bold">
                  {faq.q}
                  <span className="text-accent">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-text-secondary/60">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}