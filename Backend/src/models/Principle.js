const mongoose = require('mongoose')

// Home page "Built on four principles".
const principleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 300 },
    iconUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

principleSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('Principle', principleSchema)
