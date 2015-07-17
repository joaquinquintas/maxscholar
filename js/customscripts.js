$( document ).ready(function() {

$(".content .nav-tabs li").click(function(){
$('.welcome-notice').css('display','none');
});
$(".user-tab-title").click(function(){
$('.content ul.print-button').css('display','none');
})
$(".alluser-tab-detail").click(function(){
$('.content ul.print-button').css('display','block');
})

$(".class-tab-detail button").click(function(){
$('.class-tab-detail').css('display','none');
$('.reports-detail').css('display','block');
$('.content ul.print-button').css('display','block');
});

//$('.content .new-session-outer a.submit-changes').click(function(){
//$('.enter-session-detail').css('display','block');
//$('.enter-session-outer').css('display','block');
//$('.new-session-outer').css('display','none');
//});


$('.content .allstudent-detail .student-report').click(function(){
$('.allstudent-detail').css('display','none');
$('.content .complete-report ').css('display','block');
});
$(".content .user-tab-right .all-user-detail table tr td .user-report").click(function(){
$('.alluser-tab-detail').removeClass('active');

$('#allusers').removeClass('active');
$('#users').removeClass('active');
$('.user-tab-title').removeClass('active');	
$('.print-button').css('display','none');
$('.reports-tab-title').addClass('active');
$('#reports').addClass('active');
$('.individual-title').addClass('active');
$('#individual').addClass('active');
$('.individual-tab-detail').css('display','none');
//$('.indvidual-detail-left').css('display','block');
$('.overallperformance').removeClass('active');
$('#individualgenralperformance').removeClass('active');
$('.overalldetail').addClass('active');
$('#individualdetailscore').addClass('active');
 });
 $(".content .individual-tab-detail button ").click(function(){


//$('.content .individual-tab-detail').css('display','none');
//$('.content .indvidual-detail-left').css('display','block');

});
//$(".content .modal-content .modal-footer .enter-pass").click(function(){

//$('#myModal').modal('hide');
//$('#myModal4').modal('hide');
//$('#myModal5').modal('hide');
//$('.content .choose-class').css('display','none');
//$('.content .allclasse-detail').css('display','block');
//$('.content .modify ').css('display','block');
//$('.content .delete ').css('display','block');
//$('.content .print-button ').css('display','block');
//});
$(".content  .create-class-detail .all-member-detail .search-field  button").click(function(){


$('.content  .create-class-detail .all-member-detail .choose-member').show('slow');
});




//$(".content .allstudent-detail .enter-session").click(function(){


//$('.content  .allstudent-detail').css('display','none');
//$('.content .enter-session-outer ').css('display','block');

//});



$(".material").click(function(){

$('.content ul.print-button ').css('display','none');
});

$(".tutors").click(function(){

$('.content ul.print-button ').css('display','block');
});

$(" .content .see-detail-report-btn").click(function(){


$('.content .individual-average-score').css('display','block');
$('.content .individual-report-per-program').css('display','block');

});
$(" .individual-title").click(function(){
$('.content ul.print-button').css('display','none');
});
$(".content .individual-tab-detail button").click(function(){
$('.content ul.print-button').css('display','block');
});
$(".class-inner-tab-title").click(function(){
$('.reports-detail').css('display','none');
$('.class-tab-detail').css('display','block');
});

//$(".individual-title").click(function(){
//$('.indvidual-detail-left').css('display','none');
//$('.individual-tab-detail').css('display','block');
//});

//$(".all-classes-tab-title").click(function(){
//$('.allclasse-detail').css('display','none');
//$('.choose-class').css('display','block');
//});

$(".alluser-tab-detail").click(function(){
$('.edit-user-outer').css('display','none');
$('.all-user-outer').css('display','block');
});

$(".createuser-tab-detail").click(function(){
$('.edit-user-outer').css('display','block');
 });
 $(".mystudent-tab-title").click(function(){
$('.allstudent-detail').css('display','block');
$('.enter-session-outer').css('display','none');
$('.new-session-outer').css('display','none');
$('.complete-report').css('display','none');
 });

 
$(function(){
$('.average-class-detail .average-class-table').slimScroll({
height: '450px'
});
$('.content .create-class-detail .all-member-detail .modify-member').slimScroll({
height: '300px',
});

//$('.add-student ul').slimScroll({
//height: '410px'
//});
$('.user-tab-right .user-detail-table').slimScroll({
height: '530px'
});
$('.allstudent-detail .allstudent-table').slimScroll({
height: '530px'
});

$('.content .reports-detail .average-class-detail .average-class-top').slimScroll({
height: '500px' 
});

$('.content .individual-report-per-program-table').slimScroll({
height: '400px' 
});
$('.content .constant-table-detail').slimScroll({
height: '520px' 
});




$('.content .clover-tabs-detail .clover-table-detail table tbody tr td.show-all a').on('click', function(e) {
e.preventDefault();
$(this).text(function(i,v) {
return v === 'Hide all (13)' ?  'Show all (13)'  : 'Hide all (13)';
$('.content .clover-tabs-detail .clover-table-detail table tbody tr td.show-all a').css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
});

$('.content .hidden-table ').slideToggle('slow');
$('.search-filed-top ').css('opacity','1');
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
	format: '{point.y:.1f}%',
		backgroundColor: '#f84f4f',
	borderRadius:'50%'  
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
categories: ['Syllabication', 'Questions', 'Complete Words', 'Complete Sentences' ]
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



$(document).ready(function() {
$("#session_date").datepicker({
showOn: 'button',
buttonText: '',
buttonImageOnly: true,
buttonImage: 'images/callender-icon.png',
dateFormat: 'dd/mm/yy',
constrainInput: true
});

$(".ui-datepicker-trigger").mouseover(function() {
$(this).css('cursor', 'pointer');
});
$('input').lc_switch();

// triggered each time a field changes status
$('body').delegate('.lcs_check', 'lcs-statuschange', function() {
var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
console.log('field changed status: '+ status );
});

$( ".lcs_wrap" ).click(function() {
if ($('.lcs_switch').hasClass('lcs_off')) {
$('.content .top-tabs-headings li.genralclass').removeClass('active');
$('.content .top-tabs-headings li.detailclass').addClass('active');

$('#genralperformance').removeClass('active');
+					$('#detailscore').addClass('active');


}
else {

$('.content .top-tabs-headings li.detailclass').removeClass('active');
$('.content .top-tabs-headings li.genralclass').addClass('active');
$('#detailscore').removeClass('active');
$('#genralperformance').addClass('active');

}
});



$( ".content .top-tabs-headings li.genralclass" ).click(function() {

$('.lcs_switch').removeClass('lcs_on');
$('.lcs_switch').addClass('lcs_off');


});


$( ".content .top-tabs-headings li.detailclass" ).click(function() {

$('.lcs_switch').addClass('lcs_on');
$('.lcs_switch').removeClass('lcs_off');


});


$( ".lcs_wrap" ).click(function() {
if ($('.lcs_switch').hasClass('lcs_off')) {
$('.content .top-tabs-headings li.overallperformance').removeClass('active');
$('.content .top-tabs-headings li.overalldetail').addClass('active');
$('#individualgenralperformance').removeClass('active');
$('#individualdetailscore').addClass('active');


}
else {
$('.content .top-tabs-headings li.overalldetail').removeClass('active');
$('.content .top-tabs-headings li.overallperformance').addClass('active');
$('#individualgenralperformance').addClass('active');
$('#individualdetailscore').removeClass('active');

}


});
$( ".content .top-tabs-headings li.overallperformance" ).click(function() {

$('.lcs_switch').removeClass('lcs_on');
$('.lcs_switch').addClass('lcs_off');


});


$( ".content .top-tabs-headings li.overalldetail" ).click(function() {

$('.lcs_switch').addClass('lcs_on');
$('.lcs_switch').removeClass('lcs_off');


});

});
$('.content .reports-detail .average-class-detail .average-class-top table tbody td.student-name') .click(function() {
    $('.content .tabs-inner li').removeClass('active');
	$('#class').removeClass('active');
   $('.content .tabs-inner li.individual-title').addClass('active');
   $('#individual').addClass('active');
   $('.individual-tab-detail').css('display','none');
   $('.indvidual-detail-left').css('display','block');
});
 $('.content .reports-detail .average-class-detail .average-class-top table tbody td.see-individual') .click(function() {
    $('.content .tabs-inner li').removeClass('active');
	$('#class').removeClass('active');
   $('.content .tabs-inner li.individual-title').addClass('active');
   $('#individual').addClass('active');
   $('.individual-tab-detail').css('display','none');
   $('.indvidual-detail-left').css('display','block');
   $('.overallperformance').removeClass('active');
   $('.overalldetail').addClass('active');
   $('#individualgenralperformance').removeClass('active');
   $('#individualdetailscore').addClass('active');
   $('.max-read-individual').removeClass('active');
   $('.max-phonics').addClass('active');
   
    $('#maxread-indivdual').removeClass('active');
   $('#maxphonics-indivdual').addClass('active');
  

 });
 