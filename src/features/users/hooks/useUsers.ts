import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../api/userApi'
import type { User, CreateUserData, UpdateUserData } from '../types'

// Custom hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UpdateUserData }) =>
      userApi.updateUser(id, userData),
    onSuccess: (data, variables) => {
      // Update the user in the cache
      queryClient.setQueryData(['users', variables.id], data)
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (_, deletedId) => {
      // Remove user from cache and invalidate users list
      queryClient.removeQueries({ queryKey: ['users', deletedId] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
