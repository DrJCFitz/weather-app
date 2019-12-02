/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index : async function(req, res) {
    // request param should have zipcode from input field
    let zipCode = await sails.helpers.zipLookup(req.param('zip_code'));

    let forecastResults = {};
    console.log(['zipcode', zipCode]);
    if (zipCode) {
      // call DarkSky API
      let forecast = await sails.helpers.weatherApi.with(
        {
          latitude : zipCode.latitude,
          longitude : zipCode.longitude
        });
      console.log(['forecast', forecast]);

      forecastResults = {
        zipCode : zipCode,
        forecast : forecast
      };
    }

    res.view('pages/results', {results: forecastResults});
  }
};

