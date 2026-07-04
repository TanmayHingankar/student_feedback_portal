import Student from '../models/Student.js'
import { AppError } from '../utils/errorFactory.js'

export async function getStudents(req, res, next) {
  try {
    const {
      page = '1',
      limit = '10',
      sort = '-createdAt',
      q
    } = req.query

    const pg = Math.max(1, Number(page))
    const lim = Math.min(100, Math.max(1, Number(limit)))

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } },
            { eventName: { $regex: q, $options: 'i' } }
          ]
        }
      : {}

    const total = await Student.countDocuments(filter)

    const sortField = sort.startsWith('-') ? sort.slice(1) : sort
    const sortDir = sort.startsWith('-') ? -1 : 1

    const students = await Student.find(filter)
      .sort({ [sortField]: sortDir })
      .skip((pg - 1) * lim)
      .limit(lim)

    res.json({
      data: students,
      page: pg,
      limit: lim,
      total
    })
  } catch (e) {
    next(e)
  }
}

export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params
    const student = await Student.findById(id)
    if (!student) throw new AppError('Student not found', 404)
    res.json({ student })
  } catch (e) {
    next(e)
  }
}

export async function updateStudent(req, res, next) {
  try {
    const { id } = req.params
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) throw new AppError('Student not found', 404)
    res.json({ student: updated })
  } catch (e) {
    next(e)
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params
    const deleted = await Student.findByIdAndDelete(id)
    if (!deleted) throw new AppError('Student not found', 404)
    res.json({ message: 'Deleted' })
  } catch (e) {
    next(e)
  }
}

