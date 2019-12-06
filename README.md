# weather-app

A [Sails v1](https://sailsjs.com) application

Demo the app: `cd weather-app && sails lift`
Test the app:
```
./node_modules/mocha/bin/mocha ./test/controller.indexcontroller.js
./node_modules/bin/mocha ./test/helper.zip-lookup.js
```

Goal of the application is to allow searching for weather by zip code and displaying results using the DarkSky API.

## Considerations

* DarkSky API accepts latitude, longitude arguments in query
  * Use of another API may be necessary to translate zip code input to latitude, longitude
* If there is a need to look up the zip code, it may be good to use some sort of persistence (db, disk cache) to avoid repeated calls
* Functionality related to API calls should be extracted into a service layer
* Tests should cover the ability of the service layer to return data
* DarkSky API key should be stored in a server-side configuration file or within an environment variable, not committed to repository

## Layout and design

* Web application initially loads current forecast information for 5 select zip codes across the contiguous US
  * San Diego, CA
  * Seattle, WA
  * Denver, CO
  * Portland, ME
  * Miami, FL
* Submission (POST) to backend handled by controller method
  * Backend services (SailsJS helpers) leveraged to
    * query/store the information for a zip code, city, latitude, and longitude
    * API call for zip code lookup
    * API call for weather forecast
* Result data may be displayed on a separate page, traditional MVC

## Enhancements

* Implement VueJS Single Page app
  * axios call to backend API endpoint, consume JSON result
  * refresh page data
* Experiment with different taskrunner pipelines (Gulp)
  * SailsJS defaults to Grunt
