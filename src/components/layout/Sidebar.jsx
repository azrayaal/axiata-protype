import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, ChevronDown, ChevronRight,
  FolderOpen, Upload, BookOpen,
} from 'lucide-react'
import { useAuth, ROLES } from '../../contexts/AuthContext'

const NavItem = ({ to, icon: Icon, label, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-[#1a3a6b] text-white shadow-sm'
          : 'text-gray-600 hover:bg-blue-50 hover:text-[#1a3a6b]'
      }`
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
)

const NavGroup = ({ icon: Icon, label, children, defaultOpen = false }) => {
  const location = useLocation()
  const childArray = Array.isArray(children) ? children : [children]
  const childPaths = childArray.map(c => c?.props?.to).filter(Boolean)
  const isChildActive = childPaths.some(p => location.pathname.startsWith(p))
  const [open, setOpen] = useState(defaultOpen || isChildActive)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 text-sm font-medium transition-all duration-150 ${
          isChildActive ? 'text-[#1a3a6b] font-semibold' : 'text-gray-600 hover:bg-blue-50 hover:text-[#1a3a6b]'
        }`}
        style={{ width: 'calc(100% - 16px)' }}
      >
        <Icon size={18} />
        <span className="flex-1 text-left">{label}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-blue-100 pl-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ isOpen }) {
  const { user } = useAuth()
  const isLegal = user?.role === ROLES.LEGAL

  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-white border-r border-gray-200 z-20 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-60' : 'w-0 overflow-hidden'
      }`}
    >
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" end />

        {isLegal ? (
          <NavGroup icon={FileText} label="Kontrak" defaultOpen>
            <NavItem to="/review" icon={FileText} label="Daftar Kontrak" />
          </NavGroup>
        ) : (
          <NavGroup icon={FileText} label="Kontrak" defaultOpen>
            <NavItem to="/kontrak/daftar" icon={FileText} label="Daftar Kontrak" />
            <NavItem to="/kontrak/upload-revisi" icon={Upload} label="Upload Revisi" />
          </NavGroup>
        )}

        <NavGroup icon={FolderOpen} label="Repository">
          <NavItem to="/repository" icon={BookOpen} label="Daftar Dokumen" />
        </NavGroup>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">CLM Axiata v2.0</p>
      </div>
    </aside>
  )
}
