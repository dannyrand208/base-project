import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import type { MenuItem } from '../../../shared/components/Sidebar'

export const adminMenuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined className="text-lg" />,
    label: 'Dashboard',
    path: '/',
  },
  {
    key: 'users',
    icon: <UserOutlined className="text-lg" />,
    label: 'Users',
    path: '/users',
  },
  {
    key: 'languages',
    icon: <TranslationOutlined className="text-lg" />,
    label: 'Languages',
    path: '/languages',
  },
  {
    key: 'products',
    icon: <ShoppingCartOutlined className="text-lg" />,
    label: 'Products',
    path: '/products',
  },
  {
    key: 'orders',
    icon: <FileTextOutlined className="text-lg" />,
    label: 'Orders',
    path: '/orders',
  },
  {
    key: 'settings',
    icon: <SettingOutlined className="text-lg" />,
    label: 'Settings',
    path: '/settings',
  },
]

export const adminSidebarConfig = {
  title: 'Admin Panel',
  logo: <HomeOutlined className="text-white text-lg" />,
  menuItems: adminMenuItems,
  theme: 'dark' as const,
}
