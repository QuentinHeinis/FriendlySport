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
                    <img :src="creator.image" :alt="creator.login" class="w-16 h-16 rounded-full">
                    <p>Par {{creator.login}}</p>
                </RouterLink>
                <div class="flex justify-between">
                    <div class="flex items-center gap-4 pl-9">
                        <p>{{personnes}} / {{place}}</p> 
                        <UserGroupIcon class="w-8 h-8"/>
                        <button><AnnotationIcon class="w-8 h-8"/></button>
                    </div>
                    <btn class="w-fit">Rejoindre</btn>
                </div>
            </div>
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
            place:10,
            personnes:1,
            event:{
                name:null,
                img:null,
                desc:null,
                difficulte:null,
                date:null,
                creator:null,
            },
            creator:{
                login:null,
                image:null,
                uid:'uid'
            },
            imageData:null,
        }
    },
    components:{CalendarIcon, UserGroupIcon, AnnotationIcon, btn},
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
        }
    },
}
</script>

<style>

</style>