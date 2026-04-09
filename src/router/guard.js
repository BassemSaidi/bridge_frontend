import { createRouter, createWebHistory } from 'vue-router'

// Route guard for authentication
export const requireAuth = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  
  if (!token || !user) {
    return '/login'
  }
  
  const userData = JSON.parse(user)
  
  // Check if user is trying to access admin routes
  if (userData.role !== 'ADMIN' && window.location.pathname.startsWith('/admin')) {
    return '/login'
  }
  
  // Check if transporter is trying to access admin routes
  if (userData.role === 'TRANSPORTEUR' && window.location.pathname.startsWith('/admin')) {
    return '/login'
  }
  
  return null
}

// Role-based redirect
export const getHomeRoute = () => {
  const user = localStorage.getItem('user')
  
  if (!user) {
    return '/login'
  }
  
  const userData = JSON.parse(user)
  return userData.role === 'ADMIN' ? '/admin' : '/profile'
}
