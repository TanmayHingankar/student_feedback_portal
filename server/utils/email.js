import nodemailer from 'nodemailer'
import { certificateEmailHtml } from '../templates/certificateEmail.js'

export function createTransporter() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) throw new Error('Missing EMAIL_USER/EMAIL_PASS')

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user,
      pass
    }
  })
}

export async function sendCertificateEmail({ toEmail, studentName, eventName, certificateId, pdfBuffer }) {
  const transporter = createTransporter()

  const subject = 'Participation Certificate'

  const html = certificateEmailHtml({ studentName, eventName, certificateId })

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject,
    html,
    attachments: [
      {
        filename: `${certificateId}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  })
}

