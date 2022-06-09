<template>
 <div class="flex flex-col items-center" v-if="ListeEvent.length < 1">
      <div v-for="i in 5" :key="i" class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2 is-loading"></div>
  </div>
  <div class="flex flex-col items-center" v-else>
    <div class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2" v-for="event in sortRecent" :key="event.date">
      <div class="cardimg w-full h-full">
            <img :src="event.img" :alt="event.name" class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      </div>
      <div class="relative  flex flex-col -top-full w-full z-10 pl-5 py-3 justify-between h-full">
          <div>
                <div class="relative font-bebas-neue text-4xl">
                  <p class="pl-[1px] text-white">{{ event.name }}</p>
                  <span class="absolute -z-10 top-[1px] text-Orange">{{ event.name }}</span>
                </div>
          </div>
          <div>
            <div class="flex pl-2">
              <div class="text-white ">
                <span>{{event.date}}</span>
              </div>
              <div class="text-white  pl-5">
                  <span>{{event.difficulte}}</span>
              </div>
            </div>
          </div>
          <div class="flex w-fit">
            <cardbutton><RouterLink :to="{name: 'EventView', params:{id:event.id}}">Voir</RouterLink></cardbutton>
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
        },
        date:null,
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
    },
    computed:{
      orderByDate: function () {
      return this.ListeEvent.sort(function (a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    },
    sortRecent:function(){
      return this.orderByDate.filter(function(event){
        return event.date >= new Date().toJSON().slice(0,10);
      })
    }
    }
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

  .cardimg:after{
  content: '';
    width: 100%;
    height: 100%;
    z-index: 100;
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .3) 60%, rgba(0, 0, 0, 0) 100%);
    position: absolute;
    z-index: 1;
}
</style>