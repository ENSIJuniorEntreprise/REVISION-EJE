const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Admin = require('../models/Admin')

// Verifies the Bearer token and attaches the admin document to req.admin.
const requireAdmin = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    throw new ApiError(401, 'Authentication required')
  }

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }

  const admin = await Admin.findById(payload.sub).select('-passwordHash')
  if (!admin) {
    throw new ApiError(401, 'Account no longer exists')
  }

  req.admin = admin
  next()
})

module.exports = { requireAdmin }
