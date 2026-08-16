// Shared helpers used by both crudFactory and singletonFactory.

const RESERVED_FIELDS = ['_id', '__v', 'createdAt', 'updatedAt']

// Strips fields a client should never be able to set directly, JSON-parses
// fields that arrive as strings over multipart/form-data (needed for file
// uploads to work alongside regular fields), and coerces "true"/"false"
// strings to real booleans for the same reason.
function normalizeBody(body, { parseFields = [], booleanFields = [] } = {}) {
  const out = { ...body }
  for (const field of RESERVED_FIELDS) delete out[field]

  for (const field of parseFields) {
    if (typeof out[field] === 'string') {
      try {
        out[field] = JSON.parse(out[field])
      } catch {
        // leave as-is; Mongoose validation will reject it if it's really invalid
      }
    }
  }

  for (const field of booleanFields) {
    if (out[field] !== undefined) {
      out[field] = out[field] === true || out[field] === 'true'
    }
  }

  return out
}

// Resolves each configured file field to a URL: an uploaded file wins, then a
// URL passed directly in the body (for migrating existing external URLs),
// then (on update) whatever the document already has.
function resolveFiles(req, fileFields, existing = {}) {
  const result = {}
  for (const { field, urlPrefix, bodyField } of fileFields) {
    const key = bodyField || field
    const uploaded = req.files?.[field]?.[0] || (req.file?.fieldname === field ? req.file : null)
    result[key] = (uploaded && `${urlPrefix}/${uploaded.filename}`) || req.body[key] || existing[key]
  }
  return result
}

module.exports = { normalizeBody, resolveFiles }
