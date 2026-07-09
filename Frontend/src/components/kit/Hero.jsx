
import { ChevronDown, ArrowDown } from 'lucide-react'
import heroImg from '../../assets/hero-newsroom.png'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="page-curtain" aria-hidden="true" />

      <img
        src={heroImg}
        alt="L'Actu' ENSI Junior Entreprise newsroom"
        className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
      />
      <div className="absolute inset-0 bg-eje-dark animate-veil" />
      <div className="absolute inset-0 bg-gradient-to-b from-eje-dark/40 via-transparent to-eje-dark" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1
          className="animate-rise font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-eje-beige sm:text-7xl lg:text-[7rem] lg:leading-[1.04]"
          style={{ animationDelay: '0.9s' }}
        >
          Discover ENSI <span className="text-eje-accent"><br></br>Junior Entreprise</span>
        </h1>

        <p
          className="animate-rise mt-6 max-w-xl font-body text-base font-light leading-relaxed text-eje-beige/65 sm:text-lg lg:text-xl"
          style={{ animationDelay: '1.25s' }}
        >
          Dive into the latest news and highlights of our association.
        </p>

        <a
          href="#stats"
          className="animate-rise mt-10 inline-flex items-center gap-2 rounded-full bg-eje-accent px-8 py-3.5 font-body text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgb(46_163_221/0.6)] transition hover:scale-[1.02] hover:shadow-[0_15px_50px_-10px_rgb(46_163_221/0.8)]"
          style={{ animationDelay: '1.55s' }}
        >
          View more
          <ArrowDown className="h-5 w-5" />
        </a>

        <a
          href="#stats"
          aria-label="Scroll down"
          className="animate-rise absolute bottom-10 left-1/2 -translate-x-1/2 text-eje-beige/35 transition hover:text-eje-beige/70"
          style={{ animationDelay: '1.85s' }}
        >
          <ChevronDown className="h-7 w-7 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
