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
    console.log([sails.config.darksky_api_key, inputs.latitude, inputs.longitude]);
    if (sails.config.darksky_api_key) {
      axios.get(`https://api.darksky.net/forecast/${sails.config.darksky_api_key}/${inputs.latitude},${inputs.longitude}`)
        .then(function (response) {
          console.log(response.data);
          //return sails.helpers.forecast.with();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
