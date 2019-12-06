/**
 * IndexController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/**
 * Reusable method that fetches forecast results
 * for an array of zip_code inputs
 *
 * @param zip_codes
 * @returns array
 */
const getForecastResults = async function( zip_codes ) {
  return Promise.all(
    _.map(zip_codes, async function (zip_code) {
      let result = {
        error : false,
        message : '',
        zipCode : {},
        forecast : {}
      };

      // request param should have zipcode from input field
      try {
        let zipCode = await sails.helpers.zipLookup(zip_code);
        if (zipCode) {
          // call DarkSky API
          let forecast = await sails.helpers.weatherApi(
            zipCode.latitude,
            zipCode.longitude
          );
          Object.assign(result, { zipCode: zipCode, forecast: forecast });
        } else {
          Object.assign(result, { error: true, message: `Could not determine a location from Zip Code ${zip_code}.` });
        }
      } catch (err) {
        Object.assign(result, { error: true, message: err.message });
      }
      return result;
    })
  );
}
module.exports = {
  index : async function(req, res) {
    // display some data for default zipcodes on index page
    // San Diego, Seattle, Aspen, Portland ME, Miami
    const zip_codes = ["92101", "98109", "81611", "04101", "33101"];
    let forecastResults = await getForecastResults(zip_codes);
    res.view('pages/index', {results: forecastResults});
  },
  search : async function(req, res) {
    let forecastResults = await getForecastResults([req.param('zip_code')]);
    res.view('pages/index', { results: forecastResults });
  }
};

