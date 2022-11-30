import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import AddRecipe from '@/components/AddRecipe'
import EditRecipe from '@/components/EditRecipe'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-recipe',
      name: "AddRecipe",
      component: AddRecipe
    },
    {
      path: '/edit-recipe/:recipe_slug',
      name: 'EditRecipe',
      component: EditRecipe
    }
  ]
})

export default router
