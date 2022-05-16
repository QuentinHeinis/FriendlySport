<template>

  <div class="contact px-9 font-oswald font-light">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Créer un évènement</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Créer un évènement</span>  
    </div>
    <form class="flex flex-col gap-5 text-white">
      <select name="Sport" id="Sport" autocomplete="family-name" class="bg-Dark_gray2 h-10 rounded-3xl px-5 w-64" v-model="name">
        <option v-for="sport in ListeSport" :key="sport"  :value="sport.value">{{sport.value}}</option>
      </select>
      <select name="diff" id="diff" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="level">
        <option v-for="diff in ListeDiff" :key="diff" :value="diff.level">{{diff.level}}</option>
      </select>
      <input type="date" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="date">
      <textarea name="description" id="desc" cols="30" rows="10" class="bg-Dark_gray2 p-5 rounded-3xl" placeholder="Description" v-model="desc"></textarea>
      <button class="w-max self-center" @click="createEvent()" title="Création" type="button" ><btn>Valider</btn></button>
    </form>
  </div>

</template>

<script>
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
import btn from '../components/buttons/btn.vue'
export default {
    name:'CreateEventView',
    components:{btn,},
    data(){
      return{
        name:null,
        level:null,
        ListeSport:[{value:"football"}, {value:"running"}, {value:"basketball"}, {value:"natation"}, ],
        ListeDiff:[{level:"familiale"},{level:"amateur"},{level:"confirmé"},{level:"extreme"}]
      }
    },
    methods:{
      async createEvent(){
            const firestore = getFirestore();
            const dbEvent = collection(firestore, "Event");
            const docRef = await addDoc(dbEvent,{
                difficulte: this.level , 
                name: this.name,
                date : this.date,
                desc: this.desc
                })
            console.log('document créé avec le id : ', docRef.id);
        },
    },
}
</script>
