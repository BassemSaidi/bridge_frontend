<template>
  <div v-if="error" class="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
    <p class="text-red-700 font-medium text-sm">{{ error }}</p>
  </div>
  
  <div v-if="success" class="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
    <p class="text-emerald-700 font-medium text-sm">{{ success }}</p>
  </div>
</template>

<script>
export default {
  name: 'ColisMessages',
  props: {
    error: {
      type: String,
      default: ''
    },
    success: {
      type: String,
      default: ''
    }
  }
}
</script>
