import axios from 'axios'

// Create axios instance with base configuration
export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://your-api-domain.com/api'
      : 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }

    if (error.response?.status === 403) {
      // Handle forbidden
      console.error('Access forbidden')
    }

    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.data)
    }

    return Promise.reject(error)
  },
)

export default api
