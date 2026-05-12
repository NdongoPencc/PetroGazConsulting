import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import { MapPin, Mail, Phone, Clock, Linkedin, Twitter, Facebook } from 'lucide-react'

const NAV = ['home', 'about', 'services', 'team', 'contact']

export default function Footer() {
  const { t } = useTranslation()
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const contactItems = [
    { icon: MapPin, text: t('contact.info_address') },
    { icon: Mail,   text: t('contact.info_email') },
    { icon: Phone,  text: t('contact.info_phone') },
    { icon: Clock,  text: t('contact.info_hours') },
  ]

  return (
    <footer className="border-t border-white/5 bg-petroleum-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size={42} />
            <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-xs">{t('footer.tagline')}</p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter,  href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 glass-card rounded-lg flex items-center justify-center hover:border-petroleum-500/50 transition-colors group">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-petroleum-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{t('footer.links_title')}</p>
            <ul className="space-y-2">
              {NAV.map(key => (
                <li key={key}>
                  <button onClick={() => scrollTo(key)}
                    className="text-slate-400 hover:text-petroleum-400 text-sm transition-colors">
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{t('footer.contact_title')}</p>
            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                  <Icon className="w-4 h-4 text-petroleum-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>{t('footer.rights')}</span>
          <span>{t('footer.made')}</span>
        </div>
      </div>
    </footer>
  )
}
