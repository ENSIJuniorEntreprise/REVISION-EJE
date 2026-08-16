const mongoose = require('mongoose')

const homeContentSchema = new mongoose.Schema(
  {
    heroImage: { type: String, default: '' },
    heroSince: { type: String, default: 'Since 2006' },
    heroTitle: { type: String, default: 'Driving Innovation. Creating Impact.' },
    heroSubtitle: { type: String, default: 'Innovation. Excellence. Creativity.' },
    whoWeAreTitle: { type: String, default: 'Digital solutions that inspire.' },
    whoWeAreText: {
      type: String,
      default:
        "At EJE, we don't just build software — we craft experiences. Our team of student developers and designers works at the intersection of creativity and technical excellence to deliver projects that make a real difference for the businesses we partner with.",
    },
    yearsOfExperience: { type: Number, default: 20 },
    projectsCompletedLabel: { type: String, default: 'Projects Completed' },
    ctaTitle: { type: String, default: 'Ready to build your next masterpiece?' },
    ctaText: {
      type: String,
      default: "We can't wait to hear about your vision. Reach out and let's start the conversation.",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('HomeContent', homeContentSchema)
