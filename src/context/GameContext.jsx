import { createContext, useContext, useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { translations, detectLang } from '../i18n'
import { PUZZLE_CATALOG } from '../data/puzzles'
import { CATEGORIES } from '../data/categories'
import { PIECE_TIME_LIMIT_SECONDS, TOTAL_STATIONS } from '../data/gameConfig'
import { stationQrCode } from '../data/pieceStations'
import { useSound } from '../hooks/useSound'
import { useHaptics } from '../hooks/useHaptics'
import { loadState, saveState } from '../utils/persistence'

const GameContext = createContext(null)

function shuffledCodes() {
  const arr = Array.from({ length: TOTAL_STATIONS }, (_, i) => i + 1)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Restricts the catalog to one category (when given), then prefers pieces
// the player doesn't own yet — falling back to the full in-category pool
// once everything in it is already collected (so replaying a category
// with just one image still starts a round instead of dead-ending).
function pickNextPuzzle(album, categoryId) {
  const inCategory = categoryId ? PUZZLE_CATALOG.filter((p) => p.category === categoryId) : PUZZLE_CATALOG
  const unowned = inCategory.filter((p) => !album[p.id])
  const pool = unowned.length > 0 ? unowned : inCategory
  return pool[Math.floor(Math.random() * pool.length)]
}

const persisted = loadState()

export function GameProvider({ children }) {
  const [lang, setLang] = useState(persisted?.lang ?? detectLang())
  const [devMode, setDevMode] = useState(false)
  // landing | onboarding | categorySelect | reveal | monitor | scan | quiz | assemble | gallery
  const [screen, setScreen] = useState('landing')

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(persisted?.hasSeenOnboarding ?? false)
  const [album, setAlbum] = useState(persisted?.album ?? {})
  const [currentRound, setCurrentRound] = useState(persisted?.currentRound ?? null)
  const [targetDeadline, setTargetDeadline] = useState(persisted?.targetDeadline ?? null)
  const [timeLeft, setTimeLeft] = useState(PIECE_TIME_LIMIT_SECONDS)
  const [albumButtonPos, setAlbumButtonPos] = useState(persisted?.albumButtonPos ?? null)
  const [lastSolvedPuzzle, setLastSolvedPuzzle] = useState(null) // shown in the success popup
  const [mascot, setMascot] = useState({ text: '', action: 'idle', actionKey: 0, tone: 'default' })
  const [preGalleryScreen, setPreGalleryScreen] = useState('monitor')
  const [currentQuiz, setCurrentQuiz] = useState(null) // { question, options, correct }
  const [quizWrongIndex, setQuizWrongIndex] = useState(null)
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(null)

  const timerInterval = useRef(null)
  const sound = useSound()
  const haptics = useHaptics()

  const t = useMemo(() => translations[lang], [lang])

  useEffect(() => {
    saveState({ lang, hasSeenOnboarding, album, currentRound, targetDeadline, albumButtonPos })
  }, [lang, hasSeenOnboarding, album, currentRound, targetDeadline, albumButtonPos])

  const toggleLang = useCallback(() => setLang((l) => (l === 'hu' ? 'en' : 'hu')), [])

  // `tone` lets a message stand out as a warning (e.g. a wrong QR scan)
  // without needing a whole separate mascot state — it resets to 'default'
  // on the next say() unless that call passes 'warning' again.
  const say = useCallback((text, action = 'idle', tone = 'default') => {
    setMascot((m) => ({ text, action, tone, actionKey: m.actionKey + 1 }))
  }, [])

  const currentPuzzle = currentRound ? PUZZLE_CATALOG.find((p) => p.id === currentRound.puzzleId) : null
  const piecesNeeded = currentPuzzle ? currentPuzzle.rows * currentPuzzle.cols : 0
  const currentTargetCode = currentRound ? currentRound.pieceOrder[currentRound.pointer] : null

  const startNewRound = useCallback(
    (categoryId) => {
      const puzzle = pickNextPuzzle(album, categoryId)
      const round = { puzzleId: puzzle.id, pieceOrder: shuffledCodes(), pointer: 0, collectedCount: 0 }
      setCurrentRound(round)
      setTargetDeadline(Date.now() + PIECE_TIME_LIMIT_SECONDS * 1000)
      setScreen('reveal')
      say(t.mascotReveal.replace('{puzzle}', puzzle.name[lang]), 'jump')
    },
    [album, lang, t, say]
  )

  // Called from the category-select card grid. currentPuzzle's own
  // `category` field is enough to resume the right pool on reload, so we
  // don't need to persist the chosen category separately.
  const chooseCategory = useCallback((categoryId) => startNewRound(categoryId), [startNewRound])

  const beginCollecting = useCallback(() => {
    setScreen('monitor')
    // Reset the deadline here (not just at round start) — otherwise time
    // spent reading the Reveal screen would silently eat into the first
    // piece's timer.
    setTargetDeadline(Date.now() + PIECE_TIME_LIMIT_SECONDS * 1000)
    say(t.mascotGoScan, 'wave')
  }, [say, t])

  // First-run onboarding — rules end with a category pick, not straight
  // into a round.
  const completeOnboarding = useCallback(() => {
    setHasSeenOnboarding(true)
    setScreen('categorySelect')
  }, [])

  const enterReturning = useCallback(() => {
    if (currentRound) {
      // Resuming straight into the map screen — without this the mascot
      // bubble there stays empty (its text only ever gets set by say(),
      // and nothing had called it yet this session) until the next game
      // action happens to update it.
      setScreen('monitor')
      say(t.mascotGoScan, 'wave')
    } else {
      setScreen('categorySelect')
    }
  }, [currentRound, say, t])

  const openScan = useCallback(() => setScreen('scan'), [])
  const closeScan = useCallback(() => setScreen('monitor'), [])

  const skipCurrentTarget = useCallback(
    (reason) => {
      setCurrentRound((prev) => {
        if (!prev) return prev
        let nextPointer = prev.pointer + 1
        let pieceOrder = prev.pieceOrder
        if (nextPointer >= pieceOrder.length) {
          pieceOrder = shuffledCodes()
          nextPointer = 0
        }
        return { ...prev, pointer: nextPointer, pieceOrder }
      })
      setTargetDeadline(Date.now() + PIECE_TIME_LIMIT_SECONDS * 1000)
      if (reason === 'timeout') {
        haptics.warning()
        say(t.mascotTimeout, 'idle')
      }
    },
    [say, t, haptics]
  )

  const handleScanSuccess = useCallback(
    (text) => {
      if (!currentRound) return false
      if (text.trim() !== stationQrCode(currentTargetCode)) {
        // Valid scan, just not today's target — send them back to the map
        // with a clear "wrong station" nudge instead of a silent no-op.
        haptics.warning()
        say(t.mascotWrongCode, 'idle', 'warning')
        return false
      }
      sound.scan()
      haptics.success()

      // The actual state transition is delayed slightly so the QR modal's
      // success checkmark has time to show before the screen changes away
      // from it (the boolean return below is synchronous, for the modal's
      // own immediate "correct code" feedback). A correct, in-time scan
      // leads into a topic quiz — the piece itself is only credited once
      // the player answers correctly (see answerQuiz).
      setTimeout(() => {
        const pool = currentPuzzle?.quiz || []
        const q = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null
        setQuizWrongIndex(null)
        setQuizCorrectIndex(null)
        setCurrentQuiz(q)
        setScreen('quiz')
        say(t.quizIntro, 'jump')
      }, 550)
      return true
    },
    [currentRound, currentTargetCode, currentPuzzle, sound, haptics, say, t]
  )

  const creditPiece = useCallback(() => {
    if (!currentRound) return
    const nextCollected = currentRound.collectedCount + 1
    const willComplete = nextCollected >= piecesNeeded

    if (willComplete) {
      setCurrentRound((prev) => ({ ...prev, collectedCount: nextCollected }))
      setScreen('monitor')
      say(t.mascotAllPieces, 'jump')
      setTimeout(() => setScreen('assemble'), 700)
    } else {
      let nextPointer = currentRound.pointer + 1
      let pieceOrder = currentRound.pieceOrder
      if (nextPointer >= pieceOrder.length) {
        pieceOrder = shuffledCodes()
        nextPointer = 0
      }
      setCurrentRound({ ...currentRound, collectedCount: nextCollected, pointer: nextPointer, pieceOrder })
      setTargetDeadline(Date.now() + PIECE_TIME_LIMIT_SECONDS * 1000)
      setScreen('monitor')
      say(t.mascotPieceGot, 'jump')
    }
  }, [currentRound, piecesNeeded, say, t])

  const answerQuiz = useCallback(
    (optionIndex) => {
      if (!currentQuiz || quizCorrectIndex !== null) return
      if (optionIndex === currentQuiz.correct) {
        sound.success()
        haptics.success()
        const lines = t.mascotQuizCorrect
        say(lines[Math.floor(Math.random() * lines.length)], 'jump')
        setQuizWrongIndex(null)
        setQuizCorrectIndex(optionIndex)
        setTimeout(() => {
          setCurrentQuiz(null)
          creditPiece()
        }, 900)
      } else {
        sound.fail()
        haptics.warning()
        setQuizWrongIndex(optionIndex)
        const lines = t.mascotQuizWrong
        say(lines[Math.floor(Math.random() * lines.length)], 'wink')
      }
    },
    [currentQuiz, quizCorrectIndex, sound, haptics, say, t, creditPiece]
  )

  // Countdown ticking down to targetDeadline — keeps running while the QR
  // scan modal is open too (it's an overlay on top of 'monitor', not a
  // separate screen), otherwise leaving the scanner open would pause time.
  useEffect(() => {
    if (!['monitor', 'scan'].includes(screen) || !targetDeadline) {
      clearInterval(timerInterval.current)
      return
    }
    timerInterval.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((targetDeadline - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) {
        skipCurrentTarget('timeout')
      }
    }, 500)
    return () => clearInterval(timerInterval.current)
  }, [screen, targetDeadline, skipCurrentTarget])

  const completeAssembly = useCallback(() => {
    if (!currentRound) return
    const puzzle = currentPuzzle
    setAlbum((prev) => ({ ...prev, [puzzle.id]: true }))
    setLastSolvedPuzzle(puzzle)
    setCurrentRound(null)
    setTargetDeadline(null)
    sound.victory()
    haptics.success()
  }, [currentRound, currentPuzzle, sound, haptics])

  const goToAlbumAfterSolve = useCallback(() => {
    setLastSolvedPuzzle(null)
    // Bypass openGallery's usual "remember current screen" capture: after
    // finishing a round there's no round screen worth returning to, so the
    // album's own "back to park" should land on the category picker.
    setPreGalleryScreen('categorySelect')
    setScreen('gallery')
  }, [])

  const openGallery = useCallback(() => {
    setPreGalleryScreen((prev) => (screen === 'gallery' ? prev : screen))
    setScreen('gallery')
  }, [screen])
  const closeGallery = useCallback(() => setScreen(preGalleryScreen), [preGalleryScreen])

  const saveAlbumButtonPos = useCallback((pos) => setAlbumButtonPos(pos), [])

  const totalOwned = Object.keys(album).length

  const value = {
    lang,
    t,
    toggleLang,
    devMode,
    setDevMode,
    screen,
    setScreen,
    hasSeenOnboarding,
    completeOnboarding,
    enterReturning,
    categories: CATEGORIES,
    chooseCategory,
    album,
    totalOwned,
    currentRound,
    currentPuzzle,
    piecesNeeded,
    currentTargetCode,
    timeLeft,
    mascot,
    say,
    beginCollecting,
    openScan,
    closeScan,
    handleScanSuccess,
    currentQuiz,
    quizWrongIndex,
    quizCorrectIndex,
    answerQuiz,
    completeAssembly,
    lastSolvedPuzzle,
    goToAlbumAfterSolve,
    openGallery,
    closeGallery,
    albumButtonPos,
    saveAlbumButtonPos,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
