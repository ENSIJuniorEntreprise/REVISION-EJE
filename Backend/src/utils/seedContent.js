// One-time import of the articles/magazine that were previously hardcoded in
// the frontend (Articles.jsx, LatestNews.jsx, Magazines.jsx), so the News page
// isn't empty the moment it switches from mocked data to this API. Safe to
// re-run: existing documents are matched by slug/title and left untouched.
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Article = require('../models/Article')
const Magazine = require('../models/Magazine')

// From src/components/kit/Articles.jsx
const chronicleArticles = [
  {
    tag: 'Analysis',
    publishedAt: new Date('2025-09-02'),
    readTimeMinutes: 5,
    title: 'Community Enterprises: A Pillar of Sustainable Local Economy in Tunisia',
    excerpt:
      "\"We're not just building businesses, we're building the future of our villages,\" says Amira Benali, founder of an agricultural cooperative in the Béja region. Following her lead, a new generation of Tunisian entrepreneurs is reinventing the local economy through community enterprises.",
    coverImage:
      'https://media.licdn.com/dms/image/v2/D4E12AQF-3PKnF02pnA/article-cover_image-shrink_423_752/B4EZkH13OkIQAU-/0/1756773192250?e=1779321600&v=beta&t=I6CdThGFXT0GRqd3jserumU5OUFjZfjdihbST_pO2zY',
    externalUrl:
      'https://www.linkedin.com/pulse/les-sociétés-communautaires-pilier-dune-économie-b4u3e/?trackingId=TUkjcFL4jbPbqmgooKPZOA%3D%3D',
  },
  {
    tag: 'Guide',
    publishedAt: new Date('2025-06-17'),
    readTimeMinutes: 4,
    title: 'Telehealth in Tunisia: Healthcare Accessible Everywhere, for Everyone, in One Click',
    excerpt:
      'The digital revolution is transforming the world, and healthcare in Tunisia is at the forefront of that change. Telehealth, which lets patients consult doctors remotely through digital tools, is emerging as an innovative and inclusive solution.',
    coverImage:
      'https://media.licdn.com/dms/image/v2/D4E12AQHj2fkcoZX74g/article-cover_image-shrink_720_1280/B4EZd9jA0sHsAI-/0/1750158075554?e=1779926400&v=beta&t=mxOQBsb8VdaEFLIFeEt6zqPjydNoTMFDmx1dik7uA0M',
    externalUrl:
      'https://www.linkedin.com/pulse/la-télésanté-en-tunisie-un-clic-les-soins-sont-1f2le/?trackingId=oNmN9vK%2Ff7dfYylkdHZA4A%3D%3D',
  },
  {
    tag: 'Feature',
    publishedAt: new Date('2025-03-27'),
    readTimeMinutes: 6,
    title: 'Towards a Visionary Tunisia: Innovation as the Key to Economic Growth',
    excerpt:
      "There's no denying Tunisia is going through a critical economic period. Between unemployment, social inequality, the effects of climate change, a trade deficit reaching -1,765.5 million dinars, and growth limited to just 2.4%, rethinking traditional development models has become essential.",
    coverImage:
      'https://media.licdn.com/dms/image/v2/D4E12AQFPmUMgujMoxw/article-cover_image-shrink_720_1280/B4EZd9qcznHsAQ-/0/1750160051652?e=1779926400&v=beta&t=FnjsRbgyUR2F3J2yX2mS47vwvCtm2gOJu3Rwj-hDX7c',
    externalUrl:
      'https://www.linkedin.com/pulse/vers-une-tunisie-visionnaire-linnovation-comme-6dete/?trackingId=qaaqcmUC0Wm8%2Fo7UC6ddqA%3D%3D',
  },
  {
    tag: 'Feature',
    publishedAt: new Date('2023-05-08'),
    readTimeMinutes: 5,
    title: 'Why TIKTOK ADS are the future of Social Media advertising ?',
    excerpt:
      "TikTok has taken the social media world by storm, outpacing the growth of all other platforms since its introduction in 2018. With 2.6 billion downloads and 175 million of those downloads recorded between January and March 2022, TikTok's popularity is still rising. The app has revolutionized the way we interact with social media, inspiring other platforms like Instagram Reels and YouTube Shorts to follow suit.",
    coverImage:
      'https://media.licdn.com/dms/image/v2/D4E12AQGl0JtntD7_WQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1683552209708?e=1779926400&v=beta&t=umjwNA0FS5N8g-TlmoiOjfS0Rp-hMDDg2aaN_9UJaeg',
    externalUrl: 'https://www.linkedin.com/pulse/why-tiktok-ads-future-social-media-advertising/?trackingId=m2fvzqCZLQ9hHK%2Bx3yYwlw%3D%3D',
  },
  {
    tag: 'AI',
    publishedAt: new Date('2023-03-27'),
    readTimeMinutes: 4,
    title: 'Artificial intelligence has the potential to transform the world in unprecedented ways.',
    excerpt:
      'From healthcare to transportation, from education to finance, AI can make our lives easier, more efficient, and more productive. With that in mind, how can AI change the entire world and simply replace many professions, such as engineers, doctors, etc.?',
    coverImage:
      'https://media.licdn.com/dms/image/v2/D4E12AQGWcjUSerBxRQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679923449879?e=1779926400&v=beta&t=vypB1kN4F3SB9Dy2IUzxMFQoBp3hnJVltD8QUUH0-8I',
    externalUrl: 'https://www.linkedin.com/pulse/artificial-intelligence-has-potential-transform/?trackingId=STXHIU8WLKlpYBKg69NKXw%3D%3D',
  },
  {
    tag: 'Training',
    publishedAt: new Date('2023-03-27'),
    readTimeMinutes: 5,
    title: 'ENSI Junior Entreprise, a Model for Student Associations',
    excerpt:
      "ENSI Junior Entreprise is a non-profit organization founded in 2006 by students of the National School of Computer Science in Tunisia. Today, it stands as one of the country's leading Junior Enterprises, delivering high-quality IT services while giving students hands-on experience and a first taste of the professional world.",
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    externalUrl: 'https://www.linkedin.com/pulse/lensi-junior-entreprise-un-exemple-pour-les-associations/?trackingId=VTIoCu3AqIr0UIC5PSlk6g%3D%3D',
  },
]

// From src/components/kit/LatestNews.jsx — short image+title items, no excerpt/link
// in the original mock. The first one becomes the News page's featured slot.
const latestNews = [
  {
    publishedAt: new Date('2026-04-25'),
    title: 'Tunisia Digital Summit Participation',
    coverImage:
      'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/679044341_1458678399637381_6016135160137934795_n.jpg',
    featured: true,
  },
  {
    publishedAt: new Date('2026-04-17'),
    title: 'New Partnership',
    coverImage:
      'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/672206548_1451242120381009_5590460534023367884_n.jpg',
  },
  {
    publishedAt: new Date('2026-04-14'),
    title: '20th Anniversary',
    coverImage:
      'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/672229526_1448904270614794_5632268620959947663_n.jpg',
  },
  {
    publishedAt: new Date('2026-04-10'),
    title: 'International partnership',
    coverImage:
      'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/668982623_1445537824284772_8256916994674295136_n.jpg',
  },
  {
    publishedAt: new Date('2026-03-27'),
    title: 'New Partnership',
    coverImage:
      'https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/656885712_1433098638862024_1456097273296731671_n.jpg',
  },
].map((item) => ({
  ...item,
  type: 'news',
  tag: 'News',
  excerpt: item.title,
}))

// From src/components/kit/Magazines.jsx — no PDF in the original mock, so
// fileUrl is left unset (the frontend shows the magazine as "coming soon"
// until an admin uploads the real file).
const magazines = [
  {
    number: 'N°12',
    pages: 48,
    title: 'ENSI Magazine — 2026 Edition',
    description:
      'Our latest edition covers technological innovation, success stories from our alumni and a special feature on AI in Tunisia.',
    coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
  },
]

async function seedContent() {
  await connectDB()

  // Dedupe on title + publishedAt, not title alone: the original mock data has
  // two distinct "New Partnership" news items on different dates.
  let articlesCreated = 0
  for (const article of [...latestNews, ...chronicleArticles]) {
    const existing = await Article.findOne({ title: article.title, publishedAt: article.publishedAt })
    if (existing) continue
    await Article.create(article)
    articlesCreated++
  }

  let magazinesCreated = 0
  for (const magazine of magazines) {
    const existing = await Magazine.findOne({ title: magazine.title })
    if (existing) continue
    await Magazine.create(magazine)
    magazinesCreated++
  }

  console.log(`Seeded ${articlesCreated} article(s) and ${magazinesCreated} magazine(s).`)
}

seedContent()
  .catch((err) => {
    console.error('Seeding failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.connection.close())
