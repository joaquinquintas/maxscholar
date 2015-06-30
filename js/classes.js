$(document).ready(function() {
	
	// using jQuery
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	
	function setHeader(xhr) {
        // as per HTTP authentication spec [2], credentials must be
        // encoded in base64. Lets use window.btoa [3]
        xhr.setRequestHeader ("Authorization", "Basic " +
                               btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")));
    }
	
	$.ajaxSetup({
	    beforeSend: setHeader,
	});
	
	var server = "http://localhost:8080/dashboard/v1/"
	var allClasses = server + "classes/"
	var login = server + "login/"
	var checkClassPassword =  server + "classes-password-validator/"
	
	
	function checkCredentials(username, password){
	    function setHeader(xhr) {
	        // as per HTTP authentication spec [2], credentials must be
	        // encoded in base64. Lets use window.btoa [3]
	        xhr.setRequestHeader ("Authorization", "Basic " +
	                               btoa(username + ':' + password));
	    }
	 
	    $.ajax({type: "POST",  url: login,  beforeSend: setHeader}).
	        fail(function(resp){
	            console.log('bad credentials.')
	        }).
	        done(function(resp){
	        	localStorage.setItem("username", username);
	        	localStorage.setItem("password", password);
	        });
	 };
	
	//Read this data from the Login PopUp :) 
	checkCredentials("eliecer", "max123")

	
	$(".all-classes-tab-title").click(
			function() {
				$('.allclasse-detail').css('display', 'none');
				$('.choose-class').css('display', 'block');

				
				
				$.ajax({type: "GET",  url: allClasses}).
		        fail(function(resp){
		            console.log('bad credentials.')
		        }).
		        done(function(data){
		        	var items = [];
		        	$.each( data, function( key, val ) {
		        		items.push( "<li id='" + val.pk + "'>" +' <a href="#"data-toggle="modal" data-target="#myModal">'+val.name+'</a>' + "</li>" );
		        		$( "#classes_list" ).html(items.join( "" ));
		        	  });
		        });
			});
	
	$(".content .modal-content .modal-footer .close-btn").click(function(){
		
		$( "#error_clase_password" ).html("");
		 $('#clase_password').val("");
	});
	
	$(".content .modal-content .modal-footer .enter-pass").click(function(){

//		$('#myModal').modal('hide');
//		$('#myModal4').modal('hide');
//		$('#myModal5').modal('hide');
		var password = $('#clase_password').val();
		$( "#error_clase_password" ).html("");
		$.ajax({type: "POST",  url: checkClassPassword, data: { password: password, pk:446 } }).
        fail(function(resp){
            console.log('Bad password')
            console.log(resp.responseJSON.non_field_errors[0]);
            $( "#error_clase_password" ).html(resp.responseJSON.non_field_errors[0]);
            $( "#clase_password" ).select();
        }).
        done(function(resp){
        	$('#myModal').modal('hide');
        	$( "#error_clase_password" ).html("");
        	$('.content .choose-class').css('display','none');
    		$('.content .allclasse-detail').css('display','block');
    		$('.content .modify ').css('display','block');
    		$('.content .delete ').css('display','block');
    		$('.content .print-button ').css('display','block');
        });
		
		
		
	
	});
	
});