import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`,
        data
      )
      localStorage.setItem('admin_token', res.data.token)
      toast.success('Admin logged in')
      navigate('/admin')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter admin credentials.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email.message}</div>}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950/40"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password.message}</div>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

