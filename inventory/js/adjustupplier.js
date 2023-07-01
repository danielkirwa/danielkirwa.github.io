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
    let searchnode = "Mysupplier/"+ searchfor;
    //console.log(searchnode);
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search ID Number not found");
  }else{
     myAlert(success, "Supplier found Update with care <br> <b style=\"color:crimson;\"> ID Number can not be Updated <br>contact Support to update</b> <br> <i> Click ok to update other supllier details</i>");
     firstname.value = childData.FirstName;
     othername.value = childData.OtherName;
     idnumber.value = childData.IDNumber;
     phone.value = childData.SupplierPhone;
     customeremail.value = childData.SupplierEmail;
     otherphone.value = childData.SupplierOtherPhone;
     region.value = childData.SupplierRiegion;
     district.value = childData.SupplierDistrict;
     town.value = childData.SupplierTown;
     village.value = childData.SupplierVillage;
     link.value = childData.SupplierLink;
     selectedtype.value = childData.SupplierType;
     idnumber.readOnly = true;

  }
}); 

  }

})


//  adjust / update supplier

let updatesupplier = document.getElementById('updatesupplier');
updatesupplier.addEventListener("click" , () => {
let newfirstname = firstname.value;
let newothername = othername.value;
let newidnumber = idnumber.value;
let newphone = phone.value;
let newemail = customeremail.value;
let newotherphone = otherphone.value;
let newregion = region.value;
let newdistrict = district.value;
let newtown = town.value;
let newvillage = village.value;
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
     SupplierPhone: newphone,
     SupplierEmail: newemail,
     SupplierOtherPhone: newotherphone,
     SupplierRiegion: newregion,
     SupplierDistrict: newdistrict,
     SupplierTown: newtown,
     SupplierVillage: newvillage,
     SupplierType: newselectedtype,
     SupplierLink: newlink,
     CreatedBy: email

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to update new supplier");
     
  } else {
    // Data saved successfully!
    myAlert(success, newfirstname +  " <br> Supllier details updated  ");
    
    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
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