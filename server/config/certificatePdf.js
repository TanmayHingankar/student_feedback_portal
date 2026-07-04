import PDFDocument from 'pdfkit'

export function createCertificatePdfStream({ studentName, eventName, certificateId, dateLabel, qrDataUrl }) {
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 30
  })

  const pageWidth = doc.page.width
  const pageHeight = doc.page.height

  // Background watermark
  doc
    .save()
    .fillOpacity(0.08)
    .fillColor('#111827')
    .fontSize(68)
    .translate(pageWidth / 2, pageHeight / 2)
    .rotate(-35)
    .text('STUDENT FEEDBACK', { width: pageHeight, align: 'center' })
    .restore()

  // Golden border
  doc
    .lineWidth(4)
    .strokeColor('#D4AF37')
    .rect(18, 18, pageWidth - 36, pageHeight - 36)

  // Logo placeholder
  doc
    .roundedRect(pageWidth - 200, 40, 130, 70, 10)
    .fillOpacity(0.12)
    .fill('#D97706')
    .fillOpacity(1)
    .fillColor('#B45309')
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('LOGO', pageWidth - 185, 64, { width: 100, align: 'center' })

  // Title
  doc
    .fillColor('#0F172A')
    .font('Helvetica-Bold')
    .fontSize(34)
    .text('Certificate of Participation', 0, 120, { align: 'center' })

  doc
    .fillColor('#334155')
    .font('Helvetica')
    .fontSize(14)
    .text('This is awarded to the following student for submitting valuable feedback.', 60, 168, { align: 'center', width: pageWidth - 120 })

  // Student name
  doc
    .fillColor('#111827')
    .font('Helvetica-Bold')
    .fontSize(26)
    .text(studentName, 0, 215, { align: 'center' })

  // Event & date
  doc
    .fillColor('#1F2937')
    .fontSize(16)
    .font('Helvetica')
    .text(`Event: ${eventName}`, 0, 255, { align: 'center' })

  doc
    .fillColor('#334155')
    .fontSize(14)
    .text(`Date: ${dateLabel}`, 0, 285, { align: 'center' })

  // Certificate ID
  doc
    .fillColor('#0F172A')
    .font('Helvetica-Bold')
    .fontSize(16)
    .text(`Certificate ID: ${certificateId}`, 0, 315, { align: 'center' })

  // QR code
  if (qrDataUrl) {
    // pdfkit supports images from data URLs
    doc.image(qrDataUrl, pageWidth - 250, 420, { fit: [160, 160] })
    doc.fillColor('#475569').fontSize(12).text('Verify via QR', pageWidth - 250, 600, { width: 160, align: 'center' })
  }

  // Signature
  const sigY = pageHeight - 110
  doc
    .moveTo(pageWidth / 2 - 180, sigY)
    .lineTo(pageWidth / 2 + 180, sigY)
    .lineWidth(1)
    .strokeColor('#D4AF37')
    .stroke()

  doc
    .fillColor('#111827')
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('Event Team Signature', pageWidth / 2 - 95, sigY + 15, { width: 190, align: 'center' })

  doc.end()
  return doc
}

