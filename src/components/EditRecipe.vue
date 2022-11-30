<template>
  <div v-if="recipe" class="edit-recipe container">
      <h2>Edit a recipe {{ recipe.title }}</h2>
      <form @submit.prevent="EditRecipe">
          <div class="field title">
              <label for="title">Smoothie Title:</label>
              <input type="text" name="title" v-model="recipe.title">
          </div>
          <div class="field add-ingredient">
              <label for="add-ingredient">Add ingredient:</label>
              <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
          </div>
          <div class="field center-align">
              <ul class="ingredients">
                <li v-for="(ing, index) in recipe.ingredients" :key="index">
                    <span class="chip">
                        {{ ing }}
                        <i class="material-icons close" @click="deleteIng(ing)">close</i>
                    </span>
                </li>
              </ul>
              <p v-if="feedback" class="red-text">{{ feedback }}</p>
              <button class="btn pink">Update Recipe</button>
          </div>
          
      </form>
  </div>
</template>

<script>
import {auth, db} from "@/firebaseInit"
import slugify from 'slugify'

export default {

    name: 'EditRecipe',
    data() {
        return {
            recipe: null,
            another: null,
            feedback: null
        }
    },
    created() {
        let ref = db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
        ref.get().then((snapshot) => {
            snapshot.forEach(doc => {
                this.recipe = doc.data()
                this.recipe.id = doc.id
            })
        })
    },
    methods: {
        EditRecipe() {
            if(this.recipe.title) {
                this.feedback = null
                //create a slug
                this.slug = slugify(this.recipe.title, {
                    replacement: '-', //every time is a space
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('recipes').doc(this.recipe.id).update({
                    title: this.recipe.title,
                    ingredients: this.recipe.ingredients,
                    slug: this.recipe.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a recipe title'
            }
        },
        addIng() {
            if(this.another) {
                this.recipe.ingredients.push(this.another)
                this.another = ""
            }
            else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style lang="sass">
    .edit-recipe
        margin-top: 60px
        padding: 20px
        max-width: 500px
        h2 
            font-size: 2em
            margin: 20px auto
        .field
            margin: 20px auto
            position: relative
        .delete
            position: absolute !important
            right: 0 !important
            bottom: 16px !important
            color: #aaa !important
            font-size: 1.4em !important
            cursor: pointer !important
</style>