<template>
  <div class="add-recipe container">
      <h2 class="center-align indigo-text">Add New Recipe</h2>
      <form @submit.prevent="AddRecipe">
          <div class="field title">
              <label for="title">Smoothie Title:</label>
              <input type="text" name="title" v-model="title">
          </div>
          <div class="field add-ingredient">
              <label for="add-ingredient">Add ingredient:</label>
              <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
          </div>
          <div class="field center-align">
              <ul class="ingredients">
                <li v-for="(ing, index) in ingredients" :key="index">
                    <span class="chip">
                        {{ ing }}
                        <i class="material-icons close" @click="deleteIng(ing)">close</i>
                    </span>
                </li>
              </ul>
              <p v-if="feedback" class="red-text" >{{ feedback }}</p>
              <button class="btn pink">Add Recipe</button>
          </div>
          
      </form>
  </div>
</template>

<script>
import {auth, db} from "@/firebaseInit"
import slugify from 'slugify'
import { id } from 'date-fns/locale'

export default {
    
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddRecipe() {
            if(this.title) {
                this.feedback = null
                //create a slug
                this.slug = slugify(this.title, {
                    replacement: '-', //every time is a space
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('recipes').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = ""
            }
            else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}


</script>

<style lang="sass">
    .add-recipe
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
        ul
            margin: 30px auto
            width: 100%
            display: flex
            flex-wrap: wrap
</style>