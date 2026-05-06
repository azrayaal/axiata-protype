import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth, ROLES } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import AppLayout from './components/layout/AppLayout'
import DashboardBU from './modules/dashboard/DashboardBU'
import DashboardLegal from './modules/dashboard/DashboardLegal'
import ContractList from './modules/contracts/ContractList'
import ContractCreate from './modules/contracts/ContractCreate'
import ContractDetail from './modules/contracts/ContractDetail'
import ContractEdit from './modules/contracts/ContractEdit'
import UploadRevisi from './modules/contracts/UploadRevisi'
import ReviewList from './modules/review/ReviewList'
import ReviewDetail from './modules/review/ReviewDetail'
import Repository from './modules/repository/Repository'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function DashboardRoute() {
  const { user } = useAuth()
  if (user?.role === ROLES.LEGAL) return <DashboardLegal />
  return <DashboardBU />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardRoute />} />

        {/* BU Routes */}
        <Route path="kontrak/daftar" element={<ContractList />} />
        <Route path="kontrak/tambah" element={<ContractCreate />} />
        <Route path="kontrak/detail/:id" element={<ContractDetail />} />
        <Route path="kontrak/edit/:id" element={<ContractEdit />} />
        <Route path="kontrak/upload-revisi" element={<UploadRevisi />} />

        {/* Legal Routes */}
        <Route path="review" element={<ReviewList />} />
        <Route path="review/:id" element={<ReviewDetail />} />

        {/* Shared */}
        <Route path="repository" element={<Repository />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
