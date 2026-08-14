const express = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { requireAdmin } = require('../middleware/auth')
const { publicWriteLimiter } = require('../middleware/rateLimiters')
const { subscribe, listSubscribers } = require('../controllers/newsletter.controller')

const router = express.Router()

router.post(
  '/subscribe',
  publicWriteLimiter,
  [body('email').trim().isEmail().withMessage('A valid email is required')],
  validate,
  subscribe,
)

router.get('/', requireAdmin, listSubscribers)

module.exports = router
