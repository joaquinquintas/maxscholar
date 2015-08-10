$(document).ready(function() {
	

		  $("#maxhelp_list a").click(function() {
		    var theModal = $(this).data( "target" ),
		    videoSRC = $(this).attr( "data-theVideo" ), 
		    videoSRCauto = "https://www.youtube.com/embed/"+videoSRC+"?rel=0&VQ=HD720&autoplay=1" ;
		    $(theModal+' iframe').attr('src', videoSRCauto);
		    $(theModal+' button.close').click(function () {
		        $(theModal+' iframe').attr('src', videoSRC);
		    });   
		  });

	
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
                       '</tr>';
				$('#maxreading_list').append(tr);
				//doc = '<iframe  type="application/pdf" style="display:none;position:relative;height:4em;overflow:scroll;" id="doc_'+ val.pk+'" src="http://maxscholar.com/media/materials/maxwords-materials/MaxScholar Clover wordtables.pdf"></iframe>'
				
				//$("#doc_container").append(doc);
				count = count + 1;
				});
				
				
				/***
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="75%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="25%"><iframe id="doc_'+ val.pk+'" frameBorder="0" height="340px" src="http://maxscholar.com/media/materials/maxwords-materials/MaxScholar Clover wordtables.pdf" style="display:block;"></iframe></td>'+
                       '</tr>';
				$('#maxreading_list').append(tr);
				//doc = ''
				
				//$("#doc_container").append(doc);
				count = count + 1;
				});
				
				**/
				
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
		doc = $(this).attr( "id" );
		id_doc = "doc_" + doc;
		$iframe = $('iframe#'+id_doc);
		$iframe.load(function() {
			console.log("print IFRAME");
			var PDF = document.getElementById(iframeId);
		      PDF.focus();
		      PDF.contentWindow.print();
	      });
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
		$('.all-user-outer-other h2').html("Loading ...");
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
					$('.all-user-outer-other h2').html("No Materials");
				}else{
					$('.all-user-outer-other h2').html("OTHERS :");
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