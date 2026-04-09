<template>
  <section v-if="trips.length > 0" class="mb-12">
    <div class="flex items-center gap-6 mb-8">
      <div :class="[
        'h-16 w-16 rounded-2xl flex items-center justify-center shadow-xl',
        type === 'completed' 
          ? 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-slate-200/60' 
          : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-blue-200/60'
      ]">
        <component :is="type === 'completed' ? CheckCircle : Clock" :size="32" class="text-white" />
      </div>
      <div>
        <h2 class="text-4xl font-black text-slate-900 tracking-tight mb-2">
          {{ type === 'completed' ? t('completedTrips') : t('activeTrips') }}
        </h2>
        <p class="text-slate-600 text-lg font-medium">
          {{ type === 'completed' ? t('successfullyDelivered') : t('currentlyInProgress') }}
        </p>
      </div>
      <div class="ml-auto">
        <span :class="[
          'px-6 py-3 rounded-full text-sm font-bold shadow-lg',
          type === 'completed' 
            ? 'bg-slate-100 text-slate-700' 
            : 'bg-blue-100 text-blue-700'
        ]">
          {{ trips.length }} {{ t('trips') }}
        </span>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <VoyageCard 
        v-for="trip in trips" 
        :key="trip.idV" 
        :voyage="trip"
        :current-lang="currentLang"
        :t="t"
        @delete-voyage="$emit('delete-voyage', $event)"
      />
    </div>
  </section>
</template>

<script>
import { CheckCircle, Clock } from 'lucide-vue-next'
import VoyageCard from './VoyageCard.vue'

export default {
  name: 'VoyageSection',
  components: { CheckCircle, Clock, VoyageCard },
  props: {
    trips: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['completed', 'active'].includes(value)
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
  emits: ['delete-voyage']
}
</script>
