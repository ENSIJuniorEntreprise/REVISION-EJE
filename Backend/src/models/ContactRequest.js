const mongoose = require('mongoose')

const REQUEST_TYPES = [
  'Web Development',
  'Graphic Design',
  'Digital Marketing',
  'Hosting',
  'Strategic Consulting',
  'Other',
]

const PROFESSIONS = ['Student', 'Entrepreneur', 'Manager', 'Engineer', 'Other']

const contactRequestSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true, maxlength: 60 },
    telephone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    profession: { type: String, required: true, enum: PROFESSIONS },
    demande: { type: String, required: true, enum: REQUEST_TYPES },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
    status: {
      type: String,
      enum: ['new', 'read', 'handled'],
      default: 'new',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('ContactRequest', contactRequestSchema)
module.exports.REQUEST_TYPES = REQUEST_TYPES
module.exports.PROFESSIONS = PROFESSIONS
