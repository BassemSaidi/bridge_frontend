<template>
  <div class="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 mb-8">
    <h3 class="text-2xl font-bold text-slate-900 mb-6">{{ t('routeProgress') }}</h3>
    
    <div class="space-y-6">
      <!-- On Boat Status -->
      <div v-if="activeTrip.current_status?.current_city === 'On Boat'" 
           class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Navigation :size="24" class="text-white" />
          </div>
          <div class="flex-1">
            <h4 class="text-lg font-bold text-blue-900 mb-1">{{ t('onBoat') }}</h4>
            <p class="text-blue-700">{{ activeTrip.current_status.message }}</p>
          </div>
        </div>
      </div>

      <!-- Manual Status Message -->
      <div v-if="activeTrip.current_status?.message && activeTrip.current_status.current_city !== 'On Boat'" 
           class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Settings2 :size="24" class="text-white" />
          </div>
          <div class="flex-1">
            <h4 class="text-lg font-bold text-amber-900 mb-1">{{ t('statusUpdate') }}</h4>
            <p class="text-amber-700">{{ activeTrip.current_status.message }}</p>
          </div>
        </div>
      </div>

      <!-- Departure Cities -->
      <div>
        <h4 class="text-lg font-bold text-indigo-600 mb-4">{{ activeTrip.PaysD }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(city, idx) in activeTrip.villePD" 
               :key="`dep-${idx}`" 
               :class="getCityCardClass(city, 'departure', idx)"
               class="relative rounded-2xl p-4 border-2 transition-all">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                   :class="getCityIconClass(city, 'departure', idx)">
                {{ idx + 1 }}
              </div>
              <div>
                <p class="font-bold text-slate-900 capitalize">{{ city }}</p>
                <p class="text-xs text-slate-500">{{ activeTrip.PaysD }}</p>
              </div>
            </div>
            <div v-if="isCurrentCity(city)" class="absolute -top-2 -right-2">
              <div class="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrival Cities -->
      <div>
        <h4 class="text-lg font-bold text-purple-600 mb-4">{{ activeTrip.PaysF }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(city, idx) in activeTrip.villePF" 
               :key="`arr-${idx}`" 
               :class="getCityCardClass(city, 'arrival', idx)"
               class="relative rounded-2xl p-4 border-2 transition-all">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                   :class="getCityIconClass(city, 'arrival', idx)">
                {{ activeTrip.villePD.length + idx + 1 }}
              </div>
              <div>
                <p class="font-bold text-slate-900 capitalize">{{ city }}</p>
                <p class="text-xs text-slate-500">{{ activeTrip.PaysF }}</p>
              </div>
            </div>
            <div v-if="isCurrentCity(city)" class="absolute -top-2 -right-2">
              <div class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Settings2 } from 'lucide-vue-next'

export default {
  name: 'PlanningRouteProgress',
  components: { Navigation, Settings2 },
  props: {
    activeTrip: {
      type: Object,
      required: true
    },
    currentLang: {
      type: String,
      default: 'en'
    },
    t: {
      type: Function,
      required: true
    }
  },
  methods: {
    isCurrentCity(city) {
      return this.activeTrip?.current_status?.current_city === city
    },
    getCityCardClass(city, type, index) {
      const isCurrent = this.isCurrentCity(city)
      const allCities = [...(this.activeTrip?.villePD || []), ...(this.activeTrip?.villePF || [])]
      const currentStatus = this.activeTrip?.current_status?.status || this.activeTrip?.status
      const currentIndex = allCities.indexOf(this.activeTrip?.current_status?.current_city)
      const cityIndex = allCities.indexOf(city)
      
      if (currentStatus === 'arrived') {
        return 'bg-emerald-50 border-emerald-300'
      }
      
      if (isCurrent) {
        return 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400 shadow-lg scale-105'
      } else if (cityIndex < currentIndex) {
        return 'bg-emerald-50 border-emerald-300'
      } else {
        return 'bg-slate-50 border-slate-200'
      }
    },
    getCityIconClass(city, type, index) {
      const isCurrent = this.isCurrentCity(city)
      const allCities = [...(this.activeTrip?.villePD || []), ...(this.activeTrip?.villePF || [])]
      const currentStatus = this.activeTrip?.current_status?.status || this.activeTrip?.status
      const currentIndex = allCities.indexOf(this.activeTrip?.current_status?.current_city)
      const cityIndex = allCities.indexOf(city)
      
      if (currentStatus === 'arrived') {
        return 'bg-emerald-600 text-white'
      }
      
      if (isCurrent) {
        return 'bg-indigo-600 text-white'
      } else if (cityIndex < currentIndex) {
        return 'bg-emerald-600 text-white'
      } else {
        return 'bg-slate-300 text-slate-600'
      }
    }
  }
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
