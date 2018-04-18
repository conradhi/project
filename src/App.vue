<template >
  <div>
    <header>
  	   <h1>Weather forecast</h1>
	  </header>
    <div class="row">
      <router-view name="navbar" id="fixed"></router-view>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Welcome from './components/Welcome.vue';
import Sidebar from './components/Sidebar.vue';
import Dishes from './components/Dishes.vue';
import Recipe from './components/Recipe.vue';



export default {
//  name: 'App'
  components: {
       'welcome': Welcome,
       'recipe': Recipe,
       'sidebar': Sidebar,
       'dishes': Dishes,
     }
 }
</script>

<style scoped>

  #fixed{
    position: fixed;
  }

  header {
    background: white;
    color: blue;
    margin: 0;
    opacity: 1;
    padding: 5px;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    #fixed {
        position: relative;
    }
  }

</style>
