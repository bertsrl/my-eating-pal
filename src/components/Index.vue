<template>
  <div class="index container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)">delete</i>
        <h2 class="indigo-text">{{ recipe.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink waves-effect waves-light">
        <router-link :to="{ name: 'EditRecipe', params: {recipe_slug: recipe.slug} }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import {auth, db} from "@/firebaseInit";

export default {
  name: 'Index',
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    deleteRecipe(id) {
      db.collection('recipes').doc(id).delete().then(() => {
        this.recipes = this.recipes.filter(recipe => {
          return recipe.id != id
        })
      })
    }
  },
  created() {
    //fetch data from the firestore
    db.collection('recipes').get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        let recipe = doc.data()
        recipe.id = doc.id
        this.recipes.push(recipe)
      })
    })

    console.log(this.recipes);
  }
}
</script>

<style lang="sass">
  .index
    display: grid
    grid-template-columns: 1fr 1fr 1fr 
    grid-gap: 30px
    margin-top: 60px
    h2
      font-size: 1.8em
      text-align: center
      margin-top: 0
    ul
      margin: 30px auto
      width: 100%
      display: flex
      flex-wrap: wrap
    .delete
      position: absolute
      top: 4px
      right: 4px
      cursor: pointer
      color: #aaa
      font-size: 1.4em
    .v-enter-active,
    .v-leave-active 
      transition: opacity 0.5s ease

    .v-enter-from, .v-leave-to
      opacity: 0
</style>