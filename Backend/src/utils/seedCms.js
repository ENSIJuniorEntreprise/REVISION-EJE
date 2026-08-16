// One-time import of the CMS content that used to be hardcoded across the 5
// public pages, so switching them to the database doesn't lose anything.
// Safe to re-run: entities are matched by a natural key (name/title) and
// left untouched if already present.
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('../config/db')

const AboutContent = require('../models/AboutContent')
const ServicesContent = require('../models/ServicesContent')
const BoardMember = require('../models/BoardMember')
const TimelineEvent = require('../models/TimelineEvent')
const Value = require('../models/Value')
const Division = require('../models/Division')
const Principle = require('../models/Principle')
const ServiceCategory = require('../models/ServiceCategory')
const Partner = require('../models/Partner')
const Event = require('../models/Event')
const LegalDocument = require('../models/LegalDocument')

// Assumes the standard REVISION-EJE/{Backend,Frontend} sibling layout.
const FRONTEND_SRC_ASSETS = path.join(__dirname, '..', '..', '..', 'Frontend', 'src', 'assets')
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads')

// Copies a file that currently only exists as a bundled Vite import (so it
// has no stable public URL) into /uploads under a fixed, predictable name.
function copyIntoUploads(sourceRelativeToSrcAssets, subdir, destFilename) {
  const source = path.join(FRONTEND_SRC_ASSETS, sourceRelativeToSrcAssets)
  const destDir = path.join(UPLOADS_DIR, subdir)
  const dest = path.join(destDir, destFilename)
  if (!fs.existsSync(source)) {
    console.warn(`[seedCms] Source image not found, skipping: ${source}`)
    return null
  }
  fs.mkdirSync(destDir, { recursive: true })
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(source, dest)
  }
  return `/uploads/${subdir}/${destFilename}`
}

async function upsertByKey(Model, key, items) {
  let created = 0
  for (const item of items) {
    const existing = await Model.findOne({ [key]: item[key] })
    if (existing) continue
    await Model.create(item)
    created++
  }
  return created
}

async function seedCms() {
  await connectDB()

  // ── About gallery (bundled imports -> /uploads/about) ──
  const galleryImages = [
    copyIntoUploads('images/20th Generation.png', 'about', '20th-generation.png'),
    copyIntoUploads('images/GET E 3.0.jpg', 'about', 'get-e-3-0.jpg'),
    copyIntoUploads('images/riyeda.png', 'about', 'riyeda.png'),
  ].filter(Boolean)

  const aboutContent = await AboutContent.findOne()
  if (aboutContent && aboutContent.galleryImages.length === 0 && galleryImages.length > 0) {
    aboutContent.galleryImages = galleryImages
    await aboutContent.save()
    console.log('[seedCms] Set AboutContent.galleryImages')
  } else if (!aboutContent) {
    await AboutContent.create({ galleryImages })
    console.log('[seedCms] Created AboutContent with galleryImages')
  }

  // ── Services portfolio (already public, no copy needed) ──
  const servicesContent = await ServicesContent.findOne()
  const portfolioFileUrl = '/assets/Documents/Project-Portfolio-1.pdf'
  if (servicesContent && !servicesContent.portfolioFileUrl) {
    servicesContent.portfolioFileUrl = portfolioFileUrl
    await servicesContent.save()
    console.log('[seedCms] Set ServicesContent.portfolioFileUrl')
  } else if (!servicesContent) {
    await ServicesContent.create({ portfolioFileUrl })
    console.log('[seedCms] Created ServicesContent with portfolioFileUrl')
  }

  // ── Board members ──
  const boardCreated = await upsertByKey(BoardMember, 'name', [
    { name: 'Ahmed ZRIBI', role: 'President', photoUrl: copyIntoUploads('images/zribi.jpg', 'board', 'zribi.jpg'), displayOrder: 0 },
    { name: 'Mohamed FEKI', role: 'Vice President', photoUrl: copyIntoUploads('images/feki.jpg', 'board', 'feki.jpg'), displayOrder: 1 },
    { name: 'Hassine KOOLI', role: 'Treasurer', photoUrl: copyIntoUploads('images/hassine.jpg', 'board', 'hassine.jpg'), displayOrder: 2 },
  ])

  // ── Timeline ──
  const timelineCreated = await upsertByKey(TimelineEvent, 'title', [
    { year: '2006', title: 'Foundation of EJE', description: 'Birth of the ENSI Junior Enterprise.', displayOrder: 0 },
    { year: '2011', title: 'Co-founding of JET', description: 'EJE among the founders of Junior Enterprise Tunisia.', displayOrder: 1 },
    { year: '2012', title: 'Adoption of association bylaws', description: "Formalizing the organization's governance structure.", displayOrder: 2 },
    { year: '2020', title: 'Excellence Award', description: 'Recognition for the excellence of delivered projects.', displayOrder: 3 },
    { year: '2024', title: 'Get Entrepreneurial', description: 'First Get Entrepreneurial edition.', displayOrder: 4 },
  ])

  // ── Values (About page) ──
  const valuesCreated = await upsertByKey(Value, 'name', [
    { name: 'Creativity', description: 'We push the boundaries of innovation to deliver original, tailor-made solutions.', displayOrder: 0 },
    { name: 'Professionalism', description: 'Rigor, commitment, and respect for deadlines in every project we carry out.', displayOrder: 1 },
    { name: 'Excellence', description: 'We aim for excellence in every detail, from design through to delivery.', displayOrder: 2 },
  ])

  // ── Divisions (About page) ──
  const divisionsCreated = await upsertByKey(Division, 'name', [
    { name: 'Training Division', description: "Intensive workshops and technical training to elevate our members' skills.", displayOrder: 0 },
    { name: 'Project Division', description: 'Concrete, challenging projects for real clients — immersive, hands-on learning.', displayOrder: 1 },
    { name: 'Events Division', description: 'High-impact event organization that bridges the gap between academia and industry.', displayOrder: 2 },
  ])

  // ── Principles (Home page) ──
  const principlesCreated = await upsertByKey(Principle, 'name', [
    { name: 'Creativity', description: 'Innovative solutions that push past the conventional and challenge the expected.', displayOrder: 0, iconUrl: '/assets/icons/creativity.svg' },
    { name: 'Reliability', description: 'Secure, scalable systems architected to hold up over time and under real traffic.', displayOrder: 1, iconUrl: '/assets/icons/reliability.svg' },
    { name: 'Precision', description: 'Focused development strategies that align tightly with your business goals.', displayOrder: 2, iconUrl: '/assets/icons/precision.svg' },
    { name: 'Collaboration', description: 'Your growth partners, working as a genuine extension of your own team.', displayOrder: 3, iconUrl: '/assets/icons/collaboration.svg' },
  ])

  // ── Service categories (Home preview + Services page detail panel) ──
  const serviceCategoriesCreated = await upsertByKey(ServiceCategory, 'name', [
    {
      name: 'Web Development',
      shortDescription: 'Custom web applications built with modern frameworks for speed and scale.',
      longDescription: 'High-performance, scalable, user-centric web solutions using React, Next.js, and Node.js.',
      iconUrl: '/assets/globe.png',
      image: '/assets/getent (1).png',
      bulletPoints: [
        'Corporate websites & showcases',
        'Progressive Web Applications (PWA)',
        'E-commerce platforms',
        'Content Management Systems (CMS)',
        'API integrations & third-party services',
      ],
      displayOrder: 0,
    },
    {
      name: 'Mobile Development',
      shortDescription: 'Smooth iOS and Android experiences built with Flutter and React Native.',
      longDescription: 'Smooth native and hybrid applications for iOS and Android with Flutter or React Native.',
      iconUrl: '/assets/telephone.png',
      image: '/assets/daam.png',
      bulletPoints: ['Native & hybrid iOS & Android', 'Optimized Mobile UI/UX', 'API Integration', 'Offline Mode'],
      displayOrder: 1,
    },
    {
      name: 'Desktop Development',
      shortDescription: "Robust desktop software tailored to your team's day-to-day workflows.",
      longDescription: 'Robust desktop software for Windows, macOS, and Linux tailored to your complex business needs.',
      iconUrl: '/assets/portable.png',
      image: '/assets/dashbord.png',
      bulletPoints: ['Cross-platform (Win, Mac, Linux)', 'High performance', 'Advanced security', 'Legacy update & migration'],
      displayOrder: 2,
    },
    {
      name: 'Chatbots & AI',
      shortDescription: 'Intelligent automation, AI-powered chatbots, and smart FAQ systems.',
      longDescription: 'Integration of generative AI and machine learning models to automate and optimize your processes.',
      iconUrl: '/assets/chatbot.png',
      image: '/assets/chatbot.jpg',
      bulletPoints: ['NLP & language processing', 'Computer Vision', 'Predictive Analytics', 'Generative AI (Gen AI)'],
      displayOrder: 3,
    },
  ])

  // ── Partners ──
  const partnerFiles = [
    '3s.png', 'Horizons.png', 'Managers.png', 'asteel flash.png', 'atb.png', 'cognira.png',
    'euranova.png', 'finlogik.png', 'habemus.png', 'infor.png', 'instadeep.png', 'io.jpg',
    'iobeya.png', 'logo-Startup-village.png', 'machinestalk.png', 'minotore.png', 'newAccess.png',
    'novastore.png', 'opus.png', 'smt.png', 'stb.png', 'talan.png', 'uib.png',
  ]
  const toLabel = (filename) =>
    filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()
  const partnersCreated = await upsertByKey(
    Partner,
    'name',
    partnerFiles.map((file, i) => ({
      name: toLabel(file),
      logoUrl: `/assets/partner-logos/${encodeURIComponent(file)}`,
      displayOrder: i,
    })),
  )

  // ── Events ──
  const majorEventImages = ['ge-bg.jpg', 'ge-bg2.jpg', 'ge-bg3.jpg', 'ge-bg4.jpg', 'ge-bg5.jpg']
    .map((f, i) => copyIntoUploads(f, 'events', `major-${i}${path.extname(f)}`))
    .filter(Boolean)

  const eventsCreated = await upsertByKey(Event, 'name', [
    {
      name: 'Get Entrepreneurial',
      category: 'Major Event',
      description:
        'Our flagship annual event dedicated to innovation, entrepreneurship and business creation. An immersive day to connect creative minds and the leaders of tomorrow.',
      date: new Date('2026-10-15'),
      location: 'UTICA, Tunis',
      isMajor: true,
      images: majorEventImages,
      participants: 500,
      speakers: 30,
      editions: 3,
      link: '#',
      linkLabel: 'Visit the site — coming soon',
      displayOrder: 0,
    },
    {
      name: 'Get E Green & Tech Day',
      category: 'Hackathon',
      date: new Date('2025-11-20'),
      isMajor: false,
      images: [copyIntoUploads('green_tech.png', 'events', 'green-tech.png')].filter(Boolean),
      displayOrder: 1,
    },
    {
      name: 'External Birthday',
      category: 'Entertainment',
      date: new Date('2026-04-10'),
      isMajor: false,
      images: [copyIntoUploads('hero-newsroom.png', 'events', 'external-birthday.png')].filter(Boolean),
      displayOrder: 2,
    },
  ])

  // ── Legal documents (already public, no copy needed) ──
  const legalCreated = await upsertByKey(LegalDocument, 'name', [
    { name: 'Status', fileUrl: '/assets/Documents/statuts.pdf', type: 'statuts', displayOrder: 0 },
    { name: 'Financial Report', fileUrl: '/assets/Documents/EtatsFin_23-24.pdf', type: 'rapport-financier', displayOrder: 1 },
    { name: 'RSE Policy', fileUrl: '/assets/Documents/politique-rse.pdf', type: 'politique-rse', displayOrder: 2 },
  ])

  console.log('[seedCms] Done:', {
    boardCreated,
    timelineCreated,
    valuesCreated,
    divisionsCreated,
    principlesCreated,
    serviceCategoriesCreated,
    partnersCreated,
    eventsCreated,
    legalCreated,
  })
}

seedCms()
  .catch((err) => {
    console.error('[seedCms] Failed:', err)
    process.exitCode = 1
  })
  .finally(() => mongoose.connection.close())
