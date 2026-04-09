<template>
  <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
    <h3 class="text-xl font-bold text-slate-900 mb-8">{{ t('journeyTimeline') }}</h3>
    
    <div class="relative">
      <div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

      <div class="space-y-10 relative">
        <div v-for="(city, idx) in allCities" :key="idx" class="flex gap-6 group">
          <div class="relative z-10">
            <div :class="getStepCircleClass(city)" 
                 class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shadow-sm border-4 border-white">
              <Check v-if="isCityCompleted(city)" :size="14" />
              <span v-else>{{ idx + 1 }}</span>
            </div>
          </div>
          
          <div class="flex-1 pb-2 border-b border-slate-50 group-last:border-0">
            <div class="flex justify-between items-start">
              <div>
                <h4 :class="isCityCurrent(city) ? 'text-indigo-600' : 'text-slate-900'" 
                    class="font-bold text-lg capitalize transition-colors">
                  {{ city }}
                </h4>
                <p class="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  {{ getCityZone(city) }}
                </p>
              </div>
              <span :class="getStepBadgeClass(city)" class="text-[10px] font-black uppercase px-2 py-0.5 rounded">
                {{ getCityStatusText(city) }}
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
    isCityCompleted(city) {
      const currentCity = this.tripData?.current_status?.current_city
      const currentStatus = this.tripData?.current_status?.status || this.tripData?.status
      
      if (currentStatus === 'arrived') return true
      if (currentCity === 'On Boat') return this.tripData.villePD.includes(city)
      
      const cityIdx = this.allCities.indexOf(city)
      const currentIdx = this.allCities.indexOf(currentCity)
      return cityIdx < currentIdx
    },
    isCityCurrent(city) {
      return this.tripData?.current_status?.current_city === city
    },
    getCityZone(city) {
      return this.tripData?.villePD.includes(city) ? this.t('departureZone') : this.t('arrivalZone')
    },
    getStepCircleClass(city) {
      if (this.isCityCurrent(city)) return 'bg-indigo-600 text-white scale-110'
      if (this.isCityCompleted(city)) return 'bg-emerald-500 text-white'
      return 'bg-slate-100 text-slate-400'
    },
    getStepBadgeClass(city) {
      if (this.isCityCurrent(city)) return 'bg-indigo-100 text-indigo-700'
      if (this.isCityCompleted(city)) return 'bg-emerald-100 text-emerald-700'
      return 'bg-slate-50 text-slate-400'
    },
    getCityStatusText(city) {
      if (this.isCityCurrent(city)) return this.t('current')
      if (this.isCityCompleted(city)) return this.t('passed')
      return this.t('upcoming')
    }
  }
}
</script>
