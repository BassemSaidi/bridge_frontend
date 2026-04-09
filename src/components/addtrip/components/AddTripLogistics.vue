<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-3 rounded-full border border-slate-200">
        <Calendar :size="20" class="text-indigo-600" />
        <span class="text-sm font-bold text-slate-700">{{ t('step2Title') }}</span>
      </div>
      <h1 class="text-4xl font-black tracking-tighter text-slate-900">{{ t('step2Subtitle') }}</h1>
      <p class="text-slate-500 font-medium max-w-md mx-auto">
        {{ t('step2Subtitle') }}
      </p>
    </div>

    <!-- Date Selection Cards -->
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Departure Date -->
      <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-3xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar :size="24" class="text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900">{{ t('departure') }}</h3>
              <p class="text-sm text-slate-500">{{ t('departureLabel') }}</p>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
              <Calendar :size="20" />
            </div>
            <input 
              v-model="tripData.DateD" 
              type="date" 
              :min="minDate"
              class="w-full bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-transparent focus:border-indigo-500 focus:from-white focus:to-white rounded-2xl pl-14 pr-6 py-4 font-bold outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <!-- Arrival Date -->
      <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-3xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar :size="24" class="text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900">{{ t('destination') }}</h3>
              <p class="text-sm text-slate-500">{{ t('arrivalLabel') }}</p>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
              <Calendar :size="20" />
            </div>
            <input 
              v-model="tripData.DateF" 
              type="date" 
              :min="tripData.DateD || minDate"
              class="w-full bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-transparent focus:border-emerald-500 focus:from-white focus:to-white rounded-2xl pl-14 pr-6 py-4 font-bold outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Trip Summary -->
    <div v-if="tripData.DateD && tripData.DateF" class="bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100 rounded-2xl p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Calendar :size="20" class="text-indigo-600" />
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900">{{ t('tripDuration') }}</p>
            <p class="text-xs text-slate-600">{{ tripDuration }} {{ t('days') }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-xs font-bold text-slate-500">{{ t('period') }}</p>
          <p class="text-sm font-bold text-slate-700">{{ formattedDateRange }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'lucide-vue-next'

export default {
  name: 'AddTripLogistics',
  components: { Calendar },
  props: {
    tripData: {
      type: Object,
      required: true
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  },
  computed: {
    minDate() {
      return new Date().toISOString().split('T')[0]
    },
    tripDuration() {
      if (!this.tripData.DateD || !this.tripData.DateF) return 0
      const start = new Date(this.tripData.DateD)
      const end = new Date(this.tripData.DateF)
      const diffTime = Math.abs(end - start)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
    formattedDateRange() {
      if (!this.tripData.DateD || !this.tripData.DateF) return ''
      const options = { day: 'numeric', month: 'short' }
      const locale = this.currentLang === 'fr' ? 'fr-FR' : 'en-US'
      const start = new Date(this.tripData.DateD).toLocaleDateString(locale, options)
      const end = new Date(this.tripData.DateF).toLocaleDateString(locale, options)
      return `${start} - ${end}`
    }
  }
}
</script>
