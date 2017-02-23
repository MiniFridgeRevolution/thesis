var chai = require('chai');
var expect = chai.expect;
var socket = require('socket.io-client');

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe('socket', function() {

  it ('should exist', function() {
    expect(socket).to.not.be.undefined;
  });

  var client1 = socket("http://localhost:8080", options);
  var client2 = socket("http://localhost:8080", options);

  it ('should increment users who connect', function() {
    client2.on('newUser', function(numUsers){
      numberOfUsers = numUsers
      numberOfUsers.should.equal(2);
      client2.disconnect();
    });
  });

  it ('should decrement users who disconnect', function() {
    client1.on('newUser', function(numUsers) {
     numUsers.should.equal(1);    
    });
  });

});

describe('sendDescription', function() {

  var client1 = socket("http://localhost:8080", options);
  var client2 = socket("http://localhost:8080", options);

  it ('should send sendDescription event', function() {
    client1.emit('sendDescription', 'Example description');
    client1.on('sendDescription', function(data) {
      data.should.equal('Example description');
    });
  });

  it ('should broadcast description event', function() {
    client1.emit('sendDescription', 'Example description');
    client2.on('description', function(data) {
      data.should.equal('Example description');
    });
  });


});

describe('sendCandidate', function() {
  var client1 = socket("http://localhost:8080", options);
  var client2 = socket("http://localhost:8080", options);

  it ('should send sendCandidate event', function() {
    client1.emit('sendCandidate', 'Example candidate');
    client1.on('sendCandidate', function(data) {
      data.should.equal('Example candidate');
    });
  });

  it ('should broadcast candidate event', function() {
    client1.emit('sendCandidate', 'Example candidate');
    client2.on('candidate', function(data) {
      data.should.equal('Example candidate');
    });
  });
})