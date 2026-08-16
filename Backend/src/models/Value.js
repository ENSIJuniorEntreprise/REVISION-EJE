const mongoose = require('mongoose')

// About page "Our Values" (distinct from Home's "Principle" list — same
// naming idea, different content set on the real site).
const valueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 300 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

valueSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('Value', valueSchema)
