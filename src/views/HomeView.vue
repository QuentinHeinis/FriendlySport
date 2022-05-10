<template>
  <main class="w-screen bg-Dark_gray min-h-screen h-fit flex flex-col items-center">
      <CardEvent v-for="i in 15" :key="i"></CardEvent>

      <JoinBtn></JoinBtn>
  </main>

</template>

<script>
import Header from "../components/Header.vue"
import CardEvent from "../components/CardEvent.vue"
import JoinBtn from "../components/buttons/JoinBtn.vue"
export default {
    components: { Header, CardEvent, JoinBtn,  }
}
</script>
