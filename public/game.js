$(document).ready(function(){
  var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split('=');
  var myBattleField;
  name = ca[1];
  console.log('asdfs');

  function checkPoints(points){
		x = points.slice(1,2);
		y = points.slice(1,2);
    console.log(x, y);
		return y,x;
	}

  function isClear(box){
    console.log(box.html());
    if(box.html() == ''){
      return true;
    }else{
      return false;
    }
  }

  function hit(id){
		var hitImg = '<img class="hit" src="images/hit1.png" />';
		$('#'+id).append(hitImg).fadeIn(999);
	}

	function ownhit(id){
		console.log("hit");
		var hit = '<img class="hit ownhit" src="images/hit1.png" />';
		$('#'+id).append(hit).fadeIn(999);
	}
	function miss(id){
    console.log('triggered miss');
		var content = '<h4 class="miss">MISS</h4>';
		$('#'+id).append(content).fadeIn(999);
	}

  initSocket = io('/game');
  initSocket.emit('identifyPlayer', name);
  initSocket.on('opponentName', function(opponent){
    console.log('opponent received');
    $('#p2name').html(opponent)
  });
  initSocket.emit('requestMyBattleField');
  initSocket.on('userBattleField', function(battlefield){
    myBattleField = battlefield;
    console.log(myBattleField);
    for(let y =0; y < 5; y++){
      for(let x =0; x < 5; x++){

        if(battlefield[x][y]==3){
          if(x < 4 && battlefield[x+1][y]==3){
            for(let i = 0; i < 3; i++){
      				var temp_y = y + 1;
              var temp_x = (x + 1 + i).toString();
      				var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship" src="images/three_'+ imageID +'.png"/>');
              battlefield[x+i][y] = 0;
            }
          }else if(battlefield[x][y+1]==3){
            for(let i = 0; i < 3; i++){
              var temp_y = y + 1 + i;
              var temp_x = (x + 1).toString();
              var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship rotate" src="images/three_'+ imageID +'.png"/>');
              battlefield[x][y+i] = 0;
            }
          }
        }

        if(battlefield[x][y]==1){
          if(x < 4 && battlefield[x+1][y]==1){
            for(let i = 0; i < 2; i++){
      				var temp_y = y + 1;
              var temp_x = (x + 1 + i).toString();
      				var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship" src="images/two_'+ imageID +'.png"/>');
              battlefield[x+i][y] = 0;
            }
          }else if(battlefield[x][y+1]==1){
            for(let i = 0; i < 2; i++){
              var temp_y = y + 1 + i;
              var temp_x = (x + 1).toString();
              var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship rotate" src="images/two_'+ imageID +'.png"/>');
              battlefield[x][y+i] = 0;
            }
          }
        }

        if(battlefield[x][y]==2){
          if(x < 4 && battlefield[x+1][y]==2){
            for(let i = 0; i < 2; i++){
      				var temp_y = y + 1;
              var temp_x = (x + 1 + i).toString();
      				var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship" src="images/two_'+ imageID +'.png"/>');
              battlefield[x+i][y] = 0;
            }
          }else if(battlefield[x][y+1]==2){
            for(let i = 0; i < 2; i++){
              var temp_y = y + 1 + i;
              var temp_x = (x + 1).toString();
              var id = (temp_y + temp_x).toString();
              var imageID = i+1;
              $("#l" + id).prepend('<img class="ship rotate" src="images/two_'+ imageID +'.png"/>');
              battlefield[x][y+i] = 0;
            }
          }
        }

      }
    }
  });

  initSocket.on('yourTurn', function(){
    console.log('yourTurn');
    $('#player_turn').html('Your Turn');
    $('.gameBoard').click(clickGrid);
  });

  initSocket.on('hit', function(id){
    console.log(id);
    hit('r'+id);
  });
  initSocket.on('miss', function(id){
    miss('r'+id);
  });
  initSocket.on('hitAt', function(id){
    ownhit('l'+id);
  });
  initSocket.on('missAt', function(id){
    miss('l'+id);
  });

  function clickGrid(){
    if(isClear($(this))){
      var box = $(this).attr('id')
      var x = parseInt(box.slice(2,3))-1;
      var y = parseInt(box.slice(1,2))-1;
      initSocket.emit('fire', x, y);
      $('.gameBoard').off('click');
      $('#player_turn').html('Opponent Turn');
    }
  }

  initSocket.on('win', function(){
    $(location).attr('href', '/victory');
  });

  initSocket.on('lose', function(){
    $(location).attr('href', '/lose');
  });
});
