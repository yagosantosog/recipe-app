<script setup>
import MealCard from '@/components/recipe/MealCard.vue'
import { useMeals } from '@/composables/useMeals'
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const { meals, loading, fetchRandomMeals } = useMeals()
const randomMeal = computed(() => meals.value[Math.floor(Math.random() * meals.value.length)])

onMounted(() => {
  fetchRandomMeals()
})
</script>

<template>
  <div class="container">
    <section
      class="searchRecipes__loading"
      v-if="loading"
      aria-busy="true"
      aria-describedby="loading-status"
    >
      <p id="loading-status" role="status">Loading...</p>
    </section>
    <div v-else-if="randomMeal">
      <section class="hero section-margin">
        <MealCard
          :id="randomMeal.idMeal"
          :title="randomMeal.strMeal"
          :image="randomMeal.strMealThumb"
          :ytLink="randomMeal.strYoutube"
        />
        <header class="cta">
          <h1>Looking for a delicious recipe?</h1>
          <p>
            Discover new recipes right now! Search by recipes and find amazing dishes to try out.
          </p>
          <p>Unleash your culinary creativity and be amazed by what you can cook today!</p>
          <RouterLink class="cta-button" to="/searchRecipes"> Start Exploring! </RouterLink>
        </header>
      </section>
      <section class="how-it-works section-margin">
        <h2 class="section-title">How it works</h2>

        <ol class="steps">
          <li class="step">
            <h3>Search</h3>
            <p>Find recipes by name or category.</p>
          </li>

          <li class="step">
            <h3>Choose</h3>
            <p>Select a recipe that matches your taste.</p>
          </li>

          <li class="step">
            <h3>Cook</h3>
            <p>Follow the instructions and enjoy your meal.</p>
          </li>
        </ol>
      </section>
      <section class="final-cta section-margin">
        <h2>Ready to cook something amazing?</h2>
        <RouterLink class="cta-button" to="/searchRecipes">Browse Recipes</RouterLink>
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  min-height: 70dvh;
  gap: 2rem;
}

.cta-button {
  display: inline-block;
  text-decoration: none;
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

.how-it-works {
  text-align: center;
}

.steps {
  list-style: none;
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.step {
  counter-increment: step;
  position: relative;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: hsl(var(--main-clr) / 0.08);
  transition: background 0.3s;
}

.step:hover {
  background-color: hsl(var(--main-clr) / 0.15);
}

.step::before {
  content: counter(step);
  display: inline-block;
  font-size: var(--step-1);
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: hsl(var(--main-clr));
}

.final-cta {
  text-align: center;
  padding: 3rem 1rem;
  background-color: hsl(var(--main-clr) / 0.1);
  border-radius: 10px;
}

.final-cta:hover {
  background-color: hsl(var(--main-clr) / 0.15);
}

@media (min-width: 720px) {
  .hero {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
