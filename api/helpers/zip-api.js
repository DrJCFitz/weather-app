const axios = require('axios');

module.exports = {


  friendlyName: 'Zip API',


  description: 'Query the Latitude and Longitude for a Zip Code from Public Open Data API',


  inputs: {
    zipCode : {
      type : 'string',
      required : true,
      example : '01938',
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const err = {code: 0, message: `Zip Code ${inputs.zipCode} invalid.`}

    axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
      params: {
        dataset : 'us-zip-code-latitude-and-longitude',
        q: inputs.zipCode
      }
    })
    .then(function (response) {
      if (response.data.records.length) {
        return exits.success(response.data.records[0]);
      }
      return exits.error(err);
    })
    .catch(function (error) {
      //console.log(error);
      return exits.error(error);
    });
  }
};
