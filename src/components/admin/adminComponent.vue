<template>
  <div class="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased pb-20">
    
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
      <div class="mx-auto max-w-4xl flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-indigo-200 shadow-lg">
            <Package :size="20" class="text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-800">Bridge<span class="text-indigo-600">TN</span></span>
          <div class="bg-indigo-600 p-2 rounded-xl text-white">
            <ShieldCheck :size="16" />
          </div>
          <span class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Administration</span>
        </div>
        <div class="flex items-center gap-3">
          <button @click="showCreateModal = true" 
            class="bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg">
            <UserPlus :size="16" /> Nouveau Compte
          </button>
          <button @click="handleLogout"
            class="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium flex items-center gap-2">
            <LogOut :size="18" />
            Déconnexion
          </button>
        </div>
      </div>
    </nav>

    <div class="mx-auto max-w-4xl px-6 mt-12">
      
      <header class="mb-12">
        <h1 class="text-5xl font-black tracking-tighter mb-3">Gestion Utilisateurs</h1>
        <p class="text-slate-400 font-bold">Gérez les accès administrateurs et les comptes transporteurs.</p>
      </header>

      <div class="space-y-4">
        <div v-for="user in users" :key="user.id" 
          class="group bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4">
          
          <div class="flex items-center gap-5">
            <div :class="[user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600', 'w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl']">
              {{ user.mail.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="font-black text-lg tracking-tight">{{ user.mail }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span :class="[user.role === 'ADMIN' ? 'text-indigo-500' : 'text-emerald-500', 'text-[10px] font-black uppercase tracking-widest']">
                  {{ user.role }}
                </span>
                <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span class="text-[10px] font-bold text-slate-300">ID: #{{ user.id }}</span>
                <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span class="text-[10px] font-bold text-black">Créé le: {{ new Date(user.created_at).toLocaleDateString('fr-FR') }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" @click="editUser(user)" class="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
              <Edit3 :size="18" />
            </button>
            <button @click="deleteUser(user.id)" class="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="users.length === 0" class="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
        <Users :size="48" class="mx-auto text-slate-200 mb-4" />
        <p class="text-slate-400 font-bold text-lg">Aucun utilisateur trouvé.</p>
      </div>

    </div>

    <div v-if="showCreateModal" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" @click="showCreateModal = false"></div>
      
      <div class="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <header class="mb-8">
          <h2 class="text-3xl font-black tracking-tighter">{{ editingUserId ? 'Modifier' : 'Créer' }} un compte</h2>
          <p class="text-slate-400 font-bold text-sm">Remplissez les accès pour le nouveau membre.</p>
        </header>

        <form @submit.prevent="editingUserId ? updateUser() : createUser()" class="space-y-6">
          <div>
            <label class="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2 block tracking-widest">Adresse Mail</label>
            <input v-model="form.mail" type="email" placeholder="nom@bridge.tn"
              class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 font-black outline-none transition-all" />
          </div>

          <div>
            <label class="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2 block tracking-widest">Mot de passe</label>
            <input v-model="form.mdp" type="password" placeholder="••••••••"
              class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 font-black outline-none transition-all" />
          </div>

          <div>
            <label class="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2 block tracking-widest">Rôle Privilège</label>
            <select v-model="form.role" 
              class="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 font-black outline-none transition-all appearance-none">
              <option value="TRANSPORTEUR">Transporteur (GP)</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          <div class="pt-4 flex gap-4">
            <button type="button" @click="showCreateModal = false"
              class="flex-1 py-4 font-black text-slate-400 text-sm">Annuler</button>
            <button type="submit" 
              class="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all">
              {{ editingUserId ? 'Modifier' : 'Confirmer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '../../api/axios.js'
import { ShieldCheck, UserPlus, Trash2, Edit3, Users, LogOut, Package } from 'lucide-vue-next'

const showCreateModal = ref(false)
const users = ref([])
const form = ref({
  mail: '',
  mdp: '',
  role: 'TRANSPORTEUR'
})
const editingUserId = ref(null)
const isLoading = ref(false)

const createUser = async () => {
  if (!form.value.mail || !form.value.mdp) return
  
  isLoading.value = true
  
  try {
    const response = await apiService.auth.register(form.value)
    
    if (response.data.success) {
      // Reset form
      form.value = {
        mail: '',
        mdp: '',
        role: 'TRANSPORTEUR'
      }
      showCreateModal.value = false
      
      // Refresh users list
      await fetchUsers()
      alert('Utilisateur créé avec succès!')
    } else {
      alert(response.data.error || 'Échec de la création')
    }
  } catch (error) {
    console.error('Create user error:', error)
    alert('Échec de la création')
  } finally {
    isLoading.value = false
  }
}

const deleteUser = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
    return
  }
  
  try {
    const response = await apiService.users.delete(id)
    
    if (response.data.success) {
      await fetchUsers()
      alert('Utilisateur supprimé avec succès!')
    } else {
      alert(response.data.error || 'Échec de la suppression')
    }
  } catch (error) {
    console.error('Delete user error:', error)
    alert('Échec de la suppression')
  }
}

const updateUser = async () => {
  if (!form.value.mail || !form.value.mdp) return
  
  isLoading.value = true
  
  try {
    const response = await apiService.users.update(editingUserId.value, form.value)
    
    if (response.data.success) {
      // Reset form
      form.value = {
        mail: '',
        mdp: '',
        role: 'TRANSPORTEUR'
      }
      editingUserId.value = null
      showCreateModal.value = false
      
      // Refresh users list
      await fetchUsers()
      alert('Utilisateur modifié avec succès!')
    } else {
      alert(response.data.error || 'Échec de la modification')
    }
  } catch (error) {
    console.error('Update user error:', error)
    alert('Échec de la modification')
  } finally {
    isLoading.value = false
  }
}

const fetchUsers = async () => {
  try {
    const response = await apiService.users.getAll()
    
    if (response.data.success) {
      users.value = response.data.data
    }
  } catch (error) {
    console.error('Fetch users error:', error)
  }
}

const editUser = (user) => {
  form.value = {
    mail: user.mail,
    mdp: '',
    role: user.role
  }
  editingUserId.value = user.id
  showCreateModal.value = true
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

onMounted(() => {
  fetchUsers()
})
</script>