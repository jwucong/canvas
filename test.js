function degToRad(deg) {
  return deg * Math.PI / 180
}

function radToDeg(rad) {
  return rad * 180 / Math.PI
}

function getQuadrant(angle) {
  let deg = angle % 360
  deg = deg < 0 ? 360 + deg : deg
  return Math.ceil(Math.abs(deg / 90))
}

function getPoint(x, y, r, angle) {
  const deg = angle % 360
  const rad = degToRad(deg)
  const q = getQuadrant(angle)
  const dx = r * Math.cos(rad)
  const dy = Math.sqrt(r * r - dx * dx)
  const x1 = q > 1 && q < 4 ? x - dx : x + dx
  const y1 = q < 3 ? y - dy : y + dy
  return {x: x1, y: y1}
}

const q = getQuadrant(-370)
const p = getPoint(100, 100, 50, 370)

console.log(q)
console.log(p)
