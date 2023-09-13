var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";


 // Retrieve data from Firebase database
var Bname,Baddress,Bphone,Bemail;
      var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
          Bname = childData.BusinessName;
          Bemail = childData.Email;
          Bphone = childData.Phone;
          Baddress = childData.Address;
            
             console.log(Bname + "Here");

          // Create an array to keep business data
          let myArray = [Bname, Bemail, Bphone, Baddress];

         // Convert the array to a string and store it in local storage
         localStorage.setItem('BusinessDetails', JSON.stringify(myArray));

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];
          
        });
      });



let forgotpassword = document.getElementById('forgotpassword');
forgotpassword.addEventListener("click", () =>{
    window.location.href='reset.html';
})



// authentication 
let logintoaccount = document.getElementById('logintoaccount');
let fillerror,fillerror1,fillerror2;

logintoaccount.addEventListener('click', () =>{
 let username = document.getElementById('username').value;
let userpassword = document.getElementById('userpassword').value;

 if (username == "" || userpassword == "" ) {
   if (username == "") {
      fillerror1 = " Enter Username";
    }else{
      fillerror1 = "";
    }
    if (userpassword == "") {
      fillerror2 = "  Enter Password";
    }else{
      fillerror2 = "";
    }

        fillerror = 'Ensure that you  :  ' + fillerror1 +  fillerror2;
     myAlert(warning, fillerror)

  }else{
     
     // body...
     logintoaccount.innerHTML = "please wait ..."
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(username, userpassword);

    window.location.href='createbusiness.html';
  })
  .catch((error) => {
    // Handle Errors here.
    let Wrongpassworderror = 'The password is invalid or the user does not have a password.';
    let nousererror = 'There is no user record corresponding to this identifier. The user may have been deleted.';
    if (error.message == nousererror) {
      seconds = 2;
      //alert('No such user please register');
      myAlert(failed, "Check out the cridentials and try again");
      logintoaccount.innerHTML = "Login Now"
    }else if(error.message == Wrongpassworderror){
      //alert('Wrong password');
      seconds = 2;
      myAlert(failed, "Check out the cridentials and try again");
      logintoaccount.innerHTML = "Login Now"
     // console.log(seconds);
    }else{
      seconds = 2;
      // alert('An error occured');
       myAlert(failed, "Check out the cridentials and try again");
       logintoaccount.innerHTML = "Login Now"
    }
   
    btnsigninnewuser.innerHTML = "Log In"
  });


   // end of the login 
  }

})



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
        window.location.href='invadmin/dashboard.html';
      } else if (role == "Cashier") {
        window.location.href='cashier/saledesk.html';
      }else if (role == "SalesLead") {
        window.location.href='sales/saledesk.html';
      }else if(role == "Closed"){
          firebase.auth().signOut().then(function() {
         // Sign-out successful.
        window.location.href='index.html';
         }).catch(function(error) {
         // An error happened.
       window.location.href='index.html';
       });
      }else{
        window.location.href='dashboard.html';
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