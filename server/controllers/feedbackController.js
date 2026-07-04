import Student from '../models/Student.js'
import { AppError } from '../utils/errorFactory.js'
import { buildCertificateId } from '../utils/certificateId.js'
import { createCertificatePdfStream } from '../config/certificatePdf.js'
import { generateQrDataUrl } from '../utils/qr.js'
import { sendCertificateEmail } from '../utils/email.js'

function pdfToBuffer(doc) {
  return new Promise((resolve, reject) => {
    const chunks = []
    doc.on('data', (d) => chunks.push(d))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })
}

export async function submitFeedback(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      state,
      college,
      department,
      year,
      gender,
      eventName,
      feedback,
      suggestions = ''
    } = req.body

    // Prevent duplicate email for the same event is handled by unique index.

    const existingSeq = await Student.countDocuments({ eventName })
    const certificateId = buildCertificateId(new Date().getFullYear(), existingSeq + 1)

    const student = await Student.create({
      name,
      email,
      phone,
      state,
      college,
      department,
      year,
      gender,
      eventName,
      feedback,
      suggestions,
      certificateId
    })

    // Generate certificate
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

    // Save PDF to a temp path using local file system is handled in certificateController in this design.
    // For this fast path (submission), we will store it on disk here.
    // eslint-disable-next-line no-undef
    const uploadsDir = new URL('../uploads', import.meta.url).pathname
    // eslint-disable-next-line no-undef
    const fs = await import('fs')
    // eslint-disable-next-line no-undef
    const path = await import('path')

    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
    const filePath = path.join(uploadsDir.default || uploadsDir, `${student.certificateId}.pdf`)
    fs.writeFileSync(filePath, pdfBuffer)

    student.certificateURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/api/certificates/${student.certificateId}`
    student.certificateSent = true
    await student.save()

    // Send email
    await sendCertificateEmail({
      toEmail: student.email,
      studentName: student.name,
      eventName: student.eventName,
      certificateId: student.certificateId,
      pdfBuffer
    })

    res.status(201).json({ message: 'Feedback submitted. Certificate generated and emailed.', studentId: student._id })
  } catch (e) {
    if (e?.code === 11000) {
      return next(new AppError('You already submitted feedback for this event using this email', 409))
    }
    next(e)
  }
}

