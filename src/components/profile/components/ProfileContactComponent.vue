<template>
  <div class="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
    <h3 class="text-lg font-bold mb-6 text-slate-800">{{ t('contactTitle') }}</h3>
    <div class="space-y-4">
      <div class="p-4 bg-slate-50 rounded-2xl">
        <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Tel 1</p>
        <input 
          v-if="isEditing" 
          v-model="profile.Tel1" 
          class="w-full bg-transparent font-bold text-slate-700 outline-none" 
        />
        <p v-else class="font-bold text-slate-700">{{ profile.Tel1 || '—' }}</p>
      </div>
      <div class="p-4 bg-emerald-50/50 rounded-2xl">
        <p class="text-[10px] font-bold text-emerald-600 uppercase mb-1">WhatsApp</p>
        <input 
          v-if="isEditing" 
          v-model="profile.Tel2W" 
          class="w-full bg-transparent font-bold text-slate-700 outline-none" 
        />
        <p v-else class="font-bold text-slate-700">{{ profile.Tel2W || '—' }}</p>
      </div>
    </div>
    
    <button 
      @click="$emit('toggle-edit-save')" 
      :class="[
        isEditing ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border-slate-100', 
        'w-full mt-6 py-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2'
      ]"
    >
      <Save v-if="isEditing" :size="18" /> 
      <Edit3 v-else :size="18" /> 
      {{ isEditing ? t('save') : t('edit') }}
    </button>
  </div>
</template>

<script>
import { Save, Edit3 } from 'lucide-vue-next'

export default {
  components: { Save, Edit3 },
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
  emits: ['toggle-edit-save']
}
</script>
