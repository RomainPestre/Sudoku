import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'

import Login from './components/Login'
import Home from './components/Home'
import Books from './components/Books'
Vue.config.productionTip = false
// cette ligne est importante pour les sessions (en mode développement)
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/books', component: Books }
]
const router = new VueRouter({
  routes
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
