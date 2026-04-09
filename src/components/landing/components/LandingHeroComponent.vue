<template>
  <section id="accueil" class="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
    <div class="order-2 lg:order-1">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
        {{ t('hero.title') }} <span class="text-[#0056D2]">{{ t('hero.tunisia') }}</span> {{ t('hero.world') }}
      </h1>
      <p class="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg">
        {{ t('hero.description1') }} {{ t('hero.description2') }}
      </p>
      <a v-if="!isLoggedIn" href="/login">
        <button class="flex items-center gap-2 bg-[#0056D2] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition w-full sm:w-auto justify-center">
          {{ t('hero.cta') }} <ArrowRight :size="20" />
        </button>
      </a>
      <router-link v-else to="/profile">
        <button class="flex items-center gap-2 bg-[#0056D2] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition w-full sm:w-auto justify-center">
          Go to Dashboard <ArrowRight :size="20" />
        </button>
      </router-link>
    </div>
    <div class="order-1 lg:order-2 relative bg-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex justify-center items-center h-64 sm:h-80 lg:h-[450px] overflow-hidden">
      <img 
        src="/src/assets/landing.png" 
        alt="BridgeTN Logistics" 
        class="w-full h-full object-contain relative z-10"
      />
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

// Props
const props = defineProps({
  t: {
    type: Function,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  currentLang: {
    type: String,
    default: 'en'
  }
})
</script>