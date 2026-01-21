<script setup>
import { useRouter } from 'vue-router'
import YoutubeButton from '@/components/ui/YoutubeButton.vue'
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
  return words.length > 4
})
</script>

<template>
  <div class="recipeCard">
    <div class="recipeCard__title">
      <h2 :title="title">
        {{ !isLongTitle ? title : `${title.split(' ').slice(0, 4).join(' ')}...` }}
      </h2>
      <div class="recipeCard__buttons">
        <YoutubeButton :ytLink="ytLink" /><i
          @click="router.push(`/recipeDetails/${id}`)"
          class="bx bx-right-arrow-alt"
        ></i>
      </div>
    </div>

    <img :src="image" :alt="title" />
  </div>
</template>

<style scoped>
.recipeCard__title {
  color: hsl(var(--text-light));
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: hsl(var(--main-clr) / 0.9);
  padding: 0.5em;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2em;
}

.recipeCard__buttons {
  display: flex;
  align-items: center;
  gap: 1em;
}

h2 {
  font-size: var(--step--1);
  margin: 0;
}

i {
  cursor: pointer;
  font-size: var(--step-2);
  transition:
    transform 0.4s,
    background 0.4s;
  border: 1px solid hsl(var(--text-light));
  border-radius: 50%;
}

i:hover {
  transform: scale(1.08);
  background-color: hsl(var(--text-light) / 0.1);
}

.recipeCard {
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 20rem;
  margin-block: 2rem;
  box-shadow: 0.4rem 0.6rem 0.4rem hsl(var(--shadow-clr));
  background-color: transparent;
  border-radius: 0.2rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.2rem;
  user-select: none;
}

@media (min-width: 85rem) {
  .recipeCard {
    min-width: 32%;
  }
}
</style>
