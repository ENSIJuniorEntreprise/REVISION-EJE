const asyncHandler = require('../utils/asyncHandler')
const Subscriber = require('../models/Subscriber')

const subscribe = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase().trim()

  // Upsert so resubscribing (or reactivating a past unsubscribe) is idempotent
  // rather than a 409 conflict.
  await Subscriber.findOneAndUpdate(
    { email },
    { email, active: true },
    { upsert: true, setDefaultsOnInsert: true },
  )

  res.status(201).json({ success: true })
})

const listSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 })
  res.json({ success: true, data: subscribers })
})

module.exports = { subscribe, listSubscribers }
