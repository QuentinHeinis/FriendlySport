<template>
<form @submit.prevent="onCnx()" class="w-4/5 m-auto mt-4" v-if="!SignIn">
            <div class="mb-3 flex rounded-sm overflow-hidden">            
                <div class="h-full bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Email :</span>
                </div>
                <input type="text" class="w-full" v-model="user.email" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden">
                <div class="bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="user.password" required />
            </div>
            <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
            {{ message }}
            </div>
            <div class="text-white font-oswald flex justify-evenly">
            <button class="text-center  font-light text-xs" type="button"  @click="SignIn=!SignIn">
                Créer un compte
            </button>
            <button type="submit"><btn>Connexion</btn></button>
            </div>
        </form>
        <form @submit.prevent="onCreate()" class="w-4/5 m-auto mt-4" v-if="SignIn">
            <div class="mb-3 flex rounded-sm overflow-hidden">            
                <div class="h-full bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Login :</span>
                </div>
                <input type="text" class="w-full" v-model="user.login" required />
            </div>
            <div class="mb-3 flex rounded-sm overflow-hidden">            
                <div class="h-full bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Email :</span>
                </div>
                <input type="text" class="w-full" v-model="user.email" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden">
                <div class="bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="user.password" required />
            </div>
            <div class="flex mb-3 rounded-sm overflow-hidden" >
                <div class="bg-slate-200 text-black p-1 w-1/4 min-w-fit">
                    <span>Répéter le Mot de passe :</span>
                </div>
                <input type="password" class="w-full" v-model="password2" required />
            </div>
            <div class="bg-yellow-100 text-center mb-3 py-2" v-if="message!=null" >
            {{ message }}
            </div>
            <div class="text-white font-oswald flex justify-evenly">
            <button class="text-center  font-light text-xs" type="button" @click="SignIn=!SignIn">
                Se Connecter
            </button>
            <button type="submit"><btn>Créer</btn></button>
            </div>
        </form>
</template>

<script>
import {emitter} from '../main.js'
import { 
    getFirestore,   // Obtenir le Firestore
    collection,     // Utiliser une collection de documents
    doc,            // Obtenir un document par son id
    getDocs,        // Obtenir la liste des documents d'une collection
    getDoc,
    
    addDoc,         // Ajouter un document à une collection
    updateDoc,      // Mettre à jour un document dans une collection
    deleteDoc,      // Supprimer un document d'une collection
    onSnapshot,     // Demander une liste de documents d'une collection, en les synchronisant
    query,          // Permet d'effectuer des requêtes sur Firestore
    orderBy         // Permet de demander le tri d'une requête query
    } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
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
import { RouterLink } from 'vue-router';
import btn from '../components/buttons/btn.vue';
export default {
    components:{btn},
    data(){
        return{
            SignIn:false,
            user:{
                password:null,
                email:null,
                login:null,
            },
            password2:null,
            message:null,
        }
    },
    methods:{
        // onCnx(){
        //     signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
        //     .then((response)=>{
        //         console.log('user connecté', response.user);
        //         this.user = response.user;
        //         this.message = "User connecté : " +this.user.email;
        //     })
        //     .catch((error)=>{
        //         console.log('erreur de connexion', error);
        //         this.message = "Erreur d'authentification";
        //     })
        // },
        onCnx(){
            signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
            .then((response) =>{
                this.user = response.user;
                console.log("user", this.user);
                emitter.emit('connectUser', {user: this.user});
                this.message = "user connecté : " + this.user.email;
            })
            .catch((error)=>{
                console.log('erreur connexion', error);
                this.message = "erreur d'authentification";
            })
        },
        onCreate(){
            if(this.user.password===this.password2){
                createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
                    .then((response) => {
                        // Signed in 
                        const user = response.user;
                        this.writeUserData(user);
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
        async writeUserData(user){
                const firestore = getFirestore();
                const dbUser = collection(firestore, "user");
                const docRef = await addDoc(dbUser,{
                    login: this.user.login,
                    email:this.user.email,
                    uid: user.uid,
                    admin:false
                })
                console.log('document créé avec le id : ', docRef.id);
                emitter.emit('connectUser', {user: this.user}); 
        }
    },
}
</script>

<style>

</style>