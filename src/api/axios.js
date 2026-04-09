import axios from 'axios'

// Dynamic base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in production environment
  if (import.meta.env.MODE === 'production') {
    return import.meta.env.VITE_API_BASE_URL || 'https://bridge-backend-42f8.onrender.com/api'
  }
  // Default to localhost for development
  return import.meta.env.VITE_API_BASE_URL
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me'
  },
  
  // Users endpoints
  users: {
    getAll: '/users',
    getById: (id) => `/users/${id}`,
    create: '/users',
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`
  },
  
  // Accounts endpoints
  accounts: {
    me: '/accounts/me',
    getById: (id) => `/accounts/${id}`,
    update: (id) => `/accounts/${id}`,
    delete: (id) => `/accounts/${id}`
  },
  
  // Voyages/Trips endpoints
  voyages: {
    getAll: '/voyages',
    getById: (id) => `/voyages/${id}`,
    create: '/voyages',
    update: (id) => `/voyages/${id}`,
    delete: (id) => `/voyages/${id}`,
    getByAccountId: (accountId) => `/voyages/account/${accountId}`
  },
  
  // Colis/Packages endpoints
  colis: {
    getAll: '/colis',
    getById: (id) => `/colis/${id}`,
    create: '/colis',
    update: (id) => `/colis/${id}`,
    delete: (id) => `/colis/${id}`,
    updatePayment: (id) => `/colis/${id}/payment`,
    getStats: '/colis/stats'
  }
}

// API service methods
export const apiService = {
  // Auth methods
  auth: {
    login: (credentials) => api.post(endpoints.auth.login, credentials),
    register: (userData) => api.post(endpoints.auth.register, userData),
    getMe: () => api.get(endpoints.auth.me)
  },
  
  // Users methods
  users: {
    getAll: () => api.get(endpoints.users.getAll),
    getById: (id) => api.get(endpoints.users.getById(id)),
    create: (userData) => api.post(endpoints.users.create, userData),
    update: (id, userData) => api.put(endpoints.users.update(id), userData),
    delete: (id) => api.delete(endpoints.users.delete(id))
  },
  
  // Accounts methods
  accounts: {
    getMe: () => api.get(endpoints.accounts.me),
    getById: (id) => api.get(endpoints.accounts.getById(id)),
    update: (id, accountData) => api.put(endpoints.accounts.update(id), accountData),
    delete: (id) => api.delete(endpoints.accounts.delete(id))
  },
  
  // Voyages methods
  voyages: {
    getAll: () => api.get(endpoints.voyages.getAll),
    getById: (id) => api.get(endpoints.voyages.getById(id)),
    create: (voyageData) => api.post(endpoints.voyages.create, voyageData),
    update: (id, voyageData) => api.put(endpoints.voyages.update(id), voyageData),
    delete: (id) => api.delete(endpoints.voyages.delete(id)),
    getByAccountId: (accountId) => api.get(endpoints.voyages.getByAccountId(accountId))
  },
  
  // Colis methods
  colis: {
    getAll: (params = {}) => api.get(endpoints.colis.getAll, { params }),
    getById: (id) => api.get(endpoints.colis.getById(id)),
    create: (colisData) => api.post(endpoints.colis.create, colisData),
    update: (id, colisData) => api.put(endpoints.colis.update(id), colisData),
    delete: (id) => api.delete(endpoints.colis.delete(id)),
    updatePayment: (id, paymentData) => api.patch(endpoints.colis.updatePayment(id), paymentData),
    getStats: (params = {}) => api.get(endpoints.colis.getStats, { params })
  }
}

export default api
