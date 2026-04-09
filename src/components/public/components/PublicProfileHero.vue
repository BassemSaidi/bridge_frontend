<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
      <div class="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
        
        <!-- Profile Image -->
        <div class="relative shrink-0" v-if="profile">
          <div class="relative group">
            <img :src="profile.img || `https://ui-avatars.com/api/?name=${profile.nom}&background=000075&color=fff&size=256`" 
                 :alt="profile.nom"
                 class="h-40 w-40 lg:h-48 lg:w-48 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-300" />
            
            <!-- Simple Verification Badge -->
            <div class="absolute -bottom-3 -right-3 bg-emerald-500 h-8 w-8 lg:h-10 lg:w-10 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
              <ShieldCheck :size="16" class="text-white" />
            </div>
          </div>
        </div>
        
        <!-- Profile Information -->
        <div class="flex-1 text-center lg:text-left" v-if="profile">
          <!-- Simple Verification Status -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <ShieldCheck :size="14" />
            <span>{{ t('verifiedTransporter') }}</span>
          </div>
          
          <!-- Clean Name Display -->
          <h1 class="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
            {{ profile.nom }}
          </h1>
          
          <!-- Simple Bio -->
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {{ profile.Bio || t('defaultBio') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ShieldCheck } from 'lucide-vue-next'

export default {
  components: { ShieldCheck },
  props: {
    profile: Object,
    currentLang: String,
    t: Function
  }
}
</script>
