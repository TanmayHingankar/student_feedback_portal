import fs from 'fs'
import path from 'path'
import Student from '../models/Student.js'
import { createCertificatePdfStream } from '../config/certificatePdf.js'
import { generateQrDataUrl } from '../utils/qr.js'
import { sendCertificateEmail } from '../utils/email.js'
import { AppError } from '../utils/errorFactory.js'

const uploadsDir = path.resolve('uploads')

function ensureDir() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
}

function pdfToBuffer(doc) {
  return new Promise((resolve, reject) => {
    const chunks = []
    doc.on('data', (d) => chunks.push(d))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })
}

export async function sendCertificate(req, res, next) {
  try {
    const { studentId } = req.body || {}
    if (!studentId) throw new AppError('studentId is required', 400)

    const student = await Student.findById(studentId)
    if (!student) throw new AppError('Student not found', 404)

    const verificationUrl = `${process.env.VERIFICATION_BASE_URL || 'http://localhost:5173'}/certificate/${student._id}`
    const qrDataUrl = await generateQrDataUrl({
      certificateId: student.certificateId,
      studentName: student.name,
      verificationUrl
    })

    const doc = createCertificatePdfStream({
      studentName: student.name,
      eventName: student.eventName,
      certificateId: student.certificateId,
      dateLabel: new Date().toLocaleDateString(),
      qrDataUrl
    })

    const pdfBuffer = await pdfToBuffer(doc)

    ensureDir()
    const filePath = path.join(uploadsDir, `${student.certificateId}.pdf`)
    fs.writeFileSync(filePath, pdfBuffer)

    // In production you should serve uploads via static route or object storage.
    const certificateURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/api/certificates/${student.certificateId}`

    // Send email
    await sendCertificateEmail({
      toEmail: student.email,
      studentName: student.name,
      eventName: student.eventName,
      certificateId: student.certificateId,
      pdfBuffer
    })

    student.certificateURL = certificateURL
    student.certificateSent = true
    await student.save()

    res.json({ message: 'Certificate sent' })
  } catch (e) {
    next(e)
  }
}

export async function resendCertificate(req, res, next) {
  try {
    const { studentId } = req.body || {}
    if (!studentId) throw new AppError('studentId is required', 400)

    const student = await Student.findById(studentId)
    if (!student) throw new AppError('Student not found', 404)

    const certificatePath = path.join(uploadsDir, `${student.certificateId}.pdf`)
    if (!fs.existsSync(certificatePath)) {
      // If pdf doesn't exist, generate/send again.
      return sendCertificate(req, res, next)
    }

    const pdfBuffer = fs.readFileSync(certificatePath)

    await sendCertificateEmail({
      toEmail: student.email,
      studentName: student.name,
      eventName: student.eventName,
      certificateId: student.certificateId,
      pdfBuffer
    })

    student.certificateSent = true
    await student.save()

    res.json({ message: 'Certificate resent' })
  } catch (e) {
    next(e)
  }
}

