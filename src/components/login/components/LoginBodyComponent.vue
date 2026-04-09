<template>
  <div class="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-0 sm:p-6 font-sans antialiased">
    <div class="w-full max-w-[1000px] h-full sm:h-[580px] bg-white sm:rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row overflow-hidden border border-white">
      
      <div class="hidden lg:flex lg:w-[45%] relative bg-[#020617] p-12 flex-col justify-between overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full opacity-20">
          <div class="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-indigo-500 blur-[120px] rounded-full"></div>
          <div class="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600 blur-[100px] rounded-full"></div>
        </div>
        <div class="absolute inset-0 opacity-[0.05]" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 30px 30px;"></div>

        <div class="relative z-10">
          <div class="group h-8 overflow-hidden cursor-pointer relative mb-16">
            <div class="transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:-translate-y-8">
              <div class="h-8 flex items-center">
                <span class="text-xl font-black tracking-tighter text-white uppercase italic">
                  Bridge<span class="text-indigo-400">TN</span>
                </span>
              </div>
              <div class="h-8 flex flex-col justify-center">
                <span class="text-xl font-black tracking-tighter text-indigo-400 uppercase italic">
                  Bridge<span class="text-white">TN</span>
                </span>
                <span class="text-[8px] uppercase font-bold tracking-[0.5em] text-slate-500">Your Gate to the World</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h1 class="text-5xl font-bold text-white leading-none tracking-tighter">
              {{ currentLang === 'en' ? 'Global' : 'Globale' }} <br/>
              {{ currentLang === 'en' ? 'Logistics' : 'Logistique' }} <br/>
              <span class="text-indigo-500">{{ currentLang === 'en' ? 'Redefined.' : 'Redéfinie.' }}</span>
            </h1>
            <p class="text-slate-400 text-sm max-w-[280px] leading-relaxed font-medium">
              {{ currentLang === 'en' 
                ? 'Seamlessly connecting Tunisian industries to international markets with precision and speed.'
                : 'Connecter sans faille les industries tunisiennes aux marchés internationaux avec précision et rapidité.' }}
            </p>
          </div>
        </div>

        <div class="relative z-10 flex items-center gap-6">
          <div class="flex -space-x-2">
            <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
              {{ i }}
            </div>
          </div>
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            {{ currentLang === 'en' ? 'Trusted by 50+ Partners' : 'Approuvé par 50+ Partenaires' }}
          </span>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white relative">
        
        <div class="lg:hidden flex flex-col items-center mb-12 mt-8">
          <div class="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-xl mb-4 transform -rotate-3">
             <Package class="text-white" :size="24" />
          </div>
          <h2 class="text-2xl font-black tracking-tighter text-slate-900 uppercase">
            Bridge<span class="text-indigo-600">TN</span>
          </h2>
        </div>

        <div class="w-full max-w-[340px] mx-auto">
          <div class="mb-10 sm:text-left text-center">
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
              {{ currentLang === 'en' ? 'Welcome Back' : 'Bon Retour' }}
            </h3>
            <p class="text-slate-400 text-sm mt-1">
              {{ currentLang === 'en' ? 'Please enter your workspace details.' : 'Veuillez entrer les détails de votre espace de travail.' }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-1.5">
              <input 
                v-model="form.mail"
                type="email" 
                class="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4 px-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all outline-none text-sm placeholder:text-slate-400"
                :placeholder="currentLang === 'en' ? 'Work email' : 'Email professionnel'"
              />
            </div>

            <div class="space-y-1.5">
              <div class="relative group">
                <input 
                  v-model="form.mdp"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full bg-slate-50 border border-slate-200/60 rounded-2xl py-4 px-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all outline-none text-sm placeholder:text-slate-400"
                  :placeholder="currentLang === 'en' ? 'Password' : 'Mot de passe'"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  <Eye v-if="!showPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between px-1">
               <a href="#" class="text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                 {{ currentLang === 'en' ? 'Forgot Password?' : 'Mot de passe oublié?' }}
               </a>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-indigo-600 active:scale-[0.97] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-6"
            >
              <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
              <span>{{ isLoading ? (currentLang === 'en' ? 'Checking' : 'Vérification') : (currentLang === 'en' ? 'Authorize Login' : 'Autoriser la connexion') }}</span>
            </button>
          </form>

          <footer class="mt-12 flex justify-center lg:justify-start gap-8">
            <button @click="toggleLanguage" class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
              {{ currentLang === 'en' ? 'English' : 'Français' }}
            </button>
            <div class="w-px h-3 bg-slate-200"></div>
            <a href="#" class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
              {{ currentLang === 'en' ? 'Help' : 'Aide' }}
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Eye, EyeOff, Loader2, Package } from 'lucide-vue-next'

// Props
const props = defineProps({
  currentLang: {
    type: String,
    default: 'en'
  }
})

// Emits
const emit = defineEmits(['language-changed', 'submit'])

const form = ref({ mail: '', mdp: '' })
const showPassword = ref(false)
const isLoading = ref(false)

const toggleLanguage = () => {
  const newLang = props.currentLang === 'en' ? 'fr' : 'en'
  emit('language-changed', newLang)
}

const handleSubmit = () => {
  isLoading.value = true
  emit('submit', form.value)
  setTimeout(() => isLoading.value = false, 1500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Page Entrance */
.max-w-\[1000px\] {
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>