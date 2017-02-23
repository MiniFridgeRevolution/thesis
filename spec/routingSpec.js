var chai = require('chai');
var expect = chai.expect;

xdescribe('The test itself!', function() {
  it ('should test something simple', function() {
    expect(1).to.equal(1);
  });
});


//pending tests
xdescribe('Pending routing test 1', function() {
  it ('should test routing 1');
});

xdescribe('Pending routing test 2', function() {
  it ('should test routing 2');
});

xdescribe('Pending routing test 3', function() {
  it ('should test routing 3');
});