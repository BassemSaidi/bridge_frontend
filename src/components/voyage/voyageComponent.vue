<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans text-slate-900 antialiased">
    <!-- Header -->
    <ProfileHeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />

    <!-- Main Content -->
    <div class="mx-auto mt-8 max-w-7xl px-6 pb-12">
      <!-- Page Header -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-3">{{ t('myExpeditions') }}</h1>
        <p class="text-slate-600 text-lg font-medium">{{ t('manageTransportMissions') }}</p>
      </div>

      <!-- Stats Cards -->
      <VoyageStats 
        :completed-count="completedTrips.length"
        :active-count="otherTrips.length"
        :total-count="voyages.length"
        :current-lang="currentLang"
        :t="t"
      />

      <!-- Filter Buttons -->
      <VoyageFilters 
      :active-filter="activeFilter"
      :completed-count="completedTrips.length"
      :active-count="otherTrips.length"
      :total-count="voyages.length"
      :current-lang="currentLang"
      :t="t"
      @filter-change="handleFilterChange"
      />
      
      
            <div v-if="activeFilter === 'all' || activeFilter === 'active'">
              <!-- Active Trips Section -->
              <VoyageSection 
                v-if="otherTrips.length > 0"
                :trips="otherTrips"
                type="active"
                :current-lang="currentLang"
                :t="t"
                @delete-voyage="deleteVoyage"
              />
            </div>
      <!-- Filtered Trips Display -->
      <div v-if="activeFilter === 'all' || activeFilter === 'completed'">
        <!-- Completed Trips Section -->
        <VoyageSection 
          v-if="completedTrips.length > 0"
          :trips="completedTrips"
          type="completed"
          :current-lang="currentLang"
          :t="t"
          @delete-voyage="deleteVoyage"
        />
      </div>

      <!-- Empty State -->
      <VoyageEmptyState 
        v-if="voyages.length === 0 && !isLoading"
        :trips="voyages"
        :is-loading="isLoading"
        :current-lang="currentLang"
        :t="t"
      />
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import VoyageStats from './components/VoyageStats.vue'
import VoyageFilters from './components/VoyageFilters.vue'
import VoyageSection from './components/VoyageSection.vue'
import VoyageEmptyState from './components/VoyageEmptyState.vue'
import FooterComponent from '../basics/FooterComponent.vue'

export default {
  name: 'VoyageListPage',
  components: { 
    ProfileHeaderComponent, 
    VoyageStats, 
    VoyageFilters, 
    VoyageSection, 
    VoyageEmptyState ,
    FooterComponent  
  },
  setup() {
    const voyages = ref([])
    const isLoading = ref(true)
    const activeFilter = ref('all')
    const currentLang = ref('fr')

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
        myExpeditions: 'My Expeditions',
        manageTransportMissions: 'Manage your transport missions efficiently',
        completed: 'Completed',
        inProgress: 'In Progress',
        total: 'Total',
        allMissions: 'All Missions',
        active: 'Active',
        trips: 'trips',
        completedTrips: 'Completed Expeditions',
        activeTrips: 'Active Expeditions',
        successfullyDelivered: 'Successfully delivered missions',
        currentlyInProgress: 'Currently in progress',
        noTripsFound: 'No expeditions found',
        startByCreating: 'Start by creating your first transport mission',
        createFirstTrip: 'Create Your First Trip',
        loadingTrips: 'Loading your expeditions...',
        pleaseWait: 'Please wait while we fetch your data',
        departureCities: 'Departure Cities',
        arrivalCities: 'Arrival Cities',
        noCities: 'No cities',
        delete: 'Delete',
        manage: 'Manage',
        clients: 'Clients',
        addColis: 'Add Colis',
        notSet: 'Not set',
        confirmDelete: 'Are you sure you want to delete this voyage? This action cannot be undone.',
        errorInvalidId: 'Error: Invalid voyage ID',
        failedDeleteMission: 'Failed to delete mission',
        tripNotFound: 'Trip not found: The voyage with ID {tripId} does not exist or may have already been deleted. Please refresh the page and try again.',
        notAuthorized: 'You are not authorized to delete this mission',
        networkError: 'Network error: Could not connect to the server. Please check your connection and try again.',
        missionDeletedSuccess: 'Mission deleted successfully!'
      },
      fr: {
        myExpeditions: 'Mes Expéditions',
        manageTransportMissions: 'Gérez efficacement vos missions de transport',
        completed: 'Terminées',
        inProgress: 'En cours',
        total: 'Total',
        allMissions: 'Toutes les missions',
        active: 'Actives',
        trips: 'voyages',
        completedTrips: 'Expéditions terminées',
        activeTrips: 'Expéditions actives',
        successfullyDelivered: 'Missions livrées avec succès',
        currentlyInProgress: 'Actuellement en cours',
        noTripsFound: 'Aucune expédition trouvée',
        startByCreating: 'Commencez par créer votre première mission de transport',
        createFirstTrip: 'Créer votre premier voyage',
        loadingTrips: 'Chargement de vos expéditions...',
        pleaseWait: 'Veuillez patienter pendant que nous récupérons vos données',
        departureCities: 'Villes de départ',
        arrivalCities: 'Villes d\'arrivée',
        noCities: 'Aucune ville',
        delete: 'Supprimer',
        manage: 'Gérer',
        clients: 'Clients',
        addColis: 'Ajouter Colis',
        notSet: 'Non défini',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce voyage ? Cette action ne peut pas être annulée.',
        errorInvalidId: 'Erreur: ID de voyage invalide',
        failedDeleteMission: 'Échec de la suppression de la mission',
        tripNotFound: 'Voyage non trouvé: Le voyage avec l\'ID {tripId} n\'existe pas ou a peut-être déjà été supprimé. Veuillez actualiser la page et réessayer.',
        notAuthorized: 'Vous n\'êtes pas autorisé à supprimer cette mission',
        networkError: 'Erreur réseau: Impossible de se connecter au serveur. Veuillez vérifier votre connexion et réessayer.',
        missionDeletedSuccess: 'Mission supprimée avec succès !'
      }
    }

    const t = (key) => {
      const translation = translations[currentLang.value][key] || key
      // Handle interpolation for dynamic values
      if (key === 'tripNotFound' && currentLang.value === 'en') {
        return translation.replace('{tripId}', arguments[1] || '')
      }
      return translation
    }

    const loadVoyages = async () => {
      try {
        const response = await apiService.voyages.getAll()
        console.log('Raw data from API:', response.data)
        
        if (response.data.success) {
          voyages.value = response.data.data.map(voyage => {
            console.log('Processing voyage:', voyage)
            console.log('villePD:', voyage.villePD, 'type:', typeof voyage.villePD)
            console.log('villePF:', voyage.villePF, 'type:', typeof voyage.villePF)
            
            // Ensure cities are arrays
            let villePD = Array.isArray(voyage.villePD) ? voyage.villePD : []
            let villePF = Array.isArray(voyage.villePF) ? voyage.villePF : []
            
            return {
              ...voyage,
              villePD: villePD,
              villePF: villePF
            }
          })
          
          console.log('Final voyages array:', voyages.value)
        } else {
          console.error('Failed to load voyages:', response.data.error)
        }
      } catch (error) {
        console.error('Error loading voyages:', error)
      } finally {
        isLoading.value = false
      }
    }

    const completedTrips = computed(() => voyages.value.filter(voyage => voyage.status !== 'a arriver'))
    const otherTrips = computed(() => voyages.value.filter(voyage => voyage.status === 'a arriver'))

    const handleFilterChange = (filter) => {
      activeFilter.value = filter
    }

    // Delete voyage
    const deleteVoyage = async (voyageId) => {
      if (confirm(t('confirmDelete'))) {
        try {
          console.log('Attempting to delete voyage with ID:', voyageId)
          console.log('Voyage ID type:', typeof voyageId)
          
          // Validate voyage ID
          if (!voyageId) {
            console.error('Invalid voyage ID: undefined or null')
            alert(t('errorInvalidId'))
            return
          }
          
          const response = await apiService.voyages.delete(voyageId)
          console.log('Delete response data:', response.data)
          
          if (response.data.success) {
            // Remove from local array
            voyages.value = voyages.value.filter(v => v.idV !== voyageId)
            console.log('Voyage deleted successfully from UI')
            alert(t('missionDeletedSuccess'))
          } else {
            console.error('Failed to delete voyage:', response.data.error)
            console.error('Full error response:', response.data)
            
            // More specific error message
            let errorMessage = t('failedDeleteMission')
            if (response.data.error) {
              if (response.data.error.includes('not found')) {
                errorMessage = t('tripNotFound', voyageId)
              } else if (response.data.error.includes('unauthorized')) {
                errorMessage = t('notAuthorized')
              } else {
                errorMessage = `${t('failedDeleteMission')}: ${response.data.error}`
              }
            }
            alert(errorMessage)
          }
        } catch (error) {
          console.error('Network error deleting voyage:', error)
          alert(t('networkError'))
        }
      }
    }

    onMounted(() => {
      loadLanguagePreference()
      loadVoyages()
    })

    return { 
      voyages, 
      isLoading, 
      activeFilter, 
      currentLang,
      completedTrips, 
      otherTrips, 
      handleFilterChange,
      handleLanguageChange,
      deleteVoyage,
      t,
      ProfileHeaderComponent 
    }
  }
}
</script>

<style scoped>
/* Smooth entrance for the cards */

.space-y-6 > div {

  animation: slideIn 0.5s ease-out forwards;

}



@keyframes slideIn {

  from { opacity: 0; transform: translateY(10px); }

  to { opacity: 1; transform: translateY(0); }

}

</style>