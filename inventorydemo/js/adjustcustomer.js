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
let deletecustomer = document.getElementById('deletecustomer');
let searchcustomerid = document.getElementById('searchcustomerid');

// get the customer to up date
searchcustomerid.addEventListener('click', () => {
  let txtsearchcustomerid = document.getElementById('txtsearchcustomerid').value;

  if (txtsearchcustomerid === "") {
    myAlert(warning, "Enter Customer IDNumber to search");
  } else {
    let searchByIdNode = "Mycustomer/" + txtsearchcustomerid;
    let searchByNameNode = "Mycustomer";
    let searchField = "";

    if (isNaN(txtsearchcustomerid)) {
      searchField = "FirstName";
    } else {
      searchField = "IDNumber";
    }

    // Firebase query to search by ID
    var ref = firebase.database().ref(searchByIdNode);

    // Firebase query to search by Name
    var query = firebase.database().ref(searchByNameNode).orderByChild(searchField).equalTo(txtsearchcustomerid);

    ref.once('value').then(function(snapshot) {
      var childData = snapshot.val();

      if (childData == null) {
        // If no results found by ID, search by Name
        query.once('value').then(function(nameSnapshot) {
          var nameChildData = nameSnapshot.val();

          if (nameChildData == null) {
            myAlert(failed, "Search ID Number or Name not found");
          } else {
            // Handle the found result by Name
            var nameChildKeys = Object.keys(nameChildData);
            var nameChildKey = nameChildKeys[0];

            var customerNode = "Mycustomer/" + nameChildKey;
            var customerRef = firebase.database().ref(customerNode);

            customerRef.once('value').then(function(customerSnapshot) {
              var customerData = customerSnapshot.val();
              if(customerData.Status == 1){
              updateCustomerDetails(customerData);
            }else{
              myAlertRefresh(warning," Customer not found or might have been deleted <br> <b style=\"color:crimson;\"> Try with ID Number <b>");
            }
            });
          }
        });
      } else {
        // Handle the found result by ID
        if(childData.Status == 1){
        updateCustomerDetails(childData);
      }else{
        myAlertRefresh(warning," Customer not found or might have been deleted");
      }
      }
    });
  }
});

function updateCustomerDetails(customerData) {
  myAlert(
    success,
    "Customer found Update with care <br> <b style=\"color:crimson;\"> ID Number can not be Updated <br>contact Support to update</b> <br> <i> Click ok to update other customer details</i>"
  );

  firstname.value = customerData.FirstName;
  othername.value = customerData.OtherName;
  idnumber.value = customerData.IDNumber;
  phone.value = customerData.CustomerPhone;
  customeremail.value = customerData.CustomerEmail;
  otherphone.value = customerData.CustomerPhone;
  region.value = customerData.CustomerRegion;
  district.value = customerData.CustomerDistrict;
  town.value = customerData.CustomerTown;
  village.value = customerData.CustomerVillage;
  selectedgender.value = customerData.CustomerGender;
  idnumber.readOnly = true;
}







let updatecustomer = document.getElementById('updatecustomer');
updatecustomer.addEventListener("click" , () => {
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
      fillerror2 = "<br> ID Number <b style=\"color:crimson;\">ID Number missing but will not be update just for confirmation</b> <br> <i>Id Number should be automaticaly filled search again customer</i>";
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

         firebase.database().ref("Mycustomer/" + newidnumber).update({
     FirstName: newfirstname,
     OtherName:  newothername,
     CustomerPhone: newphone,
     CustomerEmail: newemail,
     CustomerOtherPhone: newotherphone,
     CustomerRegion: newregion,
     CustomerDistrict: newdistrict,
     CustomerTown: newtown,
     CustomerVillage: newvillage,
     CustomerGender: newselectedgender,
     CreatedBy: email,
   
      }).then(() => {
   myAlertRefresh(success, "Customer details successfuly updated");
   
  })
  .catch((error) => {
     myAlert(failed, "Customer details not updated");
  });


  }



})



// delete code 
deletecustomer.addEventListener('click', () => {
   let newidnumber = idnumber.value;
  if (newidnumber == "") {
    let   fillerror = "<br> Customer ID Number / Code missing search first";
      myAlert(warning, fillerror);
    }else{
      firebase.database().ref('Mycustomer/' + newidnumber).update({

     Status: 2,

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to delete customer");
     
  } else {
    // Data saved successfully!
    myAlertRefresh(success, newidnumber +  " <br> <b style=\"color:crimson;\"> Deleted from the Syatem and archived note that all pending customer transaction will still show till they are claered for complete removal contact Juelga Solutions </b> ");
    
   
 
  }
} );
    }
})


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

function myAlertRefresh(title,message) {
  var alertBox = document.getElementById("alertBoxRefresh");
  var alertTitle = document.getElementById("alertTitle1");
  var alertMessage = document.getElementById("alertMessage1");
  
  alertTitle.innerHTML = title;
  alertMessage.innerHTML = message;
  alertBox.style.display = "block";
}

function hideAlertRefresh() {
  var alertBox = document.getElementById("alertBoxRefresh");
  alertBox.style.display = "none";
  location.reload();
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