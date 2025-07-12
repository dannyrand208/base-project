import React from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { SidebarNavigation } from './components/SidebarNavigation'
import { SidebarUserInfo } from './components/SidebarUserInfo'
import { useSidebarLogic } from './hooks/useSidebarLogic'
import { SidebarHeader } from './components/SidebarHeader'
import type { SidebarProps } from './types'

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  logo,
  menuItems,
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileToggle,
  userInfo,
  theme = 'dark',
}) => {
  const { isActive, handleLinkClick } = useSidebarLogic(
    mobileOpen,
    onMobileToggle,
  )

  const themeClasses = {
    dark: 'bg-gray-900 text-white',
    light: 'bg-white text-gray-900 border-r border-gray-200',
  }

  const SidebarContent = ({
    showCloseButton,
    onClose,
  }: {
    showCloseButton: boolean
    onClose?: () => void
  }) => (
    <div className="flex flex-col h-full">
      <SidebarHeader
        title={title}
        logo={logo}
        collapsed={collapsed}
        onCollapse={onCollapse}
        showCloseButton={showCloseButton}
        onClose={onClose}
      />

      <SidebarNavigation
        menuItems={menuItems}
        collapsed={collapsed}
        isActive={isActive}
        onLinkClick={handleLinkClick}
      />

      <SidebarUserInfo userInfo={userInfo} collapsed={collapsed} />
    </div>
  )

  return (
    <>
      {/* Mobile Header - Built into Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => onMobileToggle(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MenuOutlined className="text-xl text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed left-0 top-0 h-screen transition-all duration-300 z-30 ${
          themeClasses[theme]
        } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <SidebarContent showCloseButton={false} />
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`lg:hidden fixed left-0 top-0 h-screen transition-transform duration-300 z-50 w-64 ${
          themeClasses[theme]
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent
          showCloseButton={true}
          onClose={() => onMobileToggle(false)}
        />
      </div>
    </>
  )
}
