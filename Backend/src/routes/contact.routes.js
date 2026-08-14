const express = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { requireAdmin } = require('../middleware/auth')
const { publicWriteLimiter } = require('../middleware/rateLimiters')
const { createContactRequest, listContactRequests } = require('../controllers/contact.controller')
const { REQUEST_TYPES, PROFESSIONS } = require('../models/ContactRequest')

const router = express.Router()

router.post(
  '/',
  publicWriteLimiter,
  [
    body('nom')
      .trim()
      .isLength({ min: 3, max: 60 })
      .withMessage('Name must be between 3 and 60 characters')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
      .withMessage('Name may only contain letters, spaces, or hyphens'),
    body('telephone')
      .trim()
      .matches(/^[0-9]{8}$/)
      .withMessage('Phone number must be exactly 8 digits'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('profession').isIn(PROFESSIONS).withMessage('Invalid profession'),
    body('demande').isIn(REQUEST_TYPES).withMessage('Invalid request type'),
    body('message').optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
  ],
  validate,
  createContactRequest,
)

router.get('/', requireAdmin, listContactRequests)

module.exports = router
