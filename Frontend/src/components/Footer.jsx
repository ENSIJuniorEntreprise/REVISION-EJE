import { Link } from 'react-router-dom'
import { Briefcase, Globe, Mail, MapPin, MessageCircle, Newspaper, Phone } from 'lucide-react'
import { media } from '../assets/media'

export default function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/a-propos' },
    { label: 'Services', to: '/services' },
    { label: 'News', to: '/actualites' },
    { label: 'Contact', to: '/contact' },
  ]

  const socials = [
    { label: 'Website', icon: Globe, href: '#' },
    { label: 'News', icon: Newspaper, to: '/actualites' },
    { label: 'Projects', icon: Briefcase, to: '/services' },
    { label: 'Chat', icon: MessageCircle, to: '/contact' },
  ]

  return (
    <footer className="border-t border-eje-beige/10 bg-eje-dark pb-10 pt-20">
      <div className="container mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={media.logos.primary}
              alt="Logo ENSI Junior Entreprise"
              className="h-12 w-auto"
            />
            <span className="font-heading text-lg font-bold">ENSI Junior Entreprise</span>
          </Link>

          <p className="max-w-xs text-sm leading-relaxed text-eje-beige/70">
            EJE connects companies with ENSI talent to deliver useful, high-performing, and sustainable digital
            projects.
          </p>

          <p className="text-sm font-semibold text-eje-accent">Founded in 2006</p>
        </div>

        <div>
          <h4 className="mb-6 font-heading font-bold text-eje-accent">Quick links</h4>
          <ul className="list-none space-y-3 p-0 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-eje-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={media.documents.statuts} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-eje-accent">
                Bylaws
              </a>
            </li>
            <li>
              <a href={media.documents.politiqueRse} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-eje-accent">
                CSR policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-heading font-bold text-eje-accent">Contact</h4>
          <ul className="list-none space-y-4 p-0 text-sm">
            <li className="flex items-center gap-3 text-eje-beige/80">
              <Mail className="h-4 w-4 text-eje-accent" />
              contact@ensi-je.com
            </li>
            <li className="flex items-center gap-3 text-eje-beige/80">
              <Phone className="h-4 w-4 text-eje-accent" />
              +216 XX XXX XXX
            </li>
            <li className="flex items-center gap-3 text-eje-beige/80">
              <MapPin className="h-4 w-4 text-eje-accent" />
              ENSI, Manouba, Tunisia
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="mb-6 font-heading font-bold text-eje-accent">Social</h4>
          <p className="text-sm text-eje-beige/70">Follow EJE and stay connected to our projects and events.</p>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-eje-beige/5 transition-all hover:bg-eje-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ) : (
                <Link
                  key={social.label}
                  to={social.to}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-eje-beige/5 transition-all hover:bg-eje-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              )
            ))}
          </div>

          <form className="flex gap-2" onSubmit={(event) => event.preventDefault()} aria-label="Newsletter signup">
            <label htmlFor="newsletter-footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-footer-email"
              name="newsletterFooterEmail"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 rounded-[10px] border border-eje-beige/25 bg-eje-dark/80 px-4 py-2 text-sm placeholder:text-eje-beige/45 focus:border-eje-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark"
            />
            <button type="submit" className="btn btn-primary px-4 py-2 text-sm">OK</button>
          </form>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-between gap-4 border-t border-eje-beige/10 pt-8 text-xs text-eje-beige/70 md:flex-row">
        <p>© {new Date().getFullYear()} ENSI Junior Entreprise. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href={media.documents.statuts}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-eje-accent"
          >
            Bylaws
          </a>
          <a
            href={media.documents.politiqueRse}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-eje-accent"
          >
            CSR policy
          </a>
        </div>
      </div>
    </footer>
  )
}