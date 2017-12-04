var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);
var session = require('express-session')({
  secret: "my-secret",
  resave: true,
  saveUninitialized:true
});

var gameSocket = io.of('/game');
var sharedsession = require('express-socket.io-session');
var toStart = 0;
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

app.get('/victory', function(req, res){
  res.sendFile(__dirname + '/victory.html');
});

app.get('/lose', function(req, res){
  res.sendFile(__dirname + '/lose.html');
});

app.post('/game', function(req, res){
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
    if(playerField[0]!=null && playerField[1]!=null){
      io.emit('begin');
    }
  });

});

gameSocket.on('connection', function(socket){
  function checkWin(array){
    console.log('is checking');
    for(let i =0; i < 5; i++){
      for(let e = 0; e < 5; e++){
        if(array[i][e] == 1 || array[i][e] == 2 || array[i][e] == 3 ){
          return false;
        }
      }
    }
    return true;;
  }
  var playername;
  var opponentName;
  var myField;
  var playerID;
  var opponentID;
  console.log('connected on game');
  socket.on('identifyPlayer', function(name){
    playername = name;
    if(name == players[0]){
      playerID = 0;
      opponentID = 1;
      opponentName = players[1];
      socket.emit('yourTurn');
    }else{
      playerID = 1;
      opponentID = 0;
      opponentName = players[0];
    }
    socket.emit('opponentName', opponentName);
    socket.on('requestMyBattleField', function(){
      if(name == players[0]){
        myField = playerField[0];
      }else if(name == players[1]){
        myField = playerField[1];
      }
      socket.emit('userBattleField', myField);
    });
  });
  socket.on('fire', function(x, y){
    if(playerField[opponentID][x][y] != 0){
      playerField[opponentID][x][y] = -1;
      x = x +1;
      y = y+1;
      socket.emit('hit', y.toString()+x);
      socket.broadcast.emit('hitAt',y.toString()+x)
      if(checkWin(playerField[opponentID])){
        console.log('should have winnerj');
        socket.emit('win');
        socket.broadcast.emit('lose');
      }
    }else{
      x = x+1;
      y = y+1;
      socket.emit('miss', y.toString()+x);
      socket.broadcast.emit('missAt',y.toString()+x)
    }
    socket.broadcast.emit('yourTurn');
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
