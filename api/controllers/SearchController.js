/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index : async function(req, res) {
    // request param should have zipcode from input field
    var zipCode;

    if (req.param('zip_code')) {
      // see if there's already a record stored
      try {
        zipCode = await ZipCode.findOne({
          zip_code: req.param('zip_code')
        });
      } catch (err) {
        console.log(err);
      }
    }

    if ( !zipCode ) {
      // use ZipLookup Helper
      var zipData = await sails.helpers.zipLookup(req.param('zip_code'));
      zipCode = await ZipCode.create({
        'zip_code' : zipData.fields.zip,
        'latitude' : zipData.fields.latitude,
        'longitude' : zipData.fields.longitude
      });
    }

    // call DarkSky API
    console.log(['zipcode', zipCode]);
    var forecastResults = await sails.helpers.weatherApi.with(
       {
          latitude : zipCode.latitude,
          longitude : zipCode.longitude
        });
    // format results using Forecast Helper
    // * await sails.helpers.forecast.with({
    //             someInput: …,
    //             someOtherInput: …
    //           });
  }
};

