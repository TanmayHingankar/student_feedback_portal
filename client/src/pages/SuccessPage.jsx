import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-200 bg-white/60 p-8 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-900/30"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-500">✅</div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Thanks for your feedback!</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Your Participation Certificate is being generated and emailed to your inbox.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/feedback"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 transition hover:bg-white/70 dark:border-slate-800 dark:bg-slate-900/40 dark:text-white"
          >
            Submit another
          </Link>
          <Link
            to="/admin/login"
            className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            Admin
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

