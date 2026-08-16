const mongoose = require('mongoose')

// About page "Our History" timeline. Alternating above/below layout is
// computed from position (even index = above) on the frontend, not stored.
const timelineEventSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 300 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

timelineEventSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('TimelineEvent', timelineEventSchema)
