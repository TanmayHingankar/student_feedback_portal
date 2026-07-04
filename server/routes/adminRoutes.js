import { Router } from 'express'
import { adminLogin, getAdminDashboard } from '../controllers/adminController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/admin/login', adminLogin)
router.get('/admin/dashboard', requireAdmin, getAdminDashboard)

export default router

