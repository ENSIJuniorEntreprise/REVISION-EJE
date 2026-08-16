const mongoose = require('mongoose')

// About page "Our Divisions" (Training/Project/Events). Icon is an uploaded
// image rather than a picked icon set, so a non-technical admin can change it.
const divisionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 300 },
    iconUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

divisionSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('Division', divisionSchema)
