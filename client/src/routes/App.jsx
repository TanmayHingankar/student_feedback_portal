import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import FeedbackPage from '../pages/FeedbackPage'
import SuccessPage from '../pages/SuccessPage'
import CertificatePreviewPage from '../pages/CertificatePreviewPage'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from '../utils/ProtectedRoute'
import { AuthProvider } from '../context/AuthContext'
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/thank-you" element={<SuccessPage />} />
        <Route path="/certificate/:id" element={<CertificatePreviewPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}



