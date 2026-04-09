import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Set page title and meta
document.title = 'BridgeTN - Transport & Logistics Management'

// Create and mount app
createApp(App).use(router).mount('#app')
