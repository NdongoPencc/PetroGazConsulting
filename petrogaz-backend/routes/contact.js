const express = require('express')
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')

const router = express.Router()

// Transporter email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const validate = [
  body('name').trim().notEmpty().withMessage('Nom requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('subject').trim().notEmpty().withMessage('Sujet requis'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message trop court'),
]

// POST /api/contact
router.post('/', validate, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, company, phone, subject, message } = req.body

  try {
    // Sauvegarder en base
    const contact = await Contact.create({
      name, email, company, phone, subject, message,
      ip: req.ip,
    })

    // Email de notification au client
    await transporter.sendMail({
      from: `"PétroGaz Consulting" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `[Nouveau contact] ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#f1f5f9;padding:32px;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="color:#0c8ee6;font-size:24px;margin:0;">PétroGaz Consulting</h1>
            <p style="color:#64748b;font-size:12px;margin:4px 0;">Nouveau message de contact</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#94a3b8;width:120px;">Nom</td><td style="padding:8px 0;color:#f1f5f9;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#0c8ee6;">${email}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#94a3b8;">Entreprise</td><td style="padding:8px 0;color:#f1f5f9;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding:8px 0;color:#94a3b8;">Téléphone</td><td style="padding:8px 0;color:#f1f5f9;">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#94a3b8;">Sujet</td><td style="padding:8px 0;color:#f5c842;font-weight:600;">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.05);border-radius:8px;border-left:3px solid #0c8ee6;">
            <p style="color:#94a3b8;font-size:12px;margin:0 0 8px;">Message :</p>
            <p style="color:#f1f5f9;margin:0;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color:#475569;font-size:11px;margin-top:24px;text-align:center;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      `,
    })

    // Email de confirmation à l'expéditeur
    await transporter.sendMail({
      from: `"PétroGaz Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Votre message a bien été reçu — PétroGaz Consulting',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#f1f5f9;padding:32px;border-radius:12px;">
          <h1 style="color:#0c8ee6;font-size:22px;">Merci, ${name} !</h1>
          <p style="color:#94a3b8;line-height:1.6;">Nous avons bien reçu votre message concernant <strong style="color:#f5c842;">${subject}</strong>.</p>
          <p style="color:#94a3b8;line-height:1.6;">Notre équipe vous répondra dans les plus brefs délais (généralement sous 24h ouvrées).</p>
          <div style="margin-top:24px;padding:16px;background:rgba(12,142,230,0.1);border-radius:8px;">
            <p style="color:#0c8ee6;font-weight:600;margin:0 0 8px;">PétroGaz Consulting</p>
            <p style="color:#64748b;font-size:12px;margin:0;">📍 Dakar, Sénégal &nbsp;|&nbsp; 📞 +221 77 646 57 63</p>
          </div>
        </div>
      `,
    })

    res.status(201).json({ success: true, message: 'Message envoyé avec succès', id: contact._id })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// GET /api/contact — liste des messages (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100)
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router
