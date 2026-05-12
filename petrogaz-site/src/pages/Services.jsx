import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, Network, Search, FileText, Settings, GraduationCap, BarChart2, BookOpen, ArrowRight } from 'lucide-react'

const ICONS = [TrendingUp, Network, Search, FileText, Settings, GraduationCap, BarChart2, BookOpen]
const COLORS = [
  'from-petroleum-600 to-petroleum-800',
  'from-gold-500 to-gold-600',
  'from-petroleum-500 to-petroleum-700',
  'from-emerald-600 to-emerald-800',
  'from-petroleum-600 to-petroleum-900',
  'from-gold-400 to-gold-600',
  'from-petroleum-400 to-petroleum-600',
  'from-slate-600 to-slate-800',
]
export const SERVICE_SLUGS = [
  'conseil-strategique',
  'liaison-inter-entreprises',
  'due-diligence-audit',
  'negociation-contrats',
  'gestion-projets',
  'formation-expertise',
  'etudes-recherches',
  'conformite-reglementation',
]

export default function Services() {
  const { t } = useTranslation()

  const services = Array.from({ length: 8 }, (_, i) => ({
    icon: ICONS[i],
    color: COLORS[i],
    slug: SERVICE_SLUGS[i],
    title: t(`services.s${i + 1}_title`),
    desc: t(`services.s${i + 1}_desc`),
  }))

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-petroleum-950/30 to-transparent">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4">
            {t('services.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{t('services.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="glass-card rounded-2xl p-6 group hover:border-petroleum-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
              <Link to={`/services/${s.slug}`}
                className="flex items-center gap-1.5 text-petroleum-400 text-xs font-semibold group-hover:text-gold-400 transition-colors mt-auto">
                {t('services.learn_more')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-petroleum-800/60 to-petroleum-900/60 border border-petroleum-500/20 p-8 sm:p-12 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">Un projet spécifique en tête ?</h3>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Nos experts analysent votre situation et vous proposent une solution sur mesure.</p>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark font-bold rounded-xl transition-all duration-200 shadow-lg glow-gold">
            Demander une consultation gratuite
          </button>
        </motion.div>
      </div>
    </section>
  )
}
