import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    initials: 'AM',
    gradient: 'from-petroleum-600 to-petroleum-900',
    nameKey: 'testimonials.t1_name',
    roleKey: 'testimonials.t1_role',
    companyKey: 'testimonials.t1_company',
    quoteKey: 'testimonials.t1_quote',
    stars: 5,
  },
  {
    initials: 'FK',
    gradient: 'from-gold-500 to-gold-700',
    nameKey: 'testimonials.t2_name',
    roleKey: 'testimonials.t2_role',
    companyKey: 'testimonials.t2_company',
    quoteKey: 'testimonials.t2_quote',
    stars: 5,
  },
  {
    initials: 'OD',
    gradient: 'from-petroleum-400 to-petroleum-700',
    nameKey: 'testimonials.t3_name',
    roleKey: 'testimonials.t3_role',
    companyKey: 'testimonials.t3_company',
    quoteKey: 'testimonials.t3_quote',
    stars: 5,
  },
]

export default function Testimonials() {
  const { t } = useTranslation()

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-petroleum-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-4">
            {t('testimonials.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ initials, gradient, nameKey, roleKey, companyKey, quoteKey, stars }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="glass-card rounded-2xl p-7 flex flex-col group hover:border-petroleum-500/30 hover:-translate-y-1 transition-all duration-300">

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-petroleum-500/40 mb-4 shrink-0" />

              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Citation */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6 italic">
                "{t(quoteKey)}"
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg`}>
                  {initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t(nameKey)}</p>
                  <p className="text-slate-500 text-xs">{t(roleKey)} — {t(companyKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
