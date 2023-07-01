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


// get supplier

let searchsupplierid = document.getElementById('searchsupplierid');

// get the customer to up date
searchsupplierid.addEventListener('click', () =>{
  let txtsearchsupplierid = document.getElementById('txtsearchsupplierid').value;
  // fields 
  if (txtsearchsupplierid == "") {
    myAlert(warning, "Enter Supplier IDNumber/Code to search")
  }else{

   var searchfor = txtsearchsupplierid;
    let searchnode = "Mycustomer/"+ searchfor;
    //console.log(searchnode);
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search ID Number not found");
  }else{
     myAlert(success, "Customer found Update with care <br> <b style=\"color:crimson;\"> ID Number can not be Updated <br>contact Support to update</b> <br> <i> Click ok to update other customer details</i>");
     firstname.value = childData.FirstName;
     othername.value = childData.OtherName;
     idnumber.value = childData.IDNumber;
     phone.value = childData.CustomerPhone;
     customeremail.value = childData.CustomerEmail;
     otherphone.value = childData.CustomerPhone;
     region.value = childData.CustomerRiegion;
     district.value = childData.CustomerDistrict;
     town.value = childData.CustomerTown;
     village.value = childData.CustomerVillage;
     selectedgender.value = childData.CustomerGender;

  }
}); 

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

/// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];

