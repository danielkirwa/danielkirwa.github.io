addbusiness = document.getElementById('addbusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();




addbusiness.addEventListener("click", () =>{
let businessname = document.getElementById('businessname').value.toUpperCase();
let address = document.getElementById('address').value;
let phone = document.getElementById('phone').value;
let otherphone = document.getElementById('otherphone').value;
let otheremail = document.getElementById('otheremail').value;
let email = document.getElementById('email').value;
let region = document.getElementById('region').value.toUpperCase();
var town = document.getElementById("town").value.toUpperCase();
var slogan = document.getElementById("slogan").value;


// validate data
 
 if (businessname == "" || phone == "" || email == "" || address == "" || region == "" || town == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8;
 	 if (businessname == "") {
      fillerror1 = " Business name";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = ", Phone";
    }else{
    	fillerror2 = "";
    }
    if (email == "") {
      fillerror4 = ", Email";
    }else{
    	fillerror4 = "";
    }
    if (address == "") {
      fillerror5 = ", Add address";
    }else{
    	fillerror5 = "";
    }
    if (region == "") {
      fillerror6 = ", Region";
    }else{
    	fillerror6 = "";
    }
     if (town == "") {
      fillerror7 = ", Town";
    }else{
      fillerror7 = "";
    }
    




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7;
 	myAlert(warning, fillerror)

 }else{
 	
  // insert data or write
    firebase.database().ref('Mybusiness/' + businessname).set({

      BusinessName: businessname,
      Address: address,
      OtheEmail: otheremail,
      Phone: phone,
      OtherPhone: otherphone,
      Email: email,
      Region: region,
      Town: town,
      Slogan: slogan,
      DateAdded: datetoday

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new business and unclock the Inventory");
     
  } else {
    // Data saved successfully!
    myAlert(success, "Congratulation you gave unlocked the Inventory application");
   
 
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
      var table = document.getElementById("busniesstable");
      var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = childData.BusinessName;
          cell2.innerHTML = childData.Email;
          cell3.innerHTML = childData.Phone;
          cell4.innerHTML = childData.Address;
        });
      });




      /// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];