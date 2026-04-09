<template>
  <div class="space-y-10">
    <header>
      <h2 class="text-3xl font-black tracking-tight text-slate-900">{{ t('packagePayment') }}</h2>
      <p class="text-slate-500 mt-2 font-medium">{{ t('lastStepGenerateSlip') }}</p>
    </header>

    <div class="space-y-8">
      <div class="space-y-3">
        <label class="text-xs font-black uppercase text-slate-400">{{ t('totalWeight') }}</label>
        <div class="relative">
          <Weight class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" :size="20" />
          <input 
            v-model="form.weight" 
            type="number" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white pl-14 pr-5 py-4 font-black outline-none focus:border-indigo-500 transition-all" 
          />
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-xs font-black uppercase text-slate-400">{{ t('numberOfBoxes') }}</label>
        <div class="relative">
          <Package class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" :size="20" />
          <input 
            v-model="form.nb_box" 
            type="number" 
            min="1"
            class="w-full rounded-2xl border-2 border-slate-100 bg-white pl-14 pr-5 py-4 font-black outline-none focus:border-indigo-500 transition-all" 
            placeholder="1"
          />
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-xs font-black uppercase text-slate-400">{{ t('currentStatus') }}</label>
        <div class="grid grid-cols-2 gap-4">
          <button 
            @click="$emit('update:is-paid', true)" 
            :class="[
              form.isPaid ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white text-slate-400 border-2 border-slate-100', 
              'py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2'
            ]"
          >
            <CheckCircle :size="18" /> {{ t('paid') }}
          </button>
          <button 
            @click="$emit('update:is-paid', false)" 
            :class="[
              !form.isPaid ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-white text-slate-400 border-2 border-slate-100', 
              'py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2'
            ]"
          >
            <Clock :size="18" /> {{ t('toPay') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Weight, CheckCircle, Clock, Package } from 'lucide-vue-next'

export default {
  name: 'ColisStep2',
  components: { Weight, CheckCircle, Clock, Package },
  props: {
    form: {
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
  emits: ['update:is-paid']
}
</script>
