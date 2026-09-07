// Category catalog for the picture-collection game. Each puzzle in
// puzzles.js belongs to exactly one category via its `category` field.
// To add a new category later: add an entry here (with its own card
// background + accent colors for the animated border) and tag the new
// puzzle entries in puzzles.js with its `id` — CategorySelect and the
// gallery pick it up automatically, no other code changes needed.
export const CATEGORIES = [
  {
    id: 'nature',
    name: { hu: 'Természet', en: 'Nature' },
    bg: '/images/categories/nature-bg.jpg',
    accent: '#3CFF9A', // park-green
    accent2: '#12C97A', // park-green2
  },
  {
    id: 'planets',
    name: { hu: 'Bolygók', en: 'Planets' },
    bg: '/images/categories/planets-bg.jpg',
    accent: '#35E6FF', // park-cyan
    accent2: '#B084FF', // park-violet
  },
]
