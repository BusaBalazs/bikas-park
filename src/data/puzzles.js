// `image` is the finished, framed picture: shown on the Reveal screen
// before a round starts ("this is what you're collecting"), and it's what
// actually lands in the album once the round is won — so it never changes
// once a round begins.
//
// `pieces` is the ordered set of 8 individual tile images used by the
// jigsaw-style assembly minigame (see PuzzleAssembly.jsx): pieces[i] is the
// tile that belongs at grid position i (row-major, left-to-right, top-to-
// bottom for `rows`x`cols`). The minigame shuffles which slot each tile
// starts in and the player swaps them back into order — it does not need
// to visually reconstruct `image`, so the tile set can be its own themed
// set of shots.
//
// `quiz` is a pool of topic-relevant questions — one is picked at random
// each time the player scans a correct QR code in time, before the piece is
// actually awarded.
//
// `category` links each entry to a category id from data/categories.js —
// the category picker filters this catalog by it when starting a round.
export const PUZZLE_CATALOG = [
  {
    id: "panda",
    category: "nature",
    name: { hu: "Óriáspanda", en: "Giant Panda" },
    image: "/images/puzzles/panda-album.png",
    pieces: Array.from(
      { length: 8 },
      (_, i) => `/images/puzzles/pieces/panda/${i}.webp`,
    ),
    rows: 4,
    cols: 2, // 8 pieces
    info: {
      hu: "Az óriáspanda a bambuszerdők jellegzetes lakója. Napi akár 12-16 órát is eszik, főként bambuszt — ehhez erős állkapocsra és egy különleges, hüvelykujjszerű csukló-kinövésre van szüksége, amivel megmarkolja a szárakat. Bár a medvefélék közé tartozik, szinte kizárólag növényi táplálékon él.",
      en: "The giant panda is a bamboo-forest icon. It can spend up to 12-16 hours a day eating — almost exclusively bamboo — thanks to powerful jaws and a special wrist bone that works like a thumb to grip the stalks. Despite belonging to the bear family, its diet is almost entirely plant-based.",
    },
    quiz: [
      {
        question: {
          hu: "Miből áll az óriáspandák étrendjének több mint 99%-a?",
          en: "What makes up more than 99% of a giant panda’s diet?",
        },
        options: [
          {
            hu: "Eper és erdei gyümölcsök",
            en: "Strawberries and wild berries",
          },
          { hu: "Bambusz", en: "Bamboo" },
          { hu: "Halak és kétéltűek", en: "Fish and amphibians" },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Naponta körülbelül hány órát töltenek az óriáspandák evéssel?",
          en: "Approximately how many hours a day do giant pandas spend eating?",
        },
        options: [
          { hu: "2–3 órát", en: "2–3 hours" },
          { hu: "5–6 órát", en: "5–6 hours" },
          { hu: "10–16 órát", en: "10–16 hours" },
        ],
        correct: 2,
      },
      {
        question: {
          hu: "Milyen színűek az óriáspandák újszülött bocsai, amikor meglátják a napvilágot?",
          en: "What color are newborn giant panda cubs when they are born?",
        },
        options: [
          { hu: "Rózsaszínek és szőrtelenek", en: "Pink and hairless" },
          { hu: "Egyből fekete-fehérek", en: "Black and white right away" },
          { hu: "Teljesen barna bundájúak", en: "Fully brown fur" },
        ],
        correct: 0,
      },
      {
        question: {
          hu: "Hány lábujja/hüvelykujja van a pandának, ami segíti a bambusz szárak megragadását?",
          en: "How many digits/thumbs does a panda have that help it grip bamboo stalks?",
        },
        options: [
          { hu: "4 lábujja", en: "4 digits" },
          { hu: "5 lábujja", en: "5 digits" },
          {
            hu: '6 (egy módosult csuklócsont képez "ál-hüvelykujjat")',
            en: '6 (a modified wrist bone forms a "pseudo-thumb")',
          },
        ],
        correct: 2,
      },
      {
        question: {
          hu: "Melyik ország az óriáspandák egyetlen eredeti, természetes élőhelye?",
          en: "Which country is the only native habitat of giant pandas?",
        },
        options: [
          { hu: "Japán", en: "Japan" },
          { hu: "Kína", en: "China" },
          { hu: "India", en: "India" },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Átlagosan mekkora a súlya egy újszülött pandabocsnak a szüléskor?",
          en: "On average, how much does a newborn panda cub weigh at birth?",
        },
        options: [
          {
            hu: "Kb. 100 gramm (mint egy vajaskenyér)",
            en: "About 100 grams (like a slice of buttered bread)",
          },
          { hu: "Kb. 2 kilogramm", en: "About 2 kilograms" },
          { hu: "Kb. 5 kilogramm", en: "About 5 kilograms" },
        ],
        correct: 0,
      },
      {
        question: {
          hu: "Tudnak-e fára mászni a pandák a valóságban?",
          en: "Can pandas actually climb trees in real life?",
        },
        options: [
          {
            hu: "Igen, kiváló fára mászók és úszók is",
            en: "Yes, they are excellent climbers and swimmers",
          },
          {
            hu: "Nem, mert túl nehezek hozzá",
            en: "No, because they are too heavy",
          },
          {
            hu: "Csak a fiatal bocsok, a felnőttek már nem",
            en: "Only young cubs, adults cannot",
          },
        ],
        correct: 0,
      },
      {
        question: {
          hu: "Tudományos szempontból melyik állatcsaládba tartoznak az óriáspandák?",
          en: "Scientifically speaking, which animal family do giant pandas belong to?",
        },
        options: [
          { hu: "Mosómedvefélék", en: "Raccoon family" },
          { hu: "Menyétfélék", en: "Weasel family" },
          { hu: "Medvefélék", en: "Bear family" },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "mars",
    category: "science",
    name: { hu: "Mars", en: "Mars" },
    image: "/images/puzzles/mars-album.png",
    pieces: Array.from(
      { length: 8 },
      (_, i) => `/images/puzzles/pieces/mars/${i}.webp`,
    ),
    rows: 4,
    cols: 2, // 8 pieces
    info: {
      hu: "A Mars a Naptól számított negyedik bolygó a Naprendszerben. A felszínét borító vas-oxid miatt vöröses színű, ezért Vörös Bolygónak is nevezik. Itt található a Naprendszer legnagyobb vulkánja, az Olympus Mons, és bár jelenleg hideg sivatag, a tudósok szerint régen folyékony víz boríthatta a felszínét.",
      en: "Mars is the fourth planet from the Sun in the Solar System. Often called the Red Planet due to the iron oxide covering its surface, it is home to Olympus Mons, the largest volcano in the Solar System. Although now a cold desert, scientists believe liquid water once flowed on its surface.",
    },
    quiz: [
      {
        question: {
          hu: 'Miért nevezik a Marsot "Vörös Bolygónak"?',
          en: 'Why is Mars called the "Red Planet"?',
        },
        options: [
          {
            hu: "Mert a légköre tiszta lángokból áll",
            en: "Because its atmosphere is made of fire",
          },
          {
            hu: "A felszínén található nagy mennyiségű vas-oxid (rozsda) miatt",
            en: "Due to the large amount of iron oxide (rust) on its surface",
          },
          {
            hu: "Mert közelebb van a Naphoz, mint a Föld",
            en: "Because it is closer to the Sun than Earth",
          },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Hány holdja van a Marsnak?",
          en: "How many moons does Mars have?",
        },
        options: [
          { hu: "Egy sincs", en: "None" },
          {
            hu: "2 holdja van (Phobos és Deimos)",
            en: "2 moons (Phobos and Deimos)",
          },
          { hu: "4 holdja van", en: "4 moons" },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Hogy hívják a Marsot borító, a Naprendszer legnagyobb vulkánját?",
          en: "What is the name of the largest volcano in the Solar System located on Mars?",
        },
        options: [
          { hu: "Olympus Mons", en: "Olympus Mons" },
          { hu: "Vezúv", en: "Vesuvius" },
          { hu: "Mauna Kea", en: "Mauna Kea" },
        ],
        correct: 0,
      },
      {
        question: {
          hu: "Körülbelül mekkora a Mars a Földhöz képest?",
          en: "Roughly how big is Mars compared to Earth?",
        },
        options: [
          { hu: "Kétszer akkora, mint a Föld", en: "Twice the size of Earth" },
          {
            hu: "Körülbelül a Föld átmérőjének a fele",
            en: "About half the diameter of Earth",
          },
          {
            hu: "Pontosan akkora, mint a Föld",
            en: "Exactly the same size as Earth",
          },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Mi gáz alkotja a Mars vékony légkörének több mint 95%-át?",
          en: "Which gas makes up more than 95% of Mars’ thin atmosphere?",
        },
        options: [
          { hu: "Oxigén", en: "Oxygen" },
          { hu: "Nitrogén", en: "Nitrogen" },
          { hu: "Szén-dioxid", en: "Carbon dioxide" },
        ],
        correct: 2,
      },
      {
        question: {
          hu: "Mennyi ideig tart egy év a Marson (egy teljes kör a Nap körül)?",
          en: "How long is a year on Mars (one full orbit around the Sun)?",
        },
        options: [
          {
            hu: "Kb. 687 földrajzi nap (majdnem 2 földi év)",
            en: "About 687 Earth days (nearly 2 Earth years)",
          },
          { hu: "Pontosan 365 nap", en: "Exactly 365 days" },
          { hu: "Kb. 100 nap", en: "About 100 days" },
        ],
        correct: 0,
      },
      {
        question: {
          hu: "Milyen az átlagos hőmérséklet a Mars felszínén?",
          en: "What is the average surface temperature on Mars?",
        },
        options: [
          { hu: "Körülbelül +25 °C", en: "About +25 °C" },
          { hu: "Körülbelül -60 °C", en: "About -60 °C" },
          { hu: "Körülbelül +100 °C", en: "About +100 °C" },
        ],
        correct: 1,
      },
      {
        question: {
          hu: "Hogy hívják a NASA híres marsjáróját, ami 2021-ben szállt le a Marson, és magával vitte az Ingenuity helikoptert is?",
          en: "What is the name of NASA’s famous rover that landed on Mars in 2021, carrying the Ingenuity helicopter?",
        },
        options: [
          { hu: "Voyager", en: "Voyager" },
          { hu: "Apollo", en: "Apollo" },
          { hu: "Perseverance", en: "Perseverance" },
        ],
        correct: 2,
      },
    ],
  },
];

export const PIECES_PER_PUZZLE = (puzzle) => puzzle.rows * puzzle.cols;
