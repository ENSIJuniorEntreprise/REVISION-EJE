const mongoose = require('mongoose')

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Which feed this belongs to on the News page: short "news" blurbs (the
    // LatestNews carousel) vs long-form "chronicle" pieces (the Articles grid).
    // Distinct from `tag`, which is just a free-form display label.
    type: { type: String, enum: ['news', 'chronicle'], default: 'chronicle' },
    tag: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 500 },
    content: { type: String, trim: true },
    // If set, "Read the article" links out (e.g. to LinkedIn) instead of an internal page.
    externalUrl: { type: String, trim: true },
    coverImage: { type: String, required: true },
    readTimeMinutes: { type: Number, min: 1, default: 5 },
    // Highlighted on the News page's front slot (mirrors the old site's `onFront` flag).
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

// Two articles can legitimately share a title (e.g. recurring "New Partnership"
// announcements), so the base slug alone isn't guaranteed unique — append
// -2, -3, ... until it is.
articleSchema.pre('validate', async function generateSlug(next) {
  if (this.slug || !this.title) {
    return next()
  }

  const base = slugify(this.title)
  const Article = this.constructor
  let candidate = base
  let suffix = 1
  while (await Article.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1
    candidate = `${base}-${suffix}`
  }
  this.slug = candidate
  next()
})

articleSchema.index({ publishedAt: -1 })

module.exports = mongoose.model('Article', articleSchema)
