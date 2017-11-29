
var orientation, x, y, points;
var length = 3;
$(document).ready(function(){
	$('#button-horz').click(placeHorizontal);
	$('#button-verts').click(placeVertical);
	$('.grid').mouseenter(display);
});

function checkPoints(points){
	x = points.slice(1,2);
	y = points.slice(0,1);
	return x,y;
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
		if(length==3){
			for(i=1;i<length+1;i++){
				console.log("ID: " + id);
				$("#" + id).prepend('<img class="ship rotate" src="public/images/three_'+ i +'.png"/>');
				y = parseInt(y) + 1;
				id = (y + x).toString();
			}
		} else {
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship rotate" src="public/images/two_'+ i +'.png"/>');
				y = parseInt(y) + 1;
				id = (y + x).toString();
			}

		}		
	}
}


function displayShipHorz(x, y, length){
	var endPointX = parseInt(x) + length -1;
	var id = (y + parseInt(x)).toString();

	if(endPointX <= 5){
		if(length==3){
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship" src="public/images/three_'+ i +'.png"/>');
				console.log("i: " + i);
				x = parseInt(x) + 1;
				id = (y + x).toString();
			}
		} else {
			for(i=1;i<length+1;i++){
				$("#" + id).prepend('<img class="ship" src="public/images/two_'+ i +'.png"/>');
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
	
	console.log(id);
	for(i=1;i<length+1;i++){
		$("#" + id).empty();
		x = parseInt(x) + 1;
		id = (y + x).toString();
		console.log("ID: " + id);
	}
}