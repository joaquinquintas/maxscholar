$(document).ready(function() {
	$('#material_maxreading').click(function(){
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
				
				if(data.lenght == 0){
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
	
});