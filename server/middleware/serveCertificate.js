import fs from 'fs'
import path from 'path'

export function registerCertificateStaticRoute(app) {

  const uploadsDir = path.resolve('uploads')

  app.get('/api/certificates/:certificateId', (req, res) => {
    const { certificateId } = req.params
    const filePath = path.join(uploadsDir, `${certificateId}.pdf`)

    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Certificate not found' })

    res.setHeader('Content-Type', 'application/pdf')
    res.sendFile(filePath)
  })
}

