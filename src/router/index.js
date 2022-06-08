import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/profil/ProfilView.vue'
import EditProfilView from '../views/profil/editProfilView.vue'
import CreateEventView from '../views/CreateEventView.vue'
import MyEventView from '../views/MyEventView.vue'
import FavView from '../views/FavView.vue'
import CarteView from '../views/CarteView.vue'
import ContactView from '../views/ContactView.vue'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/Profil/:id', name: 'ProfilView', component: ProfilView },
    { path: '/EditProfil/:id', name: 'EditProfilView', component: EditProfilView },
    { path: '/Create', name: 'CreateEventView', component: CreateEventView },
    { path: '/MyEvent/:id', name: 'MyEventView', component: MyEventView },
    { path: '/Favoris', name: 'FavView', component: FavView },
    { path: '/Carte', name: 'CarteView', component: CarteView },
    { path: '/Contact', name: 'ContactView', component: ContactView },
    { path: '/Event/:id', name: 'EventView', component: EventView },

  ]
})

export default router


