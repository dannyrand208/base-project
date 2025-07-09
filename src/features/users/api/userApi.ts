import { api } from '../../../shared/lib/api'
import type { User, CreateUserData, UpdateUserData } from '../types'

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get('/users')
    return data
  },

  getUser: async (id: number): Promise<User> => {
    const { data } = await api.get(`/users/${id}`)
    return data
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const { data } = await api.post('/users', userData)
    return data
  },

  updateUser: async (id: number, userData: UpdateUserData): Promise<User> => {
    const { data } = await api.put(`/users/${id}`, userData)
    return data
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
