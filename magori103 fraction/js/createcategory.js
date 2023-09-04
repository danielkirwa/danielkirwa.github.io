addcategory = document.getElementById('addcategory');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
// write code here 

addcategory.addEventListener("click", () =>{
let category = document.getElementById('categoryname').value.toUpperCase();
let description = document.getElementById('description').value;


// validate data
 
 if (category == "" || description == "") {
 	let fillerror,fillerror1,fillerror2;
 	 if (category == "") {
      fillerror1 = " Enter Category";
    }else{
    	fillerror1 = "";
    }
    if (description == "") {
      fillerror2 = " Enter description";
    }else{
    	fillerror2 = "";
    }
    
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2;
 	myAlert(warning, fillerror)

 }else{
 	
  // insert data or write
    firebase.database().ref('Mycategory/' + category).set({

      Category: category,
      Description: description,
      Createby: email,
      DateAdded: datetoday,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new category");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New unit Category ");
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
      var table = document.getElementById("categorytable");
      var ref = firebase.database().ref("Mycategory");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var newstatus;
          if (childData.Status == 1) {
          	newstatus = "Active";
          }else{
          	newstatus = "Not Active";
          }

          cell1.innerHTML = childData.Category;
          cell2.innerHTML = childData.Description;
          cell3.innerHTML = childData.DateAdded;
          cell4.innerHTML = newstatus;
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