import { useEffect, useRef } from 'react'

// Restarts a CSS animation on an element without ever removing it from the
// DOM (toggle animation off, force a reflow, toggle it back on) — safer
// than key-based remounting, which risked a visible flicker/disappear when
// combined with a screen transition happening at the same moment.
function restart(el) {
  if (!el) return
  el.style.animation = 'none'
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight // force reflow
  el.style.animation = ''
}

export default function BullMascot({ action = 'idle', actionKey = 0, size = 128 }) {
  const bodyRef = useRef(null)
  const armRef = useRef(null)
  const winkRef = useRef(null)
  const winkHideRef = useRef(null)

  useEffect(() => {
    restart(bodyRef.current)
    restart(armRef.current)
    restart(winkRef.current)
    restart(winkHideRef.current)
  }, [action, actionKey])

  const bodyClass = action === 'jump' ? 'mascot-jump' : 'mascot-idle'
  const armClass = action === 'wave' ? 'mascot-wave' : ''

  return (
    <svg viewBox="0 0 156 156" width={size} height={size} className="overflow-visible shrink-0">
      <g ref={bodyRef} className={bodyClass}>
        {/* soft ground shadow */}
        <ellipse cx="78" cy="146" rx="30" ry="6" fill="#000" opacity="0.25" />

        {/* legs */}
        <rect x="58" y="118" width="12" height="22" rx="5" fill="#8a5a34" />
        <rect x="86" y="118" width="12" height="22" rx="5" fill="#8a5a34" />
        <ellipse cx="64" cy="140" rx="8" ry="5" fill="#4a2f1c" />
        <ellipse cx="92" cy="140" rx="8" ry="5" fill="#4a2f1c" />

        {/* body */}
        <ellipse cx="78" cy="100" rx="34" ry="30" fill="#c17b3f" />
        <ellipse cx="78" cy="108" rx="22" ry="16" fill="#e8c79a" opacity="0.9" />

        {/* neckerchief - park ranger touch */}
        <path d="M 56 82 Q 78 96 100 82 L 96 74 Q 78 84 60 74 Z" fill="#3CFF9A" stroke="#12C97A" strokeWidth="1.5" />

        {/* left arm (viewer's left, static) */}
        <ellipse cx="42" cy="102" rx="10" ry="18" fill="#c17b3f" transform="rotate(18 42 102)" />

        {/* right arm (viewer's right, waves) */}
        <g ref={armRef} className={armClass}>
          <ellipse cx="114" cy="98" rx="10" ry="18" fill="#c17b3f" />
        </g>

        {/* head */}
        <g>
          {/* horns */}
          <path d="M 46 46 Q 24 30 20 8 Q 40 18 54 40 Z" fill="#f2e8d5" stroke="#c9b68f" strokeWidth="1.5" />
          <path d="M 110 46 Q 132 30 136 8 Q 116 18 102 40 Z" fill="#f2e8d5" stroke="#c9b68f" strokeWidth="1.5" />

          {/* ears */}
          <ellipse cx="38" cy="58" rx="9" ry="12" fill="#c17b3f" transform="rotate(-20 38 58)" />
          <ellipse cx="118" cy="58" rx="9" ry="12" fill="#c17b3f" transform="rotate(20 118 58)" />

          {/* head shape */}
          <circle cx="78" cy="66" r="38" fill="#d68a48" />
          {/* snout */}
          <ellipse cx="78" cy="86" rx="26" ry="20" fill="#f0d3a8" />

          {/* forehead marking */}
          <path d="M 78 34 L 70 50 L 86 50 Z" fill="#3CFF9A" opacity="0.85" />

          {/* eyes (open, default). Fades out briefly during a wink. */}
          <g ref={winkHideRef} className={action === 'wink' ? 'mascot-wink-hide' : ''}>
            <circle cx="62" cy="60" r="8" fill="white" />
            <circle cx="94" cy="60" r="8" fill="white" />
            <circle cx="63" cy="61" r="4.2" fill="#2b1a0f" />
            <circle cx="95" cy="61" r="4.2" fill="#2b1a0f" />
            <circle cx="61.5" cy="59.5" r="1.3" fill="white" />
            <circle cx="93.5" cy="59.5" r="1.3" fill="white" />
          </g>
          {/* wink: left eye stays open, right eye closes (curved line) */}
          {action === 'wink' && (
            <>
              <circle cx="62" cy="60" r="8" fill="white" />
              <circle cx="63" cy="61" r="4.2" fill="#2b1a0f" />
              <circle cx="61.5" cy="59.5" r="1.3" fill="white" />
              <path
                ref={winkRef}
                d="M 87 60 Q 94 66 101 60"
                stroke="#2b1a0f"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                className="mascot-wink"
              />
            </>
          )}

          {/* nostrils */}
          <ellipse cx="70" cy="92" rx="2.4" ry="3.2" fill="#8a5a34" />
          <ellipse cx="86" cy="92" rx="2.4" ry="3.2" fill="#8a5a34" />

          {/* smile */}
          <path d="M 68 98 Q 78 104 88 98" stroke="#8a5a34" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
