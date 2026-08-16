
import { ArrowDown } from 'lucide-react'
import heroImg from '../../assets/hero-newsroom.png'
import PageHero, { Rise } from '../PageHero'
import useApiData from '../../hooks/useApiData'
import { resolveMediaUrl } from '../../config/api'

const NEWS_CONTENT_FALLBACK = {
  heroImage: '',
  heroTitle: 'Discover ENSI Junior Entreprise',
  heroSubtitle: 'Dive into the latest news and highlights of our association.',
}

export default function Hero() {
  const { data: news } = useApiData('/news-content', NEWS_CONTENT_FALLBACK)

  return (
    <PageHero image={resolveMediaUrl(news.heroImage) || heroImg} imageAlt="L'Actu' ENSI Junior Entreprise newsroom" scrollTo="#stats" scrollLabel="Scroll down">
      <Rise
        as="h1"
        delay={0.9}
        className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-eje-beige sm:text-7xl lg:text-[7rem] lg:leading-[1.04]"
      >
        {news.heroTitle}
      </Rise>

      <Rise
        as="p"
        delay={1.25}
        className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-eje-beige/65 sm:text-lg lg:text-xl"
      >
        {news.heroSubtitle}
      </Rise>

      <Rise
        as="a"
        href="#stats"
        delay={1.55}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-eje-accent px-8 py-3.5 font-body text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgb(46_163_221/0.6)] transition hover:scale-[1.02] hover:shadow-[0_15px_50px_-10px_rgb(46_163_221/0.8)]"
      >
        View more
        <ArrowDown className="h-5 w-5" />
      </Rise>
    </PageHero>
  )
}
