<template>

  <div class="contact px-9 font-oswald font-light">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Créer un évènement</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Créer un
        évènement</span>
    </div>
    <form class="flex flex-col gap-5 text-white" @submit.prevent="createEvent">
      <div class="flex items-center gap-2">
        <p class="flex-none w-1/5">Sport : </p>
        <input type="text" list="listesport" v-model="name" class="bg-Dark_gray2 h-10 rounded-3xl px-5 w-64 " placeholder="Sélectionner un sport">
        <datalist id="listesport">
          <option v-for="sports in ListeSport" :key="sports.id">
              {{sports.nom}}
          </option>
        </datalist>
      </div>
      <div class="flex items-center gap-2">
        <p class="flex-none w-1/5">Difficulté : </p>
        <select name="diff" id="diff" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="level" required>
          <option disabled>Sélectionner une difficulté</option>
          <option v-for="diff in ListeDiff" :key="diff.id">{{ diff.level }}</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <p class="flex-none w-1/5">Jour : </p>
        <input type="date" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="date" required>
      </div>
      <div class="flex items-center gap-2">
        <p class="w-1/5">Nombre de personne : </p>
        <input type="number" class="bg-Dark_gray2 h-10 rounded-3xl px-5" v-model="number" min="1" max="100" required>
      </div>
      <div class="flex items-center gap-2">
        <p class="flex-none w-1/5">Description : </p>
        <textarea name="description" id="desc" cols="30" rows="10" class="bg-Dark_gray2 w-full p-5 rounded-3xl"
          placeholder="Description" v-model="desc" required></textarea>
      </div>
        <btn class="w-max self-center" type="sumbit">Valider</btn>
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
    where,
    arrayUnion,
    orderBy         // Permet de demander le tri d'une requête query
    } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'
import {getAuth} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'
import btn from '../components/buttons/btn.vue'
export default {
  name: 'CreateEventView',
  components: { btn, },
  data() {
    return {
      ListeSport:[],
      ListeDiff: [],
      userid:' ',
      name:null,
      level: null,
      date:null,
      desc: null,
      number:null,
      heure:null
      
    }
  },
  mounted(){
    this.getId();
    this.getSport();
    this.getDiff();
    setInterval(() => this.getHour(), 1000);
  },
  methods: {
    async getId(){
      this.userid = await getAuth().currentUser.uid;
    },
    getHour(){
            this.heure = new Date().toJSON().slice(0,10) + "-" +  new Date().getHours() + "-" + new Date().getMinutes()+ "-" + new Date().getSeconds();
    },
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
      let msg = {
          by:{
              login:'Système',
              uid:' '
              },
          contenu:{
          msg:'Vous pouvez écrire',
          le: this.heure
          }
      }
      const docRef = await addDoc(dbEvent, {
        difficulte: this.level,
        name: this.name,
        date: this.date,
        nombre : this.number,
        desc: this.desc,
        img:this.name+'.png',
        creator:this.userid,
        chat:arrayUnion(msg),
        participants:arrayUnion()
      })
      const dbUsers = query(collection(firestore, "user"), where("uid","==", this.userid));
      const querySnapshot = await getDocs(dbUsers);
      querySnapshot.forEach((doc)=>{
          this.creatorMark(doc, docRef.id);
      })
      console.log('document créé avec le id : ', docRef.id);
      this.$router.push({name: 'HomeView'});
    },
    async creatorMark(document, id){
      const firestore = getFirestore();
      console.log(document.id, "=>", document.data());
      await updateDoc(doc(firestore, "user", document.id), {
          events : arrayUnion(id)
      });
    }
  },
}
</script>
