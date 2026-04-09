import { createRouter, createWebHistory } from 'vue-router'
import LandingComponent from '../components/landing/landingComponent.vue'
import LoginComponent from '../components/login/loginComponent.vue'
import ProfileComponent from '../components/profile/profileComponent.vue'
import ColisComponent from '../components/colis/colisComponent.vue'
import ClientComponent from '../components/client/clientComponent.vue'
import voyageComponent from '../components/voyage/voyageComponent.vue'
import planningComponent from '../components/planning/planningComponent.vue'
import ViewComponent from '../components/view/viewComponent.vue'
import AdminComponent from '../components/admin/adminComponent.vue'
import AddTripComponent from '../components/addtrip/addtripComponent.vue'
import PublicProfileComponent from '../components/public/publicProfileComponent.vue'
import ShareComponent from '../components/share/shareComponent.vue'
import { requireAuth } from './guard'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/addtrip',
    name: 'AddTrip',
    component: AddTripComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/colis',
    name: 'Colis',
    component: ColisComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/voyages',
    name: 'Voyages',
    component: voyageComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/planning',
    name: 'Planning',
    component: planningComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/view',
    name: 'View',
    component: ViewComponent
  },
  {
    path: '/profil/:id',
    name: 'PublicProfile',
    component: PublicProfileComponent
  },
  {
    path: '/public',
    name: 'PublicProfileQuery',
    component: PublicProfileComponent
  },
  {
    path: '/share',
    name: 'Share',
    component: ShareComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminComponent,
    beforeEnter: (to, from, next) => {
      const redirect = requireAuth()
      if (redirect) {
        next(redirect)
      } else {
        next()
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
