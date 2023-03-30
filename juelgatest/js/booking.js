
const serviceappling = localStorage.getItem('bookfor');
document.getElementById('mybook').innerHTML = serviceappling;
btnsubmitbook = document.getElementById('btnsubmitbook');

//insertcount() ;
function insertapplication() {
  // body...

   
     // get application mode
  var selectElement = document.getElementById("service-option");
  var selectedOptionValue = selectElement.value;
    // get application date
var today = new Date();
// Get date components
var year = today.getFullYear();
var month = today.getMonth() + 1; // Month is zero-indexed, so we add 1
var day = today.getDate();

// Get time components
var hours = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();
var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


     // get service and all form details
     let applicantemail = document.getElementById('email').value;
     let str = applicantemail;
     let newStr = str.replace(/@/, "JS");
     let newStr2 = newStr.replace(/\./, "SR");
     let appliedservice = serviceappling;
     let clientname = document.getElementById('name').value;
     let othername = document.getElementById('othername').value;
     let phonenumber = document.getElementById('phone').value;
     let locationname = document.getElementById('location').value;
     let Description = selectedOptionValue;
     let pending = "0"


    
  firebase.database().ref('Bookings/' + newStr2).set({

  Email: applicantemail,
  StudentName: clientname,
  OtherName: othername,
  PhoneNumber: phonenumber,
  CourseName: appliedservice,
  LocationName: locationname,
  LearningMode : Description,
  EnrollDate : dateTimeString,
  Status : pending

    },  (error) => {
  if (error) {
    // The write failed...
     alert('Application Faled');
     
  }else{
 alert('Application Succefull will be conducted soon thank you');
 window.location.href = "index.html";
     
  }
}
)
}

btnsubmitbook.addEventListener('click' , ()  => {
	insertapplication()
})