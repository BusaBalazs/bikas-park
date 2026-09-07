import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import ParkMap from './ParkMap'
import MascotBubble from './MascotBubble'
import { PIECE_TIME_LIMIT_SECONDS } from '../data/gameConfig'

export default function ParkMonitor() {
  const { t, currentRound, piecesNeeded, currentTargetCode, timeLeft, mascot, openScan } = useGame()

  if (!currentRound) return null

  const timePct = (timeLeft / PIECE_TIME_LIMIT_SECONDS) * 100
  const timerColor = timeLeft > 40 ? '#3CFF9A' : timeLeft > 15 ? '#FFC93F' : '#FF3B5C'
  const mm = Math.floor(timeLeft / 60)
  const ss = String(timeLeft % 60).padStart(2, '0')

  return (
    <div className="relative min-h-[calc(100vh-57px)]">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/45 via-black/40 to-black/70" />

      <div className="relative z-10 pt-6 px-4 sm:px-6 flex flex-col gap-5 max-w-lg mx-auto">
        <MascotBubble
          text={mascot.text}
          bubbleKey={mascot.actionKey}
          action={mascot.action}
          actionKey={mascot.actionKey}
          tone={mascot.tone}
          size={88}
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-3.5 bg-black/35 backdrop-blur-sm border border-white/15">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">{t.pieceTimer}</span>
              <span className="font-display text-sm font-900" style={{ color: timerColor }}>
                {mm}:{ss}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-black/40 overflow-hidden border border-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: timerColor }}
                animate={{ width: `${timePct}%` }}
                transition={{ duration: 0.4, ease: 'linear' }}
              />
            </div>
          </div>

          <div className="rounded-2xl p-3.5 bg-black/35 backdrop-blur-sm border border-white/15 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold mb-1">
              {t.pieceProgress}
            </span>
            <span className="font-display text-2xl font-900 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              {currentRound.collectedCount} / {piecesNeeded}
            </span>
          </div>
        </div>

        <div className="rounded-3xl p-4 bg-black/35 backdrop-blur-sm border border-white/15">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">{t.stations}</span>
            <span className="font-display font-900 text-park-red text-sm">#{currentTargetCode}</span>
          </div>
          <ParkMap />
        </div>

        <motion.button
          onClick={openScan}
          whileTap={{ scale: 0.93 }}
          className="self-center mt-1 mb-8 px-8 py-4 rounded-full font-display font-900 tracking-widest text-park-bg bg-park-cyan border-2 border-white/50 shadow-neonCyan flex items-center gap-2"
        >
          <span className="text-lg">📷</span>
          {t.scanForPiece}
        </motion.button>
      </div>
    </div>
  )
}
