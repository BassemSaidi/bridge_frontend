<template>
  <div class="group bg-white rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
    <!-- Card Header -->
    <div :class="[
      'p-8 text-white relative overflow-hidden',
      voyage.status === 'a arriver' 
        ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800' 
        : 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
    ]">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-repeat opacity-20"></div>
      </div>
      
      <div class="relative z-10">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Truck :size="24" class="text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">{{ voyage.PaysD }} → {{ voyage.PaysF }}</h3>
              <p class="text-white/90 text-sm font-medium">CODE: {{ voyage.codeT }}</p>
            </div>
          </div>
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold border border-white/30">
            {{ voyage.status === 'a arriver' ? voyage.status.toUpperCase() : 'COMPLETED' }}
          </span>
        </div>
        
        <!-- Route Progress -->
        <div class="flex items-center gap-3">
          <Calendar :size="18" class="text-white/80" />
          <span class="text-white/90 font-medium">{{ formatDate(voyage.DateD) }} - {{ formatDate(voyage.DateF) }}</span>
        </div>
      </div>
    </div>
      
    <!-- Card Body -->
    <div class="p-8">
      <!-- Cities -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div :class="[
          'rounded-2xl p-6 border backdrop-blur-sm',
          voyage.status === 'a arriver' 
            ? 'bg-blue-50/50 border-blue-200/50' 
            : 'bg-slate-50/50 border-slate-200/50'
        ]">
          <h4 :class="[
            'text-sm font-bold uppercase tracking-wider mb-4',
            voyage.status === 'a arriver' ? 'text-blue-600' : 'text-slate-600'
          ]">
            {{ t('departureCities') }}
          </h4>
          <div class="space-y-3">
            <div v-for="(city, idx) in voyage.villePD" :key="'dep-' + idx" class="flex items-center gap-3">
              <div :class="[
                'h-8 w-8 rounded-xl flex items-center justify-center text-xs font-bold',
                voyage.status === 'a arriver' ? 'bg-blue-500 text-white' : 'bg-slate-600 text-white'
              ]">
                {{ idx + 1 }}
              </div>
              <span class="text-slate-700 font-medium capitalize">{{ city }}</span>
            </div>
            <div v-if="!voyage.villePD || voyage.villePD.length === 0" class="text-center py-4 text-sm" :class="[
              voyage.status === 'a arriver' ? 'text-blue-400' : 'text-slate-400'
            ]">
              {{ t('noCities') }}
            </div>
          </div>
        </div>
        
        <div :class="[
          'rounded-2xl p-6 border backdrop-blur-sm',
          voyage.status === 'a arriver' 
            ? 'bg-purple-50/50 border-purple-200/50' 
            : 'bg-indigo-50/50 border-indigo-200/50'
        ]">
          <h4 :class="[
            'text-sm font-bold uppercase tracking-wider mb-4',
            voyage.status === 'a arriver' ? 'text-purple-600' : 'text-indigo-600'
          ]">
            {{ t('arrivalCities') }}
          </h4>
          <div class="space-y-3">
            <div v-for="(city, idx) in voyage.villePF" :key="'arr-' + idx" class="flex items-center gap-3">
              <div :class="[
                'h-8 w-8 rounded-xl flex items-center justify-center text-xs font-bold',
                voyage.status === 'a arriver' ? 'bg-purple-500 text-white' : 'bg-indigo-500 text-white'
              ]">
                {{ idx + 1 }}
              </div>
              <span class="text-slate-700 font-medium capitalize">{{ city }}</span>
            </div>
            <div v-if="!voyage.villePF || voyage.villePF.length === 0" class="text-center py-4 text-sm" :class="[
              voyage.status === 'a arriver' ? 'text-purple-400' : 'text-indigo-400'
            ]">
              {{ t('noCities') }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3">
        <button @click="$emit('delete-voyage', voyage.idV)" class="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-rose-100/50 hover:shadow-rose-200/50 hover:scale-105">
          <Trash2 :size="18" /> {{ t('delete') }}
        </button>
        
        <router-link :to="`/planning?tripId=${voyage.idV}`" class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105">
          <Settings2 :size="18" /> {{ t('manage') }}
        </router-link>

        <router-link :to="`/clients?voyage_id=${voyage.idV}`" class="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105">
          <Users :size="18" /> {{ t('clients') }}
        </router-link>

        <router-link :to="`/colis?voyage_id=${voyage.idV}`" class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-blue-100/50 hover:shadow-blue-200/50 hover:scale-105">
          <Plus :size="18" /> {{ t('addColis') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Truck, Calendar, Trash2, Settings2, Users, Plus } from 'lucide-vue-next'

export default {
  name: 'VoyageCard',
  components: { Truck, Calendar, Trash2, Settings2, Users, Plus },
  props: {
    voyage: {
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
  emits: ['delete-voyage'],
  methods: {
    formatDate(date) {
      if (!date) return this.t('notSet')
      const locale = this.currentLang === 'fr' ? 'fr-FR' : 'en-US'
      return new Date(date).toLocaleDateString(locale, { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    }
  }
}
</script>
