import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'

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
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" toastOptions={{
          style: { background: '#003d6d', color: '#fff', fontFamily: 'Inter, sans-serif' },
          success: { style: { background: '#065f46' } },
          error: { style: { background: '#7f1d1d' } },
        }} />
      </div>
    </Router>
  )
}
