addunits = document.getElementById('addunit');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
// write code here 

addunits.addEventListener("click", () =>{
let units = document.getElementById('units').value.toUpperCase();
let abbreviation = document.getElementById('abbreviation').value;
let description = document.getElementById('description').value;
let unitcode = document.getElementById('unitcode').value.toUpperCase();


// validate data
 
 if (units == "" || abbreviation == "" || description == "" || unitcode == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4;
 	 if (units == "") {
      fillerror1 = " Enter Units";
    }else{
    	fillerror1 = "";
    }
    if (abbreviation == "") {
      fillerror2 = " Enter abbreviation";
    }else{
    	fillerror2 = "";
    }
    if (description == "") {
      fillerror3 = " Add description";
    }else{
    	fillerror3 = "";
    }
    if (unitcode == "") {
      fillerror4 = " Enter unique code";
    }else{
    	fillerror4 = "";
    }
  




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4;
 	myAlert(warning, fillerror)

 }else{
 	
  // insert data or write
      const teacherRef = ref(db, 'teachers/');

    // Add teacher to Realtime Database
    document.getElementById('teacher-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('teacher-name').value.trim();
      const email = document.getElementById('teacher-email').value.trim();
      const subjects = document.getElementById('teacher-subjects').value.trim();
      const grades = document.getElementById('teacher-grades').value.trim();
      const feedbackElement = document.getElementById('form-feedback');

      if (!name || !email || !subjects || !grades) {
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = 'Please fill all the fields';
        return;
      }

      const newTeacherRef = push(teacherRef);

      try {
        await set(newTeacherRef, {
          name: name,
          email: email,
          subjects: subjects.split(',').map(s => s.trim()),
          grades: grades.split(',').map(g => g.trim())
        });

        feedbackElement.style.color = 'green';
        feedbackElement.textContent = 'Teacher added successfully!';
        
        document.getElementById('teacher-form').reset();

        // Refresh teacher list
        loadTeachers();
      } catch (error) {
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = 'Error adding teacher: ' + error.message;
      }
    });

    // Load teachers from Realtime Database and display in table
    async function loadTeachers() {
      const teacherList = document.getElementById('teacher-list');
      teacherList.innerHTML = ''; // Clear the list before loading

      const snapshot = await get(child(ref(db), 'teachers/'));
      if (snapshot.exists()) {
        const teachers = snapshot.val();
        for (const key in teachers) {
          const teacher = teachers[key];
          const row = document.createElement('tr');

          row.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.subjects.join(', ')}</td>
            <td>${teacher.grades.join(', ')}</td>
            <td>
              <button onclick="deleteTeacher('${key}')">Delete</button>
            </td>
          `;

          teacherList.appendChild(row);
        }
      }
    }

    // Delete teacher from Realtime Database
    window.deleteTeacher = async function(id) {
      await remove(ref(db, 'teachers/' + id));
      loadTeachers(); // Refresh the list
    }

    // Load teachers on page load
    window.onload = loadTeachers;

 }

})


// selected all data 

 // Retrieve data from Firebase database
      var table = document.getElementById("unitstable");
      var ref = firebase.database().ref("Myunits");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          if (childData.Status == 1) {
          	newstatus = "Active";
          }else{
          	newstatus = "Not Active";
          }

          cell1.innerHTML = childData.Unit;
          cell2.innerHTML = childData.Abbreviation;
          cell3.innerHTML = childData.Code;
          cell4.innerHTML = childData.DateAdded;
          cell5.innerHTML = newstatus;
        });
      });






// off your code 
// alert 

function myAlert(title,message) {
  var alertBox = document.getElementById("alertBox");
  var alertTitle = document.getElementById("alertTitle");
  var alertMessage = document.getElementById("alertMessage");
  
  alertTitle.innerHTML = title;
  alertMessage.innerHTML = message;
  alertBox.style.display = "block";
}

function hideAlert() {
  var alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none";
}

/// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];



auth.onAuthStateChanged(function(user){
      if(user){
        email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })