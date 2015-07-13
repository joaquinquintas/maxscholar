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
	        	$(".welcome-notice h3").html("Welcome, "+resp.first_name +" "+ resp.last_name+".");
	        	$.ajax({type: "GET",  url: getStudentLevels}).
	        	done(function(response){
	        		
	        		$("#level-edit-user").html("");
	        		$("#level-create-user").html("");
	        		var o = new Option("Select Level" , "no");
	        		o.setAttribute("id", "no");
	        		$("#level-edit-user").append(o);
	        		var o = new Option("Select Level" , "no");
	        		o.setAttribute("id", "no");
	        		o.setAttribute("selected", "selected");
	        		$("#level-create-user").append(o);
	        		
	        		$.each(response, function (i, item) {
	        			var o = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(o).html(item.name);
	        			
	        			
	        			$("#level-edit-user").append(o);
	        			var o = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(o).html(item.name);
	        			$("#level-create-user").append(o);
	
	        		});
	        		
	        		
	        	});
    	
    	$.ajax({type: "GET",  url: getUserType}).
    	done(function(resp){
    		
    		$("#type-edit-user").html("");
    		$("#type-create-user").html("");
    		var o = new Option("Select Type" , "no");
    		o.setAttribute("id", "no");
    		$("#type-edit-user").append(o);
    		var o = new Option("Select Type" , "no");
    		o.setAttribute("id", "no");
    		o.setAttribute("selected", "selected");
    		$("#type-create-user").append(o);
    		
    		$.each(resp, function (i, item) {
    			var op = new Option(item.name , item.pk);
    			/// jquerify the DOM object 'o' so we can use the html method
    			$(op).html(item.name);

    			
    			$("#type-edit-user").append(op);
    			var op = new Option(item.name , item.pk);
    			/// jquerify the DOM object 'o' so we can use the html method
    			$(op).html(item.name);
    			$("#type-create-user").append(op);
    			
    		});

    		
    	});
	        });
	 };
	//checkCredentials("eliecer", "max123");
	//Read this data from the Login PopUp :) 
	username = localStorage.getItem("username");
	password = localStorage.getItem("password");
	first_name = localStorage.getItem("first_name");
	last_name = localStorage.getItem("last_name");
	pk = localStorage.getItem("pk");
	if(username == null || password == null || pk == null){
		$('#login-modal').modal('show');
	}else{
		$(".welcome-notice h3").html("Welcome, "+first_name +" "+ last_name+".");
		 $('.reports-tab-title').removeClass('active');
		 $('#reports').removeClass('active');
		 $('.individual-title').removeClass('active');
		 $('.content .welcome-notice ').css('opacity','1');
		 $('#class').removeClass('active');
		 $('.content ul.print-button ').css('display','none');
	}
	
	//$('#user_login_username').focus();
	$(".content #login-modal .modal-content .modal-footer .enter-pass").click(function(){

		username = $('#user_login_username').val();
		password = $('#user_login_password').val();
		function setHeader(xhr) {
	        // as per HTTP authentication spec [2], credentials must be
	        // encoded in base64. Lets use window.btoa [3]
	        xhr.setRequestHeader ("Authorization", "Basic " +
	                               btoa(username + ':' + password));
	    }
	 
	    $.ajax({type: "POST",  url: login,  beforeSend: setHeader}).
	        fail(function(resp){
	            console.log('bad credentials.')
	            $( "#error_login" ).html("Invalid username and/or password");
	        }).
	        done(function(resp){
	        	localStorage.setItem("username", username);
	        	localStorage.setItem("password", password);
	        	localStorage.setItem("first_name", resp.first_name);
	        	localStorage.setItem("last_name",  resp.last_name);
	        	localStorage.setItem("pk", resp.pk);
	        	$(".welcome-notice h3").html("Welcome, "+resp.first_name +" "+ resp.last_name+".");
	        	$('#login-modal').modal('hide');
	        	var intro = introJs();
	            intro.setOptions({
	              steps: [
	                {
	                  element: '#step1',
	                  intro: "<b>Hello "+resp.first_name +"</b><span>Welcome to MaxReports!</span><span>Click <a href = '#' >here</a> to see a video tutorial of all the features available for you.</span>"
	                 } ,
	  			   {
	                  element: '#step2',
	                  intro: "<span>Choose an icon to explore these features:</span><span><strong>Reports: </strong>check your student's data and progress.</span><span><strong>Classes: </strong>create and manage your groups or classes.</span><span><strong>Users: </strong>create and manage student accounts.</span><span><strong>Licenses: </strong>check school-wide license count. </span><span><strong>Materials: </strong>download teaching resources and materials.  </span><span><strong>Tutors: </strong>manage your tutoring sessions and progress.</span>"
	                 } ,
	  			   {
	                  element: '#step3',
	                  intro: "<span>Choose a tab to see student progress in each specific program.</span><span>Scroll down to see additional information and graphs.</span>"
	                 } ,
	  			    {
	                  element: '#step4',
	                  intro: "<span>Click this button if you want to see the student site.</span>"
	                 },
	  			    {
	                  element: '#step5',
	                  intro: "<span>Use these buttons to download or print sections</span><span>of the report or, its entirety</span>"
	                 } 
	              ]
	  			
	            });

	            intro.start();
	        	  
	        	  $('.introjs-skipbutton') .click(function() {
	        		 $('.reports-tab-title').removeClass('active');
	        		 $('#reports').removeClass('active');
	        		 $('.individual-title').removeClass('active');
	        		 $('.content .welcome-notice ').css('opacity','1');
	        		 $('#class').removeClass('active');
	        		 $('.content ul.print-button ').css('display','none');
	        		  });
	        	$.ajax({type: "GET",  url: getStudentLevels}).
	        	done(function(response){
	        		
	        		$("#level-edit-user").html("");
	        		$("#level-create-user").html("");
	        		var o = new Option("Select Level" , "no");
	        		o.setAttribute("id", "no");
	        		$("#level-edit-user").append(o);
	        		var o = new Option("Select Level" , "no");
	        		o.setAttribute("id", "no");
	        		o.setAttribute("selected", "selected");
	        		$("#level-create-user").append(o);
	        		
	        		$.each(response, function (i, item) {
	        			var o = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(o).html(item.name);
	        			
	        			
	        			$("#level-edit-user").append(o);
	        			var o = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(o).html(item.name);
	        			$("#level-create-user").append(o);
	
	        		});
	        		
	        		
	        	});
	        	
	        	$.ajax({type: "GET",  url: getUserType}).
	        	done(function(resp){
	        		
	        		$("#type-edit-user").html("");
	        		$("#type-create-user").html("");
	        		var o = new Option("Select Type" , "no");
	        		o.setAttribute("id", "no");
	        		$("#type-edit-user").append(o);
	        		var o = new Option("Select Type" , "no");
	        		o.setAttribute("id", "no");
	        		o.setAttribute("selected", "selected");
	        		$("#type-create-user").append(o);
	        		
	        		$.each(resp, function (i, item) {
	        			var op = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(op).html(item.name);

	        			
	        			$("#type-edit-user").append(op);
	        			var op = new Option(item.name , item.pk);
	        			/// jquerify the DOM object 'o' so we can use the html method
	        			$(op).html(item.name);
	        			$("#type-create-user").append(op);
	        			
	        		});

	        		
	        	});
	});
	});
	
	$("#help_icon").click(function(e){
		e.preventDefault();
		startIntro();
		
	});
	$(".logout").click(function(e){
		e.preventDefault();
		
		localStorage.setItem("username", null);
    	localStorage.setItem("password", null);
    	localStorage.setItem("pk", null);
    	$('#login-modal').modal('show');
	});
});