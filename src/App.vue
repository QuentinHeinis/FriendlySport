<template>
<div class="content">
    <header class="h-16 fixed top-0 left-0 right-0 flex items-center bg-black bg-opacity-70 z-30">
        <div class="absolute left-3">
              <ArrowLeftIcon class="h-8 fill-white hover:cursor-pointer" @click="$router.go(-1)"></ArrowLeftIcon>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 z-50">
            <Logo></Logo>
        </div>
        <div class="flex gap-3 absolute right-3">
            <RouterLink to="/">
                <HomeIcon class="h-8 fill-white"></HomeIcon>
            </RouterLink>
            
            
                <div class="h-8  w-8 flex flex-col justify-evenly hover:cursor-pointer" @click="Menuopen = !Menuopen">
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                   
                </div>
            
        </div>
        <nav class="absolute top-0 h-screen flex flex-col bg-Dark_gray opacity-1 w-screen z-40" v-if="Menuopen" >
        <div class=" absolute right-3 top-4 h-8  w-8 flex flex-col justify-evenly hover:cursor-pointer"  @click="Menuopen = !Menuopen">
          <span class="w-8 h-1 bg-white rounded-md rotate-45"></span>
          <span class="w-8 h-1 bg-white rounded-md rotate-[135deg] absolute"></span>
        </div>
          <ul class="flex flex-col gap-6 font-oswald uppercase text-lg h-full pl-14 text-white justify-center">
              <li>
                  <RouterLink to="/" @click="Menuopen = !Menuopen">Accueil</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Profil" @click="Menuopen = !Menuopen">Mon Profil</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Create" @click="Menuopen = !Menuopen">Créer un évènement</RouterLink>
              </li>
              <li>
                  <RouterLink to="/MyEvent" @click="Menuopen = !Menuopen">Mes évènements sportifs</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Favoris" @click="Menuopen = !Menuopen">Favoris</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Carte" @click="Menuopen = !Menuopen">Carte</RouterLink>
              </li>
              <li>
                  <RouterLink to="/FreePremium" @click="Menuopen = !Menuopen">Premium & Avantages</RouterLink>
              </li>
              <li>
                  <RouterLink to="/Contact" @click="Menuopen = !Menuopen">Nous Contacter</RouterLink>
              </li>
          </ul>
      </nav>
    </header>

    <main class="bg-Dark_gray min-h-screen h-fit w-screen">
        <RouterView/>
    </main>
</div>
</template>

<script>
import { ArrowLeftIcon, HomeIcon } from "@heroicons/vue/solid"
import Logo from "./components/Logo.vue"
import router from "./router"

export default {
  components: {ArrowLeftIcon, HomeIcon, Logo},
  data(){
      return{
          Menuopen:false,
      }
  },
  
} 
</script>

<style>
main, header{
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
}
main{
    
    padding-top: 64px;
}

</style>