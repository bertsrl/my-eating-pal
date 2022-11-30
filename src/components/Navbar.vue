<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
     <div class="nav-content">
         <router-link :to="{name: 'AddRecipe'}">
            <span class="nav-title white-text">My Eating Pal</span>
         </router-link>
         <a class="login waves-effect waves-light btn white-text">
             <router-link :to="{ name: 'Login' }" class="white-text" > 
                <i class="cloud material-icons left white-text">cloud</i>Sign In
            </router-link>
        </a>
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
export default {
    name: 'Navbar',
    data() {
        return {
            
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