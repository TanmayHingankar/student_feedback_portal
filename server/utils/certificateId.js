function pad(num, size) {
  return String(num).padStart(size, '0')
}

export function buildCertificateId(year = new Date().getFullYear(), seq = 1) {
  // Example: CERT-2026-00001
  return `CERT-${year}-${pad(seq, 5)}`
}

