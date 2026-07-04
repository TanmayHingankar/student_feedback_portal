import { Router } from 'express'
import { body } from 'express-validator'
import { submitFeedback } from '../controllers/feedbackController.js'
import { validate } from '../utils/validator.js'

const router = Router()

router.post(
  '/feedback',
  [
    body('name').notEmpty().withMessage('Name is required').isString().trim().isLength({ min: 2 }),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('state').notEmpty().withMessage('State is required'),
    body('college').notEmpty().withMessage('College is required'),
    body('department').notEmpty().withMessage('Department is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('feedback').isInt({ min: 1, max: 10 }).withMessage('Feedback rating must be 1-10'),
    body('suggestions').optional().isString().isLength({ max: 500 }).withMessage('Suggestions max 500 characters')
  ],
  validate,
  submitFeedback
)

export default router

