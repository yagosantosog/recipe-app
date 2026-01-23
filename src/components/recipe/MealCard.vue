<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const props = defineProps({
  id: String,
  title: String,
  image: String,
  ytLink: String
})

const isLongTitle = computed(() => {
  const words = props.title.split(' ')
  return words.length > 7
})
</script>

<template>
  <button @click="router.push(`/recipeDetails/${id}`)" class="recipeCard">
    <div class="recipeCard__title">
      <h2 :title="title">
        {{ !isLongTitle ? title : `${title.split(' ').slice(0, 7).join(' ')}...` }}
      </h2>
    </div>
    <img :src="image" :alt="title" />
  </button>
</template>

<style scoped>
.recipeCard {
  all: unset;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 350px;
  box-shadow: 0.2rem 0.2rem 0.5rem hsl(var(--shadow-clr));
  background-color: transparent;
  border-radius: 5px;
  transition:
    transform 0.4s,
    brightness 0.4s,
    box-shadow 0.4s;
}
.recipeCard__title {
  color: hsl(var(--text-light));
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;
  background-color: hsl(var(--main-clr) / 0.9);
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2em;
}

h2 {
  font-size: var(--step--1);
  margin: 0;
}

.recipeCard:hover {
  filter: brightness(95%);
  transform: scale(1.03);
  box-shadow: 0.3rem 0.3rem 0.5rem hsl(var(--shadow-clr));
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  user-select: none;
}

@media (min-width: 85rem) {
  .recipeCard {
    min-width: 32%;
  }
}
</style>
