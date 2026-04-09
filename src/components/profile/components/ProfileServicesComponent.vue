<template>
  <div class="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100">
    <div class="flex items-center gap-4 mb-6">
      <div class="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
        <Info :size="24" />
      </div>
      <div>
        <h3 class="text-xl font-bold">{{ t('packingTitle') }}</h3>
        <p class="text-indigo-100 text-sm">{{ t('packingSub') }}</p>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="(tip, idx) in profile.guide" :key="idx" class="flex gap-4">
        <span class="text-2xl font-black text-white/30">{{ idx + 1 }}</span>
        <div class="w-full">
          <textarea 
            v-if="isEditing" 
            v-model="profile.guide[idx]" 
            class="w-full bg-white/10 rounded-lg p-2 text-sm outline-none text-white border-none"
          ></textarea>
          <p v-else class="text-sm font-medium leading-snug text-indigo-50 pt-2">{{ tip }}</p>
        </div>
        <button 
          v-if="isEditing" 
          @click="$emit('remove-item', 'guide', idx)" 
          class="text-white/30 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
    <button 
      v-if="isEditing" 
      @click="$emit('add-item', 'guide')" 
      class="mt-4 text-xs font-bold text-white/70 hover:text-white"
    >
      + Add Step
    </button>
  </div>
</template>

<script>
import { Info } from 'lucide-vue-next'

export default {
  components: { Info },
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
