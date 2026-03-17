import axios from 'axios'

const BASE_URL = 'http://159.195.57.237'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 0,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export const uploadDriveLink = async (driveLink) => {
  const response = await api.post('/api/upload', { driveLink })
  return response.data
}

export const checkHealth = async () => {
  const response = await api.get('/api/health')
  return response.data
}

export const fetchHistory = async (page = 1, limit = 20) => {
  const response = await api.get(`/api/history?page=${page}&limit=${limit}`)
  return response.data
}

export const clearHistoryDB = async () => {
  const response = await api.delete('/api/history')
  return response.data
}

export default api