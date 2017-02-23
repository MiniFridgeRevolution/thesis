var chai = require('chai');
var expect = chai.expect;
// var stubs = require('./Stubs');
// var server = require('./server');

// describe('The test itself!', function() {
//   it ('should test something simple', function() {
//     expect(1).to.equal(1);
//   });
// });

// Conditional async testing, akin to Jasmine's waitsFor()
// Will wait for test to be truthy before executing callback
var waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

//pending tests
xdescribe('Node Server Request Listener Function', function() {
  it('Should answer GET requests for /dashboard with a 200 status code', function() {
    // This is a fake server request. Normally, the server would provide this,
    // but we want to test our function's behavior totally independent of the server code
    var req = new stubs.request('http://localhost:8080/dashboard', 'GET');
    var res = new stubs.response();

    // handler.requestHandler(req, res);

    // expect(req).to.equal(200);
    // expect(res._ended).to.equal(true);
  });
});

xdescribe('Pending server test 2', function() {
  it ('should test server 2');
});

xdescribe('Pending server test 3', function() {
  it ('should test server 3');
});