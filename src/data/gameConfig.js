// Easy to tweak: how long (in seconds) the player has to reach and scan the
// currently-targeted station before that attempt is skipped in favor of a
// different code from the pool.
export const PIECE_TIME_LIMIT_SECONDS = 120

// Total physical QR stations in the park (see pieceStations.js) that the
// game can draw from each round — must be >= the largest puzzle's piece
// count.
export const TOTAL_STATIONS = 12
