<template>
  <div class="relative">
    <h1 class="sr-only">Ekko</h1>
    <span class="logo text-sky-500" aria-hidden="true"></span>
    <span class="logo text-pink-500 absolute left-[5px]" aria-hidden="true"></span>
    <span class="logo text-purple-500 absolute left-[10px]" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.logo {
  &::before {
    content: "Ekko";
    font-family: Arial, sans-serif;
    font-size: 5rem;
    font-weight: bold;
    letter-spacing: 0.2em;
  }
}
</style>
