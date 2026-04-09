<template>
  <div class="w-full lg:w-80">
    <div class="sticky top-28 rounded-[2.5rem] bg-indigo-900 p-8 text-white shadow-2xl">
      <p class="text-[10px] font-black uppercase text-indigo-400 mb-6">{{ t('liveSummary') }}</p>
      <div class="space-y-4">
        <p class="text-2xl font-black tracking-tight">{{ (form.weight * (account?.pricePerKg || 0)).toFixed(2) }}€</p>
        <div class="h-px bg-white/10 w-full"></div>
        <p class="text-xs font-bold text-indigo-200">{{ form.isPaid ? t('paymentConfirmed') : t('paymentOnDelivery') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColisSummary',
  props: {
    form: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      default: null
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
