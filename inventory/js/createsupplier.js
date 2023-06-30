addunits = document.getElementById('addunit');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;

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
let link = document.getElementById('link');
var selectedtype = document.getElementById("type");
let NewStatus;


// add supplier

let addsupplier = document.getElementById('addsupplier');
addsupplier.addEventListener("click" , () => {
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
let newlink = link.value;
var newselectedtype = selectedtype.value;

// validate
 if (newfirstname == "" || newidnumber == "" || newphone == "" || newregion == "" || newdistrict == "" || newtown == "" || newvillage == "" || newselectedtype == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8;
   if (newfirstname == "") {
      fillerror1 = "<br> Supplier Firstname / organization";
    }else{
      fillerror1 = "";
    }
    if (newidnumber == "") {
      fillerror2 = "<br> Supplier ID Number / Code";
    }else{
      fillerror2 = "";
    }
    if (newphone == "") {
      fillerror3 = "<br> Supplier Phone";
    }else{
      fillerror3 = "";
    }
    if (newregion == "") {
      fillerror4 = "<br> Supplier  Region";
    }else{
      fillerror4 = "";
    }
    if (newdistrict == "") {
      fillerror5 = "<br> Supplier District";
    }else{
      fillerror5 = "";
    }
    if (newtown == "") {
      fillerror6 = "<br> Supplier Town";
    }else{
      fillerror6 = "";
    }
     if (newvillage == "") {
      fillerror7 = "<br> Supplier Village / House";
    }else{
      fillerror7 = "";
    }
    if (newselectedtype == "") {
      fillerror8 = "<br> Supplier type";
    }else{
      fillerror8 = "";
    }
  
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror8 ;
  myAlert(warning, fillerror);
  }else{
    
      // insert data or write
    firebase.database().ref('Mysupplier/' + newidnumber).set({

     FirstName: newfirstname,
     OtherName:  newothername,
     IDNumber: newidnumber,
     SupplierPhone: newphone,
     SupplierEmail: newemail,
     SupplierOtherPhone: newotherphone,
     SupplierRiegion: newregion,
     SupplierDistrict: newdistrict,
     SupplierTown: newtown,
     SupplierVillage: newvillage,
     SupplierType: newselectedtype,
     SupplierLink: newlink,
     CreatedBy: email,
     DateAdded: datetoday,
     Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to save new supplier");
     
  } else {
    // Data saved successfully!
    myAlert(success, newfirstname +  " <br> Add a new Supplier  ");
    
    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
  }
} );

  }

})



 // Retrieve data from Firebase database
      var table = document.getElementById("suppliertable");
      var ref = firebase.database().ref("Mysupplier");
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
          cell2.innerHTML = childData.SupplierEmail;
          cell3.innerHTML = childData.SupplierPhone;
          cell4.innerHTML = childData.SupplierDistrict;
          cell5.innerHTML = childData.SupplierType;
          cell6.innerHTML = NewStatus;
        });
      });








// end off your code 
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