<template>
    <form class="w-4/5 mx-auto grid gap-2 mt-5" @submit.prevent="updateUser">
        <div class="flex h-10 text-black rounded-sm overflow-hidden bg-slate-200">
            <div class="bg-true-gray-25 px-5 border-[1px] flex justify-center items-center">Identifiant</div>
            <input class="w-full pl-2" type="text" placeholder="Identifiant" v-model="user.login"  required>
        </div>
        <div class="flex h-10 text-black rounded-sm overflow-hidden bg-slate-200">
            <div class="bg-true-gray-25 px-5 border-[1px] flex justify-center items-center">Photo</div>
            <div class="relative w-full">
                <input type="file" class="w-full relative" ref="file" id="file" @change="previewImage">
                <label class="absolute w-full left-0 top-0 bottom-0 bg-white flex justify-center items-center" for="file">Sélectionner l'image</label>
            </div>
        </div>
        <div v-if="imageData">
            <img :src="imageData" :alt="user.login" class="mx-auto">
        </div>
        <div class="flex min-h-[2.5rem] text-black rounded-sm overflow-hidden bg-slate-200">
            <div class="bg-true-gray-25 px-5 w-1/3 border-[1px] flex justify-center items-center">Niveau de sport</div>
            <select class="w-full bg-white" v-model="user.niveau" required>
                <option selected disabled>Sélectionner un Niveau</option>
                <option v-for="niveau in listeNiveau" :key="niveau">{{niveau}}</option>
            </select>
        </div>
        <div class="flex text-black rounded-sm overflow-hidden bg-slate-200">
            <div class="bg-true-gray-25 px-5 border-[1px] flex justify-center items-center">Description</div>
            <textarea class="w-full pl-2 pt-1 h-40" type="text" placeholder="Description" v-model="user.bio"></textarea>
        </div>
        <div class="flex w-full justify-around">
            <Btn type="submit">Modifier</Btn>
            <button class="w-fit px-6 py-3 text-white" type="button"><RouterLink :to="{name:'ProfilView'}">Annuler</RouterLink></button>
        </div>
    </form>
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
import Btn from '../../components/buttons/btn.vue';
export default {
    name: "EditProfilView",
    data() {
        return {
            listeNiveau: ["Débutant", "Occasionnel", "Régulier", "Amateur", "Confirmé", "Pro"],
            user: {
                image: '',
                login: null,
                niveau: null,
                bio: 'Description'
            },
            imageData: null,
            refUser: null,
            imgModifiee: false,
            photoActuelle: null
        };
    },
    mounted() {
        this.getUserCheck();
    },
    methods: {
        async getUserCheck() {
            const userid = getAuth().currentUser.uid;
            if (userid == this.$route.params.id) {
                await this.getUser(this.$route.params.id);
            }
            else {
                this.$router.push("/EditProfil/" + userid);
                await this.getUser(userid);                
            }
        },
        previewImage: function (event) {
            this.file = this.$refs.file.files[0];
            this.user.image = this.file.name;
            this.imgModifiee = true;
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        async getUser(uid) {
            const firestore = getFirestore();
            const dbUsers = collection(firestore, "user");
            const q = query(dbUsers, where("uid", "==", uid));
            await onSnapshot(q, (snapshot) => {
                let user = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.user.login = user[0].login;
                this.user.niveau = user[0].niveau;
                this.user.bio = user[0].bio;
                this.user.image = user[0].image;
                console.log("user", this.user);
                if(this.user.image){
                    this.photoActuelle = this.user.image;
                    const storage = getStorage();
                    const spaceRef = ref(storage, "user/" + user[0].image);
                    getDownloadURL(spaceRef)
                        .then((url) => {
                        this.imageData = url;
                    })
                        .catch((error) => {
                        console.log('erreur downloadurl', error);
                    });
                }
            });
        },
        async updateUser(){
            const uid = this.$route.params.id;
            const firestore = getFirestore();
            const dbUsers = query(collection(firestore, "user"), where("uid","==", uid));
            const querySnapshot = await getDocs(dbUsers);
            querySnapshot.forEach((doc)=>{
                this.update(doc);
            })
            this.$router.push("/Profil/" + uid);
        },
        async update(document){
            if(this.imgModifiee){
                const storage = getStorage();
                let docRef = ref(storage, 'user/'+this.photoActuelle);
                deleteObject(docRef);
                docRef = ref(storage, 'user/'+this.user.image);
                await uploadString(docRef, this.imageData, 'data_url').then((snapshot) =>{
                    console.log('Uploaded a base64 string', this.user.image);
                });
            }
            const firestore = getFirestore();
            console.log(document.id, "=>", document.data());
            await updateDoc(doc(firestore, "user", document.id), {
                niveau:this.user.niveau,
                login: this.user.login,
            });
            if(this.user.bio){
                await updateDoc(doc(firestore, "user", document.id), {
                    bio:this.user.bio
                });
            }
            if(this.user.image){
                await updateDoc(doc(firestore, "user", document.id), {
                    image:this.user.image
                });
            }
            if(this.user.bio==''){
                await updateDoc(doc(firestore, "user", document.id), {
                    bio:''
                });
            }
            
        }
    },
    components: { Btn }
}
</script>

<style>

</style>