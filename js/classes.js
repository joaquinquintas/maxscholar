$(document).ready(function() {
	

	
	$('.classes-tab-title').click(function(){
		$('.content .delete ').css('display','block');
	});
	
	// DELETE CLASE ----------
	
	$(".delete-classes-tab-title").click(
			function() {
				$('#createclass').css('display', 'none');
				$('.delete-class').find("span").html("Loading ...");
				$('.delete-class').css('display', 'block');
				$( "#clases-to-delete" ).hide();
			
				
				
				$.ajax({type: "GET",  url: allClasses}).
		        fail(function(resp){
		            console.log('bad credentials.')
		        }).
		        done(function(data){
		        	
		        	var items = [];
		        	$.each( data, function( key, val ) {
		        		items.push( "<li id="+val.pk +" >" +' <a href="#" data-clase-pk="' + val.pk + '" data-toggle="modal" data-target="#deleteModal">'+val.name+'</a>' + "</li>" );
		        		$( "#clases-to-delete" ).html(items.join( "" ));
		        	  });
		        	if(items.length == 0){
		        		$('.delete-class').find("span").html("No Classes");
		        	}else{
		        		$('.delete-class').find("span").html("Delete a class :");
		        		$( "#clases-to-delete" ).show();
		        	}
		        	
		        });
			});
	


	$('#deleteModal').on('show.bs.modal', function(e) {
		  var clase_selected = e.relatedTarget.dataset.clasePk;
		  localStorage.setItem("selected_clase_to_delete", parseInt(clase_selected));
		});
	
	$(".content #deleteModal .modal-content .modal-footer .enter-pass").click(function(){
		
		console.log("Delete!");
		to_delete_class_pk = localStorage.getItem("selected_clase_to_delete");
		console.log(to_delete_class_pk);
		
		$.ajax({type: "DELETE",  url: getClassDetail+to_delete_class_pk}).
			fail(function(resp){
	            console.log('Error in Delete')
	        }).
	        done(function(data){
	        	id= ".delete-class #"+to_delete_class_pk
	        	$(id).remove();
	        	$('#deleteModal').modal('hide');
	        	count = 0;
	        	$( "#clases-to-delete" ).children().each(function () {
	        		count = count + 1;
	        	});
	        	if (count==0){
	        		$('.delete-class').find("span").html("No Classes");
	        	}
	        });
	});
	
	// END DELETE CLASE ------
	
	// CREATE CLASE ----------
	
	$(".createclass-tab-title").click(function(){
		$('.create-class-detail').css('display', 'none');
		$('#createclass').css('display', 'block');
		$('#createclass .message').css('display', 'block');
		$('.modify-classes-tab-title').css('display', 'none');
		$('.content .create-class-detail .all-member-detail .choose-member').css('display', 'block');
		
		
		$.ajax({type: "GET",  url: getAdminsFromSchool} ).done(function(response){
    		
    		teacher_selection_modify = $('#magicsuggest_create').magicSuggest({
        		allowFreeEntries:false,
        		data: JSON.parse(response),
        		valueField: 'pk',
                displayField: 'name',
                placeholder: 'Type Here',
            });
    		
    	});
		
		$.ajax({type: "GET",  url: getStudentList }).
        
        done(function(resp){
        	
        	$('#createclass .message').css('display', 'none');
        	$('.create-class-detail').css('display', 'block');
        	//Use the clase response Obj
        	var students = [];
        	$.each( resp, function( key, val ) {
        		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +" data-user-pk="+val.pk+" href='#'>"+ val.first_name +' '+ val.last_name+'</a></li>' );
        		$( "#student-add-class-list-created" ).html(students.join( "" ));
        	  });
        	
        	
        	
        });
		
		
	});
	
	$("#search-student-create-button").click(function(){
		$( "#student-add-class-list-created" ).html( "Searching ..." );
		var pk = localStorage.getItem("selected_clase");
		var student_name = $( "#search-student-create" ).val();
		$.ajax({type: "GET",  url: getStudentSearch+"?username="+student_name }).
        
        done(function(resp){
        	if (resp.length > 0 ){
        		//Use the clase response Obj
            	var students = [];
            	$.each( resp, function( key, val ) {
            		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +"  data-user-pk="+val.pk+" href='#'>"+ val.first_name +' '+ val.last_name+'</a></li>' );
            		$( "#student-add-class-list-created" ).html(students.join( "" ));
            	  });
        	}else{
        		$( "#student-add-class-list-created" ).html( "No Results" );
        	}
        	

        });
	});
	
	$("#save-created-class").click(function(e){
		e.preventDefault();
		console.log("Click Saved Clase");
		var errors = false;
		var errors_list = []
		
		var class_name = $( "#class_name_create" ).val();
		if (class_name == ""){
			errors_list.push( "<li>Class Name is required</li>" );
			errors = true;
		}
		var teacher = teacher_selection_modify.getValue();
		console.log(teacher_selection_modify.getValue());
		var password = $( "#class_password_create" ).val();
		var repassword = $( "#class_repassword_create" ).val();
		
		if(password != repassword){
			//$("#class_m_password_error").html("Password mismatch.")
			errors_list.push( "<li>Password mismatch</li>");

			errors = true;
		}
		var email = $( "#class_email_create" ).val();
		
		if(!IsEmail(email)){
			//$("#class_m_email_error").html("Invalid Email.")
			errors_list.push( "<li>Invalid Email</li>" );
			errors = true;
		}
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$("#savedCreateClassModal .modal-body span").html(message);
			$('#savedCreateClassModal').modal('show');
			
		}else{
			//SaveItems
			
			//SaveStudents
			//Recorrer  todos los items de clase_student_list_modify y guardarlos
			var users_class = []
			$( "#clase_student_list_create" ).children().each(function () {
				users_class.push($( this ).find("a").attr("data-user-pk"));
				
			});
			
			//Redirect close to allClases.
			$.ajax({type: "POST",  url: allClasses, data: JSON.stringify({ class_name: class_name, password:password, email:email, teachers:teacher, students: users_class}) }).
	        fail(function(resp){
				$("#savedCreateClassModal .modal-body span").html("Internal Error, Please try again later.");
	        	$('#savedCreateClassModal').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good saving')
				$("#savedCreateClassModal .modal-body span").html("Your class has been created successfully");
	        	$('#savedCreateClassModal').modal('show');
	        	
	        });
		}
		
		
	});
	
	//$(".content #savedCreateClassModal .modal-content .modal-footer .close-btn").click(function(){
	//	$('#savedCreateClassModal').modal('hide');	
	//});
	

	$('#clase_student_list_create').on('click', '.user-to-delete', function(e) {

		
		e.preventDefault();
		console.log("User to delete ");
		var user_to_delete = this.dataset.userPk;

		$( this ).parent().remove();
		var count = 1;
		var users_class = []
		$( "#clase_student_list_create" ).children().each(function () {
			$( this ).find("span").html(count+" -");
			
			count = count +1;
		});
		
		
	});
	
	$('#student-add-class-list-created').on('click', '.user-to-add', function(e) {

		
		e.preventDefault();
		console.log("User to add ");
		var user_to_add = this.dataset.userPk;
		$( this ).parent().hide();
		var count = 1;
		var users_class = []
		$("#clase_student_list_create").children().each(function () {
			users_class.push($( this ).find("a").attr("data-user-pk"));
			
			count = count +1;
		});
		console.log(users_class);
		console.log(users_class.indexOf(user_to_add) == -1);
		console.log(user_to_add);
		if (users_class.indexOf(user_to_add) == -1){
			$('#clase_student_list_create').append( "<li><a  class='user-to-delete' data-user-last-name="+this.dataset.userLastName+" data-user-first-name="+this.dataset.userFirstName+" data-user-pk="+this.dataset.userPk+" href='#'><span>" +count+" -</span>"+ this.dataset.userFirstName +" "+ this.dataset.userLastName+"</a></li>");
		}
		
		
	});
	
	// END CREATE CLASE ----------
	
	$(".all-classes-tab-title").click(
			function() {
				$('#createclass').css('display', 'none');
				$('.allclasse-detail').css('display', 'none');
				$('.choose-class').find("span").html("Loading ...");
				$( "#classes_list" ).hide();
				$('.choose-class').css('display', 'block');
				$('.modify-classes-tab-title').css('display', 'none');
				

				
				
				$.ajax({type: "GET",  url: allClasses}).
		        fail(function(resp){
		            console.log('bad credentials.')
		        }).
		        done(function(data){
		        	
		        	var items = [];
		        	$.each( data, function( key, val ) {
		        		items.push( "<li  >" +' <a href="#" data-clase-pk="' + val.pk + '" data-toggle="modal" data-target="#clase-password-modal">'+val.name+'</a>' + "</li>" );
		        		$( "#classes_list" ).html(items.join( "" ));
		        	  });
		        	if(items.length == 0){
		        		$('.choose-class').find("span").html("No Classes");
		        	}else{
		        		$('.choose-class').find("span").html("Choose a class :");
		        		$( "#classes_list" ).show();
		        	}
		        	
		        });
			});
	


	$('#clase-password-modal').on('show.bs.modal', function(e) {
		  var clase_selected = e.relatedTarget.dataset.clasePk;
		  localStorage.setItem("selected_clase", parseInt(clase_selected));
		});
	
	$(".content #clase-password-modal .modal-content .modal-footer .close-btn").click(function(){
		
		$( "#error_clase_password" ).html("");
		 $('#clase_password').val("");
	});
	
	var teacher_selection_modify= null;
	
	$(".content #clase-password-modal .modal-content .modal-footer .enter-pass").click(function(){

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
        	$('#clase-password-modal').modal('hide');
        	$( "#error_clase_password" ).html("");
        	$.ajax({type: "GET",  url: getAdminsFromSchool} ).done(function(response){
        		
        		teacher_selection_modify = $('#magicsuggest').magicSuggest({
            		allowFreeEntries:false,
            		data: JSON.parse(response),
            		valueField: 'pk',
                    displayField: 'name',
                    placeholder: 'Type Here',
                });
        		
        		teachers = []
            	$.each(resp.teachers, function(i, data){
            		teachers.push(data.pk);
            	});
            	teacher_selection_modify.setValue(teachers);
        	});
        	
        	
        	//Use the clase response Obj
        	console.log(resp.pk);
        	$( "#clase_name" ).html(resp.name);
        	teachers = []
        	$.each(resp.teachers, function(i, data){
        		teachers.push(data.first_name + " " + data.last_name );
        	});
        	$( "#clase_teacher" ).html(teachers.join( ", " ));
        	$( "#clase_password_value" ).html(resp.password);
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
    		$('.modify-classes-tab-title').css('display', 'block');

        });
		
		
		
	
	});
	
		

	$(".modify-classes-tab-title").click(function(){
		
		$("#modify .create-class-detail").hide();
		$('#createclass').css('display', 'none');
		console.log("Modify Clases");
		localStorage.setItem("user_to_add_modifiy_clase", JSON.stringify([]));
		var pk = localStorage.getItem("selected_clase");
		$.ajax({type: "GET",  url: getClassDetail+pk }).
        
        done(function(resp){
        	
        	//Use the clase response Obj
        	console.log(resp.pk);
        	$( "#class_name_modify" ).val(resp.name);
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
		var teacher = teacher_selection_modify.getValue();
		console.log(teacher_selection_modify.getValue());
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
			$("#savedModifiedClassModal .modal-body span").html(message);
			$('#savedModifiedClassModal').modal('show');
			
		}else{
			//SaveItems
			
			//SaveStudents
			//Recorrer  todos los items de clase_student_list_modify y guardarlos
			var users_class = []
			$( "#clase_student_list_modify" ).children().each(function () {
				users_class.push($( this ).find("a").attr("data-user-pk"));
				
			});
			
			//Redirect close to allClases.
			var pk = localStorage.getItem("selected_clase");
			$.ajax({type: "PUT",  url: getClassDetail+pk, data: JSON.stringify({ class_name: class_name, password:password, email:email, teachers:teacher, students: users_class}) }).
	        fail(function(resp){
				$("#savedModifiedClassModal .modal-body span").html("Internal Error, Please try again later.");
	        	$('#savedModifiedClassModal').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good saving')
				$("#savedModifiedClassModal .modal-body span").html("Your class has been modified successfully");
	        	$('#savedModifiedClassModal').modal('show');
	        	
	        });
		}
		
		$
		
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
		}

		
	});
});