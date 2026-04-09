<template>
  <div class="mt-16 flex items-center gap-4">
    <!-- Back Button -->
    <button 
      v-if="currentStep > 1" 
      @click="$emit('previous-step')" 
      class="flex-1 py-5 font-black text-slate-400 hover:text-slate-600 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-[2.2rem] transition-all duration-300 flex items-center justify-center gap-2"
    >
      <ArrowRight :size="20" class="rotate-180" />
      {{ t('back') }}
    </button>
    
    <!-- Next/Submit Button -->
    <button 
      @click="$emit('submit')" 
      :class="[
        'flex-[2] py-5 rounded-[2.2rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02]',
        currentStep === 1 
          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-indigo-100' 
          : 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white shadow-emerald-100'
      ]"
    >
      <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      <template v-else>
        <span>{{ currentStep === 1 ? t('next') : t('publishTrip') }}</span>
        <ArrowRight v-if="currentStep === 1" :size="20" />
        <Check v-else :size="20" />
      </template>
    </button>
  </div>
</template>

<script>
import { ArrowRight, Check } from 'lucide-vue-next'

export default {
  name: 'AddTripActions',
  components: { ArrowRight, Check },
  props: {
    currentStep: {
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
  emits: ['previous-step', 'submit']
}
</script>
