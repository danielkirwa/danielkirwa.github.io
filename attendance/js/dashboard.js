// count total users
let lbtoTotalStudents = document.getElementById('lbtoTotalStudents')
firebase.database().ref("userDetails").once("value", function(snapshot) {
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		total++

	})
	lbtoTotalStudents.innerHTML = total
})

// count total courses
let lbtoTotalCourses = document.getElementById('lbtoTotalCourses')
firebase.database().ref("Courses").once("value", function(snapshot) {
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		total++

	})
	lbtoTotalCourses.innerHTML = total
})


// count total Lecturers
let lbtoTotalLecturers = document.getElementById('lbtoTotalLecturers')
firebase.database().ref("userDetails").once("value", function(snapshot) {
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Role == "Admin"){
			total++
		}

	})
	lbtoTotalLecturers.innerHTML = total
})

// approvals all accounts that are suspended 

let lbtoTotalapprovals = document.getElementById('lbtoTotalapprovals')
firebase.database().ref("userDetails").once("value", function(snapshot) {
	let total = 0
	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Status == "inactive"){
			total++
		}

	})
	lbtoTotalapprovals.innerHTML = total
})