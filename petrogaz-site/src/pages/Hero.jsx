import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, ChevronDown, Droplets, Flame, HardHat, Globe } from 'lucide-react'

const floatAnim = {
  animate: { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
}

const ORBITAL = [
  { icon: Droplets, color: 'text-petroleum-400', bg: 'bg-petroleum-900/80' },
  { icon: Flame,    color: 'text-gold-400',       bg: 'bg-petroleum-900/80' },
  { icon: HardHat,  color: 'text-slate-300',      bg: 'bg-petroleum-900/80' },
  { icon: Globe,    color: 'text-petroleum-300',  bg: 'bg-petroleum-900/80' },
]

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { value: t('hero.stat1_value'), label: t('hero.stat1_label') },
    { value: t('hero.stat2_value'), label: t('hero.stat2_label') },
    { value: t('hero.stat3_value'), label: t('hero.stat3_label') },
    { value: t('hero.stat4_value'), label: t('hero.stat4_label') },
  ]

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-petroleum-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-petroleum-900/30 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute w-1 h-1 bg-petroleum-400 rounded-full opacity-40"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              {t('hero.badge')}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-black leading-tight mb-5">
              {t('hero.title')}{' '}
              <span className="text-gold-gradient block mt-1">{t('hero.title_highlight')}</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-xl">{t('hero.subtitle')}</p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 w-full xs:w-auto px-6 py-3.5 bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-petroleum-500 hover:to-petroleum-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-petroleum-900/50">
                {t('hero.cta_primary')} <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 w-full xs:w-auto px-6 py-3.5 border border-white/20 hover:border-gold-400/50 text-white hover:text-gold-400 font-semibold rounded-xl transition-all duration-200">
                <Calendar className="w-4 h-4" /> {t('hero.cta_secondary')}
              </button>
            </div>
          </motion.div>

          {/* Visuel orbital avec icônes */}
          <motion.div {...floatAnim} className="hidden lg:flex justify-center items-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border border-petroleum-500/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-8 rounded-full border border-gold-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 rounded-full border border-petroleum-400/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-petroleum-700 to-petroleum-950 flex items-center justify-center shadow-2xl glow-blue">
                  <svg viewBox="0 0 80 80" className="w-20 h-20">
                    <path d="M40 8 C40 8 20 32 20 46 C20 57 29 65 40 65 C51 65 60 57 60 46 C60 32 40 8 40 8Z" fill="url(#hGrad)" />
                    <path d="M40 55 C40 55 32 44 35 38 C37 34 40 40 40 40 C40 40 43 34 45 38 C48 44 40 55 40 55Z" fill="url(#fGrad)" />
                    <defs>
                      <linearGradient id="hGrad" x1="40" y1="8" x2="40" y2="65" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#36aaf5" /><stop offset="100%" stopColor="#003d6d" />
                      </linearGradient>
                      <linearGradient id="fGrad" x1="40" y1="55" x2="40" y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f5c842" /><stop offset="100%" stopColor="#ff6b00" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              {ORBITAL.map(({ icon: Icon, color, bg }, i) => (
                <div key={i}
                  className={`absolute w-11 h-11 ${bg} glass-card rounded-full flex items-center justify-center border border-white/10`}
                  style={{
                    top: `${50 - 42 * Math.cos((i * Math.PI) / 2)}%`,
                    left: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {stats.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 sm:p-5 text-center">
              <div className="font-display text-2xl sm:text-3xl font-black text-gold-gradient mb-1">{s.value}</div>
              <div className="text-slate-400 text-xs sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
