const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Admin = require('../models/Admin')

function signToken(admin) {
  return jwt.sign({ sub: admin._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email: email?.toLowerCase().trim() }).select('+passwordHash')
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const valid = await bcrypt.compare(password || '', admin.passwordHash)
  if (!valid) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const accessToken = signToken(admin)

  res.json({
    success: true,
    data: {
      accessToken,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    },
  })
})

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin })
})

module.exports = { login, me }
