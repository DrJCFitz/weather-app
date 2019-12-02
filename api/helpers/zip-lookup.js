const axios = require('axios');

module.exports = {


  friendlyName: 'Zip Lookup',


  description: 'Check for an existing Zip Code record or create one using data from the Zip Code API',


  inputs: {
    zip_code : {
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
    let zipCode;

    // see if there's already a record stored
    try {
      zipCode = await ZipCode.findOne({
        zip_code: inputs.zip_code
      });
    } catch (err) {
      console.log(err);
    }

    if ( !zipCode ) {
      // use ZipLookup Helper
      let zipData = await sails.helpers.zipApi.with(
        {
          zipCode: inputs.zip_code
        });
      zipCode = await ZipCode.create({
        'zip_code' : zipData.fields.zip,
        'city' : zipData.fields.city,
        'latitude' : zipData.fields.latitude,
        'longitude' : zipData.fields.longitude
      });
    }

    return exits.success(zipCode);
  }
};
