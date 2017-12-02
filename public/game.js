$(document).ready(function(){
  var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split('=');
  var myBattleField;
  name = ca[1];
  console.log('asdfs');
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
});
