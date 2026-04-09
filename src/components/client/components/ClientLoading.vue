<template>
  <div class="flex flex-col items-center justify-center py-32">
    <div class="relative">
      <div class="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style="animation-delay: 0.15s;"></div>
    </div>
    <p class="mt-6 text-slate-400 font-black uppercase tracking-widest text-sm">{{ t('loadingClients') }}</p>
  </div>
</template>

<script>
export default {
  name: 'ClientLoading',
  props: {
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
