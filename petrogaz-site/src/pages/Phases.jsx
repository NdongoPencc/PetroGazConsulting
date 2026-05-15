import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, Zap, Settings2, ArrowRight } from 'lucide-react'

const PHASES = [
  {
    number: '01',
    icon: Search,
    color: 'from-petroleum-600 to-petroleum-900',
    border: 'border-petroleum-500/40',
    accent: 'text-petroleum-400',
    glowColor: 'bg-petroleum-600/20',
    titleKey: 'phases.p1_title',
    subtitleKey: 'phases.p1_subtitle',
    descKey: 'phases.p1_desc',
    itemsKey: 'phases.p1_items',
  },
  {
    number: '02',
    icon: Zap,
    color: 'from-gold-500 to-gold-700',
    border: 'border-gold-500/40',
    accent: 'text-gold-400',
    glowColor: 'bg-gold-500/20',
    titleKey: 'phases.p2_title',
    subtitleKey: 'phases.p2_subtitle',
    descKey: 'phases.p2_desc',
    itemsKey: 'phases.p2_items',
  },
  {
    number: '03',
    icon: Settings2,
    color: 'from-petroleum-400 to-petroleum-700',
    border: 'border-petroleum-400/40',
    accent: 'text-petroleum-300',
    glowColor: 'bg-petroleum-400/20',
    titleKey: 'phases.p3_title',
    subtitleKey: 'phases.p3_subtitle',
    descKey: 'phases.p3_desc',
    itemsKey: 'phases.p3_items',
  },
]

export default function Phases() {
  const { t } = useTranslation()

  return (
    <section id="phases" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-4">
            {t('phases.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {t('phases.title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">{t('phases.subtitle')}</p>
        </motion.div>

        {/* Connecteur visuel entre phases */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-8">
          {PHASES.map((p, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {p.number}
              </div>
              {i < PHASES.length - 1 && (
                <div className="flex items-center w-32 xl:w-48">
                  <div className="flex-1 h-px bg-gradient-to-r from-petroleum-500/50 to-gold-500/50" />
                  <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PHASES.map(({ number, icon: Icon, color, border, accent, glowColor, titleKey, subtitleKey, descKey, itemsKey }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`glass-card rounded-2xl p-7 border ${border} group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>

              {/* Numéro en filigrane */}
              <div className="absolute top-4 right-5 font-display text-7xl font-black text-white/[0.03] select-none">
                {number}
              </div>

              {/* Icône */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-xl group-hover:scale-105 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
                <div className={`absolute inset-0 rounded-2xl ${glowColor} blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>

              <div className={`text-xs font-bold uppercase tracking-widest ${accent} mb-2`}>
                {t('phases.phase_label')} {number}
              </div>
              <h3 className="font-display font-black text-white text-xl mb-1">{t(titleKey)}</h3>
              <p className={`text-sm font-medium ${accent} mb-4`}>{t(subtitleKey)}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{t(descKey)}</p>

              <ul className="space-y-2">
                {t(itemsKey, { returnObjects: true }).map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-br ${color}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA bas de section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">{t('phases.cta_text')}</p>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-petroleum-500 hover:to-petroleum-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-petroleum-900/50">
            {t('phases.cta_btn')} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
