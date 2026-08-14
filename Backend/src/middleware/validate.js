const { validationResult } = require('express-validator')
const ApiError = require('../utils/ApiError')

// Run after express-validator check(...) chains; turns their accumulated
// errors into a single 400 response instead of requiring each route to do it.
function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ')
    throw new ApiError(400, message)
  }
  next()
}

module.exports = validate
