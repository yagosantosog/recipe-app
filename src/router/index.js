import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/recipeDetails/:id?',
      name: 'recipeDetails',
      component: () => import('../views/RecipeDetailsView.vue')
    },
    {
      path: '/searchRecipes',
      name: 'searchRecipes',
      component: () => import('../views/SearchRecipes.vue')
    }
  ]
})

export default router
