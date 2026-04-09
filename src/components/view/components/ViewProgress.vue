<template>
  <div class="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200/20">
    <h3 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 text-center">{{ t('completionRate') }}</h3>
    
    <div class="relative flex items-center justify-center mb-8">
      <svg class="w-32 h-32 transform -rotate-90">
        <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-800" />
        <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" 
                class="text-indigo-500 transition-all duration-1000 ease-out"
                :stroke-dasharray="364.4"
                :stroke-dashoffset="364.4 - (364.4 * progressPercentage) / 100" />
      </svg>
      <div class="absolute text-3xl font-black italic">{{ progressPercentage }}%</div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
        <div class="text-2xl font-bold">{{ completedCities }}</div>
        <div class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{{ t('citiesPassed') }}</div>
      </div>
      <div class="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
        <div class="text-2xl font-bold">{{ remainingCities }}</div>
        <div class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{{ t('remaining') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progressPercentage: Number,
    completedCities: Number,
    remainingCities: Number,
    currentLang: String,
    t: Function
  }
}
</script>
