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
    firebase.database().ref('Myunits/' + unitcode).set({

      Unit: units,
      Abbreviation: abbreviation,
      Description: description,
      Code: unitcode,
      Createby: email,
      DateAdded: datetoday,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new unit");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New unit added ");
    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
  }
} );

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
          var cell5 = row.insertCell(4);
          var newstatus;
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
        window.location.href='index.html';
      }
    })