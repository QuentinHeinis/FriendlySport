<template>
<div class="content">
    <header class="h-16 fixed top-0 left-0 right-0 flex items-center bg-black bg-opacity-70 z-50">
        <div class="absolute left-3">
              <ArrowLeftIcon class="h-8 fill-white hover:cursor-pointer" @click="$router.go(-1)"></ArrowLeftIcon>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2">
            <Logo></Logo>
        </div>
        <div class="flex gap-3 absolute right-3">
            <RouterLink to="/">
                <HomeIcon class="h-8 fill-white"></HomeIcon>
            </RouterLink>
            
            
                <div class="h-8  w-8">
                    <RouterLink to="/Menu" class="w-full h-full flex flex-col justify-evenly">
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                      <span class="w-8 h-1 bg-white rounded-md"></span>
                    </RouterLink>
                </div>
            
        </div>
    </header>

<RouterView/>
</div>
</template>

<script>
import { ArrowLeftIcon, HomeIcon } from "@heroicons/vue/solid"
import Logo from "./components/Logo.vue"
import router from "./router"
import MenuView from "./views/MenuView.vue"

export default {
  components: {MenuView, ArrowLeftIcon, HomeIcon, Logo},
} 
</script>

<style>
.content, main{
  background-color: red;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
}

</style>