<template>
  <div class="flex flex-col items-center">
      <CardEvent v-for="i in 15" :key="i"></CardEvent>

      <JoinBtn></JoinBtn>
  </div>

</template>

<script>
import Header from "../components/Header.vue"
import CardEvent from "../components/CardEvent.vue"
import JoinBtn from "../components/buttons/JoinBtn.vue"
export default {
    components: { Header, CardEvent, JoinBtn,  }
}
</script>
