import React, { useState } from 'react'
import { Form, Input, Button, message, Card, Typography, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'

const { Title, Text } = Typography

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    const success = await login(values.email, values.password)
    setLoading(false)
    if (success) {
      message.success('Login successful!')
      navigate({ to: '/' })
    } else {
      message.error('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Title level={2} className="text-gray-900">
            Admin Login
          </Title>
          <Text className="text-gray-600">
            Sign in to access the admin dashboard
          </Text>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
            initialValues={{
              email: 'admin@example.com',
              password: 'password',
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
