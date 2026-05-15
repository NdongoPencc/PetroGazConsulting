import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'

function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-petroleum-600/30 font-display mb-4">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">{t('notFound.title')}</h1>
      <p className="text-slate-400 mb-8">{t('notFound.desc')}</p>
      <Link to="/" className="px-6 py-3 bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-petroleum-500 hover:to-petroleum-400 text-white font-semibold rounded-xl transition-all">
        {t('notFound.cta')}
      </Link>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServicesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-right" toastOptions={{
          style: { background: '#003d6d', color: '#fff', fontFamily: 'Inter, sans-serif' },
          success: { style: { background: '#065f46' } },
          error: { style: { background: '#7f1d1d' } },
        }} />
      </div>
    </Router>
  )
}
