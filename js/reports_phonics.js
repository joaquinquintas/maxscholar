$(document).ready(function() {


$("#maxphonics_ind").click(function(){
	$("#phonics_table").css("display","none");
	//start_date = localStorage.getItem("individual_report_start_date");
	//end_date = localStorage.getItem("individual_report_end_date");
	user_pk = localStorage.getItem("individual_report_student_id");
	
	to_send={ student_id:user_pk}
	
	//$.ajax({type: "GET",  url: getIndividualReportPhonics, data:to_send}).
	//done(function(data){
	//	console.log(data);
		
	//});
		
	
	
	});



$(".phonics_apps").click(function(e){
	
	$("#phonics_table").css("display","none");
	e.preventDefault();
	var chapters = $(this).data("chapters");
	var chapters_list = chapters.split(",");
	$(this).parent().parent().children().removeClass('active');
	$(this).parent().addClass("active");
	$('#chapters').html("");
	
	chapters_list.forEach(function(item, i) {
		var li = $('<li>');
		if(item.indexOf('-') === -1){
			exer_list = item.split("");
		}else{
			exer_list = item.split("-");
		}
		exer = exer_list.join(",");
		
		if(i==0){
			 li.attr('class','active');
			 createTable(exer_list);
			$("#phonics_table").css("display","block");
			
		}
		
		$('#chapters').append(
				   li.append(
				        $('<a>').attr('href','#').attr(
				        		"class","phonics_chapters").attr('data-exercises', exer).append(
				            item
				)));
		  
	});
	
	
})




$("#chapters").on("click", ".phonics_chapters", function(e){
	$("#phonics_table").css("display","none");
	e.preventDefault();
	var exercises = $(this).data("exercises");
	var exercises_list = exercises.split(",");
	$(this).parent().parent().children().removeClass('active');
	$(this).parent().addClass("active");
	createTable(exercises_list);
	$("#phonics_table").css("display","block");
	});

function createTable(exercises_list){
	app_id = $("#apps").children( ".active" ).eq(0).children('a').data("app");
	capther_slug = $("#chapters").children( ".active" ).eq(0).children('a').html();
	console.log(app_id);
	console.log(capther_slug);
	//user_pk = localStorage.getItem("individual_report_student_id");
	user_pk = 3;
	
	to_send={ user_id:user_pk,capther_slug:capther_slug, app_id:app_id}
	
	$.ajax({type: "GET",  url: getIndividualReportPhonics, data:to_send}).
	done(function(data){
		console.log(data);
		
	});
	
	$("#phonics_table_content").html("");
	exercises_list.forEach(function(item, i) {
		var tr = $('<tr>');
		tr.append($('<td>').attr('class','exercise_letter').attr('width','8%').append(item));
		tr.append($('<td>').attr('class','visual_drill').attr('width','11.5%').append($('<a>').attr("href","#").append("Click to Check")));
		tr.append($('<td>').attr('class','handwriting_drill').attr('width','11.5%').append($('<a>').attr("href","#").append("Click to Check")));
		tr.append($('<td>').attr('class','auditory_drill').attr('width','11.5%').append($('<a>').attr("href","#").append("Click to Check")));
		tr.append($('<td>').attr('class','sound_blending_drill').attr('width','11.5%').append($('<a>').attr("href","#").append("Click to Check")));
		tr.append($('<td>').attr('width','11.5%').append($('<input>').attr('class','fluency_drill').attr("type","text").attr("placeholder","Type")));
		tr.append($('<td>').attr('width','11.5%').append($('<input>').attr('class','sight_words').attr("type","text").attr("placeholder","Type")));
		tr.append($('<td>').attr('class','controlled_readers').attr('width','11.5%').append($('<a>').attr("href","#").append("Click to Check")));
		tr.append($('<td>').attr('width','11.5%').append($('<input>').attr('class','comments').attr("type","text").attr("placeholder","Type")));
		$("#phonics_table_content").append(tr);
	});
}


$("#phonics_table_content").on("click", ".visual_drill, .handwriting_drill, " +
		".auditory_drill, .sound_blending_drill, .controlled_readers ", function(e){
	e.preventDefault();
	var tag_name = $(this).children().get(0).tagName;
	$(this).html("");
	
	if(tag_name == "A"){
		$(this).append($("<img>").attr("src","images/check-mark-icon.png"));
		value_to_post = true
	}else{
		$(this).append($('<a>').attr("href","#").append("Click to Check"));
		value_to_post = false
	}
	
	option_to_post = $(this).attr('class');
	post_maxphonics_data(option_to_post, value_to_post, $(this).parent().children( ".exercise_letter" ).eq(0).html());

	
});


$("#phonics_table_content").on("focus", ".fluency_drill, .sight_words, " +
		".comments", function(e){
	e.preventDefault();
	$(this).removeAttr('placeholder');
	
	
});

$("#phonics_table_content").on("focusout", ".fluency_drill, .sight_words, .comments", function(e){
	e.preventDefault();
	option_to_post = $(this).attr('class');
	value = $(this).val();
	if( value == ""){
		$(this).attr('placeholder', "Type");
	}else{
		post_maxphonics_data(option_to_post, value, $(this).parent().parent().children( ".exercise_letter" ).eq(0).html());
	}
	
	
});

$("#phonics_table_content").on("keypress keyup blur",".fluency_drill" ,function (event) {    
    $(this).val($(this).val().replace(/[^\d].+/, ""));
     if ((event.which < 48 || event.which > 57)) {
         event.preventDefault();
     }

     
 });

function post_maxphonics_data(field, value, exercise_letter){
	app_id = $("#apps").children( ".active" ).eq(0).children('a').data("app");
	capther_slug = $("#chapters").children( ".active" ).eq(0).children('a').html();

	//user_pk = localStorage.getItem("individual_report_student_id");
	user_pk = 3;
	$.ajax({type: "POST",  url: getIndividualReportPhonics, data: JSON.stringify({ field: field, value:value, 
		exercise_letter:exercise_letter, capther_slug:capther_slug, app_id:app_id, user_id:user_pk}) }).
	done(function(resp){
	//Nothings happends
	
	})
	
}

});