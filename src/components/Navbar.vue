<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
     <div class="nav-content">
         <router-link :to="{name: 'Index'}">
            <span class="nav-title white-text">My Eating Pal</span>
         </router-link>
         <div class="loginConfirmation">
             Logged in
             <span v-if="loggedIn">
                Yes
                <button class="signOutBtn waves-effect waves-light btn white-text" @click="signOut">Sign Out</button>
            </span>
             <span v-else>No</span>
         </div>
         <a v-if="!loggedIn" class="login waves-effect waves-light btn white-text">
             <router-link :to="{ name: 'Login' }" class="white-text" > 
                <i class="cloud material-icons left white-text">cloud</i>Sign In
            </router-link>
        </a>
        <div v-else />
         <a class="btn-floating btn-large halfway-fab waves-effect waves-light teal pink">
            <router-link :to="{ name: 'AddRecipe' }"> 
                <i class="material-icons">add</i>
            </router-link>
         </a>
    </div>
    </nav>
  </div>
</template>

<script>
import { auth } from '@/firebaseInit'

export default {
    name: 'Navbar',
    mounted() {
        auth.onAuthStateChanged( user => {
            this.loggedIn = !!user;
        })
    },
    data() {
        return {
            loggedIn: false
        }
    },
    methods: {
        async signOut() {
            try {
                const data = await auth.signOut();
                console.log(data);
                this.$router.replace({ name: "Login" })
            } catch(err) {
                console.log(err)
            }

        }
    }
}
</script>

<style lang="sass">
    .nav-extended
        height: 9rem !important
    .nav-title
        width: 100% !important
        text-align: left
    .nav-content
        display: flex
        flex-direction: row
        justify-content: space-between
        .signOutBtn
            margin-top: 5px
            border-radius: 1.5rem !important
        .loginConfirmation
            display: flex
            flex-direction: column
            justify-content: space-around
            padding-right: 70px
            span
                display: inherit
                flex-direction: inherit
        .login
            width: 10rem
            height: 2.5rem
            text-align: center
            display: flex
            justify-content: center
            border-radius: 1.5rem !important
            .cloud
                height: unset !important
                line-height: unset !important
        
</style>