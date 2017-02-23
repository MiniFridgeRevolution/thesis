var app = require('./app.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('A user connected!');
  numUsers++;

  socket.join("room-" + roomNo);


  socket.on('sendDescription', function(data) {
    socket.broadcast.emit('description', data);
  });


  socket.on('sendCandidate', function(data){
    socket.broadcast.emit('candidate', data);
  });


  io.sockets.in("room-"+roomNo).emit('newUser', numUsers);

  socket.on('disconnect', function() {
    numUsers--;
    socket.leave("room-" + roomNo);
    io.sockets.in("room-"+roomNo).emit('newUser', numUsers);
    console.log('A user disconnected');
  })
});
