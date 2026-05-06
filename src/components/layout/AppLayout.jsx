import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        className={`pt-14 transition-all duration-300 min-h-screen ${
          sidebarOpen ? 'ml-60' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
