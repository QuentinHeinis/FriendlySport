import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import CreateEventView from '../views/CreateEventView.vue'
import MyEventView from '../views/MyEventView.vue'
import FavView from '../views/FavView.vue'
import CarteView from '../views/CarteView.vue'
import FreePremiumView from '../views/FreePremiumView.vue'
import ContactView from '../views/ContactView.vue'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/Profil', name: 'ProfilView', component: ProfilView },
    { path: '/Create', name: 'CreateEventView', component: CreateEventView },
    { path: '/MyEvent', name: 'MyEventView', component: MyEventView },
    { path: '/Favoris', name: 'FavView', component: FavView },
    { path: '/Carte', name: 'CarteView', component: CarteView },
    { path: '/FreePremium', name: 'FreePremiumView', component: FreePremiumView },
    { path: '/Contact', name: 'ContactView', component: ContactView },
    { path: '/Event/:id', name: 'EventView', component: EventView },

  ]
})

export default router


