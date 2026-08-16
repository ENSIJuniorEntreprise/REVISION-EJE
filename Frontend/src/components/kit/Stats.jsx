import useCountUp from '../../hooks/useCountUp'
import useApiData from '../../hooks/useApiData'

const STATS_FALLBACK = {
  clientsServed: 75,
  newsFollowers: 22000,
  projectsCompleted: 78,
  newsletterSubscribers: 1000,
}

function StatCard({ value, suffix, label, tag }) {
  const [ref, count] = useCountUp(value, { duration: 2500, threshold: 0.3 })
  return (
    <div ref={ref} className="card-glass group flex flex-col items-center justify-center gap-3 px-6 py-10 text-center transition hover:-translate-y-1 hover:border-eje-accent/40 hover:shadow-[0_20px_50px_-20px_rgb(46_163_221/0.4)]">
      <div className="font-heading text-5xl font-extrabold text-eje-accent sm:text-[3rem]">
        {count}{suffix}
      </div>
      <div className="font-body text-base font-semibold text-eje-beige">{label}</div>
      <span className="rounded-full bg-eje-beige/10 px-3 py-1 font-body text-xs text-eje-beige">
        {tag}
      </span>
    </div>
  )
}

export default function Stats() {
  const { data: statsData } = useApiData('/stats', STATS_FALLBACK)

  const stats = [
    { value: statsData.clientsServed, suffix: '+', label: 'Clients', tag: 'Business' },
    { value: statsData.newsFollowers, suffix: '+', label: 'Followers', tag: 'Community' },
    { value: statsData.projectsCompleted, suffix: '+', label: 'Projects Delivered', tag: 'Projects' },
    { value: statsData.newsletterSubscribers, suffix: '+', label: 'Newsletter Subscribers', tag: 'Newsletter' },
  ]

  return (
    <section id="stats" className="bg-eje-dark/80 px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl lg:text-[3.5rem]">
            Key Figures
          </h2>
          <p className="mt-4 font-body text-base text-eje-beige/60">
            Our impact at a glance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
