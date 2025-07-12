import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

export const useSidebarLogic = (
  mobileOpen: boolean,
  onMobileToggle: (open: boolean) => void,
) => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleLinkClick = () => {
    onMobileToggle(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar')
      const target = event.target as Node
      if (mobileOpen && sidebar && !sidebar.contains(target)) {
        onMobileToggle(false)
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen, onMobileToggle])

  return {
    isActive,
    handleLinkClick,
  }
}
