import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    eventName: { type: String, required: true, trim: true },
    feedback: { type: Number, required: true, min: 1, max: 10 },
    suggestions: { type: String, default: '' },

    certificateURL: { type: String, default: null },
    certificateSent: { type: Boolean, default: false },

    // Certificate IDs are used for QR verification and admin actions.
    certificateId: { type: String, required: true, unique: true, index: true }
  },
  { timestamps: true }
)

// Prevent duplicate submissions for the same event per email
StudentSchema.index({ email: 1, eventName: 1 }, { unique: true })

export default mongoose.model('Student', StudentSchema)

