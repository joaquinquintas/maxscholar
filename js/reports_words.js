
$(document).ready(function() {

	$("#class_words_report").click(function(e){
		e.preventDefault();
			
		start_date = localStorage.getItem("class_report_start_date");
		end_date = localStorage.getItem("class_report_end_date");
		class_pk = localStorage.getItem("class_id_report");
		
		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
		
		$.ajax({type: "GET", async:true, url: getClassMaxwordsReport, data:to_send}).
		done(function(data){
			
			$("#words_class_report").html("");
			data = JSON.parse(data);
			sum_time = 0;
			sum_clover = 0;
			sum_spelling = 0;
			sum_pre_suf = 0;
			sum_latin = 0;
			sum_greek = 0;
			
			$.each( data.reports, function( key, val ) {
				sum_time = sum_time + val.time.value;
				sum_clover = sum_clover + val.clover.value;
				sum_spelling = sum_spelling + val.spelling.value;
				sum_pre_suf = sum_pre_suf + val.pre_suf.value;
				sum_latin = sum_latin + val.latin.value;
				sum_greek = sum_greek + val.greek.value;
				
				tr = '<tr>' +
                '<td width="14.6%">'+ val.student.name +'</td>'+
                '<td width="14.2%"> '+ val.time.value+'</td>'+
                '<td width="14.2%">'+ val.clover.value+' </td>'+
                '<td width="14.2%"> '+ val.spelling.value+'</td>'+
                '<td width="14.2%">'+ val.pre_suf.value+' </td>'+
                '<td width="14.2%"> '+ val.latin.value+'</td>'+
                '<td width="14.2%">'+ val.greek.value+' </td>'+
                '</tr>';
				$("#words_class_report").append(tr);
			});
			
			total = data.reports.length;
			
			tr = '<tr class="average">' +
            '<td width="14.6%">Average</td>'+
            '<td width="14.2%"> '+ getAvg(sum_time, total) +'</td>'+
            '<td width="14.2%">'+ getAvg(sum_clover, total) +' </td>'+
            '<td width="14.2%"> '+ getAvg(sum_spelling, total)+'</td>'+
            '<td width="14.2%">'+ getAvg(sum_pre_suf, total)+' </td>'+
            '<td width="14.2%"> '+ getAvg(sum_latin, total)+'</td>'+
            '<td width="14.2%">'+ getAvg(sum_greek, total)+' </td>'+
            '</tr>';
			
			$("#words_class_report").append(tr);
		});
		
		
		//container6
		
	});
	
function getAvg(sum, total){
	return  (sum/total).toFixed(1);
}
});