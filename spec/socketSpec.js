var chai = require('chai');
var expect = chai.expect;
var io = require('socket.io-client');
var client1;
var client2;

var options ={
      transports: ['websocket'],
      'force new connection': true
    };


xdescribe('socket', function() {

  beforeEach(function (done) {
    client1 = io("http://localhost:8080", options);
    done();
  });

  afterEach(function (done) {
    client1.disconnect();
    client2.disconnect();
    done();
  });

  it ('1. should give error message if room is already taken', function (done) {

    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomA');
      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('addroom', 'client2', 'roomA');

        client2.on('room-exists', function(msg) {
          expect(msg).to.equal('The room name is taken, please try other names');
          done();
        })
      });
    })
  });


  it ('2. should give welcome message if room is not taken', function (done) {

    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomB');

      client1.on('info', function(msg) {

        expect(msg).to.equal('You have created a room roomB');

        done();
      })      

    });
  });

  it ('3. user should be notified when successfully joined the room', function () {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomC');


        client2.on('info', function(msg) {
          expect(msg).to.equal('You joined the room');
          // done();
        })
      })
    });
  });

  it ('4. should notify others in the room when a user joins', function () {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomC').then(function() {
        client1.on('info', function(msg) {
          expect(msg).to.equal('a new user has joined the room');
          // done();
        })
          
        });

      })
    });
  });

  it ('5. user cannot join the room if he/she is already in the room', function () {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomC');
        client2.emit('join-room', 'client2', 'roomC');

        client2.on('info', function(msg) {
          expect(msg).to.equal('You are already in the room');
          // done();
        })

      })
    });
  });

  it ('6. user should be notified when he/she exits the room', function () {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomC');

        client1.emit('exit_room', 'client1', 'roomC');

        client1.on('info', function(msg) {
          expect(msg).to.equal('You left the room');
          // done();
        })
      })
    });
  });  

  it ('7. should notify other user when a user exits the room', function () {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomC');

      client2 = io("http://localhost:8080", options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomC');

        client2.emit('exit_room', 'client2', 'roomC');

        client1.on('info', function(msg) {
          expect(msg).to.equal('the other user exit the room');
          // done();
        })
      })
    });
  });

  it ('8. should broadcast to all in the room when a change is made to the editor', function (done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1', 'roomD');
      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomD');

        client1.emit('editor-content-changes', 'roomD', 'changes to the editor');

        client2.on('editor-content-changes', function(val) {
          expect(val).to.equal('changes to the editor');
          done();
        });
      });
    });
  });

  it ('9. should broadcast submit value to others in room', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1','roomE');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomE');

        client1.emit('submit-val', 'roomE', 'some value to submit');

        client2.on('submit-val', function(val) {
          expect(val).to.equal('some value to submit');
          done();
        });
      });
    });
  });

  it ('10. should send the description to peer connection', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1','roomF');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room', 'client2', 'roomF');

        client1.emit('sendDescription', 'roomF', 'description for remote video');

        client2.on('description', function(desc) {
          expect(desc).to.equal('description for remote video');
          done();
        });
      });
    });
  });

  it ('11. should send the ice Candidates to peer connection', function(done) {
    client1.on('connect', function() {
      client1.emit('addroom', 'client1','roomG');

      client2 = io('http://localhost:8080', options);

      client2.on('connect', function() {
        client2.emit('join-room','client2', 'roomG');

        client1.emit('sendCandidate', 'roomG', 'ice candidate');

        client2.on('candidate', function(can) {
          expect(can).to.equal('ice candidate');
          done();
        });
      });
    });
  });

});