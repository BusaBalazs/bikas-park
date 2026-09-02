let sharedCtx = null
function getCtx() {
  if (typeof window === 'undefined') return null
  if (!sharedCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) sharedCtx = new AC()
  }
  return sharedCtx
}

function beep({ freq = 440, duration = 0.12, type = 'sine', gain = 0.06, sweepTo = null }) {
  const ctx = getCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, ctx.currentTime + duration)
  g.gain.setValueAtTime(gain, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

// Mock sound effect bank — synthesized so the prototype needs zero audio assets.
export function useSound() {
  return {
    click: () => beep({ freq: 320, duration: 0.06, type: 'triangle' }),
    success: () => {
      beep({ freq: 523, duration: 0.1, type: 'sine' })
      setTimeout(() => beep({ freq: 784, duration: 0.16, type: 'sine' }), 90)
    },
    fail: () => beep({ freq: 220, duration: 0.35, type: 'sawtooth', sweepTo: 80 }),
    scan: () => beep({ freq: 880, duration: 0.08, type: 'square', gain: 0.04 }),
    spill: () => beep({ freq: 300, duration: 0.25, type: 'sawtooth', sweepTo: 120, gain: 0.08 }),
    screwPop: () => beep({ freq: 180, duration: 0.15, type: 'square', gain: 0.07 }),
    bullAlarm: () => beep({ freq: 660, duration: 0.5, type: 'square', gain: 0.09, sweepTo: 220 }),
    victory: () => {
      ;[523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep({ freq: f, duration: 0.2 }), i * 110))
    },
  }
}
