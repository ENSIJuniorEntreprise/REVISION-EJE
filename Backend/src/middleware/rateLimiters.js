const rateLimit = require('express-rate-limit')

// Public write endpoints (contact form, newsletter signup) are the main spam/abuse
// surface on a site with no login, so they get a tighter window than the rest of the API.
const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

module.exports = { publicWriteLimiter, loginLimiter }
