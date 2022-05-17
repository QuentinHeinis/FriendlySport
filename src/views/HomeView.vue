<template>
 <div class="flex flex-col items-center" v-if="ListeEvent.length < 1">
      <div v-for="i in 5" :key="i" class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2 is-loading"></div>
  </div>
  <div class="flex flex-col items-center" v-if="ListeEvent.length > 0">
      <CardEvent v-for="event in ListeEvent" :key="event" :difficulte="event.difficulte" :name="event.name" @click.prevent="deleteEvent(event)"></CardEvent>
  </div>
 

</template>

<script>
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
export default {
    components: { Header, CardEvent, JoinBtn,  },
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
            const query = await onSnapshot(dbEvent, (snapshot) =>{
                this.ListeEvent = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
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