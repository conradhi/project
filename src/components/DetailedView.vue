<template>
  <div v-if="ready" class="col-12">
      <div class="m-4 p-4"  id="results">
        <div class="col-12">
          <div class="col-12 text-center">
            <h4>{{currentCity}}</h4>
          </div>
          <div class="col-12 text-center">
            <h6>Clouds: </h6>
          </div>
          <div class="col-12 text-center">
            <h6>Temp:  C</h6>
          </div>
          <div class="col-12 text-center">
            <h6></h6>
          </div>

          <div v-if="ready" v-for="(temp, index) in forecast" class="col-12">
             <div class="col-12 text-center">
              <h6>Temp: {{forecast[index].main.temp}} C  {{forecast[index].dt_txt}}</h6>
         </div>
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
      modelInstance.getWeatherForecast(modelInstance.getCurrentCity()).then(weather => {
        console.log(weather);
        console.log(weather.city.name);
        this.currentCity = weather.city.name
        this.forecast = weather.list
        this.ready = true
        this.status = 'LOADED'
      }).catch(() => {
        this.status = 'ERROR'
      })
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      modelInstance.removeObserver(this)
    },

    data() {
      return {
        currentCity: '',
        forecast: [],
        ready: false
      }
    },

    methods: {
      // in our update function we modify the the property of
      // the compoented which will cause the component to re-render
      update() {
      }

    }
  }

</script>

<style scoped>

#results{
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
}

#results:hover{
  box-shadow: 10px 10px 10px cyan;
  background: rgba(0, 0, 0, 0.9);
}

</style>
