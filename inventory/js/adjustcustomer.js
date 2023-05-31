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

let searchcustomerid = document.getElementById('searchcustomerid');

// get the customer to up date
searchcustomerid.addEventListener('click', () =>{
  let txtsearchcustomerid = document.getElementById('txtsearchcustomerid').value;
  // fields 
  if (txtsearchcustomerid == "") {
    myAlert(warning, "Enter Customer IDNumber to search")
  }else{

   var searchfor = txtsearchcustomerid;
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
     CustomerRiegion: newregion,
     CustomerDistrict: newdistrict,
     CustomerTown: newtown,
     CustomerVillage: newvillage,
     CustomerGender: newselectedgender,
     CreatedBy: email,
   
      }).then(() => {
   myAlert(success, "Customer details successfuly updated");
   setTimeout(function(){
    location.reload();
     }, 3000); // 
  })
  .catch((error) => {
     myAlert(failed, "Customer details not updated");
  });


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