const express = require('express')
const asyncHandler = require('./asyncHandler')
const ApiError = require('./ApiError')
const { requireAdmin } = require('../middleware/auth')
const validate = require('../middleware/validate')
const { normalizeBody, resolveFiles } = require('./factoryShared')

// Builds a full REST router (list, get, create, update, delete, reorder) for
// a repeatable-list entity (BoardMember, Partner, Event, ...), so each one
// only needs a model + this call instead of a hand-written controller.
//
// options:
//   fileFields:    [{ field, urlPrefix, bodyField? }] — multer field name -> uploads URL prefix
//   uploadMiddleware: multer middleware (e.g. upload.fields([...])) to run before create/update
//   validators:    express-validator chains to run on create/update
//   parseFields:   body fields to JSON.parse (for array/object fields sent via multipart form)
//   booleanFields: body fields to coerce from "true"/"false" strings to real booleans
function crudFactory(Model, options = {}) {
  const { fileFields = [], uploadMiddleware = null, validators = [], parseFields = [], booleanFields = [] } = options
  const router = express.Router()
  const middleware = uploadMiddleware ? [uploadMiddleware] : []

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const items = await Model.find().sort({ displayOrder: 1, createdAt: 1 })
      res.json({ success: true, data: items })
    }),
  )

  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')
      res.json({ success: true, data: item })
    }),
  )

  router.post(
    '/',
    requireAdmin,
    ...middleware,
    ...validators,
    validate,
    asyncHandler(async (req, res) => {
      const count = await Model.countDocuments()
      const body = normalizeBody(req.body, { parseFields, booleanFields })
      const files = resolveFiles(req, fileFields)
      const item = await Model.create({
        displayOrder: count,
        ...body,
        ...files,
      })
      res.status(201).json({ success: true, data: item })
    }),
  )

  router.put(
    '/:id',
    requireAdmin,
    ...middleware,
    ...validators,
    validate,
    asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')
      const body = normalizeBody(req.body, { parseFields, booleanFields })
      const files = resolveFiles(req, fileFields, item)
      Object.assign(item, body, files)
      await item.save()
      res.json({ success: true, data: item })
    }),
  )

  router.delete(
    '/:id',
    requireAdmin,
    asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')
      res.json({ success: true })
    }),
  )

  // Body: { order: [id1, id2, id3, ...] } in the desired display order.
  router.put(
    '/reorder/all',
    requireAdmin,
    asyncHandler(async (req, res) => {
      const { order } = req.body
      if (!Array.isArray(order) || order.length === 0) {
        throw new ApiError(400, 'order must be a non-empty array of ids')
      }
      await Promise.all(order.map((id, index) => Model.findByIdAndUpdate(id, { displayOrder: index })))
      const items = await Model.find().sort({ displayOrder: 1, createdAt: 1 })
      res.json({ success: true, data: items })
    }),
  )

  return router
}

module.exports = crudFactory
