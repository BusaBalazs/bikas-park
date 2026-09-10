import { useGame } from '../context/GameContext'
import { motion } from 'framer-motion'

export default function Header() {
  const { t, lang, toggleLang, devMode, setDevMode } = useGame()

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 bg-park-bg/70 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className=" rounded-xl bg-park-green border-2 border-white/40 flex items-center justify-center shadow-neonGreen shrink-0 px-2 py-1">
          <span className="text-lg text-gray-800">Felfedező</span>     
        </div>
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

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleLang}
          className="w-9 h-7 rounded-full text-[11px] font-bold uppercase bg-park-bg2 border-2 border-white/15 text-park-dim"
        >
          {lang === 'hu' ? 'en' : 'hu'}
        </motion.button>
      </div>
    </header>
  )
}
