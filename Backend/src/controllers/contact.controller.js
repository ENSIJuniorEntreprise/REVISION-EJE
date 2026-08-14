const asyncHandler = require('../utils/asyncHandler')
const ContactRequest = require('../models/ContactRequest')
const { sendMail } = require('../utils/mailer')

const createContactRequest = asyncHandler(async (req, res) => {
  const { nom, telephone, email, profession, demande, message } = req.body

  const contactRequest = await ContactRequest.create({
    nom,
    telephone,
    email,
    profession,
    demande,
    message,
  })

  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL
  if (notifyTo) {
    sendMail({
      to: notifyTo,
      subject: `New contact request: ${demande}`,
      text: [
        `Name: ${nom}`,
        `Phone: ${telephone}`,
        `Email: ${email}`,
        `Profession: ${profession}`,
        `Request type: ${demande}`,
        '',
        message,
      ].join('\n'),
    }).catch((err) => console.error('[mailer] Failed to send contact notification:', err.message))
  }

  res.status(201).json({ success: true, data: { id: contactRequest._id } })
})

const listContactRequests = asyncHandler(async (req, res) => {
  const requests = await ContactRequest.find().sort({ createdAt: -1 })
  res.json({ success: true, data: requests })
})

module.exports = { createContactRequest, listContactRequests }
