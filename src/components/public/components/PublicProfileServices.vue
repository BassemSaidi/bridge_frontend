<template>
<div class="space-y-10">

<div class="text-center mb-10 pb-4 border-b border-gray-100">
  <h2 class="text-4xl font-extrabold text-gray-950 tracking-tighter mb-4">
    {{ t('professionalServices') }}
  </h2>
  <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{{ t('serviceDescription') }}</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  
  <section v-if="profile.guide && profile.guide.length > 0" 
           class="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-black hover:border-blue-400 hover:shadow-sky-50 transition-all duration-300">
    
    <div class="flex items-start justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
      <div class="flex items-center gap-5">
        <div class="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-100">
          <Map :size="30" class="text-sky-600" />
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-950 tracking-tight">{{ t('transportGuidelines') }}</h3>
          <div class="px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">
            {{ profile.guide.length }} {{ t('steps') }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-sky-100 before:-z-10">
      <div v-for="(step, index) in profile.guide" :key="index" 
           class="flex items-start gap-6 relative">
        
        <div class="flex-shrink-0 w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-4 border-white">
          {{ index + 1 }}
        </div>
        
        <div class="flex-1 pt-1.5">
          <p class="text-gray-800 font-medium leading-relaxed">
            {{ step }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-center">
      <div class="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Star :size="20" class="text-sky-600" />
      </div>
      <p class="text-base font-semibold text-sky-800">{{ t('qualityCommitment') }}</p>
    </div>
  </section>

  <section v-if="profile.interdits && profile.interdits.length > 0" 
           class="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-black hover:border-red-500 hover:shadow-amber-50 transition-all duration-300">
    
    <div class="flex items-start justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
      <div class="flex items-center gap-5">
        <div class="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center border border-amber-100">
          <AlertOctagon :size="30" class="text-red-100" />
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-950 tracking-tight">{{ t('transportRestrictions') }}</h3>
          <div class="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">
            {{ profile.interdits.length }} {{ t('items') }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="item in profile.interdits" :key="item" 
           class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200">
        
        <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <X :size="18" class="text-red-100" />
        </div>
        <span class="text-gray-800 font-semibold text-base">{{ item }}</span>
      </div>
    </div>
    
    <div class="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-center">
      <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <Info :size="20" class="text-red-100" />
      </div>
      <p class="text-base font-semibold text-red-800">{{ t('complianceNotice') }}</p>
    </div>
  </section>
</div>

<div class="bg-gray-950 rounded-3xl p-10 md:p-12 text-white shadow-lg mt-12">
  <div class="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
    <div class="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-700">
      <ShieldCheck :size="40" class="text-sky-400" />
    </div>
    <div>
      <h3 class="text-3xl font-extrabold tracking-tight mb-3 text-white">{{ t('professionalCommitment') }}</h3>
      <p class="text-gray-300 text-lg font-medium leading-relaxed max-w-4xl">
        {{ t('serviceQualityPromise') }}
      </p>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { AlertOctagon, Info, Map, Star, X, ShieldCheck } from 'lucide-vue-next'

export default {
components: { AlertOctagon, Info, Map, Star, X, ShieldCheck },
props: {
profile: {
type: Object,
default: () => ({ guide: [], interdits: [] })
},
currentLang: String,
t: {
type: Function,
default: (key) => key // Fallback function for development
}
}
}
</script>