import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CertificatePreviewPage() {
  const { id } = useParams()
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/student/${id}`
        )
        setUrl(res.data?.student?.certificateURL)
      } catch (e) {
        toast.error('Certificate not found')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certificate Preview</h2>
      {!url ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/60 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200">
          Certificate not available.
        </div>
      ) : (
        <div className="mt-6">
          <iframe
            title="Certificate"
            src={url}
            className="h-[75vh] w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-800"
          />
          <div className="mt-4">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
            >
              Download / Open PDF
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

