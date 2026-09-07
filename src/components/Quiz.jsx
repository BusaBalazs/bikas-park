import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import MascotBubble from './MascotBubble'

export default function Quiz() {
  const { t, lang, currentQuiz, quizWrongIndex, quizCorrectIndex, answerQuiz, mascot } = useGame()
  if (!currentQuiz) return null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-6 gap-5">
      <img
        src="/images/game-bg-blur.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />

      <div className="relative flex flex-col items-center gap-5 max-w-sm w-full">
        <MascotBubble text={mascot.text} bubbleKey={mascot.actionKey} action={mascot.action} actionKey={mascot.actionKey} size={92} />

        <div className="w-full rounded-3xl p-5 bg-park-bg2 border-[3px] border-white/20 shadow-glass flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-wider text-park-cyan font-bold">{t.quizTitle}</span>
          <h2 className="font-display font-900 text-base text-white leading-snug">
            {currentQuiz.question[lang]}
          </h2>

          <div className="flex flex-col gap-2.5">
            {currentQuiz.options.map((opt, i) => {
              const isWrong = quizWrongIndex === i
              const isCorrect = quizCorrectIndex === i
              return (
                <motion.button
                  key={i}
                  onClick={() => answerQuiz(i)}
                  whileTap={{ scale: 0.97 }}
                  animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`px-4 py-3 rounded-2xl border-2 text-sm font-bold text-left transition-colors ${
                    isWrong
                      ? 'bg-park-red/25 border-park-red text-white'
                      : isCorrect
                      ? 'bg-park-green/25 border-park-green text-white'
                      : 'bg-white/5 border-white/15 text-white'
                  }`}
                >
                  {opt[lang]}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
