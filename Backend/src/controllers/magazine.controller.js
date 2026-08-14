const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Magazine = require('../models/Magazine')

const listMagazines = asyncHandler(async (req, res) => {
  const magazines = await Magazine.find().sort({ publishedAt: -1 })
  res.json({ success: true, data: magazines })
})

const getMagazine = asyncHandler(async (req, res) => {
  const magazine = await Magazine.findById(req.params.id)
  if (!magazine) {
    throw new ApiError(404, 'Magazine not found')
  }
  res.json({ success: true, data: magazine })
})

// Precedence per field: an uploaded file wins, otherwise a URL passed in the
// body, otherwise (on update only) whatever the document already has.
function resolveUploads(req, existing = {}) {
  const files = req.files || {}
  return {
    coverImage:
      (files.cover?.[0] && `/uploads/magazines/${files.cover[0].filename}`) ||
      req.body.coverImage ||
      existing.coverImage,
    fileUrl:
      (files.file?.[0] && `/uploads/magazines/${files.file[0].filename}`) ||
      req.body.fileUrl ||
      existing.fileUrl,
  }
}

const createMagazine = asyncHandler(async (req, res) => {
  const { coverImage, fileUrl } = resolveUploads(req)
  if (!coverImage) throw new ApiError(400, 'A cover image (file upload or coverImage URL) is required')

  const magazine = await Magazine.create({
    number: req.body.number,
    pages: req.body.pages,
    title: req.body.title,
    description: req.body.description,
    coverImage,
    fileUrl,
    publishedAt: req.body.publishedAt,
  })

  res.status(201).json({ success: true, data: magazine })
})

const updateMagazine = asyncHandler(async (req, res) => {
  const magazine = await Magazine.findById(req.params.id)
  if (!magazine) {
    throw new ApiError(404, 'Magazine not found')
  }

  const fields = ['number', 'pages', 'title', 'description', 'publishedAt']
  for (const field of fields) {
    if (req.body[field] !== undefined) magazine[field] = req.body[field]
  }

  const { coverImage, fileUrl } = resolveUploads(req, magazine)
  magazine.coverImage = coverImage
  magazine.fileUrl = fileUrl

  await magazine.save()
  res.json({ success: true, data: magazine })
})

const deleteMagazine = asyncHandler(async (req, res) => {
  const magazine = await Magazine.findByIdAndDelete(req.params.id)
  if (!magazine) {
    throw new ApiError(404, 'Magazine not found')
  }
  res.json({ success: true })
})

module.exports = { listMagazines, getMagazine, createMagazine, updateMagazine, deleteMagazine }
