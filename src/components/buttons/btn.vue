<template>
  <button class="flex py-2 px-6 bg-Rose rounded-2xl text-white font-bebas-neue text-xl">
      <slot>{{msg}}</slot>
  </button>
</template>

<script>
export default {
    data() {
        return {
            msg: 'rejoindre'
        }
    }
}
</script>