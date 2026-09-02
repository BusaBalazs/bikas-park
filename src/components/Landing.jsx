import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import Onboarding from './Onboarding'
import MascotBubble from './MascotBubble'

export default function Landing() {
  const { t, hasSeenOnboarding, enterReturning } = useGame()

  if (!hasSeenOnboarding) return <Onboarding />

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <img
        src="/images/landing-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />

      <div className="relative flex-1 flex flex-col items-center justify-end px-6 pt-6 pb-14 text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5 max-w-xl rounded-3xl bg-black/35 backdrop-blur-sm border border-white/10 px-5 py-6"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-900 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t.welcomeBackTitle}
          </h1>
          <MascotBubble text={t.welcomeBackBody} bubbleKey="wb" action="wave" size={92} />
        </motion.div>

        <motion.button
          onClick={enterReturning}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 },
            scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className="relative px-10 py-4 rounded-2xl font-display font-900 text-lg tracking-widest text-park-bg bg-park-green border-2 border-white/60 shadow-neonGreen"
        >
          {t.welcomeBackButton}
        </motion.button>
      </div>
    </div>
  )
}
