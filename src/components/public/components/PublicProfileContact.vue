<template>
  <div class="sticky top-32 space-y-6">
    
    <!-- Contact Card -->
    <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl shadow-slate-200/20 border border-slate-700/50">
      
      <!-- Pricing & Stats -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <!-- Price Per KG -->
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <DollarSign :size="20" class="text-indigo-400" />
            </div>
            <p class="text-[10px] font-black uppercase tracking-widest text-indigo-300">{{ t('ratePerKg') }}</p>
          </div>
          <p class="text-3xl lg:text-4xl font-black text-indigo-400">{{ profile.pricePerKg || 0 }}€</p>
          <p class="text-sm text-indigo-300 font-medium">per kilogram</p>
        </div>
        
        <!-- Active Routes -->
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Route :size="20" class="text-emerald-400" />
            </div>
            <p class="text-[10px] font-black uppercase tracking-widest text-emerald-300">{{ t('activeRoutes') }}</p>
          </div>
          <p class="text-3xl lg:text-4xl font-black text-emerald-400">{{ activeTrips.length }}</p>
          <p class="text-sm text-emerald-300 font-medium">completed routes</p>
        </div>
      </div>

      <!-- Contact Methods -->
      <div class="space-y-4">
        
        <!-- Primary Contact -->
        <div class="group flex items-start gap-4 p-4 lg:p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
             @click="$emit('call-primary', profile.Tel1)">
          <div class="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
            <Phone :size="20" class="text-indigo-400 group-hover:text-indigo-300" />
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{{ t('primaryContact') }}</p>
            <p class="text-lg lg:text-xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors">
              {{ profile.Tel1 }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span class="text-xs text-indigo-300 font-medium">{{ t('availableNow') }}</span>
            </div>
          </div>
        </div>

        <!-- Secondary Contact -->
        <div v-if="profile.Tel2W" 
             class="group flex items-start gap-4 p-4 lg:p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
             @click="$emit('call-secondary', profile.Tel2W)">
          <div class="w-10 h-10 lg:w-12 lg:h-12 bg-slate-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-500/30 transition-colors">
            <Phone :size="20" class="text-slate-400 group-hover:text-slate-300" />
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{{ t('secondaryContact') }}</p>
            <p class="text-lg lg:text-xl font-bold tracking-tight text-white hover:text-slate-200 transition-colors">
              {{ profile.Tel2W }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span class="text-xs text-slate-300 font-medium">{{ t('backupContact') }}</span>
            </div>
          </div>
        </div>

        <!-- Fleet Type -->
        <div class="group flex items-start gap-4 p-4 lg:p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
            <Truck :size="20" class="text-emerald-400 group-hover:text-emerald-300" />
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{{ t('fleetType') }}</p>
            <p class="text-lg lg:text-xl font-bold tracking-tight text-white hover:text-emerald-200 transition-colors">
              {{ profile.voiture || t('standardFleet') }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span class="text-xs text-emerald-300 font-medium">{{ t('heavyDuty') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <!-- Direct Call Button -->
        <a :href="`tel:${profile.Tel1}`" 
           class="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[0.98] active:scale-[0.95]">
          <Phone :size="20" class="text-white" />
          <span class="text-sm lg:text-base font-bold">{{ t('directCall') }}</span>
        </a>
        
        <!-- Copy Dossier Button -->
        <button @click="$emit('copy-contact')" 
                class="flex items-center justify-center gap-3 px-6 py-4 bg-slate-700 text-white rounded-2xl font-black hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[0.98] active:scale-[0.95]">
          <Copy :size="18" class="text-white" />
          <span class="text-sm lg:text-base font-bold">{{ t('copyDossier') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Phone, Truck, Copy, DollarSign, Route } from 'lucide-vue-next'

export default {
  components: { Phone, Truck, Copy, DollarSign, Route },
  props: {
    profile: Object,
    activeTrips: Array,
    currentLang: String,
    t: Function
  },
  emits: ['call-primary', 'call-secondary', 'copy-contact']
}
</script>
