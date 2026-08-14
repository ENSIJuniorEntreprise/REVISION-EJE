require('dotenv').config()

const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Admin = require('../models/Admin')

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.')
  }

  await connectDB()

  const existing = await Admin.findOne({ email: email.toLowerCase() })
  if (existing) {
    console.log(`Admin already exists for ${email}, nothing to do.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await Admin.create({ email: email.toLowerCase(), name: 'EJE Admin', passwordHash })
  console.log(`Admin account created for ${email}.`)
}

seedAdmin()
  .catch((err) => {
    console.error('Seeding failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.connection.close())
