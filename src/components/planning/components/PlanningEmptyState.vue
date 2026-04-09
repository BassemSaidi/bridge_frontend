<template>
  <div class="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-16 text-center">
    <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <MapPin :size="40" class="text-slate-400" />
    </div>
    <h3 class="text-3xl font-bold text-slate-900 mb-4">{{ t('noTripSelected') }}</h3>
    <p class="text-lg text-slate-500 mb-8">{{ t('selectTripToStart') }}</p>
    <router-link to="/voyages" 
              class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-8 py-4 font-bold transition-all hover:shadow-lg">
      <ArrowLeft :size="20" />
      {{ t('viewVoyages') }}
    </router-link>
  </div>
</template>

<script>
import { MapPin, ArrowLeft } from 'lucide-vue-next'

export default {
  name: 'PlanningEmptyState',
  components: { MapPin, ArrowLeft },
  props: {
    currentLang: {
      type: String,
      default: 'en'
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
