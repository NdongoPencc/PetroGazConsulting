import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Target, Eye, Shield, Star, Zap, Users2, Globe, MapPin, TrendingUp } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const MARKETS = [
  { icon: MapPin,    label: 'Sénégal — Marché national',         color: 'bg-petroleum-600', width: '90%' },
  { icon: Globe,     label: 'Afrique de l\'Ouest — Sous-régional', color: 'bg-petroleum-500', width: '70%' },
  { icon: TrendingUp,label: 'Afrique — Marché continental',       color: 'bg-gold-500',       width: '50%' },
]

export default function About() {
  const { t } = useTranslation()

  const values = [
    { icon: Shield, label: t('about.v1'), color: 'text-petroleum-400' },
    { icon: Star,   label: t('about.v2'), color: 'text-gold-400' },
    { icon: Zap,    label: t('about.v3'), color: 'text-petroleum-300' },
    { icon: Users2, label: t('about.v4'), color: 'text-gold-500' },
  ]

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-petroleum-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-4">
            {t('about.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">{t('about.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          <motion.div {...fadeUp(0.1)} className="space-y-5">
            {[t('about.p1'), t('about.p2'), t('about.p3')].map((p, i) => (
              <p key={i} className="text-slate-400 leading-relaxed">{p}</p>
            ))}
            <div className="pt-4">
              <p className="text-white font-semibold mb-4">{t('about.values_title')}</p>
              <div className="grid grid-cols-2 gap-3">
                {values.map(({ icon: Icon, label, color }, i) => (
                  <div key={i} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
                    <Icon className={`w-5 h-5 ${color} shrink-0`} />
                    <span className="text-white text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border-l-4 border-petroleum-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-petroleum-600/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-petroleum-400" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">{t('about.mission_title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{t('about.mission')}</p>
            </div>

            <div className="glass-card rounded-2xl p-6 border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">{t('about.vision_title')}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{t('about.vision')}</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-petroleum-400" />
                <p className="text-white font-semibold">Marchés couverts</p>
              </div>
              <div className="space-y-4">
                {MARKETS.map(({ icon: Icon, label, color, width }, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-slate-400 text-xs">{label}</span>
                    </div>
                    <div className="bg-white/5 rounded-full h-1.5">
                      <motion.div className={`h-1.5 rounded-full ${color}`}
                        initial={{ width: 0 }} whileInView={{ width }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
