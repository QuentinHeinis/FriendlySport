<template>
  <div class="relative h-screen overflow-hidden -mt-16">
      <div class="w-full">
          <img :src="event.img" :alt="event.name" class="w-full h-auto">
      </div>
      <div class="font-oswald text-base text-white min-h-[50vh] w-full bg-Dark_gray absolute bottom-0 rounded-t-3xl justify-between flex flex-col py-10 px-9">
            <div class="flex justify-between">
                <div>
                    <div class="relative font-bebas-neue text-4xl z-10">
                        <h1 class="pl-[1px] text-white">{{ event.name }}</h1>
                        <span class="absolute -z-10 top-[1px] text-Orange">{{ event.name }}</span>
                    </div>
                    <p class=" pl-2 first-letter:uppercase">{{event.difficulte}}</p>
                </div>
                <div class="flex gap-2">
                    <CalendarIcon class="h-6 w-6"/>
                    <p>{{event.date}}</p>
                </div>
            </div>

            <div class="pt-7">
                <p class="font-light first-letter:uppercase">{{event.desc}}</p>
            </div>
            <div>
                <RouterLink :to="{name: 'ProfilView', params:{id:creator.uid}}" class="flex items-center font-light gap-1">
                    <img :src="creator.image" :alt="creator.login" class="w-16 h-16 rounded-full object-cover">
                    <p>Par {{creator.login}}</p>
                </RouterLink>
                <div class="flex justify-between">
                    <div class="flex items-center gap-4 pl-9 relative z-20">
                        <p>{{personnes}} / {{event.nombre}}</p> 
                        <UserGroupIcon class="w-8 h-8"/>
                        <button v-if="user.joined || (creator.uid == user.uid)" @click="chatOpen=!chatOpen, getDiscussion()"><AnnotationIcon class="w-8 h-8"/></button>
                    </div>
                    <btn class="w-fit"  v-if="!user.joined && user.canJoin" @click.prevent="userJoined(this.$route.params.id)">Rejoindre</btn>
                    <btn class="w-fit" v-if="user.joined && user.canLeave" @click.prevent="userLeave(this.$route.params.id)">Quitter</btn>
                </div>
            </div>
     </div>
        <div v-if="chatOpen" class="absolute bg-Dark_gray w-full bottom-0 h-[80vh] z-10 rounded-t-3xl py-6 px-6 flex flex-col gap-3">
            <div class="overflow-y-scroll h-[70%] py-5 px-3 overflow-x-hidden flex flex-col gap-3"  v-if="chatData.length > 0">
                <div v-for="msg in orderByDate" :key="msg.contenu" class="w-full flex-col gap-3 flex">
                    
                    
                    <p v-if="msg.by.uid == user.uid" class="w-fit max-w-[50%] h-max bg-Orange rounded-xl px-4 flex items-center z-10 bulledroite relative self-end">
                        {{msg.contenu.msg}}
                    </p>
                    <div v-else>
                        <p class="text-white text-xs pl-5 pb-2">{{msg.by.login}}</p>
                        <p  class="w-fit max-w-[50%] h-max bg-white rounded-xl px-4 flex items-center bullegauche relative">
                        {{msg.contenu.msg}}
                    </p>
                    </div>
                </div>
                <div v-for="msg in chatData" :key="msg.contenu" class="self-end flex">
                    
                </div>
            </div>
            <form @submit.prevent="discussion" class="flex">
                <textarea class="w-full min-h-[30px] px-2" placeholder="Envoyer un message" v-model="message"></textarea>
                <button class="w-fit h-full bg-white to-black px-3" type="submit">envoyer</button>
            </form>
        </div>    
  </div>
  
</template>

<script>
import btn from '../components/buttons/btn.vue'
import { CalendarIcon, UserGroupIcon, AnnotationIcon } from '@heroicons/vue/outline'
// Bibliothèque Firestore : import des fonctions
import { 
    getFirestore,   // Obtenir le Firestore
    collection,     // Utiliser une collection de documents
    doc,            // Obtenir un document par son id
    getDocs,        // Obtenir la liste des documents d'une collection
    getDoc,
    where,
    arrayUnion,
    arrayRemove,
    addDoc,         // Ajouter un document à une collection
    updateDoc,      // Mettre à jour un document dans une collection
    deleteDoc,      // Supprimer un document d'une collection
    onSnapshot,     // Demander une liste de documents d'une collection, en les synchronisant
    query,          // Permet d'effectuer des requêtes sur Firestore
    orderBy         // Permet de demander le tri d'une requête query
    } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

import {
  getAuth
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
// Cloud Storage : import des fonctions
import { 
    getStorage,             // Obtenir le Cloud Storage
    ref,                    // Pour créer une référence à un fichier à uploader
    deleteObject,
    getDownloadURL,         // Permet de récupérer l'adress complète d'un fichier du Storage
    uploadString,           // Permet d'uploader sur le Cloud Storage une image en Base64
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'
export default {
    name:'EventView',
    data(){
        return{
            personnes:null,
            refEvent:null,
            event:{
                name:null,
                img:null,
                desc:null,
                difficulte:null,
                date:null,
                nombre:null,
                creator:null,
            },
            creator:{
                login:null,
                image:null,
                uid:'uid'
            },
            user:{joined:null,
                uid:'uid',
                login:null,
                canJoin:false,
                canLeave:false,
            },
            imageData:null,
            chatOpen:false,
            message:null,
            chatData:{msg:null,
                de:null},
            date: ' ',
        }
    },
    components:{CalendarIcon, UserGroupIcon, AnnotationIcon, btn},
    mounted(){
        this.getEvent(this.$route.params.id);
        this.user.uid = getAuth().currentUser.uid;
        setInterval(() => this.getHour(), 1000);
    },
    methods:{
        
        async getUser(uid){
            const firestore = getFirestore();
            const dbUsers = collection(firestore, "user");
            const q = query(dbUsers, where("uid", "==", uid));            
            await onSnapshot(q, (snapshot) => {
                let user = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.user.login = user[0].login;
                if(user[0].participe.includes(this.$route.params.id)){
                    this.user.joined = true;
                }else{
                    this.user.joined = false;
                }
                
                if(getAuth().currentUser.uid === this.creator.uid){
                    this.user.canLeave = false;
                }else {
                    this.user.canJoin = true;
                    this.user.canLeave = true;
                }
                if(this.personnes == this.event.nombre){
                        this.user.canJoin = false;
                        this.user.canLeave = true;
                }
                
                })
        },
        
        async userLeave(id){
            const firestore = getFirestore();
            const docRef = doc(firestore, "Event", id);
            await updateDoc(docRef, {
                participants: arrayRemove(this.user.uid)
            })
            const dbUsers = query(collection(firestore, "user"), where("uid","==", this.user.uid));
            const querySnapshot = await getDocs(dbUsers);
            querySnapshot.forEach((doc)=>{
                this.LeaveMark(doc, docRef.id);
            })
            this.user.joined = false;
            this.personnes--;
        },
        async LeaveMark(document, id){
            const firestore = getFirestore();
            console.log(document.id, "=>", document.data());
            await updateDoc(doc(firestore, "user", document.id), {
                participe : arrayRemove(id)
            });
        },
        async userJoined(id){
            const firestore = getFirestore();
            const docRef = doc(firestore, "Event", id);
            console.log(docRef.id)
            await updateDoc(docRef, {
                participants: arrayUnion(this.user.uid)
            })
            const dbUsers = query(collection(firestore, "user"), where("uid","==", this.user.uid));
            const querySnapshot = await getDocs(dbUsers);
            querySnapshot.forEach((doc)=>{
                this.joineMark(doc, docRef.id);
            })
            this.user.joined = true;
            this.personnes++;
        },
        async joineMark(document, id){
            const firestore = getFirestore();
            console.log(document.id, "=>", document.data());
            await updateDoc(doc(firestore, "user", document.id), {
                participe : arrayUnion(id)
            });
        },
        async getEvent(id){
            const firestore = getFirestore();
            const docRef = doc(firestore, "Event", id);
            this.refEvent = await getDoc(docRef);
            if(this.refEvent.exists()){
                this.event = this.refEvent.data();
                this.personnes = this.event.participants.length + 1;
            }else{
                this.console.log("Event non existant");
            }
            const storage = getStorage();
            const spaceRef = ref(storage, 'imgsport/'+this.event.img);
            this.getCreator(this.event.creator, firestore);
            getDownloadURL(spaceRef)
            .then((url)=>{
                this.event.img = url;
            })
            .catch((error) => {
                console.log('erreur downloadurl', error);
            })
            
        },
        async getCreator(creator, firestore){
            const dbUsers = collection(firestore, "user");
            const q = query(dbUsers, where("uid", "==", creator));
            await onSnapshot(q, (snapshot) => {
                let user = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.creator.login = user[0].login;
                this.creator.image = user[0].image;
                this.creator.uid = user[0].uid;
                console.log("user", this.creator);
                this.getUser(getAuth().currentUser.uid);
                if(this.creator.image){
                    const storage = getStorage();
                    const spaceRef = ref(storage, "user/" + user[0].image);
                    getDownloadURL(spaceRef)
                        .then((url) => {
                        this.creator.image = url;
                    })
                        .catch((error) => {
                        console.log('erreur downloadurl', error);
                    });
                }
            });
            
        },
        async discussion(){
            let msg = {
                by:{login:this.user.login,
                uid:this.user.uid},
                contenu:{
                    msg:this.message,
                    le: this.date
                }
            }
            const firestore = getFirestore();
            const docRef = await doc(firestore, "Event", this.$route.params.id);
            await updateDoc(docRef, {
                chat:arrayUnion(msg)
            });
            this.message = null;
        },
        getHour(){
            this.date = new Date().toJSON().slice(0,10) + "-" + new Date().getHours() + "-" + new Date().getMinutes()+ "-" + new Date().getSeconds();
        },
        async getDiscussion(){
            const firestore = getFirestore();
            const dbChat = doc(firestore, 'Event', this.$route.params.id);
            await onSnapshot(dbChat, (snapshot)=>{
                    this.chatData = snapshot.data().chat;
            })
        }
        
    },
    computed:{
        orderByDate: function () {
      return this.chatData.sort(function (a, b) {
        if (a.contenu.le > b.contenu.le) return -1;
        if (a.contenu.le < b.contenu.le) return 1;
        return 0;
      });
    },
    }
}
</script>

<style>
.bullegauche::after{
content:"";
width: 25px;
height: 15px;
position: absolute;
top: 100%;
left: 0;
background: white;
border: .2px outset rgb(21 21 20) ;
-webkit-clip-path: polygon(100% 0, 0% 100%, 82% 100%);
clip-path: polygon(100% 0, 0% 100%, 82% 100%);
transform: rotate(-30deg) translate(-6px, -15px);
border: none;
}
.bulledroite::after{
content:"";
width: 25px;
height: 15px;
background: rgb(255 152 0 );
position: absolute;
top: 100%;
right: 0;
border: .2px outset rgb(21 21 20) ;
border-left: 0px ;
-webkit-clip-path: polygon(100% 0, 0% 100%, 0 18%);
clip-path: polygon(100% 0, 0% 100%, 0 18%);
transform: rotate(60deg) translate(-1px, -10px);
transform-origin: center;
}
</style>