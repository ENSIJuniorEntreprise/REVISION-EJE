// src/pages/Actualites.jsx
// Rebuilt using components from the layout-whiz-kit.
// The old inline-style hero is replaced by the kit's Hero component,
// and the four new sections (Stats, LatestNews, Articles, Magazines)
// are composed below it.
import Hero from '../components/kit/Hero'
import Stats from '../components/kit/Stats'
import LatestNews from '../components/kit/LatestNews'
import Articles from '../components/kit/Articles'
import Magazines from '../components/kit/Magazines'
import GetEntrepreneurial from '../components/kit/GetEntrepreneurial'
import AutresEvenements from '../components/kit/AutresEvenements'
import Newsletter from '../components/kit/Newsletter'

export default function Actualites() {
  return (
    <main className="min-h-screen bg-eje-dark font-body text-eje-beige antialiased">
      <Hero />
      <Stats />
      <LatestNews />
      <Articles />
      <Magazines />
      <GetEntrepreneurial />
      <AutresEvenements /> 
      <Newsletter />
    </main>
  )
}
