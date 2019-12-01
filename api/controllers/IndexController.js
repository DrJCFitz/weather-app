/**
 * IndexController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index : function(req, res) {
    console.log([sails.darksky_api_key]);
    console.log([env(darksky_api_key)]);
    // display some data for default zipcodes
    // on an index page
    // San Diego, Seattle, Portland ME, Miami, Aspen?
  }
};

