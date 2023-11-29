addunits = document.getElementById('addunit');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
// write code here 
// get all value holders
let agentname = document.getElementById('agentname');
let phone = document.getElementById('phone');
let customeremail = document.getElementById('email');
let otherphone = document.getElementById('otherphone');
let town = document.getElementById('town');
let NewStatus;


let addagent = document.getElementById('addagent');
addagent.addEventListener("click" , () => {
let newagentname = agentname.value
let newphone = phone.value
let newemail = customeremail.value
let newotherphone = otherphone.value
let newtown = town.value

// validate
 if (newagentname == "" || newphone == ""  || newtown == "") {
  let fillerror,fillerror1,fillerror2,fillerror3;
   if (newagentname == "") {
      fillerror1 = "<br> Enter agent name";
    }else{
      fillerror1 = "";
    }
    if (newphone == "") {
      fillerror2 = "<br> Phone";
    }else{
      fillerror2 = "";
    }
 
    if (newtown == "") {
      fillerror3 = "<br> Location /Full address";
    }else{
      fillerror3 = "";
    }
  

  
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 ;
  myAlert(warning, fillerror);
  }else{
    
      // insert data or write
    firebase.database().ref('Myagent/' + newphone).set({

     AgentName: newagentname,
     AgentPhone: newphone,
     AgentEmail: newemail,
     AgentOtherPhone: newotherphone,
     AgentTown: newtown,
     CreatedBy: email,
     DateAdded: datetoday,
     Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed to save new Agent");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New agent saved ");
    
    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
  }
} );


  }



})



// selected all data 

 // Retrieve data from Firebase database
      var table = document.getElementById("customertable");
      var ref = firebase.database().ref("Myagent");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);


          if (childData.Status == 1) {
             NewStatus = "Active";
          }else{
               NewStatus = "Not Active";
          }

          cell1.innerHTML = childData.AgentName;
          cell2.innerHTML = childData.AgentEmail;
          cell3.innerHTML = childData.AgentPhone;
          cell4.innerHTML = childData.AgentTown;
          cell5.innerHTML = NewStatus;
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
         //usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })