let lecturerSelect = document.getElementById('lecturerSelect')
firebase.database().ref("userDetails").once("value", function(snapshot) {
	lecturerSelect.innerHTML = "<option>Select Lecturer </option>"
	snapshot.forEach(function (childSnapshot) {
		let data = childSnapshot.val()
		if(data.Role == "Admin" && data.Status == "active"){
			let option = document.createElement("option")
			option.value = data.Email
			option.textContent = data.FirstName
			lecturerSelect.appendChild(option)
		}
	})
})

// venue

let venueSelect = document.getElementById('venueSelect')
firebase.database().ref("GpsVenus").once("value", function(snapshot) {
	venueSelect.innerHTML = "<option>Select Venue</option>"
	snapshot.forEach(function (childSnapshot) {
		let data = childSnapshot.val()
		if(data.Status == "active"){
			let option = document.createElement("option")
			option.value = data.VenueCode
			option.textContent = data.VenueName
			venueSelect.appendChild(option)
		}
	})
})



/// add new course to firebase

let btnaddcourse = document.getElementById("btnaddcourse");

  // event
  btnaddcourse.addEventListener("click", () => {

    // inputs
    let txtcoursename = document.getElementById("txtcoursename").value.trim();
    let txtcoursecode = document.getElementById("txtcoursecode").value.trim();
    let lecturerSelect = document.getElementById("lecturerSelect").value.trim();
    let lecturerSelectName = document.getElementById("lecturerSelect")
    let lecturerName = lecturerSelectName.options[lecturerSelectName.selectedIndex].text;
    let venueSelect = document.getElementById("venueSelect").value.trim();
    let statusSelect = document.getElementById("statusSelect").value.trim();
    // get create by 
      let user = firebase.auth().currentUser;
      let createdby = user.email;
      let timenow = Date.now(); 

    // validation
    if (txtcoursename == "") {
      alert("Enter course name");
      return;
    }
    // check if venue code is empty the return code stops here
    if (txtcoursecode == "") {
      alert("Enter course code");
      return;
    }
    // check if longitude is empty the return code stops here
    if (lecturerSelect == "Select Lecturer") {
      alert("Select Lecturer");
      return;
    }
    // check if latitude is empty the return code stops here
    if (venueSelect == "Select Venue") {
      alert("Select  Venue");
      return;
    }

    // firebase insert
    firebase.database().ref("Courses/" + txtcoursecode).set({
      CourseName: txtcoursename,
      CourseCode: txtcoursecode,
      Status: statusSelect,
      LecturerEmail: lecturerSelect,
      Lecturername: lecturerName,
      Venue: venueSelect,
      CreatedAt: timenow,
      CreatedBy: createdby
    })

    .then(() => {
      alert("Course added successfully");

      // clear inputs
      document.getElementById("txtcoursename").value = "";
      document.getElementById("txtcoursecode").value = "";
    })
    .catch((error) => {
      alert(error.message);
    });
  });


// load data into the dashboard

  function loaddata(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebody");
  // load data
  firebase.database().ref("Courses").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "active"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.CourseCode}</td>
            <td>${data.CourseName}</td>
            <td>${data.Lecturername}</td>
            <td>${data.Venue}</td>

            <td>
              <button class="btn btnred" onclick="suspendcourse('${key}')">
                Suspend course
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddata();


 function loaddatainactive(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebodyinactive");
  // load data
  firebase.database().ref("Courses").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "inactive"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.CourseCode}</td>
            <td>${data.CourseName}</td>
            <td>${data.Lecturername}</td>
            <td>${data.Venue}</td>

            <td>
              <button class="btn btngreen" onclick="activatecourse('${key}')">
                Activate course
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddatainactive()




// suspend and activate course 
function suspendcourse(courseid){
    let confirmSuspend = confirm("Are you sure you want to suspend this course ?")
    if(!confirmSuspend) return;
    firebase.database().ref("Courses/" + courseid).update({
        Status:"inactive"
    })
    .then(() =>{
        alert("Course suspended")
    })
    .then((error) =>{
        alert("Error while suspending")
    })

}



function activatecourse(courseid){
    let confirmSuspend = confirm("Are you sure you want to activate this course ?")
    if(!confirmSuspend) return;
    firebase.database().ref("Courses/" + courseid).update({
        Status:"active"
    })
    .then(() =>{
        alert("Course activated")
    })
    .then((error) =>{
        alert("Error while activating")
    })

}


// count courses

let lbtotalactivecourses = document.getElementById('lbtotalactivecourses')
firebase.database().ref("Courses").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active"){
      total++
    }

  })
  lbtotalactivecourses.innerHTML = total
})
// inactive 
let lbtotalinactivecourses = document.getElementById('lbtotalinactivecourses')
firebase.database().ref("Courses").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "inactive"){
      total++
    }
    })
  lbtotalinactivecourses.innerHTML = total
})


