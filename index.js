'use strict';
const port = 3000;

const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const getId = require('shortId').generate;

app.use('/app', serveStatic('client'))

io.on('connection', (socket) => {
  let counter = 0;

  socket.on('pong11', function (data) {
    let timeNow = Date.now();
    let timeDiff = timeNow - data.serverTime;
    console.log(`${socket.id} - ${data.counter} Ping took ${timeDiff}ms`);
  });

  setInterval(() => {
    let data = {
      time: Date.now(),
      counter: ++counter
    };
    socket.emit('ping11', data);
  }, 1000)
})

server.listen(port, () => {
  console.log(`Listening on ${port}`);
})
