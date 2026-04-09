<template>
  <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/voyages" class="flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl transition-all group">
            <div class="flex items-center gap-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 shadow-xl shadow-slate-200">
                <Package :size="22" class="text-white" />
              </div>
              <span class="text-2xl font-black tracking-tighter text-slate-900">BRIDGE<span class="text-indigo-600">TN</span></span>
            </div>
          </router-link>
        </div>
        
        <div class="text-center">
          <h1 class="text-2xl font-black bg-gradient-to-r to-indigo-600 from-black bg-clip-text text-transparent">{{ t('tripPlanning') }}</h1>
          <p v-if="activeTrip" class="text-sm text-slate-500 mt-1">{{ activeTrip.PaysD }} → {{ activeTrip.PaysF }}</p>
        </div>
        
        <div v-if="activeTrip" class="flex items-center gap-3">
          <div class="px-4 py-2 bg-gradient-to-r to-indigo-500 from-black text-white rounded-xl font-bold text-sm shadow-lg">
            {{ activeTrip.codeT }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Package } from 'lucide-vue-next'

export default {
  name: 'PlanningHeader',
  components: { Package },
  props: {
    activeTrip: {
      type: Object,
      default: null
    },
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
