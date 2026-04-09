<template>
  <div class="space-y-16 relative">
    <!-- Origin Section -->
    <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative hover:shadow-lg transition-all duration-300">
      <div class="absolute -top-4 left-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {{ t('departure') }}
        </div>
      </div>
      
      <div class="space-y-6">
        <div>
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 mb-3 block tracking-wider">{{ t('originLabel') }}</label>
          <div class="relative">
            <input 
              v-model="tripData.originCountry" 
              :placeholder="t('originPlaceholder')" 
              class="w-full bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-transparent focus:border-indigo-500 focus:from-white focus:to-white rounded-2xl px-6 py-4 font-black outline-none transition-all duration-300 shadow-sm"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400">
              <Globe :size="20" />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 block tracking-wider">{{ t('originCitiesLabel') }}</label>
          <div class="space-y-3">
            <div 
              v-for="(city, idx) in tripData.originCities" 
              :key="idx" 
              class="flex gap-3 animate-in zoom-in-95 duration-300"
            >
              <div class="relative flex-1">
                <input 
                  v-model="tripData.originCities[idx]" 
                  :placeholder="t('originCityPlaceholder')" 
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-xl px-5 py-3 text-sm font-bold outline-none transition-all duration-300"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
              </div>
              <button 
                v-if="tripData.originCities.length > 1"
                @click="$emit('remove-city', 'origin', idx)" 
                class="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
              >
                <MinusCircle :size="18" />
              </button>
            </div>
            <button 
              @click="$emit('add-city', 'origin')" 
              class="text-indigo-600 font-black text-[10px] uppercase flex items-center gap-2 mt-3 hover:text-indigo-700 transition-colors duration-200"
            >
              <Plus :size="16" /> {{ t('addCity') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Connection Visual -->
    <div class="flex justify-center -my-8 relative z-10">
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-xl border border-slate-700">
        <Globe :size="28" class="animate-pulse" />
      </div>
    </div>

    <!-- Destination Section -->
    <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative hover:shadow-lg transition-all duration-300">
      <div class="absolute -top-4 left-8 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {{ t('destination') }}
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 mb-3 block tracking-wider">{{ t('destLabel') }}</label>
          <div class="relative">
            <input 
              v-model="tripData.destCountry" 
              :placeholder="t('destPlaceholder')" 
              class="w-full bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-transparent focus:border-emerald-500 focus:from-white focus:to-white rounded-2xl px-6 py-4 font-black outline-none transition-all duration-300 shadow-sm"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
              <Globe :size="20" />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-[10px] font-black uppercase text-slate-400 ml-2 block tracking-wider">{{ t('destCitiesLabel') }}</label>
          <div class="space-y-3">
            <div 
              v-for="(city, idx) in tripData.destCities" 
              :key="idx" 
              class="flex gap-3 animate-in zoom-in-95 duration-300"
            >
              <div class="relative flex-1">
                <input 
                  v-model="tripData.destCities[idx]" 
                  :placeholder="t('destCityPlaceholder')" 
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-200 focus:bg-white rounded-xl px-5 py-3 text-sm font-bold outline-none transition-all duration-300"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              </div>
              <button 
                v-if="tripData.destCities.length > 1"
                @click="$emit('remove-city', 'dest', idx)" 
                class="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
              >
                <MinusCircle :size="18" />
              </button>
            </div>
            <button 
              @click="$emit('add-city', 'dest')" 
              class="text-emerald-600 font-black text-[10px] uppercase flex items-center gap-2 mt-3 hover:text-emerald-700 transition-colors duration-200"
            >
              <Plus :size="16" /> {{ t('addCity') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plus, MinusCircle, Globe } from 'lucide-vue-next'

export default {
  name: 'AddTripRouteSelection',
  components: { Plus, MinusCircle, Globe },
  props: {
    tripData: {
      type: Object,
      required: true
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
  emits: ['add-city', 'remove-city']
}
</script>
