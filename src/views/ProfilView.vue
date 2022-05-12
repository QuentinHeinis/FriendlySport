<template>
  <div class="profil">
      <div class="w-4/5 flex py-2 mx-auto  items-center my-6">
        <div class="w-24 h-24 bg-gray-400 rounded-full overflow-hidden object-cover">
          <img :src="user.img" :alt="'photo de '+ user.name" class="w-full">
        </div>
        <div class="pl-10 self-end text-white">
          <div class="font-bebas-neue text-3xl">{{user.name}} {{user.surname}}</div>
          <div class="font-oswald font-light">Niveau de sport: {{user.Niveau}}</div>
        </div>
      </div>
      <div class="w-4/5 mx-auto">
        <h3 class="font-bebas-neue text-3xl text-white mb-5">Biographie</h3>
        <div class="max-h-[400px] min-h-[150px] bg-Dark_gray2 text-white font-oswald font-light px-4 py-2 rounded-xl">{{user.Bio}}</div>
      </div>
  </div>

</template>

<script>
export default {
    name:'ProfilView',
    data(){
      return{
        user:{
          name:"Matthéo",
          surname:"Benoit",
          Niveau:"Amateur",
          Bio:"flemme flemme flemme flemme flemme flemmeflemmeflemme flemmeflemme flemmeflemme flemmeflemmeflemme",
          img:"/public/testimage.png"
        },
      }
    },
}

</script>

<style>

</style>