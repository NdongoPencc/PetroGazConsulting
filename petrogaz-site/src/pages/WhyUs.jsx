import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Globe2, Scale, Users, Lightbulb, ShieldCheck } from 'lucide-react'

const REASONS = [
  {
    icon: MapPin,
    color: 'from-petroleum-600 to-petroleum-800',
    glow: 'bg-petroleum-600/20',
    titleKey: 'whyus.r1_title',
    descKey: 'whyus.r1_desc',
  },
  {
    icon: Globe2,
    color: 'from-gold-500 to-gold-700',
    glow: 'bg-gold-500/20',
    titleKey: 'whyus.r2_title',
    descKey: 'whyus.r2_desc',
  },
  {
    icon: Scale,
    color: 'from-petroleum-500 to-petroleum-700',
    glow: 'bg-petroleum-500/20',
    titleKey: 'whyus.r3_title',
    descKey: 'whyus.r3_desc',
  },
  {
    icon: Users,
    color: 'from-emerald-600 to-emerald-800',
    glow: 'bg-emerald-600/20',
    titleKey: 'whyus.r4_title',
    descKey: 'whyus.r4_desc',
  },
  {
    icon: Lightbulb,
    color: 'from-gold-400 to-gold-600',
    glow: 'bg-gold-400/20',
    titleKey: 'whyus.r5_title',
    descKey: 'whyus.r5_desc',
  },
  {
    icon: ShieldCheck,
    color: 'from-petroleum-400 to-petroleum-600',
    glow: 'bg-petroleum-400/20',
    titleKey: 'whyus.r6_title',
    descKey: 'whyus.r6_desc',
  },
]

export default function WhyUs() {
  const { t } = useTranslation()

  return (
    <section id="whyus" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-petroleum-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-petroleum-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4">
            {t('whyus.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {t('whyus.title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">{t('whyus.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map(({ icon: Icon, color, glow, titleKey, descKey }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 group hover:border-petroleum-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                  <div className={`absolute inset-0 rounded-xl ${glow} blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{t(titleKey)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
