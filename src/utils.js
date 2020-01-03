export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isArray(value) {
  return getType(value) === 'Array'
}

export function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}
