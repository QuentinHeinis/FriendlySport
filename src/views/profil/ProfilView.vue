<template>
  <div class="profil">
    <div class="w-4/5 flex py-2 mx-auto  items-center my-6 relative">
      <div class="w-24 h-24 bg-gray-400 rounded-full overflow-hidden">
        <img :src="user.image" :alt="'photo de '+ user.login" class="w-full h-full object-cover">
      </div>
      <div class="pl-10 self-end text-white">
        <div class="font-bebas-neue text-3xl">{{user.login}}</div>
        <div class="font-oswald font-light" v-if="user.niveau==null">Niveau de sport: Non défini</div>
        <div class="font-oswald font-light" v-if="user.niveau">Niveau de sport: {{user.niveau}}</div>
      </div>
      <RouterLink :to="{name:'EditProfilView', params:{id:userid}}">
        <PencilAltIcon class="stroke-white fill-white w-5 absolute right-0 top-0" v-if="userCheck" />
      </RouterLink>
    </div>
    <div class="w-4/5 mx-auto">
      <h3 class="font-bebas-neue text-3xl text-white mb-5">Description</h3>
      <div class="max-h-[400px] min-h-[150px] bg-Dark_gray2 text-white font-oswald font-light px-4 py-2 rounded-xl"
        v-if="user.bio==''">Description</div>
      <div class="max-h-[400px] min-h-[150px] bg-Dark_gray2 text-white font-oswald font-light px-4 py-2 rounded-xl"
        v-if="user.bio">{{user.bio}}</div>
    </div>
  </div>

</template>

<script>
// Bibliothèque Firestore : import des fonctions
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  where,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

// Storage
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
  deleteObject,
  listAll
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'

import {
  getAuth
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'

import { PencilAltIcon } from '@heroicons/vue/solid'
export default {
  name: 'ProfilView',
  components: { PencilAltIcon },
  data() {
    return {
      user: {
        login: null,
        niveau: null,
        bio: null,
        image: null
      },
      userid: ' ',
      userCheck: false,
      refUser: null,
    }
  },
  mounted() {
    this.getUser(this.$route.params.id);

    this.getUserCheck();
  },
  methods: {
    async getUser(uid) {
      const firestore = getFirestore();
      const dbUsers = collection(firestore, "user");
      const q = query(dbUsers, where("uid", "==", uid));
      await onSnapshot(q, (snapshot) => {
        let user = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }));
        this.user.login = user[0].login;
        this.user.niveau = user[0].niveau;
        this.user.bio = user[0].bio;
        this.user.image = user[0].image;
        if(this.user.image){
          const storage = getStorage();
          const spaceRef = ref(storage, 'user/'+this.user.image);
          getDownloadURL(spaceRef)
          .then((url) =>{
              this.user.image = url;
          })
          .catch((error) =>{
              //console.log('erreur download url', error);
          })
        }
      })
      
    },
    getUserCheck() {
      this.userid = getAuth().currentUser.uid;
      if (this.userid == this.$route.params.id) {
        this.userCheck = true;
        console.log('user propriétaire du compte')
      } else {
        console.log('user non propriétaire du compte');
      }
    }
  }
}

</script>

<style>
</style>