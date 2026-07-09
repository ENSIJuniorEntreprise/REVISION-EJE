// src/components/kit/Articles.jsx
import { useEffect, useRef, useState } from 'react'
import { FileText, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

const articles = [
  {
    tag: 'Analyse',
    date: '2 Sep 2025',
    read: '5 min',
    title: "Les Sociétés Communautaires : Pilier d’une Économie Locale Durable en Tunisie",
    excerpt: "Nous ne créons pas seulement des entreprises, nous construisons l’avenir de nos villages», confie Amira Benali, fondatrice d’une coopérative agricole dans la région de Béja.À l’image de son initiative, une nouvelle génération d’entrepreneurs tunisiens réinvente l’économie locale à travers les sociétés communautaires.",
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQF-3PKnF02pnA/article-cover_image-shrink_423_752/B4EZkH13OkIQAU-/0/1756773192250?e=1779321600&v=beta&t=I6CdThGFXT0GRqd3jserumU5OUFjZfjdihbST_pO2zY',
    link: 'https://www.linkedin.com/pulse/les-sociétés-communautaires-pilier-dune-économie-b4u3e/?trackingId=TUkjcFL4jbPbqmgooKPZOA%3D%3D',
  },
  {
    tag: 'Guide',
    date: '17 Jun 2025',
    read: '4 min',
    title: 'La télésanté en Tunisie : en un clic, les soins sont accessibles partout et pour tous',
    excerpt: "La révolution numérique transforme le monde, et la santé en Tunisie est en première ligne de ce changement. La télésanté, qui permet de consulter des médecins à distance grâce aux outils numériques, s’impose comme une solution innovante et inclusive.",
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQHj2fkcoZX74g/article-cover_image-shrink_720_1280/B4EZd9jA0sHsAI-/0/1750158075554?e=1779926400&v=beta&t=mxOQBsb8VdaEFLIFeEt6zqPjydNoTMFDmx1dik7uA0M',
    link: 'https://www.linkedin.com/pulse/la-télésanté-en-tunisie-un-clic-les-soins-sont-1f2le/?trackingId=oNmN9vK%2Ff7dfYylkdHZA4A%3D%3D',
  },
  {
    tag: 'Événement',
    date: '27 Mar 2025',
    read: '6 min',
    title: 'Vers une Tunisie visionnaire : l’innovation comme clé de l’évolution économique',
    excerpt: "Il est indéniable que la Tunisie traverse actuellement une période économique critique. Entre le chômage, les inégalités sociales, les effets du changement climatique, un déficit commercial atteignant -1 765,5  millions de dinars et un taux de croissance limité à seulement 2,4 % , il devient impératif de repenser les modèles traditionnels de développement économique.",
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQFPmUMgujMoxw/article-cover_image-shrink_720_1280/B4EZd9qcznHsAQ-/0/1750160051652?e=1779926400&v=beta&t=FnjsRbgyUR2F3J2yX2mS47vwvCtm2gOJu3Rwj-hDX7c',
    link: 'https://www.linkedin.com/pulse/vers-une-tunisie-visionnaire-linnovation-comme-6dete/?trackingId=qaaqcmUC0Wm8%2Fo7UC6ddqA%3D%3D',
  },
  
  {
    tag: 'Événement',
    date: '8 May 2023',
    read: '5 min',
    title: 'Why TIKTOK ADS are the future of Social Media advertising ?',
    excerpt: "TikTok has taken the social media world by storm, outpacing the growth of all other platforms since its introduction in 2018. With 2.6 billion downloads and 175 million of those downloads recorded between January and March 2022, TikTok's popularity is still rising. The app has revolutionized the way we interact with social media, inspiring other platforms like Instagram Reels and YouTube Shorts to follow suit.",
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQGl0JtntD7_WQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1683552209708?e=1779926400&v=beta&t=umjwNA0FS5N8g-TlmoiOjfS0Rp-hMDDg2aaN_9UJaeg',
    link: 'https://www.linkedin.com/pulse/why-tiktok-ads-future-social-media-advertising/?trackingId=m2fvzqCZLQ9hHK%2Bx3yYwlw%3D%3D',
  },
  {
    tag: 'AI',
    date: '27 Mar 2023',
    read: '4 min',
    title: 'Artificial intelligence has the potential to transform the world in unprecedented ways.',
    excerpt: "From healthcare to transportation, from education to finance, AI can make our lives easier, more efficient, and more productive. With that in mind, how can AI change the entire world and simply replace many professions, such as engineers, doctors, etc.?",
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQGWcjUSerBxRQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679923449879?e=1779926400&v=beta&t=vypB1kN4F3SB9Dy2IUzxMFQoBp3hnJVltD8QUUH0-8I',
    link: 'https://www.linkedin.com/pulse/artificial-intelligence-has-potential-transform/?trackingId=STXHIU8WLKlpYBKg69NKXw%3D%3D',
  },
  {
    tag: 'Formation',
    date: '27 Mar 2023',
    read: '5 min',
    title: 'L ENSI Junior Entreprise, un exemple pour les associations étudiantes',
    excerpt: "L'ENSI Junior Entreprise est une organisation à but non lucratif fondée en 2006 par des étudiants de l'École Nationale des Sciences de l'Informatique en Tunisie. Aujourd'hui, elle est l'une des plus importantes Junior Entreprises du pays, offrant des services de haute qualité dans le domaine de l'informatique tout en permettant aux étudiants de gagner une expérience pratique et de se familiariser avec le monde professionnel.",
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    link: 'https://www.linkedin.com/pulse/lensi-junior-entreprise-un-exemple-pour-les-associations/?trackingId=VTIoCu3AqIr0UIC5PSlk6g%3D%3D',
  },
]

function ArticleCard({ a, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={ref}
      className="card-glass group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-eje-accent/50 hover:shadow-[0_25px_60px_-25px_rgb(46_163_221/0.5)]"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={a.img}
          alt={a.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-eje-accent px-3 py-1 font-body text-xs font-semibold text-white">
          {a.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 font-body text-xs text-eje-beige/50">
          <span>{a.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {a.read}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-extrabold leading-snug text-eje-beige">
          {a.title}
        </h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-eje-beige/60">
          {a.excerpt}
        </p>
        <a
          href={a.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 font-body text-sm font-semibold text-eje-accent transition group-hover:gap-2"
        >
          Read the article
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}

export default function Articles() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? articles : articles.slice(0, 3)

  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-eje-accent/10 px-4 py-2 font-body text-sm font-semibold text-eje-accent">
            <FileText className="h-4 w-4" />
            Our Chronicles
          </span>
          <h2 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem]">
            Articles &amp; Analyses
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-eje-beige/60">
          Dive into our latest articles, filled with sharp analyses and bold reflections on the entrepreneurial world.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((a, i) => (
            <ArticleCard key={a.title} a={a} index={i} />
          ))}
        </div>

        {/* Voir plus / Voir moins button */}
        {articles.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-eje-accent/30 bg-eje-accent/10 px-8 py-3 font-body text-sm font-semibold text-eje-accent transition hover:bg-eje-accent hover:text-white hover:border-eje-accent"
            >
              {showAll ? (
                <>See less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>See more <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}