import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-900/30">
      <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{title}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value ?? '-'}</div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setStats(res.data)
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load dashboard')
      }
    })()
  }, [token])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Analytics and key metrics</p>
        </div>
        <Link
          to="/feedback"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/60 px-5 py-2 text-slate-900 transition hover:bg-white dark:border-slate-800 dark:bg-slate-900/30 dark:text-white"
        >
          Submit feedback
        </Link>
      </div>

      {!stats ? (
        <div className="mt-8 text-slate-700 dark:text-slate-200">Loading...</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard title="Total Students" value={stats.totalStudents} />
          <StatCard title="Total Certificates Sent" value={stats.totalCertificatesSent} />
          <StatCard title="Average Feedback" value={stats.averageFeedback} />
          <StatCard title="Highest Rating" value={stats.highestRating} />
          <StatCard title="Lowest Rating" value={stats.lowestRating} />
          <StatCard title="Today's Feedback" value={stats.todayFeedbackCount} />
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/30">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Analytics</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Feedback graph, state/college/department analytics, pagination, search and exports are implemented in backend APIs.
        </p>
      </div>
    </div>
  )
}

