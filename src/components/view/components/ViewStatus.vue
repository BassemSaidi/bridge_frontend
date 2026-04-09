<template>
  <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8">
      <div :class="getStatusTheme(tripData.current_status?.status || tripData.status)" 
           class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter">
        {{ formatStatus(tripData.current_status?.status || tripData.status) }}
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div class="space-y-1">
        <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{{ t('currentLocation') }}</p>
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">
          {{ tripData.current_status?.current_city || t('arrivalZone') }}
        </h2>
        <p class="text-slate-500 flex items-center gap-1">
          <MapPin :size="16" /> {{ tripData.current_status?.current_country || tripData.PaysF }}
        </p>
      </div>

      <!-- Important Message Section - Enhanced Design -->
      <div v-if="tripData.current_status?.message" 
           class="relative bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-6 border border-indigo-100/50 shadow-lg shadow-indigo-100/30">
        <div class="absolute -top-2 -left-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
          <Info :size="16" class="text-white" />
        </div>
        <div class="flex gap-4">
          <div class="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle :size="20" class="text-indigo-600" />
          </div>
          <div class="flex-1">
            <p class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{{ t('importantMessage') }}</p>
            <p class="text-indigo-900 text-base leading-relaxed font-medium">
              "{{ tripData.current_status.message }}"
            </p>
            <div class="mt-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span class="text-xs text-indigo-600 font-medium">{{ t('liveUpdate') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Info, MessageCircle } from 'lucide-vue-next'

export default {
  components: { MapPin, Info, MessageCircle },
  props: {
    tripData: Object,
    currentLang: String,
    t: Function
  },
  methods: {
    getStatusTheme(status) {
      const themes = {
        'in_transit': 'bg-blue-100 text-blue-700',
        'en_route': 'bg-indigo-100 text-indigo-700',
        'arrived': 'bg-emerald-100 text-emerald-700',
        'panne': 'bg-red-100 text-red-700',
        'delayed': 'bg-amber-100 text-amber-700'
      }
      return themes[status] || 'bg-slate-100 text-slate-700'
    },
    formatStatus(status) {
      const map = { 
        'in_transit': this.t('inTransit'), 
        'en_route': this.t('onTheWay'), 
        'arrived': this.t('finalized'), 
        'panne': this.t('underRepair'),
        'delayed': this.t('delayed')
      }
      return map[status] || status
    }
  }
}
</script>
