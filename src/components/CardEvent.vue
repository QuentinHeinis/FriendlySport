<template>
  <div class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2">
    <div class="cardimg w-full h-full">
          <img :src="img" :alt="name" class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    </div>
    <div class="relative flex flex-col -top-full w-full z-10 pl-5 pt-3">
        <div class="flex flex-col">
          <div class="relative font-bebas-neue text-4xl">
            <p class="pl-[1px] text-white">{{ name }}</p>
            <span class="absolute -z-10 top-[1px] text-Orange">{{ name }}</span>
          </div>
          <div class="text-white -mt-2 pl-10">
              <span>{{difficulte}}</span>
          </div>
        </div>
        <div class="flex gap-5 mt-3">
          <cardbutton>Voir</cardbutton>
          <cardbutton>Rejoindre</cardbutton>
        </div>
    </div>
    
  </div>
</template>

<script>
import cardbutton from "./buttons/cardbutton.vue"
export default {
    data() {
    return {
      
          img:"/public/footimg.png",
      }
      },
      props:{
          name:{
            Type : String,
            default:"..."
          },
          difficulte:{
            Type : String,
            default:"facile"
          },
    },
  components: {
    cardbutton,
  }
}
</script>

<style>
.cardimg:after{
  content: '';
    width: 100%;
    height: 100%;
    z-index: 100;
    background: linear-gradient(90deg, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, 0) 60%);
    position: absolute;
    z-index: 1;
}
</style>