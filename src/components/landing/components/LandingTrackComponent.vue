<template>
  <section id="track" class="relative py-20 lg:py-32 bg-gradient-to-br from-slate-100 via-white to-blue-50/50 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 right-20 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200/15 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100/10 rounded-full blur-2xl"></div>
    </div>

    <div class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          {{ currentLang === 'en' ? 'Package Tracking' : 'Suivi de Colis' }}
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 lg:mb-8">
          <span class="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            {{ currentLang === 'en' ? 'Track Your Package' : 'Suivez Votre Colis' }}
          </span>
        </h2>
        <p class="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
          {{ currentLang === 'en' 
            ? 'Keep your senders updated without sharing GPS location. Give them a unique code and manually update your trip status as you travel.'
            : 'Tenez vos expéditeurs informés sans partager votre localisation GPS. Donnez-leur un code unique et mettez à jour manuellement le statut de votre voyage.' }}
        </p>
      </div>

      <!-- Tracking Form -->
      <div class="max-w-4xl mx-auto mb-16 lg:mb-20">
        <div class="group relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-white/50 hover:shadow-3xl hover:shadow-blue-200/60 transition-all duration-500">
            <div class="flex flex-col lg:flex-row gap-4 mb-8">
              <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search :size="20" class="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  :placeholder="currentLang === 'en' ? 'Enter Tracking Code (e.g. TN-78921)' : 'Entrez le Code de Suivi (ex: TN-78921)'"
                  class="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 hover:border-slate-300"
                  v-model="trackCode"
                  @keyup.enter="trackTrip"
                />
              </div>
              <button 
                @click="trackTrip" 
                class="group/btn px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 flex items-center justify-center gap-3 min-w-[160px]"
              >
                <Search :size="20" class="group-hover/btn:scale-110 transition-transform" />
                {{ currentLang === 'en' ? 'Track Now' : 'Suivre Maintenant' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tracking Timeline -->
      <div class="max-w-5xl mx-auto">
        <div class="group relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div class="relative bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-white/50">
            <div class="text-center mb-12">
              <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                {{ currentLang === 'en' ? 'Tracking Journey' : 'Parcours de Suivi' }}
              </h3>
              <p class="text-slate-600 text-lg">
                {{ currentLang === 'en' 
                  ? 'Follow your package through every step of its journey'
                  : 'Suivez votre colis à chaque étape de son voyage' }}
              </p>
            </div>

            <!-- Timeline -->
            <div class="relative">
              <!-- Progress Line -->
              <div class="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 hidden lg:block"></div>
              <div class="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 -translate-y-1/2 hidden lg:block transition-all duration-1000" :style="{ width: progressWidth + '%' }"></div>
              
              <!-- Steps -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                <div v-for="(step, index) in trackingSteps" :key="index" class="relative flex flex-col items-center text-center group/step">
                  <!-- Step Circle -->
                  <div class="relative mb-6">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-slate-200/50 border-4 border-slate-100 transition-all duration-300 group-hover/step:scale-110 group-hover/step:shadow-xl">
                      <component 
                        :is="step.icon" 
                        :size="24" 
                        :class="step.done ? 'text-green-500' : 'text-slate-400'"
                      />
                    </div>
                    <!-- Pulse Animation for Active Step -->
                    <div v-if="step.done && !step.completed" class="absolute inset-0 w-16 h-16 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  
                  <!-- Step Content -->
                  <div class="space-y-2">
                    <h4 class="font-bold text-lg" :class="step.done ? 'text-slate-900' : 'text-slate-400'">
                      {{ currentLang === 'en' ? step.titleEn : step.titleFr }}
                    </h4>
                    <p class="text-sm text-slate-600 max-w-[150px]">
                      {{ currentLang === 'en' ? step.descEn : step.descFr }}
                    </p>
                    <div v-if="step.done" class="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle :size="16" />
                      {{ currentLang === 'en' ? 'Completed' : 'Terminé' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Info :size="20" class="text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">{{ currentLang === 'en' ? 'Real-time Updates' : 'Mises à jour en Temps Réel' }}</h4>
                    <p class="text-sm text-slate-600">{{ currentLang === 'en' ? 'Status updated by transporter' : 'Statut mis à jour par le transporteur' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Info,
  MapPin,
  Home
} from 'lucide-vue-next'

// Props
const props = defineProps({
  currentLang: {
    type: String,
    default: 'fr'
  }
})

// Reactive data
const trackCode = ref('')

// Example tracking codes
const exampleCodes = ['TN-78921', 'FR-45678', 'DE-12345', 'IT-98765']

// Tracking steps with bilingual content
const trackingSteps = ref([
  {
    icon: Package,
    titleEn: 'Received',
    titleFr: 'Reçu',
    descEn: 'Package received at warehouse',
    descFr: 'Colis reçu à l\'entrepôt',
    done: true,
    completed: true
  },
  {
    icon: Truck,
    titleEn: 'In Transit',
    titleFr: 'En Transit',
    descEn: 'Package is on the way',
    descFr: 'Le colis est en route',
    done: true,
    completed: false
  },
  {
    icon: MapPin,
    titleEn: 'Customs',
    titleFr: 'Douane',
    descEn: 'Processing at customs',
    descFr: 'Traitement à la douane',
    done: false,
    completed: false
  },
  {
    icon: Home,
    titleEn: 'Delivered',
    titleFr: 'Livré',
    descEn: 'Package delivered successfully',
    descFr: 'Colis livré avec succès',
    done: false,
    completed: false
  }
])

// Calculate progress width based on completed steps
const progressWidth = computed(() => {
  const completedSteps = trackingSteps.value.filter(step => step.done).length
  return (completedSteps / trackingSteps.value.length) * 100
})

// Track trip function
const trackTrip = () => {
  if (trackCode.value.trim()) {
    // Navigate to tracking page with the code
    window.location.href = `/view?code=${trackCode.value.trim()}`
  }
}
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.group:hover .group-hover\:float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>