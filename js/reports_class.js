
$(document).ready(function() {
	$('.lcs_switch').removeClass('lcs_on');
	$('.lcs_switch').addClass('lcs_off');
	

	
	$("#class_report").click(function(e){
		$('.reports-detail').css('display','none');
		$( "#error_class_password" ).html("");
		$("#report_class_info_text").html("Loading ...");
		$('.class-tab-detail').css('display','none');
		$("#report_class_selector").html("");
		$("#individual .individual-tab-detail").css("display", "none");
		$.ajax({type: "GET",  url: allClasses}).
        fail(function(resp){
            console.log('bad credentials.')
        }).
        done(function(data){
        	$.each( data, function( key, val ) {
    	    	var o = new Option(val.name , val.pk);
    			$("#report_class_selector").append(o);
    	    	});
        	
        	$("#report_class_info_text").html("");
        	$('.class-tab-detail').css('display','block');
        	
        });
		
	});
	
	
	$("#class_score_report_table").on('click', '.report_class_user_list', function(e){
		e.preventDefault();
		$(".class-inner-tab-title").removeClass("active");
		$(".individual-title").addClass("active");
		$('.class-tab-detail').css('display','none');
    	$('.reports-detail').css('display','none');
    	$('.content #class-detail-message').css('display','block');
    	
    	//this.dataset.userReport;
		//$("#report_individual_selector").val("22707");
		localStorage.setItem("individual_report_student_id", this.dataset.userReport);
		
		start_year = localStorage.getItem("class_report_start_year");
		start_month = localStorage.getItem("class_report_start_month");
		start_day = localStorage.getItem("class_report_start_day");
		end_year = localStorage.getItem("class_report_end_year");
		end_month = localStorage.getItem("class_report_end_month");
		end_day = localStorage.getItem("class_report_end_day");
		
		$("#invidiual_report_to_day").val(start_day);
		$("#invidiual_report_from_month").val(start_month);
		$("#invidiual_report_from_year").val(start_year);
		
		$("#invidiual_report_to_day").val(end_day);
		$("#invidiual_report_to_month").val(end_month);
		$("#invidiual_report_to_year").val(end_year);
		$( "#generate_individual_report" ).trigger( "click" );
		
		$("#class").removeClass("active");
		$(".individual-tab-detail").css('display','none');
		$("#individual").addClass("active");
		
	})
	
	$(".class-tab-detail button").click(function(e){

		class_pk = $("#report_class_selector").val();
		
		class_password = $("#class_password").val();
		
		$.ajax({type: "POST",  url: checkClassPassword, async:false, data: { password: class_password, pk:class_pk } }).
        fail(function(resp){
            console.log('Bad password')
            console.log(resp.responseJSON.non_field_errors[0]);
            $( "#error_class_password" ).html(resp.responseJSON.non_field_errors[0]);
            $( "#class_password" ).select();
        })
        .done(function(resp){
        	$('.class-tab-detail').css('display','none');
        	$('.reports-detail').css('display','none');
        	$('.content #class-detail-message').css('display','block');
    		
    		from_day = $("#class_report_from_day").val();
    		from_month = $("#class_report_from_month").val();
    		from_year = $("#class_report_from_year").val();
    		
    		to_day = $("#class_report_to_day").val();
    		to_month = $("#class_report_to_month").val();
    		to_year = $("#class_report_to_year").val();
    		
    		
    		
    		$("#report_class_name").html("");
    		$("#report_teacher_name").html("");
    		$("#report_class_email").html("");
    		$("#report_class_dates").html("");
    		$("#report_class_online").html("");

    		
    		
			start_date = from_month +"/"+from_day+"/"+from_year;
			end_date = to_month +"/"+to_day+"/"+to_year;
			$("#report_class_name").html(resp.name);
			var teachers = []
				$.each( resp.teachers, function( key, val ) {
					teachers.push( val.first_name + " " + val.last_name)
	    	    	});
	        	
			$("#report_teacher_name").html(teachers.join());
			$("#report_class_email").html(resp.email);
			$("#report_class_dates").html(start_date+" - "+end_date);

			start_date = from_year+"-"+from_month+"-"+from_day;
    		end_date = to_year+"-"+to_month+"-"+to_day;
    		
    		localStorage.setItem("class_report_start_date", start_date);
    		localStorage.setItem("class_report_start_year", from_year);
    		localStorage.setItem("class_report_start_month", from_month);
    		localStorage.setItem("class_report_start_day", from_day);
    		localStorage.setItem("class_report_end_date", end_date);
    		localStorage.setItem("class_report_end_year", to_year);
    		localStorage.setItem("class_report_end_month", to_month);
    		localStorage.setItem("class_report_end_day", to_day);
    		
    		localStorage.setItem("class_id_report", class_pk);
    		
    		
    		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
    		$.ajax({type: "GET", async:false, url: getClassScoreAvg, data:to_send}).
    		done(function(data){
    			$("#class_score_report_table").html("");
    			data = JSON.parse(data);
    			$("#report_class_online").html(data.online);

    			class_time_sum = 0;
    			class_maxreading_sum = 0;
    			class_maxwords_sum = 0;
    			class_maxplaces_sum = 0;
    			class_maxbios_sum = 0;
    			class_maxmusic_sum = 0;
    			
    			insa_count = 0;
    			sa_count = 0;
    			ex_count = 0;
    			
    			$.each( data.reports, function( key, val ) {
    				
    				score_sum = val.maxreading.value + val.maxwords.value + val.maxplaces.value +val.maxbios.value + val.maxmusic.value;
    				score_avg = score_sum/5;
    				per = performance(score_avg)
    				if (per.id == "satisfactory"){
    					sa_count = sa_count + 1;
    				}else {
    					if (per.id== "not-satifactory"){
    						insa_count = insa_count + 1;
    					}else{
    						ex_count = ex_count + 1;
    					}
    				}
    				class_time_sum = class_time_sum + val.time.value;
    				class_maxreading_sum = class_maxreading_sum + val.maxreading.value;
    				class_maxwords_sum = class_maxwords_sum + val.maxwords.value;
    				class_maxplaces_sum = class_maxplaces_sum + val.maxplaces.value;
    				class_maxbios_sum = class_maxbios_sum + val.maxbios.value;
    				class_maxmusic_sum = class_maxmusic_sum + val.maxmusic.value;
    				
    				tr = '<tr>' +
                        '<td width="12%" class="cumulative-time student-name" style="background : none">'+
    						'<a class="report_class_user_list" data-user-report=' + val.student.pk +' href="#">'+val.student.name+'</a></td>'+
                        '<td width="11%">'+val.time.value.toFixed(1)+'</td>'+
                        '<td width="11%">'+val.maxreading.value.toFixed(1)+' </td>'+
                        '<td width="11%" class="cumulative-time see-individual"><a href="#">See individual report</a></td>'+
                        '<td width="11%"> '+val.maxwords.value.toFixed(1)+'  </td>'+
                        '<td width="10%"> '+val.maxplaces.value.toFixed(1)+'  </td>'+
                        '<td width="10%"> '+val.maxbios.value.toFixed(1)+'  </td>'+
                        '<td width="10%"> '+val.maxmusic.value.toFixed(1)+'  </td>'+
                        '<td width="10%" class="'+per.id+'"><span>'+per.label+' </span></td>'+
                      '</tr>';
    				
    				$("#class_score_report_table").append(tr);
    				
    			});
    			
    			avg_time = class_time_sum/data.reports.length;
    			avg_reading = class_maxreading_sum/data.reports.length;
    			avg_words = class_maxwords_sum/data.reports.length;
    			avg_places = class_maxplaces_sum/data.reports.length;
    			avg_bios = class_maxbios_sum/data.reports.length;
    			avg_music = class_maxmusic_sum/data.reports.length;
    			
    			sum_avg_score = avg_reading + avg_words + avg_places + avg_bios + avg_music;
    			class_avg_score = sum_avg_score/5;
    			per = performance(class_avg_score)
    			
    			tr_avg = '<tr class="average">' +
                	'<td width="12%" class="cumulative-time" style="background : none"><a href="#">Class Average</a></td>'+
	                '<td width="11%">'+avg_time.toFixed(1)+' </td>'+
	                '<td width="11%">'+avg_reading.toFixed(1)+' </td>'+
	                '<td width="11%" class="cumulative-time">-</td>'+
	                '<td width="11%"> '+avg_words.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_places.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_bios.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_music.toFixed(1)+' </td>'+
	                '<td width="10%" class="'+per.id+'"><span>'+per.label+ '</span></td>'+
	              '</tr>';
    			
    			$("#class_score_report_table").append(tr_avg);
    			
    			total_eval = sa_count + insa_count + ex_count;
    			satisfactory_per = percentage(sa_count, total_eval);
    			insatisfactory_per = percentage(insa_count, total_eval);
    			excellent_per = percentage(ex_count, total_eval);
    			
    			$("#satis_per").html(satisfactory_per + "%");
    			$("#unsatis_per").html(insatisfactory_per + "%");
    			$("#excell_per").html(excellent_per + "%");
    			
    			var chart = new Highcharts.Chart({
    				chart: {
    				renderTo: 'container2',
    				type: 'pie',
    				backgroundColor: '#f2f2f2'
    				},
    				colors: [ '#eac84c', '#25a89a', 
    				'#ef655f', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'] ,
    				credits: {
    				enabled: false
    				},
    				plotOptions: {
    				pie: {

    				innerSize: '55%'
    				}
    				},
    				series: [{
    				data: [
    				['Satisfactory', parseFloat(satisfactory_per)],
    				['Excellent', parseFloat(excellent_per)],
    				['Unsatisfactory', parseFloat(insatisfactory_per)] 
    				]}]
    				},
    				// using 
    							 
    				function(chart) { // on complete

    				var xpos = '50%';
    				var ypos = '53%';
    				var circleradius = 102;

    				// Render the circle
    				chart.renderer.circle(xpos, ypos, circleradius).attr({
    				fill:'#f2f2f2'
    				}).add();


    				});
    			
    			$.ajax({type: "GET", async:false, url: getIndividualReportUsage, data:to_send}).
        		done(function(data){
        			data = JSON.parse(data);
        			logs = [{name: "MAXREADING", y: data.maxreading,drilldown: "MAXREADING"},
        			        {name: "MAXPHONICS", y: data.maxphonics,drilldown: "MAXPHONICS"},
        			        {name: "MAXWORDS", y: data.maxwords,drilldown: "MAXWORDS"},
        			        {name: "MAXPLACES", y: data.maxplaces,drilldown: "MAXPLACES"},
        			        {name: "MAXBIOS", y: data.maxbios,drilldown: "MAXBIOS"},
        			        {name: "MAXMUSIC", y: data.maxmusic,drilldown: "MAXMUSIC"}]
        			
        			// Create the chart
        			$('#container1').highcharts({
        			chart: {
        			fill:'#f00',	
        			type: 'column',
        			backgroundColor: '#f2f2f2'

        			},

        			colors: ['#47c1c8', '#1488c9', '#9b5bb8', '#eac84c', '#25a89a', 
        			'#ef655f', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'] ,
        			xAxis: {
        			type: 'category'
        			},

        			legend: {

        			enabled: false,
        			floating:false
        			},
        			credits: {
        			enabled: false
        			},
        			plotOptions: {
        			series: {
        			borderWidth: 0,
        			dataLabels: {
        				enabled: true,
        				format: '{point.y:.1f}%',
        				backgroundColor: '#f84f4f',
        				borderRadius:'50%'  
        			 }
        			}
        			},


        			series: [{

        			colorByPoint: true,
        			data: logs
        			}],
        			drilldown: {
        			series: []
        			}


        			});
        		});
    			
    			
    		});
			
			
			

			$('.class-tab-detail').css('display','none');
    		$('.reports-detail').css('display','block');
    		$('.content ul.print-button').css('display','block');
    		$('.content #class-detail-message').css('display','none');
    		
    		/*
    		
    		
    		*/
        	
        });
		
        
	});

function percentage(value, total){
	if (total != 0){
		return ((value * 100)/total).toFixed(0);
	}else{
		return 0;
	}
	
}
	
function performance(score){
	if (score <= 60){
		return {"id": "not-satifactory", "label":"Not Satisfactory"}
	}else{
		if (score>60 && score <=80){
			return {"id": "satisfactory", "label":"Satisfactory"}
		}else{
			return {"id": "excellent", "label":"Excellent"}
		}
	}
        
        
};
});
