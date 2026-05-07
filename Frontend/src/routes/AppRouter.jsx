import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Accueil from '../pages/Accueil'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import Actualites from '../pages/Actualites'
import APropos from '../pages/APropos'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="services" element={<Services />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="contact" element={<Contact />} />
          {/* Updated Actualites page now includes Hero, Stats, LatestNews, Articles, Magazines from the layout kit */}
          <Route path="actualites" element={<Actualites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
