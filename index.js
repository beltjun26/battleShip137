var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

const express = require("express");
players = [];
app.use(express.static("public"));

app.get('/',  xfunction(req, res){
  res.sendFile(__dirname + '/name.html');
});

app.get('/playGame', function(req, res){
  res.sendFile(__dirname + '/battleship.html');
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('player name', function(name){
    console.log(name);
    players.push(name);
    console.log(players);
    if(players.length == 2){
      io.emit('start game');
    }
  })

  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
