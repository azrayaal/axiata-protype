import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, LayoutDashboard } from 'lucide-react'
import { useAuth, ROLES } from '../../contexts/AuthContext'

import kontrakIcon from '../../assets/kontrak.png'
import repositoryIcon from '../../assets/repository.png'

const NavItem = ({ to, icon: Icon, iconImg, label, end = false }) => (
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
    {({ isActive }) => (
      <>
        {iconImg
          ? <img src={iconImg} alt="" className="w-[18px] h-[18px] object-contain flex-shrink-0" style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
          : Icon
            ? <Icon size={18} />
            : <span className="w-[18px] flex-shrink-0" />
        }
        <span>{label}</span>
      </>
    )}
  </NavLink>
)

const NavGroup = ({ icon: Icon, iconImg, label, children, defaultOpen = false }) => {
  const location = useLocation()
  const childArray = Array.isArray(children) ? children : [children]
  const childPaths = childArray.map(c => c?.props?.to).filter(Boolean)
  const isChildActive = childPaths.some(p => location.pathname.startsWith(p))
  const [open, setOpen] = useState(defaultOpen || isChildActive)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 text-sm font-medium transition-all duration-150 ${
          isChildActive ? 'text-[#1a3a6b] font-semibold' : 'text-gray-600 hover:bg-blue-50 hover:text-[#1a3a6b]'
        }`}
        style={{ width: 'calc(100% - 16px)' }}
      >
        {iconImg
          ? <img src={iconImg} alt="" className="w-[18px] h-[18px] object-contain flex-shrink-0" style={{ filter: isChildActive ? 'invert(18%) sepia(72%) saturate(600%) hue-rotate(195deg) brightness(85%)' : 'none' }} />
          : <Icon size={18} />
        }
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
          <NavGroup iconImg={kontrakIcon} label="Kontrak" defaultOpen>
            <NavItem to="/review" icon={null} label="Daftar Kontrak" />
          </NavGroup>
        ) : (
          <NavGroup iconImg={kontrakIcon} label="Kontrak" defaultOpen>
            <NavItem to="/kontrak/daftar" icon={null} label="Daftar Kontrak" />
            <NavItem to="/kontrak/upload-revisi" icon={null} label="Upload Revisi" />
          </NavGroup>
        )}

        <NavGroup iconImg={repositoryIcon} label="Repository">
          <NavItem to="/repository" icon={null} label="Daftar Dokumen" />
        </NavGroup>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">CLM Axiata v2.0</p>
      </div>
    </aside>
  )
}
