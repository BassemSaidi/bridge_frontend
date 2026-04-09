<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
         <router-link to="/" class="flex items-center gap-2 lg:gap-3 group">
            <div class="flex h-8 w-8 lg:h-11 lg:w-11 items-center justify-center rounded-xl lg:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg shadow-slate-200/50 group-hover:shadow-indigo-200/50 transition-all duration-300">
              <Package :size="24" class="text-white lg:text-base" />
            </div>
            <div class="hidden sm:block group h-10 overflow-hidden cursor-pointer bg-white ">
                <div class="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-10">
                    <!-- First state -->
                    <div class="h-10 flex items-center">
                    <span class="text-lg lg:text-2xl font-black tracking-tighter text-slate-900">
                        BRIDGE<span class="text-indigo-600">TN</span>
                    </span>
                    </div>
                    <!-- Hover state -->
                    <div class="h-10 flex flex-col justify-center leading-none">
                    <span class="text-lg lg:text-2xl font-black tracking-tighter text-indigo-600">
                        BRIDGE<span class="text-slate-900">TN</span>
                    </span>
                    <span class="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400">
                        Your Gate to the World
                    </span>
                    </div>
                </div>
            </div>
            <!-- Mobile-only logo text -->
            <div class="sm:hidden">
              <span class="text-lg font-black tracking-tighter text-slate-900">
                BT
              </span>
            </div>
          </router-link>
      </div>
      
      <div class="flex flex-col items-center">
        <h1 class="text-sm font-bold uppercase tracking-widest text-slate-400">{{ t('liveTracking') }}</h1>
        <div v-if="tripData" class="text-lg font-extrabold text-slate-900">{{ tripData.codeT }}</div>
      </div>

      <button @click="$emit('refresh-trip')" class="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
        <RefreshCw :size="20" :class="{ 'animate-spin': loading }" />
      </button>
    </div>
  </header>
</template>

<script>
import { RefreshCw, Package } from 'lucide-vue-next'

export default {
  components: { RefreshCw, Package },
  props: {
    tripData: Object,
    loading: Boolean,
    currentLang: String,
    t: Function
  },
  emits: ['refresh-trip']
}
</script>
