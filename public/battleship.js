 //all functions are in the $(document).ready(function()) to make sure that
//before performing the functions the page is fully loaded
$(document).ready(function(){
	// logical representation of the 5x5 board.
	//store the places of the initial possitions of the ships
	battlefield = new Array(5);
	battleship = 3;

	for(let i = 0; i < 5; i++){
		battlefield[i] = new Array(5);
	}
	for(let i = 0; i < 5; i++){
		for(let e = 0; e < 5; e++){
			battlefield[i][e] = 0;
		}
	}

	$('#config').hide();
	$('.config-warning').hide();

	$('#button-horz').click(placeHorizontal);
	$('#button-verts').click(placeVertical);
	$('#two').click(twoShip);
	$('#three').click(threeShip);
	$('.grid').mouseenter(display);
	$('#submit').click(submitField);
	$('#submit').click(load);

	function load(e){
		$('#config').fadeIn('slow');
		$('.config-warning').fadeIn('slow');
	}
	// $('.gird').click(clickBox);
	var socket = io();
	var orientation, x, y, points;
	var length = 2;
	function checkPoints(points){
		x = points.slice(1,2);
		y = points.slice(0,1);
		return x,y;
	}


	function isClear(box){
		x, y = checkPoints(box.attr('id'));
		x = parseInt(x)-1;
		y = parseInt(y)-1;
		if(battleship == 3){
			length =3;
		}else{
			length = 2;
		}
		if(orientation == 'horizontal'){
			if(length==3){
				if(x>2){
					return false;
				}
			}
			if(length==2){
				if(x>3){
					return false;
				}
			}
			for(let i = 0;i < length;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
				if(battlefield[i+x][y] != 0){
					return false;
				}
			}
			return true;
		}else if (orientation == 'vertical'){
			if(length==3){
				if(y>2){
					return false;
				}
			}else if(length==2){
				if(y>3){
					return false;
				}
			}
			for(let i = 0;i < length;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
				if(battlefield[x][i+y] != 0){
					return false;
				}
			}
			return true;
		}
	}


	function display(e){
		console.log(battlefield);
		if(battleship == 3){
			length =3;
		}else{
			length = 2;
		}
		if(isClear($(this))){
			x, y = checkPoints($(this).attr('id'));
			$(this).click(clickBox);
			if(orientation == 'horizontal'){
				$(this).mouseleave(removeShipHorz);
				displayShipHorz(x, y, length, $(this));
			} else if(orientation=='vertical'){
				$(this).mouseleave(removeShipVerts);
				displayShipVerts(x, y, length, $(this));
			}
		}
	}

	function placeHorizontal(e){
		orientation = "horizontal";
		$('#button-horz').css('background', '#6EA660');
		$('#button-horz').css('color', 'white');
		$('#button-verts').css('background', 'silver');
		// $('.grid').mouseleave(removeShipHorz);
	}

	function placeVertical(e){
		orientation = "vertical";
		$('#button-verts').css('background', '#6EA660');
		$('#button-verts').css('color', 'white');
		$('#button-horz').css('background', 'silver');
		// $('.grid').mouseleave(removeShipVerts);
	}

	function twoShip(e){
		length = 2;
		$('#two').css('background', '#6d8556');
		$('#three').css('background', '#333333');
	}

	function threeShip(e){
		length = 3;
		$('#three').css('background', '#6d8556');
		$('#two').css('background', '#333333');
	}


	function displayShipVerts(x,y,length){
		var endPointY = parseInt(y) + length - 1;
		var id = (y + parseInt(x)).toString();

		if(length==3){
			for(i=1;i<length+1;i++){
				console.log("ID: " + id);
				$("#" + id).prepend('<img class="ship rotate" src="images/three_'+ i +'.png"/>');
				y = parseInt(y) + 1;
				id = (y + x).toString();
			}
		} else {
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship rotate" src="images/two_'+ i +'.png"/>');
				y = parseInt(y) + 1;
				id = (y + x).toString();
			}
		}

	}


	function displayShipHorz(x, y, length){

		var endPointX = parseInt(x) + length -1;
		var id = (y + parseInt(x)).toString();
		if(length==3){
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship" src="images/three_'+ i +'.png"/>');
				console.log("i: " + i);
				x = parseInt(x) + 1;
				id = (y + x).toString();
			}
		} else {
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship" src="images/two_'+ i +'.png"/>');
				x = parseInt(x) + 1;
				id = (y + x).toString();
			}
		}
	}


	function removeShipVerts(e){
		if(battleship == 3){
			length =3;
		}else{
			length = 2;
		}
		x, y = checkPoints($(this).attr('id'));
		var id = (y + parseInt(x)).toString();
		for(i=1;i<length+1;i++){
			$("#" + id).empty();
			y = parseInt(y) + 1;
			id = (y + x).toString();
			console.log("ID: " + id);
		}
		$(this).off('mouseleave');
	}

	function removeShipHorz(e){
		if(battleship == 3){
			length =3;
		}else{
			length = 2;
		}
		x, y = checkPoints($(this).attr('id'));
		var id = (y + parseInt(x)).toString();

		for(i=1;i<length+1;i++){
			$("#" + id).empty();
			x = parseInt(x) + 1;
			id = (y + x).toString();
			console.log("ID: " + id);
		}
		$(this).off('mouseleave');
	}

	function clickBox(){
		if(isClear($(this))){ //FOR SERCURITY PURPOSES
			$(this).off('mouseleave');
			x, y = checkPoints($(this).attr('id'));
			x = parseInt(x) - 1;
			y = parseInt(y) - 1;
			if(battleship == 3){
				length =3;
			}else{
				length = 2;
			}
			if(orientation == 'horizontal'){
				for(let i = 0; i < length; i++){
					battlefield[i+x][y] = battleship;
				}
			}else if(orientation == 'vertical'){
				for(let i = 0; i < length; i++){
					battlefield[x][i+y] = battleship;
				}
			}
		}
		$(this).off('click');
	}

	function submitField(){
		console.log("function called");
		socket.emit('battlefield layout', battlefield);
	}

});
