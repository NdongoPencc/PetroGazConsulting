import { Link, useNavigate, useLocation } from 'react-router-dom'

// Logo SVG PétroGaz Consulting — goutte de pétrole + flamme de gaz + hexagone
export default function Logo({ size = 40, withText = true }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }

  return (
    <a href="/" onClick={handleClick} className="flex items-center gap-3 cursor-pointer">
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagone fond */}
        <polygon points="30,2 54,16 54,44 30,58 6,44 6,16"
          fill="url(#hexGrad)" opacity="0.15" />
        <polygon points="30,2 54,16 54,44 30,58 6,44 6,16"
          fill="none" stroke="url(#borderGrad)" strokeWidth="1.5" />
        {/* Goutte de pétrole */}
        <path d="M30 10 C30 10 18 26 18 34 C18 41 23.4 46 30 46 C36.6 46 42 41 42 34 C42 26 30 10 30 10Z"
          fill="url(#dropGrad)" />
        {/* Flamme intérieure */}
        <path d="M30 38 C30 38 25 32 27 28 C28 26 30 30 30 30 C30 30 32 26 33 28 C35 32 30 38 30 38Z"
          fill="url(#flameGrad)" />
        {/* Reflet */}
        <ellipse cx="25" cy="28" rx="3" ry="5" fill="white" opacity="0.2" transform="rotate(-20 25 28)" />
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="60" y2="60">
            <stop offset="0%" stopColor="#0c8ee6" />
            <stop offset="100%" stopColor="#003d6d" />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0" y1="0" x2="60" y2="60">
            <stop offset="0%" stopColor="#36aaf5" />
            <stop offset="100%" stopColor="#f5c842" />
          </linearGradient>
          <linearGradient id="dropGrad" x1="30" y1="10" x2="30" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0c8ee6" />
            <stop offset="100%" stopColor="#003d6d" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="30" y1="38" x2="30" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f5c842" />
            <stop offset="100%" stopColor="#ff6b00" />
          </linearGradient>
        </defs>
      </svg>
      {withText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-900 text-white tracking-tight" style={{ fontSize: size * 0.38 }}>
            PÉTRO<span className="text-gold-gradient">GAZ</span>
          </span>
          <span className="text-petroleum-400 font-light tracking-widest uppercase" style={{ fontSize: size * 0.18 }}>
            Consulting
          </span>
        </div>
      )}
    </a>
  )
}
