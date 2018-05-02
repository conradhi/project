<template>
  <div v-if="ready" class="col-12">
    <div class="m-4 p-4"  id="results">
      <div class="col-12">
        <div class="col-12 text-center">
          <h4>{{currentCity}}</h4>
          <div class='btn-group'>
            <button class='btn btn-primary' v-bind:class="{toggle: showHumidity}" @click="toggleHumidity()">Humidity</button>
            <button class='btn btn-primary' v-bind:class="{toggle: showTemp}" @click="toggleTemp()">Temperature</button>
            <button class='btn btn-primary' v-bind:class="{toggle: showClouds}" @click="toggleClouds()">Clouds</button>
          </div>
          <div>
            <select v-model="selected" @change="onChange()">
              <option disabled value="">Please select one</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <span>Mean value for {{ getDays() }} days:  {{gettingValue(selected)}}</span>
          </div>
        </div>
          <!--
          <div v-if="ready" v-for="(temp, index) in forecast" class="col-12">
             <div class="col-12 text-center">
             
              <h6>Temp: {{forecast[index].main.temp}} C  {{forecast[index].dt_txt}}</h6>
            </div>
         </div>-->
         <div v-if="showHumidity"><line-chart :data="humChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="% Humidity"></line-chart></div>
         <div v-else-if="showTemp"><line-chart :data="tempChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="Temperature C"></line-chart></div>
         <div v-else-if="showClouds"><line-chart :data="cloudChart" :colors="['#B8B8B8', '#b00']" xtitle="Date and Time" ytitle="% Clouds"></line-chart></div>
         <router-link class='btn btn-primary mb-3' to="/destinations" @click.native="back" exact>Back to search results</router-link>
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
        this.currentCity = weather.city.name
        this.forecast = weather.list
        this.ready = true
        this.temperatureList(weather.list);
        this.humidityList(weather.list);
        this.cloudList(weather.list);
        this.status = 'LOADED'
      }).catch(() => {
        this.status = 'ERROR'
      })
      console.log("created")
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
        humChart: [],
        tempChart: [],
        cloudChart: [],
        ready: false,
        showHumidity: false,
        showTemp: true,
        showClouds: false,
        
      } 
    },

    methods: {

      back(){
        modelInstance.clearCurrentCity();

      },

      // retrieving the amount of days (from the model) that mean values will be calculated on 
      getDays(){
        return modelInstance.getSelectedDays();
        console.log(this.selected)
      },

      // whenever the user changes the amount of days, the values will be updated
      onChange(){
        modelInstance.setSelectedDays(this.selected);
        console.log(modelInstance.getSelectedDays());
        gettingValue(modelInstance.getSelectedDays());
      },

      gettingValue(num){
        return modelInstance.getValue(num, this.showHumidity, this.showTemp, this.showClouds, this.humChart, this.tempChart, this.cloudChart);
      },

      toggleClouds(){
        this.showClouds = true;
        this.showHumidity = false;
        this.showTemp = false;
      },
      toggleHumidity(){
        this.showClouds = false;
        this.showHumidity = true;
        this.showTemp = false;
      },
      toggleTemp(){
        this.showClouds = false;
        this.showHumidity = false;
        this.showTemp = true;
      },

      update() {
      },
      
      // 3 methods for creating 3 lists for the graphs
      temperatureList(obj){
        for(var i=0; i< obj.length; i++){
          this.tempChart.push([obj[i].dt_txt, Math.round(obj[i].main.temp-273.15)]);
        }
      },
      humidityList(obj){
        for(var i=0; i< obj.length; i++){
          this.humChart.push([obj[i].dt_txt, Math.round(obj[i].main.humidity)]);
        }
      },
      cloudList(obj){
        for(var i=0; i< obj.length; i++){
          this.cloudChart.push([obj[i].dt_txt, obj[i].clouds.all]);
        }
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

.toggle{
  background: blue;
}

</style>
