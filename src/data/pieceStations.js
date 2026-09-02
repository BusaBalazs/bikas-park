// 12 fixed physical station positions (percentages over park-map.jpg),
// spread across real features of the isometric render. Each station's QR
// code is fixed (`bikaspark:piece:<code>`) — it's the game logic that
// randomly decides, each puzzle round, which subset of these codes carries
// which piece.
export const PIECE_STATIONS = [
  { code: 1, x: 4, y: 53 },
  { code: 2, x: 35, y: 46 },
  { code: 3, x: 55, y: 13 },
  { code: 4, x: 8, y: 30 },
  { code: 5, x: 19, y: 40 },
  { code: 6, x: 45, y: 58 },
  { code: 7, x: 73, y: 87 },
  { code: 8, x: 45, y: 97 },
  { code: 9, x: 68, y: 30 },
  { code: 10, x: 88, y: 22 },
  { code: 11, x: 30, y: 68 },
  { code: 12, x: 60, y: 68 },
]

export function stationQrCode(code) {
  return `bikaspark:piece:${code}`
}
