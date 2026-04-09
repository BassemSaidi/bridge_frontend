<template>
  <div class="mt-12 flex items-center gap-4">
    <button 
      v-if="step > 1" 
      @click="$emit('back')" 
      class="flex-1 py-5 rounded-2xl font-black text-slate-400 hover:text-slate-600 transition-colors"
    >
      {{ t('back') }}
    </button>
    <button 
      @click="$emit('next')" 
      :disabled="loading" 
      class="flex-[2] flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      <span v-else>{{ step === 2 ? t('confirmGetPDF') : t('continue') }}</span>
    </button>
  </div>
</template>

<script>
import { Download } from 'lucide-vue-next'

export default {
  name: 'ColisActions',
  components: { Download },
  props: {
    step: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['back', 'next']
}
</script>
