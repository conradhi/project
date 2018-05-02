# VACATION WEATHER

<hr>

## Description

The application aims to facilitate the process of planning a vacation destination with respect to where the weather is pleasant.
Search for desired destination and receive information about temperature, humidity and clouds over the next five days.

OBS! Firebase deployment is under construction, please use localHost to run the application!

<hr>

### Done
* Basic setup of application
* Fetch current weather from API
* Store data to Firebase
* Fetch Five day forecast from API
* Plot in graph
* Start with showing temperature
* Same design on buttons
* No duplicates when searching for cities
* Delete confirm button
* Remove chosen city (Elin & Anna)

### ToDo
* Store presistent states (when going back/reload app) (conrad)
* Deploy app in Firebase (Carro)
* Add functionality containing calulations on API data. Display mean values of data under each graph for 1 to 5 days. (almost done, not dynamic yet)

<hr>

## File Structure

**Main**

**Router**
Routes the different views in the application.

**Model**
Contains all the set- and get-functions as well as all the calculations.

**Welcome**
Welcome screen.

**Search**
Component containing search bar.

**Destinations**
Render search results.

**Detailed View**
Detailed view of searched destination.

**City List**
JSON file with all available cities. This file enables autocomplete in the search function.
