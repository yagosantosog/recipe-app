<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  image: String
})

const isImageLoaded = ref(false)

const isLongTitle = computed(() => {
  const words = props.title.split(' ')
  return words.length > 7
})
</script>

<template>
  <article class="recipeCard">
    <RouterLink
      :to="`/recipeDetails/${id}`"
      class="recipeCard__link"
      :aria-label="`View recipe details for ${title}`"
    >
      <header class="recipeCard__title">
        <h2 :title="title">
          {{ !isLongTitle ? title : `${title.split(' ').slice(0, 7).join(' ')}...` }}
        </h2>
      </header>

      <img
        :class="{ loaded: isImageLoaded }"
        :src="image"
        :alt="title"
        decoding="async"
        loading="lazy"
        @load="isImageLoaded = true"
      />
    </RouterLink>
  </article>
</template>

<style scoped>
.recipeCard {
  cursor: pointer;
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: hsl(var(--main-clr) / 0.15);
  max-width: 350px;
  box-shadow: 0.2rem 0.2rem 0.5rem hsl(var(--shadow-clr));
  border-radius: 5px;
  overflow: hidden;
  transition:
    transform 0.4s,
    brightness 0.4s,
    box-shadow 0.4s;
}
.recipeCard:hover {
  filter: brightness(95%);
  transform: scale(1.03);
  box-shadow: 0.3rem 0.3rem 0.5rem hsl(var(--shadow-clr));
}
.recipeCard__title {
  color: hsl(var(--text-light));
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: hsl(var(--main-clr) / 0.9);
  padding: 0.5em;
}

h2 {
  font-size: var(--step--1);
  margin: 0;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  user-select: none;
}

img.loaded {
  opacity: 1;
}
</style>
