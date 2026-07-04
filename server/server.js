import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'mongo-sanitize'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import feedbackRoutes from './routes/feedbackRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'

const app = express()

// Security headers
const helmetMw = helmet()
if (typeof helmetMw !== 'function') {
  throw new Error(`helmet() is not a middleware. type=${typeof helmetMw}`)
}
app.use(helmetMw)

// CORS
const corsMw = cors({ origin: process.env.FRONTEND_URL || '*', credentials: true })
if (typeof corsMw !== 'function') {
  throw new Error(`cors(...) is not a middleware. type=${typeof corsMw}`)
}
app.use(corsMw)

app.use(express.json({ limit: '2mb' }))

// Mongo security: sanitize query selectors
try {
  const mongoSanitizeMw = typeof mongoSanitize === 'function' ? mongoSanitize() : undefined
  if (typeof mongoSanitizeMw === 'function') app.use(mongoSanitizeMw)
} catch (err) {
  console.warn('mongo-sanitize middleware skipped:', err?.message || err)
}

// Rate limiting
const rateLimiterMw = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false
})
if (typeof rateLimiterMw !== 'function') {
  throw new Error(`rateLimit(...) is not a middleware. type=${typeof rateLimiterMw}`)
}
app.use(rateLimiterMw)

app.get('/health', (req, res) => res.json({ ok: true }))

const routes = [
  ['feedbackRoutes', feedbackRoutes],
  ['studentRoutes', studentRoutes],
  ['adminRoutes', adminRoutes],
  ['certificateRoutes', certificateRoutes]
]

for (const [name, router] of routes) {
  if (typeof router !== 'function') {
    console.error(`Router check failed: ${name} =>`, { type: typeof router, value: router })
    throw new Error(`${name} is not a valid Express router export`)
  }
  console.log(`Mounting /api -> ${name}`)
  app.use('/api', router)
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

await connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

