const mongoose = require('mongoose')

// Shared between the Home services preview and the Services page's detailed
// tabbed panel (which needs the extra long-form fields).
const serviceCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    shortDescription: { type: String, trim: true, maxlength: 300 },
    longDescription: { type: String, trim: true, maxlength: 1000 },
    iconUrl: { type: String },
    image: { type: String },
    bulletPoints: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

serviceCategorySchema.index({ displayOrder: 1 })

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema)
