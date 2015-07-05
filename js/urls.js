$(document).ready(function() {	
	server = "http://localhost:8080/dashboard/v1/"
	allClasses = server + "classes/"
	login = server + "login/"
	checkClassPassword =  server + "classes-password-validator/"
	getClassDetail = server + "classes-detail/"
	getStudentFromSchool = server + "students/"
	getStudentList = server + "students-list/"
	getAdminsFromSchool = server + "teachers/"
	getStudentSearchFromSchool = server + "students/search/"
	getStudentSearch = server + "students-school/search/"
	getStudentDetail = server + "students-detail/"
	getLicense = server + "license/"
	getMaterials = server + "materials/"
	
});