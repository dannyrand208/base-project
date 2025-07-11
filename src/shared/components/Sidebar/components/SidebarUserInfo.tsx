import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'

interface SidebarUserInfoProps {
  userInfo?: {
    name: string
    email: string
    avatar?: ReactNode
  }
  collapsed: boolean
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  userInfo,
  collapsed,
}) => {
  if (!userInfo) return null

  return (
    <div className="p-4 border-t border-gray-700 flex-shrink-0">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          {userInfo.avatar || <UserOutlined className="text-sm" />}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {userInfo.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{userInfo.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}
