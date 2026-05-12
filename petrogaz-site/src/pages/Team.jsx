import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Linkedin, Mail, Briefcase, FlaskConical, Scale, DollarSign, UserPlus } from 'lucide-react'

const MEMBER_ICONS = [Briefcase, FlaskConical, Scale, DollarSign]
const MEMBER_COLORS = [
  'from-petroleum-700 to-petroleum-950',
  'from-gold-500/30 to-petroleum-900',
  'from-petroleum-600 to-petroleum-900',
  'from-gold-400/20 to-petroleum-950',
]

export default function Team() {
  const { t } = useTranslation()

  const members = Array.from({ length: 4 }, (_, i) => ({
    Icon: MEMBER_ICONS[i],
    gradient: MEMBER_COLORS[i],
    name: t(`team.t${i + 1}_name`),
    role: t(`team.t${i + 1}_role`),
    desc: t(`team.t${i + 1}_desc`),
  }))

  return (
    <section id="team" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-petroleum-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-petroleum-900/60 border border-petroleum-500/30 text-petroleum-300 text-sm font-medium mb-4">
            {t('team.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{t('team.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">{t('team.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {members.map(({ Icon, gradient, name, role, desc }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-petroleum-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg border-2 border-petroleum-500/30 group-hover:border-gold-500/50 transition-colors`}>
                <Icon className="w-9 h-9 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-1">{name}</h3>
              <p className="text-petroleum-400 text-xs font-medium mb-3 uppercase tracking-wide">{role}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex justify-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-petroleum-600/30 flex items-center justify-center transition-colors group/btn">
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover/btn:text-petroleum-400 transition-colors" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-petroleum-600/30 flex items-center justify-center transition-colors group/btn">
                  <Mail className="w-4 h-4 text-slate-400 group-hover/btn:text-petroleum-400 transition-colors" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gold-500/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 flex items-center justify-center shrink-0">
              <UserPlus className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">{t('team.join_title')}</h3>
              <p className="text-slate-400 text-sm">{t('team.join_desc')}</p>
            </div>
          </div>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark font-bold rounded-xl transition-all shrink-0">
            {t('team.join_cta')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
