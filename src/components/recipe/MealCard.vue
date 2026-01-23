<script setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()

const props = defineProps({
  id: String,
  title: String,
  image: String
})

const isLoaded = ref(false)

const isLongTitle = computed(() => {
  return props.title.split(' ').length > 7
})
</script>

<template>
  <button @click="router.push(`/recipeDetails/${id}`)" class="recipeCard">
    <div class="recipeCard__title">
      <h2 :title="title">
        {{ !isLongTitle ? title : `${title.split(' ').slice(0, 7).join(' ')}...` }}
      </h2>
    </div>

    <img
      :src="image"
      :alt="title"
      loading="lazy"
      decoding="async"
      @load="isLoaded = true"
      :class="{ loaded: isLoaded }"
    />
  </button>
</template>

<style scoped>
.recipeCard {
  all: unset;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 350px;
  border-radius: 5px;
  overflow: hidden;
  background-color: hsl(var(--main-clr) / 0.15); /* placeholder */
}

.recipeCard__title {
  color: hsl(var(--text-light));
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: hsl(var(--main-clr) / 0.9);
  padding: 0.5em;
  z-index: 2;
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
  transition: opacity 0.3s ease;
}

img.loaded {
  opacity: 1;
}
</style>
