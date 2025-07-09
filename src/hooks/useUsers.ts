import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

// Types
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  website?: string
}

export interface CreateUserData {
  name: string
  email: string
  phone?: string
  website?: string
}

// API functions
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users')
  return data
}

const fetchUser = async (id: number): Promise<User> => {
  const { data } = await api.get(`/users/${id}`)
  return data
}

const createUser = async (userData: CreateUserData): Promise<User> => {
  const { data } = await api.post('/users', userData)
  return data
}

const updateUser = async ({
  id,
  userData,
}: {
  id: number
  userData: Partial<CreateUserData>
}): Promise<User> => {
  const { data } = await api.put(`/users/${id}`, userData)
  return data
}

const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}

// Custom hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
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
    mutationFn: deleteUser,
    onSuccess: (_, deletedId) => {
      // Remove user from cache and invalidate users list
      queryClient.removeQueries({ queryKey: ['users', deletedId] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
