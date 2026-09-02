export function useHaptics() {
  const vibrate = (pattern) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern)
      }
    } catch (e) {
      // Haptics unsupported (desktop / iOS Safari) — silently ignore.
    }
  }

  return {
    tick: () => vibrate(15),
    success: () => vibrate([20, 40, 20]),
    warning: () => vibrate([40, 30, 40]),
    fail: () => vibrate([80, 50, 80, 50, 120]),
    continuous: (ms) => vibrate(ms),
    stop: () => vibrate(0),
  }
}
