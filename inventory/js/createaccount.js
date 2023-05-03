btnaddstaff = document.getElementById('btnaddstaff');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();




btnaddstaff.addEventListener("click", () =>{
let firstname = document.getElementById('firstname').value.toUpperCase();;
let othername = document.getElementById('othername').value.toUpperCase();;
let phone = document.getElementById('phone').value;
let otherphone = document.getElementById('otherphone').value;
let idnumber = document.getElementById('idnumber').value;
let email = document.getElementById('email').value;
let DoB = document.getElementById('dateofbirth').value;
var selectgender = document.getElementById("gender");
var selectedGenderOption = selectgender.value;
var selectstation = document.getElementById("station");
var selectedStationOption = selectstation.value;
var selectrole = document.getElementById("role");
var selectedRoleOption = selectrole.value;

// validate data
 
 if (firstname == "" || phone == "" || idnumber == "" || email == "" || DoB == "" || selectedGenderOption == "" || selectedStationOption == "" || selectedRoleOption == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8;
 	 if (firstname == "") {
      fillerror1 = " Firstname";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = ", Phone";
    }else{
    	fillerror2 = "";
    }
    if (idnumber == "") {
      fillerror3 = ", ID Number";
    }else{
    	fillerror3 = "";
    }
    if (email == "") {
      fillerror4 = ", Email";
    }else{
    	fillerror4 = "";
    }
    if (DoB == "") {
      fillerror5 = ", Date of birth";
    }else{
    	fillerror5 = "";
    }
    if (selectedGenderOption == "") {
      fillerror6 = ", Select gender";
    }else{
    	fillerror6 = "";
    }
     if (selectedRoleOption == "") {
      fillerror7 = ", Select Role";
    }else{
      fillerror7 = "";
    }
    if (selectedStationOption == "") {
      fillerror8 = ", Select Station";
    }else{
      fillerror8 = "";
    }




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror8 ;
 	myAlert(warning, fillerror)

 }else{
 	
  // insert data or write
    firebase.database().ref('Mystaff/' + idnumber).set({

      FirstName: firstname,
      OtherName: othername,
      IDNumber: idnumber,
      Phone: phone,
      OtherPhone: otherphone,
      Email: email,
      Gender: selectedGenderOption,
      Role: selectedRoleOption,
      Station: selectedStationOption,
      Dob: DoB,
      DateAdded: datetoday

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to Register New Staff");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New user registered and account created");
    resetForm();
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
   
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().createUserWithEmailAndPassword(email, idnumber);
    myAlert(success, "New user registered and account created");
    resetForm();
  })



  .catch((error) => {
    console.log(error);
    myAlert(warning, error.message)
    // ..
  });
  }
} );


 }

})











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


function resetForm(){
  firstname.value = "";
  othername.value = "";
  idnumber.value = "";
  phone.value = "";
  otherphone.value = "";
  email.value = "";
}


/// selected all data 

 // Retrieve data from Firebase database
      var table = document.getElementById("stafftable");
      var ref = firebase.database().ref("Mystaff");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          cell1.innerHTML = childData.FirstName;
          cell2.innerHTML = childData.Email;
          cell3.innerHTML = childData.Phone;
          cell4.innerHTML = childData.Station;
          cell5.innerHTML = childData.IDNumber;
          cell6.innerHTML = childData.Role;
          cell7.innerHTML = childData.DateAdded;
        });
      });