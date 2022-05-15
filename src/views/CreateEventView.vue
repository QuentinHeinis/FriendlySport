<template>

  <div class="contact px-9">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Créer un évènement</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Créer un évènement</span>  
    </div>
    <form class="flex flex-col gap-5 text-white">
      <select name="Sport" id="Sport" autocomplete="family-name" class="bg-Dark_gray2 h-10 rounded-3xl px-5 w-64">
        <option v-for="sport in ListeSport" :key="sport" :value="sport.value">{{sport.value}}</option>
      </select>
      <select name="diff" id="diff" class="bg-Dark_gray2 h-10 rounded-3xl px-5">
        <option v-for="diff in ListeDiff" :key="diff" :value="diff.level">{{diff.level}}</option>
      </select>
      <input type="date" class="bg-Dark_gray2 h-10 rounded-3xl px-5">
      <textarea name="description" id="desc" cols="30" rows="10" class="bg-Dark_gray2 p-5" placeholder="Description"></textarea>
      <button class="w-max self-center" @click.prevent="creatEvent()"><btn>Valider</btn></button>
    </form>
  </div>

</template>

<script>
import btn from '../components/buttons/btn.vue'
export default {
    name:'CreateEventView',
    components:{btn,},
    data(){
      return{
        ListeSport:[{value:"football"}, {value:"running"}],
        ListeDiff:[{level:"familiale"},{level:"amateur"},{level:"confirmé"},{level:"extreme"}]
      }
    },
    methods:{
      async createEvent(){
            const firestore = getFirestore();
            const dbEvent = collection(firestore, "Event");
            const docRef = await addDoc(dbEvent,{
                name: this.name},
                {difficulte: this.difficulte})
            console.log('document créé avec le id : ', docRef.id);
        },
    },
}
</script>
