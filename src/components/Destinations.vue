<template>
  <div class="col-12 offset-md-3 col-md-9" id="rightContainer">
		<div class="container-fluid">
      <div class="row">

        <div v-if="ready" v-for="(city, index) in weatherList" class="col-4">
          <router-link v-bind:to="'/detailedview/' + weatherList[weatherList.length - index -1].id">
            <div class="m-4 p-4"  id="results">
              <div class="col-12" @click="setCurrentCity(weatherList[weatherList.length - index -1].id)">
                <div class="col-12 text-center">
                  <h4>{{weatherList[weatherList.length - index - 1].name}}</h4>
                </div>
                <div class="col-12 text-center">
                  <h6>Clouds: {{weatherList[weatherList.length - index - 1].clouds.all}} %</h6>
                </div>
                <div class="col-12 text-center">
                  <h6>Temp: {{Math.round(weatherList[weatherList.length - index - 1].main.temp - 273.15)}} C</h6>
                </div>
                <div class="col-12 text-center">
                  <h6>{{weatherList[weatherList.length - index - 1].weather[0].description}}</h6>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {modelInstance} from "./Model";

  export default {

    created() {
      modelInstance.addObserver(this)
    },

    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    data() {
      return {
        ready: false,
        status: 'INITIAL',
        search: "",
        weatherList: []
      }
    },

    methods: {

      setCurrentCity(id){
        modelInstance.setCurrentCity(id);
      },

      update(){
        this.ready = false,
        this.weatherList = modelInstance.getWeatherList(),
        this.ready = true
      }

    }
  }

</script>

<style scoped>

a:hover,  a:visited,  a:link,  a:active {
  color: white;
  text-decoration: none;
}

#results{
  color: white;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

#results:hover{
  box-shadow: 10px 10px 10px cyan;
}

#title{
  padding-bottom: 5px;
}



</style>
