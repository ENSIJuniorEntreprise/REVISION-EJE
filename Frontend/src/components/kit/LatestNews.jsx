import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
 
const news = [
  {
    date: '2026-04-25',
    title: 'Tunisia Digital Summit Participation',
    img: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/679044341_1458678399637381_6016135160137934795_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=C-oC8hJwaRQQ7kNvwHUVyen&_nc_oc=AdpRiZqbuj0RjEyeApEUfEVc636-eKYFgdIg0wnDSiNxEYx_KPPN1x00ZMBFjYM-vfk&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=yLL4JlQa3giuvij8B-3n7Q&_nc_ss=7b2a8&oh=00_Af6jRi-q-nIw-SN4ypU_9lUnMfGdMzF4A9Y5dK2ANgOeAw&oe=6A01AFBA',
  },
  {
    date: '2026-04-17',
    title: 'New Partnership',
    img: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/672206548_1451242120381009_5590460534023367884_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=vcdYA-O2pcQQ7kNvwHXlokx&_nc_oc=AdovbImOB1B03N3oSMeZkPWTbQUss9rfjCA6WkltI2hDyxtIkeO3BfKD2qdV_8ig80M&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=QDsSaYvyPfR7g-KYjUjy_A&_nc_ss=7b2a8&oh=00_Af67q_wx3sYUqcEYAvP8cpMhObprSnYuxhfYlUlzccJNNw&oe=6A01BAEB',
  },
  {
    date: '2026-04-14',
    title: "20th Anniversary",
    img: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/672229526_1448904270614794_5632268620959947663_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=TS5zqqq3K4wQ7kNvwE4sE03&_nc_oc=AdrTA9oXJVhA_lJSKkFEtTa27O220hL-FnXEImjb35rH7cQHAWSpmLLcS2gDtq0v-8Q&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=VY-NDZHeolfQsqlpYuLNrQ&_nc_ss=7b2a8&oh=00_Af7IqtAS_OHPsElSP7wA0JJXIqg_O3kJWSoh75szFUcy2Q&oe=6A01B8A8',
  },
  
  {
    date: '2026-04-10',
    title: 'International partnership',
    img: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/668982623_1445537824284772_8256916994674295136_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=4VY_h_UhqDwQ7kNvwFCmzwF&_nc_oc=AdqqMb5bTuDGER2CdgDI6DWjcyYzCGG1gTnC5qKTIo9ahJE5sACC4wDl8UU-EejELvQ&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=KHbpyT6Ik1wyN8SWIhkeXw&_nc_ss=7b2a8&oh=00_Af4KsiH2gApagve6vA4zBn9gEj7cO_cgqGZ2UILKS282Jg&oe=6A01C4E3',
  },
  {
    date: '2026-03-27',
    title: 'New Partnership',
    img: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/656885712_1433098638862024_1456097273296731671_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=LGYBIjmjRt8Q7kNvwGRvHHP&_nc_oc=AdqPD3X6R0ISUFFZjX5lqlnN5-nA1NqgQZzI7cM3dyBT7l5gnFqg71JRYAxOopnGJ1I&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=NboyOZt3EL5gJASpx4Ue6Q&_nc_ss=7b2a8&oh=00_Af7wS4WNsIzG8qX1WCOvX8KuOjFIFY-4VqaXbJjeCZqUJQ&oe=6A01AE3B',
  },
]
 
export default function LatestNews() {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const visible = 3
  const max = news.length - visible
 
  const scrollTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, max))
    setCurrent(clamped)
    if (!trackRef.current) return
    const cardWidth = trackRef.current.children[0]?.offsetWidth + 24
    trackRef.current.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' })
  }, [max])
 
  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = prev >= max ? 0 : prev + 1
        const cardWidth = trackRef.current?.children[0]?.offsetWidth + 24
        trackRef.current?.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [max])
 
  return (
    <section className="bg-eje-dark px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
 
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl">
                Latest  News
            </h2>
            <p className="mt-2 font-body text-base text-eje-beige/55">
                Stay informed about everything that's happening.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo(current - 1)}
              disabled={current === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-eje-beige/20 text-eje-beige/60 transition hover:border-eje-accent hover:text-eje-accent disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollTo(current + 1)}
              disabled={current >= max}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-eje-beige/20 text-eje-beige/60 transition hover:border-eje-accent hover:text-eje-accent disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          
          </div>
        </div>
 
        {/* Carousel track */}
        <div
          ref={trackRef}
          className="mt-12 flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {news.map((n) => (
            <article
              key={n.title}
              className="group cursor-pointer flex-shrink-0"
              style={{ width: 'calc((100% - 48px) / 3)', scrollSnapAlign: 'start' }}
            >
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <img
                  src={n.img}
                  alt={n.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-eje-dark/20" />
              </div>
              <div className="mt-4 font-body text-sm font-semibold text-eje-accent">{n.date}</div>
              <h3 className="mt-2 font-body text-lg font-extrabold text-eje-beige transition group-hover:text-eje-accent">
                {n.title}
              </h3>
            </article>
          ))}
        </div>
 
        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-eje-accent' : 'w-2 bg-eje-beige/25 hover:bg-eje-beige/50'
              }`}
              aria-label={`Aller à la diapositive ${i + 1}`}
            />
          ))}
        </div>
 
      </div>
    </section>
  )
}