<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-sans text-slate-900 antialiased">
    
    <!-- Planning Header with ProfileHeaderComponent -->
    <ProfileHeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />
    
    
    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      
      <!-- Trip Status Card -->
      <PlanningTripStatus v-if="activeTrip" :active-trip="activeTrip" :current-lang="currentLang" :t="t" />

      <!-- Action Buttons -->
      <PlanningActions v-if="activeTrip" 
                     :active-trip="activeTrip" 
                     :current-lang="currentLang" 
                     :t="t"
                     :is-loading="isLoadingAction"
                     :current-action="currentAction"
                     @start-trip="startTrip"
                     @auto-advance="autoAdvance"
                     @set-on-boat="setOnBoatStatus"
                     @show-manual-modal="showManualModal = true"
                     @finish-trip="finishTrip" />

      <!-- Cities Progress -->
      <PlanningRouteProgress v-if="activeTrip" :active-trip="activeTrip" :current-lang="currentLang" :t="t" />

      <!-- Manual Update Modal -->
      <PlanningManualModal :show-modal="showManualModal" 
                         :active-trip="activeTrip" 
                         :current-lang="currentLang" 
                         :t="t"
                         @close-modal="showManualModal = false"
                         @update-status="updateStatusManually" />

      <!-- No Trip Selected -->
      <PlanningEmptyState v-if="!activeTrip" :current-lang="currentLang" :t="t" />
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'
import PlanningHeader from './components/PlanningHeader.vue'
import PlanningTripStatus from './components/PlanningTripStatus.vue'
import PlanningActions from './components/PlanningActions.vue'
import PlanningRouteProgress from './components/PlanningRouteProgress.vue'
import PlanningManualModal from './components/PlanningManualModal.vue'
import PlanningEmptyState from './components/PlanningEmptyState.vue'

export default {
  name: 'PlanningListComponent',
  components: { 
    ProfileHeaderComponent,
    PlanningHeader,
    PlanningTripStatus,
    PlanningActions,
    PlanningRouteProgress,
    PlanningManualModal,
    PlanningEmptyState,
    FooterComponent
  },
  setup() {
    const activeTrip = ref(null)
    const showManualModal = ref(false)
    const currentLang = ref('fr')
    const isLoadingAction = ref(false)
    const currentAction = ref('')

    // Load language preference from localStorage
    const loadLanguagePreference = () => {
      const saved = localStorage.getItem('preferredLanguage')
      if (saved) {
        currentLang.value = saved
      }
    }

    // Handle language change from header
    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
    }

    // Translations
    const translations = {
      en: {
        tripPlanning: 'Trip Planning',
        tripStatus: 'Trip Status',
        currentLocation: 'Current Location',
        nextStop: 'Next Stop',
        routeProgress: 'Route Progress',
        startJourney: 'Start Journey',
        beginTripFrom: 'Begin your trip from {country}',
        nextCity: 'Next City',
        advanceTo: 'Advance to {city}',
        onBoat: 'On Boat',
        travelingFromTo: 'Traveling from {from} to {to}',
        manualUpdate: 'Manual Update',
        setCustomStatus: 'Set custom status & location',
        finishTrip: 'Finish Trip',
        completeJourneyAt: 'Complete journey at {city}',
        statusUpdate: 'Status Update',
        onBoatStatus: 'On Boat',
        status: 'Status',
        selectStatus: 'Select Status',
        currentCity: 'Current City',
        selectCity: 'Select City',
        message: 'Message',
        optional: 'Optional',
        messagePlaceholder: 'Add details: breakdown info, delays, weather conditions...',
        updateStatus: 'Update Status',
        cancel: 'Cancel',
        noTripSelected: 'No Trip Selected',
        selectTripToStart: 'Select a trip from your voyages to start planning',
        viewVoyages: 'View Voyages',
        enRoute: 'En Route',
        pause: 'Pause',
        breakdown: 'Breakdown',
        arrived: 'Arrived',
        delayed: 'Delayed'
      },
      fr: {
        tripPlanning: 'Planification de Voyage',
        tripStatus: 'Statut du Voyage',
        currentLocation: 'Position Actuelle',
        nextStop: 'Prochain Arrêt',
        routeProgress: 'Progression de l\'Itinéraire',
        startJourney: 'Commencer le Voyage',
        beginTripFrom: 'Commencez votre voyage depuis {country}',
        nextCity: 'Ville Suivante',
        advanceTo: 'Avancer vers {city}',
        onBoat: 'En Bateau',
        travelingFromTo: 'Voyage de {from} à {to}',
        manualUpdate: 'Mise à Jour Manuelle',
        setCustomStatus: 'Définir un statut et une localisation personnalisés',
        finishTrip: 'Terminer le Voyage',
        completeJourneyAt: 'Terminer le voyage à {city}',
        statusUpdate: 'Mise à Jour du Statut',
        onBoatStatus: 'En Bateau',
        status: 'Statut',
        selectStatus: 'Sélectionner un Statut',
        currentCity: 'Ville Actuelle',
        selectCity: 'Sélectionner une Ville',
        message: 'Message',
        optional: 'Optionnel',
        messagePlaceholder: 'Ajoutez des détails: informations de panne, retards, conditions météo...',
        updateStatus: 'Mettre à Jour le Statut',
        cancel: 'Annuler',
        noTripSelected: 'Aucun Voyage Sélectionné',
        selectTripToStart: 'Sélectionnez un voyage dans vos voyages pour commencer la planification',
        viewVoyages: 'Voir les Voyages',
        enRoute: 'En Route',
        pause: 'Pause',
        breakdown: 'Panne',
        arrived: 'Arrivé',
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
    // Load trip data from URL params
    const loadTrip = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const tripId = urlParams.get('tripId')
      
      if (tripId) {
        try {
          const response = await apiService.voyages.getById(tripId)
          
          if (response.data.success) {
            activeTrip.value = response.data.data
          }
        } catch (error) {
          console.error('Error loading trip:', error)
        }
      }
    }

    const startTrip = async () => {
      if (!activeTrip.value) return

      isLoadingAction.value = true
      currentAction.value = 'start'
      
      try {
        const response = await apiService.voyages.start(activeTrip.value.idV)
        
        if (response.data.success) {
          // Directly update the active trip with the response data
          activeTrip.value = response.data.data
          console.log('Trip started, updated data:', response.data.data)
        }
      } catch (error) {
        console.error('Error starting trip:', error)
      } finally {
        isLoadingAction.value = false
        currentAction.value = ''
      }
    }

    const autoAdvance = async () => {
      if (!activeTrip.value) return

      isLoadingAction.value = true
      currentAction.value = 'advance'
      
      try {
        const response = await apiService.voyages.advance(activeTrip.value.idV)
        
        if (response.data.success) {
          // Directly update the active trip with the response data
          activeTrip.value = response.data.data
          console.log('Trip advanced, updated data:', response.data.data)
        } else {
          console.error('Auto-advance failed:', response.data.error)
        }
      } catch (error) {
        console.error('Error auto-advancing:', error)
      } finally {
        isLoadingAction.value = false
        currentAction.value = ''
      }
    }

    const setOnBoatStatus = async () => {
      if (!activeTrip.value) return

      isLoadingAction.value = true
      currentAction.value = 'boat'
      
      try {
        // Calculate the index for the boat position
        const villePD = activeTrip.value.villePD || []
        const boatIndex = villePD.length + 1 // After all departure cities and first douane
        
        const response = await apiService.voyages.update(activeTrip.value.idV, {
          current_city_index: boatIndex,
          status_message: `Traveling from ${activeTrip.value.PaysD} to ${activeTrip.value.PaysF}`
        })
        
        if (response.data.success) {
          // Reload trip to get updated data
          await loadTrip()
        }
      } catch (error) {
        console.error('Error setting on boat status:', error)
      } finally {
        isLoadingAction.value = false
        currentAction.value = ''
      }
    }

    const finishTrip = async () => {
      if (!activeTrip.value) return

      isLoadingAction.value = true
      currentAction.value = 'finish'
      
      try {
        const villePD = activeTrip.value.villePD || []
        const villePF = activeTrip.value.villePF || []
        const totalRouteLength = villePD.length + 2 + 2 + villePF.length // cities + douane + boat + douane + cities
        const lastIndex = totalRouteLength - 1
        
        const response = await apiService.voyages.update(activeTrip.value.idV, {
          current_city_index: lastIndex,
          status: 'arrived',
          status_message: 'Trip completed successfully'
        })
        
        if (response.data.success) {
          // Reload trip to get updated data
          await loadTrip()
        }
      } catch (error) {
        console.error('Error finishing trip:', error)
      } finally {
        isLoadingAction.value = false
        currentAction.value = ''
      }
    }

    const updateStatusManually = async (manualData) => {
      if (!activeTrip.value || !manualData.status) return

      isLoadingAction.value = true
      currentAction.value = 'manual'
      
      try {
        // Convert manual data to use status_message instead of message
        const updateData = {
          status: manualData.status,
          status_message: manualData.message || ''
        }
        
        const response = await apiService.voyages.update(activeTrip.value.idV, updateData)
        
        if (response.data.success) {
          showManualModal.value = false
          // Reload trip to get updated data
          await loadTrip()
        }
      } catch (error) {
        console.error('Error updating status:', error)
      } finally {
        isLoadingAction.value = false
        currentAction.value = ''
      }
    }

    onMounted(() => {
      loadLanguagePreference()
      loadTrip()
    })

    return { 
      activeTrip,
      showManualModal,
      currentLang,
      isLoadingAction,
      currentAction,
      t,
      handleLanguageChange,
      startTrip,
      autoAdvance,
      setOnBoatStatus,
      finishTrip,
      updateStatusManually
    }
  }
}
</script>

<style scoped>
/* Responsive design improvements */
@media (max-width: 768px) {
  .max-w-6xl {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>