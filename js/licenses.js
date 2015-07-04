$(document).ready(function() {
	$('.license').click(function(){
		$('.license-notice p').html("Loading ...");
		$.ajax({type: "GET",  url: getLicense}).
			done(function(data) {
				data = JSON.parse(data);
				$('.license-notice p').html("Your school is currently using <span>"+ data.used+" out of "+ data.total+"</span> purchased licenses.");
			});
		
	});
});