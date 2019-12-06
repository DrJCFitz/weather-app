const Sails = require('sails'),
  assert = require('assert'),
  sinon = require('sinon');
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
describe('helpers.zipLookup', function() {
  beforeEach(function(){
    // stub zipLookup
    zipCodeFindOne = sinon.stub(ZipCode, 'findOne').callsFake(() => null );
    // stub weatherApi
    // spy res
  });
  it('should return a zipCode object when at least one zipCode is found', function(done){
    // provide the fixture of sample data returned by zipApi call
    let fakedApiData = { zip: '02116', city: 'Boston', latitude: '42.349622', longitude: '-71.07372' };
    // stub the zipApi and use the faked data as callback
    sinon.stub(app.helpers, 'zipApi').callsFake(() => ({ fields: fakedApiData}) );
    // don't test the database layer here - assume that create will return a ZipCode model object
    sinon.stub(ZipCode, 'create').callsFake(() => ({zip_code: fakedApiData.zip, city: fakedApiData.city, latitude: fakedApiData.latitude, longitude: fakedApiData.longitude}) );

    // execute
    app.helpers.zipLookup('02116')
      .then(function(zipResult) {
        // check that the data matches
        assert.equal(fakedApiData.zip, zipResult.zip_code);
        assert.equal(fakedApiData.city, zipResult.city);
        assert.equal(fakedApiData.latitude, zipResult.latitude);
        assert.equal(fakedApiData.longitude, zipResult.longitude);
      });
    done();
  });
  it('should return an error message if input is invalid', function(done){
    // if the zipApi call returns zero records, an error is thrown to circumvent the creation of a ZipCode record
    sinon.stub(app.helpers, 'zipApi').throws();
    zipCodeCreate = sinon.spy(ZipCode, 'create');
    // need a better way of checking the error was thrown
    app.helpers.zipLookup('ABCDE')
      .then(function(result) {
      })
      .catch(function(err) {
      });
    assert(zipCodeCreate.notCalled);
    done();
  });
  afterEach(function(){
    ZipCode.findOne.restore();
    ZipCode.create.restore();
    app.helpers.zipApi.restore();
  });
})
after(function(done) {
  app.lower(done);
})
