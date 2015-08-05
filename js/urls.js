$(document).ready(function() {	
	server = "http://localhost:8080/dashboard/v1/"
	//server = "http://maxscholar.com/dashboard/v1/"
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
	getStudentLevels = server + "students-level-list/"
	getLicense = server + "license/"
	getMaterials = server + "materials/"
	getUserType = server + "students-type-list/"
	validateUsername = server + "validate-username/"
	getTutorDetail = server + "tutor-detail/"
	getStudentTutorList = server + "student-tutor-list/"
	setSession = server + "session/"
	validateSessionTime = server + "session-validate-time/"
	getSessionsList = server + "session-list/"
	getSessionReport = server + "report/"
	getIndividualReportReading = server + "reports/maxreading/"
	getIndividualReportBios = server + "reports/maxbios/"
	getIndividualReportPlaces = server + "reports/maxplaces/"
	getIndividualReportMusic = server + "reports/maxmusic/"
	getIndividualReportPhonics = server + "reports/maxphonics/"
	getIndividualReportUsage = server + "reports/usage/"
	getScoreAvg = server + "reports/score/avg/"
	getClassScoreAvg = server + "reports/class/score/avg/"
	getClassMaxreadingReport = server + "reports/class/maxreading/"
	getClassMaxplacesReport = server + "reports/class/maxplaces/"
	getClassMaxbiosReport = server + "reports/class/maxbios/"
	getClassMaxmusicReport = server + "reports/class/maxmusic/"
	
});