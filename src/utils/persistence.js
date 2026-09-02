const STORAGE_KEY = 'bikas-park-save-v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed
  } catch (e) {
    // localStorage unavailable (private mode, disabled, etc.) — fail silently,
    // the game still works, it just won't remember progress between visits.
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    // Storage full or unavailable — nothing we can do, just skip saving.
  }
}
