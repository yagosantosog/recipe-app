<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <header>
    <div class="header__container container">
      <button @click="router.push('/')" class="logo">
        <img src="../../assets/logo.webp" alt="logo" />
      </button>
    </div>
  </header>
  <slot />
</template>
<style scoped>
img {
  max-width: 10vw;
}
</style>
