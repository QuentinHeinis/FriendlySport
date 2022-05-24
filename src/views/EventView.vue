<template>
  <div class="relative h-screen overflow-hidden -mt-16">
      <div class="w-full">
          <img :src="event.img" :alt="event.name" class="w-full h-auto">
      </div>
      <div class="font-oswald text-base text-white min-h-[50vh] w-full bg-Dark_gray absolute bottom-0 rounded-t-3xl py-10 px-9">
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

      </div>
  </div>
</template>

<script>
import { CalendarIcon } from '@heroicons/vue/outline'
// Bibliothèque Firestore : import des fonctions
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
            event:{
                name:null,
                img:null,
                desc:null,
                difficulte:null,
                date:null,
            },
            imageData:null,
        }
    },
    components:{CalendarIcon},
    mounted(){
        this.getEvent(this.$route.params.id);
    },
    methods:{
        
        async getEvent(id){
            const firestore = getFirestore();
            const docRef = doc(firestore, "Event", id);
            this.refEvent = await getDoc(docRef);
            if(this.refEvent.exists()){
                this.event = this.refEvent.data();
            }else{
                this.console.log("Event non existant");
            }
            const storage = getStorage();
            const spaceRef = ref(storage, 'imgsport/'+this.event.img);
          getDownloadURL(spaceRef)
            .then((url)=>{
                this.event.img = url;
            })
            .catch((error) => {
                console.log('erreur downloadurl', error);
            })
        },
        dateFr(d){
          let date = d.split('-');
          return date[2]+'/'+date[1]+'/'+date[0];
      }
    },
}
</script>

<style>

</style>