const mongoose = require('mongoose')

// Singleton: key figures reused across Home, About, and News. One source of
// truth so the same metric never shows different numbers on different pages.
const statsSchema = new mongoose.Schema(
  {
    clientsServed: { type: Number, default: 75 },
    projectsCompleted: { type: Number, default: 78 },
    studentsMembers: { type: Number, default: 48 },
    formerCollaborators: { type: Number, default: 35 },
    juniorEnterprisesCount: { type: Number, default: 7 },
    institutionalPartnersCount: { type: Number, default: 9 },
    newsFollowers: { type: Number, default: 22000 },
    newsletterSubscribers: { type: Number, default: 1000 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Stats', statsSchema)
