// Each puzzle image is split into rows*cols rectangular tiles at runtime via
// CSS background-position slicing (see PuzzleAssembly.jsx) — no separate
// per-piece image files needed, which keeps adding new puzzles to just one
// line here.
//
// `quiz` is a pool of topic-relevant questions — one is picked at random
// each time the player scans a correct QR code in time, before the piece is
// actually awarded.
export const PUZZLE_CATALOG = [
  {
    id: 'panda',
    name: { hu: 'Óriáspanda', en: 'Giant Panda' },
    image: '/images/puzzles/panda-full.jpg',
    rows: 4,
    cols: 2, // 8 pieces
    info: {
      hu: 'Az óriáspanda a bambuszerdők jellegzetes lakója. Napi akár 12 órát is eszik, főként bambuszt — ehhez erős állkapocsra és egy különleges, hüvelykujjszerű csukló-kinövésre van szüksége, amivel megmarkolja a szárakat. Bár a medvefélék közé tartozik, szinte kizárólag növényi táplálékon él.',
      en: "The giant panda is a bamboo-forest icon. It can spend up to 12 hours a day eating — almost exclusively bamboo — thanks to powerful jaws and a special wrist bone that works like a thumb to grip the stalks. Despite belonging to the bear family, its diet is almost entirely plant-based.",
    },
    quiz: [
      {
        question: { hu: 'Mit eszik legszívesebben az óriáspanda?', en: 'What does the giant panda mostly eat?' },
        options: [
          { hu: 'Bambuszt', en: 'Bamboo' },
          { hu: 'Halat', en: 'Fish' },
          { hu: 'Mézet', en: 'Honey' },
        ],
        correct: 0,
      },
      {
        question: {
          hu: 'Napi hány órát tölthet evéssel egy óriáspanda?',
          en: 'How many hours a day can a giant panda spend eating?',
        },
        options: [
          { hu: 'Kb. 2 órát', en: 'About 2 hours' },
          { hu: 'Kb. 6 órát', en: 'About 6 hours' },
          { hu: 'Akár 12 órát', en: 'Up to 12 hours' },
        ],
        correct: 2,
      },
      {
        question: {
          hu: 'Melyik állatcsaládba tartozik az óriáspanda?',
          en: 'Which animal family does the giant panda belong to?',
        },
        options: [
          { hu: 'Mosómedvefélék', en: 'Raccoon family' },
          { hu: 'Medvefélék', en: 'Bear family' },
          { hu: 'Mókusfélék', en: 'Squirrel family' },
        ],
        correct: 1,
      },
      {
        question: {
          hu: 'Mi segíti a pandát a bambuszszárak megmarkolásában?',
          en: 'What helps the panda grip bamboo stalks?',
        },
        options: [
          { hu: 'Egy hüvelykujjszerű csuklócsont', en: 'A thumb-like wrist bone' },
          { hu: 'Tapadókorongos mancs', en: 'Suction-cup paws' },
          { hu: 'Hosszú karmok csak', en: 'Long claws only' },
        ],
        correct: 0,
      },
    ],
  },
]

export const PIECES_PER_PUZZLE = (puzzle) => puzzle.rows * puzzle.cols
