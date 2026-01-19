<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header>
    <div class="header__container container">
      <div @click="router.push('/')" class="logo">
        <img src="./assets/logo.webp" alt="logo" />
      </div>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  background-color: hsl(var(--bg-dark));
}

.logo {
  width: 25vw;
  max-width: 10rem;
  margin-inline: auto;
}

@media (min-width: 85rem) {
  .logo {
    margin: unset;
  }
}
</style>
