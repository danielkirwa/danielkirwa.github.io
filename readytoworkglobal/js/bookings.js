

document.getElementById("intentForm").addEventListener("submit", function(e) {
  const dateInput = document.getElementById("preferredDate").value;
  const timeInput = document.getElementById("preferredTime").value;

  const date = new Date(dateInput);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday

  // Block weekends
  if (day === 0 || day === 6) {
    e.preventDefault();
    showAlert("Date Error", "Consultations cannot be booked on weekends");

    return;
  }

  // Block midnight (00:00)
  if (timeInput === "00:00") {
    e.preventDefault();
    showAlert("Time Error", "Consultations cannot be booked at before 8AM  and Past 6PM");
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
 	 e.preventDefault();
  // update data or write
 	const userId = email.replace(/\./g, "_dot_").replace(/@/g, "_at_");
const bookingRef = firebase.database().ref("ConsultationBookings/" + userId);

bookingRef.once("value").then(snapshot => {
  if (snapshot.exists()) {
    // Booking already exists
    showAlert("Update !", "You already have a booking. Please edit or reschedule instead.");
   
  } else {
    // Create new booking
    bookingRef.set({
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
      CreatedAt: new Date().toISOString()
    }).then(() => {
      showAlert("Booking Successful", "Your booking has been saved successfully!");
      setTimeout(() => location.reload(), 3000);
    }).catch(error => {
      showAlert("Booking Failed", "There was a problem saving your booking. Please try again.");
    });
  }
});

 }



});


// Today and past days handling 
const dateInput = document.getElementById("preferredDate");
const timeInput = document.getElementById("preferredTime");

// Disable past dates
dateInput.min = new Date().toISOString().split("T")[0];

dateInput.addEventListener("change", function() {
  const selectedDate = new Date(this.value);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Check if weekend (0 = Sunday, 6 = Saturday)
  if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
    showAlert("Date Error", "Consultations cannot be booked on weekends");

    this.value = ""; // reset selection
    return;
  }

  // If today is picked → enforce 2‑hour buffer
  if (this.value === todayStr) {
    const now = new Date();
    now.setHours(now.getHours() + 2); // add 2 hours
    const minTime = now.toTimeString().slice(0,5); // HH:MM format
    timeInput.min = minTime;
  } else {
    // Reset to normal range
    timeInput.min = "08:00";
    timeInput.max = "18:00";
  }
});



// alerts
function showAlert(title, message) {
  document.getElementById("alertTitle").textContent = title;
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("customAlert").style.display = "block";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}