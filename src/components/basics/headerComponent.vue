<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-18">
        <!-- Left Section: Back Button & Logo -->
        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Back Button - Hidden on mobile if no history -->
          <button 
            v-if="showBackButton"
            @click="goBack"
            class="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
            title="Go back"
          >
            <ArrowLeft :size="16" class="text-slate-400 group-hover:text-slate-600 lg:text-base" />
          </button>
          
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 lg:gap-3 group">
            <div class="flex h-8 w-8 lg:h-11 lg:w-11 items-center justify-center rounded-xl lg:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg shadow-slate-200/50 group-hover:shadow-indigo-200/50 transition-all duration-300">
              <Package :size="16" class="text-white lg:text-base" />
            </div>
            <div class="hidden sm:block group h-10 overflow-hidden cursor-pointer bg-white">
                <div class="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-10">
                    <!-- First state -->
                    <div class="h-10 flex items-center">
                    <span class="text-lg lg:text-2xl font-black tracking-tighter text-slate-900">
                        BRIDGE<span class="text-indigo-600">TN</span>
                    </span>
                    </div>
                    <!-- Hover state -->
                    <div class="h-10 flex flex-col justify-center leading-none">
                    <span class="text-lg lg:text-2xl font-black tracking-tighter text-indigo-600">
                        BRIDGE<span class="text-slate-900">TN</span>
                    </span>
                    <span class="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400">
                        Your Gate to the World
                    </span>
                    </div>
                </div>
            </div>
            <!-- Mobile-only logo text -->
            <div class="sm:hidden">
              <span class="text-lg font-black tracking-tighter text-slate-900">
                BT
              </span>
            </div>
          </router-link>
        </div>

        <!-- Middle Section: Navigation (Desktop & Tablet) -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8">
          <a 
            href="#accueil"
            class="text-sm lg:text-base font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200 relative group"
          >
            {{ currentLang === 'en' ? 'Home' : 'Accueil' }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a 
            href="#track"
            class="text-sm lg:text-base font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200 relative group"
            >
            {{ currentLang === 'en' ? 'Track My Colis' : 'Suivre Mes Colis' }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a 
        href="#what"
        class="text-sm lg:text-base font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200 relative group"
        >
        {{ currentLang === 'en' ? "What's BridgeTN" : "Qu'est-ce que BridgeTN" }}
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </a>
</nav>

        <!-- Right Section: Actions -->
        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Language Toggle Button -->
          <button 
            @click="toggleLanguage"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            title="Change Language"
          >
            <Globe :size="16" />
            <span class="hidden sm:inline">{{ currentLang === 'en' ? 'FR' : 'EN' }}</span>
          </button>

          <!-- Auth Buttons -->
          <div v-if="!isLoggedIn" class="flex items-center gap-2">
            <!-- Desktop Login Button -->
            <router-link 
              to="/login" 
              class="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0056D2] border-2 border-[#0056D2] hover:bg-[#0056D2] hover:text-white rounded-lg transition-all duration-200"
            >
              <User :size="16" />
              {{ currentLang === 'en' ? 'Login' : 'Connexion' }}
            </router-link>
            
            <!-- Mobile Login Button -->
            <router-link 
              to="/login" 
              class="md:hidden flex items-center justify-center w-10 h-10 text-[#0056D2] border-2 border-[#0056D2] hover:bg-[#0056D2] hover:text-white rounded-lg transition-all duration-200"
              title="Login"
            >
              <User :size="18" />
            </router-link>
          </div>

          <!-- Profile Button (when logged in) -->
          <router-link 
            v-else
            to="/profile"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-indigo-200/50"
          >
            <User :size="16" />
            <span class="hidden sm:inline">{{ currentLang === 'en' ? 'Profile' : 'Profil' }}</span>
          </router-link>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden flex items-center justify-center w-10 h-10 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Menu :size="20" v-if="!mobileMenuOpen" />
            <X :size="20" v-else />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-slate-200/50 py-4">
        <nav class="flex flex-col space-y-3">
          <a 
            href="#accueil"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Home :size="18" />
            {{ currentLang === 'en' ? 'Home' : 'Accueil' }}
          </a>

          <a 
          href="#track"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
          <Search :size="18" />
          {{ currentLang === 'en' ? 'Track My Colis' : 'Suivre Mes Colis' }}
        </a>

        <a 
          href="#what"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
        >
          <Info :size="18" />
          {{ currentLang === 'en' ? "What's BridgeTN" : "Qu'est-ce que BridgeTN" }}
        </a>
          
          <div class="border-t border-slate-200/50 pt-3 mt-3 space-y-2">
            <button 
              @click="toggleLanguage"
              class="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <Globe :size="18" />
              {{ currentLang === 'en' ? 'Change Language' : 'Changer Langue' }}
            </button>
            
            <router-link 
              v-if="!isLoggedIn"
              to="/login"
              @click="closeMobileMenu"
              class="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-[#0056D2] border-2 border-[#0056D2] hover:bg-[#0056D2] hover:text-white rounded-lg transition-all duration-200"
            >
              <User :size="18" />
              {{ currentLang === 'en' ? 'Login' : 'Connexion' }}
            </router-link>
            
            <router-link 
              v-else
              to="/profile"
              @click="closeMobileMenu"
              class="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200"
            >
              <User :size="18" />
              {{ currentLang === 'en' ? 'Profile' : 'Profil' }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Package, 
  Menu, 
  X, 
  Home,
  Info,
  Search,
  User,
  Globe
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const currentLang = ref('en')
const isLoggedIn = ref(false)

// Props for customization
const props = defineProps({
  showBackButton: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
})

// Emit events
const emit = defineEmits(['language-changed'])

// Check login status
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}

// Language toggle
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'fr' : 'en'
  // Store preference in localStorage
  localStorage.setItem('preferredLanguage', currentLang.value)
  // Emit language change event
  emit('language-changed', currentLang.value)
}

// Load language preference
const loadLanguagePreference = () => {
  const saved = localStorage.getItem('preferredLanguage')
  if (saved) {
    currentLang.value = saved
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/profile')
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close mobile menu on route change
const routeWatcher = computed(() => route.path)

// Handle escape key to close mobile menu
const handleEscape = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  checkLoginStatus()
  loadLanguagePreference()
  closeMobileMenu()
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Custom animations and transitions */
.group:hover .group-hover\:shadow-indigo-200\/50 {
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.2);
}

/* Smooth backdrop blur effect */
.bg-white\/95 {
  background-color: rgba(255, 255, 255, 0.95);
}

/* Custom scrollbar for mobile menu */
.lg\:hidden .space-y-3::-webkit-scrollbar {
  width: 4px;
}

.lg\:hidden .space-y-3::-webkit-scrollbar-track {
  background: transparent;
}

.lg\:hidden .space-y-3::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.3);
  border-radius: 2px;
}

.lg\:hidden .space-y-3::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.5);
}
</style>