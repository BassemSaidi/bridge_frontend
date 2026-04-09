<template>
  <div class="space-y-10">
    <header>
      <h2 class="text-3xl font-black tracking-tight text-slate-900">{{ t('shipmentDetails') }}</h2>
      <p class="text-slate-500 mt-2 font-medium">{{ t('senderReceiverInfo') }}</p>
    </header>

    <ColisMessages :error="error" :success="success" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <label class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
          <User :size="14" /> {{ t('sender') }}
        </label>
        <div class="space-y-3">
          <input 
            v-model="form.senderName" 
            type="text" 
            :placeholder="t('fullName')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-indigo-500 transition-all" 
          />
          <input 
            v-model="form.senderPhone" 
            type="tel" 
            :placeholder="t('phone')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-indigo-500 transition-all" 
          />
          <input 
            v-model="form.senderCity" 
            type="text" 
            :placeholder="t('cityCountry')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-indigo-500 transition-all" 
          />
          <textarea 
            v-model="form.senderAddress" 
            :placeholder="t('fullPickupAddress')" 
            rows="3" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-indigo-500 transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <div class="space-y-4">
        <label class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
          <MapPin :size="14" /> {{ t('receiver') }}
        </label>
        <div class="space-y-3">
          <input 
            v-model="form.receiverName" 
            type="text" 
            :placeholder="t('fullName')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-emerald-500 transition-all" 
          />
          <input 
            v-model="form.receiverPhone" 
            type="tel" 
            :placeholder="t('phone')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-emerald-500 transition-all" 
          />
          <input 
            v-model="form.receiverCity" 
            type="text" 
            :placeholder="t('cityCountry')" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-emerald-500 transition-all" 
          />
          <textarea 
            v-model="form.receiverAddress" 
            :placeholder="t('fullDeliveryAddress')" 
            rows="3" 
            class="w-full rounded-2xl border-2 border-slate-100 bg-white px-5 py-4 font-bold outline-none focus:border-emerald-500 transition-all resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User, MapPin } from 'lucide-vue-next'
import ColisMessages from './ColisMessages.vue'

export default {
  name: 'ColisStep1',
  components: { User, MapPin, ColisMessages },
  props: {
    form: {
      type: Object,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    success: {
      type: String,
      default: ''
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
