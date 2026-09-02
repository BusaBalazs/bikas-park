import { useGame } from '../context/GameContext'
import { motion } from 'framer-motion'

export default function Header() {
  const { t, lang, toggleLang, devMode, setDevMode } = useGame()

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 bg-park-bg/70 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-park-green border-2 border-white/40 flex items-center justify-center shadow-neonGreen shrink-0">
          <span className="text-lg">🐂</span>
        </div>
        <span className="font-display font-900 tracking-wide text-sm sm:text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hidden xs:block">
          {t.appName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setDevMode((d) => !d)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide border-2 transition-colors ${
            devMode
              ? 'bg-park-amber border-white/50 text-park-bg shadow-neonAmber'
              : 'bg-park-bg2 text-park-dim border-white/15'
          }`}
        >
          {devMode ? t.devModeOn : t.devModeOff}
        </motion.button>

        <div className="flex bg-park-bg2 border-2 border-white/15 rounded-full p-1 gap-1">
          {['hu', 'en'].map((code) => (
            <button
              key={code}
              onClick={() => lang !== code && toggleLang()}
              className={`w-9 h-7 rounded-full text-[11px] font-bold uppercase transition-all ${
                lang === code ? 'bg-park-cyan text-park-bg shadow-neonCyan' : 'text-park-dim'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
