<template>
  <div v-if="profile.paysTrajet && profile.paysTrajet.length > 0" 
       class="bg-gradient-to-br from-slate-50 via-white to-indigo-50 rounded-[3rem] p-6 lg:p-8 border border-slate-100/50 shadow-xl shadow-slate-100/50 relative overflow-hidden w-full">
    
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/3 to-cyan-500/5"></div>
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 25%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 25%); background-size: 60px 60px;"></div>
    </div>

    <!-- Country Content -->
    <div class="relative z-10 flex items-center gap-3 lg:gap-4">
      <!-- Country Icon -->
      <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-md">
        <MapPin :size="16" class="text-indigo-600 lg:text-lg" />
      </div>
      
      <!-- Country Name -->
      <div class="flex-1">
        <span class="text-base lg:text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{{ country }}</span>
      </div>
      
      <!-- Service Badge -->
      <div class="mt-1 inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black">
        <CheckCircle :size="12" />
        <span class="hidden sm:inline">{{ t('served') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Globe, MapPin, CheckCircle, Star } from 'lucide-vue-next'

export default {
  components: { Globe, MapPin, CheckCircle, Star },
  props: {
    profile: Object,
    activeTrips: Array,
    currentLang: String,
    t: Function
  }
}
</script>
