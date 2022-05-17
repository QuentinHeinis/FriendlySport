<template>
    <form @submit.prevent="onCnx()" class="w-4/5 m-auto mt-4">
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
        <div class="flex mb-3 rounded-sm overflow-hidden" v-if="SignIn">
            <div class="bg-white text-black p-1 w-1/4 min-w-fit">
                <span>Répéter le Mot de passe :</span>
            </div>
            <input type="password" class="w-full" v-model="user.password2" required />
        </div>
        <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
        {{ message }}
        </div>
        <div class="text-white font-oswald flex justify-evenly">
        <button class="text-center  font-light text-xs" type="submit" @click="SignIn=!SignIn" v-if="!SignIn">
            Créer un compte
        </button>
        <button class="text-center  font-light text-xs" type="submit" @click="SignIn=!SignIn" v-if="SignIn">
            Se Connecter
        </button>
        <button  v-if="!SignIn" @click="onCnx()"><btn>Connexion</btn></button>
        <button  v-if="SignIn" @click="onCreate()"><btn>Créer</btn></button>
        </div>
    </form>
</template>

<script>
import {
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut, 
    onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
import { RouterLink } from 'vue-router';
import btn from '../components/buttons/btn.vue';
export default {
    components:{btn},
    data(){
        return{
            SignIn:false,
            user:{
                email:null,
                password:null,
                password2:null,
            },
            message:null,
        }
    },
    methods:{
        onCnx(){
            signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
            .then((response)=>{
                console.log('user connecté', response.user);
                this.user = response.user;
                this.message = "User connecté : " +this.user.email;
                
            })
            .catch((error)=>{
                console.log('erreur de connexion', error);
                this.message = "Erreur d'authentification";
            })
        },
        
        onCreate(){
            if(this.user.password==this.user.password2){
                createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
                    .then((response) => {
                        // Signed in 
                        const user = response.user;
                        // ...
                    })
                    .catch((errorr) => {
                        console.log('erreur création', errorr);
                        this.message = "erreur de création";
                        // ..
               })
               signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
            .then((response)=>{
                console.log('user connecté', response.user);
                this.user = response.user;
                this.message = "User connecté : " +this.user.email;
                
            })
            .catch((error)=>{
                console.log('erreur de connexion', error);
                this.message = "Erreur d'authentification";
            })
            }else{
                this.message = "password pas cohérent"
                console.log('mdp mauvais')
            }
        }
    },
}
</script>

<style>

</style>