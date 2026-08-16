// All CMS content routes in one place, built from the generic factories.
// Each entity is a model + a few lines of config here — no bespoke
// controllers needed. See utils/singletonFactory.js and utils/crudFactory.js.
const { body } = require('express-validator')
const singletonFactory = require('../utils/singletonFactory')
const crudFactory = require('../utils/crudFactory')
const { makeUploader } = require('../middleware/upload')

const SiteSettings = require('../models/SiteSettings')
const Stats = require('../models/Stats')
const HomeContent = require('../models/HomeContent')
const AboutContent = require('../models/AboutContent')
const ServicesContent = require('../models/ServicesContent')
const NewsContent = require('../models/NewsContent')

const BoardMember = require('../models/BoardMember')
const TimelineEvent = require('../models/TimelineEvent')
const Value = require('../models/Value')
const Division = require('../models/Division')
const Principle = require('../models/Principle')
const ServiceCategory = require('../models/ServiceCategory')
const Partner = require('../models/Partner')
const Event = require('../models/Event')
const LegalDocument = require('../models/LegalDocument')

function mountCmsRoutes(app) {
  // ── Singletons ──────────────────────────────────────────────
  app.use(
    '/api/site-settings',
    singletonFactory(SiteSettings, {
      uploadMiddleware: makeUploader('site', [{ name: 'logo', kind: 'image' }]),
      fileFields: [{ field: 'logo', urlPrefix: '/uploads/site', bodyField: 'logoUrl' }],
      parseFields: ['socialLinks'],
    }),
  )

  app.use('/api/stats', singletonFactory(Stats))

  app.use(
    '/api/home-content',
    singletonFactory(HomeContent, {
      uploadMiddleware: makeUploader('home', [{ name: 'hero', kind: 'image' }]),
      fileFields: [{ field: 'hero', urlPrefix: '/uploads/home', bodyField: 'heroImage' }],
    }),
  )

  app.use(
    '/api/about-content',
    singletonFactory(AboutContent, {
      uploadMiddleware: makeUploader('about', [{ name: 'hero', kind: 'image' }]),
      fileFields: [{ field: 'hero', urlPrefix: '/uploads/about', bodyField: 'heroImage' }],
      parseFields: ['galleryImages'],
    }),
  )

  app.use(
    '/api/services-content',
    singletonFactory(ServicesContent, {
      uploadMiddleware: makeUploader('services', [
        { name: 'portfolio', kind: 'pdf' },
        { name: 'hero', kind: 'image' },
      ]),
      fileFields: [
        { field: 'portfolio', urlPrefix: '/uploads/services', bodyField: 'portfolioFileUrl' },
        { field: 'hero', urlPrefix: '/uploads/services', bodyField: 'heroImage' },
      ],
    }),
  )

  app.use(
    '/api/news-content',
    singletonFactory(NewsContent, {
      uploadMiddleware: makeUploader('news', [{ name: 'hero', kind: 'image' }]),
      fileFields: [{ field: 'hero', urlPrefix: '/uploads/news', bodyField: 'heroImage' }],
    }),
  )

  // ── Repeatable lists ────────────────────────────────────────
  app.use(
    '/api/board-members',
    crudFactory(BoardMember, {
      uploadMiddleware: makeUploader('board', [{ name: 'photo', kind: 'image' }]),
      fileFields: [{ field: 'photo', urlPrefix: '/uploads/board', bodyField: 'photoUrl' }],
      validators: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('role').trim().notEmpty().withMessage('Role is required'),
      ],
    }),
  )

  app.use(
    '/api/timeline-events',
    crudFactory(TimelineEvent, {
      validators: [
        body('year').trim().notEmpty().withMessage('Year is required'),
        body('title').trim().notEmpty().withMessage('Title is required'),
      ],
    }),
  )

  app.use(
    '/api/values',
    crudFactory(Value, {
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  app.use(
    '/api/divisions',
    crudFactory(Division, {
      uploadMiddleware: makeUploader('divisions', [{ name: 'icon', kind: 'image' }]),
      fileFields: [{ field: 'icon', urlPrefix: '/uploads/divisions', bodyField: 'iconUrl' }],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  app.use(
    '/api/principles',
    crudFactory(Principle, {
      uploadMiddleware: makeUploader('principles', [{ name: 'icon', kind: 'image' }]),
      fileFields: [{ field: 'icon', urlPrefix: '/uploads/principles', bodyField: 'iconUrl' }],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  app.use(
    '/api/service-categories',
    crudFactory(ServiceCategory, {
      uploadMiddleware: makeUploader('services', [
        { name: 'icon', kind: 'image' },
        { name: 'image', kind: 'image' },
      ]),
      fileFields: [
        { field: 'icon', urlPrefix: '/uploads/services', bodyField: 'iconUrl' },
        { field: 'image', urlPrefix: '/uploads/services', bodyField: 'image' },
      ],
      parseFields: ['bulletPoints'],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  app.use(
    '/api/partners',
    crudFactory(Partner, {
      uploadMiddleware: makeUploader('partners', [{ name: 'logo', kind: 'image' }]),
      fileFields: [{ field: 'logo', urlPrefix: '/uploads/partners', bodyField: 'logoUrl' }],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  // `images` is a plain array of URLs built client-side via the generic
  // /api/uploads/events endpoint (one file per call), then saved as JSON here
  // — the single-file-per-field factory pattern above doesn't fit an
  // unbounded image list.
  app.use(
    '/api/events',
    crudFactory(Event, {
      parseFields: ['images'],
      booleanFields: ['isMajor'],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )

  app.use(
    '/api/legal-documents',
    crudFactory(LegalDocument, {
      uploadMiddleware: makeUploader('legal', [{ name: 'file', kind: 'pdf' }]),
      fileFields: [{ field: 'file', urlPrefix: '/uploads/legal', bodyField: 'fileUrl' }],
      validators: [body('name').trim().notEmpty().withMessage('Name is required')],
    }),
  )
}

module.exports = mountCmsRoutes
