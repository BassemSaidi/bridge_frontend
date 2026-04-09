<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 font-sans text-slate-900 antialiased pb-12">
    
    <ProfileHeaderComponent 
      :show-back-button="false" 
      @language-changed="handleLanguageChange"
    />
    
    <div class="mx-auto max-w-6xl px-6 py-8">
      
      <!-- Loading State -->
      <ClientLoading v-if="loading" :current-lang="currentLang" :t="t" />

      <!-- Clients Grid with Stats -->
      <div v-else-if="clients.length > 0" class="space-y-8">
        
        <!-- Stats Cards -->
        <ClientStats :clients="clients" :current-lang="currentLang" :t="t" />

        <!-- Section Header -->
        <ClientGrid :clients="clients" :current-lang="currentLang" :t="t" @select-client="selectedClient = $event" />
      </div>

      <!-- Empty State -->
      <ClientEmpty v-else :voyage-id="route.query.voyage_id" :current-lang="currentLang" :t="t" />

    </div>

    <!-- Client Details Modal -->
    <ClientModal 
      :selected-client="selectedClient" 
      :current-lang="currentLang" 
      :t="t"
      :get-city-color="getCityColor"
      @close-modal="selectedClient = null"
      @set-city-color="setCityColor"
      @download-pdf="downloadClientPDF"
      @mark-delivered="markAsDelivered"
    />

  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiService } from '../../api/axios.js'
import ClientHeader from './components/ClientHeader.vue'
import ClientStats from './components/ClientStats.vue'
import ClientGrid from './components/ClientGrid.vue'
import ClientLoading from './components/ClientLoading.vue'
import ClientEmpty from './components/ClientEmpty.vue'
import ClientModal from './components/ClientModal.vue'
import ProfileHeaderComponent from '../basics/inside/ProfileHeaderComponent.vue'
import FooterComponent from '../basics/FooterComponent.vue'

export default {
  name: 'ClientListComponent',
  components: { 
    ClientHeader, 
    ClientStats, 
    ClientGrid, 
    ClientLoading, 
    ClientEmpty, 
    ClientModal,
    ProfileHeaderComponent,
    FooterComponent
  },
  setup() {
    const route = useRoute()
    const tripID = ref(route.query.voyage_id || "")
    const selectedClient = ref(null)
    const clients = ref([])
    const loading = ref(true)
    const currentLang = ref('fr')

    const loadLanguagePreference = () => {
      const saved = localStorage.getItem('preferredLanguage')
      if (saved) {
        currentLang.value = saved
      }
    }

    const handleLanguageChange = (newLang) => {
      currentLang.value = newLang
    }

    const translations = {
      en: {
        cargoManifest: 'Cargo Manifest',
        voyage: 'Voyage',
        totalClients: 'Total Clients',
        paid: 'Paid',
        pending: 'Pending',
        totalWeight: 'Total Weight',
        registeredClients: 'Registered Clients',
        entries: 'Entries',
        delivered: 'Delivered',
        enRoute: 'En Route',
        viewDetails: 'View Details',
        deliveryConfirmed: 'Delivery Confirmed',
        clickForMoreInfo: 'Click for more information',
        loadingClients: 'Loading clients...',
        noClientsFound: 'No clients found for this voyage',
        addPackage: 'Add Package',
        clientDetails: 'Client Details',
        weight: 'Weight',
        packages: 'Packages',
        payment: 'Payment',
        toPay: 'To Pay',
        completeInformation: 'Complete Information',
        senderInformation: 'Sender Information',
        recipientInformation: 'Recipient Information',
        packageDetails: 'Package Details',
        items: 'Items',
        totalPrice: 'Total Price',
        trackingCode: 'Tracking Code',
        paymentStatus: 'Payment Status',
        notes: 'Notes',
        noNotes: 'No notes',
        deliveryAddress: 'Delivery Address',
        pdfCustomization: 'PDF Customization',
        pdfHeaderColor: 'PDF Header Color',
        blueDefault: 'Blue (Default)',
        red: 'Red',
        green: 'Green',
        orange: 'Orange',
        purple: 'Purple',
        cyan: 'Cyan',
        gray: 'Gray',
        rose: 'Rose',
        emerald: 'Emerald',
        senderNote: 'Sender Note',
        call: 'Call',
        downloadPDF: 'Download PDF',
        markDelivered: 'Mark Delivered',
        alreadyDelivered: 'Already Delivered',
        name: 'Name',
        phone: 'Phone',
        address: 'Address',
        location: 'Location',
        clientSheet: 'Client Sheet',
        statusUpdated: 'Status updated',
        nowDelivered: 'is now delivered',
        errorUpdatingStatus: 'Error updating status',
        itemCount: 'Number of boxes'
      },
      fr: {
        cargoManifest: 'Manifeste Cargo',
        voyage: 'Voyage',
        totalClients: 'Total Clients',
        paid: 'Payés',
        pending: 'En attente',
        totalWeight: 'Poids Total',
        registeredClients: 'Clients enregistrés',
        entries: 'Entrées',
        delivered: 'Livré',
        enRoute: 'En Route',
        viewDetails: 'Voir les détails',
        deliveryConfirmed: 'Livraison confirmée',
        clickForMoreInfo: 'Cliquez pour plus d\'informations',
        loadingClients: 'Chargement des clients...',
        noClientsFound: 'Aucun client trouvé pour ce voyage',
        addPackage: 'Ajouter un colis',
        clientDetails: 'Détails du client',
        weight: 'Poids',
        packages: 'Colis',
        payment: 'Paiement',
        toPay: 'À payer',
        completeInformation: 'Informations complètes',
        senderInformation: 'Informations de l\'expéditeur',
        recipientInformation: 'Informations du destinataire',
        packageDetails: 'Détails du colis',
        items: 'Articles',
        totalPrice: 'Prix total',
        trackingCode: 'Code de suivi',
        paymentStatus: 'Statut de paiement',
        notes: 'Notes',
        noNotes: 'Aucune note',
        deliveryAddress: 'Adresse de livraison',
        pdfCustomization: 'Personnalisation PDF',
        pdfHeaderColor: 'Couleur d\'en-tête PDF',
        blueDefault: 'Bleu (Défaut)',
        red: 'Rouge',
        green: 'Vert',
        orange: 'Orange',
        purple: 'Violet',
        cyan: 'Cyan',
        gray: 'Gris',
        rose: 'Rose',
        emerald: 'Émeraude',
        senderNote: 'Note de l\'expéditeur',
        call: 'Appeler',
        downloadPDF: 'Télécharger PDF',
        markDelivered: 'Marquer Livré',
        alreadyDelivered: 'Déjà Livré',
        name: 'Nom',
        phone: 'Téléphone',
        address: 'Adresse',
        location: 'Localisation',
        clientSheet: 'Fiche Client',
        statusUpdated: 'Statut mis à jour',
        nowDelivered: 'est maintenant livré',
        errorUpdatingStatus: 'Erreur lors de la mise à jour du statut',
        itemCount: 'Nombre de boîtes'
      }
    }

    const t = (key) => translations[currentLang.value][key] || key

    const loadClients = async () => {
      try {
        const voyageId = route.query.voyage_id
        if (!voyageId) return

        const response = await apiService.colis.getAll({ voyage_id: voyageId })
        
        if (response.data.success && response.data.data) {
          const voyageResponse = await apiService.voyages.getById(voyageId)
          
          let voyageCodeT = null
          if (voyageResponse.data.success && voyageResponse.data.data) {
            voyageCodeT = voyageResponse.data.data.codeT
          }
          
          const mappedClients = response.data.data.map(colis => ({
            id: colis.idCo,
            name: colis.nomR || 'Sans Nom',
            city: colis.detailsR || 'Ville non spécifiée',
            address: colis.adresseR || 'Pas d\'adresse',
            weight: parseFloat(colis.KgCo) || 0,
            phone: colis.TelR || '',
            paid: colis.payementStatus === 'PAID',
            status: colis.status || 'en route',
            notes: `De: ${colis.nomS || 'Anonyme'} (${colis.TelS || 'N/A'})`,
            nomS: colis.nomS,
            TelS: colis.TelS,
            adresseS: colis.adresseS,
            detailsS: colis.detailsS,
            nomR: colis.nomR,
            TelR: colis.TelR,
            adresseR: colis.adresseR,
            detailsR: colis.detailsR,
            prixTotale: colis.prixTotale,
            voyage_id: colis.voyage_id,
            codeT: voyageCodeT,
            nb_box: colis.nb_box,
          }))
          
          clients.value = mappedClients
          tripID.value = voyageId
        }
      } catch (error) {
        console.error('Fetch Error:', error)
      } finally {
        setTimeout(() => { loading.value = false }, 300)
      }
    }

    const markAsDelivered = async (client) => {
      try {
        const response = await apiService.colis.update(client.id, { status: 'livré', payementStatus: 'PAID' })
        
        if (response.data.success) {
          const clientIndex = clients.value.findIndex(c => c.id === client.id)
          if (clientIndex !== -1) {
            clients.value[clientIndex].status = 'livré'
          }
          
          alert(`${t('statusUpdated')}: ${client.name} ${t('nowDelivered')}`)
          selectedClient.value = null
        } else {
          alert(t('errorUpdatingStatus'))
        }
      } catch (error) {
        console.error('Update status error:', error)
        alert(t('errorUpdatingStatus'))
      }
    }

    const downloadClientPDF = (client) => {
      const savedColor = localStorage.getItem(`pdfColor_${client.city}`) || '#1e40af';
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${t('clientSheet')} - ${client.name}</title>
          <style>
            @page { size: A4; margin: 15px; }
            body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f8fafc; }
            .container { max-width: 100%; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, ${savedColor} 0%, ${savedColor}dd 100%); color: white; padding: 30px 25px; text-align: center;height:400px }
            .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 12px; }
            .client-info { padding: 25px; }
            .info-section { margin-bottom: 20px; }
            .section-title { font-size: 11px; font-weight: 700; color: #374151; text-transform: uppercase; margin-bottom: 12px; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .info-item { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; }
            .info-label { font-size: 10px; color: #6b7280; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
            .info-value { font-size: 14px; color: #1f2937; font-weight: 600; }
            .status-badge { display: inline-flex; align-items: center; gap: 12px; padding: 16px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; text-transform: uppercase; }
            .status-livré { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
            .status-en-route { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; }
            .footer { text-align: center; padding: 40px; color: #6b7280; font-size: 12px; border-top: 2px solid #e5e7eb; background: #fafafa; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BridgeTN - ${t('clientSheet')}</h1>
              <p>${t('trackingCode')}: ${client.codeT || 'N/A'}</p>
            </div>
            <div class="client-info">
              <div class="info-section">
                <div class="section-title">${t('recipientInformation')}</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">${t('name')}</div>
                    <div class="info-value">${client.nomR || 'N/A'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t('phone')}</div>
                    <div class="info-value">${client.TelR || 'N/A'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t('address')}</div>
                    <div class="info-value">${client.adresseR || 'N/A'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t('itemCount')}</div>
                    <div class="info-value">${client.nb_box || 'N/A'}</div>
                  </div>
                </div>
              </div>
              <div class="info-section">
                <div class="section-title">${t('packageDetails')}</div>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">${t('weight')}</div>
                    <div class="info-value">${client.weight || '0'} kg</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t('payment')}</div>
                    <div class="info-value">${client.paid ? t('paid') : t('toPay')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>BridgeTN - ${t('clientSheet')} | ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open('', '_blank')
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }

    const getCityColor = (city) => {
      return localStorage.getItem(`pdfColor_${city}`) || '#1e40af'
    }

    const setCityColor = (city, color) => {
      localStorage.setItem(`pdfColor_${city}`, color)
    }

    onMounted(() => {
      loadLanguagePreference()
      loadClients()
    })

    return { 
      tripID,
      selectedClient,
      clients,
      loading,
      currentLang,
      t,
      route,
      handleLanguageChange,
      loadClients,
      markAsDelivered,
      downloadClientPDF,
      getCityColor,
      setCityColor,
      ProfileHeaderComponent
    }
  }
}
</script>


<style scoped>
  /* ... (rest of the styles remains the same) */
  .animate-in { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>