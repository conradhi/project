# VACATION WEATHER

<hr>

## Description

The application aims to facilitate the process of planning a vacation destination with respect to where the weather is pleasant.
OBS! Firebase deployment is under construction, please use localHost to run the application!

<hr>

### Done
* Basic setup of application
* Fetch current weather from API
* Store data to Firebase
* Fetch Five day forecast from API
* Plot in graph

### ToDo
* Store presistent states (when going back/reload app)
* Start with showing temperature
* Same design on buttons
* Confirm button?
* Warning when not entering search string
* No duplicates when searching for cities
* Remove chosen city
* Deploy app in Firebase

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
