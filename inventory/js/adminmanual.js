
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
     


 /*============================================*/
    // start of code

 function enlargeImage(img) {
    var enlargedContainer = document.createElement("div");
    enlargedContainer.classList.add("enlarged-image");
    enlargedContainer.onclick = function() {
      document.body.removeChild(this);
    };
    
    var enlargedImage = document.createElement("img");
    enlargedImage.src = img.src;
    
    enlargedContainer.appendChild(enlargedImage);
    document.body.appendChild(enlargedContainer);
  }











     
      // end of code
 /*============================================*/

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
        usernamedisplay.innerHTML = email;
      }
      if (role == "Cashier") {
       window.location.href='../cashier/saledesk.html';
      }
      if (role == "SalesLead") {
       usernamedisplay.innerHTML = email;
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
        //myAlert("No Active user");
      }
    })








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