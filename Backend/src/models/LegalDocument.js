const mongoose = require('mongoose')

// Covers Legal Mention, Status/Bylaws, Moral Report, Financial Report — free-
// form `type` label rather than a strict enum since these vary by mandate.
const legalDocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    fileUrl: { type: String, required: true },
    type: { type: String, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

legalDocumentSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('LegalDocument', legalDocumentSchema)
