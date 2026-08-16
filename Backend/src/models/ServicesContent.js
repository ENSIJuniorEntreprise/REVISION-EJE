const mongoose = require('mongoose')

const servicesContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'Our Expertise' },
    heroSubtitle: {
      type: String,
      default: 'From design to production, we transform your technological challenges into competitive advantages.',
    },
    // Left empty by default; set by an admin uploading the real portfolio PDF.
    portfolioFileUrl: { type: String, default: '' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('ServicesContent', servicesContentSchema)
