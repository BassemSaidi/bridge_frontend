<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans">
    <!-- Universal Header -->
    <HeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />

    <!-- Hero Section -->
    <LandingHeroComponent 
      :t="t" 
      :isLoggedIn="isLoggedIn" 
      :currentLang="currentLang" 
    />
    
    <!-- Upcoming Trips Section - Prominent Position -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Package :size="32" class="text-white" />
          </div>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('upcomingTrips.title') }}</h2>
        <p class="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">{{ t('upcomingTrips.description') }}</p>
        <button 
          @click="goToUpcomingTrips"
          class="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
        >
          {{ t('upcomingTrips.button') }}
          <ArrowRight :size="20" />
        </button>
      </div>
    </div>
    
    <!-- Tracking Section -->
    <LandingTrackComponent 
      :currentLang="currentLang" 
    />
    
    <!-- About Section -->
    <LandingAboutComponent 
      :t="t" 
      :currentLang="currentLang" 
    />


    <!-- Footer -->
    <FooterComponent 
      :currentLang="currentLang" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Package, Truck, Globe, CheckCircle, Search, ArrowRight, User } from 'lucide-vue-next'
import HeaderComponent from '../basics/headerComponent.vue'
import LandingHeroComponent from './components/LandingHeroComponent.vue'
import LandingAboutComponent from './components/LandingAboutComponent.vue'
import LandingTrackComponent from './components/LandingTrackComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'

export default {
  name: 'LandingComponent',
  components: {
    Package,
    Truck,
    Globe,
    CheckCircle,
    Search,
    ArrowRight,
    User,
    HeaderComponent,
    LandingHeroComponent,
    LandingAboutComponent,
    LandingTrackComponent,
    FooterComponent
  },
  setup() {
    const router = useRouter()
    const currentLang = ref('fr')
    const trackCode = ref('')
    const isLoggedIn = ref(false)
    
    const translations = {
      en: {
        nav: {
          how: 'How it Works',
          transporters: 'For Transporters',
          track: 'Track Now',
          login: 'Transporter Login'
        },
        hero: {
          title: 'Simplify Logistics between',
          tunisia: 'Tunisia',
          world: '& the World.',
          description1: 'Professional tools for modern transporters. Simple tracking for clients.',
          description2: 'BridgeTN streamlines international bagages transport.',
          cta: 'Create Your First Trip'
        },
        tracking: {
          title: 'Effortless Package Status Tracking',
          description: 'Keep your senders updated without sharing GPS location. Give them a unique code and manually update your trip status as you travel.',
          placeholder: 'Enter Tracking Code (e.g. TN-78921)',
          steps: [
            'Received at Warehouse',
            'In Transit',
            'At Tunisian Customs',
            'Delivered'
          ]
        },
        footer: {
          question: 'Ready to professionalize your transport service?',
          cta: 'Register as Transporter',
          rights: 'All rights reserved.'
        },
        upcomingTrips: {
          title: 'View Upcoming Trips',
          description: 'See all upcoming trips from our transporters and track your packages',
          button: 'View All Trips'
        }
      },
      fr: {
        nav: {
          how: 'Comment ça Marche',
          transporters: 'Pour les Transporteurs',
          track: 'Suivre Maintenant',
          login: 'Connexion Transporteur'
        },
        hero: {
          title: 'Simplifiez la Logistique entre',
          tunisia: 'la Tunisie',
          world: '& le Monde.',
          description1: 'Outils professionnels pour les transporteurs modernes. Suivi simple pour les clients.',
          description2: 'BridgeTN rationalise le transport international de bagages.',
          cta: 'Créer Votre Premier Voyage'
        },
        tracking: {
          title: 'Suivi du Statut des Colis Sans Effort',
          description: 'Tenez vos expéditeurs informés sans partager votre localisation GPS. Donnez-leur un code unique et mettez à jour manuellement le statut de votre voyage.',
          placeholder: 'Entrez le Code de Suivi (ex: TN-78921)',
          steps: [
            'Reçu à l\'Entrepôt',
            'En Transit',
            'À la Douane Tunisienne',
            'Livré'
          ]
        },
        footer: {
          question: 'Prêt à professionnaliser votre service de transport ?',
          cta: 'S\'inscrire comme Transporteur',
          rights: 'Tous droits réservés.'
        },
        upcomingTrips: {
          title: 'Voir les Voyages à Venir',
          description: 'Voir tous les voyages à venir de nos transporteurs et suivre vos colis',
          button: 'Voir Tous les Voyages'
        }
      }
    }
    
    const t = computed(() => (key) => {
      const keys = key.split('.')
      let value = translations[currentLang.value]
      for (const k of keys) {
        value = value[k]
      }
      return value
    })
    
    const toggleLanguage = () => {
      currentLang.value = currentLang.value === 'en' ? 'fr' : 'en'
    }
    
    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
    }
    
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      isLoggedIn.value = !!token
    }
    
    onMounted(() => {
      checkLoginStatus()
    })
    
    const trackTrip = () => {
      if (trackCode.value.trim()) {
        // Navigate to tracking page with the code
        window.location.href = `/view?code=${trackCode.value.trim()}`
      }
    }

    const goToUpcomingTrips = () => {
      router.push('/upcoming-trips')
    }

    const trackingSteps = ref([
      { label: 'Received at Warehouse', done: true },
      { label: 'In Transit', done: true },
      { label: 'At Tunisian Customs', done: false },
      { label: 'Delivered', done: false }
    ])

    return {
      currentLang,
      trackCode,
      trackingSteps,
      t,
      toggleLanguage,
      handleLanguageChange,
      trackTrip,
      goToUpcomingTrips,
      isLoggedIn,
      checkLoginStatus
    }
  }
}
</script>