$(document).ready(function() {

	
	var server = "http://localhost:8080/"
	var allClasses = server + "dashboard/v1/classes/"
	var login = server + "dashboard/v1/login/"
	
	
	function checkCredentials(username, password){
	    function setHeader(xhr) {
	        // as per HTTP authentication spec [2], credentials must be
	        // encoded in base64. Lets use window.btoa [3]
	        xhr.setRequestHeader ("Authorization", "Basic " +
	                               btoa(username + ':'+ password));
	    }
	 
	    $.ajax({type: "POST",  url: login,  beforeSend: setHeader}).
	        fail(function(resp){
	            console.log('bad credentials.')
	        }).
	        done(function(resp){
	            console.log('welcome ' + resp.email)
	        });
	 };
	  
	 checkCredentials("eliecer", "max123")
	// $.ajax({
    //     type:"POST",
        
   //      url: login,
   //      data: { username: "eliecer", password: "max123" },
   //      processData: false,
    //     success: function(msg) {
   //     	 alert( "Data Loaded: " + data );
    //     }

	
	
	
	//$.post( login, { username: "eliecer", password: "max123" })
	//  .done(function( data ) {
	//    alert( "Data Loaded: " + data );
	//  });
	
	
	
	$(".all-classes-tab-title").click(
			function() {
				$('.allclasse-detail').css('display', 'none');
				$('.choose-class').css('display', 'block');

				$.getJSON(allClasses, function(data) {
					console.log(data);
					var items = [];
					$.each(data, function(key, val) {
						items.push("<li id='" + key + "'>"
								+ val + "</li>");
					});

					$("<ul/>", {
						"class" : "my-new-list",
						html : items.join("")
					}).appendTo("body");
				});

			});
	
});