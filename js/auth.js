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
	checkCredentials("eliecer", "max123");
	
});