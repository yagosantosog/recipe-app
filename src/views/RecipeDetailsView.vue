<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getMealById } from '@/services/mealService'
import { formatInstructions } from '@/utils/formatInstructions'
import YoutubeButton from '@/components/ui/YoutubeButton.vue'

const route = useRoute()
const meal = ref(null)
const instructions = ref('')
const hasArea = ref(false)

onMounted(async () => {
  try {
    meal.value = await getMealById(route.params.id)
    instructions.value = formatInstructions(meal.value?.strInstructions)
    hasArea.value = Boolean(meal.value?.strArea)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main v-if="meal">
    <div class="container">
      <div class="recipeDetails__header">
        <h1>{{ meal.strMeal }}</h1>
        <YoutubeButton :ytLink="meal.strYoutube" />
      </div>

      <img :src="meal.strMealThumb" alt="recipe" />
      <h2>Preparation Method</h2>
      <div class="recipeDetails__instructions" v-html="instructions"></div>
      <p v-if="strArea">Area: {{ meal.strArea }}</p>
      <ul>
        <h2>Ingredients</h2>
        <template v-for="(i, index) of new Array(20)">
          <li v-if="meal[`strIngredient${index}`]" :key="index">
            {{ index + '. ' + meal[`strIngredient${index}`] }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.recipeDetails__header {
  background-color: hsl(var(--main-clr));
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1em;
  border-radius: 5px;
}

.recipeDetails__header h1 {
  color: hsl(var(--text-light));
  margin: 0;
}

.recipeDetails__instructions :deep(p) {
  max-width: 100%;
}

ul {
  list-style: none;
}

li {
  font-size: var(--step--1);
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 2rem;
}

@media (min-width: 50rem) {
  img {
    max-width: 25rem;
    margin-right: 2rem;
    float: left;
  }

  .recipeDetails__instructions {
    text-align: justify;
  }
}
</style>
