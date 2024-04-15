<script setup>
import MealCard from '@/components/MealCard.vue'
import { onMounted, ref, watch } from 'vue'

const meal = ref('')
const data = ref('')
const categories = ref('')
const selectedCategory = ref('')

const fetchData = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      return response.json()
    })
    .then((responseData) => {
      data.value = responseData.meals
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`)
    })
}

const fetchRandomData = () => {
  const letters = 'l,p,m,f,s,k,t,b'
  const lettersArray = letters.split(',')
  const randomLetter = lettersArray[Math.floor(Math.random() * lettersArray.length)]
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${randomLetter}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      return response.json()
    })
    .then((responseData) => {
      data.value = responseData.meals
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`)
    })
}

const fetchCategories = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      return response.json()
    })
    .then((responseData) => {
      categories.value = responseData.categories
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`)
    })
}

const fetchSelectedCategory = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
      }
      return response.json()
    })
    .then((responseData) => {
      data.value = responseData.meals
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`)
    })
}

onMounted(() => {
  fetchRandomData()
  fetchCategories()
})

watch(meal, () => {
  fetchData()
})

watch(selectedCategory, () => {
  fetchSelectedCategory()
})
</script>

<template>
  <main>
    <div class="searchRecipes__container">
      <div class="searchRecipes__container-inputs">
        <input v-model="meal" placeholder="Search for Recipes" />
        <label for="categories">Search By Category: </label>
        <select id="categories" v-model="selectedCategory" v-if="categories">
          <option
            :value="category.strCategory"
            v-for="category in categories"
            :key="category.idCategory"
          >
            {{ category.strCategory }}
          </option>
        </select>
      </div>
      <div v-if="data === null" class="searchRecipes__loading">
        <h2>Recipe Not Found</h2>
      </div>
      <div v-else-if="data === ''" class="searchRecipes__loading">
        <h2>Loading...</h2>
      </div>
      <div v-else-if="data" class="searchRecipes__grid">
        <MealCard
          v-for="recipe in data"
          :id="recipe.idMeal"
          :title="recipe.strMeal"
          :image="recipe.strMealThumb"
          :ytLink="recipe.strYoutube"
          :key="recipe.idMeal"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.searchRecipes__loading {
  margin-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  padding: 0.5em;
  font-size: var(--step--1);
  width: 100%;
  border-radius: 10rem;
  border: 1px solid hsl(var(--main-clr) / 0.8);
}

input:focus {
  outline-color: hsl(var(--main-clr));
}

.searchRecipes__container {
  width: 90%;
  max-width: 85rem;
  margin-inline: auto;
  padding-block: 1rem;
}

.searchRecipes__container-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.searchRecipes__container-inputs label {
  font-size: var(--step--1);
}

.searchRecipes__container-inputs select {
  border-radius: 10rem;
  padding: 0.2em;
  border: 1px solid hsl(var(--main-clr) / 0.8);
  font-size: var(--step--1);
}

.searchRecipes__container-inputs select:focus {
  outline-color: hsl(var(--main-clr));
}

.searchRecipes__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 20rem));
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
