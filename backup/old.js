			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="11%"><a href="http://maxscholar.com'+val.file+'">'+
                     '<img src="images/download-arrow.png" alt="" title=""></a></td>'+
                      '<td width="11%"><a id="'+ val.pk+'" class="printMaxreading" href="http://maxscholar.com'+val.file+'"><img src="images/material-print-icon.png" alt="" title=""></a></td>'+
                       '</tr>';
				$('#maxreading_list').append(tr);
				doc = '<iframe id="doc_'+ val.pk+'" width="300px" height="500px" src="http://docs.google.com/viewerng/viewer?url=http://maxscholar.com'+val.file+'&embedded=true&print=true" style="display:block;"></iframe>'
				
				$("#doc_container").append(doc);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailmaxread h2').html("No Materials");
				}else{
					$('#materailmaxread h2').html("MAXREADING :");
				}


				
				count = 1;
				$.each( data, function( key, val ) {
					tr ='<tr>'+
                    '<td width="78%"><span>'+count+'-</span>'+ val.title+'</td>'+
                     '<td width="22%"><iframe id="doc_'+ val.pk+'" frameBorder="0" height="340px" src="http://docs.google.com/viewerng/viewer?url=http://maxscholar.com'+val.file+'&embedded=true&print=true" style="display:block;"></iframe></td>'+
                       '</tr>';
				$('#maxreading_list').append(tr);
				//doc = ''
				
				//$("#doc_container").append(doc);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#materailmaxread h2').html("No Materials");
				}else{
					$('#materailmaxread h2').html("MAXREADING :");
				}
$( document ).ready(function() {
   

	$(".content .nav-tabs li").click(function(){
   		$('.welcome-notice').css('display','none');
	});
	$(".class-tab-detail button").click(function(){
   		$('.class-tab-detail').css('display','none');
		$('.reports-detail').css('display','block');
		$('.content ul.print-button').css('display','block');
	});
	$(".content .reports-detail .average-class-detail .average-class-top table tbody td.cumulative-time a").click(function(){
	
	
	$('.average-class-detail').css('display','none');
	$('.report-per-program').css('display','block');
	
	});
	$(".content .individual-tab-detail button ").click(function(){
	
	
	$('.content .individual-tab-detail').css('display','none');
	$('.content .indvidual-detail-left').css('display','block');
	
	});
	$(".content .modal-content .modal-footer .enter-pass").click(function(){
		 
		 $('#myModal').modal('hide');
		 $('#myModal4').modal('hide');
		 $('#myModal5').modal('hide');
		 $('.content .choose-class').css('display','none');
		 $('.content .allclasse-detail').css('display','block');
		  $('.content .modify ').css('display','block');
		   $('.content .delete ').css('display','block');
		   $('.content .print-button ').css('display','block');
 	});
	$(".content  .create-class-detail .all-member-detail .search-field  button").click(function(){
	
	
	$('.content  .create-class-detail .all-member-detail .choose-member').show('slow');
 	});
	$(".content  a.edit-user").click(function(){
	
	
	$('.content  .all-user-outer').css('display','none');
	$('.content  .edit-user-outer').css('display','block');
	
 	});
	
	
	$(".content .allstudent-detail .student-report").click(function(){
	
	
	$('.content  .allstudent-detail').css('display','none');
	$('.content .enter-session-outer ').css('display','block');
	
 	});
	$(".content .enter-session-outer a.decoument-session").click(function(){
	
	
	$('.content .enter-session-outer').css('display','none');
	$('.content .new-session-outer').css('display','block');
	
 	});
	
	$(" .content .see-detail-report-btn").click(function(){
	
	
	$('.content .individual-average-score').css('display','none');
	$('.content .individual-report-per-program').css('display','block');
	
 	});
	
	
	 $(function(){
    $('.average-class-detail .average-class-table').slimScroll({
        height: '450px'
    });
	 $('.add-student ul').slimScroll({
        height: '420px'
    });
	 $('.user-tab-right .user-detail-table').slimScroll({
        height: '530px'
    });
	 $('.allstudent-detail .allstudent-table').slimScroll({
        height: '530px'
    });
 
	 $('.content .clover-tabs-detail .clover-table-detail table tbody tr td.show-all a').on('click', function(e) {
     e.preventDefault();
     $(this).text(function(i,v) {
           return v === 'Hide all (13)' ?  'Show all (13)'  : 'Hide all (13)';
		   	 $('.content .clover-tabs-detail .clover-table-detail table tbody tr td.show-all a').css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
     });

	 $('.content .hidden-table ').slideToggle('slow');
});
}); 
$(function () {

    Highcharts.data({
        csv: document.getElementById('tsv').innerHTML,
	 
        itemDelimiter: '\t',
        parsed: function (columns) {

            var brands = {},
                brandsData = [],
                versions = {},
                drilldownSeries = [];

            // Parse percentage strings
            columns[1] = $.map(columns[1], function (value) {
                if (value.indexOf('%') === value.length - 1) {
                    value = parseFloat(value);
                }
                return value;
            });

            $.each(columns[0], function (i, name) {
                var brand,
                    version;

                if (i > 0) {

                    // Remove special edition notes
                    name = name.split(' -')[0];

                    // Split into brand and version
                    version = name.match(/([0-9]+[\.0-9x]*)/);
                    if (version) {
                        version = version[0];
                    }
                    brand = name.replace(version, '');

                    // Create the main data
                    if (!brands[brand]) {
                        brands[brand] = columns[1][i];
                    } else {
                        brands[brand] += columns[1][i];
                    }

                    // Create the version data
                    if (version !== null) {
                        if (!versions[brand]) {
                            versions[brand] = [];
                        }
                        versions[brand].push(['v' + version, columns[1][i]]);
                    }
                }

            });

            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: versions[name] ? name : null
                });
            });
            

            // Create the chart
            $('#container1').highcharts({
                chart: {
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
                            format: '{point.y:.1f}%'
                        }
                    }
                },

               
                series: [{
                    
                    colorByPoint: true,
                    data: brandsData
                }],
                drilldown: {
                    series: drilldownSeries
                }
				 
				 
            });
			
			           // Create the chart
            $('#container10').highcharts({
                chart: {
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
                            format: '{point.y:.1f}%'
                        }
                    }
                },

               
                series: [{
                    
                    colorByPoint: true,
                    data: brandsData
                }],
                drilldown: {
                    series: drilldownSeries
                }
				 
            });
			      // Create the chart
            $('#container2').highcharts({
                chart: {
                    type: 'pie',
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
                            format: '{point.y:.1f}%'
                        }
                    }
                },

               
                series: [{
                    
                    colorByPoint: true,
                    data: brandsData
                }],
                drilldown: {
                    series: drilldownSeries
                }
				 
            });
        }
    });
});
$(function() {
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
                ['Satisfactory', 80],
                ['Excellent', 14],
                ['Unsatisfactory', 3] 
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
});
 
$(function () {
    $('#container3').highcharts({
        chart: {
            type: 'column',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Topic', 'Main Idea', 'Detail']
        },
        yAxis: {
            min: 0,
			max: 100,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        credits: {
    enabled: false
  },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [
		{
            name: 'Un Correct',
            data: [20, 30, 80]
        },{
            name: 'Correct',
            data: [80, 70, 20]
        } ]
    });
  
});
$(function () {
    $('#container4').highcharts({
        chart: {
            type: 'column',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Main Idea', 'Detail', 'Inference', 'Compare' ]
        },
        yAxis: {
            min: 0,
			max: 100,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        credits: {
    enabled: false
  },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [
		{
            name: 'Un Correct',
            data: [20, 30, 80, 40 ]
        },{
            name: 'Correct',
            data: [80, 70, 20 , 60  ]
        } ]
    });
  
});  
$(function () {
    $('#container6').highcharts({
        chart: {
            type: 'column',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Main Idea', 'Detail', 'Inference', 'Compare' ]
        },
        yAxis: {
            min: 0,
			max: 100,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        credits: {
    enabled: false
  },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [
		{
            name: 'Un Correct',
            data: [20, 30, 80, 40 ]
        },{
            name: 'Correct',
            data: [80, 70, 20 , 60  ]
        } ]
    });
  
}); 
});

$(function () {
    $('#container11').highcharts({
        chart: {
            type: 'column',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Main Idea', 'Detail', 'Inference', 'Compare', 'Vocabulary']
        },
        yAxis: {
            min: 0,
			max: 100,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        credits: {
    enabled: false
  },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [
		{
            name: 'Un Correct',
            data: [20, 30, 80 ,30, 80]
        },{
            name: 'Correct',
            data: [80, 70, 20 ,70, 20]
        } ]
    });
	 
$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container12',
            type:'pie',
			backgroundColor: '#f2f2f2'
        },
		title: {
    text: 'Hangman'
},
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
  $(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container13',
            type:'pie',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container14',
            type:'pie',
			backgroundColor: '#f2f2f2'

        },
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
 
 
$(function () {
    $('#container18').highcharts({
	  chart: {
            renderTo: 'container18',
            
			backgroundColor: '#f2f2f2'

        },
		 credits: {
    enabled: false
  },
         xAxis: {
            tickInterval: 1
        },

        yAxis: {
		
            type: 'logarithmic',
            minorTickInterval: 0.1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },

        series: [{
            data: [100,80,60,40,20],
            pointStart: 1
        }]
    });
});


	 
$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container20',
            type:'pie',
			backgroundColor: '#f2f2f2'
        },
		title: {
    text: 'Hangman'
},
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
  $(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container21',
            type:'pie',
			backgroundColor: '#f2f2f2'
        },
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container22',
            type:'pie',
			backgroundColor: '#f2f2f2'

        },
		 colors: [ '#ee8984','#84b4ea'] ,
          credits: {
    enabled: false
  },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.round(this.percentage*100)/100 + ' %';
                    },
                    distance: -30,
                    color:'white'
                }
            }
        },
        
       series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                 ['Safari',   25],
                {
                    name: 'Chrome',
                    y: 75,
                    sliced: true,
                    selected: true
                },
               
                
            ]
        }]
    });
});
 
});