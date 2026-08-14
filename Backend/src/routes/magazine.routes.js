const express = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { requireAdmin } = require('../middleware/auth')
const { magazineUpload } = require('../middleware/upload')
const {
  listMagazines,
  getMagazine,
  createMagazine,
  updateMagazine,
  deleteMagazine,
} = require('../controllers/magazine.controller')

const router = express.Router()

const uploadFields = magazineUpload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'file', maxCount: 1 },
])

const magazineFields = [
  body('number').trim().notEmpty().withMessage('Number is required (e.g. "N°12")'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive integer'),
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
]

router.get('/', listMagazines)
router.get('/:id', getMagazine)

router.post('/', requireAdmin, uploadFields, magazineFields, validate, createMagazine)
router.put('/:id', requireAdmin, uploadFields, magazineFields, validate, updateMagazine)
router.delete('/:id', requireAdmin, deleteMagazine)

module.exports = router
