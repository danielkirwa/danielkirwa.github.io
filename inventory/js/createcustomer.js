addunits = document.getElementById('addunit');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
// write code here 
// get all value holders
let firstname = document.getElementById('firstname');
let othername = document.getElementById('othername');
let idnumber = document.getElementById('idnumber');
let phone = document.getElementById('phone');
let customeremail = document.getElementById('email');
let otherphone = document.getElementById('otherphone');
let region = document.getElementById('region');
let district = document.getElementById('district');
let town = document.getElementById('town');
let village = document.getElementById('village');
var selectedgender = document.getElementById("gender");
let NewStatus;


let addcustomer = document.getElementById('addcustomer');
addcustomer.addEventListener("click" , () => {
let newfirstname = firstname.value
let newothername = othername.value
let newidnumber = idnumber.value
let newphone = phone.value
let newemail = customeremail.value
let newotherphone = otherphone.value
let newregion = region.value
let newdistrict = district.value
let newtown = town.value
let newvillage = village.value
var newselectedgender = selectedgender.value;

// validate
 if (newfirstname == "" || newidnumber == "" || newphone == "" || newregion == "" || newdistrict == "" || newtown == "" || newvillage == "" || newselectedgender == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8;
   if (newfirstname == "") {
      fillerror1 = "<br> Firstname";
    }else{
      fillerror1 = "";
    }
    if (newidnumber == "") {
      fillerror2 = "<br> ID Number";
    }else{
      fillerror2 = "";
    }
    if (newphone == "") {
      fillerror3 = "<br> Phone";
    }else{
      fillerror3 = "";
    }
    if (newregion == "") {
      fillerror4 = "<br> Region";
    }else{
      fillerror4 = "";
    }
    if (newdistrict == "") {
      fillerror5 = "<br> District";
    }else{
      fillerror5 = "";
    }
    if (newtown == "") {
      fillerror6 = "<br> Town";
    }else{
      fillerror6 = "";
    }
     if (newvillage == "") {
      fillerror7 = "<br> Village / House";
    }else{
      fillerror7 = "";
    }
    if (newselectedgender == "") {
      fillerror8 = "<br> Gender";
    }else{
      fillerror8 = "";
    }
  
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror8 ;
  myAlert(warning, fillerror);
  }else{
    
      // insert data or write
    firebase.database().ref('Mycustomer/' + newidnumber).set({

     FirstName: newfirstname,
     OtherName:  newothername,
     IDNumber: newidnumber,
     CustomerPhone: newphone,
     CustomerEmail: newemail,
     CustomerOtherPhone: newotherphone,
     CustomerRiegion: newregion,
     CustomerDistrict: newdistrict,
     CustomerTown: newtown,
     CustomerVillage: newvillage,
     CustomerGender: newselectedgender,
     CreatedBy: email,
     DateAdded: datetoday,
     Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to save new customert");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New Customer save ");
    
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
      var table = document.getElementById("customertable");
      var ref = firebase.database().ref("Mycustomer");
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

          if (childData.Status == 1) {
             NewStatus = "Active";
          }else{
               NewStatus = "Not Active";
          }

          cell1.innerHTML = childData.FirstName;
          cell2.innerHTML = childData.CustomerEmail;
          cell3.innerHTML = childData.CustomerPhone;
          cell4.innerHTML = childData.CustomerDistrict;
          cell5.innerHTML = childData.CustomerGender;
          cell6.innerHTML = NewStatus;
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