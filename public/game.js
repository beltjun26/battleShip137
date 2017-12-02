$(document).ready(function(){
  var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split('=');
  var myBattleField;
  name = ca[1];
  initSocket = io('/game');
  initSocket.emit('identifyPlayer', name);
  initSocket.on('opponentName', function(opponent){
    console.log('opponent received');
    $('#p2name').html(opponent)
  });
  initSocket.emit('requestMyBattleField');
  initSocket.on('userBattleField', function(battlefield){
    myBattleField = battlefield;
    for(let y =0; y < 5; y++){
      for(let x =0; x < 5; x++){
        if(battlefield[x][y]==3){
          if(battlefield[x+1][y]==3){
            for(let i = 0; i < 3; i++){
      				temp_y = y + 1;
              temp_x = (x + 1 + i).toString();
      				id = (temp_y + temp_x).toString();
              $("#" + id).prepend('<img class="ship rotate" src="images/three_'+ i+1 +'.png"/>');
            }
          }else if(battlefield[x][y+1]==3){
            for(let i = 1; i <= 3; i++){
              $("#" + id).prepend('<img class="ship rotate" src="images/three_'+ i+1 +'.png"/>');
              temp_y = temp_y + 1 + i;
              temp_x = (temp_x + 1).toString();
              id = (y + x).toString();
            }
          }
        }
      }
    }
  });
});
