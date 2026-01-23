<script setup>
import MealCard from '@/components/recipe/MealCard.vue'
import { useMeals } from '@/composables/useMeals'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const { meals, loading, fetchRandomMeals } = useMeals()
const randomMeal = computed(() => meals.value[Math.floor(Math.random() * meals.value.length)])
const router = useRouter()

onMounted(() => {
  fetchRandomMeals()
})
</script>

<template>
  <div class="container">
    <div class="searchRecipes__loading" v-if="loading">
      <h2>Loading...</h2>
    </div>
    <main v-else-if="randomMeal">
      <MealCard
        :id="randomMeal.idMeal"
        :title="randomMeal.strMeal"
        :image="randomMeal.strMealThumb"
        :ytLink="randomMeal.strYoutube"
      />
      <div class="cta">
        <h1>Looking for a delicious recipe?</h1>
        <p>Discover new recipes right now! Search by recipes and find amazing dishes to try out.</p>
        <p>Unleash your culinary creativity and be amazed by what you can cook today!</p>
        <button class="cta-button" @click="router.push('/searchRecipes')">Start Exploring!</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
}

.cta-button {
  font-size: var(--step-0);
  background-color: hsl(var(--main-clr));
  padding: 0.5em 1em;
  border-radius: 5px;
  color: hsl(var(--text-light));
  border: none;
  transition:
    transform 0.4s,
    brightness 0.4s,
    box-shadow 0.4s;
  box-shadow: 0.2rem 0.2rem 0.5rem hsl(var(--shadow-clr));
}

.cta-button:hover {
  filter: brightness(95%);
  transform: scale(1.05);
  box-shadow: 0.3rem 0.3rem 0.5rem hsl(var(--shadow-clr));
}

@media (min-width: 720px) {
  main {
    flex-direction: row;
  }
}
</style>
