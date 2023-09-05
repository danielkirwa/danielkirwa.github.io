updatebusiness = document.getElementById('updatebusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
let searchbusinessid = document.getElementById('searchbusinessid');


searchbusinessid.addEventListener("click", () => {
  let businessname = document.getElementById('businessname');
let address = document.getElementById('address');
let phone = document.getElementById('phone');
let otherphone = document.getElementById('otherphone');
let otheremail = document.getElementById('otheremail');
let email = document.getElementById('email');
let region = document.getElementById('region');
var town = document.getElementById("town");
var slogan = document.getElementById("slogan");


  var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
           businessname.value = childData.BusinessName;
           address.value = childData.Address;
           phone.value = childData.Phone;
           otherphone.value = childData.OtherPhone;
           otheremail.value = childData.OtheEmail;
           email.value = childData.Email;
           region.value = childData.Region;
           town.value = childData.Town;
           slogan.value = childData.Slogan;
           myAlert(success, "Business !!  Update with care <br> <b style=\"color:crimson;\"> Any data updated will be visisble across all business transaction <br> BUSINESS NAME WILL NOT BE UPDATED <br></b> <br> <i> Click ok to update business details</i>");

        });
      });

  })


updatebusiness.addEventListener("click", () =>{
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
      fillerror1 = " Business name <b style=\"color:crimson;\">Name missing but will not be update just for confirmation</b> <br> <i>Name should be automaticaly filled search again business</i>";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = "<br> Phone";
    }else{
    	fillerror2 = "";
    }
    if (email == "") {
      fillerror4 = "<br>  Email";
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
    




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7;
 	myAlert(warning, fillerror)

 }else{
 	
  // update data or write

         firebase.database().ref("Mybusiness/" + businessname).update({
      Address: address,
      OtheEmail: otheremail,
      Phone: phone,
      OtherPhone: otherphone,
      Email: email,
      Region: region,
      Town: town,
      Slogan: slogan,
   
      }).then(() => {
   myAlert(success, "Business details successfuly updated");
   setTimeout(function(){
    location.reload();
     }, 3000); // 
  })
  .catch((error) => {
     myAlert(failed, "Business details not updated");
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


function resetForm(){
  firstname.value = "";
  othername.value = "";
  idnumber.value = "";
  phone.value = "";
  otherphone.value = "";
  email.value = "";
}


/// selected all data 


      /// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];



 auth.onAuthStateChanged(function(user){
      if(user){
        var email = user.email;
        //check the role and open page
         
      const database = firebase.database();

// Function to find a staff member's role by email
function findStaffRoleByEmail(email) {
  const staffRef = database.ref('Mystaff');

  return staffRef.once('value')
    .then((snapshot) => {
      let role = null;
      snapshot.forEach((childSnapshot) => {
        const staffMember = childSnapshot.val();
        if (staffMember.Email === email) {
          role = staffMember.Role;
          return true; // Break the loop if the email is found
        }
      });
      return role;
    })
    .catch((error) => {
      //console.error('Error finding staff member role:', error);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      throw error;
    });
}

// Example usage:
const targetEmail = email; // The email to search for

findStaffRoleByEmail(targetEmail)
  .then((role) => {
    if (role) {
       // open pages accodingly
      console.log(role);
      if (role == "Admin") {
       // window.location.href='dashboard.html';
        usernamedisplay.innerHTML = email;
      }else if (role == "Cashier") {
        
       hideElementsByClassName("nocashier");
       usernamedisplay.innerHTML = email;
       window.location.href='saledesk.html';
      }else if (role == "SalesLead") {
        hideElementsByClassName("nosalelead");
        usernamedisplay.innerHTML = email;
        window.location.href='saledesk.html';
      }else{
        window.location.href='../index.html';
      }

    } else {
      //console.log('Staff member not found with email:', targetEmail);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      // Handle the case when the staff member is not found
    }
  })
  .catch((error) => {
    // Handle the error
  });
  
  
      }else{
         window.location.href='../index.html';
      }
    })




// hide tabs cashier
   function hideElementsByClassName(className) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
   console.log(i);
  }
}