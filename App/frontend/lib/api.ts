import axios from 'axios'

// API client configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const api = {
  // Wallet endpoints
  wallets: {
    getAll: () => apiClient.get('/api/wallets'),
    getById: (id: string) => apiClient.get(`/api/wallets/${id}`),
    create: (data: object) => apiClient.post('/api/wallets', data),
    update: (id: string, data: object) => apiClient.put(`/api/wallets/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/wallets/${id}`),
  },
  
  // Token endpoints
  tokens: {
    getAll: () => apiClient.get('/api/tokens'),
    getById: (id: string) => apiClient.get(`/api/tokens/${id}`),
    create: (data: object) => apiClient.post('/api/tokens', data),
    update: (id: string, data: object) => apiClient.put(`/api/tokens/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/tokens/${id}`),
  },
  
  // Bundle endpoints
  bundles: {
    getAll: () => apiClient.get('/api/bundles'),
    getById: (id: string) => apiClient.get(`/api/bundles/${id}`),
    create: (data: object) => apiClient.post('/api/bundles', data),
    update: (id: string, data: object) => apiClient.put(`/api/bundles/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/bundles/${id}`),
    execute: (id: string) => apiClient.post(`/api/bundles/${id}/execute`),
  },
}