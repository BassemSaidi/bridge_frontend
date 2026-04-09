<template>
  <section id="what" class="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/10 rounded-full blur-2xl"></div>
    </div>

    <div class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-24">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          {{ currentLang === 'en' ? 'About BridgeTN' : 'À Propos de BridgeTN' }}
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 lg:mb-8">
          <span class="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            {{ currentLang === 'en' ? 'What is BridgeTN?' : 'Qu\'est-ce que BridgeTN ?' }}
          </span>
        </h2>
        <p class="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
          {{ currentLang === 'en' 
            ? 'A modern logistics platform connecting Tunisia with the world through innovative baggage transport solutions.'
            : 'Une plateforme logistique moderne reliant la Tunisie au monde par des solutions innovantes de transport de bagages.' }}
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        <!-- Left Column: About BridgeTN -->
        <div class="space-y-8 lg:space-y-12">
          <!-- What We Do -->
          <div class="group relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-blue-200/60 transition-all duration-500">
              <div class="flex items-center gap-6 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Globe :size="32" class="text-white" />
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-slate-900">
                  {{ currentLang === 'en' ? 'What We Do' : 'Ce Que Nous Faisons' }}
                </h3>
              </div>
              <p class="text-lg text-slate-600 leading-relaxed">
                {{ currentLang === 'en' 
                  ? 'BridgeTN specializes in international baggage transport between Tunisia and countries worldwide. We provide a secure, efficient, and affordable solution for individuals who need to send personal items, luggage, or packages across borders.'
                  : 'BridgeTN se spécialise dans le transport international de bagages entre la Tunisie et les pays du monde entier. Nous fournissons une solution sécurisée, efficace et abordable pour les personnes qui doivent envoyer des effets personnels, des bagages ou des colis à travers les frontières.' }}
              </p>
            </div>
          </div>

          <!-- Our Mission -->
          <div class="group relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-10 shadow-xl shadow-indigo-200/50 border border-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-300/60 transition-all duration-500">
              <div class="flex items-center gap-6 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                  <Target :size="32" class="text-white" />
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-slate-900">
                  {{ currentLang === 'en' ? 'Our Mission' : 'Notre Mission' }}
                </h3>
              </div>
              <p class="text-lg text-slate-600 leading-relaxed">
                {{ currentLang === 'en' 
                  ? 'To bridge the gap between Tunisia and the global community by making international transport accessible and reliable.'
                  : 'Combler le fossé entre la Tunisie et la communauté mondiale en rendant le transport international accessible et fiable.' }}
              </p>
            </div>
          </div>

          <!-- How It Works -->
          <div class="group relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-green-200/60 transition-all duration-500">
              <div class="flex items-center gap-6 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200/50">
                  <Settings :size="32" class="text-white" />
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-slate-900">
                  {{ currentLang === 'en' ? 'How It Works' : 'Comment Ça Marche' }}
                </h3>
              </div>
              <div class="space-y-4">
                <div class="flex items-start gap-4 group/item">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200/50 group-hover/item:scale-110 transition-transform">1</div>
                  <p class="text-lg text-slate-600 pt-1" v-html="currentLang === 'en' 
                    ? '<strong>Transporters create trips</strong> with their travel dates and routes'
                    : '<strong>Les transporteurs créent des voyages</strong> avec leurs dates de voyage et itinéraires'">
                  </p>
                </div>
                <div class="flex items-start gap-4 group/item">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200/50 group-hover/item:scale-110 transition-transform">2</div>
                  <p class="text-lg text-slate-600 pt-1" v-html="currentLang === 'en' 
                    ? '<strong>Senders book space</strong> for their baggage on available trips'
                    : '<strong>Les expéditeurs réservent de l\'espace</strong> pour leurs bagages sur les voyages disponibles'">
                  </p>
                </div>
                <div class="flex items-start gap-4 group/item">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200/50 group-hover/item:scale-110 transition-transform">3</div>
                  <p class="text-lg text-slate-600 pt-1" v-html="currentLang === 'en' 
                    ? '<strong>Track in real-time</strong> with unique codes and status updates'
                    : '<strong>Suivez en temps réel</strong> avec des codes uniques et des mises à jour de statut'">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Features & Benefits -->
        <div class="space-y-8 lg:space-y-12">
          <!-- Key Features -->
          <div class="group relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-10 shadow-xl shadow-indigo-200/50 border border-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-300/60 transition-all duration-500">
              <div class="flex items-center gap-6 mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                  <Star :size="32" class="text-white" />
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-slate-900">
                  {{ currentLang === 'en' ? 'Key Features' : 'Caractéristiques Principales' }}
                </h3>
              </div>
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="flex items-start gap-4 group/feature">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200/50 group-hover/feature:scale-110 transition-transform">
                    <CheckCircle :size="24" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-2 text-lg">
                      {{ currentLang === 'en' ? 'Real-time Tracking' : 'Suivi en Temps Réel' }}
                    </h4>
                    <p class="text-slate-600">
                      {{ currentLang === 'en' 
                        ? 'Monitor your baggage every step of the way'
                        : 'Surveillez vos bagages à chaque étape' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4 group/feature">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover/feature:scale-110 transition-transform">
                    <CheckCircle :size="24" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-2 text-lg">
                      {{ currentLang === 'en' ? 'Verified Transporters' : 'Transporteurs Vérifiés' }}
                    </h4>
                    <p class="text-slate-600">
                      {{ currentLang === 'en' 
                        ? 'All transporters are background-checked'
                        : 'Tous les transporteurs sont vérifiés' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4 group/feature">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200/50 group-hover/feature:scale-110 transition-transform">
                    <CheckCircle :size="24" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-2 text-lg">
                      {{ currentLang === 'en' ? '24/7 Support' : 'Support 24/7' }}
                    </h4>
                    <p class="text-slate-600">
                      {{ currentLang === 'en' 
                        ? 'Always here to help you'
                        : 'Toujours là pour vous aider' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4 group/feature">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200/50 group-hover/feature:scale-110 transition-transform">
                    <CheckCircle :size="24" class="text-white" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-2 text-lg">
                      {{ currentLang === 'en' ? 'Global Coverage' : 'Couverture Mondiale' }}
                    </h4>
                    <p class="text-slate-600">
                      {{ currentLang === 'en' 
                        ? 'Connect to destinations worldwide'
                        : 'Connectez-vous à des destinations mondiales' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="group relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl shadow-blue-200/50 hover:shadow-3xl hover:shadow-blue-300/60 transition-all duration-500">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Rocket :size="40" class="text-white" />
              </div>
              <h3 class="text-3xl lg:text-4xl font-black mb-6">
                {{ currentLang === 'en' ? 'Ready to Get Started?' : 'Prêt à Commencer ?' }}
              </h3>
              <p class="text-xl text-blue-100 mb-8 max-w-md mx-auto leading-relaxed">
                {{ currentLang === 'en' 
                  ? 'Join thousands of users who trust BridgeTN for their international transport needs.'
                  : 'Rejoignez des milliers d\'utilisateurs qui font confiance à BridgeTN pour leurs besoins de transport international.' }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/login" class="group/btn inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <User :size="20" class="group-hover/btn:translate-x-1 transition-transform" />
                  {{ currentLang === 'en' ? 'Sign Up Now' : 'S\'inscrire Maintenant' }}
                </a>
                <a href="#track" class="group/btn inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Search :size="20" class="group-hover/btn:scale-110 transition-transform" />
                  {{ currentLang === 'en' ? 'Track Package' : 'Suivre Colis' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { 
  Globe, 
  Target, 
  Settings, 
  Star, 
  CheckCircle, 
  User, 
  Search,
  Rocket
} from 'lucide-vue-next'

// Props
const props = defineProps({
  currentLang: {
    type: String,
    default: 'fr'
  }
})
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover .group-hover\:float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>