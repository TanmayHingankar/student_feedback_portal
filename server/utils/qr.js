import QRCode from 'qrcode'

export async function generateQrDataUrl({ certificateId, studentName, verificationUrl }) {
  const payload = {
    certificateId,
    studentName,
    verificationUrl
  }

  const text = JSON.stringify(payload)
  const dataUrl = await QRCode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 280
  })

  return dataUrl
}

