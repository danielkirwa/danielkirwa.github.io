

document.getElementById("intentForm").addEventListener("submit", function(e) {
  const dateInput = document.getElementById("preferredDate").value;
  const timeInput = document.getElementById("preferredTime").value;

  const date = new Date(dateInput);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday

  // Block weekends
  if (day === 0 || day === 6) {
    e.preventDefault();
    alert("Consultations cannot be booked on weekends.");
    return;
  }

  // Block midnight (00:00)
  if (timeInput === "00:00") {
    e.preventDefault();
    alert("Consultations cannot be booked at midnight.");
    return;
  }

  // save to firebase


let fullName = document.getElementById('fullName').value.toUpperCase();
let phone = document.getElementById('phone').value;
let email = document.getElementById('email').value;
let notes = document.getElementById('notes').value;
let preferredDate = document.getElementById('preferredDate').value;
let preferredTime = document.getElementById('preferredTime').value;
var meetingType = document.getElementById("meetingType");
var selecteMeetingType = meetingType.value;
var location = document.getElementById("location");
var selectedLocation = location.value;


// validate data
 
 if (fullName == "" || phone == "" || selecteMeetingType == "" || selectedLocation  == "") {
 	let fillerror,fillerror1,fillerror2,fillerror3,fillerror4;
 	 if (firstname == "") {
      fillerror1 = "<br> Must enter you name";
    }else{
    	fillerror1 = "";
    }
    if (phone == "") {
      fillerror2 = "<br> Must enter phone number";
    }else{
    	fillerror2 = "";
    }
    if (selecteMeetingType == "") {
      fillerror3 = "<br> Must select type of meeting";
    }else{
    	fillerror3 = "";
    }
    if (selectedLocation == "") {
      fillerror4 = "<br> Must select location";
    }else{
    	fillerror4 = "";
    }
    




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5  + fillerror6 + fillerror7 + fillerror8 ;
 	alert("" + fillerror)

 }else{
 	
  // update data or write
 	const userId = email.replace(/\./g, "_dot_").replace(/@/g, "_at_");

     firebase.database().ref("ConsultationBookings/" + userId).update({

      FullName: fullName,
      Email: email,
      Phone: phone,
      Notes: notes,
      MeetingDate: preferredDate,
      MeetingLocation: selectedLocation,
      MeetingType: selecteMeetingType,
      Status: "Pending Confirmation",
      MeetingTime: preferredTime,
      ConfirmationCode: Math.random().toString(36).substring(2, 8),


   
      }).then(() => {
   alert("Booking done");
   setTimeout(function(){
    location.reload();
     }, 3000); // 
  })
  .catch((error) => {
     alert("Booking failed");
  });


 }



});