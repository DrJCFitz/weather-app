/**
 * SearchController
 *
 * @description :: Search for weather forecasts using a Zip Code
 */

module.exports = {
  index : async function(req, res) {
    // initialize response object
    let forecastResults = {
      error : false,
      message : '',
      zipCode : {},
      forecast : {}
    };

    // request param should have zipcode from input field
    try {
//      console.log(['req.param', req.param('zip_code')]);
      let zipCode = await sails.helpers.zipLookup(req.param('zip_code'));

      if (zipCode) {
  //      console.log(['call to darksky', zipCode]);
        // call DarkSky API
        let forecast = await sails.helpers.weatherApi(
            zipCode.latitude,
            zipCode.longitude
        );

//        console.log(['zipcode', zipCode]);
//        console.log(['forecast', forecast]);

        forecastResults.zipCode = zipCode;
        forecastResults.forecast = forecast;
      }
//      console.log(forecastResults);
    } catch (err) {
      forecastResults.error = true;
      forecastResults.message = err.message;
    }
//console.log([forecastResults]);
    res.view('pages/results', {results: forecastResults});
  }
};

