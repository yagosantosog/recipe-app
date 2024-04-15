<script setup>
import { RouterView, useRouter } from 'vue-router'
import CursorFollow from './components/CursorFollow.vue'

const router = useRouter()
</script>

<template>
  <CursorFollow />
  <header class="container">
    <div @click="router.push('/')" class="logo">
      <img src="./assets/logo.webp" alt="logo" />
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  border-bottom: 2px solid hsl(var(--shadow-clr));
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
