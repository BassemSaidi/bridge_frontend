<template>
  <div class="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden mb-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold mb-2">{{ t('tripStatus') }}</h2>
          <div class="flex items-center gap-4">
            <span :class="getStatusBadgeClass(activeTrip.current_status?.status || activeTrip.status)">
              {{ formatStatus(activeTrip.current_status?.status || activeTrip.status) }}
            </span>
            <span class="text-sm opacity-80">{{ formatDate(activeTrip.DateD) }} - {{ formatDate(activeTrip.DateF) }}</span>
          </div>
        </div>  
        <div class="text-right">
          <div class="text-6xl font-black opacity-20">{{ activeTrip.idV }}</div>
        </div>
      </div>
    </div>

    <!-- Current Location -->
    <div class="p-8">
      <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-100">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <MapPin :size="28" class="text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-900 mb-1">{{ t('currentLocation') }}</h3>
            <p class="text-2xl font-black text-indigo-600">{{ activeTrip.current_status?.current_city || 'Unknown' }}, {{ activeTrip.current_status?.current_country || 'Unknown' }}</p>
            <p v-if="activeTrip.current_status?.message" class="text-sm text-slate-600 mt-2">{{ activeTrip.current_status.message }}</p>
          </div>
          <div v-if="activeTrip.current_status?.next_city" class="text-right">
            <p class="text-sm font-medium text-slate-500">{{ t('nextStop') }}</p>
            <p class="text-lg font-bold text-purple-600">{{ activeTrip.current_status.next_city }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin } from 'lucide-vue-next'

export default {
  name: 'PlanningTripStatus',
  components: { MapPin },
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
    formatStatus(status) {
      const statusMap = {
        'a arriver': this.currentLang === 'fr' ? 'À Arriver' : 'To Arrive',
        'in_transit': this.currentLang === 'fr' ? 'En Transit' : 'In Transit',
        'arrived': this.currentLang === 'fr' ? 'Arrivé' : 'Arrived',
        'en_route': this.currentLang === 'fr' ? 'En Route' : 'En Route',
        'pause': this.currentLang === 'fr' ? 'Pause' : 'Pause',
        'panne': this.currentLang === 'fr' ? 'Panne' : 'Breakdown',
        'delayed': this.currentLang === 'fr' ? 'Retardé' : 'Delayed'
      }
      return statusMap[status] || status
    },
    getStatusBadgeClass(status) {
      const classMap = {
        'a arriver': 'px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-700',
        'in_transit': 'px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700',
        'arrived': 'px-4 py-2 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700',
        'en_route': 'px-4 py-2 rounded-full text-sm font-bold bg-amber-100 text-amber-700',
        'pause': 'px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-700',
        'panne': 'px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-700',
        'delayed': 'px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-700'
      }
      return classMap[status] || 'px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-700'
    },
    formatDate(dateString) {
      if (!dateString) return this.currentLang === 'fr' ? 'Non défini' : 'Not set'
      return new Date(dateString).toLocaleDateString(this.currentLang === 'fr' ? 'fr-FR' : 'en-US', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  }
}
</script>
