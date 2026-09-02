# Bikás Park Őrszem — Puzzle Piece Collection Game

A React + Vite location-based game for Bikás Park (Budapest): scan QR codes hidden
around the park to collect puzzle pieces, assemble the picture, and grow your
album — guided the whole way by Buksi, an animated cartoon bull mascot.

## Stack
- **React 19 + Vite**, **Tailwind CSS**
- **Framer Motion** — screen/mascot/card animations
- **canvas-confetti** — puzzle-solved celebration
- **qr-scanner** — real camera QR scanning, with a Dev Test Mode bypass for desktop development
- Plain SVG + CSS keyframes for the mascot (no external animation libraries)

## Configuring the game

Almost everything is in **`src/data/gameConfig.js`**:
```js
export const PIECE_TIME_LIMIT_SECONDS = 120 // time to reach & scan a station
export const TOTAL_STATIONS = 12            // physical QR codes in the park
```

Add more collectible pictures in **`src/data/puzzles.js`** — just append an
entry (image, grid size, HU/EN info text) and it's automatically in rotation:
```js
{
  id: 'panda',
  name: { hu: 'Óriáspanda', en: 'Giant Panda' },
  image: '/images/puzzles/panda-full.jpg',
  rows: 4, cols: 2, // 8 pieces
  info: { hu: '...', en: '...' },
}
```

Station map positions live in **`src/data/pieceStations.js`** — 12 fixed
physical spots, each with a QR payload `bikaspark:piece:<1-12>`.

## How it plays

1. **First-ever visit** — the bull mascot Buksi walks the player through the
   rules, bubble by bubble, each with a matching animation (wave / jump /
   wink). This only ever shows once (`hasSeenOnboarding` in localStorage).
2. **Reveal** — Buksi shows which picture needs assembling this round.
3. **Collecting** — the map shows all 12 stations; one is highlighted as the
   current target. The player has `PIECE_TIME_LIMIT_SECONDS` to scan that
   station's QR code. Success → next piece, next target. Timeout → that
   attempt is skipped and the game points to a different code from the pool
   of 12 (so a single hard-to-reach code never permanently blocks progress).
4. **Assemble** — once all pieces (8, i.e. the puzzle's `rows*cols`) are
   collected, a tap-to-swap grid puzzle appears (straight tiles sliced from
   the source photo via CSS `background-position` — see note below).
5. **Solved** — confetti, the full picture, and it's added to the album.
   Continue starts a new round immediately.
6. **Album** — a floating, **draggable** button (hidden during the assembly
   minigame) opens the gallery: owned pictures are tappable to see the full
   image + a few lines of info text; unowned ones show as locked/silhouette
   placeholders. Fully scalable — the grid just grows as `PUZZLE_CATALOG` does.

Score/health from the previous game concept and the tilt/screw minigames were
removed as part of this redesign — the whole loop is now the puzzle collection
described above.

## Persistence

Everything meaningful is saved to `localStorage` on every change
(`src/utils/persistence.js`, key `bikas-park-save-v1`): onboarding-seen flag,
album (owned pictures), the in-progress round (which piece order, how many
collected, the current deadline), and the album button's dragged position.
Reloading the page resumes exactly where the player left off.

## About the puzzle pieces

The provided `panda.png` has jigsaw-style borders baked into the image
(anti-aliased against the photo), which made a clean 8-piece alpha-cutout
extraction unreliable — attempts either merged adjacent pieces or fragmented
single ones depending on threshold. The assembly minigame instead slices the
clean photo into a straight `rows × cols` grid via CSS, which is fully
reliable and plays identically (tap two tiles to swap them until the picture
is solved). If you'd like true interlocking jigsaw-shaped pieces, either
supply 8 pre-cut piece images per puzzle, or ask and pieces can be generated
that way for future artwork.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  data/
    gameConfig.js      # timer + station-count constants
    puzzles.js          # scalable puzzle-image catalog
    pieceStations.js    # 12 fixed QR station positions + payload helper
  utils/persistence.js  # localStorage load/save
  context/GameContext.jsx  # the whole game state machine
  components/
    BullMascot.jsx       # animated SVG mascot (idle/wave/jump/wink)
    MascotBubble.jsx      # mascot + speech bubble pairing
    Onboarding.jsx         # first-run rules sequence
    Landing.jsx             # routes to Onboarding or "welcome back"
    Reveal.jsx               # shows the round's target picture
    ParkMonitor.jsx           # map + timer + progress + scan button
    ParkMap.jsx                 # 12-station map with target highlight
    QRScanModal.jsx               # camera scan, validated against the target
    PuzzleAssembly.jsx              # tap-to-swap grid puzzle minigame
    SolvedModal.jsx                   # success popup
    CardGallery.jsx                     # album + lightbox with info text
    FloatingAlbumButton.jsx               # draggable album shortcut
```
