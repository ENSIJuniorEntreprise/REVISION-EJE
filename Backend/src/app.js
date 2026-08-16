const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const { notFound, errorHandler } = require('./middleware/errorHandler')
const authRoutes = require('./routes/auth.routes')
const contactRoutes = require('./routes/contact.routes')
const newsletterRoutes = require('./routes/newsletter.routes')
const articleRoutes = require('./routes/article.routes')
const magazineRoutes = require('./routes/magazine.routes')
const uploadRoutes = require('./routes/upload.routes')
const mountCmsRoutes = require('./routes/cms.routes')

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  helmet({
    // Uploaded images/PDFs are fetched cross-origin by the frontend; the default
    // cross-origin-resource-policy would otherwise block that.
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/magazines', magazineRoutes)
app.use('/api/uploads', uploadRoutes)
mountCmsRoutes(app)

app.use(notFound)
app.use(errorHandler)

module.exports = app
