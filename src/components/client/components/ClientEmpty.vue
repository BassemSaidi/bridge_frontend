<template>
  <div class="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
    <p class="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">{{ t('noClientsFound') }}</p>
    <router-link :to="`/colis?voyage_id=${voyageId}`" class="text-indigo-600 font-black inline-flex items-center gap-2 bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all">
      <Plus :size="16" /> {{ t('addPackage') }}
    </router-link>
  </div>
</template>

<script>
import { Plus } from 'lucide-vue-next'

export default {
  name: 'ClientEmpty',
  components: { Plus },
  props: {
    voyageId: {
      type: String,
      required: true
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
