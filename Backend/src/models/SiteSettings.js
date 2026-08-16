const mongoose = require('mongoose')

// Singleton: shared header/footer/contact info reused across every page.
const siteSettingsSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, default: '/assets/Logoo.png' },
    email: { type: String, default: 'contact@ensi-je.com' },
    phone: { type: String, default: '+216 28 844 888' },
    address: { type: String, default: 'ENSI, Manouba, Tunisie' },
    tagline: { type: String, default: 'The student association connecting businesses with the talents of tomorrow.' },
    slogan: { type: String, default: 'Always Striving For Greatness' },
    socialLinks: {
      linkedin: { type: String, default: 'https://www.linkedin.com/company/ensi-junior-entreprise/' },
      facebook: { type: String, default: 'https://www.facebook.com/ENSI.Junior.Entreprise' },
      instagram: { type: String, default: 'https://www.instagram.com/ensijunior/' },
      youtube: { type: String, default: 'https://www.youtube.com/@ENSIJuniorEntreprise' },
    },
    copyrightText: { type: String, default: '© 2026 ENSI Junior Entreprise. All rights reserved.' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)
