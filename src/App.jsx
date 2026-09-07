import { AnimatePresence, motion } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import Header from './components/Header'
import Landing from './components/Landing'
import CategorySelect from './components/CategorySelect'
import Reveal from './components/Reveal'
import ParkMonitor from './components/ParkMonitor'
import Quiz from './components/Quiz'
import QRScanModal from './components/QRScanModal'
import PuzzleAssembly from './components/PuzzleAssembly'
import SolvedModal from './components/SolvedModal'
import CardGallery from './components/CardGallery'
import FloatingAlbumButton from './components/FloatingAlbumButton'

function Root() {
  const { screen } = useGame()

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />

      <main className="relative">
        <AnimatePresence>
          {screen === 'landing' && (
            <motion.div
              key="landing"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Landing />
            </motion.div>
          )}
          {screen === 'categorySelect' && (
            <motion.div
              key="categorySelect"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CategorySelect />
            </motion.div>
          )}
          {screen === 'reveal' && (
            <motion.div
              key="reveal"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Reveal />
            </motion.div>
          )}
          {(screen === 'monitor' || screen === 'scan') && (
            <motion.div
              key="monitor"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ParkMonitor />
            </motion.div>
          )}
          {screen === 'quiz' && (
            <motion.div
              key="quiz"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Quiz />
            </motion.div>
          )}
          {screen === 'assemble' && (
            <motion.div
              key="assemble"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PuzzleAssembly />
            </motion.div>
          )}
          {screen === 'gallery' && (
            <motion.div
              key="gallery"
              className="min-h-[calc(100vh-57px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <QRScanModal />
      <SolvedModal />
      <FloatingAlbumButton />
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Root />
    </GameProvider>
  )
}
