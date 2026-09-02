import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { PUZZLE_CATALOG } from '../data/puzzles'

export default function CardGallery() {
  const { t, lang, album, totalOwned, closeGallery } = useGame()
  const [opened, setOpened] = useState(null) // puzzle object or null

  return (
    <div className="relative min-h-screen">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/75" />

      <div className="relative pt-6 pb-10 px-4 sm:px-6 flex flex-col gap-5 max-w-lg mx-auto">
        <div className="rounded-2xl p-4 bg-black/35 backdrop-blur-sm border border-white/15 flex items-center justify-between">
          <div>
            <h1 className="font-display font-900 text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {t.galleryTitle}
            </h1>
            <p className="text-xs text-white/70 mt-0.5">
              {totalOwned} / {PUZZLE_CATALOG.length}
            </p>
          </div>
        </div>

        {totalOwned === 0 ? (
          <div className="rounded-2xl p-6 bg-black/35 backdrop-blur-sm border border-white/15 text-center text-sm text-white/80">
            {t.galleryEmpty}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {PUZZLE_CATALOG.map((puzzle, i) => {
              const owned = !!album[puzzle.id]
              return (
                <motion.button
                  key={puzzle.id}
                  onClick={() => owned && setOpened(puzzle)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={owned ? { scale: 0.96 } : undefined}
                  className={`relative rounded-2xl overflow-hidden border-2 aspect-[3/4] ${
                    owned ? 'border-park-amber shadow-neonAmber' : 'border-white/15'
                  }`}
                >
                  <img
                    src={puzzle.image}
                    alt={owned ? puzzle.name[lang] : ''}
                    className={`absolute inset-0 w-full h-full object-cover ${owned ? '' : 'grayscale brightness-[0.3]'}`}
                  />
                  {owned ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <p className="absolute bottom-2 left-2 right-2 font-display font-900 text-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {puzzle.name[lang]}
                      </p>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                      <span className="text-2xl">🔒</span>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wide">
                        {t.galleryLocked}
                      </span>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        )}

        <motion.button
          onClick={closeGallery}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3.5 rounded-2xl font-display font-900 tracking-widest text-park-bg bg-park-green border-2 border-white/40 shadow-neonGreen"
        >
          {t.galleryClose}
        </motion.button>
      </div>

      {/* Lightbox: enlarged image + info text */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl overflow-hidden max-w-sm w-full bg-park-bg2 border-[3px] border-park-amber shadow-glass flex flex-col"
            >
              <div className="w-full aspect-[3/4]">
                <img src={opened.image} alt={opened.name[lang]} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h2 className="font-display font-900 text-lg text-white">{opened.name[lang]}</h2>
                <p className="text-sm text-park-dim leading-relaxed">{opened.info[lang]}</p>
                <button
                  onClick={() => setOpened(null)}
                  className="mt-2 py-3 rounded-2xl font-display font-700 text-sm text-park-dim bg-white/5 border border-white/10"
                >
                  {t.galleryClose}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
