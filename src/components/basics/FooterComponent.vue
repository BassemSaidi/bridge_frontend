<template>
  <footer class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            <!-- Brand Section -->
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Globe :size="24" class="text-white" />
                </div>
                <h3 class="text-2xl font-bold">BridgeTN</h3>
              </div>
              <p class="text-slate-300 leading-relaxed text-sm lg:text-base">
                {{ currentLang === 'en' 
                  ? 'Connecting Tunisia with the world through innovative logistics solutions.'
                  : 'Relier la Tunisie au monde par des solutions logistiques innovantes.' }}
              </p>
              <div class="flex items-center gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank"
                  class="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  class="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:bassem.saidi03@gmail.com" 
                  class="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Mail :size="20" class="text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="space-y-6">
              <h4 class="text-lg font-semibold text-white">
                {{ currentLang === 'en' ? 'Quick Links' : 'Liens Rapides' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <a href="#accueil" class="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight :size="16" class="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {{ currentLang === 'en' ? 'Home' : 'Accueil' }}
                  </a>
                </li>
                <li>
                  <a href="#track" class="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight :size="16" class="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {{ currentLang === 'en' ? 'Track Package' : 'Suivre Colis' }}
                  </a>
                </li>
                <li>
                  <a href="#what" class="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight :size="16" class="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {{ currentLang === 'en' ? 'About BridgeTN' : 'À Propos de BridgeTN' }}
                  </a>
                </li>
                <li>
                  <a href="/login" class="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight :size="16" class="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {{ currentLang === 'en' ? 'Transporter Login' : 'Connexion Transporteur' }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Services -->
            <div class="space-y-6">
              <h4 class="text-lg font-semibold text-white">
                {{ currentLang === 'en' ? 'Services' : 'Services' }}
              </h4>
              <ul class="space-y-3">
                <li>
                  <span class="text-slate-300 flex items-center gap-2">
                    <Package :size="16" />
                    {{ currentLang === 'en' ? 'Package Transport' : 'Transport de Colis' }}
                  </span>
                </li>
                <li>
                  <span class="text-slate-300 flex items-center gap-2">
                    <Globe :size="16" />
                    {{ currentLang === 'en' ? 'International Shipping' : 'Expédition Internationale' }}
                  </span>
                </li>
                <li>
                  <span class="text-slate-300 flex items-center gap-2">
                    <Search :size="16" />
                    {{ currentLang === 'en' ? 'Real-time Tracking' : 'Suivi en Temps Réel' }}
                  </span>
                </li>
                <li>
                  <span class="text-slate-300 flex items-center gap-2">
                    <Shield :size="16" />
                    {{ currentLang === 'en' ? 'Secure Delivery' : 'Livraison Sécurisée' }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Contact -->
            <div class="space-y-6">
              <h4 class="text-lg font-semibold text-white">
                {{ currentLang === 'en' ? 'Contact' : 'Contact' }}
              </h4>
              <div class="space-y-4">
                <a href="mailto:bassem.saidi03@gmail.com" class="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group">
                  <div class="w-8 h-8 bg-slate-800 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                    <Mail :size="16" />
                  </div>
                  <span class="text-sm">bassem.saidi03@gmail.com</span>
                </a>
                <div class="flex items-center gap-3 text-slate-300">
                  <div class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <MapPin :size="16" />
                  </div>
                  <span class="text-sm">
                    {{ currentLang === 'en' ? 'Tunisia, North Africa' : 'Tunisie, Afrique du Nord' }}
                  </span>
                </div>
                <div class="flex items-center gap-3 text-slate-300">
                  <div class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <Clock :size="16" />
                  </div>
                  <span class="text-sm">
                    {{ currentLang === 'en' ? '24/7 Support' : 'Support 24/7' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-700">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-slate-400 text-sm">
              &copy; 2026 BridgeTN. {{ currentLang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { 
  Globe, 
  Mail, 
  ChevronRight, 
  Package, 
  Search, 
  Shield, 
  MapPin, 
  Clock 
} from 'lucide-vue-next'

// Props
const props = defineProps({
  currentLang: {
    type: String,
    default: 'en'
  }
})
</script>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

.group:hover .group-hover\:float {
  animation: float 2s ease-in-out infinite;
}

/* Gradient animations */
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
}
</style>