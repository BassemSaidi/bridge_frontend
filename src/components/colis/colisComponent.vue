<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 font-sans text-slate-900 antialiased pb-20">
    
    <ProfileHeaderComponent :show-back-button="true" @language-changed="handleLanguageChange" />

    <div class="mx-auto mt-12 max-w-6xl px-6">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <div class="flex-1">
          <ColisStep1 
            v-if="step === 1" 
            :form="form" 
            :error="error" 
            :success="success"
            :current-lang="currentLang"
            :t="t"
          />

          <ColisStep2 
            v-if="step === 2" 
            :form="form"
            :current-lang="currentLang"
            :t="t"
            @update:is-paid="form.isPaid = $event"
          />

          <ColisActions 
            :step="step" 
            :loading="loading"
            :current-lang="currentLang"
            :t="t"
            @back="step--"
            @next="nextStep"
          />
        </div>

        <ColisSummary 
          :form="form"
          :account="account"
          :current-lang="currentLang"
          :t="t"
        />
      </div>
    </div>
  </div> 
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jsPDF } from "jspdf"
import { apiService } from '../../api/axios.js'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import ColisStep1 from './components/ColisStep1.vue'
import ColisStep2 from './components/ColisStep2.vue'
import ColisSummary from './components/ColisSummary.vue'
import ColisActions from './components/ColisActions.vue'
import FooterComponent from '../basics/FooterComponent.vue'

export default {
  components: { 
    ProfileHeaderComponent, 
    ColisStep1, 
    ColisStep2, 
    ColisSummary, 
    ColisActions,
    FooterComponent
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const step = ref(1)
    const loading = ref(false)
    const error = ref('')
    const success = ref('')
    const voyages = ref([])
    const account = ref(null)
    const selectedTrip = ref(null)
    const currentLang = ref('fr')

    // Load language preference from localStorage
    const loadLanguagePreference = () => {
      const saved = localStorage.getItem('preferredLanguage')
      if (saved) {
        currentLang.value = saved
      }
    }

    // Handle language change from header
    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
    }

    // Translations
    const translations = {
      en: {
        backToProfile: 'Back to Profile',
        shipmentDetails: 'Shipment Details',
        senderReceiverInfo: 'Sender and Receiver information.',
        sender: 'Sender',
        receiver: 'Receiver',
        fullName: 'Full Name',
        phone: 'Phone',
        cityCountry: 'City & Country',
        fullPickupAddress: 'Full Pickup Address',
        fullDeliveryAddress: 'Full Delivery Address',
        packagePayment: 'Package & Payment',
        lastStepGenerateSlip: 'One last step to generate your slip.',
        totalWeight: 'Total Weight (kg)',
        numberOfBoxes: 'Number of Boxes',
        currentStatus: 'Current Status',
        paid: 'PAID',
        toPay: 'TO PAY',
        liveSummary: 'Live Summary',
        paymentConfirmed: 'Payment Confirmed',
        paymentOnDelivery: 'Payment on Delivery',
        back: 'Back',
        continue: 'Continue',
        confirmGetPDF: 'Confirm & Get PDF',
        pleaseFillAllSender: 'Please fill in all sender information',
        pleaseFillAllReceiver: 'Please fill in all receiver information',
        pleaseEnterValidWeight: 'Please enter a valid weight',
        pleaseEnterValidBoxCount: 'Please enter a valid number of boxes',
        pleaseFillAllRequiredFields: 'Please fill in all required fields',
        packageCreatedSuccessfully: 'Package created successfully!',
        failedToCreatePackage: 'Failed to create package',
        noVoyageSelected: 'No voyage selected. Please go back and select a voyage.',
        failedToCreatePackageTryAgain: 'Failed to create package. Please try again.'
      },
      fr: {
        backToProfile: 'Retour au Profil',
        shipmentDetails: 'Détails de l\'Expédition',
        senderReceiverInfo: 'Informations de l\'expéditeur et du destinataire.',
        sender: 'Expéditeur',
        receiver: 'Destinataire',
        fullName: 'Nom Complet',
        phone: 'Téléphone',
        cityCountry: 'Ville & Pays',
        fullPickupAddress: 'Adresse Complète de Prise en Charge',
        fullDeliveryAddress: 'Adresse Complète de Livraison',
        packagePayment: 'Colis & Paiement',
        lastStepGenerateSlip: 'Une dernière étape pour générer votre bordereau.',
        totalWeight: 'Poids Total (kg)',
        numberOfBoxes: 'Nombre de Colis',
        currentStatus: 'Statut Actuel',
        paid: 'PAYÉ',
        toPay: 'À PAYER',
        liveSummary: 'Résumé en Direct',
        paymentConfirmed: 'Paiement Confirmé',
        paymentOnDelivery: 'Paiement à la Livraison',
        back: 'Retour',
        continue: 'Continuer',
        confirmGetPDF: 'Confirmer & Obtenir PDF',
        pleaseFillAllSender: 'Veuillez remplir toutes les informations de l\'expéditeur',
        pleaseFillAllReceiver: 'Veuillez remplir toutes les informations du destinataire',
        pleaseEnterValidWeight: 'Veuillez entrer un poids valide',
        pleaseEnterValidBoxCount: 'Veuillez entrer un nombre de colis valide',
        pleaseFillAllRequiredFields: 'Veuillez remplir tous les champs requis',
        packageCreatedSuccessfully: 'Colis créé avec succès!',
        failedToCreatePackage: 'Échec de la création du colis',
        noVoyageSelected: 'Aucun voyage sélectionné. Veuillez revenir et sélectionner un voyage.',
        failedToCreatePackageTryAgain: 'Échec de la création du colis. Veuillez réessayer.'
      }
    }

    const t = (key) => translations[currentLang.value][key] || key
    
    const form = ref({
      voyage_id: '',
      senderName: '', senderPhone: '', senderCity: '', senderAddress: '',
      receiverName: '', receiverPhone: '', receiverCity: '', receiverAddress: '',
      weight: 0, isPaid: false, nb_box: 0
    })

    // Load account data to get pricePerKg
    const loadAccount = async () => {
      try {
        const response = await apiService.accounts.getMe()
        
        if (response.data.success) {
          account.value = response.data.data
        }
      } catch (err) {
        console.error('Error loading account:', err)
      }
    }

    // Load voyages for the current user
    const loadVoyages = async () => {
      try {
        const response = await apiService.voyages.getAll()
        
        if (response.data.success) {
          voyages.value = response.data.data
        }
      } catch (err) {
        console.error('Error loading voyages:', err)
      }
    }

    // Initialize voyage ID from URL or localStorage
    const initializeVoyageId = () => {
      const urlVoyageId = route.query.voyage_id
      const selectedTrip = localStorage.getItem('selectedTrip')
      
      if (urlVoyageId) {
        form.value.voyage_id = urlVoyageId
        return true
      } else if (selectedTrip) {
        // Handle public access - set voyage from localStorage
        const trip = JSON.parse(selectedTrip)
        form.value.voyage_id = trip.idV
        // Clear selectedTrip after using it
        localStorage.removeItem('selectedTrip')
        return true
      } else {
        error.value = t('noVoyageSelected')
        return false
      }
    }

    // Validate form
    const validateForm = () => {
      if (!form.value.senderName || !form.value.senderPhone || !form.value.senderAddress) {
        error.value = t('pleaseFillAllSender')
        return false
      }
      if (!form.value.receiverName || !form.value.receiverPhone || !form.value.receiverAddress) {
        error.value = t('pleaseFillAllReceiver')
        return false
      }
      if (!form.value.weight || form.value.weight <= 0) {
        error.value = t('pleaseEnterValidWeight')
        return false
      }
      if (!form.value.nb_box || form.value.nb_box <= 0) {
        error.value = t('pleaseEnterValidBoxCount')
        return false
      }
      return true
    }

    // Create colis
    const createColis = async () => {
      if (!validateForm()) return
      
      loading.value = true
      error.value = ''
      success.value = ''
      
      try {
        const colisData = {
          voyage_id: form.value.voyage_id,
          nomS: form.value.senderName,
          TelS: form.value.senderPhone,
          adresseS: form.value.senderAddress,
          detailsS: form.value.senderCity,
          nomR: form.value.receiverName,
          TelR: form.value.receiverPhone,
          adresseR: form.value.receiverAddress,
          detailsR: form.value.receiverCity,
          KgCo: form.value.weight,
          nb_box: form.value.nb_box || 1,
          payementStatus: form.value.isPaid ? 'PAID' : 'TO PAY'
        }
        
        const response = await apiService.colis.create(colisData)
        
        if (response.data.success) {
          success.value = t('packageCreatedSuccessfully')
          generatePDF()
          // Reset form after successful creation
          setTimeout(() => {
            resetForm()
            router.push('/profile')
          }, 2000)
        } else {
          error.value = response.data.error || t('failedToCreatePackage')
        }
      } catch (err) {
        console.error('Error creating colis:', err)
        error.value = t('failedToCreatePackageTryAgain')
      } finally {
        loading.value = false
      }
    }

    // Reset form
    const resetForm = () => {
      form.value = {
        voyage_id: voyages.value.length > 0 ? voyages.value[0].idV : '',
        senderName: '', senderPhone: '', senderCity: '', senderAddress: '',
        receiverName: '', receiverPhone: '', receiverCity: '', receiverAddress: '',
        weight: 0, isPaid: false, nb_box: 0
      }
      step.value = 1
      error.value = ''
      success.value = ''
    }

    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setFillColor(30, 27, 75);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("BridgeTN Transport Slip", 15, 25);

      doc.setTextColor(40, 40, 40);
      doc.setFontSize(10);
      doc.text(currentLang.value === 'fr' ? "EXPÉDITEUR:" : "SENDER:", 15, 55);
      doc.text([form.value.senderName, form.value.senderPhone, form.value.senderAddress], 15, 62);
      
      doc.text(currentLang.value === 'fr' ? "DESTINATAIRE:" : "RECEIVER:", 110, 55);
      doc.text([form.value.receiverName, form.value.receiverPhone, form.value.receiverAddress], 110, 62);

      doc.setFillColor(248, 250, 252);
      doc.rect(15, 100, 180, 30, 'F');
      doc.text(`${currentLang.value === 'fr' ? 'Poids' : 'Weight'}: ${form.value.weight} KG`, 20, 110);
      doc.text(`${currentLang.value === 'fr' ? 'Statut' : 'Status'}: ${form.value.isPaid ? 'PAID' : 'COLLECT CASH'}`, 20, 117);
      doc.setFontSize(14);
      doc.text(`${currentLang.value === 'fr' ? 'Total' : 'Total'}: ${(form.value.weight * (account?.pricePerKg || 0)).toFixed(2)} EUR`, 130, 117);

      doc.save(`Slip_${form.value.senderName}.pdf`);
    }

    const nextStep = () => {
      error.value = ''
      if (step.value === 1) {
        if (!form.value.senderName || !form.value.senderPhone || !form.value.senderAddress ||
            !form.value.receiverName || !form.value.receiverPhone || !form.value.receiverAddress) {
          error.value = t('pleaseFillAllRequiredFields')
          return
        }
        step.value++
      } else if (step.value === 2) {
        createColis()
      }
    }

    onMounted(() => {
      loadLanguagePreference()
      initializeVoyageId()
      loadVoyages()
      loadAccount()
    })

    return { 
      step, 
      form, 
      loading, 
      error, 
      success, 
      voyages,
      account,
      selectedTrip,
      currentLang,
      t,
      handleLanguageChange,
      generatePDF,
      nextStep,
      resetForm,
      ProfileHeaderComponent
    }
  }
}
</script>