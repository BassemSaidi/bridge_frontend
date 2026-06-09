<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    
    <!-- Start Trip -->
    <div v-if="activeTrip.status === 'a arriver'" 
         class="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group" 
         @click="$emit('start-trip')">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Play :size="32" class="text-white" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ t('startJourney') }}</h3>
        <p class="text-sm opacity-90">{{ t('beginTripFrom', { country: activeTrip.PaysD }) }}</p>
      </div>
    </div>

    <!-- Auto Advance / Next Step -->
    <div v-if="activeTrip.status !== 'a arriver' && activeTrip.status !== 'arrived' && !isAtLastCity()" 
         class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group" 
         @click="$emit('auto-advance')">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <ArrowRight :size="32" class="text-white" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ t('nextCity') }}</h3>
        <p class="text-sm opacity-90">{{ t('advanceTo', { city: getNextCityName() }) }}</p>
      </div>
    </div>

    <!-- On Boat Status -->
    <div v-if="showOnBoatOption()" 
         class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group" 
         @click="$emit('set-on-boat')">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Navigation :size="32" class="text-white" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ t('onBoat') }}</h3>
        <p class="text-sm opacity-90">{{ t('travelingFromTo', { from: activeTrip.PaysD, to: activeTrip.PaysF }) }}</p>
      </div>
    </div>

    <!-- Manual Update -->
    <div class="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group" 
         @click="$emit('show-manual-modal')">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Settings2 :size="32" class="text-white" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ t('manualUpdate') }}</h3>
        <p class="text-sm opacity-90">{{ t('setCustomStatus') }}</p>
      </div>
    </div>

    <!-- Finish Trip -->
    <div v-if="showFinishTripOption()" 
         class="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group" 
         @click="$emit('finish-trip')">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <CheckCircle :size="32" class="text-white" />
        </div>
        <h3 class="text-xl font-bold mb-2">{{ t('finishTrip') }}</h3>
        <p class="text-sm opacity-90">{{ t('completeJourney') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Play, ArrowRight, Navigation, Settings2, CheckCircle } from 'lucide-vue-next'

export default {
  name: 'PlanningActions',
  components: { Play, ArrowRight, Navigation, Settings2, CheckCircle },
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
  emits: ['start-trip', 'auto-advance', 'set-on-boat', 'show-manual-modal', 'finish-trip'],
  methods: {
    showOnBoatOption() {
      if (!this.activeTrip) return false
      
      const currentStatus = this.activeTrip.current_status?.status || this.activeTrip.status
      const currentCountry = this.activeTrip.current_status?.current_country
      
      return currentStatus === 'in_transit' && 
             this.activeTrip.PaysD !== this.activeTrip.PaysF &&
             currentCountry === this.activeTrip.PaysD
    },
    showFinishTripOption() {
      if (!this.activeTrip) return false
      
      return this.isAtLastCity() && this.activeTrip.status !== 'arrived'
    },
    isAtLastCity() {
      if (!this.activeTrip || !this.activeTrip.current_location) return false
      
      const villePF = this.activeTrip.villePF || []
      if (villePF.length === 0) return false
      
      const currentIndex = this.activeTrip.current_city_index || 0
      const villePD = this.activeTrip.villePD || []
      
      // Calculate the index of the last city in villePF
      const lastCityIndex = villePD.length + 2 + 2 + villePF.length - 1 // +2 for douane + boat + douane
      
      // Show finish button when at the last city OR when the next step would be the last city
      return (currentIndex === lastCityIndex || currentIndex === lastCityIndex - 1) && this.activeTrip.current_location.type === 'city'
    },
    getLastCity() {
      if (!this.activeTrip) return this.currentLang === 'fr' ? 'Inconnu' : 'Unknown'
      const allCities = [...(this.activeTrip.villePD || []), ...(this.activeTrip.villePF || [])]
      return allCities[allCities.length - 1] || (this.currentLang === 'fr' ? 'Inconnu' : 'Unknown')
    },
    getNextCityName() {
      if (!this.activeTrip || !this.activeTrip.current_location) {
        return this.currentLang === 'fr' ? 'Prochain arrêt' : 'Next stop'
      }
      
      const villePD = this.activeTrip.villePD || []
      const villePF = this.activeTrip.villePF || []
      const currentIndex = this.activeTrip.current_city_index || 0
      
      // Build the route
      const route = []
      
      // Add departure cities
      villePD.forEach(city => {
        route.push({ type: 'city', name: city, country: this.activeTrip.PaysD })
      })
      
      // Add customs before boat
      route.push({ type: 'customs', name: 'Douane', country: this.activeTrip.PaysD })
      
      // Add boat
      route.push({ type: 'boat', name: 'En Bateau', country: 'International' })
      
      // Add customs after boat
      route.push({ type: 'customs', name: 'Douane', country: this.activeTrip.PaysF })
      
      // Add arrival cities
      villePF.forEach(city => {
        route.push({ type: 'city', name: city, country: this.activeTrip.PaysF })
      })
      
      // Return next location if exists
      if (currentIndex >= 0 && currentIndex < route.length - 1) {
        return route[currentIndex + 1].name
      }
      return this.currentLang === 'fr' ? 'Destination' : 'Destination'
    }
  }
}
</script>
