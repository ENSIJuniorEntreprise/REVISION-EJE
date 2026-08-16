const express = require('express')
const asyncHandler = require('./asyncHandler')
const { requireAdmin } = require('../middleware/auth')
const validate = require('../middleware/validate')
const { normalizeBody, resolveFiles } = require('./factoryShared')

// Builds a get/update router for a single-document entity (SiteSettings,
// Stats, HomeContent, ...). The document is created with schema defaults on
// first read so the public site never 404s on empty content.
//
// See crudFactory for the options shape.
function singletonFactory(Model, options = {}) {
  const { fileFields = [], uploadMiddleware = null, validators = [], parseFields = [], booleanFields = [] } = options
  const router = express.Router()
  const middleware = uploadMiddleware ? [uploadMiddleware] : []

  async function getOrCreate() {
    let doc = await Model.findOne()
    if (!doc) {
      doc = await Model.create({})
    }
    return doc
  }

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const doc = await getOrCreate()
      res.json({ success: true, data: doc })
    }),
  )

  router.put(
    '/',
    requireAdmin,
    ...middleware,
    ...validators,
    validate,
    asyncHandler(async (req, res) => {
      const doc = await getOrCreate()
      const body = normalizeBody(req.body, { parseFields, booleanFields })
      const files = resolveFiles(req, fileFields, doc)
      Object.assign(doc, body, files)
      await doc.save()
      res.json({ success: true, data: doc })
    }),
  )

  return router
}

module.exports = singletonFactory
