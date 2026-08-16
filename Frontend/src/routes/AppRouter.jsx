import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Accueil from '../pages/Accueil'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import Actualites from '../pages/Actualites'
import APropos from '../pages/APropos'
import NotFound from '../pages/NotFound'

import AdminLogin from '../admin/AdminLogin'
import AdminLayout from '../admin/AdminLayout'
import AdminDashboard from '../admin/AdminDashboard'
import SectionPage from '../admin/SectionPage'
import ProtectedRoute from '../admin/ProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path=":type/:key" element={<SectionPage />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="services" element={<Services />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="contact" element={<Contact />} />
          {/* Updated Actualites page now includes Hero, Stats, LatestNews, Articles, Magazines from the layout kit */}
          <Route path="actualites" element={<Actualites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
