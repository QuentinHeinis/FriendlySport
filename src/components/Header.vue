<template>
    <header class="h-16 fixed top-0 left-0 right-0 flex items-center bg-black bg-opacity-70 z-50">
        <div class="absolute left-3">
            <ArrowLeftIcon class="h-8 fill-white"></ArrowLeftIcon>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2">
            <Logo></Logo>
        </div>
        <div class="flex gap-3 absolute right-3">
            <div>
                <HomeIcon class="h-8 fill-white"></HomeIcon>
            </div>
            
            
                <div class="flex flex-col h-8 justify-evenly">
                    <span class="w-8 h-1 bg-white rounded-md"></span>
                    <span class="w-8 h-1 bg-white rounded-md"></span>
                    <span class="w-8 h-1 bg-white rounded-md"></span>
                </div>
            
        </div>
    </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<script>
import {ArrowLeftIcon, HomeIcon} from '@heroicons/vue/solid'
import Logo from './Logo.vue'

export default {
 components: { ArrowLeftIcon, HomeIcon, Logo},
};

</script>