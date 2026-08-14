const express = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { requireAdmin } = require('../middleware/auth')
const { loginLimiter } = require('../middleware/rateLimiters')
const { login, me } = require('../controllers/auth.controller')

const router = express.Router()

router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login,
)

router.get('/me', requireAdmin, me)

module.exports = router
