import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()
  if (loading) return <div className="p-6 text-slate-700 dark:text-slate-200">Loading...</div>
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

