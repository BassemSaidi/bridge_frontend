<template>
  <div class="flex items-center justify-between mb-6 px-2">
    <h2 class="text-2xl font-black tracking-tight">{{ t('registeredClients') }}</h2>
    <span class="text-[10px] font-black uppercase bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm text-slate-400">
      {{ clients.length }} {{ t('entries') }}
    </span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="client in clients" :key="client.id" 
      @click="$emit('select-client', client)"
      class="group relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden"
      :class="[
        client.status === 'livré' 
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/30 to-green-50/30 shadow-emerald-100/50 hover:shadow-emerald-200/50 hover:border-emerald-300' 
          : 'border-blue-200 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 shadow-blue-100/50 hover:shadow-blue-200/50 hover:border-blue-300'
      ]">
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4 z-10">
        <div :class="[
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
          client.status === 'livré' 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
            : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
        ]">
          <div :class="[
            'w-2 h-2 rounded-full animate-pulse',
            client.status === 'livré' ? 'bg-emerald-200' : 'bg-blue-200'
          ]"></div>
          {{ client.status === 'livré' ? t('delivered') : t('enRoute') }}
        </div>
      </div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
           :class="client.status === 'livré' ? 'bg-emerald-500' : 'bg-blue-500'">
      </div>
      
      <!-- Client Header -->
      <div class="relative z-10 flex items-start gap-3 mb-4">
        <div class="h-12 w-12 rounded-xl flex items-center justify-center font-black text-lg shadow-lg"
             :class="[
               client.status === 'livré' 
                 ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white' 
                 : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
             ]">
          {{ client.name.charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1">
          <h3 class="font-black text-lg text-slate-900 mb-1">{{ client.name }}</h3>
          <div class="flex items-center gap-2">
            <div :class="[
              'h-2 w-2 rounded-full',
              client.paid ? 'bg-emerald-500' : 'bg-amber-500'
            ]"></div>
            <span class="text-xs text-slate-600">
              {{ client.paid ? t('paid') : t('pending') }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Client Info -->
      <div class="relative z-10 space-y-3">
        <div class="flex items-center gap-2 text-sm text-slate-600">
          <MapPin :size="14" class="text-slate-500" />
          <span class="font-medium">{{ client.city }}</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-slate-600">
          <Package :size="14" class="text-slate-500" />
          <span class="font-medium">{{ client.weight }} kg</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-slate-600">
          <Phone :size="14" class="text-slate-500" />
          <span class="font-medium">{{ client.phone }}</span>
        </div>
      </div>
      
      <!-- Hover Action -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
           :class="client.status === 'livré' ? 'from-emerald-600 to-green-500' : 'from-blue-600 to-indigo-500'">
        <div class="text-white p-4">
          <p class="text-xs font-medium mb-1">{{ t('viewDetails') }}</p>
          <p class="text-xs opacity-80">{{ client.status === 'livré' ? t('deliveryConfirmed') : t('clickForMoreInfo') }}</p>
        </div>
      </div>

      <!-- Status Indicator Border -->
      <div class="absolute bottom-0 left-0 right-0 h-1"
           :class="client.status === 'livré' ? 'bg-emerald-500' : 'bg-blue-500'">
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Package, Phone } from 'lucide-vue-next'

export default {
  name: 'ClientGrid',
  components: { MapPin, Package, Phone },
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
  emits: ['select-client']
}
</script>
