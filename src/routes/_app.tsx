import { createFileRoute, Outlet } from '@tanstack/react-router'
import RequireAuth from '../features/auth/components/RequireAuth'
import { AdminLayout } from '../features/admin/layouts/AdminLayout'

export const Route = createFileRoute('/_app')({
  component: () => (
    <RequireAuth>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </RequireAuth>
  ),
})
