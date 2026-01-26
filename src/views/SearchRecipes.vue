<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MealCard from '@/components/recipe/MealCard.vue'
import { useMeals } from '@/composables/useMeals'

const route = useRoute()
const router = useRouter()
const search = ref(route.query.query ?? '')
const selectedCategory = ref(route.query.category ?? '')

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
  fetchCategories()
  if (search.value) {
    searchMealsByName(search.value)
  } else if (selectedCategory.value) {
    fetchMealsByCategory(selectedCategory.value)
  } else {
    fetchRandomMeals()
  }
})

watch([search, selectedCategory], ([newSearch, newCategory]) => {
  router.replace({
    query: {
      query: newSearch || undefined,
      category: newCategory || undefined
    }
  })
})

watch(
  () => route.query,
  (query) => {
    search.value = query.query ?? ''
    selectedCategory.value = query.category ?? ''

    if (search.value) {
      searchMealsByName(search.value)
    } else if (selectedCategory.value) {
      fetchMealsByCategory(selectedCategory.value)
    } else {
      fetchRandomMeals()
    }
  },
  { immediate: true }
)
</script>

<template>
  <section class="searchRecipes">
    <div class="searchRecipes__container">
      <form class="searchRecipes__container-inputs" role="search" @submit.prevent>
        <label for="search" class="sr-only">Search recipes by name</label>
        <input id="search" type="search" v-model.trim="search" placeholder="Search for recipes" />

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
      </form>

      <section v-if="loading" class="searchRecipes__loading" aria-busy="true">
        <p role="status">Loading recipes...</p>
      </section>

      <section v-else-if="error" class="searchRecipes__loading" role="alert">
        <p>Something went wrong. Please try again.</p>
      </section>

      <section v-else-if="!meals.length" class="searchRecipes__loading">
        <p>No recipes found.</p>
      </section>

      <ul v-else class="searchRecipes__grid">
        <li v-for="recipe in meals" :key="recipe.idMeal">
          <MealCard
            :id="recipe.idMeal"
            :title="recipe.strMeal"
            :image="recipe.strMealThumb"
            :ytLink="recipe.strYoutube"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.searchRecipes__container {
  width: 90%;
  max-width: 90rem;
  margin-inline: auto;
  padding: 2rem 0 3rem;
}

.searchRecipes__container-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.searchRecipes__container-inputs label {
  font-size: var(--step--1);
  opacity: 0.85;
}

input,
select {
  width: 100%;
  max-width: 22rem;
  padding: 0.65em 1em;
  font-size: var(--step--1);
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--main-clr) / 0.25);
  background-color: hsl(var(--bg-clr, 0 0% 100%));
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input::placeholder {
  opacity: 0.6;
}

input:focus,
select:focus {
  outline: none;
  border-color: hsl(var(--main-clr));
  box-shadow: 0 0 0 3px hsl(var(--main-clr) / 0.15);
}

select {
  cursor: pointer;
}

.searchRecipes__loading {
  margin-top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.searchRecipes__loading h2 {
  font-size: var(--step-1);
  font-weight: 500;
  opacity: 0.75;
}

.searchRecipes__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  place-items: center;
}
</style>
