const mongoose = require('mongoose')

// Covers both the News page's single "major event" (Get Entrepreneurial,
// isMajor: true, with stats + a background slideshow) and the smaller
// "Other Events" cards (isMajor: false).
const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    category: { type: String, trim: true, maxlength: 100 }, // e.g. "Hackathon", "Major Event"
    description: { type: String, trim: true, maxlength: 1000 },
    date: { type: Date },
    location: { type: String, trim: true },
    isMajor: { type: Boolean, default: false },
    // Single card image for regular events; multiple for the major event's
    // background slideshow.
    images: { type: [String], default: [] },
    participants: { type: Number },
    speakers: { type: Number },
    editions: { type: Number },
    link: { type: String, trim: true },
    linkLabel: { type: String, trim: true, default: 'Learn more' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

eventSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('Event', eventSchema)
