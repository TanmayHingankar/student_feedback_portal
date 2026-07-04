import { Router } from 'express'
import { getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/students', requireAdmin, getStudents)
router.get('/student/:id', requireAdmin, getStudentById)
router.put('/student/:id', requireAdmin, updateStudent)
router.delete('/student/:id', requireAdmin, deleteStudent)

export default router

