<template>
  <div class="content">
    <main>
      <div class="flex w-full px-9 py-2 items-center">
        <div class="w-24 h-24 bg-gray-400 rounded-full overflow-hidden">
          <img :src="user.img" :alt="'photo de '+ user.name">
        </div>
        <div class="pl-10 self-end">
          <div class="font-bebas-neue text-3xl">{{user.name}} {{user.surname}}</div>
          <div class="font-oswald font-light">Niveau de sport: {{user.Niveau}}</div>
        </div>
      </div>
      <div class="w-4/5 max-h-[400px] min-h-max bg-Dark_gray2 text-white font-oswald font-light mx-auto px-4 py-2 rounded">{{user.Bio}}</div>

    </main>
    
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
          img:"../assets/testimage.png"
        },
      }
    },
}

</script>

<style>

</style>