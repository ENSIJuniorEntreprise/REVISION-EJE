const mongoose = require('mongoose')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Article = require('../models/Article')

function typeFilter(req) {
  return req.query.type === 'news' || req.query.type === 'chronicle' ? { type: req.query.type } : {}
}

const listArticles = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(req.query.limit) || 9, 1), 50)
  const filter = typeFilter(req)

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Article.countDocuments(filter),
  ])

  res.json({
    success: true,
    articles,
    data: articles, // alias: lets the generic admin ListEditor consume this like every other list endpoint
    page,
    totalPages: Math.max(Math.ceil(total / limit), 1),
    total,
  })
})

// Mirrors the shape the frontend's News page already expects: a recent list
// plus whichever article is flagged `featured` for the front slot.
const recentArticles = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50)
  const articles = await Article.find(typeFilter(req)).sort({ publishedAt: -1 }).limit(limit)
  res.json({ success: true, articles })
})

const getArticle = asyncHandler(async (req, res) => {
  // req.params.id may be a Mongo _id or a slug; only include the _id clause
  // when it's actually a valid ObjectId, otherwise Mongoose throws a CastError
  // trying to cast a slug string to an ObjectId before the $or is evaluated.
  const { id } = req.params
  const query = mongoose.isValidObjectId(id) ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }
  const article = await Article.findOne(query)
  if (!article) {
    throw new ApiError(404, 'Article not found')
  }
  res.json({ success: true, data: article })
})

function resolveCoverImage(req) {
  if (req.file) {
    return `/uploads/articles/${req.file.filename}`
  }
  return req.body.coverImage
}

const createArticle = asyncHandler(async (req, res) => {
  const coverImage = resolveCoverImage(req)
  if (!coverImage) {
    throw new ApiError(400, 'A cover image (file upload or coverImage URL) is required')
  }

  const article = await Article.create({
    title: req.body.title,
    type: req.body.type === 'news' ? 'news' : 'chronicle',
    tag: req.body.tag,
    excerpt: req.body.excerpt,
    content: req.body.content,
    externalUrl: req.body.externalUrl,
    coverImage,
    readTimeMinutes: req.body.readTimeMinutes,
    featured: req.body.featured === 'true' || req.body.featured === true,
    publishedAt: req.body.publishedAt,
  })

  res.status(201).json({ success: true, data: article })
})

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    throw new ApiError(404, 'Article not found')
  }

  const fields = ['title', 'tag', 'excerpt', 'content', 'externalUrl', 'readTimeMinutes', 'publishedAt']
  for (const field of fields) {
    if (req.body[field] !== undefined) article[field] = req.body[field]
  }
  if (req.body.type === 'news' || req.body.type === 'chronicle') {
    article.type = req.body.type
  }
  if (req.body.featured !== undefined) {
    article.featured = req.body.featured === 'true' || req.body.featured === true
  }
  const coverImage = resolveCoverImage(req)
  if (coverImage) article.coverImage = coverImage

  await article.save()
  res.json({ success: true, data: article })
})

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id)
  if (!article) {
    throw new ApiError(404, 'Article not found')
  }
  res.json({ success: true })
})

module.exports = {
  listArticles,
  recentArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
}
