<template>

  <div class="contact px-9 font-oswald font-light">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Créer un évènement</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Créer un
        évènement</span>
    </div>
    <form class="flex flex-col gap-5 text-white">
      <select name="Sport" id="Sport" class="bg-Dark_gray2 h-10 rounded-3xl px-5 w-64 "
        v-model="name">
        <option selected disabled>Sélectionner un sport</option>
        <option v-for="sports in ListeSport" :key="sports.id">
            {{sports.nom}}
        </option>
      </select>
      <select name="diff" id="diff" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="level" >
        <option selected disabled>Sélectionner une difficulté</option>
        <option v-for="diff in ListeDiff" :key="diff.id">{{ diff.level }}</option>
      </select>
      <input type="date" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="date">
      <textarea name="description" id="desc" cols="30" rows="10" class="bg-Dark_gray2 p-5 rounded-3xl"
        placeholder="Description" v-model="desc"></textarea>
      <button class="w-max self-center" @click="createEvent()" title="Création" type="button">
        <btn>Valider</btn>
      </button>
    </form>
  </div>

</template>

<script>
import { 
    getFirestore,   // Obtenir le Firestore
    collection,     // Utiliser une collection de documents
    doc,            // Obtenir un document par son id
    getDocs,        // Obtenir la liste des documents d'une collection
    addDoc,         // Ajouter un document à une collection
    updateDoc,      // Mettre à jour un document dans une collection
    deleteDoc,      // Supprimer un document d'une collection
    onSnapshot,     // Demander une liste de documents d'une collection, en les synchronisant
    query,          // Permet d'effectuer des requêtes sur Firestore
    orderBy         // Permet de demander le tri d'une requête query
    } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
import btn from '../components/buttons/btn.vue'
export default {
  name: 'CreateEventView',
  components: { btn, },
  data() {
    return {
      ListeSport:[],
      ListeDiff: [],
        name: null,
        level: null,
        date:null,
        desc: null,
        img:null,
    }
  },
  mounted(){
    this.getSport();
    this.getDiff();
  },
  methods: {
    async getSport(){
      const firestore = getFirestore();
      const dbSport = collection(firestore, "Sports");
      const q = query(dbSport, orderBy('nom', 'asc'));
      await onSnapshot(q, (snapshot) => {
          this.ListeSport = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
          console.log('liste sport : ',this.ListeSport);
      })
      
    },
    async getDiff(){
      const firestore = getFirestore();
      const dbDiff = collection(firestore, "diff");
      const q = query(dbDiff, orderBy('level', 'asc'));
      await onSnapshot(q, (snapshot) => {
          this.ListeDiff = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
          console.log('liste diff : ',this.ListeDiff);
      })
    },
    async createEvent() {
      const firestore = getFirestore();
      const dbEvent = collection(firestore, "Event");
      const docRef = await addDoc(dbEvent, {
        difficulte: this.level,
        name: this.name,
        date: this.date,
        desc: this.desc,
      })
      console.log('document créé avec le id : ', docRef.id);
      this.$router.push('/');
    },

  },
}
</script>
