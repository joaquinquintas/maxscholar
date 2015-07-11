
$(document).ready(function() {
	
	$("#individual_report").click(function(e){
		$("#report_info_text").html("Loading ...");
		$('.indvidual-detail-left').css('display','none');
    	$('.individual-tab-detail').css('display','none');
		$("#report_individual_selector").html("");
		$("#individual .individual-tab-detail").css("display", "none");
		$.ajax({type: "GET",  url: getStudentList}).
	    done(function(resp){
	    	$.each( resp, function( key, val ) {
	    	var o = new Option(val.first_name+" "+val.last_name , val.pk);
			$("#report_individual_selector").append(o);
	    	});
	    	$("#individual .individual-tab-detail").css("display", "block");
	    	$('.indvidual-detail-left').css('display','none');
	    	$('.individual-tab-detail').css('display','block');
	    	$("#report_info_text").html("");
	    });
		
	});
	
	$("#generate_individual_report").click(function(e){
		$('.content .individual-tab-detail').css('display','none');
		$('.content .indvidual-detail-left').css('display','none');
		user_pk = $("#report_individual_selector").val();
		
		from_day = $("#invidiual_report_to_day").val();
		from_month = $("#invidiual_report_from_month").val();
		from_year = $("#invidiual_report_from_year").val();
		
		to_day = $("#invidiual_report_to_day").val();
		to_month = $("#invidiual_report_to_month").val();
		to_year = $("#invidiual_report_to_year").val();
		
		start_date = from_year+"-"+from_month+"-"+from_day;
		end_date = to_year+"-"+to_month+"-"+to_day;
		
		$("#invidual_report_user_name").html("");
		$("#invidual_report_user_username").html("");
		$("#invidual_report_user_level").html("");
		$("#invidual_report_user_type").html("");
		$("#invidual_report_user_date").html("");
		$("#invidual_report_user_pretest").html("");
		$("#invidual_report_user_last_login").html("");
		
		to_send={start_date:start_date, end_date, student_id:user_pk}
		console.log(to_send);
		$.ajax({type: "GET",  url: getIndividualReportReading, data:to_send}).
		done(function(data){
			start_date = from_month +"/"+from_day+"/"+from_year;
			end_date = to_month +"/"+to_day+"/"+to_year;
			data = JSON.parse(data);
			console.log(data.student);
			$("#invidual_report_user_name").html(data.student.first_name +" "+ data.student.last_name);
			$("#invidual_report_user_username").html(data.student.username);
			$("#invidual_report_user_level").html(data.student.level.name);
			$("#invidual_report_user_type").html(data.student.type.name);
			$("#invidual_report_user_date").html(start_date+" - "+end_date);
			$("#invidual_report_user_pretest").html(data.student.pretest_score + " %");
			$("#invidual_report_user_last_login").html(data.student.last_login);
			
			$("#individual_maxreading").html("");
			$("#individual_maxreading_hl_modals").html("");
			
			$('.content .indvidual-detail-left').css('display','block');
			
			$.each( data.reports, function( key, val ) {
				tr = '<tr><td width="10%">5</td>'+
                      '<td width="12%">'+ val.exercise.book.title+'</td>'+
                      '<td width="14%">'+val.exercise.title +'</td>'+
                      '<td width="8%">'+ val.hl_score+'</td>'+
                      '<td width="10%">'+val.quiz_score +'</td>'+
                      '<td width="33%"><a href="#" data-toggle="modal" data-target="#HL_'+val.exercise.pk+'" >Highlighting </a> <a href="#"> Outline </a> <a href="#">Summary</a></td>'+
                      '<td width="12%">'+val.created +'</td>'+
              
                      +'</tr>';
				modal = '<div class="modal fade" id="HL_'+val.exercise.pk+'" " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                '<div class="modal-activity"><div class="modal-content-activity">'+
                '<div class="modal-body">'+val.hl_text+'</div>'+
                '<div class="modal-footer"><button type="button" class="close-btn" data-dismiss="modal">Close</button></div>'+
                '</div></div></div>';
				
				$("#individual_maxreading").append(tr);
				console.log(modal);
				$("#individual_maxreading_hl_modals").append(modal);
				
		    	});
		});
		
		
	});
});
