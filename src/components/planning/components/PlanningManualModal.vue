<template>
  <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6" @click="$emit('close-modal')">
    <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-slate-900">{{ t('manualUpdate') }}</h3>
        <button @click="$emit('close-modal')" 
                class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
          <ArrowLeft :size="20" />
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">{{ t('status') }}</label>
          <select v-model="manualData.status" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="">{{ t('selectStatus') }}</option>
            <option value="en_route">{{ t('enRoute') }}</option>
            <option value="pause">{{ t('pause') }}</option>
            <option value="panne">{{ t('breakdown') }}</option>
            <option value="arrived">{{ t('arrived') }}</option>
            <option value="message">{{ t('message') }}</option>
            <option value="delayed">{{ t('delayed') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">{{ t('currentCity') }}</label>
          <select v-model="manualData.current_city" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="">{{ t('selectCity') }}</option>
            <optgroup v-if="activeTrip.villePD?.length" :label="activeTrip.PaysD">
              <option v-for="city in activeTrip.villePD" :key="`dep-${city}`" :value="city">{{ city }}</option>
            </optgroup>
            <optgroup v-if="activeTrip.villePF?.length" :label="activeTrip.PaysF">
              <option v-for="city in activeTrip.villePF" :key="`arr-${city}`" :value="city">{{ city }}</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">{{ t('message') }} ({{ t('optional') }})</label>
          <textarea v-model="manualData.message" 
                    :placeholder="t('messagePlaceholder')" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" 
                    rows="3"></textarea>
        </div>

        <div class="flex gap-4">
          <button @click="$emit('update-status', manualData)" 
                  :disabled="!manualData.status || !manualData.current_city"
                  class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-4 font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {{ t('updateStatus') }}
          </button>
          <button @click="$emit('close-modal')" 
                  class="flex-1 bg-slate-100 text-slate-700 rounded-xl py-4 font-bold transition-all hover:bg-slate-200">
            {{ t('cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from 'lucide-vue-next'

export default {
  name: 'PlanningManualModal',
  components: { ArrowLeft },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    activeTrip: {
      type: Object,
      required: true
    },
    currentLang: {
      type: String,
      default: 'en'
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['close-modal', 'update-status'],
  data() {
    return {
      manualData: {
        status: '',
        current_city: '',
        message: ''
      }
    }
  },
  watch: {
    showModal(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    }
  },
  methods: {
    resetForm() {
      this.manualData = {
        status: '',
        current_city: '',
        message: ''
      }
    }
  }
}
</script>
