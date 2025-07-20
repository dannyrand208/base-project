interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  success: boolean
  user?: {
    username: string
    name: string
    role: string
    email?: string
  }
  message?: string
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const data = await response.json()
        return {
          success: true,
          user: data.user || {
            username: credentials.username,
            name: credentials.username,
            role: 'admin',
          },
        }
      } else if (response.status === 404) {
        return {
          success: false,
          message: 'Account does not exist',
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        return {
          success: false,
          message: errorData.message || 'Login failed',
        }
      }
    } catch (error) {
      console.error('Login API error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.',
      }
    }
  },
}
