export function toInteger(val) {
  const n = Number(val)
  if (Number.isNaN(n)) return null
  return Math.trunc(n)
}

