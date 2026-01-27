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
  <article class="container" v-if="meal">
    <header class="recipeDetails__header">
      <h1>{{ meal.strMeal }}</h1>
      <YoutubeButton v-if="meal.strYoutube" :ytLink="meal.strYoutube" />
    </header>
    <div class="recibeDetails_content">
      <section v-if="meal.strYoutube" class="recipeDetails__video" aria-labelledby="video-title">
        <h2 id="video-title" class="sr-only">Recipe video</h2>
        <iframe
          :src="
            meal.strYoutube
              .replace('watch?v=', 'embed/')
              .replace('youtube.com', 'youtube-nocookie.com')
          "
          title="Recipe preparation video"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </section>

      <section class="recipeDetails__ingredients">
        <h2>Ingredients</h2>
        <ul>
          <template v-for="(i, index) of new Array(20)">
            <li v-if="meal[`strIngredient${index + 1}`]" :key="index">
              {{ meal[`strIngredient${index + 1}`] }}
            </li>
          </template>
        </ul>
      </section>
      <section class="recipeDetails__preparation">
        <h2>Preparation Method</h2>
        <div class="recipeDetails__instructions" v-html="instructions"></div>
        <p v-if="hasArea"><strong>Area:</strong> {{ meal.strArea }}</p>
      </section>
    </div>
  </article>
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

.recibeDetails_content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.recipeDetails__video {
  width: 100%;
}

.recipeDetails__video iframe {
  width: 70ch;
  font-size: var(--step--1);
  max-width: 100%;
  aspect-ratio: 16/9;
  height: auto;
  border-radius: 5px;
}

li {
  font-size: var(--step--1);
}

@media (min-width: 50rem) {
  .recipeDetails__instructions {
    text-align: justify;
  }
}
</style>
