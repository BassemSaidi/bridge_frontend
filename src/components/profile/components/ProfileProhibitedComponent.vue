<template>
  <div class="bg-rose-50 rounded-[2rem] p-8 border border-rose-100">
    <h3 class="text-lg font-bold text-rose-900 flex items-center gap-2 mb-4">
      <AlertTriangle :size="20" class="text-rose-500" /> {{ t('prohibited') }}
    </h3>
    <ul class="space-y-3">
      <li v-for="(item, idx) in profile.interdits" :key="idx" class="group relative">
        <!-- Edit Mode -->
        <div v-if="isEditing" class="flex items-center justify-between gap-2 text-sm font-medium text-rose-700 bg-white/50 p-3 rounded-lg border border-rose-100">
          <div class="flex items-center gap-2 flex-1">
            <XCircle :size="14" />
            <input 
              v-model="profile.interdits[idx]" 
              class="bg-transparent outline-none w-full placeholder-rose-300" 
              placeholder="Add prohibited item" 
            />
          </div>
          <button 
            @click="$emit('remove-item', 'interdits', idx)" 
            class="text-rose-400 hover:text-rose-600 transition-colors"
          >
            ×
          </button>
        </div>
        
        <!-- View Mode - Enhanced Design -->
        <div v-else class="flex items-center gap-3 p-3 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
          <span class="text-sm font-semibold text-rose-800 flex-1">{{ item }}</span>
          <div class="flex-shrink-0 w-2 h-2 bg-rose-400 rounded-full"></div>
        </div>
      </li>
    </ul>
    
    <!-- Empty State -->
    <div v-if="profile.interdits.length === 0 && !isEditing" class="text-center py-8 px-4 bg-rose-50/30 rounded-xl border border-rose-100 border-dashed">
      <XCircle :size="32" class="text-rose-300 mx-auto mb-2" />
      <p class="text-sm text-rose-600 font-medium">No prohibited items listed</p>
      <p class="text-xs text-rose-400 mt-1">Click edit to add restrictions</p>
    </div>
    
    <button 
      v-if="isEditing" 
      @click="$emit('add-item', 'interdits')" 
      class="mt-4 text-xs font-black uppercase text-rose-500 hover:text-rose-700 transition-colors"
    >
      + Add Item
    </button>
  </div>
</template>

<script>
import { AlertTriangle, XCircle } from 'lucide-vue-next'

export default {
  components: { AlertTriangle, XCircle },
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
  emits: ['remove-item', 'add-item']
}
</script>
