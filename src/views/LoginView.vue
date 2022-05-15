<template>
    <form @submit.prevent="onCnx()" class="w-4/5 m-auto">
        <div class="mb-3 flex rounded-sm overflow-hidden">            
            <div class="h-full bg-white text-black p-1 w-1/4">
                <span>Email :</span>
            </div>
            <input type="text" class="w-full" v-model="user.email" required />
        </div>
        <div class="flex mb-3 rounded-sm overflow-hidden">
            <div class="bg-white text-black p-1 w-1/4">
                <span>Mot de passe :</span>
            </div>
            <input type="password" class="w-full" v-model="user.password" required />
        </div>
        <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
        {{ message }}
        </div>
        <div class="text-white">
        <button variant="dark" class="text-center w-full" type="submit">
            Connexion
        </button>
        </div>
    </form>
</template>

<script>
import {
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
import { RouterLink } from 'vue-router';
export default {
    data(){
        return{
            user:{
                email:null,
                password:null,
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
        
    },
}
</script>

<style>

</style>