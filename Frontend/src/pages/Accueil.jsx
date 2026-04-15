import AboutSection from '../components/home/AboutSection'
import CtaSection from '../components/home/CtaSection'
import FaqSection from '../components/home/FaqSection'
import HeroSection from '../components/home/HeroSection'
import PartnersSection from '../components/home/PartnersSection'
import ServicesPreview from '../components/home/ServicesPreview'
import WhyEjeSection from '../components/home/WhyEjeSection'

export default function Accueil() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <WhyEjeSection />
      <PartnersSection />
      <CtaSection />
      <FaqSection />
    </div>
  )
}