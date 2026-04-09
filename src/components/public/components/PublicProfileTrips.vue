<template>
  <section class="w-full">


    <div v-if="activeTrips && activeTrips.length > 0" class="relative overflow-hidden">
      <div class="flex transition-transform duration-700 ease-in-out" 
           :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        
        <div v-for="(trip, index) in activeTrips" :key="trip.idV" 
             class="w-full flex-shrink-0 px-0.5">
          
          <div :class="[
                 'relative rounded-[2rem] p-5 border transition-all duration-500 overflow-hidden',
                 isPassed(trip.DateF) 
                  ? 'bg-slate-50 border-slate-200 grayscale-[0.8] opacity-80' 
                  : 'bg-white border-slate-100 shadow-lg shadow-slate-200/40 hover:border-indigo-200'
               ]">
            
            <div class="absolute -right-2 -bottom-2 text-[60px] font-black text-slate-100/50 italic select-none">
              {{ isPassed(trip.DateF) ? 'PAST' : '0' + (index + 1) }}
            </div>

            <div class="relative z-10 flex items-center justify-between mb-6">
              <div class="flex items-center bg-slate-950 rounded-lg p-1 pr-3">
                <div :class="[
                  'text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase mr-2',
                  isPassed(trip.DateF) ? 'bg-slate-600 text-white' : 'bg-indigo-600 text-white'
                ]">
                  {{ isPassed(trip.DateF) ? 'Past' : 'Active' }}
                </div>
                <span class="text-[10px] font-black text-white tabular-nums">{{ formatDate(trip.DateD) }}</span>
                <span class="mx-2 text-slate-700 text-[10px]">—</span>
                <span class="text-[10px] font-black text-white tabular-nums">{{ formatDate(trip.DateF) }}</span>
              </div>
              <div v-if="activeTrips?.length > 1" class="flex items-center gap-1.5 ">
                <button @click="prevSlide" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all">
                  <ChevronLeft :size="14" />
                </button>
                <button @click="nextSlide" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all">
                  <ChevronRight :size="14" />
                </button>
              </div>
              <CheckCircle2 v-if="isPassed(trip.DateF)" :size="14" class="text-slate-400" />
            </div>

            <div class="relative z-10 flex flex-col gap-6">
              
              <div class="relative flex gap-4">
                <div class="absolute left-[9px] top-6 bottom-[-30px] w-px border-l-2 border-dashed border-slate-100"></div>
                
                <div class="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 z-10">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('origin') }}</span>
                  <p class="text-lg font-black text-slate-900 leading-none truncate mb-2">{{ trip.PaysD }}</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="city in parseCities(trip.villePD)" :key="city" 
                          class="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[9px] font-bold text-slate-500 uppercase">
                      {{ city }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="relative flex gap-4">
                <div class="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 z-10">
                  <Navigation :size="10" class="text-emerald-600 fill-emerald-600" />
                </div>
                
                <div class="flex-1 min-w-0">
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('destination') }}</span>
                  <p class="text-lg font-black text-slate-900 leading-none truncate mb-2">{{ trip.PaysF }}</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="city in parseCities(trip.villePF)" :key="city" 
                          class="px-2 py-0.5 bg-slate-900 text-white rounded-md text-[9px] font-bold uppercase">
                      {{ city }}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div class="mt-8 pt-4 border-t border-slate-50 flex items-center gap-3">
              <Truck :size="14" :class="isPassed(trip.DateF) ? 'text-slate-300' : 'text-indigo-500'" />
              <div class="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div :class="[
                  'h-full origin-left transition-transform duration-[8000ms] ease-linear',
                  currentIndex === index ? 'scale-x-100' : 'scale-x-0',
                  isPassed(trip.DateF) ? 'bg-slate-200' : 'bg-indigo-500'
                ]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTrips.length > 1" class="flex justify-center gap-1.5 mt-4">
        <button v-for="(_, i) in activeTrips" :key="i" 
                @click="currentIndex = i"
                :class="['h-1 rounded-full transition-all duration-300', currentIndex === i ? 'w-4 bg-indigo-600' : 'w-1 bg-slate-200']"></button>
      </div>
    </div>

    <div v-else class="py-12 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/50 text-center">
       <Package :size="20" class="text-slate-300 mx-auto mb-2" />
       <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ t('noExpeditions') }}</p>
    </div>
  </section>
</template>

<script>
import { MapPin, Navigation, Truck, Package, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-vue-next'

export default {
  name: 'PublicProfileTrips',
  components: { MapPin, Navigation, Truck, Package, ChevronLeft, ChevronRight, CheckCircle2 },
  props: {
    activeTrips: Array,
    currentLang: String,
    t: Function
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeUnmount() {
    this.stopTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.activeTrips.length
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 ? this.activeTrips.length - 1 : this.currentIndex - 1
    },
    isPassed(dateF) {
      if (!dateF) return false
      return new Date(dateF) < new Date()
    },
    parseCities(data) {
      if (!data) return []
      if (Array.isArray(data)) return data
      try {
        const parsed = JSON.parse(data)
        return Array.isArray(parsed) ? parsed : [data]
      } catch (e) {
        return [data]
      }
    },
    formatDate(dateString) {
      if (!dateString) return '—'
      return new Date(dateString).toLocaleDateString(this.currentLang === 'fr' ? 'fr-FR' : 'en-GB', {
        day: '2-digit',
        month: 'short'
      })
    }
  }
}
</script>