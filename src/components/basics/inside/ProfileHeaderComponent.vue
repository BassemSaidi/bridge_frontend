<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/30 shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo Section -->
        <router-link to="/" class="flex items-center gap-2 lg:gap-3 group">
            <div class="flex h-8 w-8 lg:h-11 lg:w-11 items-center justify-center rounded-xl lg:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg shadow-slate-200/50 group-hover:shadow-indigo-200/50 transition-all duration-300">
              <Package :size="24" class="text-white lg:text-base" />
            </div>
            <div class="hidden sm:block group h-10 overflow-hidden cursor-pointer bg-white ">
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

        <!-- Desktop Navigation Actions -->
        <div class="hidden sm:flex items-center gap-2">

          <!-- Share Profile -->
          <button 
            @click="shareProfile"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
          >
            <Share :size="16" />
            <span>{{ currentLang === 'en' ? 'Share' : 'Partager' }}</span>
          </button>

          <!-- My Trips -->
          <router-link 
            to="/voyages"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-all duration-200"
          >
            <Users :size="16" />
            <span>{{ currentLang === 'en' ? 'My Trips' : 'Mes Voyages' }}</span>
          </router-link>

          <!-- Add Trip -->
          <router-link 
            to="/addtrip"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 shadow-sm"
          >
            <Plus :size="16" />
            <span>{{ currentLang === 'en' ? 'New Trip' : 'Nouveau' }}</span>
          </router-link>

            <!-- Language Toggle -->
            <button 
            @click="toggleLanguage"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Globe :size="16" />
            <span>{{ currentLang === 'en' ? 'FR' : 'EN' }}</span>
          </button>
          <!-- User Profile -->
          <div v-if="isLoggedIn" class="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
            <div class="relative">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User :size="16" class="text-white" />
              </div>
              <div class="absolute -bottom-0 -right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <!-- Profile Dropdown -->
            <div class="relative profile-dropdown">
              <button 
                @click="toggleProfileMenu"
                class="flex items-center gap-1 p-1 rounded-lg hover:bg-slate-100 transition-all duration-200"
                title="Profile Menu"
              >
                <ChevronDown :size="16" class="text-slate-400" />
              </button>
              
              <!-- Dropdown Menu -->
              <div v-if="profileMenuOpen" class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/50 py-2 z-50">
                <router-link 
                  to="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 rounded-lg"
                  @click="closeProfileMenu"
                >
                  <User :size="16" />
                  <span>{{ currentLang === 'en' ? 'My Profile' : 'Mon Profil' }}</span>
                </router-link>
                
                
                <hr class="my-2 border-slate-200" />
                
                <button 
                  @click="handleLogout"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-lg w-full"
                >
                  <LogOut :size="16" />
                  <span>{{ currentLang === 'en' ? 'Logout' : 'Déconnexion' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Login Button -->
          <router-link 
            v-else
            to="/login"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <User :size="16" />
            <span>{{ currentLang === 'en' ? 'Login' : 'Connexion' }}</span>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="sm:hidden flex items-center gap-2">
          <!-- Mobile User Profile -->
          <div v-if="isLoggedIn" class="flex items-center gap-2">
            <div class="relative">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User :size="16" class="text-white" />
              </div>
              <div class="absolute -bottom-0 -right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
          </div>
          
          <!-- Mobile Menu Toggle -->
          <button 
            @click="toggleMobileMenu"
            data-mobile-toggle
            class="flex items-center justify-center w-10 h-10 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Menu :size="20" v-if="!mobileMenuOpen" />
            <X :size="20" v-else />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden border-t border-slate-200/50 py-4 mobile-menu">
        <nav class="flex flex-col space-y-2">
          <!-- Language Toggle -->
          <button 
            @click="toggleLanguage"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Globe :size="18" />
            {{ currentLang === 'en' ? 'Change Language' : 'Changer Langue' }}
          </button>

          <!-- Share Profile -->
          <button 
            @click="shareProfile"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
          >
            <Share :size="18" />
            {{ currentLang === 'en' ? 'Share Profile' : 'Partager Profil' }}
          </button>

          <!-- My Trips -->
          <router-link 
            to="/voyages"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <Users :size="18" />
            {{ currentLang === 'en' ? 'My Trips' : 'Mes Voyages' }}
          </router-link>

          <!-- Add Trip -->
          <router-link 
            to="/addtrip"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200"
          >
            <Plus :size="18" />
            {{ currentLang === 'en' ? 'New Trip' : 'Nouveau Voyage' }}
          </router-link>

          <!-- User Profile Section (Mobile) -->
          <div v-if="isLoggedIn" class="border-t border-slate-200/50 pt-2 mt-2">
            <div class="flex items-center gap-3 px-4 py-2">
              <div class="relative">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User :size="20" class="text-white" />
                </div>
                <div class="absolute -bottom-0 -right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
              </div>
              <div>
                <div class="text-sm font-medium text-slate-900">{{ currentUser?.name || 'User' }}</div>
                <div class="text-xs text-slate-500">{{ currentUser?.email || 'user@example.com' }}</div>
              </div>
            </div>
            
            <router-link 
              to="/profile"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <User :size="18" />
              {{ currentLang === 'en' ? 'My Profile' : 'Mon Profil' }}
            </router-link>
            
            <router-link 
              to="/settings"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              <Settings :size="18" />
              {{ currentLang === 'en' ? 'Settings' : 'Paramètres' }}
            </router-link>
            
            <button 
              @click="handleLogout"
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 w-full"
            >
              <LogOut :size="18" />
              {{ currentLang === 'en' ? 'Logout' : 'Déconnexion' }}
            </button>
          </div>

          <!-- Login Button (Mobile) -->
          <router-link 
            v-else
            to="/login"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
          >
            <User :size="18" />
            {{ currentLang === 'en' ? 'Login' : 'Connexion' }}
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Package, 
  Globe, 
  Share, 
  Users, 
  Plus, 
  User,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

const router = useRouter()
const mobileMenuOpen = ref(false)
const profileMenuOpen = ref(false)
const currentLang = ref('en')
const isLoggedIn = ref(false)
const currentUser = ref(null)

// Props for customization
const props = defineProps({
  currentLang: {
    type: String,
    default: 'en'
  }
})

// Emit events
const emit = defineEmits(['language-changed'])

// Check login status
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  isLoggedIn.value = !!token
  currentUser.value = user ? JSON.parse(user) : null
}

// Language toggle
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'fr' : 'en'
  localStorage.setItem('preferredLanguage', currentLang.value)
  emit('language-changed', currentLang.value)
}

// Load language preference
const loadLanguagePreference = () => {
  const saved = localStorage.getItem('preferredLanguage')
  if (saved) {
    currentLang.value = saved
  }
}

// Share profile function
const shareProfile = () => {
  // Get current profile URL
  const profileUrl = window.location.origin + '/profile/' + currentUser.value?.id
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'BridgeTN Profile',
      text: currentLang.value === 'en' 
        ? 'Check out my BridgeTN profile!' 
        : 'Découvrez mon profil BridgeTN!',
      url: profileUrl
    }).catch(err => console.log('Share cancelled'))
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert(currentLang.value === 'en' 
        ? 'Profile link copied to clipboard!' 
        : 'Lien du profil copié dans le presse-papiers!')
    }).catch(err => console.error('Failed to copy:', err))
  }
}

// Mobile menu functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Profile dropdown functions
const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}

const closeProfileMenu = () => {
  profileMenuOpen.value = false
}

// Logout function
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  currentUser.value = null
  profileMenuOpen.value = false
  mobileMenuOpen.value = false
  router.push('/login')
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  // Close profile dropdown if clicking outside
  if (!event.target.closest('.profile-dropdown')) {
    profileMenuOpen.value = false
  }
  
  // Close mobile menu if clicking outside (but not on menu toggle button)
  if (!event.target.closest('.mobile-menu') && !event.target.closest('[data-mobile-toggle]')) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  checkLoginStatus()
  loadLanguagePreference()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Smooth backdrop blur effect */
.bg-white\/90 {
  background-color: rgba(255, 255, 255, 0.9);
}

/* Hover animations */
header a:hover {
  transform: translateY(-1px);
}

/* Button transitions */
header button, header a {
  transition: all 0.2s ease;
}

/* Logo hover effect */
header .group:hover .group-hover\:shadow-indigo-200\/50 {
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.2);
}
</style>
