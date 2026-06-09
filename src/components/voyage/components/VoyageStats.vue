<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
    <!-- Upcoming Trips Card -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-2xl p-6 shadow-lg shadow-amber-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-amber-600 text-sm font-semibold uppercase tracking-wider">{{ t('upcoming') }}</p>
          <p class="text-3xl font-black text-amber-900 mt-1">{{ upcomingCount }}</p>
        </div>
        <div class="h-12 w-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
          <Clock :size="24" class="text-white" />
        </div>
      </div>
    </div>
    
    <!-- In Progress Trips Card -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-600 text-sm font-semibold uppercase tracking-wider">{{ t('inProgress') }}</p>
          <p class="text-3xl font-black text-blue-900 mt-1">{{ inProgressCount }}</p>
        </div>
        <div class="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Navigation :size="24" class="text-white" />
        </div>
      </div>
    </div>
    
    <!-- Completed Trips Card -->
    <div class="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-2xl p-6 shadow-lg shadow-emerald-100/50 hover:shadow-xl transition-all duration-300">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-emerald-600 text-sm font-semibold uppercase tracking-wider">{{ t('completed') }}</p>
          <p class="text-3xl font-black text-emerald-900 mt-1">{{ completedCount }}</p>
        </div>
        <div class="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <CheckCircle :size="24" class="text-white" />
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
import { CheckCircle, Clock, Truck, Navigation } from 'lucide-vue-next'

export default {
  name: 'VoyageStats',
  components: { CheckCircle, Clock, Truck, Navigation },
  props: {
    completedCount: {
      type: Number,
      default: 0
    },
    inProgressCount: {
      type: Number,
      default: 0
    },
    upcomingCount: {
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
