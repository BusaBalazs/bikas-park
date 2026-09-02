import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import MascotBubble from './MascotBubble'

// Pairs each rule line with an animation that supports what it's saying.
const STEP_ACTIONS = ['wave', 'jump', 'jump', 'wink', 'jump', 'wave']

export default function Onboarding() {
  const { t, completeOnboarding } = useGame()
  const [step, setStep] = useState(0)
  const [actionKey, setActionKey] = useState(0)

  const rules = t.onboardingRules
  const isLast = step === rules.length - 1

  function next() {
    if (isLast) {
      completeOnboarding()
      return
    }
    setStep((s) => s + 1)
    setActionKey((k) => k + 1)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <img
        src="/images/landing-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-6 max-w-sm w-full"
      >
        <MascotBubble
          text={rules[step]}
          bubbleKey={step}
          action={STEP_ACTIONS[step % STEP_ACTIONS.length]}
          actionKey={actionKey}
          size={116}
        />

        <motion.button
          onClick={next}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-3.5 rounded-2xl font-display font-900 tracking-widest text-park-bg bg-park-green border-2 border-white/50 shadow-neonGreen"
        >
          {isLast ? t.btnStart : t.btnNext}
        </motion.button>

        <div className="flex gap-1.5">
          {rules.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-park-green' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
