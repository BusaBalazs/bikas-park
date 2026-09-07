import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { PUZZLE_CATALOG } from '../data/puzzles'
import MascotBubble from './MascotBubble'

// Shown right after onboarding (and again after finishing a round) so the
// player can pick which themed set of pictures to collect next. Cards are
// data-driven from data/categories.js — adding a category there (plus
// tagging its puzzles in data/puzzles.js) is enough for it to show up here.
export default function CategorySelect() {
  const { t, lang, categories, album, chooseCategory } = useGame()

  return (
    <div className="relative min-h-screen flex flex-col items-center px-5 pt-8 pb-12">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
        draggable={false}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />

      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full">
        <h1 className="font-display font-900 text-xl text-white text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          {t.categorySelectTitle}
        </h1>

        <MascotBubble text={t.mascotCategoryPrompt} bubbleKey="category-prompt" action="wave" size={92} />

        <div className="flex flex-col gap-5 w-full">
          {categories.map((cat, i) => {
            const puzzlesInCat = PUZZLE_CATALOG.filter((p) => p.category === cat.id)
            const owned = puzzlesInCat.filter((p) => album[p.id]).length

            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => chooseCategory(cat.id)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 220, damping: 20 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className="category-border w-full text-left block"
                style={{ '--cat-a': cat.accent, '--cat-b': cat.accent2 }}
              >
                {/* Layered card: image + gradient + content all share one
                    grid cell, so nothing here needs position:absolute. */}
                <div className="grid rounded-[1.1rem] overflow-hidden aspect-[16/10] bg-park-bg2">
                  <img
                    src={cat.bg}
                    alt=""
                    className="[grid-area:1/1] w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="[grid-area:1/1] bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="[grid-area:1/1] flex flex-col justify-between p-4">
                    <span
                      className="self-end px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-black/50 backdrop-blur-sm border"
                      style={{ borderColor: cat.accent, color: cat.accent }}
                    >
                      {owned}/{puzzlesInCat.length}
                    </span>
                    <h2 className="font-display font-900 text-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                      {cat.name[lang]}
                    </h2>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <p className="text-xs text-white/60 text-center">{t.categorySelectHint}</p>
      </div>
    </div>
  )
}
