const Sails = require('sails'),
  assert = require('assert'),
  sinon = require('sinon'),
  IndexController = require('../api/controllers/IndexController');
let app;

before(function(done) {
  Sails.lift({
    log : {
      level : 'error'
    },
  }, function(err, sails) {
    app = sails;
    done(err,sails);
  });
});
describe('IndexController.search', function() {
  let req,
    view;
  beforeEach(function(){
    // fixture for the request param
    req = {
      param: function (input) {
        return '02116';
      }
    };
    view = sinon.spy();
  });
  it('check darksky api key set via local.js', function(){
    // this will be truthy when defined properly
    assert(app.config.darksky.api_key);
  });
  it('should return a results page if input is valid', async function(){
    let fakedModelData = { zip_code : '02116', city : 'Boston', latitude : '42.349622', longitude : '-71.07372' },
      fakedWeatherData = { current: {}, daily: [], alerts: [] };
    sinon.stub(app.helpers, 'zipLookup').callsFake(() => fakedModelData);
    sinon.stub(app.helpers, 'weatherApi').callsFake(() => fakedWeatherData);
    await IndexController.search(req, { 'view' : view })
      .then(function() {
        assert(view.calledWith('pages/index', { results: [{ error: false, message: '', zipCode: fakedModelData, forecast: fakedWeatherData }] }));
      });
    app.helpers.zipLookup.restore();
    app.helpers.weatherApi.restore();
  });
  it('should return an error message if input cannot be used for zipcode lookup', async function(){
    let view = sinon.spy();
    sinon.stub(app.helpers, 'zipLookup');
    await IndexController.search(req, { 'view' : view })
      .then(function() {
        assert(view.calledWith('pages/index', { results: [{ error: true, message: `Could not determine a location from Zip Code ${req.param()}.`, zipCode: {}, forecast: {} }] }));
      });
    app.helpers.zipLookup.restore();
  });
  it('should return an error message if the zip lookup step fails', async function(){
    let errmsg = `Zip Code ${req.param()} invalid.`,
      err = new Error(`Zip Code ${req.param()} invalid.`);
    sinon.stub(app.helpers, 'zipLookup').throws(() => err);
    await IndexController.search(req, { 'view' : view })
      .then(function() {
        assert(view.calledWith('pages/index', { results: [{ error: true, message: errmsg, zipCode: {}, forecast: {} }] }));
      });
    app.helpers.zipLookup.restore();
  });
  afterEach(function(){
  });
})
after(function(done) {
  app.lower(done);
})
