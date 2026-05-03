import { Link } from 'react-router-dom'
import { Briefcase, Globe, Mail, MapPin, MessageCircle, Newspaper, Phone } from 'lucide-react'
import { media } from '../assets/media'

export default function Footer() {
  return (
    <footer className="border-t border-text-secondary/10 bg-bg-primary pb-10 pt-20">
      <div className="container mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={media.logos.primary}
              alt="Logo ENSI Junior Entreprise"
              className="h-12 w-auto"
            />
            <span className="font-heading text-lg font-bold">ENSI Junior Entreprise</span>
          </Link>

          <p className="max-w-xs text-sm leading-relaxed text-text-secondary/70">
            L association etudiante qui connecte les entreprises avec les talents de demain. Expertise, innovation et
            excellence technique.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Site web" className="flex h-10 w-10 items-center justify-center rounded-full bg-text-secondary/5 transition-all hover:bg-accent hover:text-[#0d1a23]">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Actualites" className="flex h-10 w-10 items-center justify-center rounded-full bg-text-secondary/5 transition-all hover:bg-accent hover:text-[#0d1a23]">
              <Newspaper className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Projets" className="flex h-10 w-10 items-center justify-center rounded-full bg-text-secondary/5 transition-all hover:bg-accent hover:text-[#0d1a23]">
              <Briefcase className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Discussion" className="flex h-10 w-10 items-center justify-center rounded-full bg-text-secondary/5 transition-all hover:bg-accent hover:text-[#0d1a23]">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-heading font-bold text-accent">Navigation</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="transition-colors hover:text-accent">Accueil</Link></li>
            <li><Link to="/a-propos" className="transition-colors hover:text-accent">A propos</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-accent">Services</Link></li>
            <li><Link to="/actualites" className="transition-colors hover:text-accent">Actualites</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-heading font-bold text-accent">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 text-text-secondary/80">
              <Mail className="h-4 w-4 text-accent" />
              contact@ensi-je.com
            </li>
            <li className="flex items-center gap-3 text-text-secondary/80">
              <Phone className="h-4 w-4 text-accent" />
              +216 XX XXX XXX
            </li>
            <li className="flex items-center gap-3 text-text-secondary/80">
              <MapPin className="h-4 w-4 text-accent" />
              ENSI, Manouba, Tunisie
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="mb-6 font-heading font-bold text-accent">Newsletter</h4>
          <p className="text-sm text-text-secondary/70">Abonnez-vous pour recevoir nos dernieres actualites.</p>
          <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-[10px] border border-text-secondary/10 bg-text-secondary/5 px-4 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button type="submit" className="btn btn-primary px-4 py-2 text-sm">OK</button>
          </form>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-between gap-4 border-t border-text-secondary/10 pt-8 text-xs text-text-secondary/50 md:flex-row">
        <p>© {new Date().getFullYear()} ENSI Junior Entreprise. Tous droits reserves.</p>
        <div className="flex gap-6">
          <a
            href={media.documents.statuts}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Statuts
          </a>
          <a
            href={media.documents.politiqueRse}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Politique RSE
          </a>
        </div>
      </div>
    </footer>
  )
}