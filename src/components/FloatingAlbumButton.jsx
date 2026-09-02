import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export default function FloatingAlbumButton() {
  const { screen, totalOwned, openGallery, albumButtonPos, saveAlbumButtonPos } = useGame()

  // Hidden during the puzzle minigame, on landing/onboarding, and while the
  // gallery itself is open.
  if (!['monitor', 'reveal', 'scan', 'quiz'].includes(screen)) return null

  const offset = albumButtonPos || { x: 0, y: 0 }

  return (
    <motion.button
      drag
      dragMomentum={false}
      dragElastic={0.05}
      onDragEnd={(_, info) => {
        saveAlbumButtonPos({ x: offset.x + info.offset.x, y: offset.y + info.offset.y })
      }}
      onClick={openGallery}
      animate={{ x: offset.x, y: offset.y }}
      style={{ position: 'fixed', right: 16, bottom: 20, zIndex: 35 }}
      whileTap={{ scale: 0.92 }}
      className="w-14 h-14 rounded-full bg-park-amber border-2 border-white/60 shadow-neonAmber flex items-center justify-center text-2xl touch-none"
    >
      🃏
      {totalOwned > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-park-red text-white text-[10px] font-bold flex items-center justify-center border border-white/70">
          {totalOwned}
        </span>
      )}
    </motion.button>
  )
}
