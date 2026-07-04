import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/errorFactory.js'
import Student from '../models/Student.js'

export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) throw new AppError('Email and password are required', 400)

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminEmail || !adminPassword) {
      throw new AppError('Admin credentials are not configured', 500)
    }

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      throw new AppError('Invalid credentials', 401)
    }

    // Compare against stored hashed password if ADMIN_PASSWORD is hashed.
    // If not hashed, treat ADMIN_PASSWORD as plain.
    const isHashed = adminPassword.startsWith('$2a$') || adminPassword.startsWith('$2b$') || adminPassword.startsWith('$2y$')

    const ok = isHashed ? await bcrypt.compare(password, adminPassword) : password === adminPassword
    if (!ok) throw new AppError('Invalid credentials', 401)

    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '12h' })
    res.json({ token })
  } catch (e) {
    next(e)
  }
}

export async function getAdminDashboard(req, res, next) {
  try {
    const totalStudents = await Student.countDocuments()
    const totalCertificatesSent = await Student.countDocuments({ certificateSent: true })

    const statsAgg = await Student.aggregate([
      { $match: { feedback: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: '$feedback' }, max: { $max: '$feedback' }, min: { $min: '$feedback' } } }
    ])

    const stats = statsAgg[0] || { avg: 0, max: 0, min: 0 }

    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    const todayFeedbackCount = await Student.countDocuments({ createdAt: { $gte: startOfToday } })

    res.json({
      totalStudents,
      totalCertificatesSent,
      averageFeedback: Number(stats.avg.toFixed(2)),
      highestRating: stats.max,
      lowestRating: stats.min,
      todayFeedbackCount
    })
  } catch (e) {
    next(e)
  }
}

