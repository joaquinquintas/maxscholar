$(document).ready(function() {
	$('#max_user_create').click(function(e) {
		$( "#fist-name-create-user" ).val("");
		$( "#last-name-create-user" ).val("");
		$( "#user-name-create-user" ).val("");
		$( "#password-create-user" ).val("");
		$( "#repassword-create-user" ).val("");
		$( "#level-create-user" ).val("no");
		$( "#type-create-user" ).val("no");
	});
	// CREATE USER   ------------------
	$("#craeteUserConfirmation").click(function(e){
		e.preventDefault();
		console.log("Click Create User");
		var errors = false;
		var errors_list = []
		
		var first_name = $( "#fist-name-create-user" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#last-name-create-user" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		var user_name = $( "#user-name-create-user" ).val();
		var user_name = user_name.split(' ').join('');
		
		if (user_name == ""){
			errors_list.push( "<li>Username is required</li>" );
			errors = true;
		}else{
			
			$.ajax({type: "GET",  async: false, url: validateUsername+"?username="+user_name}).
        	fail(function(response){
        		errors_list.push( "<li>Username already taken</li>" );
    			errors = true;
        	});
		}

		var password = $( "#password-create-user" ).val();
		var repassword = $( "#repassword-create-user" ).val();
		var save_password = false;
		if(password.length == 0){
			errors_list.push( "<li>Password is required</li>");
		}else{
			if(password != repassword){
				errors_list.push( "<li>Password mismatch</li>");
				errors = true;
			}
		}
		
		var user_type = $( "#type-create-user" ).val();
		var pre_test = $( "#pretest-create-user" ).val();
		var level = $( "#level-create-user" ).val();
		var save_level = level != "no"
		var save_user_type = user_type != "no"
		if(pre_test=="yes"){
			pre_test = true;
		}else{
			pre_test= false;
		}
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$("#CreateUserModal .modal-body span").html(message);
			$('#CreateUserModal').modal('show');
			
		}else{
			var to_send_data = { first_name: first_name, last_name:last_name, username:user_name, pre_test:pre_test};
				to_send_data.password = password;
				
			if(save_level == true){
				to_send_data.level = level;
			}
			if(save_user_type == true){
				to_send_data.user_type = user_type;
			}
			$.ajax({type: "POST",  url: getStudentList, data: JSON.stringify(to_send_data) }).
	        fail(function(resp){
				$("#CreateUserModal .modal-body span").html("Internal Error, Please try again later.");
	        	$('#CreateUserModal').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good Creation')
				$("#CreateUserModal .modal-body span").html("Your new user has been created successfully");
	        	$('#CreateUserModal').modal('show');
	        	
	        });
		}
		
		
	});
	
	// END CREATE USER   ------------------
	// EDIT USER   ------------------
	$('#user-list').on('click', '#edit-user-action',  function(e) {
		console.log("Edit user");
		e.preventDefault();
		$('.content  .edit-user-outer').css('display','block');
		$('.content  .all-user-outer').css('display','none');
		$('.edit-user-outer ul').css('display','none');
		$('#editConfirmation').css('display','none');
		
		$('.edit-user-outer h2').html("Loading ...");
		
		var user_selected = this.dataset.userEditPk;
		localStorage.setItem("user_selected_to_edit", user_selected);
		$.ajax({type: "GET",  url: getStudentDetail+user_selected}).
		fail(function(resp){
            console.log('Error in Get Student')
        }).
        done(function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	$.each($("#level-edit-user").children(), function(i){
        		if ($(this).val() == data.level.pk){
        			$(this).attr("selected","selected");
        		}
        	});
        	$.each($("#type-edit-user").children(), function(i){
        		if ($(this).val() == data.type.pk){
        			$(this).attr("selected","selected");
        		}
        	});
        	
        	if(data.level.pk == "no"){
    			$("#level-edit-user #no").attr("selected","selected");
			}
    		
        	if(data.type.pk == "no"){
    			$("#type-edit-use #no").attr("selected","selected");
			}
        	
    		$("#fist-name-edit-user").val(data.first_name);
        	$("#last-name-edit-user").val(data.last_name);
        	$("#user-name-edit-user").val(data.username);
        	if(data.do_pretest == false){
        		$("#pretest-edit-user #no").attr("selected","selected");
        	}
        	else{
        		$("#pretest-edit-user #yes").attr("selected","selected");
        	}
        	
        	
    		$('.edit-user-outer h2').html("");
        	$('.edit-user-outer ul').css('display','block');
        	$('#editConfirmation').css('display','block');
    
        	
    		
        	
        	
        });
		
		
	});
	
	
	$("#editConfirmation").click(function(e){
		var select_user = localStorage.getItem("user_selected_to_edit");
		e.preventDefault();
		console.log("Click Saved Edited User");
		var errors = false;
		var errors_list = []
		
		var first_name = $( "#fist-name-edit-user" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#last-name-edit-user" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		var user_name = $( "#user-name-edit-user" ).val();
		var user_name = user_name.split(' ').join('');
		
		if (user_name == ""){
			errors_list.push( "<li>Username is required</li>" );
			errors = true;
		}else{
			
			$.ajax({type: "GET", async: false, url: validateUsername+"?user_id="+select_user+"&username="+user_name}).
        	fail(function(response){
        		errors_list.push( "<li>Username already taken</li>" );
    			errors = true;
        	});
		}

		var password = $( "#password-edit-user" ).val();
		var repassword = $( "#repassword-edit-user" ).val();
		var save_password = false;
		if(password.indexOf("*")== -1  && password.length>0){
			if(password != repassword){
				errors_list.push( "<li>Password mismatch</li>");

				errors = true;
			}else{
				save_password = true;
			}
		}
		
		var user_type = $( "#type-edit-user" ).val();
		var pre_test = $( "#pretest-edit-user" ).val();
		var level = $( "#level-edit-user" ).val();
		var save_level = level != "no"
		var save_user_type = user_type != "no"
		if(pre_test=="yes"){
			pre_test = true;
		}else{
			pre_test= false;
		}
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$("#SaveEditUserModal .modal-body span").html(message);
			$('#SaveEditUserModal').modal('show');
			
		}else{
			var to_send_data = { first_name: first_name, last_name:last_name, username:user_name, pre_test:pre_test};
			if(save_password == true){
				to_send_data.password = password;
			}
			if(save_level == true){
				to_send_data.level = level;
			}
			if(save_user_type == true){
				to_send_data.user_type = user_type;
			}
			//Redirect close to allClases.
			var pk = localStorage.getItem("selected_clase");
			$.ajax({type: "PUT",  url: getStudentDetail+select_user, data: JSON.stringify(to_send_data) }).
	        fail(function(resp){
				$("#SaveEditUserModal .modal-body span").html("Internal Error, Please try again later.");
	        	$('#SaveEditUserModal').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good saving')
				$("#SaveEditUserModal .modal-body span").html("The user has been modified successfully");
	        	$('#SaveEditUserModal').modal('show');
	        	
	        });
		}
		
		
	});
	
	
	// END EDIT USER ------------------
	
	// LIST USER ------------------
	$('#max_user_list').click(function(){
		$('#user-list').html("");
		$('#allusers h2').html("Loading ...");
		$.ajax({type: "GET",  url: getStudentSearch}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					
					tr ='<tr id="' + val.pk + '">'+
                    '<td width="55%"><span>'+count+'-</span>'+ val.first_name +' '+ val.last_name+'</td>'+
                     '<td width="11%"><a href="#" data-user-edit-pk="' + val.pk + '" id="edit-user-action" class="edit-user"><img src="images/edit-icon.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a href="#" data-user-delete-pk="' + val.pk + '" data-toggle="modal" data-target="#deleteUserModal" class="delete-user"><img src="images/chosse-member-icon.png" alt="" title=""></a></td>'+
                      '<td><a href="#" class="user-report">see report</a></td>'+ 
                      '</tr>';
				$('#user-list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#allusers h2').html("No Users");
				}else{
					$('#allusers h2').html("Users in your school :");
				}
				
			});
		
	});
	
	// END LIST USER ------------------
	
	// DELETE USER -------------------
	$('#deleteUserModal').on('show.bs.modal', function(e) {
		  var user_selected = e.relatedTarget.dataset.userDeletePk;
		  localStorage.setItem("selected_user_to_delete", parseInt(user_selected));
		});
	
	$(".content #deleteUserModal .modal-content .modal-footer .enter-pass").click(function(){
		
		console.log("Delete!");
		to_delete_user_pk = localStorage.getItem("selected_user_to_delete");
		console.log(to_delete_user_pk);
		
		$.ajax({type: "DELETE",  url: getStudentDetail+to_delete_user_pk}).
			fail(function(resp){
	            console.log('Error in Delete')
	        }).
	        done(function(data){
	        	id= "#user-list #"+to_delete_user_pk
	        	$(id).remove();
	        	$('#deleteUserModal').modal('hide');
	        	count = 0;
	        	$( "#user-list" ).children().each(function () {
	        		count = count + 1;
	        		$(this).find("span").html(count+"-")
	        		
	        	});
	        	if (count==0){
	        		$('#allusers h2').html("No Users");
	        	}
	        });
	});
	
	// END DELETE USER ------------------
	
});