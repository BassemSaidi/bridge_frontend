<template>
  <div class="flex gap-3 mb-12">
    <div 
      v-for="(stepItem, index) in totalSteps" 
      :key="index"
      :class="[
        currentStep >= index + 1 ? 'bg-gradient-to-r from-indigo-600 to-indigo-500' : 'bg-slate-100', 
        'h-1.5 flex-1 rounded-full transition-all duration-700 shadow-sm'
      ]"
    >
      <div 
        v-if="currentStep >= index + 1" 
        class="h-full bg-white/20 rounded-full animate-pulse"
      ></div>
    </div>
  </div>
  
  <!-- Step labels -->
  <div class="flex justify-between mb-8">
    <div 
      v-for="(stepItem, index) in totalSteps" 
      :key="`label-${index}`"
      :class="[
        'text-xs font-bold uppercase tracking-wider transition-all duration-300',
        currentStep >= index + 1 ? 'text-indigo-600' : 'text-slate-400'
      ]"
    >
      {{ t('step') }} {{ index + 1 }} {{ t('of') }} {{ totalSteps }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTripStepIndicator',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      default: 2
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
