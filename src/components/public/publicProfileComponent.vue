<template>
  <div class="min-h-screen bg-[#FAFAFB] font-sans antialiased text-slate-900 pb-20">
    
    <PublicProfileHeader 
      :current-lang="currentLang" 
      :t="t" 
      @change-lang="handleLanguageChange" 
    />
    <main class="max-w-7xl mx-auto px-6 mt-8">
      
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh]">
        <PublicProfileLoading :current-lang="currentLang" :t="t || ((k) => k)" />
      </div>

      <div v-else-if="profile" class="space-y-8">
        
<section class="bg-slate-950 rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/10">
  <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
  
  <div class="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-12">
    <div class="relative shrink-0 group">
      <div class="absolute inset-0 bg-indigo-500 rounded-[2.8rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
      <img :src="profile.img || `https://ui-avatars.com/api/?name=${profile.nom}&background=4f46e5&color=fff&size=256`" 
           class="w-48 h-48 rounded-[2.8rem] object-cover border-[6px] border-slate-900 shadow-2xl relative z-10" />
      <div class="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3.5 rounded-2xl shadow-2xl border-4 border-slate-950 z-20">
        <ShieldCheck :size="22" />
      </div>
    </div>

    <div class="flex-1 text-center lg:text-left">
      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-white/5 mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">{{ t('verifiedTransporter') }}</span>
        </div>
        <h1 class="text-6xl md:text-6xl font-black tracking-tighter mb-2 uppercase leading-none">{{ profile.nom }}</h1>
      </div>

      <div class="max-w-2xl mb-12">
        <p class="text-xl md:text-xl text-slate-400 leading-snug font-medium italic opacity-90">
          "{{ profile.Bio || t('defaultBio') }}"
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-5 gap-4 items-stretch">
        
        <div class="xl:col-span-2 grid grid-cols-2 gap-4">
          <div class="bg-white/5 border border-white/10 p-6 rounded-[2.2rem] backdrop-blur-md flex flex-col justify-center">
            <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2">{{ t('ratePerKg') }}</p>
            <p class="text-3xl font-black text-white leading-none">{{ profile.pricePerKg }}<span class="text-sm ml-1 text-indigo-400">€</span></p>
          </div>
          
          <div class="bg-white/5 border border-white/10 p-6 rounded-[2.2rem] backdrop-blur-md flex flex-col justify-center">
            <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2">{{ t('fleetType') }}</p>
            <p class="text-lg font-black text-white truncate leading-none uppercase tracking-tighter">{{ profile.voiture || 'Premium' }}</p>
          </div>
        </div>

        <div class="xl:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-xl">
          
          <button @click="callPrimary(profile.Tel1)" 
                  class="flex-1 flex items-center gap-4 p-4 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 transition-all group overflow-hidden">
            <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Phone :size="20" class="text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div class="text-left min-w-0">
              <p class="text-[8px] font-black text-indigo-200 uppercase tracking-widest mb-0.5">Voice Line</p>
              <p class="text-lg font-black text-white truncate">{{ profile.Tel1 }}</p>
            </div>
          </button>

          <button @click="openWhatsApp(profile.Tel2W || profile.Tel1)" 
                  class="flex-1 flex items-center gap-4 p-4 rounded-[2rem] bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <MessageCircle :size="20" class="text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div class="text-left min-w-0">
              <p class="text-[8px] font-black text-white/30 uppercase tracking-widest mb-0.5">WhatsApp</p>
              <p class="text-lg font-black text-white truncate">{{ profile.Tel2W || profile.Tel1 }}</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  </div>
</section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <div class="flex items-center justify-between mb-12">
                <div>
                  <h2 class="text-3xl font-black text-slate-950 tracking-tight">{{ t('journeyGuidelines') }}</h2>
                  <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Operational Standards</p>
                </div>
                <div class="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <CheckCircle :size="28" />
                </div>
              </div>
              
              <div class="prose prose-slate prose-p:text-lg prose-p:leading-relaxed">
                <PublicProfileServices :profile="profile" :current-lang="currentLang" :t="t" />
              </div>
            </div>
          </div>

          <aside class="space-y-6">
            <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 lg:sticky lg:top-24">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Route :size="20" class="text-indigo-600" />
                  {{ t('activeRoutes') }}
                </h3>
                <span class="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md">{{ activeTrips.length }}</span>
              </div>
              
              <PublicProfileTrips :active-trips="activeTrips" :current-lang="currentLang" :t="t" />

            </div>
          </aside>

        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiService } from '../../api/axios.js'
import { 
  Globe, ShieldCheck, Phone, MessageCircle, 
  Copy, Route, CheckCircle 
} from 'lucide-vue-next'

import PublicProfileTrips from './components/PublicProfileTrips.vue'
import PublicProfileServices from './components/PublicProfileServices.vue'
import PublicProfileLoading from './components/PublicProfileLoading.vue'
import PublicProfileHeader from './components/PublicProfileHeader.vue'

export default {
  name: 'PublicProfileComponent',
  components: { 
    Globe, ShieldCheck, Phone, MessageCircle, Copy, Route, CheckCircle,
    PublicProfileTrips, PublicProfileServices, PublicProfileLoading,
    PublicProfileHeader
  },
  
  setup() {
    const route = useRoute()
    const profile = ref(null)
    const activeTrips = ref([])
    const loading = ref(true)
    const currentLang = ref('fr') // Default to French

    // 1. COMPREHENSIVE TRANSLATIONS
    const translations = {
      en: {
        verifiedTransporter: 'Agréé & Vérifié',
        ratePerKg: 'Price per KG',
        fleetType: 'Vehicle',
        activeRoutes: 'Trips',
        journeyGuidelines: 'Service Protocol',
        availableNow: 'Currently Operational',
        professionalExperience: 'Expertise & Mission',
        copyDossier: 'Save Profile Info',
        callNow: 'Initiate Contact',
        defaultBio: 'Dedicated to secure, efficient, and professional logistics solutions.',
        transportGuidelines: 'Transport Guidelines',
        interdits: 'Interdits',
        transportRestrictions: 'Transport Restrictions',
        professionalProcess: 'Professional Process',
        safetyCompliance: 'Safety Compliance',
        qualityCommitment: 'Quality Commitment',
        complianceNotice: 'Compliance Notice',
        professionalServices: 'Professional Services',
        serviceDescription: 'Service Description',
        professionalCommitment: 'Professional Commitment',
        serviceQualityPromise: 'Service Quality Promise'
      },
      fr: {
        verifiedTransporter: 'Agréé & Vérifié',
        ratePerKg: 'Prix par KG',
        fleetType: 'Véhicule',
        activeRoutes: 'Voyages',
        journeyGuidelines: 'Protocole de Service',
        availableNow: 'Actuellement Disponible',
        professionalExperience: 'Expertise & Mission',
        copyDossier: 'Enregistrer le Profil',
        callNow: 'Contacter Maintenant',
        defaultBio: 'Dédié aux solutions logistiques sécurisées, efficaces et professionnelles.',
        transportGuidelines: 'Guidelines de Transport',
        interdits: 'Interdits',
        transportRestrictions: 'Restrictions de Transport',
        professionalProcess: 'Processus Professionnel',
        safetyCompliance: 'Conformité Sécurité',
        qualityCommitment: 'Engagement Qualité',
        complianceNotice: 'Conformité Notice',
        professionalServices: 'Services Professionnels',
        serviceDescription: 'Description des services',
        professionalCommitment: 'Engagement Professionnel',
        serviceQualityPromise: 'Promesse de Qualité des Services'
      }
    }

    // 2. THE TRANSLATION ENGINE (t function)
    const t = (key) => {
      if (!translations[currentLang.value]) return key
      return translations[currentLang.value][key] || key
    }

    // 3. LANGUAGE SWITCHER LOGIC
    const handleLanguageChange = (lang) => {
      currentLang.value = lang
      localStorage.setItem('preferred-language', lang)
    }

    // 4. DATA FETCHING
    const loadPublicProfile = async () => {
      loading.value = true
      try {
        const profileId = route.params.id
        // Replace with your actual production URL when deploying
        const response = await apiService.accounts.getById(profileId)
        
        if (response.data.success) {
          profile.value = response.data.data
          const tripsRes = await apiService.voyages.getByAccountId(profileId)
          if (tripsRes.data.success) activeTrips.value = tripsRes.data.data
        }
      } catch (e) {
        console.error("Critical Fetch Error:", e)
      } finally {
        loading.value = false
      }
    }

    // 5. INTERACTION HANDLERS
    const copyContactInfo = () => {
      if (!profile.value) return
      const text = `${profile.value.nom} | ${profile.value.Tel1} | ${profile.value.pricePerKg}€/kg`
      navigator.clipboard.writeText(text)
      // Optional: Add a toast notification here
    }

    const callPrimary = (num) => {
      if (!num) return
      window.location.href = `tel:${num.replace(/\s+/g, '')}`
    }

    const openWhatsApp = (num) => {
      if (!num) return
      // Removes spaces for the URL
      const cleanNum = num.replace(/\s+/g, '').replace('+', '')
      window.open(`https://wa.me/${cleanNum}`, '_blank')
    }

    // 6. INITIALIZATION
    onMounted(() => {
      const saved = localStorage.getItem('preferred-language')
      if (saved && translations[saved]) {
        currentLang.value = saved
      }
      loadPublicProfile()
    })

    return { 
      profile, 
      activeTrips, 
      loading, 
      currentLang, 
      t, 
      handleLanguageChange, 
      copyContactInfo,
      callPrimary,
      openWhatsApp
    }
  }
}
</script>