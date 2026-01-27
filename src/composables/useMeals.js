import { ref } from 'vue'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

function useLocalCache(key, ttl = 1000 * 60 * 5) {
  const get = () => {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    try {
      const parsed = JSON.parse(cached)
      if (Date.now() > parsed.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return parsed.data
    } catch {
      localStorage.removeItem(key)
      return null
    }
  }

  const set = (data) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        expiry: Date.now() + ttl
      })
    )
  }

  return { get, set }
}

function filterMealsWithImage(meals) {
  return meals.filter(
    (meal) => typeof meal?.strMealThumb === 'string' && meal.strMealThumb.trim().length > 0
  )
}

export function useMeals() {
  const meals = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchMeals(endpoint, cacheKey, ttl) {
    const cache = useLocalCache(cacheKey, ttl)
    const cached = cache.get()

    if (cached) {
      meals.value = cached
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error('Fetch error')
      }

      const data = await response.json()
      const result = data.meals ?? []

      meals.value = filterMealsWithImage(result)
      cache.set(meals.value)
    } catch (err) {
      error.value = err.message
      meals.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    const cache = useLocalCache('meal_categories', 1000 * 60 * 60 * 24)
    const cached = cache.get()

    if (cached) {
      categories.value = cached
      return
    }

    try {
      const response = await fetch(`${BASE_URL}categories.php`)
      const data = await response.json()
      categories.value = data.categories ?? []
      cache.set(categories.value)
    } catch (err) {
      error.value = err.message
    }
  }

  const searchMealsByName = (query) =>
    fetchMeals(`search.php?s=${query}`, `meals_search_${query}`, 1000 * 60 * 5)

  const fetchMealsByCategory = (category) =>
    fetchMeals(`filter.php?c=${category}`, `meals_category_${category}`, 1000 * 60 * 10)

  const fetchRandomMeals = () => {
    const randomLetter = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'r',
      's',
      't',
      'v',
      'w'
    ][Math.floor(Math.random() * 19)]
    fetchMeals(`search.php?f=${randomLetter}`, `meals_random_${randomLetter}`, 1000 * 60 * 60)
  }

  return {
    meals,
    categories,
    loading,
    error,
    searchMealsByName,
    fetchMealsByCategory,
    fetchRandomMeals,
    fetchCategories
  }
}
