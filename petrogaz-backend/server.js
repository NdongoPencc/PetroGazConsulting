const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

// ── Sécurité ──────────────────────────────────────────────────────────────────
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '10kb' }))

// Rate limiting global
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Trop de requêtes' }))

// Rate limiting strict pour le formulaire de contact
const contactLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: 'Limite de messages atteinte' })

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactLimit, require('./routes/contact'))

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

// ── MongoDB ───────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petrogaz')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ MongoDB erreur:', err.message))

// ── Démarrage ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Serveur PétroGaz démarré sur http://localhost:${PORT}`))
