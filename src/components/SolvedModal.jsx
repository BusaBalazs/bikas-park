import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'

export default function SolvedModal() {
  const { t, lang, lastSolvedPuzzle, continueAfterSolve } = useGame()
  const sound = useSound()
  const fired = useRef(false)

  useEffect(() => {
    if (!lastSolvedPuzzle || fired.current) return
    fired.current = true
    sound.victory()
    const colors = ['#3CFF9A', '#35E6FF', '#FFC93F']
    confetti({ particleCount: 110, spread: 80, origin: { y: 0.4 }, colors })
  }, [lastSolvedPuzzle, sound])

  useEffect(() => {
    if (!lastSolvedPuzzle) fired.current = false
  }, [lastSolvedPuzzle])

  return (
    <AnimatePresence>
      {lastSolvedPuzzle && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="rounded-3xl p-5 max-w-xs w-full flex flex-col items-center gap-4 text-center bg-park-bg2 border-[3px] border-park-green"
          >
            <h1 className="font-display font-900 text-2xl text-park-green drop-shadow-[0_0_14px_rgba(60,255,154,0.6)]">
              {t.solvedTitle}
            </h1>
            <div className="w-48 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/30">
              <img src={lastSolvedPuzzle.image} alt={lastSolvedPuzzle.name[lang]} className="w-full h-full object-cover" />
            </div>
            <p className="font-display font-700 text-white text-sm">{lastSolvedPuzzle.name[lang]}</p>
            <p className="text-xs text-park-dim">{t.solvedBody}</p>

            <motion.button
              onClick={continueAfterSolve}
              whileTap={{ scale: 0.94 }}
              className="w-full py-3.5 rounded-2xl font-display font-900 tracking-widest text-park-bg bg-park-green border-2 border-white/40 shadow-neonGreen"
            >
              {t.continueBtn}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
