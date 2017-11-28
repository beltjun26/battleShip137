var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

const express = require("express");
var players = [];
app.use(express.static("public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
