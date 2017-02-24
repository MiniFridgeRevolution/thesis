var chai = require('chai');
var expect = chai.expect;
var io = require('socket.io-client');
var client1;
var client2;

var options ={
      transports: ['websocket'],
      'force new connection': true
    };


describe('socket', function() {

  beforeEach(function (done) {
    client1 = io("http://localhost:8080", options);
    done();
  });

  afterEach(function (done) {
    client1.disconnect();
    client2.disconnect();
    done();
  });

  it ('should give error message if room is already taken', function (done) {

    client1.on('connect', function() {
      client1.emit('addroom', 'roomA');
      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('addroom', 'roomA');

        client2.on('room-exists', function(msg) {
          expect(msg).to.equal('The room name is taken, please try other names');
          done();
        })
      });
    })
  });

  it ('should give welcome message if room is not taken', function (done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomB');

      client1.on('welcome', function(msg) {
        expect(msg).to.equal('a new user has joined the room');
        done();
      })

    });
  });

  it ('should notify others in the room when a user joins', function (done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'roomC');

        client1.on('welcome', function(msg) {
          expect(msg).to.equal('a new user has joined the room');
          done();
        })
      })
    });
  });


  it ('should broadcast to all in the room when a change is made to the editor', function (done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomD');
      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'roomD');

        client1.emit('editor-content-changes', 'roomD', 'changes to the editor');

        client2.on('editor-content-changes', function(val) {
          expect(val).to.equal('changes to the editor');
          done();
        });
      });
    });
  });

  it ('should broadcast submit value to others in room', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomE');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'roomE');

        client1.emit('submit-val', 'roomE', 'some value to submit');

        client2.on('submit-val', function(val) {
          expect(val).to.equal('some value to submit');
          done();
        });
      });
    });
  });

  it ('should send the description to peer connection', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomF');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'roomF');

        client1.emit('sendDescription', 'roomF', 'description for remote video');

        client2.on('description', function(desc) {
          expect(desc).to.equal('description for remote video');
          done();
        });
      });
    });
  });

  it ('should send the ice Candidates to peer connection', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'roomG');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'roomG');

        client1.emit('sendCandidate', 'roomG', 'ice candidate');

        client2.on('candidate', function(can) {
          expect(can).to.equal('ice candidate');
          done();
        });
      });
    });
  });

});