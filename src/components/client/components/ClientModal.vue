<template>
  <Transition name="fade">
    <div v-if="selectedClient" class="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="$emit('close-modal')">
      <div class="bg-white w-full max-w-xl rounded-t-[3rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in">
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 sm:hidden"></div>
        
        <div class="px-10 py-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1">{{ t('clientDetails') }}</p>
            <h3 class="text-3xl font-black tracking-tighter">{{ selectedClient.name }}</h3>
          </div>
          <button @click="$emit('close-modal')" class="h-12 w-12 flex items-center justify-center bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
            <X :size="24" class="text-slate-900" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100">
              <p class="text-[9px] font-black uppercase text-slate-400 mb-2">{{ t('weight') }}</p>
              <p class="text-xl font-black text-slate-900">{{ selectedClient.weight }} <span class="text-[10px]">KG</span></p>
            </div>
            <div class="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100">
              <p class="text-[9px] font-black uppercase text-slate-400 mb-2">{{ t('packages') }}</p>
              <p class="text-xl font-black text-slate-900">{{ selectedClient.nb_box }} <span class="text-[10px]">PCS</span></p>
            </div>
            <div class="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100">
              <p class="text-[9px] font-black uppercase text-slate-400 mb-2">{{ t('payment') }}</p>
              <div :class="selectedClient.paid ? 'text-emerald-500' : 'text-amber-500'" class="text-[10px] font-black uppercase tracking-tighter">
                {{ selectedClient.paid ? t('paid') : t('toPay') }}
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <p class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{{ t('completeInformation') }}</p>
            
            <!-- Sender Info -->
            <div class="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-3 mb-6">
                <div class="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">S</span>
                </div>
                <p class="text-[11px] font-bold text-slate-700 uppercase tracking-wider">{{ t('senderInformation') }}</p>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('name') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.nomS || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('phone') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.TelS || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('address') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.adresseS || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('location') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.detailsS || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Receiver Info -->
            <div class="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-3 mb-6">
                <div class="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">R</span>
                </div>
                <p class="text-[11px] font-bold text-slate-700 uppercase tracking-wider">{{ t('recipientInformation') }}</p>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('name') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.nomR || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('phone') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.TelR || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('address') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.adresseR || 'N/A' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('location') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.detailsR || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Package Info -->
            <div class="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-3 mb-6">
                <div class="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">P</span>
                </div>
                <p class="text-[11px] font-bold text-slate-700 uppercase tracking-wider">{{ t('packageDetails') }}</p>
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('weight') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.weight || '0' }} kg</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('items') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.nb_box || '1' }}</p>
                </div>
                <div class="bg-white rounded-xl p-4 border border-slate-200">
                  <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('totalPrice') }}</p>
                  <p class="font-semibold text-slate-900">{{ selectedClient.prixTotale || '0' }} €</p>
                </div>
              </div>
            </div>

            <!-- Status & Tracking -->
            <div class="grid grid-cols-2 gap-6">
              <div class="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('trackingCode') }}</p>
                <p class="font-semibold text-slate-900 text-lg">{{ selectedClient.codeT || 'N/A' }}</p>
              </div>
              <div class="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
                <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('paymentStatus') }}</p>
                <p class="font-semibold text-lg" :class="selectedClient.paid ? 'text-emerald-600' : 'text-amber-600'">
                  {{ selectedClient.paid ? 'PAID' : 'UNPAID' }}
                </p>
              </div>
            </div>

            <!-- Notes -->
            <div class="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <p class="text-[10px] font-bold text-slate-600 mb-2">{{ t('notes') }}</p>
              <p class="font-semibold text-slate-900">{{ selectedClient.notes || t('noNotes') }}</p>
            </div>
          </div>

          <div class="space-y-8">
            <p class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{{ t('deliveryAddress') }}</p>
            <div class="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 flex items-start gap-4 shadow-sm">
              <div class="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-700">
                <MapPin :size="24" />
              </div>
              <p class="font-semibold text-slate-900 leading-relaxed text-lg">{{ selectedClient.address }}</p>
            </div>
          </div>

          <div class="space-y-8">
            <p class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{{ t('pdfCustomization') }}</p>
            <div class="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-6">
                <div class="flex-1">
                  <p class="text-sm font-semibold text-slate-700 mb-3">{{ t('pdfHeaderColor') }}</p>
                  <select 
                    :value="getCityColor(selectedClient.city)"
                    @change="$emit('set-city-color', selectedClient.city, $event.target.value)"
                    class="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-sm font-medium shadow-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                  >
                    <option value="#1e40af">{{ t('blueDefault') }}</option>
                    <option value="#dc2626">{{ t('red') }}</option>
                    <option value="#10b981">{{ t('green') }}</option>
                    <option value="#f59e0b">{{ t('orange') }}</option>
                    <option value="#8b5cf6">{{ t('purple') }}</option>
                    <option value="#06b6d4">{{ t('cyan') }}</option>
                    <option value="#6b7280">{{ t('gray') }}</option>
                    <option value="#f97316">{{ t('rose') }}</option>
                    <option value="#0ea5e9">{{ t('emerald') }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">{{ t('senderNote') }}</p>
            <div class="p-8 bg-indigo-50 rounded-[3rem] border border-indigo-100">
              <p class="text-slate-700 font-bold italic leading-relaxed">
                "{{ selectedClient.notes }}"
              </p>
            </div>
          </div>
        </div>

        <div class="p-8 bg-white border-t border-slate-50 grid grid-cols-3 gap-4">
          <a :href="'tel:' + selectedClient.phone" class="bg-slate-100 text-slate-900 py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-all">
            <Phone :size="20" /> {{ t('call') }}
          </a>
          <button @click="$emit('download-pdf', selectedClient)" class="bg-blue-600 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Download :size="20" /> {{ t('downloadPDF') }}
          </button>
          <button v-if="selectedClient.status !== 'livré'" @click="$emit('mark-delivered', selectedClient)" class="bg-emerald-600 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            <CheckCircle :size="20" /> {{ t('markDelivered') }}
          </button>
          <div v-else class="bg-emerald-100 text-emerald-700 py-6 rounded-[2rem] font-black flex items-center justify-center gap-3">
            <CheckCircle :size="20" /> {{ t('alreadyDelivered') }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { X, MapPin, Phone, CheckCircle, Download } from 'lucide-vue-next'

export default {
  name: 'ClientModal',
  components: { X, MapPin, Phone, CheckCircle, Download },
  props: {
    selectedClient: {
      type: Object,
      default: null
    },
    currentLang: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    },
    getCityColor: {
      type: Function,
      required: true
    }
  },
  emits: ['close-modal', 'set-city-color', 'download-pdf', 'mark-delivered']
}
</script>
