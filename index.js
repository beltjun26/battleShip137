var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);
var session = require('express-session')({
  secret: "my-secret",
  resave: true,
  saveUninitialized:true
});
var sharedsession = require('express-socket.io-session');

app.use(session);
io.use(sharedsession(session));

const express = require("express");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));

players = [];
playerField = new Array(2);
app.use(express.static("public"));

app.get('/',  function(req, res){

  if(players.length == 2){
    res.sendFile(__dirname + '/error.html');
  }
  if(players.length < 2){
    res.sendFile(__dirname + '/name.html');
  }
});

app.get('/setupShip', function(req, res){
  res.sendFile(__dirname + '/battleship.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

io.on('connection', function(socket){
  console.log('new Connection');
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
  });

  socket.on('battlefield layout', function(battlefield,name){
    console.log(name);
    console.log('recieved form battle');
    if(players[0]==name){
      playerField[0]=battlefield;
    }else{
      playerField[1]=battlefield;
    }
    console.log(playerField);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
