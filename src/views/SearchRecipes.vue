<script setup>
import { ref, watch, onMounted } from 'vue'
import MealCard from '@/components/recipe/MealCard.vue'
import { useMeals } from '@/composables/useMeals'

const search = ref('')
const selectedCategory = ref('')

const {
  meals,
  categories,
  loading,
  error,
  searchMealsByName,
  fetchMealsByCategory,
  fetchRandomMeals,
  fetchCategories
} = useMeals()

onMounted(() => {
  fetchRandomMeals()
  fetchCategories()
})

watch(search, (value) => {
  if (!value) {
    fetchRandomMeals()
    return
  }
  searchMealsByName(value)
})

watch(selectedCategory, (value) => {
  if (!value) {
    fetchRandomMeals()
    return
  }
  fetchMealsByCategory(value)
})
</script>

<template>
  <main>
    <div class="searchRecipes__container">
      <div class="searchRecipes__container-inputs">
        <input v-model.trim="search" placeholder="Search for recipes" />

        <label for="categories">Search by category:</label>

        <select id="categories" v-model="selectedCategory">
          <option value="">All</option>
          <option
            v-for="category in categories"
            :key="category.idCategory"
            :value="category.strCategory"
          >
            {{ category.strCategory }}
          </option>
        </select>
      </div>

      <div v-if="loading" class="searchRecipes__loading">
        <h2>Loading...</h2>
      </div>

      <div v-else-if="error" class="searchRecipes__loading">
        <h2>Something went wrong</h2>
      </div>

      <div v-else-if="!meals.length" class="searchRecipes__loading">
        <h2>No recipes found</h2>
      </div>

      <div v-else class="searchRecipes__grid">
        <MealCard
          v-for="recipe in meals"
          :key="recipe.idMeal"
          :id="recipe.idMeal"
          :title="recipe.strMeal"
          :image="recipe.strMealThumb"
          :ytLink="recipe.strYoutube"
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
