<script setup>
defineProps({
  ytLink: String
})
</script>

<template>
  <button>
    <a target="_blank" :href="ytLink">
      <slot>Youtube</slot>
    </a>
  </button>
</template>

<style scoped>
button {
  height: fit-content;
  font-size: var(--step--1);
  background-color: transparent;
  padding: 0.2em 0.4em;
  border-radius: 10rem;
  border: 1px solid hsl(var(--text-light));
  transition:
    transform 0.4s,
    background 0.4s;
}

button:hover {
  transform: scale(1.08);
  background-color: hsl(var(--text-light) / 0.1);
}

a,
a:active {
  text-decoration: none;
  color: hsl(var(--text-light));
}
</style>
