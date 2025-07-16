import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from '@tanstack/react-router'

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: '/login' })
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default RequireAuth
