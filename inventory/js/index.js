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
      myAlert(success, "ready")
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