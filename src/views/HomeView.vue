<template>
  <div class="flex flex-col items-center">
      <CardEvent v-for="event in ListeEvent" :key="event" :difficulte="event.difficulte" :name="event.name"></CardEvent>
  </div>

</template>

<script>
import Header from "../components/Header.vue"
import CardEvent from "../components/CardEvent.vue"
import JoinBtn from "../components/buttons/btn.vue"
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
    },
}
</script>
