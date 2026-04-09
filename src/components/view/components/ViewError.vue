<template>
  <div class="bg-white rounded-3xl p-12 shadow-xl shadow-slate-200/50 text-center border border-slate-100">
    <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
      <AlertCircle :size="40" />
    </div>
    <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ t('tripNotFound') }}</h2>
    <p class="text-slate-500 mb-8 max-w-xs mx-auto">{{ error }}</p>
    <router-link to="/" 
                 class="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:scale-105 transform">
      {{ t('returnHome') }}
    </router-link>
  </div>
</template>

<script>
import { AlertCircle } from 'lucide-vue-next'

export default {
  components: { AlertCircle },
  props: {
    error: String,
    currentLang: String,
    t: Function
  }
}
</script>
