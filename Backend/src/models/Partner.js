const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    logoUrl: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

partnerSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('Partner', partnerSchema)
