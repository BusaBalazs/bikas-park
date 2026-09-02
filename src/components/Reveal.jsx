import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import MascotBubble from './MascotBubble'

export default function Reveal() {
  const { t, lang, currentPuzzle, mascot, beginCollecting } = useGame()
  if (!currentPuzzle) return null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />

      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full">
        <h1 className="font-display font-900 text-xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          {t.revealTitle}
        </h1>

        <MascotBubble text={mascot.text} bubbleKey={mascot.actionKey} action={mascot.action} actionKey={mascot.actionKey} size={100} />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 16 }}
          className="w-56 aspect-[3/4] rounded-2xl overflow-hidden border-[3px] border-park-amber shadow-neonAmber"
        >
          <img src={currentPuzzle.image} alt={currentPuzzle.name[lang]} className="w-full h-full object-cover" />
        </motion.div>
        <p className="font-display font-700 text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          {currentPuzzle.name[lang]}
        </p>

        <motion.button
          onClick={beginCollecting}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-3.5 rounded-2xl font-display font-900 tracking-widest text-park-bg bg-park-green border-2 border-white/50 shadow-neonGreen"
        >
          {t.revealButton}
        </motion.button>
      </div>
    </div>
  )
}
