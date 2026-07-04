import { Router } from 'express'
import { sendCertificate, resendCertificate } from '../controllers/certificateController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/send-certificate', requireAdmin, sendCertificate)
router.post('/resend', requireAdmin, resendCertificate)

export default router

