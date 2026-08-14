const express = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { requireAdmin } = require('../middleware/auth')
const { articleUpload } = require('../middleware/upload')
const {
  listArticles,
  recentArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article.controller')

const router = express.Router()

const articleFields = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('type').optional().isIn(['news', 'chronicle']).withMessage('type must be "news" or "chronicle"'),
  body('tag').trim().notEmpty().withMessage('Tag is required'),
  body('excerpt').trim().isLength({ min: 10, max: 500 }).withMessage('Excerpt must be between 10 and 500 characters'),
  body('externalUrl').optional({ checkFalsy: true }).isURL().withMessage('externalUrl must be a valid URL'),
  body('readTimeMinutes').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('readTimeMinutes must be a positive integer'),
]

router.get('/', listArticles)
router.get('/recent', recentArticles)
router.get('/:id', getArticle)

router.post('/', requireAdmin, articleUpload.single('cover'), articleFields, validate, createArticle)
router.put('/:id', requireAdmin, articleUpload.single('cover'), articleFields, validate, updateArticle)
router.delete('/:id', requireAdmin, deleteArticle)

module.exports = router
