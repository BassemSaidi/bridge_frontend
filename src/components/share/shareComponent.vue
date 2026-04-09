<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-slate-900 antialiased">
    
    <nav class="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-4">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 shadow-xl shadow-slate-200">
            <Package :size="22" class="text-white" />
          </div>
          <span class="text-2xl font-black tracking-tighter text-slate-900">BRIDGE<span class="text-indigo-600">TN</span></span>
        </div>
        
        
        <div class="flex items-center gap-4">
          <router-link to="/" class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
            <Home :size="18" />
            Back to Home
          </router-link>
        </div>
      </div>
    </nav>

    <div class="mx-auto mt-12 max-w-4xl px-6">
      
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
          <Share :size="40" class="text-white" />
        </div>
        <h1 class="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Share Your Profile
        </h1>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto">
          Let clients discover your transport services. Share your public profile link with anyone who needs shipping services.
        </p>
      </div>

      <!-- Share Card -->
      <div class="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-200 mb-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-900 mb-3">Your Public Profile Link</h2>
          <p class="text-slate-500">Anyone with this link can view your transport profile and contact you</p>
        </div>

        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 mb-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Link :size="24" class="text-white" />
            </div>
            <div class="flex-1">
              <input 
                ref="profileUrlInput"
                :value="profileUrl" 
                readonly
                class="w-full bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
            <button 
              @click="copyProfileUrl"
              class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg"
            >
              <Copy :size="18" />
              Copy Link
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            @click="shareViaNative"
            class="flex items-center justify-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg"
          >
            <Smartphone :size="20" />
            Share via Mobile
          </button>
          
          <button 
            @click="shareViaEmail"
            class="flex items-center justify-center gap-3 bg-blue-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg"
          >
            <Mail :size="20" />
            Share via Email
          </button>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-200">
        <h3 class="text-2xl font-bold text-slate-900 mb-6 text-center">What Clients Will See</h3>
        
        <div class="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 text-white mb-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <Users :size="32" class="text-white" />
            </div>
            <div>
              <h4 class="text-2xl font-bold">Your Name</h4>
              <p class="text-indigo-200">Professional Transporter</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center gap-2">
              <Phone :size="16" class="text-indigo-300" />
              <span>+216 XX XXX XXX</span>
            </div>
            <div class="flex items-center gap-2">
              <Truck :size="16" class="text-indigo-300" />
              <span>Your Vehicle</span>
            </div>
          </div>
        </div>

        <div class="space-y-4 text-center">
          <div class="flex items-center justify-center gap-2 text-emerald-600">
            <CheckCircle :size="20" />
            <span class="font-bold">Contact Information</span>
          </div>
          <div class="flex items-center justify-center gap-2 text-emerald-600">
            <CheckCircle :size="20" />
            <span class="font-bold">Active Trips</span>
          </div>
          <div class="flex items-center justify-center gap-2 text-emerald-600">
            <CheckCircle :size="20" />
            <span class="font-bold">Service Areas</span>
          </div>
          <div class="flex items-center justify-center gap-2 text-emerald-600">
            <CheckCircle :size="20" />
            <span class="font-bold">Vehicle Details</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { apiService } from '../../api/axios.js'
import { Package, Home, Share, Link, Copy, Smartphone, Mail, Users, Phone, Truck, CheckCircle } from 'lucide-vue-next'

export default {
  name: 'ShareComponent',
  components: { Package, Home, Share, Link, Copy, Smartphone, Mail, Users, Phone, Truck, CheckCircle },
  
  setup() {
    const profileUrlInput = ref(null)
    const account = ref(null)

    const profileUrl = computed(() => {
      if (!account.value) return ''
      return `${window.location.origin}/profil/${account.value.id}`
    })

    const loadAccount = async () => {
      try {
        const response = await apiService.accounts.getMe()
        if (response.data.success) {
          account.value = response.data.data
        }
      } catch (error) {
        console.error('Error loading account:', error)
      }
    }

    const copyProfileUrl = () => {
      navigator.clipboard.writeText(profileUrl.value).then(() => {
        if (profileUrlInput.value) {
          profileUrlInput.value.select()
        }
        alert('Profile link copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy link. Please copy manually: ' + profileUrl.value)
      })
    }

    const shareViaNative = () => {
      if (navigator.share) {
        navigator.share({
          title: 'BridgeTN Transport Profile',
          text: 'Check out my transport services on BridgeTN!',
          url: profileUrl.value
        }).catch(err => console.log('Share cancelled:', err))
      } else {
        copyProfileUrl()
      }
    }

    const shareViaEmail = () => {
      const subject = encodeURIComponent('BridgeTN Transport Profile')
      const body = encodeURIComponent(`Check out my transport profile on BridgeTN!\n\n${profileUrl.value}\n\nContact me for reliable shipping services.`)
      window.location.href = `mailto:?subject=${subject}&body=${body}`
    }

    onMounted(() => {
      loadAccount()
    })

    return {
      profileUrlInput,
      profileUrl,
      copyProfileUrl,
      shareViaNative,
      shareViaEmail
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
