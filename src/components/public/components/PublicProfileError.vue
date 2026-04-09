<template>
  <div class="mx-auto mt-16 lg:mt-20 max-w-2xl px-6 lg:px-8 text-center">
    <div class="bg-white rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-slate-100/50 border border-slate-100/50 relative overflow-hidden">
      
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-slate-50 opacity-50"></div>
      
      <!-- Error Icon -->
      <div class="relative z-10 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-rose-100 to-red-100 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 lg:mb-12 shadow-xl shadow-rose-200/50 rotate-3 hover:rotate-6 transition-transform duration-300">
        <XCircle :size="48" class="lg:text-6xl" />
      </div>
      
      <!-- Error Content -->
      <div class="relative z-10 space-y-6">
        <h2 class="text-3xl lg:text-4xl font-black text-slate-900 mb-4 italic">{{ t('unreachable') }}</h2>
        <p class="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">{{ error }}</p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/" 
                       class="group inline-flex items-center justify-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            <Home :size="20" class="text-white" />
            <span class="text-sm lg:text-base">{{ t('returnToSafety') }}</span>
          </router-link>
          
          <button @click="$emit('retry-load')" 
                  class="group inline-flex items-center justify-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            <RefreshCw :size="20" class="text-slate-600 group-hover:text-indigo-600" />
            <span class="text-sm lg:text-base">{{ t('tryAgain') }}</span>
          </button>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-rose-200 to-red-200 rounded-full opacity-20 blur-xl"></div>
      <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-200 to-rose-200 rounded-full opacity-10 blur-2xl"></div>
    </div>
  </div>
</template>

<script>
import { XCircle, Home, RefreshCw } from 'lucide-vue-next'

export default {
  components: { XCircle, Home, RefreshCw },
  props: {
    error: String,
    currentLang: String,
    t: Function
  },
  emits: ['retry-load']
}
</script>
