<template>
  <div class="flex justify-center mb-10">
    <div class="inline-flex bg-white rounded-2xl p-1 shadow-lg border border-slate-200">
      <button 
        @click="$emit('filter-change', 'all')" 
        :class="[
          'px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300',
          activeFilter === 'all' 
            ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-200/50' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        ]"
      >
        {{ t('allMissions') }} ({{ totalCount }})
      </button>
      
      <button 
        @click="$emit('filter-change', 'completed')" 
        :class="[
          'px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 mx-1',
          activeFilter === 'completed' 
            ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-200/50' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        ]"
      >
        {{ t('completed') }} ({{ completedCount }})
      </button>
      
      <button 
        @click="$emit('filter-change', 'active')" 
        :class="[
          'px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300',
          activeFilter === 'active' 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200/50' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        ]"
      >
        {{ t('active') }} ({{ activeCount }})
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoyageFilters',
  props: {
    activeFilter: {
      type: String,
      required: true
    },
    completedCount: {
      type: Number,
      default: 0
    },
    activeCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
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
  emits: ['filter-change']
}
</script>
