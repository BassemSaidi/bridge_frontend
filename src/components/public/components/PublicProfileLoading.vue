<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center">
    <!-- Loading Animation Container -->
    <div class="relative">
      <!-- Outer Ring -->
      <div class="w-16 h-16 lg:w-20 lg:h-20 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
      
      <!-- Middle Ring -->
      <div class="absolute inset-2 w-12 h-12 lg:w-16 lg:h-16 border-3 border-indigo-50 border-t-indigo-400 rounded-full animate-spin" style="animation-delay: 0.15s;"></div>
      
      <!-- Inner Core -->
      <div class="absolute inset-4 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <Package :size="20" class="text-white lg:text-2xl" />
      </div>
      
      <!-- Pulse Effect -->
      <div class="absolute inset-0 rounded-full bg-indigo-500 opacity-20 animate-ping"></div>
    </div>
    
    <!-- Loading Text -->
    <div class="mt-8 text-center space-y-2">
      <p class="text-xl lg:text-2xl font-bold text-slate-700 animate-pulse">{{ t('authenticatingProfile') }}</p>
      <p class="text-sm lg:text-base text-slate-500">{{ t('pleaseWaitMoment') }}</p>
      
      <!-- Progress Dots -->
      <div class="flex justify-center gap-2 mt-4">
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Package } from 'lucide-vue-next'

export default {
  components: { Package },
  props: {
    currentLang: String,
    t: Function
  }
}
</script>

<style scoped>
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}
</style>
