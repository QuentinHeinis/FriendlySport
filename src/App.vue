<template>
<div class="content">
    <header class="h-16 fixed top-0 left-0 right-0 flex items-center bg-black bg-opacity-70 z-30" :class="!logged && 'bg-transparent'">
        <div class="flex w-full px-3 justify-between">
            <RouterLink to="/">
                <HomeIcon class="h-8 fill-white" v-if="logged"></HomeIcon>
            </RouterLink>
            <div class="h-8  w-8 flex flex-col justify-evenly hover:cursor-pointer" @click="Menuopen = !Menuopen" v-if="logged">
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
                  <RouterLink :to="{name: 'ProfilView', params:{id:userInfo[0].uid}}" @click="Menuopen = !Menuopen">Mon profil - {{login}}</RouterLink>
              </li>
                  <!-- {name:'Profil', params:{id:user.id}} -->
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
                  <RouterLink to="/Contact" @click="Menuopen = !Menuopen">Nous Contacter</RouterLink>
              </li>
              <li>
                  <RouterLink to="/" @click="onDcnx(), Menuopen =!Menuopen">déconnexion</RouterLink>
              </li>
          </ul>
      </nav>
    </header>

    <main class="bg-Dark_gray min-h-screen h-fit w-screen">
        <RouterView v-if="logged"/>
        <LoginView v-if="!logged"></LoginView>
    </main>
</div>
</template>

<script>
import { ArrowLeftIcon, HomeIcon } from "@heroicons/vue/solid"
import Logo from "./components/Logo.vue"
import router from "./router"
import LoginView from "./views/LoginView.vue"
import btn from './components/buttons/btn.vue'
import { emitter } from "./main.js"
import {
getFirestore,
collection,
onSnapshot,
query,
where
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

import {
getAuth,
signOut
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'

export default {
  components: {ArrowLeftIcon, HomeIcon, Logo, LoginView,  btn},
  data(){
      return{
        Menuopen:false,
        user:{
            password:null,
            email:null,
            login:null,
            id:null,
        },
        login:'',
        logged:false,  
        userInfo:null,
        isAdmin:false
      }
  },
  mounted(){
    this.getUserConnect();


    emitter.on('connectUser', e =>{
      this.user = e.user;
      console.log('App => Reception user connecté', this.user);
      this.getUserInfo(this.user);
    })
    emitter.on('deConnectUser', e =>{
      this.user = e.user;
      console.log('App => Reception user deconnecté', this.user);
      this.userInfo = null,
      this.isAdmin = false,
      this.logged = false
    })
  },
  methods:{
        async getUserConnect(){
        await getAuth().onAuthStateChanged(function(user){
            if(user){
                this.user = user;
                this.getUserInfo(this.user);
            }
        }.bind(this));
        },
        async getUserInfo(user){
        const firestore = getFirestore();
        const dbUsers = collection(firestore, "user");
        const q = query(dbUsers, where("uid", "==", user.uid));
        await onSnapshot(q, (snapshot)=>{
            this.userInfo = snapshot.docs.map(doc=>({
            id:doc.id, ...doc.data()
            }));
            // console.log("userInfo", this.userInfo);
            this.login = this.userInfo[0].login;
            this.isAdmin = this.userInfo[0].admin;
            this.logged = true;
            // const storage = getStorage();
            // const spaceRef = ref(storage, 'users/'+this.userInfo[0].avatar);
            // getDownloadURL(spaceRef)
            // .then((url)=>{
            //     this.avatar = url;
            // })
            // .catch((error)=>{
            //     console.log('erreur downloadUrl', error);
            // })
        });
        },
        onDcnx(){
            signOut(getAuth())
            .then(response =>{
                this.message = "User non connecté";
                this.user = {
                    email:null,
                    password:null
                };
                emitter.emit('deConnectUser', {user:this.user});
            })
            .catch(error=>{
                console.log('erreur deconnexion', error);
            })
        },
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