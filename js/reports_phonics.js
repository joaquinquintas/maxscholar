$(document).ready(function() {

$("#maxphonics_ind").click(function(){
		start_date = localStorage.getItem("individual_report_start_date");
		end_date = localStorage.getItem("individual_report_end_date");
		user_pk = localStorage.getItem("individual_report_student_id");
		
		to_send={start_date:start_date, end_date:end_date, student_id:user_pk}
		
		$.ajax({type: "GET",  url: getIndividualReportPhonics, data:to_send}).
		done(function(data){
			console.log(data);
			
		});
		
	});
});