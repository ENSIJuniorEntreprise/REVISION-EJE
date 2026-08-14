const nodemailer = require('nodemailer')

let transporter = null

function getTransporter() {
  if (transporter !== null) return transporter

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    transporter = false // configured-off sentinel, distinct from "not yet created"
    return transporter
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

// No-ops (with a console note) when SMTP isn't configured, so contact/newsletter
// submissions still succeed and persist even without email set up.
async function sendMail({ to, subject, text }) {
  const t = getTransporter()
  if (!t) {
    console.log(`[mailer] SMTP not configured, skipping email "${subject}" to ${to}`)
    return
  }
  await t.sendMail({ from: process.env.SMTP_USER, to, subject, text })
}

module.exports = { sendMail }
