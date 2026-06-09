<template>
  <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
    <h3 class="text-xl font-bold text-slate-900 mb-8">{{ t('journeyTimeline') }}</h3>
    
    <div class="relative">
      <div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

      <div class="space-y-10 relative">
        <div v-for="(step, idx) in allCities" :key="idx" class="flex gap-6 group">
          <div class="relative z-10">
            <div :class="getStepCircleClass(step, idx)" 
                 class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shadow-sm border-4 border-white">
              <Check v-if="isStepCompleted(idx)" :size="14" />
              <span v-else>{{ idx + 1 }}</span>
            </div>
          </div>
          
          <div class="flex-1 pb-2 border-b border-slate-50 group-last:border-0">
            <div class="flex justify-between items-start">
              <div>
                <h4 :class="isStepCurrent(idx) ? 'text-indigo-600' : 'text-slate-900'" 
                    class="font-bold text-lg capitalize transition-colors">
                  {{ step.name }}
                </h4>
                <p class="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  {{ getStepZone(step) }}
                </p>
              </div>
              <span :class="getStepBadgeClass(step, idx)" class="text-[10px] font-black uppercase px-2 py-0.5 rounded">
                {{ getStepStatusText(step, idx) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Check } from 'lucide-vue-next'

export default {
  components: { Check },
  props: {
    tripData: Object,
    allCities: Array,
    currentLang: String,
    t: Function
  },
  methods: {
    isStepCompleted(idx) {
      const currentIndex = this.tripData?.current_city_index || 0
      const currentStatus = this.tripData?.status
      
      if (currentStatus === 'arrived') return true
      return idx < currentIndex
    },
    isStepCurrent(idx) {
      const currentIndex = this.tripData?.current_city_index || 0
      return idx === currentIndex
    },
    getStepZone(step) {
      if (step.type === 'boat') return this.t('onBoat')
      if (step.type === 'customs') return this.t('customs')
      return step.country
    },
    getStepCircleClass(step, idx) {
      if (this.isStepCurrent(idx)) return 'bg-indigo-600 text-white scale-110'
      if (this.isStepCompleted(idx)) return 'bg-emerald-500 text-white'
      return 'bg-slate-100 text-slate-400'
    },
    getStepBadgeClass(step, idx) {
      if (this.isStepCurrent(idx)) return 'bg-indigo-100 text-indigo-700'
      if (this.isStepCompleted(idx)) return 'bg-emerald-100 text-emerald-700'
      return 'bg-slate-50 text-slate-400'
    },
    getStepStatusText(step, idx) {
      if (this.isStepCurrent(idx)) return this.t('current')
      if (this.isStepCompleted(idx)) return this.t('passed')
      return this.t('upcoming')
    }
  }
}
</script>
