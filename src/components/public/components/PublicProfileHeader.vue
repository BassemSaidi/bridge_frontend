<template>
  <nav class="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl shadow-sm shadow-slate-100/50">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-5">
      
      <div class="flex items-center gap-3 lg:gap-4">
        <router-link to="/" class="group flex items-center gap-2 lg:gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-slate-200/50 group-hover:bg-indigo-600 transition-all duration-500">
            <Package :size="20" class="text-white" />
          </div>
          <div class="hidden sm:block group h-10 overflow-hidden cursor-pointer">
            <div class="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-10">
              <div class="h-10 flex items-center">
                <span class="text-2xl font-black tracking-tighter text-slate-900">
                  BRIDGE<span class="text-indigo-600">TN</span>
                </span>
              </div>
              <div class="h-10 flex flex-col justify-center leading-none">
                <span class="text-2xl font-black tracking-tighter text-indigo-600">
                  BRIDGE<span class="text-slate-900">TN</span>
                </span>
                <span class="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400">
                   {{ t('yourGateToWorld') }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center p-1 bg-slate-50 border border-slate-200 rounded-2xl">
          <button 
            @click="$emit('change-lang', 'fr')"
            :class="[
              'px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300',
              currentLang === 'fr' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
            ]"
          >
            FR
          </button>
          <button 
            @click="$emit('change-lang', 'en')"
            :class="[
              'px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300',
              currentLang === 'en' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
            ]"
          >
            EN
          </button>
        </div>

        <router-link to="/" class="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
          <ArrowLeft :size="18" />
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script>
import { Package, ArrowLeft, Languages } from 'lucide-vue-next'

export default {
  components: { Package, ArrowLeft, Languages },
  props: {
    currentLang: String,
    t: Function
  },
  emits: ['change-lang']
}
</script>