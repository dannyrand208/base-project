import { createFileRoute } from '@tanstack/react-router'
import UsersList from '../features/users/components/UsersList'

export const Route = createFileRoute('/users')({
  component: AdminUsers,
})

function AdminUsers() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Users Management
        </h1>
        <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">
          Manage all users in your system
        </p>
      </div>

      <UsersList />
    </div>
  )
}
