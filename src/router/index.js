import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import AddRecipe from '@/components/AddRecipe'
import EditRecipe from '@/components/EditRecipe'
import Login from '@/components/Login'
import { auth } from '@/firebaseInit'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/signin',
    name: 'Login',
    component: Login
  },
  {
    path: '/add-recipe',
    name: "AddRecipe",
    component: AddRecipe,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const requiresAuth = to.matched.some( record => record.meta.requiresAuth);
      const isAuthenticated = auth.currentUser;
      if(requiresAuth && !isAuthenticated) {
        alert("This action requires admin privileges");
        next("/signin");
      } else {
        next();
      }
    }
  },
  {
    path: '/edit-recipe/:recipe_slug',
    name: 'EditRecipe',
    component: EditRecipe,
  }
]

const router = new VueRouter({
    routes
})

export default router
