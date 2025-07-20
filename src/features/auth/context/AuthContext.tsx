import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/authApi'

interface User {
  username: string
  name: string
  role: string
  email?: string
}

interface AuthContextType {
  user: User | null
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const result = await authApi.login({ username, password })

      if (result.success && result.user) {
        const userData = {
          username: result.user.username,
          name: result.user.name,
          role: result.user.role,
          email: result.user.email,
        }
        setUser(userData)
        localStorage.setItem('auth_user', JSON.stringify(userData))
        return { success: true }
      } else {
        return {
          success: false,
          message: result.message || 'Login failed',
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'An unexpected error occurred',
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
