const mongoose = require('mongoose')

const newsContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'Discover ENSI Junior Entreprise' },
    heroSubtitle: { type: String, default: "Dive into the latest news and highlights of our association." },
  },
  { timestamps: true },
)

module.exports = mongoose.model('NewsContent', newsContentSchema)
