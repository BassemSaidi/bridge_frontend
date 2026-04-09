<template>
  <nav class="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-4">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 shadow-xl shadow-slate-200">
          <Package :size="22" class="text-white" />
        </div>
        <span class="text-2xl font-black tracking-tighter text-slate-900">BRIDGE<span class="text-indigo-600">TN</span></span>
      </div>
      
      <div class="flex items-center gap-4">
        <router-link to="/voyages" class="h-10 w-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft :size="18" class="text-slate-600" />
        </router-link>
        <div>
          <h1 class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">{{ t('cargoManifest') }}</h1>
          <p class="text-sm font-black text-slate-400">{{ t('voyage') }} #{{ tripID }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <!-- Client Avatars -->
        <div v-if="clients.length > 0" class="flex -space-x-2">
          <div v-for="i in Math.min(clients.length, 3)" :key="i" class="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-black shadow-lg">
            {{ clients[i-1].name.charAt(0).toUpperCase() }}
          </div>
          <div v-if="clients.length > 3" class="h-8 w-8 rounded-full border-2 border-white bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">
            +{{ clients.length - 3 }}
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ArrowLeft, Package } from 'lucide-vue-next'

export default {
  name: 'ClientHeader',
  components: { ArrowLeft, Package },
  props: {
    tripID: {
      type: String,
      required: true
    },
    clients: {
      type: Array,
      default: () => []
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
