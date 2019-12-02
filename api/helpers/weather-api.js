const axios = require('axios');

module.exports = {


  friendlyName: 'Weather API',


  description: 'Find weather for forecast using Dark Sky API',


  inputs: {
    latitude : {
      type : 'string',
      required : true
    },
    longitude : {
      type : 'string',
      required : true
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    if (process.env.darksky_api_key) {
      axios.get(`https://api.darksky.net/forecast/${process.env.darksky_api_key}/${inputs.latitude},${inputs.longitude}`,{
          params : {
            exclude : 'minutely,hourly,flags'
          }
        })
        .then(function (response) {
          //console.log(response.data);
          return sails.helpers.forecastResource.with(
            {
              current: response.data.currently,
              daily: response.data.daily,
              alerts: response.data.alerts
            }
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
