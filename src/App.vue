<template>
<div class="content">
    <header class="h-16 fixed top-0 left-0 right-0 flex items-center bg-black bg-opacity-70 z-30">
        <div class="flex w-full px-3 justify-between">
            <RouterLink to="/">
                <HomeIcon class="h-8 fill-white"></HomeIcon>
            </RouterLink>
            <div class="h-8  w-8 flex flex-col justify-evenly hover:cursor-pointer" @click="Menuopen = !Menuopen">
                <span class="w-8 h-1 bg-white rounded-md"></span>
                <span class="w-8 h-1 bg-white rounded-md"></span>
                <span class="w-8 h-1 bg-white rounded-md"></span>
            </div>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 z-50">
            <Logo></Logo>
        </div>
        
        <nav class="absolute top-0 h-screen flex flex-col bg-Dark_gray opacity-1 w-full z-40" v-if="Menuopen" >
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
              <li>
                  <div @click="onDcnx()">déconnexion</div>
              </li>
          </ul>
      </nav>
    </header>

    <main class="bg-Dark_gray min-h-screen h-fit w-screen">
        <RouterView v-if="logged"/>
        <form @submit.prevent="onCnx()" class="w-4/5 m-auto mt-4" v-if="!logged && !SignIn">
            <div class="mb-3 flex rounded-sm overflow-hidden">            
                <div class="h-full bg-white text-black p-1 w-1/4 min-w-fit">
                    <span>Email :</span>
                </div>
                <input type="text" class="w-full" v-model="user.email" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden">
                <div class="bg-white text-black p-1 w-1/4 min-w-fit">
                    <span>Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="user.password" required />
            </div>
            <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
            {{ message }}
            </div>
            <div class="text-white font-oswald flex justify-evenly">
            <button class="text-center  font-light text-xs"  @click="SignIn=!SignIn">
                Créer un compte
            </button>
            <button type="submit"><btn>Connexion</btn></button>
            </div>
        </form>
        <form @submit.prevent="onCreate()" class="w-4/5 m-auto mt-4" v-if="!logged && SignIn">
            <div class="mb-3 flex rounded-sm overflow-hidden">            
                <div class="h-full bg-white text-black p-1 w-1/4 min-w-fit">
                    <span>Email :</span>
                </div>
                <input type="text" class="w-full" v-model="user.email" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden">
                <div class="bg-white text-black p-1 w-1/4 min-w-fit">
                    <span>Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="user.password" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden" >
                <div class="bg-white text-black p-1 w-1/4 min-w-fit">
                    <span>Répéter le Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="user.password2" required />
            </div>
            <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
            {{ message }}
            </div>
            <div class="text-white font-oswald flex justify-evenly">
            <button class="text-center  font-light text-xs" @click="SignIn=!SignIn">
                Se Connecter
            </button>
            <button type="submit"><btn>Créer</btn></button>
            </div>
        </form>
    </main>
</div>
</template>

<script>
import { ArrowLeftIcon, HomeIcon } from "@heroicons/vue/solid"
import Logo from "./components/Logo.vue"
import router from "./router"
import LoginView from "./views/LoginView.vue"
import btn from './components/buttons/btn.vue'
import {
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    inMemoryPersistence,
    GoogleAuthProvider,
    signInWithRedirect,
    signOut,
    setPersistence, 
    onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'

export default {
  components: {ArrowLeftIcon, HomeIcon, Logo, LoginView,  btn},
  data(){
      return{
          Menuopen:false,
          SignIn:false,
          user:{
              password:null,
              email:null,
              password2:null,
          },
          message:null,
          logged:true,
      }
  },
  methods:{
        onCnx(){
            signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
            .then((response)=>{
                console.log('user connecté', response.user);
                this.user = response.user;
                this.message = "User connecté : " +this.user.email;
                this.logged = true;
            })
            .catch((error)=>{
                console.log('erreur de connexion', error);
                this.message = "Erreur d'authentification";
            })
        },
        onDcnx(){
            signOut(getAuth())
            .then(response =>{
                this.user = getAuth().currentUser;
                this.user = {
                    email:null,
                    password:null,
                };
                console.log("User deconnecté ", this.user);
                this.message = 'User non connecté';
                this.Menuopen = !this.Menuopen;
                this.logged = false;
            })
            .catch(error=>{
                console.log('erreur deconnexion', error);
            })
        },
        onCreate(){
            if(this.user.password===this.user.password2){
                createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
                    .then((response) => {
                        // Signed in 
                        const user = response.user;
                        // ...
                    })
                    .catch((error) => {
                        console.log('erreur création', error);
                        this.message = "erreur de création";
                        // ..
               })
            }else{
                this.message = "password pas cohérent"
                console.log('mdp mauvais')
            }
        },

        keepLogin(){
          if(this.keeper = true){
              setPersistence(auth, inMemoryPersistence)
              .then(() =>{
                  const provider = new GoogleAuthProvider();
                  return signInWithRedirect(auth,  provider);
              })
              .catch((error) => {
                  console.log('erreurCode : '+ error.code);
                  console.log('error message : ' + error.message);
                  this.message = 'error message : ' + error.message;
              })
          }  
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