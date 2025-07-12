import React from 'react'
import { Link } from '@tanstack/react-router'
import type { MenuItem } from '../types'

interface SidebarNavigationProps {
  menuItems: MenuItem[]
  collapsed: boolean
  isActive: (path: string) => boolean
  onLinkClick: () => void
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  menuItems,
  collapsed,
  isActive,
  onLinkClick,
}) => {
  return (
    <nav className="mt-6 flex-1 overflow-y-auto">
      <ul className="space-y-2 px-3">
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              to={item.path}
              onClick={onLinkClick}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
