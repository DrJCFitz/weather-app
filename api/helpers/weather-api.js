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


  fn: async function (inputs, exits) {
    if (sails.config.darksky.api_key) {
      axios.get(`https://api.darksky.net/forecast/${sails.config.darksky.api_key}/${inputs.latitude},${inputs.longitude}`,{
          params : {
            exclude : 'minutely,hourly,flags'
          }
        })
        .then(function (response) {
          return exits.success({
              current: response.data.currently,
              daily: response.data.daily,
              alerts: response.data.alerts
            });
        })
        .catch(function (error) {
          console.log(error);
          return exits.error(err);
        });
    }
  }
};
