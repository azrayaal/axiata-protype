import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, Menu, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3">
      <img src="/axiata-logo.png" alt="Axiata" className="h-7 object-contain" />

      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
          4
        </span>
      </button>

      {/* Profile dropdown */}
      <div className="relative pl-2 border-l border-gray-200" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(o => !o)}
          className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-1.5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center">
            {user?.avatar || 'U'}
          </div>
          <div className="leading-tight text-left">
            <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.nik} · {user?.roleLabel}</p>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{user?.division}</p>
              <span className="inline-block mt-1.5 text-[10px] font-semibold bg-blue-100 text-[#1a3a6b] px-2 py-0.5 rounded-full">
                {user?.roleLabel}
              </span>
            </div>

            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
            >
              <User size={15} className="text-gray-400" />
              Profil Saya
            </button>

            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-xl"
              >
                <LogOut size={15} />
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
