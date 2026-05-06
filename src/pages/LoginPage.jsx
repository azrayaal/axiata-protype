import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, MOCK_USERS, ROLES } from '../contexts/AuthContext'
import { LogIn, ChevronDown } from 'lucide-react'

const ROLE_LABELS = {
  [ROLES.BU]: 'Tim Business Unit',
  [ROLES.LEGAL]: 'Tim Legal',
  [ROLES.APPROVER]: 'Approver',
  [ROLES.SUPERADMIN]: 'Superadmin',
}

const ROLE_COLORS = {
  [ROLES.BU]: 'bg-blue-100 text-blue-700',
  [ROLES.LEGAL]: 'bg-purple-100 text-purple-700',
  [ROLES.APPROVER]: 'bg-amber-100 text-amber-700',
  [ROLES.SUPERADMIN]: 'bg-green-100 text-green-700',
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!selected) return
    setLoading(true)
    setTimeout(() => {
      login(selected)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2044] to-[#1a3a6b] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f2044] to-[#1a3a6b] px-8 py-8 text-center">
            <img src="/axiata-logo.png" alt="Axiata" className="h-10 object-contain mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white">Contract Lifecycle Management</h1>
            <p className="text-blue-200 text-sm mt-1">Sistem Pengelolaan Kontrak Axiata</p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 text-center">Pilih Akun untuk Demo</h2>
              <p className="text-sm text-gray-500 text-center mt-1">Simulasi Role-Based Access Control</p>
            </div>

            {/* User Cards */}
            <div className="space-y-2.5">
              {MOCK_USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelected(user)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${
                    selected?.id === user.id
                      ? 'border-[#1a3a6b] bg-blue-50/60 shadow-sm'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    selected?.id === user.id ? 'bg-[#1a3a6b] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.nik} · {user.division}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${ROLE_COLORS[user.role]}`}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </button>
              ))}
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={!selected || loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selected && !loading
                  ? 'bg-[#1a3a6b] hover:bg-[#15305a] text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Masuk...
                </span>
              ) : (
                <>
                  <LogIn size={18} />
                  {selected ? `Masuk sebagai ${selected.name}` : 'Pilih akun untuk masuk'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              © 2026 PT. Sagara Technology. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
