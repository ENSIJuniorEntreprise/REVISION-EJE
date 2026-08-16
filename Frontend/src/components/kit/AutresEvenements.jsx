import { Calendar } from 'lucide-react'
import useApiData from '../../hooks/useApiData'
import { resolveMediaUrl } from '../../config/api'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AutresEvenements() {
  const { data: events } = useApiData('/events', [], { list: true })
  const otherEvents = events.filter((e) => !e.isMajor)

  if (otherEvents.length === 0) return null

  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">

        {/* Title */}
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem] text-center mb-14">
          Other <span className="text-eje-accent">Events</span>
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherEvents.map((ev) => (
            <div
              key={ev._id}
              className="card-glass group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-eje-accent/30 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.3)] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {ev.images?.[0] && (
                  <img
                    src={resolveMediaUrl(ev.images[0])}
                    alt={ev.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                {/* Tag badge */}
                {ev.category && (
                  <span className="absolute left-4 top-4 rounded-full bg-eje-accent px-3 py-1 font-body text-xs font-semibold text-white shadow-md">
                    {ev.category}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2">
                {ev.date && (
                  <span className="flex items-center gap-1.5 font-body text-xs text-eje-beige/50">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {formatDate(ev.date)}
                  </span>
                )}
                <h3 className="font-heading text-base font-bold text-eje-beige group-hover:text-eje-accent transition-colors">
                  {ev.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
