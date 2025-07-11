import type { ReactNode } from 'react'

export interface MenuItem {
  key: string
  icon: ReactNode
  label: string
  path: string
}

export interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  mobileOpen: boolean
  onMobileToggle: (open: boolean) => void
}
