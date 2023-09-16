addbusiness = document.getElementById('addbusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;


addbusiness.addEventListener("click", () =>{
let businessname = document.getElementById('businessname').value.toUpperCase();
let address = document.getElementById('address').value;
let phone = document.getElementById('phone').value;
let otherphone = document.getElementById('otherphone').value;
let otheremail = document.getElementById('otheremail').value;
let primaryemail = document.getElementById('email').value;
let region = document.getElementById('region').value.toUpperCase();
var town = document.getElementById("town").value.toUpperCase();
let storename = document.getElementById('storename').value.toUpperCase();
let storeaddress = document.getElementById('storeaddress').value.toUpperCase();
let storecode = document.getElementById('storecode').value;
var openingstatus = document.getElementById("openingstatus");
var selectedOpeningStatus = openingstatus.value;


// validate data
 
 if (businessname == "" || phone == "" || primaryemail == "" || address == "" || region == "" || town == "" || storename == "" || storecode == "" || storeaddress == "" || selectedOpeningStatus == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8,fillerror9,fillerror10,fillerror11, fillerror12;
 	 if (businessname == "") {
      fillerror1 = "<br> Business name";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = "<br> Phone";
    }else{
    	fillerror2 = "";
    }
    if (primaryemail == "") {
      fillerror4 = "<br> Email";
    }else{
    	fillerror4 = "";
    }
    if (address == "") {
      fillerror5 = "<br>  Add address";
    }else{
    	fillerror5 = "";
    }
    if (region == "") {
      fillerror6 = "<br>  Region";
    }else{
    	fillerror6 = "";
    }
     if (town == "") {
      fillerror7 = "<br>  Town";
    }else{
      fillerror7 = "";
    }
    if (storename == "") {
      fillerror9 = "<br>  Store Name";
    }else{
      fillerror9 = "";
    }
    if (storecode == "") {
      fillerror10 = "<br>  Store Code";
    }else{
      fillerror10 = "";
    }
    if (storeaddress == "") {
      fillerror11 = "<br>  Store Address";
    }else{
      fillerror11 = "";
    }
    if (selectedOpeningStatus == "") {
      fillerror12 = "<br>  Store Opening Status";
    }else{
      fillerror12 = "";
    }
    
    




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror9 + fillerror10 + fillerror11 + fillerror12;
 	myAlert(warning, fillerror)

 }else{
 	
  // insert data or write
    firebase.database().ref('Mybusiness/' + storename).set({

      BusinessName: businessname,
      Address: address,
      OtheEmail: otheremail,
      Phone: phone,
      OtherPhone: otherphone,
      Email: primaryemail,
      Region: region,
      Town: town,
      DateAdded: datetoday,
      StoreName: storename,
      StoreCode: storecode,
      StoreAddress: storeaddress,
      OpeningStatus: selectedOpeningStatus,
      CreatedBy: email




    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new business and unclock the Inventory");
     
  } else {
    // Data saved successfully!
    myAlert(success, "Congratulation you have active stores");
   
 
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
          var cell5 = row.insertCell(4);
          cell1.innerHTML = childData.StoreName;
          cell2.innerHTML = childData.StoreCode;
          cell3.innerHTML = childData.Town;
          cell4.innerHTML = childData.StoreAddress;
          cell5.innerHTML = childData.OpeningStatus;
        });
      });




      /// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));
         if (storedBusiness.length === 0) {
           // no store or business available
         } else {
          
         // store or business available
         }

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