import type { ReactNode } from 'react'

export interface MenuItem {
  key: string
  icon: ReactNode
  label: string
  path: string
}

export interface SidebarProps {
  title: string
  logo?: ReactNode
  menuItems: MenuItem[]
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  mobileOpen: boolean
  onMobileToggle: (open: boolean) => void
  userInfo?: {
    name: string
    email: string
    avatar?: ReactNode
  }
  theme?: 'dark' | 'light'
} 