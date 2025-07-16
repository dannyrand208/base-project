import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthProvider } from '../features/auth/context/AuthContext'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <TanStackRouterDevtools />
    </>
  )
}
