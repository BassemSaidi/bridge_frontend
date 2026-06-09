<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-sans text-slate-900 antialiased pb-12">
    
    <ProfileHeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />
    
    <div class="mx-auto max-w-7xl px-6 py-8">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="pendingRequests.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
          <Bell class="h-12 w-12 text-indigo-400" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ t('noRequests') }}</h2>
        <p class="text-slate-600">{{ t('noRequestsDesc') }}</p>
      </div>

      <!-- Pending Requests List -->
      <div v-else>
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">{{ t('title') }}</h1>
            <p class="text-slate-600 text-lg">{{ t('subtitle') }}</p>
          </div>
          <div class="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-200/50">
            {{ pendingRequests.length }} {{ t('requests') }}
          </div>
        </div>

        <!-- Requests Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="request in pendingRequests" :key="request.idCo" class="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <!-- Header -->
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <MapPin class="h-5 w-5 text-white" />
                  <span class="font-bold text-white text-lg">{{ request.PaysD }} → {{ request.PaysF }}</span>
                </div>
                <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  {{ t('pending') }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6">
              <!-- Trip Details -->
              <div class="flex items-center gap-4 text-sm">
                <span class="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                  <Calendar class="h-4 w-4 text-indigo-600" />
                  {{ formatDate(request.DateD) }}
                </span>
                <span class="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                  <Hash class="h-4 w-4 text-indigo-600" />
                  {{ request.codeT }}
                </span>
              </div>

              <!-- Sender & Receiver -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                  <h3 class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{{ t('senderInfo') }}</h3>
                  <p class="text-slate-900 font-semibold">{{ request.nomS }}</p>
                  <p class="text-sm text-slate-600">{{ request.TelS }}</p>
                  <p class="text-sm text-slate-600 mt-1">{{ request.adresseS }}</p>
                </div>
                <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100">
                  <h3 class="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{{ t('receiverInfo') }}</h3>
                  <p class="text-slate-900 font-semibold">{{ request.nomR }}</p>
                  <p class="text-sm text-slate-600">{{ request.TelR }}</p>
                  <p class="text-sm text-slate-600 mt-1">{{ request.adresseR }}</p>
                </div>
              </div>

              <!-- Package Details -->
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl font-medium">
                  <Package class="h-5 w-5 text-indigo-600" />
                  {{ t('weight') }}: {{ request.KgCo }} kg
                </span>
                <span class="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl font-medium">
                  <Box class="h-5 w-5 text-indigo-600" />
                  {{ t('nbBox') }}: {{ request.nb_box }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-2">
                <button 
                  @click="acceptRequest(request)"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-200/50 transition-all font-bold"
                >
                  {{ t('accept') }}
                </button>
                <button 
                  @click="refuseRequest(request)"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-200/50 transition-all font-bold"
                >
                  {{ t('refuse') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'
import { Bell, MapPin, Calendar, Hash, Package, Box } from 'lucide-vue-next'

export default {
  name: 'PendingRequestsComponent',
  components: {
    Bell,
    MapPin,
    Calendar,
    Hash,
    Package,
    Box,
    ProfileHeaderComponent,
    FooterComponent
  },
  setup() {
    const router = useRouter()
    const loading = ref(true)
    const error = ref(null)
    const pendingRequests = ref([])
    const currentLang = ref('fr')

    const translations = {
      en: {
        title: 'Pending Package Requests',
        subtitle: 'Review and manage package requests from customers',
        noRequests: 'No Pending Requests',
        noRequestsDesc: 'You have no pending package requests at the moment',
        requests: 'requests',
        pending: 'Pending',
        senderInfo: 'Sender Information',
        receiverInfo: 'Receiver Information',
        weight: 'Weight',
        nbBox: 'Number of Boxes',
        accept: 'Accept',
        refuse: 'Refuse',
        viewInClients: 'View in Clients'
      },
      fr: {
        title: 'Demandes de colis en attente',
        subtitle: 'Examinez et gérez les demandes de colis des clients',
        noRequests: 'Aucune demande en attente',
        noRequestsDesc: 'Vous n\'avez aucune demande de colis en attente pour le moment',
        requests: 'demandes',
        pending: 'En attente',
        senderInfo: 'Informations de l\'expéditeur',
        receiverInfo: 'Informations du destinataire',
        weight: 'Poids',
        nbBox: 'Nombre de cartons',
        accept: 'Accepter',
        refuse: 'Refuser',
        viewInClients: 'Voir dans Clients'
      }
    }

    const t = (key) => translations[currentLang.value][key] || key

    const loadLanguagePreference = () => {
      const saved = localStorage.getItem('preferred-language')
      if (saved) {
        currentLang.value = saved
      }
    }

    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
    }

    const loadPendingRequests = async () => {
      try {
        loading.value = true
        const response = await apiService.colis.getPendingRequests()
        if (response.data.success) {
          pendingRequests.value = response.data.data
        }
      } catch (err) {
        error.value = 'Failed to load pending requests. Please try again later.'
        console.error('Error loading pending requests:', err)
      } finally {
        loading.value = false
      }
    }

    const acceptRequest = async (request) => {
      try {
        const response = await apiService.colis.acceptRequest(request.idCo)
        if (response.data.success) {
          pendingRequests.value = pendingRequests.value.filter(r => r.idCo !== request.idCo)
          alert(t('accept') + ' - Success')
        } else {
          alert(response.data.error || 'Failed to accept request')
        }
      } catch (error) {
        console.error('Accept request error:', error)
        alert('Failed to accept request')
      }
    }

    const refuseRequest = async (request) => {
      try {
        const response = await apiService.colis.refuseRequest(request.idCo)
        if (response.data.success) {
          pendingRequests.value = pendingRequests.value.filter(r => r.idCo !== request.idCo)
          alert(t('refuse') + ' - Success')
        } else {
          alert(response.data.error || 'Failed to refuse request')
        }
      } catch (error) {
        console.error('Refuse request error:', error)
        alert('Failed to refuse request')
      }
    }


    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString(currentLang.value === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    onMounted(() => {
      loadLanguagePreference()
      loadPendingRequests()
    })

    return {
      loading,
      error,
      pendingRequests,
      currentLang,
      t,
      handleLanguageChange,
      acceptRequest,
      refuseRequest,
      formatDate
    }
  }
}
</script>
