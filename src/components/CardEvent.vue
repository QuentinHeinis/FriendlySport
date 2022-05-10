<template>
  <div class="w-4/5 h-44 overflow-hidden rounded-4xl relative my-2">
    <img src="../assets/footimg.png" alt="Foot" class="w-full absolute z top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="absolute top-2 left-3 w-full">
        <div class=" font-bebas-neue text-4xl">
            <p class="absolute z-10 pl-1 text-white">{{ sport }}</p>
            <span class="absolute top-1 text-Orange">{{ sport }}</span>
        </div>
        <div class="absolute top-10">
            <span>{{difficulté}}</span>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
    return {
      sport: 'Football',
      difficulté : 'facile'
    }
  }
}
</script>