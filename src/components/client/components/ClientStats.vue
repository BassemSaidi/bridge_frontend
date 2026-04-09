<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Users :size="20" class="text-blue-600" />
        </div>
        <div>
          <p class="text-2xl font-black text-slate-900">{{ totalClients }}</p>
          <p class="text-xs text-slate-500 font-medium">{{ t('totalClients') }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <CheckCircle :size="20" class="text-emerald-600" />
        </div>
        <div>
          <p class="text-2xl font-black text-slate-900">{{ paidClients }}</p>
          <p class="text-xs text-slate-500 font-medium">{{ t('paid') }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
          <Clock :size="20" class="text-amber-600" />
        </div>
        <div>
          <p class="text-2xl font-black text-slate-900">{{ unpaidClients }}</p>
          <p class="text-xs text-slate-500 font-medium">{{ t('pending') }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <Package :size="20" class="text-purple-600" />
        </div>
        <div>
          <p class="text-2xl font-black text-slate-900">{{ totalWeight }} kg</p>
          <p class="text-xs text-slate-500 font-medium">{{ t('totalWeight') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Users, CheckCircle, Clock, Package } from 'lucide-vue-next'

export default {
  name: 'ClientStats',
  components: { Users, CheckCircle, Clock, Package },
  props: {
    clients: {
      type: Array,
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
  computed: {
    totalClients() {
      return this.clients.length
    },
    paidClients() {
      return this.clients.filter(client => client.paid).length
    },
    unpaidClients() {
      return this.clients.filter(client => !client.paid).length
    },
    totalWeight() {
      return this.clients.reduce((total, client) => total + (parseFloat(client.weight) || 0), 0).toFixed(1)
    }
  }
}
</script>
