<script setup>
import MealCard from '@/components/MealCard.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const data = ref(null)
const router = useRouter()

const fetchRandomData = () => {
  const letters = 'l,p,m,f,s,k,t,b,g,j,e,h,j,n'
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
      data.value = responseData.meals[Math.floor(Math.random() * responseData.meals.length)]
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`)
    })
}

onMounted(() => {
  fetchRandomData()
})
</script>

<template>
  <div class="searchRecipes__loading" v-if="data === null">
    <h2>Loading...</h2>
  </div>
  <main v-else-if="data">
    <MealCard
      :id="data.idMeal"
      :title="data.strMeal"
      :image="data.strMealThumb"
      :ytLink="data.strYoutube"
    />
    <div class="cta">
      <h1>Looking for a delicious recipe?</h1>
      <p>Discover new recipes right now! Search by recipes and find amazing dishes to try out.</p>
      <p>Unleash your culinary creativity and be amazed by what you can cook today!</p>
      <button @click="router.push('/searchRecipes')">Start Exploring!</button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80svh;
  flex-wrap: wrap;
  column-gap: 2rem;
}

button {
  font-size: var(--step-0);
  background-color: hsl(var(--main-clr));
  padding: 0.5em 1em;
  border-radius: 10rem;
  color: hsl(var(--text-light));
  border: none;
  transition:
    transform 0.4s,
    box-shadow 0.4s;
  box-shadow: 0.2rem 0.2rem 0.5rem hsl(var(--shadow-clr));
}

button:hover {
  transform: scale(1.08);
  box-shadow: 0.3rem 0.3rem 0.5rem hsl(var(--shadow-clr));
}

.cta {
  max-width: 70ch;
  margin-inline: auto;
  padding: 2em;
}
</style>
