//all functions are in the $(document).ready(function()) to make sure that
//before performing the functions the page is fully loaded
$(document).ready(function(){
	// logical representation of the 5x5 board.
	//store the places of the initial possitions of the ships
	battlefield = new Array(5);

	for(let i = 0; i < 5; i++){
		battlefield[i] = new Array(5);
	}
	for(let i = 0; i < 5; i++){
		for(let e = 0; e < 5; e++){
			battlefield[i][e] = 0;
		}
	}
	$('#button-horz').click(placeHorizontal);
	$('#button-verts').click(placeVertical);
	$('.grid').mouseenter(display);

	var orientation, x, y, points;
	var length = 2;
	function checkPoints(points){
		x = points.slice(1,2);
		y = points.slice(0,1);
		return x,y;
	}

	function isClear(){
		if(orientation == 'horizontal'){
			if(length==3){
				for(let i = x-1;i < 3;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
					if(battlefield[i][y-1] == 1){
						return false;
					}
				}
				return true;
			}else if(length==2){
				for(let i = x-1;i < 2;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
					if(battlefield[i][y-1] == 1){
						return false;
					}
				}
				return true;
			}
		}else if (orientation == 'vertical'){
			if(length==3){
				for(let i = y-1;i < 3;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
					if(battlefield[x-1][i] == 1){
						return false;
					}
				}
			}else if(length==2){
				for(let i = y-1;i < 2;i++){//point - 1 is used because in the battlefield array we start at 0 index such us point (1,1) in the grid is represented as (0,0) on the Array
					if(battlefield[x-1][i] == 1){
						return false;
					}
				}
				return true;
			}
		}
	}
	function display(e){
		x, y = checkPoints($(this).attr('id'));

		if(orientation == 'horizontal'){
			displayShipHorz(x, y, length);
		} else if(orientation=='vertical'){
			displayShipVerts(x, y, length);
		}
	}

	function placeHorizontal(e){
		orientation = "horizontal";
		$('#button-horz').css('background', '#6EA660');
		$('#button-horz').css('color', 'white');
		$('#button-verts').css('background', 'silver');
		$('.grid').mouseleave(removeShipHorz);
	}

	function placeVertical(e){
		orientation = "vertical";
		$('.grid').mouseleave(removeShipVerts);
	}


	function displayShipVerts(){
		var endPointY = parseInt(y) + length - 1;
		var id = (y + parseInt(x)).toString();
		console.log("Endpoint: " + endPointY );

		if(endPointY <= 5){
			console.log(isClear());
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
	}


	function displayShipHorz(x, y, length){
		var endPointX = parseInt(x) + length -1;
		var id = (y + parseInt(x)).toString();
		console.log('display ships');
		console.log('endPointX:', endPointX);
		console.log(length);
		if(endPointX <= 5){
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
	}


	function removeShipVerts(e){
		x, y = checkPoints($(this).attr('id'));
		var id = (y + parseInt(x)).toString();

		console.log(id);
		for(i=1;i<length+1;i++){
			$("#" + id).empty();
			y = parseInt(y) + 1;
			id = (y + x).toString();
			console.log("ID: " + id);
		}
	}

	function removeShipHorz(e){
		x, y = checkPoints($(this).attr('id'));
		var id = (y + parseInt(x)).toString();

		for(i=1;i<length+1;i++){
			$("#" + id).empty();
			x = parseInt(x) + 1;
			id = (y + x).toString();
			console.log("ID: " + id);
		}
	}
});
