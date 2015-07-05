$(document).ready(function() {
	$('#max_user_list').click(function(){
		$('#user-list').html("");
		$('#allusers h2').html("Loading ...");
		$.ajax({type: "GET",  url: getStudentSearch}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					
					tr ='<tr id="' + val.pk + '">'+
                    '<td width="55%"><span>'+count+'-</span>'+ val.first_name +' '+ val.last_name+'</td>'+
                     '<td width="11%"><a href="'+val.pk+'" class="edit-user"><img src="images/edit-icon.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a href="#" data-user-delete-pk="' + val.pk + '" data-toggle="modal" data-target="#deleteUserModal" class="delete-user"><img src="images/chosse-member-icon.png" alt="" title=""></a></td>'+
                      '<td><a href="#" class="user-report">see report</a></td>'+ 
                      '</tr>';
				$('#user-list').append(tr);
				count = count + 1;
				});
				
				if(data.lenght == 0){
					$('#allusers h2').html("No Users");
				}else{
					$('#allusers h2').html("Users in your school :");
				}
				
			});
		
	});
	
	
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
	
	
});