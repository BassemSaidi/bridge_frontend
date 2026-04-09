<template>
  <div class="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 text-white transition-all">
    <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
      <div class="relative group">
        <img 
          :src="profile.img || 'https://ui-avatars.com/api/?name=' + profile.nom + '&background=4f46e5&color=fff'" 
          class="h-32 w-32 rounded-3xl object-cover border-4 border-slate-700 shadow-2xl" 
        />
        <div class="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-slate-900"></div>
      </div>
      
      <div class="text-center md:text-left flex-1">
        <input 
          v-if="isEditing" 
          v-model="profile.nom" 
          class="bg-slate-800 border-2 border-indigo-400 rounded-xl px-4 py-1 text-4xl font-black w-full mb-2 outline-none" 
        />
        <h1 v-else class="text-4xl font-black tracking-tight">{{ profile.nom || 'Your Name' }}</h1>
        
        <div class="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
          <div class="flex items-center gap-2 bg-indigo-500/20 rounded-lg px-3 py-1.5">
            <Truck :size="14" class="text-indigo-300"/>
            <input 
              v-if="isEditing" 
              v-model="profile.voiture" 
              class="bg-transparent border-none text-xs font-bold w-32 outline-none text-white" 
            />
            <span v-else class="text-xs font-bold text-indigo-300">{{ profile.voiture || 'Your Vehicle' }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 w-full md:w-auto">
        <div class="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10">
          <p class="text-2xl font-black text-indigo-400">{{ profile.rating || 100 }}%</p>
          <p class="text-[10px] uppercase font-bold tracking-widest text-slate-400">{{ t('success') }}</p>
        </div>
        <div class="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10">
          <div class="flex items-center justify-center gap-1">
            <input 
              v-if="isEditing" 
              v-model="profile.pricePerKg" 
              class="bg-slate-700 w-12 rounded text-center text-xl font-black text-emerald-400 outline-none" 
            />
            <span v-else class="text-2xl font-black text-emerald-400">{{ profile.pricePerKg || 0 }}</span>
            <span class="text-emerald-400">€</span>
          </div>
          <p class="text-[10px] uppercase font-bold tracking-widest text-slate-400">{{ t('perKg') }}</p>
        </div>
      </div>
    </div>
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
  </div>
</template>

<script>
import { Truck } from 'lucide-vue-next'

export default {
  components: { Truck },
  props: {
    profile: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
