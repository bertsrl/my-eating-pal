import Vue from 'vue'
import App from './App.vue'
import { auth } from './firebaseInit'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let app; 

auth.onAuthStateChanged( user => {
  console.log("Your user: ", user )
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

