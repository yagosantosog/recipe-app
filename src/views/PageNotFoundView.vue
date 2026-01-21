<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>Page not Found</h1>
    <button @click="router.back()">Go Back</button>
  </div>
</template>

<style scoped>
button {
  height: fit-content;
  font-size: var(--step--1);
  background-color: hsl(var(--main-clr));
  padding: 0.2em 0.4em;
  border-radius: 10rem;
  border: none;
  color: hsl(var(--text-light));
  transition: transform 0.4s;
  box-shadow: 0.2rem 0.2rem 0.5rem hsl(var(--shadow-clr));
}

button:hover {
  transform: scale(1.08);
  box-shadow: 0.3rem 0.3rem 0.5rem hsl(var(--shadow-clr));
}
</style>
