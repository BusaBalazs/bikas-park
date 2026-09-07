import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QrScanner from 'qr-scanner'
import { useGame } from '../context/GameContext'
import { stationQrCode } from '../data/pieceStations'

export default function QRScanModal() {
  const { screen, t, devMode, currentTargetCode, handleScanSuccess, closeScan } = useGame()
  const open = screen === 'scan'
  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | scanning | error | wrong | success

  const targetRef = useRef(currentTargetCode)
  const statusRef = useRef(status)
  useEffect(() => {
    targetRef.current = currentTargetCode
  }, [currentTargetCode])
  useEffect(() => {
    statusRef.current = status
  }, [status])

  const wrongTimerRef = useRef(null)

  function handleDecoded(text) {
    if (statusRef.current === 'success' || statusRef.current === 'wrong') return
    const ok = handleScanSuccess(text)
    if (ok) {
      setStatus('success')
      scannerRef.current?.stop()
    } else {
      setStatus('wrong')
      scannerRef.current?.stop()
      clearTimeout(wrongTimerRef.current)
      // Brief red ❌ flash in-camera, then back to the map — the mascot
      // bubble there now carries the "wrong station, check the map"
      // message set by handleScanSuccess.
      wrongTimerRef.current = setTimeout(() => closeScan(), 1100)
    }
  }

  // Create + start the scanner fresh every time the modal opens, and fully
  // tear it down (stop + destroy, releasing the camera stream) every time
  // it closes. This matters for two reasons, both bugs seen in practice:
  //  1. The <video> element itself unmounts with the modal (it only exists
  //     in the DOM while `open` is true), so a scanner instance kept across
  //     opens would stay bound to a detached, invisible old <video> — it
  //     kept decoding frames from that orphaned element while the new,
  //     visible one never got a camera stream attached to it.
  //  2. The onDecode callback closes over `handleScanSuccess`, which
  //     changes identity every time the target piece advances. A scanner
  //     reused across opens kept the *first* closure forever, so it went
  //     on checking scans against the very first target code even after
  //     later pieces made it stale.
  // Recreating on every open sidesteps both: each session gets a scanner
  // bound to that render's real <video> element and current target code.
  useEffect(() => {
    clearTimeout(wrongTimerRef.current)

    if (!open) return
    if (devMode) {
      setStatus('idle')
      return
    }
    if (!videoRef.current) return

    setStatus('scanning')

    const scanner = new QrScanner(videoRef.current, (result) => handleDecoded(result.data), {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
      preferredCamera: 'environment',
    })
    scannerRef.current = scanner
    scanner.start().catch(() => setStatus('error'))

    return () => {
      scanner.stop()
      scanner.destroy()
      if (scannerRef.current === scanner) scannerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, devMode])

  function devSuccess() {
    if (status === 'success') return
    setStatus('success')
    handleScanSuccess(stationQrCode(targetRef.current))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-3xl p-6 max-w-sm w-full bg-park-bg2 border-[3px] border-white/20 shadow-glass flex flex-col items-center gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-park-border flex items-center justify-center">
              {!devMode && status !== 'error' && (
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
              )}

              {(devMode || status === 'error') && (
                <div className="flex flex-col items-center gap-2 text-park-dim px-6 text-center">
                  <span className="text-4xl">📷</span>
                  <p className="text-xs">{devMode ? t.devModeOn : t.cameraFallback}</p>
                </div>
              )}

              <div
                className={`absolute inset-8 border-2 rounded-2xl pointer-events-none transition-colors ${
                  status === 'wrong' ? 'border-park-red' : 'border-park-cyan/70'
                }`}
              >
                <ScanCorner className="top-0 left-0" />
                <ScanCorner className="top-0 right-0 rotate-90" />
                <ScanCorner className="bottom-0 right-0 rotate-180" />
                <ScanCorner className="bottom-0 left-0 -rotate-90" />
                {status === 'scanning' && !devMode && (
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-park-cyan shadow-neonCyan"
                    animate={{ top: ['5%', '95%', '5%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-park-green/20"
                >
                  <span className="text-5xl">✅</span>
                </motion.div>
              )}
              {status === 'wrong' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-park-red/20"
                >
                  <span className="text-5xl">❌</span>
                </motion.div>
              )}
            </div>

            <p className="text-sm text-park-dim">
              {status === 'success' ? t.scanSuccess : status === 'wrong' ? t.scanWrongCode : t.scanning}
            </p>

            {devMode && status !== 'success' && (
              <motion.button
                onClick={devSuccess}
                whileTap={{ scale: 0.94 }}
                className="w-full py-3.5 rounded-2xl font-display font-700 tracking-wide text-park-bg bg-gradient-to-r from-park-amber to-park-red shadow-neonAmber"
              >
                {t.devScanBtn}
              </motion.button>
            )}

            <button onClick={closeScan} className="text-xs text-park-dim underline underline-offset-2">
              {t.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ScanCorner({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={`absolute w-5 h-5 text-park-cyan ${className}`}>
      <path d="M0 8 V2 A2 2 0 0 1 2 0 H8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
