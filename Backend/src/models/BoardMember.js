const mongoose = require('mongoose')

// Priority #1 entity: the executive board changes every mandate (year).
const boardMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    role: { type: String, required: true, trim: true, maxlength: 100 },
    photoUrl: { type: String, required: true },
    mandateYear: { type: Number },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

boardMemberSchema.index({ displayOrder: 1 })

module.exports = mongoose.model('BoardMember', boardMemberSchema)
