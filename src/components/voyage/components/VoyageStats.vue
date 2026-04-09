<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <!-- Completed Trips Card -->
    <div class="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-slate-600 text-sm font-semibold uppercase tracking-wider">{{ t('completed') }}</p>
          <p class="text-3xl font-black text-slate-900 mt-1">{{ completedCount }}</p>
        </div>
        <div class="h-12 w-12 bg-slate-600 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
          <CheckCircle :size="24" class="text-white" />
        </div>
      </div>
    </div>
    
    <!-- Active Trips Card -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-600 text-sm font-semibold uppercase tracking-wider">{{ t('inProgress') }}</p>
          <p class="text-3xl font-black text-blue-900 mt-1">{{ activeCount }}</p>
        </div>
        <div class="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Clock :size="24" class="text-white" />
        </div>
      </div>
    </div>
    
    <!-- Total Trips Card -->
    <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl p-6 shadow-lg shadow-indigo-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-indigo-600 text-sm font-semibold uppercase tracking-wider">{{ t('total') }}</p>
          <p class="text-3xl font-black text-indigo-900 mt-1">{{ totalCount }}</p>
        </div>
        <div class="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Truck :size="24" class="text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircle, Clock, Truck } from 'lucide-vue-next'

export default {
  name: 'VoyageStats',
  components: { CheckCircle, Clock, Truck },
  props: {
    completedCount: {
      type: Number,
      default: 0
    },
    activeCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
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
