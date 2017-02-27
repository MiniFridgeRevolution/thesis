var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var server = require('./../server/app.js');

describe('basic routes', function() {
  it ('should make a get request', function (done) {
    chai.request(server)
      .get('/user')
      .end(function(err, result) {
        expect(result.status).to.equal(200);
        done();
      });
  });
});

xdescribe('Pending routing test 2', function() {
  it ('should test routing 2');
});

xdescribe('Pending routing test 3', function() {
  it ('should test routing 3');
});