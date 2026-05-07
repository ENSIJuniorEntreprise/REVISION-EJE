
import { BookOpen, Eye, Download } from 'lucide-react'

const magazines = [
  {
    n: 'N°12',
    pages: '48 pages',
    title: 'ENSI Magazine — 2026 Edition',
    desc: "Our latest edition covers technological innovation, success stories from our alumni and a special feature on AI in Tunisia.",
    img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
  },
  
]

export default function Magazines() {
  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-eje-accent/10 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider text-eje-accent">
            <BookOpen className="h-3.5 w-3.5" />
            Publications
          </span>
          <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem]">
            Our <span className="text-eje-accent">Magazines</span>
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-eje-beige/60">
            Browse our exclusive magazines, compilations of our best productions,
            impactful interviews and inspiring case studies.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {magazines.map((m) => (
            <article
              key={m.n}
              className="card-glass group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-eje-accent/50 hover:shadow-[0_30px_70px_-30px_rgb(46_163_221/0.5)] sm:flex-row"
            >
              <div className="h-56 overflow-hidden sm:h-auto sm:w-44 sm:flex-shrink-0">
                <img
                  src={m.img}
                  alt={m.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-eje-accent px-3 py-1 font-body text-xs font-semibold text-white">
                      {m.n}
                    </span>
                    <span className="font-body text-xs text-eje-beige/50">{m.pages}</span>
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-extrabold leading-tight text-eje-beige">
                    {m.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-eje-beige/60">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="btn btn-primary inline-flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                      Browse
                  </button>
                  <button className="btn btn-outline inline-flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
