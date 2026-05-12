import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import Logo from './Logo'

const NAV_LINKS = ['home', 'about', 'services', 'team', 'contact']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll détection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver pour détecter la section visible
  useEffect(() => {
    if (location.pathname !== '/') return

    const observers = []
    const sections = ['home', 'about', 'services', 'team', 'contact']

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [location.pathname])

  // Reset section active quand on quitte la home
  useEffect(() => {
    if (location.pathname !== '/') setActiveSection('')
  }, [location.pathname])

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')

  // Détermine si un lien est actif
  const isActive = (key) => {
    if (key === 'services') return location.pathname.startsWith('/services')
    return location.pathname === '/' && activeSection === key
  }

  const linkClass = (key) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-200 group ${
      isActive(key)
        ? 'text-white'
        : 'text-slate-400 hover:text-white'
    }`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/30 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Logo size={38} />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(key => (
            key === 'services'
              ? (
                <Link key={key} to="/services" className={linkClass(key)}>
                  {t(`nav.${key}`)}
                  {/* Indicateur actif */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gold-400 transition-all duration-300 ${
                    isActive(key) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
              : (
                <button key={key} onClick={() => scrollTo(key)} className={linkClass(key)}>
                  {t(`nav.${key}`)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gold-400 transition-all duration-300 ${
                    isActive(key) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              )
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20">
            <Globe className="w-4 h-4" />
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>
          <button onClick={() => scrollTo('contact')}
            className="px-5 py-2 bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-petroleum-500 hover:to-petroleum-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-petroleum-900/50">
            {t('nav.cta')}
          </button>
        </div>

        {/* Mobile/tablette */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleLang} className="text-slate-400 hover:text-white p-2">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => setOpen(!open)} className="text-white p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden bg-dark/98 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map(key => (
            key === 'services'
              ? (
                <Link key={key} to="/services" onClick={() => setOpen(false)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive(key)
                      ? 'bg-petroleum-600/20 text-white border-l-2 border-gold-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}>
                  {t(`nav.${key}`)}
                  {isActive(key) && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                </Link>
              )
              : (
                <button key={key} onClick={() => scrollTo(key)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive(key)
                      ? 'bg-petroleum-600/20 text-white border-l-2 border-gold-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}>
                  {t(`nav.${key}`)}
                  {isActive(key) && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                </button>
              )
          ))}
          <button onClick={() => scrollTo('contact')}
            className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-petroleum-600 to-petroleum-500 text-white font-semibold rounded-lg">
            {t('nav.cta')}
          </button>
        </div>
      )}
    </nav>
  )
}
