import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const PHONE = '221776465763'

export default function WhatsAppButton() {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)

  const message = encodeURIComponent(t('whatsapp.default_message'))
  const href = `https://wa.me/${PHONE}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-4 max-w-[220px] border border-white/10 shadow-xl"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-white font-semibold text-sm">{t('whatsapp.tooltip_title')}</p>
              <button onClick={() => setShowTooltip(false)} className="text-slate-400 hover:text-white transition-colors shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">{t('whatsapp.tooltip_desc')}</p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-colors">
              {t('whatsapp.tooltip_cta')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        onClick={() => setShowTooltip(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-colors"
        aria-label="Contacter sur WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        {/* Icône WhatsApp SVG */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.8 1.85 6.793L2 30l7.418-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.594l-.418-.248-4.33 1.063 1.094-4.215-.272-.432A11.46 11.46 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.344-.172-2.037-1.004-2.352-1.119-.316-.115-.546-.172-.776.172-.23.344-.89 1.119-1.09 1.349-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.912-2.381-.2-.344-.021-.53.15-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.011c-.23 0-.603.086-.918.43-.316.344-1.205 1.177-1.205 2.869s1.234 3.328 1.406 3.558c.172.23 2.428 3.71 5.882 5.203.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.66-.099 2.037-.832 2.323-1.635.287-.803.287-1.492.2-1.635-.086-.143-.316-.23-.66-.402z"/>
        </svg>
      </motion.button>
    </div>
  )
}
