import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useSound } from '../hooks/useSound'
import { useHaptics } from '../hooks/useHaptics'
import MascotBubble from './MascotBubble'

function shuffleTiles(n) {
  const arr = Array.from({ length: n }, (_, i) => i)
  let attempts = 0
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    attempts++
  } while (arr.every((v, i) => v === i) && attempts < 10) // avoid an already-solved shuffle
  return arr
}

export default function PuzzleAssembly() {
  const { t, currentPuzzle, completeAssembly } = useGame()
  const sound = useSound()
  const haptics = useHaptics()

  const rows = currentPuzzle?.rows || 4
  const cols = currentPuzzle?.cols || 2
  const total = rows * cols

  const [tiles, setTiles] = useState(() => shuffleTiles(total))
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)

  // Reset if the puzzle changes (e.g. a new round starts a different image)
  useEffect(() => {
    setTiles(shuffleTiles(total))
    setSelected(null)
    setSolved(false)
  }, [currentPuzzle?.id, total])

  const isSolved = useCallback((arr) => arr.every((v, i) => v === i), [])

  function tapTile(pos) {
    if (solved) return
    if (selected === null) {
      setSelected(pos)
      sound.click()
      haptics.tick()
      return
    }
    if (selected === pos) {
      setSelected(null)
      return
    }
    setTiles((prev) => {
      const next = [...prev]
      ;[next[selected], next[pos]] = [next[pos], next[selected]]
      if (isSolved(next)) {
        setSolved(true)
        sound.success()
        haptics.success()
        setTimeout(() => completeAssembly(), 900)
      } else {
        sound.click()
        haptics.tick()
      }
      return next
    })
    setSelected(null)
  }

  if (!currentPuzzle) return null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-6 gap-5">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
        draggable={false}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />

      <h1 className="font-display font-900 text-lg text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
        {t.assembleTitle}
      </h1>
      <p className="text-xs text-white/70 -mt-3">{t.assembleHint}</p>

      <div
        className="grid gap-1 p-1.5 rounded-2xl bg-black/40 border-2 border-white/15"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
          width: 'min(78vw, 320px)',
          aspectRatio: `${cols} / ${rows}`,
        }}
      >
        {tiles.map((correctIndex, pos) => {
          const inPlace = correctIndex === pos
          // Each puzzle tile is its own dedicated image (currentPuzzle.pieces),
          // not a slice of the finished album picture — so the player is
          // matching tiles back to their original grid slot, not
          // reconstructing the reveal photo itself.
          return (
            <motion.button
              key={pos}
              layout
              onClick={() => tapTile(pos)}
              whileTap={{ scale: 0.93 }}
              className={`relative rounded-md overflow-hidden border-2 transition-colors ${
                selected === pos
                  ? 'border-park-cyan shadow-neonCyan z-10'
                  : inPlace
                  ? 'border-park-green/70'
                  : 'border-white/10'
              }`}
              style={{
                backgroundImage: `url(${currentPuzzle.pieces[correctIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )
        })}
      </div>

      <MascotBubble
        text={solved ? t.solvedTitle : t.assembleHint}
        bubbleKey={solved ? 'solved' : 'assembling'}
        action={solved ? 'jump' : 'idle'}
        size={80}
      />
    </div>
  )
}
