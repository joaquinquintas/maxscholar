$(document).ready(function() {

	var server = "http://127.0.0.1:8080/"
	var AllClasses = server + "v1/dashboard/v1/classes/"
	
	$(".all-classes-tab-title").click(
			function() {
				$('.allclasse-detail').css('display', 'none');
				$('.choose-class').css('display', 'block');

				$.getJSON(AllClasses, function(data) {
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