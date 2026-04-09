<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 font-sans text-slate-900 antialiased pb-20">
    
    <!-- Header -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100/50 px-6 py-4 shadow-sm">
      <ProfileHeaderComponent
        :show-back-button="false" 
        @language-changed="handleLanguageChange"
      />
    </nav>

    <!-- Toast Notifications -->
    <div v-if="toast.show" :class="['fixed top-20 right-6 z-50 max-w-sm animate-in slide-in-from-right duration-300', toast.type === 'success' ? 'toast-success' : 'toast-error']">
      <div class="bg-white rounded-2xl shadow-2xl border-l-4 p-4 flex items-center gap-3">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', toast.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600']">
          <Check v-if="toast.type === 'success'" :size="20" />
          <XCircle v-else :size="20" />
        </div>
        <div class="flex-1">
          <p :class="['text-sm font-medium', toast.type === 'success' ? 'text-slate-900' : 'text-rose-900']">{{ toast.message }}</p>
        </div>
        <button @click="hideToast" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X :size="18" />
        </button>
      </div>
      <!-- Progress bar -->
      <div class="h-1 bg-slate-100 rounded-b-2xl overflow-hidden">
        <div :class="['h-full transition-all duration-3000', toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500']" :style="{ width: '100%' }"></div>
      </div>
    </div>

    <div class="mx-auto max-w-4xl px-6 mt-10">
      
      <!-- Step Indicator -->
      <AddTripStepIndicator :current-step="step" :total-steps="2" :current-lang="currentLang" :t="t" />

      <!-- Step 1: Route Selection -->
      <div v-if="step === 1" class="animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-indigo-50 px-6 py-3 rounded-full border border-indigo-200 mb-6">
            <Globe :size="20" class="text-indigo-600" />
            <span class="text-sm font-bold text-indigo-700">{{ currentLang === 'en' ? 'Step 1/2' : 'Étape 1/2' }}</span>
          </div>
          <h1 class="text-5xl font-black tracking-tighter text-slate-900 mb-4">
            {{ t('step1Title').split(' ')[0] + ' ' + t('step1Title').split(' ')[1] }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">{{ t('step1Title').split(' ')[2] }}</span>
          </h1>
          <p class="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            {{ t('step1Subtitle') }}
          </p>
        </div>

        <AddTripRouteSelection 
          :trip-data="tripData" 
          :current-lang="currentLang"
          :t="t"
          @add-city="addCity" 
          @remove-city="removeCity" 
        />
      </div>

      <!-- Step 2: Logistics -->
      <div v-if="step === 2" class="animate-in fade-in slide-in-from-bottom-6 duration-500">
        <AddTripLogistics 
          :trip-data="tripData" 
          :current-lang="currentLang"
          :t="t" 
        />
      </div>

      <!-- Action Buttons -->
      <AddTripActions 
        :current-step="step" 
        :loading="loading"
        :current-lang="currentLang"
        :t="t"
        @previous-step="previousStep"
        @submit="handleSubmit" 
      />
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { apiService } from '../../api/axios.js'
import { Globe, Check, X, XCircle } from 'lucide-vue-next'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import AddTripStepIndicator from './components/AddTripStepIndicator.vue'
import AddTripRouteSelection from './components/AddTripRouteSelection.vue'
import AddTripLogistics from './components/AddTripLogistics.vue'
import AddTripActions from './components/AddTripActions.vue'
import FooterComponent from '../basics/FooterComponent.vue'


export default {
  name: 'AddTripComponent',
  components: { 
    Globe, Check, X, XCircle,
    ProfileHeaderComponent, 
    AddTripStepIndicator, 
    AddTripRouteSelection, 
    AddTripLogistics, 
    AddTripActions ,
    FooterComponent
  },
  setup() {
    const step = ref(1)
    const loading = ref(false)
    const currentLang = ref('fr')
    const toast = ref({ show: false, message: '', type: 'success' })
    const tripData = ref({
      originCountry: '',
      originCities: [''],
      destCountry: '',
      destCities: [''],
      DateD: '',
      DateF: ''
    })

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

    onMounted(() => {
      loadLanguagePreference()
    })

    const translations = {
      en: {
        step1Title: 'Configure your TRIP',
        step1Subtitle: 'Specify departure and destination countries along with cities you will serve',
        step2Title: 'Logistics',
        step2Subtitle: 'Set departure and arrival dates for your journey',
        originLabel: 'Origin Country',
        originPlaceholder: 'e.g., Tunisia',
        originCitiesLabel: 'Served Cities',
        originCityPlaceholder: 'City (e.g., Tunis, Sousse...)',
        addCity: 'Add City',
        destLabel: 'Destination Country',
        destPlaceholder: 'e.g., France',
        destCitiesLabel: 'Served Cities',
        destCityPlaceholder: 'City (e.g., Marseille, Paris...)',
        departureLabel: 'Departure Date',
        arrivalLabel: 'Arrival Date',
        next: 'Next',
        back: 'Back',
        publishTrip: 'Publish Trip',
        missingCountries: 'Please specify departure and destination countries',
        missingDates: 'Please specify departure and arrival dates',
        tripPublished: 'Trip successfully published! Code:',
        publishError: 'Publication error:',
        publishGenericError: 'Failed to publish trip',
        tripDuration: 'Trip Duration',
        period: 'Period',
        days: 'days',
        departure: 'Departure',
        destination: 'Destination',
        step: 'Step',
        of: 'of'
      },
      fr: {
        step1Title: 'Configurez votre VOYAGE',
        step1Subtitle: 'Spécifiez les pays de départ et de destination ainsi que les villes que vous desservirez',
        step2Title: 'Logistique',
        step2Subtitle: 'Définissez les dates de départ et d\'arrivée pour votre voyage',
        originLabel: 'Pays d\'origine',
        originPlaceholder: 'ex: Tunisie',
        originCitiesLabel: 'Villes desservies',
        originCityPlaceholder: 'Ville (ex: Tunis, Sousse...)',
        addCity: 'Ajouter une ville',
        destLabel: 'Pays de destination',
        destPlaceholder: 'ex: France',
        destCitiesLabel: 'Villes desservies',
        destCityPlaceholder: 'Ville (ex: Marseille, Paris...)',
        departureLabel: 'Date de départ',
        arrivalLabel: 'Date d\'arrivée',
        next: 'Suivant',
        back: 'Retour',
        publishTrip: 'Publier le Voyage',
        missingCountries: 'Veuillez spécifier les pays de départ et de destination',
        missingDates: 'Veuillez spécifier les dates de départ et d\'arrivée',
        tripPublished: 'Voyage publié avec succès ! Code:',
        publishError: 'Erreur de publication:',
        publishGenericError: 'Échec de la publication du voyage',
        tripDuration: 'Durée du voyage',
        period: 'Période',
        days: 'jours',
        departure: 'Départ',
        destination: 'Destination',
        step: 'Étape',
        of: 'sur'
      }
    }

    const t = (key) => translations[currentLang.value][key] || key

    const addCity = (type) => {
      if (type === 'origin') tripData.value.originCities.push('')
      else tripData.value.destCities.push('')
    }

    const removeCity = (type, index) => {
      const list = type === 'origin' ? tripData.value.originCities : tripData.value.destCities
      if (list.length > 1) list.splice(index, 1)
    }

    const previousStep = () => {
      step.value--
    }

    const showToast = (message, type = 'success') => {
      toast.value = { show: true, message, type }
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        hideToast()
      }, 3000)
    }

    const hideToast = () => {
      toast.value.show = false
    }

    const handleSubmit = () => {
      if (step.value === 1) {
        if (!tripData.value.originCountry || !tripData.value.destCountry) {
          showToast(t('missingCountries'), 'error')
          return
        }
        // Move to step 2
        step.value = 2
        return
      } else {
        submitTrip()
      }
    }

    const submitTrip = async () => {
      // Validation for step 2
      if (!tripData.value.DateD || !tripData.value.DateF) {
        showToast(t('missingDates'), 'error')
        return
      }
      
      loading.value = true
      
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        
        // Generate random trip code
        const randomNumbers = Math.floor(1000 + Math.random() * 9000)
        const tripCode = `TN-${randomNumbers}`
        
        const tripPayload = {
          account_id: user.id,
          PaysD: tripData.value.originCountry,
          villePD: JSON.stringify(tripData.value.originCities.filter(city => city.trim() !== '')),
          PaysF: tripData.value.destCountry,
          villePF: JSON.stringify(tripData.value.destCities.filter(city => city.trim() !== '')),
          DateD: tripData.value.DateD,
          DateF: tripData.value.DateF,
          status: 'a arriver',
          codeT: tripCode
        }
        
        const response = await apiService.voyages.create(tripPayload)
        
        if (response.data.success) {
          showToast(t('tripPublished') + ' ' + tripCode, 'success')
          setTimeout(() => {
            window.location.href = '/profile'
          }, 2000)
        } else {
          showToast(t('publishError') + ' ' + response.data.error, 'error')
        }
      } catch (error) {
        console.error('Submit Error:', error)
        showToast(t('publishGenericError'), 'error')
      } finally {
        loading.value = false
      }
    }

    return { 
      step, 
      loading,
      currentLang,
      toast,
      tripData, 
      addCity, 
      removeCity, 
      previousStep,
      showToast,
      hideToast,
      handleSubmit,
      submitTrip,
      handleLanguageChange,
      t,
      ProfileHeaderComponent ,
      FooterComponent
    }
  }
}
</script>