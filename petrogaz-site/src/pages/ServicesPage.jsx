import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  TrendingUp, Network, Search, FileText, Settings, GraduationCap, BarChart2, BookOpen,
  ArrowLeft, ArrowRight, CheckCircle, Phone, ChevronRight
} from 'lucide-react'
import { SERVICE_SLUGS } from './Services'

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

export default function ServicesPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Charger les détails depuis i18n (traduits dynamiquement)
  const SERVICES_DETAIL = SERVICE_SLUGS.map((s, i) => ({
    slug: s,
    ...t(`servicesDetail.s${i + 1}`, { returnObjects: true }),
  }))

  const currentIndex = slug ? SERVICE_SLUGS.indexOf(slug) : -1
  const service = currentIndex >= 0 ? SERVICES_DETAIL[currentIndex] : null
  const Icon = currentIndex >= 0 ? ICONS[currentIndex] : null
  const color = currentIndex >= 0 ? COLORS[currentIndex] : null

  const prevService = currentIndex > 0 ? SERVICES_DETAIL[currentIndex - 1] : null
  const nextService = currentIndex < SERVICES_DETAIL.length - 1 ? SERVICES_DETAIL[currentIndex + 1] : null

  // Page liste de tous les services
  if (!slug || !service) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('servicesPage.back_home')}
            </Link>
            <span className="block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4 w-fit mx-auto">
              {t('services.badge')}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">{t('services.title')}</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </motion.div>

          {/* Grille services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {SERVICES_DETAIL.map((s, i) => {
              const SIcon = ICONS[i]
              return (
                <motion.div key={s.slug}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <Link to={`/services/${s.slug}`}
                    className="glass-card rounded-2xl p-6 flex gap-5 group hover:border-petroleum-500/40 transition-all duration-300 hover:-translate-y-0.5 block">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${COLORS[i]} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                      <SIcon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-white text-lg mb-1">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.subtitle}</p>
                      <span className="flex items-center gap-1.5 text-petroleum-400 text-xs font-semibold group-hover:text-gold-400 transition-colors">
                        {t('services.learn_more')} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Page détail d'un service
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero service */}
      <div className="relative overflow-hidden bg-gradient-to-b from-petroleum-950/50 to-transparent py-16 mb-12">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-petroleum-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb scrollable sur mobile */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-1">
            <Link to="/" className="hover:text-white transition-colors shrink-0">{t('servicesPage.home')}</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to="/services" className="hover:text-white transition-colors shrink-0">{t('nav.services')}</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-slate-300 shrink-0">{service.title}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-xl`}>
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">{service.title}</h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">{service.subtitle}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

        {/* Introduction */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 border-l-4 border-petroleum-500">
          <p className="text-slate-300 text-base leading-relaxed">{service.intro}</p>
        </motion.div>

        {/* Ce que nous offrons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <CheckCircle className="w-4 h-4 text-white" />
            </span>
            {t('servicesPage.what_we_offer')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-petroleum-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm leading-relaxed">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notre processus */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Settings className="w-4 h-4 text-white" />
            </span>
            {t('servicesPage.our_process')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {service.process.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass-card rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3 font-display text-4xl font-black text-white/5">{p.step}</div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                  <span className="text-white font-bold text-sm">{p.step}</span>
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-2">{p.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients cibles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Network className="w-4 h-4 text-white" />
            </span>
            {t('servicesPage.who_is_it_for')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.targets.map((target, i) => (
              <span key={i} className="px-3 py-1.5 glass-card rounded-full text-xs sm:text-sm text-slate-300 border border-white/10">
                {target}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-petroleum-800/60 to-petroleum-900/60 border border-petroleum-500/20 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">{t('servicesPage.interested')}</h3>
            <p className="text-slate-400 text-sm">{t('servicesPage.interested_desc')}</p>
          </div>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 shrink-0 w-full sm:w-auto">
            <Link to="/#contact"
              onClick={() => { setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark font-bold rounded-xl transition-all">
              <Phone className="w-4 h-4" /> {t('servicesPage.contact_us')}
            </Link>
            <Link to="/services"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all">
              {t('servicesPage.all_services')}
            </Link>
          </div>
        </motion.div>

        {/* Navigation prev/next */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
          {prevService ? (
            <Link to={`/services/${prevService.slug}`}
              className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-petroleum-500/40 transition-all group flex-1">
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{t('servicesPage.prev')}</p>
                <p className="text-sm font-semibold text-white truncate">{prevService.title}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextService ? (
            <Link to={`/services/${nextService.slug}`}
              className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-petroleum-500/40 transition-all group flex-1 text-right justify-end">
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{t('servicesPage.next')}</p>
                <p className="text-sm font-semibold text-white truncate">{nextService.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0" />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  )
}
