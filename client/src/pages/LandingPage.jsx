import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquareText, ShieldCheck, FileBadge } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Student Feedback Portal
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Share your feedback and instantly receive a beautiful Participation Certificate by email.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/feedback"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow-glow transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                  >
                    Submit Feedback
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/60 px-5 py-3 text-slate-900 transition hover:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:text-white"
                  >
                    How it works
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/50 p-6 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-400/20 p-3 text-amber-500">
                    <MessageSquareText size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Fast certificate delivery
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">PDF + QR verification</div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/70 p-4 dark:bg-slate-950/40">
                    <FileBadge className="text-amber-500" size={18} />
                    <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">Auto PDF</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">High-res landscape</div>
                  </div>
                  <div className="rounded-xl bg-white/70 p-4 dark:bg-slate-950/40">
                    <ShieldCheck className="text-indigo-500" size={18} />
                    <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">Verified QR</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Certificate ID</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="how-it-works" className="grid gap-4 md:grid-cols-3">
              {[{ t: '1. Submit', d: 'Fill your details and provide feedback rating.' }, { t: '2. Generate', d: 'System creates your certificate PDF automatically.' }, { t: '3. Receive', d: 'Certificate is emailed and you can download anytime.' }].map(
                (x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/30"
                  >
                    <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{x.t}</div>
                    <div className="mt-3 text-base font-medium text-slate-900 dark:text-white">{x.d}</div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

