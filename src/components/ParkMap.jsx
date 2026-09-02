import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { PIECE_STATIONS } from '../data/pieceStations'
import { useGame } from '../context/GameContext'

export default function ParkMap() {
  const { currentTargetCode } = useGame()

  return (
    <div className="relative w-full aspect-[4/3] max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-white/15 touch-none">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        limitToBounds={true}
        centerOnInit={true}
        doubleClick={{ mode: 'toggle' }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: '100%', height: '100%' }}
        >
          <div className="relative w-full h-full">
            <img
              src="/images/park-map.jpg"
              alt="Bikás Park"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

            {PIECE_STATIONS.map((station) => {
              const isActive = station.code === currentTargetCode
              return (
                <div
                  key={station.code}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${station.x}%`, top: `${station.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <span className="absolute w-9 h-9 rounded-full border-2 border-park-red animate-ripple" />
                    )}
                    <span
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-all ${
                        isActive
                          ? 'bg-park-red border-white text-white animate-pulseGlow scale-125'
                          : 'bg-black/50 border-white/50 text-white/70'
                      }`}
                    >
                      {station.code}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
