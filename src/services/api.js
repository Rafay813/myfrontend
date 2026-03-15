import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes for large files
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

/**
 * Upload Google Drive link to hosting services
 */
export const uploadDriveLink = async (driveLink) => {
  const response = await api.post('/api/upload', { driveLink })
  return response.data
}

/**
 * Health check
 */
export const checkHealth = async () => {
  const response = await api.get('/api/health')
  return response.data
}

export default api