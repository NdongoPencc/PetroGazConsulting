import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Contact() {
  const { t } = useTranslation()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erreur')
      toast.success(t('contact.form_success'))
      setSent(true)
      setForm({ name: '', email: '', company: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      // Fallback mailto si backend indisponible
      const body = `Nom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\nTéléphone: ${form.phone}\nSujet: ${form.subject}\n\n${form.message}`
      window.location.href = `mailto:cgaye1997@gmail.com?subject=${encodeURIComponent(form.subject || 'Contact PétroGaz')}&body=${encodeURIComponent(body)}`
      toast.success(t('contact.form_success'))
    } finally {
      setSending(false)
    }
  }

  const infos = [
    { icon: MapPin, label: t('contact.info_address'), color: 'text-petroleum-400' },
    { icon: Mail,   label: t('contact.info_email'),   color: 'text-gold-400',       href: `mailto:${t('contact.info_email')}` },
    { icon: Phone,  label: t('contact.info_phone'),   color: 'text-petroleum-300',  href: `tel:+221776465763` },
    { icon: Clock,  label: t('contact.info_hours'),   color: 'text-slate-400' },
  ]

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-petroleum-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-4">
            {t('contact.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{t('contact.title')}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Infos */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-3">
            {infos.map(({ icon: Icon, label, color, href }, i) => (
              <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                {href
                  ? <a href={href} className="text-slate-300 text-sm hover:text-white transition-colors break-all">{label}</a>
                  : <span className="text-slate-300 text-sm">{label}</span>
                }
              </div>
            ))}
            <div className="glass-card rounded-xl overflow-hidden h-40 flex items-center justify-center relative border border-petroleum-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-petroleum-900/90 to-petroleum-950/90" />
              <div className="relative text-center space-y-1.5">
                <div className="w-10 h-10 mx-auto rounded-full bg-petroleum-600/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-petroleum-400" />
                </div>
                <p className="text-white font-semibold text-sm">Dakar, Sénégal</p>
                <p className="text-slate-400 text-xs">Plateau, Dakar</p>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3">
            {sent ? (
              <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full">
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="font-display font-bold text-white text-xl mb-2">Message envoyé !</h3>
                <p className="text-slate-400">Notre équipe vous répondra sous 24h ouvrées.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 sm:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name',  label: t('contact.form_name'),  type: 'text',  placeholder: 'Mame Cheikh Gaye', required: true },
                    { name: 'email', label: t('contact.form_email'), type: 'email', placeholder: 'email@entreprise.com', required: true },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{f.label} {f.required && '*'}</label>
                      <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                        required={f.required} placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-petroleum-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name: 'company', label: t('contact.form_company'), placeholder: 'Votre entreprise' },
                    { name: 'phone',   label: t('contact.form_phone'),   placeholder: '+221 77 000 00 00' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{f.label}</label>
                      <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-petroleum-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form_subject')} *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-petroleum-500 transition-colors">
                    <option value="">-- Choisir un sujet --</option>
                    {t('contact.subject_options', { returnObjects: true }).map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('contact.form_message')} *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-petroleum-500 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-petroleum-500 hover:to-petroleum-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-200 shadow-lg">
                  {sending
                    ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />{t('contact.form_sending')}</>
                    : <><Send className="w-5 h-5" />{t('contact.form_submit')}</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
