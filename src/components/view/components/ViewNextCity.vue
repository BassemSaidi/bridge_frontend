<template>
  <!-- Next City Display -->
  <div v-if="tripData.current_status?.next_city" 
       class="bg-white border-2 border-dashed border-indigo-200 rounded-[2rem] p-6 hover:border-indigo-400 transition-colors">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-pulse">
        <Navigation :size="24" />
      </div>
      <div>
        <p class="text-xs font-bold text-slate-400 uppercase">{{ t('upNext') }}</p>
        <h4 class="text-xl font-black text-slate-900 capitalize">{{ tripData.current_status.next_city }}</h4>
      </div>
    </div>
  </div>

  <!-- Destination Reached -->
  <div v-else-if="tripData.status === 'arrived'" 
       class="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 text-center hover:bg-emerald-100 transition-colors">
    <div class="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
      <Award :size="32" />
    </div>
    <h3 class="text-xl font-bold text-emerald-900 mb-1">{{ t('destinationReached') }}</h3>
    <p class="text-emerald-700 text-sm">{{ t('journeyCompleted') }}</p>
  </div>
</template>

<script>
import { Navigation, Award } from 'lucide-vue-next'

export default {
  components: { Navigation, Award },
  props: {
    tripData: Object,
    currentLang: String,
    t: Function
  }
}
</script>
