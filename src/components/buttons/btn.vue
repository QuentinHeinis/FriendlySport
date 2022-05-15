<template>
  <div class="flex py-2 px-6 bg-Rose rounded-2xl text-white font-bebas-neue text-xl">
      <slot>{{msg}}</slot>
  </div>
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