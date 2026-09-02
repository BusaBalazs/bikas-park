import { motion, AnimatePresence } from 'framer-motion'
import BullMascot from './BullMascot'

// A bull mascot + speech bubble pair. `text` changing (or `bubbleKey`)
// re-triggers the bubble's pop-in animation. `action`/`actionKey` drive the
// mascot's current animation (see BullMascot).
export default function MascotBubble({
  text,
  bubbleKey,
  action = 'idle',
  actionKey = 0,
  size = 108,
  align = 'left', // 'left' = mascot left, bubble right | 'right' = mirrored
  onDismiss,
  children, // optional extra content under the text (e.g. Next/Start button)
}) {
  return (
    <div className={`flex items-end gap-2 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="shrink-0 mascot-pop-in">
        <BullMascot action={action} actionKey={actionKey} size={size} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={bubbleKey}
          initial={{ opacity: 0, scale: 0.7, x: align === 'right' ? 20 : -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={onDismiss}
          className="relative max-w-[220px] rounded-2xl px-4 py-3 bg-white text-park-bg2 shadow-lg"
        >
          <div
            className={`absolute bottom-3 w-3 h-3 bg-white rotate-45 ${
              align === 'right' ? '-right-1.5' : '-left-1.5'
            }`}
          />
          <p className="relative text-sm font-medium leading-snug">{text}</p>
          {children && <div className="relative mt-2">{children}</div>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
