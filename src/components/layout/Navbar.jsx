import { Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <Menu size={20} />
      </button>

      <img src="/axiata-logo.png" alt="Axiata" className="h-7 object-contain" />

      <div className="flex-1" />

      <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
          4
        </span>
      </button>

      <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-1.5 transition-colors">
        <div className="w-8 h-8 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center">
          {user?.avatar || 'U'}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-500">{user?.nik} · {user?.roleLabel}</p>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </div>
    </header>
  )
}
