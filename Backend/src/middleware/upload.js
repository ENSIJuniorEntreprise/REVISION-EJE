const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const ApiError = require('../utils/ApiError')

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const PDF_TYPE = 'application/pdf'

function storageFor(subdir) {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads', subdir)),
    filename: (req, file, cb) => {
      const unique = crypto.randomBytes(8).toString('hex')
      cb(null, `${Date.now()}-${unique}${path.extname(file.originalname)}`)
    },
  })
}

const articleUpload = multer({
  storage: storageFor('articles'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!IMAGE_TYPES.has(file.mimetype)) {
      return cb(new ApiError(400, 'Cover image must be JPEG, PNG, or WebP'))
    }
    cb(null, true)
  },
})

const magazineUpload = multer({
  storage: storageFor('magazines'),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cover' && !IMAGE_TYPES.has(file.mimetype)) {
      return cb(new ApiError(400, 'Cover image must be JPEG, PNG, or WebP'))
    }
    if (file.fieldname === 'file' && file.mimetype !== PDF_TYPE) {
      return cb(new ApiError(400, 'Magazine file must be a PDF'))
    }
    cb(null, true)
  },
})

module.exports = { articleUpload, magazineUpload }
