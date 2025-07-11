import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

interface SidebarHeaderProps {
  title: string
  logo?: ReactNode
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  showCloseButton: boolean
  onClose?: () => void
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  logo,
  collapsed,
  onCollapse,
  showCloseButton,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
      {!collapsed && (
        <div className="flex items-center space-x-3">
          {logo && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              {logo}
            </div>
          )}
          <span className="text-xl font-bold">{title}</span>
        </div>
      )}

      {showCloseButton ? (
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <CloseOutlined className="text-lg" />
        </button>
      ) : (
        <button
          onClick={() => onCollapse(!collapsed)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="text-lg" />
          ) : (
            <MenuFoldOutlined className="text-lg" />
          )}
        </button>
      )}
    </div>
  )
}
