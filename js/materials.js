$(document).ready(function() {
	$('#material_maxreading').click(function(){
		$('#maxreading_list').html("");
		$('#materailmaxread h2').html("Loading ...");
		$.ajax({type: "GET",  url: getMaterials+"maxreading"}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="11%"><a href="http://maxscholar.com'+val.file+'">'+
                     '<img src="images/download-arrow.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a class="printMaxreading" href="http://maxscholar.com'+val.file+'"><img src="images/material-print-icon.png" alt="" title=""></a></td>'+
                       '</tr>';
				$('#maxreading_list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailmaxread h2').html("No Materials");
				}else{
					$('#materailmaxread h2').html("MAXREADING :");
				}
				
			});
		
	});
	
	$('#maxreading_list').on('click', '.printMaxreading', function(e){
		console.log("Printing...");
		e.preventDefault();
		doc = $(this).attr( "href" );
		console.log(doc);
		var w = window.open(doc);
	    w.print();
	});
	
	
	$('#material_maxword').click(function(){
		$('#maxword_list').html("");
		
		$('#materailmaxword h2').html("Loading ...");
		$.ajax({type: "GET",  url: getMaterials+"maxwords"}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="11%"><a href="http://maxscholar.com'+val.file+'">'+
                     '<img src="images/download-arrow.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a class="printMaxwords" href="http://maxscholar.com'+val.file+'"><img src="images/material-print-icon.png" alt="" title=""></a></td>'+
                       '</tr>';
				$('#maxword_list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailmaxword h2').html("No Materials");
				}else{
					$('#materailmaxword h2').html("MAXWORDS :");
				}
				
			});
		
	});
	
	$('#maxword_list').on('click', '.printMaxwords', function(e){
		console.log("Printing...");
		e.preventDefault();
		doc = $(this).attr( "href" );
		console.log(doc);
		var w = window.open(doc);
	    w.print();
	});
	
	$('#material_phonics').click(function(){
		$('#maxphonics_list').html("");
		$('#materailmaxphonics h2').html("Loading ...");
		$.ajax({type: "GET",  url: getMaterials+"maxphonics"}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="11%"><a href="http://maxscholar.com'+val.file+'">'+
                     '<img src="images/download-arrow.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a class="printMaxphonics" href="http://maxscholar.com'+val.file+'"><img src="images/material-print-icon.png" alt="" title=""></a></td>'+
                       '</tr>';
				$('#maxphonics_list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailmaxphonics h2').html("No Materials");
				}else{
					$('#materailmaxphonics h2').html("MAXPHONICS :");
				}
				
			});
		
	});
	
	$('#maxphonics_list').on('click', '.printMaxphonics', function(e){
		console.log("Printing...");
		e.preventDefault();
		doc = $(this).attr( "href" );
		console.log(doc);
		var w = window.open(doc);
	    w.print();
	});
	
	$('#material_other').click(function(){
		$('#maxother_list').html("");
		$('#materailother h2').html("Loading ...");
		$.ajax({type: "GET",  url: getMaterials+"others"}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="11%"><a href="http://maxscholar.com'+val.file+'">'+
                     '<img src="images/download-arrow.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a class="printMaxphonics" href="http://maxscholar.com'+val.file+'"><img src="images/material-print-icon.png" alt="" title=""></a></td>'+
                       '</tr>';
				$('#maxother_list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailother h2').html("No Materials");
				}else{
					$('#materailother h2').html("OTHERS :");
				}
				
			});
		
	});
	
	$('#maxphonics_list').on('click', '.printMaxphonics', function(e){
		console.log("Printing...");
		e.preventDefault();
		doc = $(this).attr( "href" );
		console.log(doc);
		var w = window.open(doc);
	    w.print();
	});
	
});