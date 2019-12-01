/**
 * ZipCode.js
 *
 * @description :: Point of reference for ZipCode
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    zip_code : { type: 'string', required: true },
    latitude : { type: 'string', required: true },
    longitude : { type: 'string', required: true }
  },

};
