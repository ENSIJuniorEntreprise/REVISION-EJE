const express = require('express')
const { requireAdmin } = require('../middleware/auth')
const { makeUploader } = require('../middleware/upload')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')

const router = express.Router()

// Generic single-file upload: POST /api/uploads/:subdir?kind=image|pdf
// (multipart field name "file") -> { url }. Used to build up array fields
// (Event.images, AboutContent.galleryImages) one file at a time from the
// admin UI, independent of any single entity's own update endpoint.
const ALLOWED_SUBDIRS = new Set([
  'events',
  'about',
  'board',
  'partners',
  'divisions',
  'principles',
  'services',
  'site',
  'legal',
])

router.post(
  '/:subdir',
  requireAdmin,
  (req, res, next) => {
    const { subdir } = req.params
    if (!ALLOWED_SUBDIRS.has(subdir)) {
      return next(new ApiError(400, 'Invalid upload target'))
    }
    const kind = req.query.kind === 'pdf' ? 'pdf' : 'image'
    makeUploader(subdir, [{ name: 'file', kind }])(req, res, next)
  },
  asyncHandler(async (req, res) => {
    const file = req.files?.file?.[0]
    if (!file) throw new ApiError(400, 'No file uploaded')
    res.status(201).json({ success: true, url: `/uploads/${req.params.subdir}/${file.filename}` })
  }),
)

module.exports = router
