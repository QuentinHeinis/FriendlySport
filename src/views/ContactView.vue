<template>
  <div class="contact px-9">
    <div class="relative z-0">
      <h1 class="text-white font-bebas-neue text-4xl pt-9 pl-[2px]">Nous Contacter</h1>
      <span class="text-Orange font-bebas-neue text-4xl pt-9 absolute top-[2px] -z-10" aria-hidden="true">Nous Contacter</span>  
    </div>
    <form class="flex flex-col gap-6 mt-14 text-white font-oswald">
      <input type="text" name="Nom" id="Nom" placeholder="Nom" class="bg-Dark_gray2 h-10 px-5 rounded-xl w-2/3">
      <input type="text" name="Prenom" id="Prenom" placeholder="Prénom" class="bg-Dark_gray2 h-10 px-5 rounded-xl w-2/3">
      <input type="email" name="email" id="email" placeholder="Adresse mail" class="bg-Dark_gray2 h-10 px-5 rounded-xl">
      <textarea type="text" name="msg" id="msg" placeholder="Message" class="bg-Dark_gray2 h-40 px-5 rounded-xl py-2"></textarea>
      <button class="bg-Rose w-fit font-staatliches text-xl px-9 py-3 rounded-full mx-auto" type="submit">Envoyer</button>

    </form>
  </div>
</template>

<script>
export default {
    name:'ContactView',
}
</script>
