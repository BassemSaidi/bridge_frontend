<template>
  <div class="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
    <h3 class="text-lg font-bold mb-4 text-slate-800">{{ t('aboutTitle') }}</h3>
    <textarea 
      v-if="isEditing" 
      v-model="profile.Bio" 
      rows="4" 
      class="w-full p-4 bg-slate-50 rounded-2xl border-2 border-indigo-100 outline-none font-medium"
    ></textarea>
    <p v-else class="text-slate-600 leading-relaxed font-medium">{{ profile.Bio || 'No biography provided.' }}</p>
    
    <div class="mt-8 pt-8 border-t border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <h4 class="text-sm font-bold text-slate-400 uppercase tracking-widest">{{ t('routes') }}</h4>
        <button 
          v-if="isEditing" 
          @click="$emit('add-item', 'paysTrajet')" 
          class="text-xs font-black text-indigo-600 hover:underline"
        >
          + ADD COUNTRY
        </button>
      </div>
      
      <div class="flex flex-wrap gap-3">
        <div v-for="(route, idx) in profile.paysTrajet" :key="idx" class="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm border border-indigo-100 shadow-sm">
          <MapPin :size="14" />
          <input 
            v-if="isEditing" 
            v-model="profile.paysTrajet[idx]" 
            placeholder="Country" 
            class="bg-transparent border-none outline-none w-20" 
          />
          <span v-else>{{ route }}</span>
          <button 
            v-if="isEditing" 
            @click="$emit('remove-item', 'paysTrajet', idx)" 
            class="ml-1 text-indigo-300 hover:text-red-500"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin } from 'lucide-vue-next'

export default {
  components: { MapPin },
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
  },
  emits: ['add-item', 'remove-item']
}
</script>
