<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import YoutubeButton from '@/components/YoutubeButton.vue'

const route = useRoute()
const data = ref(null)
const strArea = ref(false)
const strInstructions = ref('')

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`
    )
    if (!response.ok) {
      throw new Error(`HTTP Error! Status ${response.status}`)
    }
    const responseData = await response.json()
    data.value = responseData.meals[0]
    strInstructions.value = formatInstructions(data.value.strInstructions)
    if (responseData.meals[0].strArea !== 0) {
      strArea.value = true
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`)
  }
}

onMounted(() => {
  fetchData()
})

function formatInstructions(instructions) {
  const groupedParts = []
  let parts

  if (/\d+\.\s/.test(instructions)) {
    parts = instructions.split(/(?=\b\d+\.\s)/)
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        groupedParts.push('</p><p>' + parts[i])
      } else {
        groupedParts.push(parts[i])
      }
    }
  } else {
    parts = instructions.split('.')
    for (let i = 0; i < parts.length; i++) {
      if (i > 0 && i % 4 === 0) {
        groupedParts.push('</p><p>' + parts[i])
      } else {
        groupedParts.push(parts[i])
      }
    }
  }
  return '<p>' + groupedParts.join('.') + '</p>'
}
</script>

<template>
  <main v-if="data">
    <div class="container">
      <div class="recipeDetails__header">
        <h1>{{ data.strMeal }}</h1>
        <YoutubeButton :ytLink="data.strYoutube" />
      </div>

      <img :src="data.strMealThumb" alt="recipe" />
      <h2>Preparation Method</h2>
      <div class="recipeDetails__instructions" v-html="strInstructions"></div>
      <p v-if="strArea">Area: {{ data.strArea }}</p>
      <ul>
        <h2>Ingredients</h2>
        <template v-for="(i, index) of new Array(20)">
          <li v-if="data[`strIngredient${index}`]" :key="index">
            {{ index + '. ' + data[`strIngredient${index}`] }}
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
  border-radius: 2rem;
}

.recipeDetails__header h1 {
  color: hsl(var(--text-light));
  margin: 0;
}

.recipeDetails__instructions {
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
  border-radius: 0.2rem;
  margin-bottom: 2rem;
}

@media (min-width: 85rem) {
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
