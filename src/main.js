import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import Routes from './router'

// Use packages

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false


// Register routes

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
