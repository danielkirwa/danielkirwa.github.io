btnupdatestaff = document.getElementById('btnupdatestaff');
searchstaffid = document.getElementById('searchstaffid');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();


searchstaffid.addEventListener('click', () =>{
  let txtsearchstaffid = document.getElementById('txtsearchstaffid').value;
  // fields 
  let firstname = document.getElementById('firstname');
  let othername = document.getElementById('othername');
  let phone = document.getElementById('phone');
  let otherphone = document.getElementById('otherphone');
  let idnumber = document.getElementById('idnumber');
  let email = document.getElementById('email');
  let doB = document.getElementById('dateofbirth');
  var selectgender = document.getElementById("gender");
  var selectstation = document.getElementById("station");
  var selectrole = document.getElementById("role");

  if (txtsearchstaffid == "") {
    myAlert(warning, "Enter Staff IDNumber to search")
  }else{

   var searchfor = txtsearchstaffid;
    let searchnode = "Mystaff/"+ searchfor;
    //console.log(searchnode);
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search ID Number not found");
  }else{
     myAlert(success, "Staff found Update with care <br> <b style=\"color:crimson;\">Email and ID Number can not be Updated <br>contact Support to update</b> <br> <i> Click ok to update other staff details</i>");
     firstname.value = childData.FirstName;
     othername.value = childData.OtherName;
     phone.value = childData.Phone;
     otherphone = childData.OtherPhone;
     idnumber.value = childData.IDNumber;
     email.value = childData.Email;
     selectgender.value = childData.Gender;
     selectstation.value = childData.Station;
     selectrole.value = childData.Role;
     doB.value = childData.Dob;

  }
}); 

  }

})

btnupdatestaff.addEventListener("click", () =>{
let firstname = document.getElementById('firstname').value.toUpperCase();;
let othername = document.getElementById('othername').value.toUpperCase();;
let phone = document.getElementById('phone').value;
let otherphone = document.getElementById('otherphone').value;
let idnumber = document.getElementById('idnumber').value;
let email = document.getElementById('email').value;
let DoB = document.getElementById('dateofbirth').value;
var selectgender = document.getElementById("gender");
var selectedGenderOption = selectgender.value;
var selectstation = document.getElementById("station");
var selectedStationOption = selectstation.value;
var selectrole = document.getElementById("role");
var selectedRoleOption = selectrole.value;

// validate data
 
 if (firstname == "" || phone == "" || idnumber == "" || email == "" || DoB == "" || selectedGenderOption == "" || selectedStationOption == "" || selectedRoleOption == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8;
 	 if (firstname == "") {
      fillerror1 = "<br> Firstname";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = "<br> Phone";
    }else{
    	fillerror2 = "";
    }
    if (idnumber == "") {
      fillerror3 = "<br> <b style=\"color:crimson;\">ID Number missing but will not be update just for confirmation</b> <br> <i>Id Number should be automaticaly filled search again staff</i>";
    }else{
    	fillerror3 = "";
    }
    if (email == "") {
      fillerror4 = "<br> <b style=\"color:crimson;\">Email missing but will not be update just for confirmation</b> <br> <i>Email should be automaticaly filled search again staff</i>";
    }else{
    	fillerror4 = "";
    }
    if (DoB == "") {
      fillerror5 = "<br> Date of birth";
    }else{
    	fillerror5 = "";
    }
    if (selectedGenderOption == "") {
      fillerror6 = "<br> Select gender";
    }else{
    	fillerror6 = "";
    }
     if (selectedRoleOption == "") {
      fillerror7 = "<br> Select Role";
    }else{
      fillerror7 = "";
    }
    if (selectedStationOption == "") {
      fillerror8 = "<br> Select Station";
    }else{
      fillerror8 = "";
    }




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror8 ;
 	myAlert(warning, fillerror)

 }else{
 	
  // update data or write

     firebase.database().ref("Mystaff/" + idnumber).update({

       FirstName: firstname,
      OtherName: othername,
      Phone: phone,
      OtherPhone: otherphone,
      Gender: selectedGenderOption,
      Role: selectedRoleOption,
      Station: selectedStationOption,
      Dob: DoB
   
      }).then(() => {
   myAlert(success, "Staff details successfuly updated");
   setTimeout(function(){
    location.reload();
     }, 3000); // 
  })
  .catch((error) => {
     myAlert(failed, "Staff details not updated");
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



function resetForm(){
  firstname.value = "";
  othername.value = "";
  idnumber.value = "";
  phone.value = "";
  otherphone.value = "";
  email.value = "";
}





         /// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];



auth.onAuthStateChanged(function(user){
      if(user){
        var email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })

// log out

