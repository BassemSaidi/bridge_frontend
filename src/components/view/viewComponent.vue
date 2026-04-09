<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
    
    
    <!-- View Header Component -->
    <ViewHeader 
      :trip-data="tripData" 
      :loading="loading" 
      :current-lang="currentLang" 
      :t="t" 
      @refresh-trip="loadTrip" 
    />

    <main class="max-w-5xl mx-auto px-6 py-10">
      
      <!-- Loading State -->
      <ViewLoading v-if="loading" :current-lang="currentLang" :t="t" />

      <!-- Error State -->
      <ViewError v-else-if="error" :error="error" :current-lang="currentLang" :t="t" />

      <!-- Main Content -->
      <div v-else-if="tripData" class="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        
        <!-- Left Column -->
        <div class="xl:col-span-7 space-y-6 lg:space-y-8">
          
          <!-- Current Status -->
          <ViewStatus :trip-data="tripData" :current-lang="currentLang" :t="t" />

          <!-- Journey Timeline -->
          <ViewTimeline 
            :trip-data="tripData" 
            :all-cities="allCities" 
            :current-lang="currentLang" 
            :t="t" 
          />
        </div>

        <!-- Right Column -->
        <div class="xl:col-span-5 space-y-4 lg:space-y-6">
          
          <!-- Progress Statistics -->
          <ViewProgress 
            :progress-percentage="progressPercentage"
            :completed-cities="completedCities"
            :remaining-cities="remainingCities"
            :current-lang="currentLang"
            :t="t"
          />

          <!-- Next City / Destination -->
          <ViewNextCity :trip-data="tripData" :current-lang="currentLang" :t="t" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import ViewHeader from './components/ViewHeader.vue'
import ViewStatus from './components/ViewStatus.vue'
import ViewTimeline from './components/ViewTimeline.vue'
import ViewProgress from './components/ViewProgress.vue'
import ViewNextCity from './components/ViewNextCity.vue'
import ViewLoading from './components/ViewLoading.vue'
import ViewError from './components/ViewError.vue'

export default {
  components: { 
    ProfileHeaderComponent,
    ViewHeader,
    ViewStatus,
    ViewTimeline,
    ViewProgress,
    ViewNextCity,
    ViewLoading,
    ViewError
  },
  
  setup() {
    const tripData = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const currentLang = ref('en')

    // Bilingual translations
    const translations = {
      en: {
        liveTracking: 'Live Tracking',
        currentLocation: 'Current Location',
        arrivalZone: 'Arrival Zone',
        importantMessage: 'Important Message',
        liveUpdate: 'Live Update',
        journeyTimeline: 'Journey Timeline',
        departureZone: 'Departure Zone',
        arrivalZone: 'Arrival Zone',
        current: 'Current',
        passed: 'Passed',
        upcoming: 'Upcoming',
        completionRate: 'Completion Rate',
        citiesPassed: 'Cities Passed',
        remaining: 'Remaining',
        upNext: 'Up Next',
        destinationReached: 'Destination Reached',
        journeyCompleted: 'The journey has been successfully completed',
        synchronizingData: 'Synchronizing trip data',
        pleaseWait: 'Please wait...',
        tripNotFound: 'Trip Not Found',
        returnHome: 'Return Home',
        inTransit: 'In Transit',
        onTheWay: 'On The Way',
        finalized: 'Finalized',
        underRepair: 'Under Repair',
        delayed: 'Delayed'
      },
      fr: {
        liveTracking: 'Suivi en Direct',
        currentLocation: 'Position Actuelle',
        arrivalZone: "Zone d'Arrivée",
        importantMessage: 'Message Important',
        liveUpdate: 'Mise à Jour en Direct',
        journeyTimeline: 'Chronologie du Voyage',
        departureZone: 'Zone de Départ',
        arrivalZone: "Zone d'Arrivée",
        current: 'Actuel',
        passed: 'Passé',
        upcoming: 'À Venir',
        completionRate: 'Taux d\'Achèvement',
        citiesPassed: 'Villes Traversées',
        remaining: 'Restantes',
        upNext: 'Prochain Arrêt',
        destinationReached: 'Destination Atteinte',
        journeyCompleted: 'Le voyage a été achevé avec succès',
        synchronizingData: 'Synchronisation des données du voyage',
        pleaseWait: 'Veuillez patienter...',
        tripNotFound: 'Voyage Introuvable',
        returnHome: 'Retour à l\'Accueil',
        inTransit: 'En Transit',
        onTheWay: 'En Route',
        finalized: 'Finalisé',
        underRepair: 'En Réparation',
        delayed: 'Retardé'
      }
    }

    const t = (key, params = {}) => {
      let text = translations[currentLang.value][key] || key
      // Replace placeholders with actual data
      Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`{${param}}`, 'g'), params[param])
      })
      return text
    }

    const loadLanguagePreference = () => {
      const savedLang = localStorage.getItem('preferred-language')
      if (savedLang && ['en', 'fr'].includes(savedLang)) {
        currentLang.value = savedLang
      }
    }

    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
      localStorage.setItem('preferred-language', newLang)
    }

    const allCities = computed(() => {
      if (!tripData.value) return []
      return [...(tripData.value.villePD || []), ...(tripData.value.villePF || [])]
    })

    const completedCities = computed(() => {
      if (!tripData.value) return 0
      const currentCity = tripData.value.current_status?.current_city
      const currentStatus = tripData.value?.current_status?.status || tripData.value?.status
      
      // If trip is arrived, all cities are completed
      if (currentStatus === 'arrived') return allCities.value.length
      
      if (!currentCity) return 0
      if (currentCity === 'On Boat') return tripData.value.villePD?.length || 0
      
      const idx = allCities.value.indexOf(currentCity)
      return idx + 1
    })

    const remainingCities = computed(() => {
      return allCities.value.length - completedCities.value
    })

    const progressPercentage = computed(() => {
      if (allCities.value.length === 0) return 0
      return Math.round((completedCities.value / allCities.value.length) * 100)
    })

    const loadTrip = async () => {
      loading.value = true
      const urlParams = new URLSearchParams(window.location.search)
      const tripCode = urlParams.get('code')
      
      try {
        const response = await apiService.voyages.getById(`by-code/${tripCode}`)
        if (response.data.success) {
          tripData.value = response.data.data
        } else {
          error.value = response.data.error
        }
      } catch (e) {
        error.value = 'Service temporarily unavailable'
      } finally {
        setTimeout(() => loading.value = false, 600) // Smooth transition
      }
    }

    onMounted(() => {
      loadLanguagePreference()
      loadTrip()
    })

    return {
      tripData, 
      loading, 
      error, 
      currentLang,
      allCities, 
      completedCities, 
      remainingCities,
      progressPercentage,
      t,
      handleLanguageChange,
      loadTrip
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Custom Hide Scrollbar but keep functionality */
main::-webkit-scrollbar {
  display: none;
}

/* Responsive design improvements */
@media (max-width: 640px) {
  .max-w-5xl {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 768px) {
  .py-10 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Enhanced animations */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>