import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { media } from '../assets/media'
import Newsletter from '../components/kit/Newsletter'
import PageHero, { Rise } from '../components/PageHero'
import Seo from '../components/Seo'
import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'
import useApiData from '../hooks/useApiData'
import { resolveMediaUrl } from '../config/api'

const HOME_CONTENT_FALLBACK = {
  heroSince: 'Since 2006',
  heroTitle: 'Driving Innovation. Creating Impact.',
  heroSubtitle: 'Innovation. Excellence. Creativity.',
  whoWeAreTitle: 'Digital solutions that inspire.',
  whoWeAreText:
    "At EJE, we don't just build software — we craft experiences. Our team of student developers and designers works at the intersection of creativity and technical excellence to deliver projects that make a real difference for the businesses we partner with.",
  yearsOfExperience: 20,
  projectsCompletedLabel: 'Projects Completed',
  ctaTitle: 'Ready to build your next masterpiece?',
  ctaText: "We can't wait to hear about your vision. Reach out and let's start the conversation.",
}

const STATS_FALLBACK = {
  clientsServed: 75,
  projectsCompleted: 78,
  studentsMembers: 48,
  formerCollaborators: 35,
  juniorEnterprisesCount: 7,
  institutionalPartnersCount: 9,
}

function FigureStat({ value, label }) {
  const [ref, count] = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-extrabold text-eje-accent sm:text-5xl">{count}</div>
      <div className="mt-2 font-body text-xs uppercase tracking-wide text-eje-beige/60">{label}</div>
    </div>
  )
}

export default function Accueil() {
  const whoWeAreRef = useReveal()
  const valuesRef = useReveal()
  const servicesRef = useReveal()
  const figuresRef = useReveal()
  const ctaRef = useReveal()

  const { data: home } = useApiData('/home-content', HOME_CONTENT_FALLBACK)
  const { data: stats } = useApiData('/stats', STATS_FALLBACK)
  const { data: principles } = useApiData('/principles', [], { list: true })
  const { data: serviceCategories } = useApiData('/service-categories', [], { list: true })
  const { data: partners } = useApiData('/partners', [], { list: true })

  const figures = [
    { value: stats.clientsServed, prefix: '+', label: 'Clients Served' },
    { value: stats.projectsCompleted, prefix: '+', label: 'Projects Completed' },
    { value: stats.studentsMembers, prefix: '+', label: 'Students & Members' },
    { value: stats.formerCollaborators, prefix: '+', label: 'Former Collaborators' },
    { value: stats.juniorEnterprisesCount, prefix: '', label: 'Junior Enterprises' },
    { value: stats.institutionalPartnersCount, prefix: '', label: 'Institutional Partners' },
  ]

  return (
    <>
      <Seo
        title="Home"
        description="ENSI Junior Entreprise is a student-run digital consulting association delivering web, mobile, desktop, and AI/chatbot projects since 2006."
        path="/"
      />
      <style>{`
        .partners-wrap{ overflow:hidden; margin-top:14px }
        .partners-track{ display:flex; gap:28px; align-items:center; white-space:nowrap; animation:scroll-left 24s linear infinite }
        .partners-wrap:hover .partners-track{ animation-play-state:paused }
        .partner-item{ display:inline-flex; align-items:center; justify-content:center; padding:6px 12px }
        @keyframes scroll-left{ 0%{ transform:translateX(0) } 100%{ transform:translateX(-50%) } }
      `}</style>

      {/* ── HERO ── */}
      <PageHero image={media.images.hero} imageAlt="ENSI Junior Entreprise" scrollTo="#who-we-are">
        <Rise as="p" delay={0.4} className="eyebrow">{home.heroSince}</Rise>
        <Rise
          as="h1"
          delay={0.6}
          className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-eje-beige sm:text-7xl lg:text-[6.5rem] lg:leading-[1.04]"
        >
          {home.heroTitle}
        </Rise>
        <Rise
          as="p"
          delay={0.9}
          className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-eje-beige/65 sm:text-lg lg:text-xl"
        >
          {home.heroSubtitle}
        </Rise>
        <Rise delay={1.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn btn-primary">
            Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a href="#who-we-are" className="btn btn-outline">Discover</a>
        </Rise>
      </PageHero>

      {/* ── WHO WE ARE ── */}
      <section id="who-we-are" ref={whoWeAreRef} className="reveal section-shell px-6 py-24 sm:px-12 lg:px-32">
        <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow !justify-start">Who we are</p>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-eje-beige sm:text-5xl">
              {home.whoWeAreTitle}
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-eje-beige/75">
              {home.whoWeAreText}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="stat-card transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]">
                <div className="font-heading text-2xl font-extrabold text-eje-accent">{home.yearsOfExperience}+</div>
                <div className="mt-1 font-body text-xs uppercase tracking-wide text-eje-beige/60">Years of Experience</div>
              </div>
              <div className="stat-card transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]">
                <div className="font-heading text-2xl font-extrabold text-eje-accent">+{stats.projectsCompleted}</div>
                <div className="mt-1 font-body text-xs uppercase tracking-wide text-eje-beige/60">{home.projectsCompletedLabel}</div>
              </div>
            </div>
            <Link to="/a-propos" className="section-link-pill mt-8">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="image-frame group transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]">
            <img
              src={media.images.aboutPrimary}
              alt="EJE team at work"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="reveal border-t border-eje-beige/10 px-6 py-24 sm:px-12 lg:px-32">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What drives us</p>
            <h2 className="section-title">Built on four principles</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ _id, name, description, iconUrl }) => (
              <div
                key={_id}
                className="card-glass p-8 text-center transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-eje-accent/10">
                  {iconUrl && <img src={resolveMediaUrl(iconUrl)} alt="" className="h-6 w-6 object-contain" />}
                </div>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-eje-beige">{name}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-eje-beige/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section ref={servicesRef} className="reveal border-t border-eje-beige/10 bg-eje-dark/60 px-6 py-24 sm:px-12 lg:px-32">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What we build</p>
            <h2 className="section-title">A complete technical stack</h2>
            <p className="section-subtitle">
              From first discovery call to final deployment, we cover the full spectrum of modern
              digital development.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map(({ _id, name, shortDescription, iconUrl }) => (
              <div
                key={_id}
                className="card-glass p-8 transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eje-accent/10">
                  {iconUrl && <img src={resolveMediaUrl(iconUrl)} alt="" className="h-6 w-6 object-contain" />}
                </div>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-eje-beige">{name}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-eje-beige/60">{shortDescription}</p>
              </div>
            ))}
          </div>
          <div className="section-links">
            <Link to="/services" className="section-link-pill">
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEY FIGURES ── */}
      <section ref={figuresRef} className="reveal border-t border-eje-beige/10 px-6 py-24 sm:px-12 lg:px-32">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why ENSI Junior Entreprise</p>
            <h2 className="section-title">Our impact at a glance</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {figures.map((f) => (
              <FigureStat key={f.label} {...f} />
            ))}
          </div>

          <div className="mt-24 text-center">
            <h3 className="section-title text-eje-accent">Our Partners</h3>
            <p className="section-subtitle mb-2">Trusted by those who believed in us</p>
            <div className="partners-wrap">
              <div className="partners-track">
                {partners.length > 0 &&
                  [...partners.slice(0, 8), ...partners.slice(0, 8)].map((p, idx) => (
                    <div key={p._id + idx} className="partner-item">
                      <img src={resolveMediaUrl(p.logoUrl)} alt={p.name} style={{ height: 56, objectFit: 'contain', display: 'block' }} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="reveal border-t border-eje-beige/10 bg-eje-dark/60 px-6 py-24 sm:px-12 lg:px-32">
        <div className="container grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card-glass p-10 transition duration-300 hover:-translate-y-1 hover:border-eje-accent/40">
            <h3 className="font-heading text-2xl font-extrabold leading-tight text-eje-beige sm:text-3xl">
              {home.ctaTitle}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-eje-beige/70">
              {home.ctaText}
            </p>
            <Link to="/contact" className="btn btn-primary mt-6">
              Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="card-glass p-10 transition duration-300 hover:-translate-y-1 hover:border-eje-accent/40">
            <h3 className="font-heading text-2xl font-extrabold leading-tight text-eje-beige sm:text-3xl">
              Contact <span className="text-eje-accent">Us</span>
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-eje-beige/70">
              Fill out the form and tell us about your project — we'll get back to you shortly.
            </p>
            <Link to="/contact" className="btn btn-outline mt-6">
              Contact Form <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
