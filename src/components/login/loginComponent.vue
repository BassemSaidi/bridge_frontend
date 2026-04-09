<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <!-- Toast Container -->
    <div v-if="toast.show" class="fixed top-20 right-4 z-50 animate-pulse">
      <div 
        class="relative overflow-hidden rounded-2xl shadow-2xl border backdrop-blur-sm p-4 min-w-[300px] max-w-md transition-all duration-300 transform"
        :class="{
          'bg-green-50 border-green-200 text-green-800': toast.type === 'success',
          'bg-red-50 border-red-200 text-red-800': toast.type === 'error',
          'bg-blue-50 border-blue-200 text-blue-800': toast.type === 'info',
          'bg-yellow-50 border-yellow-200 text-yellow-800': toast.type === 'warning'
        }"
      >
        <!-- Icon -->
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 mt-0.5">
            <div v-if="toast.type === 'success'" class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div v-else-if="toast.type === 'error'" class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div v-else class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h1M13 16h1m0 0h.01"></path>
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium leading-tight">
              {{ toast.message }}
            </p>
            <p class="text-xs mt-1 opacity-75">
              {{ toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Info' }}
            </p>
          </div>
          
          <!-- Close Button -->
          <button 
            @click="hideToast"
            class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div 
          class="absolute bottom-0 left-0 h-1 transition-all duration-300"
          :class="{
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-blue-500': toast.type === 'info',
            'bg-yellow-500': toast.type === 'warning'
          }"
          :style="{ width: toast.progress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Existing content -->
    <HeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />
    <main class="container mx-auto px-4 mt-[-4]">
      <LoginBodyComponent 
        :currentLang="currentLang"
        @language-changed="handleLanguageChange"
        @submit="handleLogin"
      />
    </main>
    <FooterComponent 
      :currentLang="currentLang" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { apiService } from '../../api/axios.js'
import { Package, Globe, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import HeaderComponent from '../basics/headerComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'
import LoginBodyComponent from './components/LoginBodyComponent.vue'

export default {
  name: 'LoginComponent',
  components: {
    Package,
    Globe,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    HeaderComponent,
    FooterComponent,
    LoginBodyComponent
  },
  setup() {
    const currentLang = ref(localStorage.getItem('language') || 'en')
    const showPassword = ref(false)
    const isLoading = ref(false)
    const form = ref({
      email: '',
      password: ''
    })

    // Toast reactive data
    const toast = ref({
      show: false,
      message: '',
      type: 'info',
      progress: 0
    })

    // Show toast function
    const showToast = (message, type = 'info') => {
      toast.value = {
        show: true,
        message,
        type,
        progress: 0
      }

      // Animate progress bar
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += 2
        toast.value.progress = Math.min(progress, 100)
        
        if (progress >= 100) {
          clearInterval(progressInterval)
          // Auto hide after 3 seconds
          setTimeout(() => {
            hideToast()
          }, 3000)
        }
      }, 50)
    }

    // Hide toast function
    const hideToast = () => {
      toast.value.show = false
      toast.value.progress = 0
    }

    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
      localStorage.setItem('language', newLang)
    }

    const handleLogin = async (formData) => {
      isLoading.value = true
      
      try {
        const response = await apiService.auth.login(formData)
        
        if (response.data.success) {
          // Store token and user info
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.data))
          
          // Role-based routing
          if (response.data.data.role === 'ADMIN') {
            window.location.href = '/admin'
          } else {
            window.location.href = '/profile'
          }
        } else {
          showToast(response.data.error || 'Login failed', 'error')
        }
      } catch (error) {
        console.error('Login error:', error)
        showToast('Login failed. Please try again.', 'error')
      } finally {
        isLoading.value = false
      }
    }

    return {
      currentLang,
      showPassword,
      isLoading,
      form,
      toast,
      showToast,
      hideToast,
      handleLanguageChange,
      handleLogin
    }
  }
}
</script>
