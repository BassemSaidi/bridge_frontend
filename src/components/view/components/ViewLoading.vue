<template>
  <div class="flex flex-col items-center justify-center py-24">
    <div class="relative">
      <div class="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style="animation-delay: 0.15s;"></div>
    </div>
    <p class="mt-6 text-slate-500 font-medium text-lg">{{ t('synchronizingData') }}</p>
    <p class="mt-2 text-slate-400 text-sm">{{ t('pleaseWait') }}</p>
  </div>
</template>

<script>
export default {
  props: {
    currentLang: String,
    t: Function
  }
}
</script>
