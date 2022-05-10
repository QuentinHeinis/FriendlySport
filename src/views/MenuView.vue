<template>
  <div class="h-screen flex flex-col justify-center bg-Dark_gray">
      <nav>
          <ul class="flex flex-col gap-6 font-oswald uppercase text-lg h-full pl-14 text-white">
              <li>
                  <RouterLink to="/">Accueil</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Profil">Mon Profil</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Create">Créer un évènement</RouterLink>
              </li>
              <li>
                  <RouterLink to="/MyEvent">Mes évènements sportifs</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Favoris">Favoris</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Carte">Carte</RouterLink>
              </li>
              <li>
                  <RouterLink to="/FreePremium">Premium & Avantages</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Contact">Nous Contacter</RouterLink>
              </li>
          </ul>
      </nav>
  </div>
  <RouterView/>
</template>

<script>

import router from "../router"
export default {
    name:'MenuView',
    data(){
        return{

        }
    },

}
</script>

<style>

</style>