/*const httpOptions = {
  headers: {'X-Mashape-Key': '6136693860b8ed827adace0ea28df125'}
};*/

import json from "./city.list.json"
const Model = function () {

  let observers = [];
  let cities = json;
  let currentCity = "";
  let weatherList = [];

  this.autoComplete = function (str){
    var results = [];
    var nrOfResults = 1;
    str = str.toLowerCase();
    if (str.length >= 1) {
      nrOfResults = 0;
      for (var i = 0; i < json.length; i++) {
        if (json[i].name.toLowerCase().startsWith(str)) {
          results.push(json[i]);
          nrOfResults++;
        }
      }
    }
    if(nrOfResults < 10 && nrOfResults >= 1) {
      results.sort();
      return results;
    }
    else if(nrOfResults > 10) {
      nrOfResults = 10;
      results = results.slice(0,nrOfResults);
      results.sort();
      return results;
    }
    else{
      results = [];
      return results;
    }
  }

  this.getWeatherList = function(){
    return weatherList;
  }

  this.setCurrentCity = function(id){
    currentCity = id;
    localStorage.currentCity = id;
  }

  this.getCurrentCity = function(){
    currentCity = localStorage.currentCity;
    return currentCity;
  }

  this.clearCurrentCity = function(){
    //currentCity = '';
    //localStorage.clear("currentCity");
    notifyObservers();
  }

  this.setWeatherList = function (weather){
    if(weatherList.length === 0){
      weatherList.push(weather);
      notifyObservers();
    }
    else{
      for(var i=0; i< weatherList.length; i++){
        if(weather.id === weatherList[i].id){
          alert("You already added this city");
          return;
        }
      }
      weatherList.push(weather);
    }
    console.log(weatherList);
    notifyObservers();
  }





  // API Calls

  this.getWeatherForecast = function(id){
    const url = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&APPID=6136693860b8ed827adace0ea28df125"
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }


  this.getWeather = function (id) {
    //https://api.openweathermap.org/data/2.5/forecast?id={city ID}
    const url = "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=6136693860b8ed827adace0ea28df125"
    
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getWeather() API Error:', error.message || error)
      })
    } else {
      console.error('getWeather() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
    

  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new Model();
