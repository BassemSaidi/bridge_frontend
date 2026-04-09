<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 antialiased pb-20">
    
    <!--header part-->
    <ProfileHeaderComponent @language-changed="handleLanguageChange"/>

    <div class="mx-auto mt-8 max-w-7xl px-6">
      <div class="space-y-8">
        
        <!-- Profile Hero Section -->
        <ProfileHeroComponent 
          :profile="profile" 
          :is-editing="isEditing" 
          :t="t" 
        />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4 space-y-6">
            <!-- Contact Component -->
            <ProfileContactComponent 
              :profile="profile" 
              :is-editing="isEditing" 
              :t="t" 
              @toggle-edit-save="toggleEditSave"
            />

            <!-- Prohibited Items Component -->
            <ProfileProhibitedComponent 
              :profile="profile" 
              :is-editing="isEditing" 
              :t="t" 
              @remove-item="removeItem"
              @add-item="addItem"
            />
          </div>

          <div class="lg:col-span-8 space-y-6">
            <!-- About Component -->
            <ProfileAboutComponent 
              :profile="profile" 
              :is-editing="isEditing" 
              :t="t" 
              @remove-item="removeItem"
              @add-item="addItem"
            />

            <!-- Services Component -->
            <ProfileServicesComponent 
              :profile="profile" 
              :is-editing="isEditing" 
              :t="t" 
              @remove-item="removeItem"
              @add-item="addItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { Package, Globe, Plus, AlertTriangle, XCircle, Info, LogOut, Users, MapPin, Truck, Edit3, Save, Share, Link } from 'lucide-vue-next'
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import ProfileHeroComponent from './components/ProfileHeroComponent.vue'
import ProfileContactComponent from './components/ProfileContactComponent.vue'
import ProfileProhibitedComponent from './components/ProfileProhibitedComponent.vue'
import ProfileAboutComponent from './components/ProfileAboutComponent.vue'
import ProfileServicesComponent from './components/ProfileServicesComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'

export default {
  components: { 
    Package, Globe, Plus, AlertTriangle, XCircle, Info, LogOut, Users, MapPin, Truck, Edit3, Save, Share, Link, 
    ProfileHeaderComponent, FooterComponent, ProfileHeroComponent, ProfileContactComponent, ProfileProhibitedComponent, ProfileAboutComponent, ProfileServicesComponent, FooterComponent 
  },
  setup() {
    const lang = ref('en')
    const isEditing = ref(false)
    const profile = ref({ nom: '', Tel1: '', Tel2W: '', Bio: '', voiture: '', paysTrajet: [], guide: [], interdits: [], pricePerKg: 0 })

    const translations = {
      en: { 
        edit: 'Edit Profile', 
        save: 'Save Changes', 
        logout: 'Logout', 
        shareProfile: 'Share Profile',
        sharePage: 'Share Page',
        myTrips: 'My Trips',
        newTrip: 'New Trip',
        routes: 'Active Routes', 
        contactTitle: 'Quick Contact', 
        success: 'Success', 
        perKg: 'Per KG', 
        aboutTitle: 'About My Service', 
        prohibited: 'Prohibited Items', 
        packingTitle: 'Preparation Guide', 
        packingSub: 'How to pack your items safely' 
      },
      fr: { 
        edit: 'Modifier Profil', 
        save: 'Enregistrer', 
        logout: 'Déconnexion',
        shareProfile: 'Partager Profil',
        sharePage: 'Page de Partage',
        myTrips: 'Mes Voyages',
        newTrip: 'Nouveau Voyage',
        routes: 'Itinéraires Actifs', 
        contactTitle: 'Contact Rapide', 
        success: 'Succès', 
        perKg: 'Par KG', 
        aboutTitle: 'À propos de mon service', 
        prohibited: 'Objets Interdits', 
        packingTitle: 'Guide de Préparation', 
        packingSub: 'Comment préparer vos colis' 
      }
    }

    const t = (key) => translations[lang.value][key] || key

    const cleanArray = (arr) => {
      if (!Array.isArray(arr)) return []
      return arr.filter(i => i && typeof i === 'string' && i.trim() !== '').map(i => i.trim())
    }

    const loadProfile = async () => {
      // Load language preference first
      const savedLang = localStorage.getItem('preferred-language')
      if (savedLang && ['en', 'fr'].includes(savedLang)) {
        lang.value = savedLang
      }
      
      const response = await apiService.accounts.getMe()
      if (response.data.success) {
        profile.value = { ...response.data.data, 
          paysTrajet: Array.isArray(response.data.data.paysTrajet) ? response.data.data.paysTrajet : JSON.parse(response.data.data.paysTrajet || '[]'),
          guide: Array.isArray(response.data.data.guide) ? response.data.data.guide : JSON.parse(response.data.data.guide || '[]'),
          interdits: Array.isArray(response.data.data.interdits) ? response.data.data.interdits : JSON.parse(response.data.data.interdits || '[]')
        }
      }
    }

    const saveProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'))
      const updateData = {
        ...profile.value,
        paysTrajet: cleanArray(profile.value.paysTrajet),
        guide: cleanArray(profile.value.guide),
        interdits: cleanArray(profile.value.interdits)
      }
      const response = await apiService.accounts.update(user.id, updateData)
      if (response.data.success) { isEditing.value = false; await loadProfile() }
    }

    const removeItem = (target, index) => { 
      profile.value[target].splice(index, 1) 
    }

    const addItem = (target) => { 
      profile.value[target].push('') 
    }

    const toggleEditSave = () => {
      if (isEditing.value) {
        saveProfile()
      } else {
        isEditing.value = true
      }
    }

    const toggleLanguage = () => { 
      lang.value = lang.value === 'en' ? 'fr' : 'en' 
    }

    const handleLanguageChange = (newLang) => {
      lang.value = newLang
      localStorage.setItem('preferred-language', newLang)
    }

    const handleLogout = () => { 
      localStorage.clear(); 
      window.location.href = '/login' 
    }
    
    const shareProfile = () => {
      const profileUrl = `${window.location.origin}/profile/${profile.value.id}`
      
      if (navigator.share) {
        navigator.share({
          title: `${profile.value.nom} - BridgeTN Transport Profile`,
          text: `Check out my transport profile on BridgeTN! Contact me for shipping services.`,
          url: profileUrl
        }).catch(err => console.log('Error sharing:', err))
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(profileUrl).then(() => {
          alert('Profile link copied to clipboard!\n\nShare this link: ' + profileUrl)
        }).catch(() => {
          alert('Share this link: ' + profileUrl)
        })
      }
    }

    onMounted(loadProfile)
    return { 
      lang, 
      isEditing, 
      profile, 
      removeItem, 
      addItem,
      toggleEditSave,
      handleLogout, 
      toggleLanguage,
      handleLanguageChange, 
      t, 
      saveProfile, 
      shareProfile, 
      ProfileHeaderComponent ,
      FooterComponent
    }
  }
}
</script>