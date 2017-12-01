$(document).ready(function(){
	$('#config').hide();
	$('#submit').click(load);

	function load(e){
		$('#config').fadeIn('slow');
	}

})