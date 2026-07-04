import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const states = ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Maharashtra', 'Delhi']
const colleges = ['ABC College', 'XYZ Institute', 'PQR University']
const departments = ['Computer Science', 'Mechanical', 'Civil', 'ECE', 'EEE']
const years = ['1', '2', '3', '4']
const genders = ['Male', 'Female', 'Other']

export default function FeedbackPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      rating: 8,
      year: '1',
      gender: 'Male'
    }
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/feedback`,
        data
      )
      toast.success(res.data?.message || 'Submitted successfully')
      window.location.href = '/thank-you'
    } catch (err) {
      const msg = err?.response?.data?.message || 'Submission failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-slate-900 dark:text-white"
      >
        Feedback Form
      </motion.h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        After submit, your participation certificate will be generated and emailed automatically.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <div className="mt-1 text-xs text-red-500">{errors.name.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /.+@.+\..+/, message: 'Enter a valid email' }
            })}
          />
          {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Mobile Number</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^\d{10}$/, message: 'Phone must be 10 digits' }
            })}
          />
          {errors.phone && <div className="mt-1 text-xs text-red-500">{errors.phone.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Gender</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('gender', { required: 'Gender is required' })}
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">State</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('state', { required: 'State is required' })}
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && <div className="mt-1 text-xs text-red-500">{errors.state.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">College</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('college', { required: 'College is required' })}
          >
            {colleges.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.college && <div className="mt-1 text-xs text-red-500">{errors.college.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Department</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('department', { required: 'Department is required' })}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Year</label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('year', { required: 'Year is required' })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Event Name</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('eventName', { required: 'Event name is required' })}
          />
          {errors.eventName && <div className="mt-1 text-xs text-red-500">{errors.eventName.message}</div>}
        </div>

        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Feedback Rating (1-10)</label>
          <input
            type="number"
            min={1}
            max={10}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('feedback', {
              required: 'Rating is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Minimum rating is 1' },
              max: { value: 10, message: 'Maximum rating is 10' }
            })}
          />
          {errors.feedback && <div className="mt-1 text-xs text-red-500">{errors.feedback.message}</div>}
        </div>

        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Suggestions</label>
          <textarea
            rows={4}
            className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
            {...register('suggestions', { maxLength: { value: 500, message: 'Max 500 characters' } })}
          />
          {errors.suggestions && <div className="mt-1 text-xs text-red-500">{errors.suggestions.message}</div>}
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-semibold text-slate-900 shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  )
}

