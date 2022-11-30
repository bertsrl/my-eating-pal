<template>
  <div class="add-recipe container">
      <h2 class="center-align indigo-text">Sign into your account</h2>
      <form @submit.prevent="loginButtonPressed">
          <div class="field email">
              <label for="email">Email:</label>
              <input type="text" name="title" @keydown.enter.prevent="loginButtonPressed" v-model="email">
          </div>
          <div class="field password">
              <label for="password">Password:</label>
              <input type="password" name="password" @keydown.enter.prevent="loginButtonPressed" v-model="password">
          </div>
          <div class="field center-align">
              <p v-if="feedback" class="red-text" >{{ feedback }}</p>
              <button class="btn pink">Login</button>
          </div>
          
      </form>
  </div>
</template>

<script>
import {auth, db} from "@/firebaseInit"
import slugify from 'slugify'
import { id } from 'date-fns/locale'
import firebase from "firebase";

export default {
    
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        async loginButtonPressed() {
            
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