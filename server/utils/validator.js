import { validationResult } from 'express-validator'
import { AppError } from './errorFactory.js'

export function validate(req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    const first = result.array()[0]
    return next(new AppError(first.msg, 400))
  }
  next()
}

