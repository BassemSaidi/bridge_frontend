<template>
  <!-- No voyages state -->
  <div v-if="trips.length === 0 && !isLoading" class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-lg">
    <div class="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Truck :size="40" class="text-slate-400" />
    </div>
    <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ t('noTripsFound') }}</h3>
    <p class="text-slate-500 mb-6 font-medium">{{ t('startByCreating') }}</p>
    <router-link to="/addtrip" class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200">
      <Plus :size="20" /> {{ t('createFirstTrip') }}
    </router-link>
  </div>
  
  <!-- Loading state -->
  <div v-else-if="isLoading" class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-lg">
    <div class="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
      <Truck :size="40" class="text-slate-400" />
    </div>
    <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ t('loadingTrips') }}</h3>
    <p class="text-slate-500 font-medium">{{ t('pleaseWait') }}</p>
  </div>
</template>

<script>
import { Truck, Plus } from 'lucide-vue-next'

export default {
  name: 'VoyageEmptyState',
  components: { Truck, Plus },
  props: {
    trips: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
