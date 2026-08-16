const mongoose = require('mongoose')

const aboutContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'ENSI Junior Enterprise' },
    heroSubtitle: { type: String, default: 'Creativity—Professionalism—Excellence' },
    introText: {
      type: String,
      default:
        'Founded in 2006, ENSI Junior Enterprise (EJE) is a non-profit association dedicated to introducing students to the world of entrepreneurship. For 20 years, our association has tirelessly carved out its own path toward excellence, innovation and expertise, establishing itself as a pioneer within the Junior Enterprise movement in Tunisia.',
    },
    // Rotating image carousel in the "Who we are" section. Left empty by
    // default (frontend falls back gracefully) — populated for real by the
    // content seed script, which copies actual files into /uploads.
    galleryImages: { type: [String], default: [] },
  },
  { timestamps: true },
)

module.exports = mongoose.model('AboutContent', aboutContentSchema)
