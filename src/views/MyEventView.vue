<template>
<div class="contact px-9">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Les évènements de {{creator}}</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Les évènements de {{creator}}</span>  
    </div>
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
      </div>
    </div>
    
  </div>
  </div>
</div>

</template>

<script>
import { 
    getFirestore, 
    collection, 
    where,
    doc, 
    getDoc,
    getDocs,
    updateDoc, 
    onSnapshot, 
    query,
    orderBy
    } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
import { 
    getStorage, 
    ref, 
    getDownloadURL,
    uploadString,
    deleteObject} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'
import {
getAuth
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
import cardbutton from "../components/buttons/cardbutton.vue"
import CardEvent from "../components/CardEvent.vue"
import JoinBtn from "../components/buttons/btn.vue"
export default {
    name:'MyEventView',
    data(){
      return{
        userevent:[],
        ListeEvent:[],
        creator:null
      }
    },
    components:{CardEvent, JoinBtn, cardbutton },
    mounted(){
      this.getEvent(this.$route.params.id);
    },
    methods:{
      async getEvent(uid) {
            const firestore = getFirestore();
            const dbUsers = collection(firestore, "user");
            const q = query(dbUsers, where("uid", "==", uid));
            await onSnapshot(q, (snapshot) => {
                let user = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.creator = user[0].login;
                this.userevent = user[0].events;
                this.userevent.forEach((event)=>{
                  this.pushEvents(event)
                })
            });
        },
        async pushEvents(event){
          let evenement;
          const firestore = getFirestore();
          const docRef = doc(firestore, "Event", event);
          this.refEvent = await getDoc(docRef);
          if(this.refEvent.exists()){
              evenement = this.refEvent.data();
              evenement.id = event;
          }else{
              this.console.log("Event non existant");
          }
          const storage = getStorage();
          const spaceRef = ref(storage, 'imgsport/'+evenement.img);
          await getDownloadURL(spaceRef)
          .then((url)=>{
              evenement.img = url;
          })
          .catch((error) => {
              console.log('erreur downloadurl', error);
          })
          this.ListeEvent.push(evenement)
        },
    }
}
</script>
