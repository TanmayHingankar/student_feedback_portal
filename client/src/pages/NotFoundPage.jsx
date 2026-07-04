import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="text-6xl font-black text-amber-500">404</div>
      <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">The page you requested does not exist.</p>
      <div className="mt-6">
        <Link
          to="/"
          className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

