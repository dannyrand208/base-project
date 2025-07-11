import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { adminSidebarConfig } from '../config/sidebarConfig'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        {...adminSidebarConfig}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileToggle={setMobileOpen}
      />

      <div
        className={`transition-all duration-300 min-h-screen ${
          collapsed ? 'ml-0 lg:ml-20' : 'ml-0 lg:ml-64'
        }`}
      >
        <main className="p-4 lg:p-6 pt-20 lg:pt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-3rem)]">
            <div className="p-4 lg:p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
