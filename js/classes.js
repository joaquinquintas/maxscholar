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
	var getClassDetail = server + "classes-detail/"
	var getStudentFromSchool = server + "students/"
	var getStudentSearchFromSchool = server + "students/search/"
	
	
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
				$('.choose-class').find("span").html("Loading ...");
				$('.choose-class').css('display', 'block');

				
				
				$.ajax({type: "GET",  url: allClasses}).
		        fail(function(resp){
		            console.log('bad credentials.')
		        }).
		        done(function(data){
		        	$('.choose-class').find("span").html("Choose a class :");
		        	var items = [];
		        	$.each( data, function( key, val ) {
		        		items.push( "<li  >" +' <a href="#" data-clase-pk="' + val.pk + '" data-toggle="modal" data-target="#myModal">'+val.name+'</a>' + "</li>" );
		        		$( "#classes_list" ).html(items.join( "" ));
		        	  });
		        });
			});
	


	$('#myModal').on('show.bs.modal', function(e) {
		  var clase_selected = e.relatedTarget.dataset.clasePk;
		  localStorage.setItem("selected_clase", parseInt(clase_selected));
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
		var pk = localStorage.getItem("selected_clase");
		$.ajax({type: "POST",  url: checkClassPassword, data: { password: password, pk:pk } }).
        fail(function(resp){
            console.log('Bad password')
            console.log(resp.responseJSON.non_field_errors[0]);
            $( "#error_clase_password" ).html(resp.responseJSON.non_field_errors[0]);
            $( "#clase_password" ).select();
        }).
        done(function(resp){
        	$('#myModal').modal('hide');
        	$( "#error_clase_password" ).html("");
        	
        	//Use the clase response Obj
        	console.log(resp.pk);
        	$( "#clase_name" ).html(resp.name);
        	$( "#clase_teacher" ).html("Teacher Name");
        	$( "#clase_password" ).html(resp.password);
        	$( "#clase_email" ).html(resp.email);
        	var students = [];
        	count = 1;
        	$.each( resp.students, function( key, val ) {
        		students.push( "<li><span>" +count+' -</span>'+ val.first_name +' '+ val.last_name+'</li>' );
        		count = count + 1;
        		$( "#clase_student_list" ).html(students.join( "" ));
        	  });
        	$('.content .choose-class').css('display','none');
    		$('.content .allclasse-detail').css('display','block');
    		$('.content .modify ').css('display','block');
    		$('.content .delete ').css('display','block');
    		$('.content .print-button ').css('display','block');
        });
		
		
		
	
	});
	
		

	$(".modify-classes-tab-title").click(function(){
		
		$("#modify .create-class-detail").hide();
		console.log("Modify Clases");
		localStorage.setItem("user_to_add_modifiy_clase", JSON.stringify([]));
		var pk = localStorage.getItem("selected_clase");
		$.ajax({type: "GET",  url: getClassDetail+pk }).
        
        done(function(resp){
        	
        	//Use the clase response Obj
        	console.log(resp.pk);
        	$( "#class_name_modify" ).val(resp.name);
        	//$( "#class_teacher_modify" ).val(resp.teacher.first_name + " " + resp.teacher.last_name);
        	$( "#class_teacher_modify" ).val(""	);
        	$( "#class_password_modify" ).val(resp.password);
        	$( "#class_repassword_modify" ).val(resp.password);
        	$( "#class_email_modify" ).val(resp.email);
        	var students = [];
        	count = 1;
        	$.each( resp.students, function( key, val ) {
        		students.push( "<li><a  class='user-to-delete' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +" data-user-pk="+val.pk+" href='#'><span>" +count+' -</span>'+ val.first_name +' '+ val.last_name+'</a></li>' );
        		count = count + 1;
        		$( "#clase_student_list_modify" ).html(students.join( "" ));
        	  });
        	$("#modify .create-class-detail").show();
        });
		
		$.ajax({type: "GET",  url: getStudentFromSchool+pk }).
        
        done(function(resp){
        	
        	//Use the clase response Obj
        	var students = [];
        	$.each( resp, function( key, val ) {
        		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +" data-user-pk="+val.pk+" href='#'>"+ val.first_name +' '+ val.last_name+'</a></li>' );
        		$( "#student-add-class-list" ).html(students.join( "" ));
        	  });

        });
		
		
		
		
	});
	
	function IsEmail(email) {
		  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  return regex.test(email);
		};
	
	$("#search-student-modify-button").click(function(){
		$( "#student-add-class-list" ).html( "Searching ..." );
		var pk = localStorage.getItem("selected_clase");
		var student_name = $( "#search-student-modify" ).val();
		$.ajax({type: "GET",  url: getStudentSearchFromSchool+"?clase="+pk+"&username="+student_name }).
        
        done(function(resp){
        	if (resp.length > 0 ){
        		//Use the clase response Obj
            	var students = [];
            	$.each( resp, function( key, val ) {
            		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +"  data-user-pk="+val.pk+" href='#'>"+ val.first_name +' '+ val.last_name+'</a></li>' );
            		$( "#student-add-class-list" ).html(students.join( "" ));
            	  });
        	}else{
        		$( "#student-add-class-list" ).html( "No Results" );
        	}
        	

        });
	});
	
	$("#save-modified-class").click(function(e){
		e.preventDefault();
		console.log("Click Saved Clase");
		var errors = false;
		var errors_list = []
		
		var class_name = $( "#class_name_modify" ).val();
		if (class_name == ""){
			//$("#class_m_name_error").html("This field is required.")
			errors_list.push( "<li>Class Name is required</li>" );
			errors = true;
		}
		var teacher = $( "#class_teacher_modify" ).val();
		var password = $( "#class_password_modify" ).val();
		var repassword = $( "#class_repassword_modify" ).val();
		
		if(password != repassword){
			//$("#class_m_password_error").html("Password mismatch.")
			errors_list.push( "<li>Password mismatch</li>");

			errors = true;
		}
		var email = $( "#class_email_modify" ).val();
		
		if(!IsEmail(email)){
			//$("#class_m_email_error").html("Invalid Email.")
			errors_list.push( "<li>Invalid Email</li>" );
			errors = true;
		}
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$(".modal-body span").html(message);
			
		}else{
			//SaveItems
			teacher
			class_name
			password
			email
			//SaveStudents
			//Recorrer  todos los items de clase_student_list_modify y guardarlos
			var users_class = []
			$( "#clase_student_list_modify" ).children().each(function () {
				users_class.push($( this ).find("a").attr("data-user-pk"));
				
			});
			
			//Redirect close to allClases.
			var pk = localStorage.getItem("selected_clase");
			$.ajax({type: "PUT",  url: getClassDetail+pk, data: { class_name: class_name, password:password, email:email, teacher:teacher, students: users_class} }).
	        fail(function(resp){
	            console.log('Bad saving')
	            
	        }).
	        done(function(resp){
	        	console.log('Good saving')
	        	
	        });
		}
		
		$('#savedModifiedClassModal').modal('show');
		
	});
	
	
	$('#clase_student_list_modify').on('click', '.user-to-delete', function(e) {

		
		e.preventDefault();
		console.log("User to delete ");
		var user_to_delete = this.dataset.userPk;

		$( this ).parent().remove();
		var count = 1;
		var users_class = []
		$( "#clase_student_list_modify" ).children().each(function () {
			$( this ).find("span").html(count+" -");
			
			count = count +1;
		});
		
		
	});
	
	$('#student-add-class-list').on('click', '.user-to-add', function(e) {

		
		e.preventDefault();
		console.log("User to add ");
		var user_to_add = this.dataset.userPk;
		var user_fir = this.dataset.userFirstName;
		var user_to_add = this.dataset.userPk;
		$( this ).parent().hide();
		var count = 1;
		var users_class = []
		$( "#clase_student_list_modify" ).children().each(function () {
			users_class.push($( this ).find("a").attr("data-user-pk"));
			
			count = count +1;
		});
		console.log(users_class);
		console.log(user_to_add);
		if (users_class.indexOf(user_to_add) == -1){
			$( "#clase_student_list_modify" ).append( "<li><a  class='user-to-delete' data-user-last-name="+this.dataset.userLastName+" data-user-first-name="+this.dataset.userFirstName+" data-user-pk="+this.dataset.userPk+" href='#'><span>" +count+" -</span>"+ this.dataset.userFirstName +" "+ this.dataset.userLastName+"</a></li>");
			//$(this).find("span").html(count + " -");
		}
		
		//var list_add = JSON.parse(localStorage.getItem("user_to_add_modifiy_clase"));
		//console.log(list_add);
		//list_add.push(user_to_add);
		//localStorage.setItem("user_to_add_modifiy_clase", JSON.stringify(list_add));
		//console.log(user_to_add);
		
	});
});