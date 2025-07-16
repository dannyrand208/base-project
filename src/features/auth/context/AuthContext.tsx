import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
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

  const login = async (email: string, password: string) => {
    const users = [
      {
        email: 'admin@example.com',
        password: 'password',
        name: 'Admin User',
        role: 'admin',
      },
      {
        email: 'user@example.com',
        password: 'password',
        name: 'Regular User',
        role: 'user',
      },
    ]

    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    )

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      return true
    }
    return false
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
