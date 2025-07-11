import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AdminLayout from '../features/admin/layouts/AdminLayout'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
      <TanStackRouterDevtools />
    </>
  )
}
