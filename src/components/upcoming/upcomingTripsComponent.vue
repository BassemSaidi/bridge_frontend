<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans text-slate-800 antialiased">
    
    <!-- Header -->
    <HeaderComponent 
      :show-back-button="true" 
      @language-changed="handleLanguageChange"
    />
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      
      <!-- Page Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-8 shadow-lg">
          <Calendar class="h-10 w-10 text-white" />
        </div>
        <h1 class="text-5xl font-semibold text-slate-800 mb-4">
          {{ t('title') }}
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          {{ t('subtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-32">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <p class="mt-6 text-slate-500 font-medium">Loading trips...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-32">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-2xl mb-6">
          <X class="h-10 w-10 text-red-400" />
        </div>
        <p class="text-slate-600 text-lg">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="trips.length === 0" class="text-center py-32">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-2xl mb-8">
          <Calendar class="h-12 w-12 text-slate-400" />
        </div>
        <p class="text-slate-600 text-lg mb-2">{{ t('noTrips') }}</p>
        <p class="text-slate-500">Check back later for new trips</p>
      </div>

      <!-- Trips Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="trip in trips" 
          :key="trip.idV"
          class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200"
        >
          <!-- Trip Card -->
          <div class="p-5">
            <!-- Transporter Info & Status -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-md">
                  <span class="text-white font-semibold text-sm">{{ getInitials(trip.account_name) }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-800 text-sm">{{ trip.account_name }}</h3>
                  <p class="text-xs text-slate-500">{{ trip.voiture }}</p>
                </div>
              </div>
              <span class="px-2 py-1 text-xs font-medium rounded-md"
                    :class="getStatusClass(trip.status)">
                {{ getStatusText(trip.status) }}
              </span>
            </div>

            <!-- Route -->
            <div class="mb-4">
              <div class="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                <div class="text-center flex-1">
                  <p class="text-xs text-slate-500 uppercase tracking-wide mb-0.5">{{ t('from') }}</p>
                  <p class="font-bold text-slate-800 text-sm">{{ trip.PaysD }}</p>
                </div>
                <div class="flex-shrink-0 mx-3">
                  <ArrowRight class="h-4 w-4 text-blue-600" />
                </div>
                <div class="text-center flex-1">
                  <p class="text-xs text-slate-500 uppercase tracking-wide mb-0.5">{{ t('to') }}</p>
                  <p class="font-bold text-slate-800 text-sm">{{ trip.PaysF }}</p>
                </div>
              </div>
            </div>

            <!-- Cities -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1.5 mb-2">
                <span 
                  v-for="(city, index) in trip.villePD.slice(0, 2)" 
                  :key="'dep-'+index"
                  class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100"
                >
                  {{ city }}
                </span>
                <span v-if="trip.villePD.length > 2" class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium">
                  +{{ trip.villePD.length - 2 }}
                </span>
                <ArrowRight class="h-3 w-3 text-slate-400 mx-1 self-center" />
                <span 
                  v-for="(city, index) in trip.villePF.slice(0, 2)" 
                  :key="'arr-'+index"
                  class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-100"
                >
                  {{ city }}
                </span>
                <span v-if="trip.villePF.length > 2" class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium">
                  +{{ trip.villePF.length - 2 }}
                </span>
              </div>
            </div>

            <!-- Date, Price & Button -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex items-center text-xs text-slate-500">
                  <Calendar class="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                  <span>{{ formatDate(trip.DateD) }}</span>
                </div>
                <div class="flex items-center text-xs text-slate-600">
                  <span class="font-semibold text-blue-600">{{ trip.pricePerKg || 0 }}</span>
                  <span class="ml-1">€/kg</span>
                </div>
              </div>
              <button 
                @click="openPackageRequest(trip)"
                class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-1.5"
              >
                <Package class="h-4 w-4" />
                {{ t('requestPackage') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Package Request Modal -->
    <div v-if="showPackageRequestModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Package class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-xl font-semibold text-white">{{ t('requestForm.title') }}</h2>
            </div>
            <button @click="closePackageRequest" class="text-white/80 hover:text-white transition-colors">
              <X class="h-6 w-6" />
            </button>
          </div>
        </div>

        <div class="p-6">
          <form @submit.prevent="submitPackageRequest" class="space-y-6">
            <!-- Sender Information -->
            <div class="space-y-4">
              <h3 class="font-semibold text-slate-800">{{ t('requestForm.senderInfo') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.senderName') }}</label>
                  <input v-model="packageRequest.nomS" type="text" required
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.senderPhone') }}</label>
                  <input v-model="packageRequest.TelS" type="tel" required
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.senderAddress') }}</label>
                <textarea v-model="packageRequest.adresseS" required rows="2"
                          class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.senderDetails') }}</label>
                <textarea v-model="packageRequest.detailsS" rows="2"
                          class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>
            </div>

            <!-- Receiver Information -->
            <div class="space-y-4 pt-4 border-t border-slate-100">
              <h3 class="font-semibold text-slate-800">{{ t('requestForm.receiverInfo') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.receiverName') }}</label>
                  <input v-model="packageRequest.nomR" type="text" required
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.receiverPhone') }}</label>
                  <input v-model="packageRequest.TelR" type="tel" required
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.receiverAddress') }}</label>
                <textarea v-model="packageRequest.adresseR" required rows="2"
                          class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.receiverDetails') }}</label>
                <textarea v-model="packageRequest.detailsR" rows="2"
                          class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>
            </div>

            <!-- Package Information -->
            <div class="space-y-4 pt-4 border-t border-slate-100">
              <h3 class="font-semibold text-slate-800">{{ t('requestForm.packageInfo') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.weight') }} (kg)</label>
                  <input v-model.number="packageRequest.KgCo" type="number" step="0.1" min="0.1" required
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">{{ t('requestForm.nbBox') }}</label>
                  <input v-model.number="packageRequest.nb_box" type="number" min="1" value="1"
                         class="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex gap-4 pt-4">
              <button type="button" @click="closePackageRequest"
                      class="flex-1 px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                {{ t('requestForm.cancel') }}
              </button>
              <button type="submit" :disabled="submitting"
                      class="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <span v-if="submitting" class="animate-spin">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ submitting ? t('requestForm.submitting') : t('requestForm.submit') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent :currentLang="currentLang" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { apiService } from '../../api/axios.js'
import HeaderComponent from '../basics/headerComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'
import { User, ArrowRight, Calendar, X, Package } from 'lucide-vue-next'

export default {
  name: 'UpcomingTripsComponent',
  components: {
    User,
    ArrowRight,
    Calendar,
    X,
    Package,
    HeaderComponent,
    FooterComponent
  },
  setup() {
    const currentLang = ref('fr')
    const loading = ref(true)
    const error = ref(null)
    const trips = ref([])
    const showPackageRequestModal = ref(false)
    const submitting = ref(false)
    const selectedTrip = ref(null)
    const packageRequest = ref({
      nomS: '',
      TelS: '',
      adresseS: '',
      detailsS: '',
      nomR: '',
      TelR: '',
      adresseR: '',
      detailsR: '',
      KgCo: '',
      nb_box: 1
    })

    const translations = {
      en: {
        title: 'Upcoming Trips',
        subtitle: 'See all upcoming trips from our transporters',
        noTrips: 'No upcoming trips available',
        from: 'From',
        to: 'To',
        departureCities: 'Departure Cities',
        arrivalCities: 'Arrival Cities',
        more: 'more',
        requestPackage: 'Request Package Addition',
        scheduled: 'Scheduled',
        inProgress: 'In Progress',
        completed: 'Completed',
        requestForm: {
          title: 'Request Package Addition',
          senderInfo: 'Sender Information',
          senderName: 'Sender Name',
          senderPhone: 'Sender Phone',
          senderAddress: 'Sender Address',
          senderDetails: 'Sender Details (optional)',
          receiverInfo: 'Receiver Information',
          receiverName: 'Receiver Name',
          receiverPhone: 'Receiver Phone',
          receiverAddress: 'Receiver Address',
          receiverDetails: 'Receiver Details (optional)',
          packageInfo: 'Package Information',
          weight: 'Weight',
          nbBox: 'Number of Boxes',
          cancel: 'Cancel',
          submit: 'Submit Request',
          submitting: 'Submitting...'
        }
      },
      fr: {
        title: 'Voyages à Venir',
        subtitle: 'Voir tous les voyages à venir de nos transporteurs',
        noTrips: 'Aucun voyage à venir disponible',
        from: 'De',
        to: 'Vers',
        departureCities: 'Villes de Départ',
        arrivalCities: 'Villes d\'Arrivée',
        more: 'plus',
        requestPackage: 'Demande d\'ajout de colis',
        scheduled: 'Programmé',
        inProgress: 'En Cours',
        completed: 'Terminé',
        requestForm: {
          title: 'Demande d\'ajout de colis',
          senderInfo: 'Informations de l\'expéditeur',
          senderName: 'Nom de l\'expéditeur',
          senderPhone: 'Téléphone de l\'expéditeur',
          senderAddress: 'Adresse de l\'expéditeur',
          senderDetails: 'Détails de l\'expéditeur (optionnel)',
          receiverInfo: 'Informations du destinataire',
          receiverName: 'Nom du destinataire',
          receiverPhone: 'Téléphone du destinataire',
          receiverAddress: 'Adresse du destinataire',
          receiverDetails: 'Détails du destinataire (optionnel)',
          packageInfo: 'Informations du colis',
          weight: 'Poids',
          nbBox: 'Nombre de cartons',
          cancel: 'Annuler',
          submit: 'Envoyer la demande',
          submitting: 'Envoi en cours...'
        }
      }
    }

    const t = (key) => {
      const keys = key.split('.')
      let value = translations[currentLang.value]
      for (const k of keys) {
        value = value[k]
      }
      return value || key
    }

    const loadLanguagePreference = () => {
      const saved = localStorage.getItem('preferred-language')
      if (saved && ['en', 'fr'].includes(saved)) {
        currentLang.value = saved
      }
    }

    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
      localStorage.setItem('preferred-language', newLang)
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString(currentLang.value === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getStatusClass = (status) => {
      const classes = {
        'SCHEDULED': 'bg-blue-100 text-blue-700',
        'IN_PROGRESS': 'bg-green-100 text-green-700',
        'COMPLETED': 'bg-slate-100 text-slate-600',
        'CANCELLED': 'bg-red-100 text-red-600'
      }
      return classes[status] || 'bg-slate-100 text-slate-600'
    }

    const getStatusText = (status) => {
      const statusMap = {
        'SCHEDULED': t('scheduled'),
        'IN_PROGRESS': t('inProgress'),
        'COMPLETED': t('completed'),
        'CANCELLED': 'Cancelled'
      }
      return statusMap[status] || status
    }

    const getInitials = (name) => {
      if (!name) return '?'
      const parts = name.split(' ')
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase()
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    }

    const trackTrip = (code) => {
      window.location.href = `/view?code=${code}`
    }

    const openPackageRequest = (trip) => {
      selectedTrip.value = trip
      showPackageRequestModal.value = true
    }

    const closePackageRequest = () => {
      showPackageRequestModal.value = false
      selectedTrip.value = null
      packageRequest.value = {
        nomS: '',
        TelS: '',
        adresseS: '',
        detailsS: '',
        nomR: '',
        TelR: '',
        adresseR: '',
        detailsR: '',
        KgCo: '',
        nb_box: 1
      }
    }

    const submitPackageRequest = async () => {
      try {
        submitting.value = true
        
        // Calculate total price: weight (kg) * price from account
        const pricePerKg = selectedTrip.value.pricePerKg || 0
        const prixTotale = packageRequest.value.KgCo * pricePerKg
        
        const requestData = {
          ...packageRequest.value,
          voyage_id: selectedTrip.value.idV,
          status: 'demande',
          prixTotale: prixTotale
        }

        const response = await apiService.colis.create(requestData)
        
        if (response.data.success) {
          alert(t('requestForm.success') || 'Request submitted successfully!')
          closePackageRequest()
        } else {
          alert(response.data.error || 'Failed to submit request')
        }
      } catch (err) {
        console.error('Error submitting package request:', err)
        alert('Failed to submit request. Please try again.')
      } finally {
        submitting.value = false
      }
    }

    const loadTrips = async () => {
      try {
        loading.value = true
        const response = await apiService.public.getUpcomingTrips()
        if (response.data.success) {
          trips.value = response.data.data
        }
      } catch (err) {
        error.value = 'Failed to load trips. Please try again later.'
        console.error('Error loading trips:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadLanguagePreference()
      loadTrips()
    })

    return {
      currentLang,
      loading,
      error,
      trips,
      showPackageRequestModal,
      submitting,
      selectedTrip,
      packageRequest,
      t,
      handleLanguageChange,
      formatDate,
      getStatusClass,
      getStatusText,
      getInitials,
      trackTrip,
      openPackageRequest,
      closePackageRequest,
      submitPackageRequest
    }
  }
}
</script>

<style scoped>
/* Responsive design improvements */
@media (max-width: 768px) {
  .max-w-7xl {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
