$(document).ready(function() {
	
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
	

	csrftoken = Cookies.get('csrftoken');
	sessionId = Cookies.get('maxscholarSessionId');

	
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	
	function setHeader(xhr) {
        // as per HTTP authentication spec [2], credentials must be
        // encoded in base64. Lets use window.btoa [3]
        xhr.setRequestHeader ("Authorization", "Basic " +
                               btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")));
    }
	

		
	$.ajaxSetup({
		  xhrFields: {
		    withCredentials: true
		  }
		});
	
	$.ajax({type: "POST", url: checkloginStatus,  xhrFields: {
	    withCredentials: true
	  }}).
    fail(function(resp){
        console.log('Not loggued.')
        //$('#login-modal').modal('show');
        
        $('.reports-tab-title').removeClass('active');
		 $('#reports').removeClass('active');
		 $('.individual-title').removeClass('active');
		 $('.content .welcome-notice ').css('opacity','0');
		 $('#class').removeClass('active');
		 $('.content ul.print-button ').css('display','none');
		 $('#submenu').css('display','none');
		 $('#login_page').css('display','block');
		 $(".logo").html("<a href='http://maxscholar.com'>MAXSCHOLAR</a>");
		 $('#selected_dashboard_school').css('display','none');
		 $('#menu_items').css('display','none');
		 $(".welcome-notice-outer").hide();
		         
        
    }).
    done(function(resp){
    	resp = JSON.parse(resp);
    	school_changed = localStorage.getItem("school_changed");
    	console.log(school_changed);
    	
    	var show_report = getUrlParameter("show_report");
    	console.log(show_report);
    	console.log(resp.user.saw_dashboard_tutorial);
    	if (show_report == "true" || show_report == true){
    		//Show 
    		after_login(resp, false)
    		$(".reports").trigger( "click" );
    		$("#class_report").trigger( "click" );
    	}else{
    		if((school_changed == false || school_changed == 'false' || school_changed== undefined) && ( resp.user.saw_dashboard_tutorial != true && resp.user.saw_dashboard_tutorial != "true")){
        		console.log((school_changed == false || school_changed == 'false' || school_changed== undefined));
        		console.log(( resp.user.saw_dashboard_tutorial != true|| resp.user.saw_dashboard_tutorial != "true"));
    			console.log("show tuto");
    			after_login(resp, true)
        	}else{
        		console.log("NO show tuto");
        		after_login(resp, false)
        	}
    	}
    	
    	
    	
    		
    		
    	localStorage.setItem("school_changed", false);
    		
    		
    		

    });

	 
 	$.ajax({type: "GET",  url: getStudentLevels}).
	done(function(response){
		
		$("#level-edit-user").html("");
		$("#level-create-user").html("");
		
		var o = new Option("High Level" , "no");
		o.setAttribute("id", "no");
		$("#level-edit-user").append(o);
		
		var o = new Option("High Level" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#level-create-user").append(o);
		
		
		$("#low-level-edit-user").html("");
		$("#low-level-create-user").html("");
		
		
		
		/*var o = new Option("Low Level" , "no");
		o.setAttribute("id", "no");
		$("#low-level-edit-user").append(o);
		
		var o = new Option("Low Level" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#low-level-create-user").append(o);
		*/
		
		$.each(response, function (i, item) {
			var o = new Option(item.name , item.pk);
			$(o).html(item.name);
			$("#level-edit-user").append(o);
			
			var o = new Option(item.name , item.pk);
			$(o).html(item.name);
			
			$("#level-create-user").append(o);
			
			var o = new Option(item.name , item.pk);
			$(o).html(item.name);
			if(i==0){
				o.setAttribute("selected", "selected");
			}
			$("#low-level-create-user").append(o);
			
			var o = new Option(item.name , item.pk);
			$(o).html(item.name);
			$("#low-level-edit-user").append(o);

		});
		
		
	});

 	$.ajax({type: "GET",  url: getStudentLevelsPhonics}).
	done(function(response){
		
		$("#level-phonics-edit-user").html("");
		$("#level-phonics-create-user").html("");
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		$("#level-phonics-edit-user").append(o);
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#level-phonics-create-user").append(o);
		
		$.each(response, function (i, item) {
			var o = new Option(item.title , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.title);
			
			
			$("#level-phonics-edit-user").append(o);
			var o = new Option(item.title , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.title);
			$("#level-phonics-create-user").append(o);

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

	
	
	
	$('#user_login_password_page').keypress(function (e) {
		 var key = e.which;
		 
		 if(key == 13)  // the enter key code
		  {
			 $('.enter-pass-login').trigger( "click" );
		    return false;  
		  }
		});
	
	$('#user_login_username_page').focus();
	$(".enter-pass-login").click(function(){

		username = $('#user_login_username_page').val();
		password = $('#user_login_password_page').val();
		function setHeader(xhr) {
	        // as per HTTP authentication spec [2], credentials must be
	        // encoded in base64. Lets use window.btoa [3]
	        xhr.setRequestHeader ("Authorization", "Basic " +
	                               btoa(username + ':' + password));
	    }
	 
	    $.ajax({type: "POST",  url: login,  beforeSend: setHeader}).
	        fail(function(resp){
	        	console.log(resp);
	            console.log('bad credentials.')
	            $( "#error_login_page" ).html("Invalid username and/or password");
	        }).
	        done(function(resp){
	        	resp = JSON.parse(resp);
	        	
	        	if(resp.user.saw_dashboard_tutorial != true && resp.user.saw_dashboard_tutorial != "true"){
	    			console.log("show tuto");
	    			after_login(resp, true)
	        	}else{
	        		console.log("NO show tuto");
	        		after_login(resp, false)
	        	}
	        	
	        	});
	});
	
	function after_login(resp, show_intro){


    	
    	 localStorage.setItem("schools",JSON.stringify(resp.schools) );
    	if (resp.schools.length == 0){
    		console.log("Redirect!");
    		window.location.replace("http://maxscholar.com/mymax")
    	}else{
    		if (resp.schools.length == 1){
    			selected_school = resp.schools[0];
	        	  	localStorage.setItem("school_pk", selected_school.pk);
	        	  $("#selected_dashboard_school").css('display','none');
    		}else{
    			$("#selected_dashboard_school").html("");
    			school_pk = localStorage.getItem("school_pk");
    			if (school_pk == undefined || school_pk == 'null'  || school_pk == null   ){
    				selected_school = resp.schools[0];
	  	        	  localStorage.setItem("school_pk", selected_school.pk);
	  	        	  var o = new Option(selected_school.name , selected_school.pk);
	  	      			/// jquerify the DOM object 'o' so we can use the html method
	  	      			$(o).html(selected_school.name);
	  	      			o.setAttribute("selected", "selected");
	    			
	  	      			$("#selected_dashboard_school").append(o);
	  	      		 $.each(resp.schools.slice(1), function (i, item) {
	          			var o = new Option(item.name , item.pk);
	          			/// jquerify the DOM object 'o' so we can use the html method
	          			$(o).html(item.name);
	          			
	          			
	          			$("#selected_dashboard_school").append(o);
	          			
	          	  });
    				
    				
    			}else{
    				
    				$.each(resp.schools, function (i, item) {
						var o = new Option(item.name , item.pk);
						$(o).html(item.name);

						if (school_pk == item.pk){
							o.setAttribute("selected", "selected");
						}
						
						$("#selected_dashboard_school").append(o);
						
				  });
    			}
    			
    			
	      		$("#selected_dashboard_school").css('display','block');
    		}
    	}
    	
    	localStorage.setItem("username", resp.user.username);
    	localStorage.setItem("first_name", resp.user.first_name);
    	localStorage.setItem("last_name",  resp.user.last_name);
    	localStorage.setItem("pk", resp.user.pk);
    	localStorage.setItem("category", resp.user.category);
    	
    	if (resp.user.category == "teacher"){
    			$(".license-tab-title").css('display','none');
    	}else{
    		$(".license-tab-title").css('display','block');
    	}
    	
    	
    	
    	$(".welcome-notice h3").html("Welcome, "+resp.user.first_name +" "+ resp.user.last_name+".");
    	$('#login-modal').modal('hide');
    	var intro = introJs();
        intro.setOptions({
        	exitOnOverlayClick: false,
          steps: [
            {
              element: '#step1',
              intro: "<b>Hello "+resp.user.first_name +"</b><span>Welcome to MaxReports!</span><span>Click <a href = '#' >here</a> to see a video tutorial of all the features available for you.</span>"
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
        
        console.log(show_intro);
        if(show_intro==true){
        	intro.start();
        }else{
        	
    		    		
    		 $('.reports-tab-title').removeClass('active');
    		 $('#reports').removeClass('active');
    		 $('.individual-title').removeClass('active');
    		 $('.content .welcome-notice ').css('opacity','1');
    		 $('#class').removeClass('active');
    		 $('.content ul.print-button ').css('display','none');
    		 
    		 
    		 
    		 
        }
        
        $('#submenu').css('display','block');
		 $('#login_page').css('display','none');
		 $(".logo").html("<a href='index.html'>DASHBOARD</a>");
		 $('#menu_items').css('display','block');
		 $(".welcome-notice-outer").show();
		 $(".login_page").hide();  
        
    	  $('.introjs-skipbutton') .click(function() {
    		  //value = $(this).html();
    		  //if(value == "Done"){
    			  //POST not show help again
    			  console.log("done!");
    			  to_send = JSON.stringify({"saw_dashboard_tutorial": true});
    			  $.ajax({type: "POST", url: settings, data:to_send})
    		  //}
    		 $('.reports-tab-title').removeClass('active');
    		 $('#reports').removeClass('active');
    		 $('.individual-title').removeClass('active');
    		 $('.content .welcome-notice ').css('opacity','1');
    		 $('#class').removeClass('active');
    		 $('.content ul.print-button ').css('display','none');
    		  });
    	  
    	  
    	  
    	  

		
	}
	
	$("#help_icon").click(function(e){
		e.preventDefault();
		startIntro();
		
	});
	
	$( "#selected_dashboard_school" ).change(function() {
		  localStorage.setItem("school_pk", $(this).val());
		  localStorage.setItem("school_changed", true);
		  location.reload();
		});
	
	$(".logout").click(function(e){
		e.preventDefault();
		//call log out function server
		
		$.ajax({type: "POST", url: logout}).
	    fail(function(resp){
	        console.log('Not loggued.')
	        $('#login-modal').modal('show');
	    }).
	    done(function(resp){
	    	localStorage.setItem("username", null);
	    	localStorage.setItem("password", null);
	    	localStorage.setItem("pk", null);
	    	localStorage.setItem("schools", null);
	    	localStorage.setItem("school_pk", null);
	    	localStorage.setItem("category", null);
	    	
	    	$('.reports-tab-title').removeClass('active');
			 $('#reports').removeClass('active');
			 $('.individual-title').removeClass('active');
			 $('.content .welcome-notice ').css('opacity','0');
			 $('#class').removeClass('active');
			 $('.content ul.print-button ').css('display','none');
			 $('#submenu').css('display','none');
			 $('#login_page').css('display','block');
			 $(".logo").html("<a href='http://maxscholar.com'>MAXSCHOLAR</a>");
			 $('#selected_dashboard_school').css('display','none');
			 $('#menu_items').css('display','none');
			 $(".welcome-notice-outer").hide();
			 $(".login_page").show();  

	    });
		
	});
	
	
	function IsEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (regex.test(email) == false){
			return false
		};
	
		return true
		  
		};
	
	$('#error_forgot').html("");
	$('#forgot_email').val("");
	
	$("#adminModal .close-btn").click(function(e){
		e.preventDefault();
		
		username = $('#forgot_username').val();
		email = $('#forgot_email').val();
		
		if(!IsEmail(email)){
			$('#error_forgot').html("Email invalid")
			return false
		}
		$.ajax({type: "POST", url: forgotPassword, data: JSON.stringify({ username: username, email:email}) }).
	    fail(function(resp){
	        console.log('invalid username')
	        $('#error_forgot').html("Username doesn't exist")
	    }).
	    done(function(resp){
	    	$('#forgot_email').val("");
	    	$('#error_forgot').html("");
	    	$("#adminModal").modal("hide");
	    	$("#ThanksadminModal").modal("show");

	    });
		
	});
	
});