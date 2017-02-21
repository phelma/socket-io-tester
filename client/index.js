'use strict';

console.log('hello world');

let socket = io.connect();

socket.on('ping11', function (data) {
  console.log(data);
  socket.emit('pong11', {
    serverTime: data.time,
    clientTime: Date.now()
  });
});
