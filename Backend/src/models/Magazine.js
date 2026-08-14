const mongoose = require('mongoose')

const magazineSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true }, // e.g. "N°12"
    pages: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    coverImage: { type: String, required: true },
    // PDF for Browse/Download. Optional: a magazine can be listed as "coming soon"
    // before its file is uploaded.
    fileUrl: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

magazineSchema.index({ publishedAt: -1 })

module.exports = mongoose.model('Magazine', magazineSchema)
