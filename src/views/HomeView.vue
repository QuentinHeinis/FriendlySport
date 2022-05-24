<template>
 <div class="flex flex-col items-center" v-if="ListeEvent.length < 1">
      <div v-for="i in 5" :key="i" class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2 is-loading"></div>
  </div>
  <div class="flex flex-col items-center" v-else>
    <div class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2" v-for="event in ListeEvent" :key="event.id">
      <div class="cardimg w-full h-full">
            <img :src="event.img" :alt="event.name" class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      </div>
      <div class="relative flex flex-col -top-full w-full z-10 pl-5 pt-3">
          <div class="flex flex-col">
            <div class="relative font-bebas-neue text-4xl">
              <p class="pl-[1px] text-white">{{ event.name }}</p>
              <span class="absolute -z-10 top-[1px] text-Orange">{{ event.name }}</span>
            </div>
            <div class="text-white -mt-2 pl-10">
                <span>{{event.difficulte}}</span>
            </div>
      </div>
      <div class="flex gap-5 mt-3">
        <cardbutton><RouterLink :to="{name: 'EventView', params:{id:event.id}}">Voir</RouterLink></cardbutton>
        <cardbutton>Rejoindre</cardbutton>
      </div>
    </div>
    
  </div>
  </div>
 

</template>

<script>
import cardbutton from "../components/buttons/cardbutton.vue"
import Header from "../components/Header.vue"
import CardEvent from "../components/CardEvent.vue"
import JoinBtn from "../components/buttons/btn.vue"
import {
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
    import { 
    getStorage,             // Obtenir le Cloud Storage
    ref,                    // Pour créer une référence à un fichier à uploader
    getDownloadURL,         // Permet de récupérer l'adress complète d'un fichier du Storage
    uploadString,           // Permet d'uploader sur le Cloud Storage une image en Base64
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'
export default {
    components: { Header, CardEvent, JoinBtn, cardbutton  },
    data(){
      return{
        ListeEvent:[],
        user:{
          email:null,
          password:null,
        }

      }
    },
    mounted(){
      this.getEventSynchro();
    },
    methods:{
        
        async getEventSynchro(){
          const firestore = getFirestore();
          const dbEvent = collection(firestore, "Event");
          await onSnapshot(dbEvent, (snapshot) =>{
              this.ListeEvent = snapshot.docs.map(doc =>({
                  id:doc.id, ...doc.data()
              }))
          this.ListeEvent.forEach(function(sport){
              const storage = getStorage();
              const spaceRef = ref(storage, 'imgsport/'+sport.img);
              getDownloadURL(spaceRef)
              .then((url) =>{
                  sport.img = url;
              })
              .catch((error) =>{
                  console.log('erreur download url', error);
              })
          })
          })
      },
        async deleteEvent(event){
            const firestore = getFirestore();
            const docRef = doc(firestore, "Event", event.id);
            await deleteDoc(docRef);
        },
    },
}
</script>

<style>
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
.is-loading {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
</style>