
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyCbaZ1-e_E0rp8LVW8_Fjq9kbbvNGzUZfA",
  authDomain: "jaribiostore-d1c2e.firebaseapp.com",
  databaseURL: "https://jaribiostore-d1c2e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jaribiostore-d1c2e",
  storageBucket: "jaribiostore-d1c2e.appspot.com",
  messagingSenderId: "1059399714898",
  appId: "1:1059399714898:web:fffc97508fd2febea9f78b",
  measurementId: "G-E6T6KN4QBG"
};


  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();

function logout(){
  // body...
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.href='../index.html';
}).catch(function(error) {
  // An error happened.
  myAlert(failed, "Failed to log out refresh and try again")
});
}


// get timer and display
let systemstatus = document.getElementById('systemstatus');
let logintoaccountbtn = document.getElementById('logintoaccount');
let forgotpasswordbtn = document.getElementById('forgotpassword');

function startTimer() {
  // Set the target date
  var targetDate = new Date("2026-7-1"); // Replace with your specified date

  // Update the countdown label every second
  var timer = setInterval(function() {
    // Get the current date and time
    var currentDate = new Date();

    // Calculate the time remaining in milliseconds
    var timeRemaining = targetDate.getTime() - currentDate.getTime();

    // Check if the target date has passed
    if (timeRemaining <= 0) {
      clearInterval(timer); // Clear the timer
      systemstatus.innerText = "Timer expired contact Juelga Solution";
      logintoaccountbtn.disabled = true;
      forgotpasswordbtn.disabled = true;
      logintoaccountbtn.innerHTML = "Locked for now"
      forgotpasswordbtn.innerHTML = "Locked for now"
      return;
    }

    // Calculate the remaining days, hours, minutes, and seconds
    var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Format the time remaining as a string
    var countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    // Update the countdown label
    systemstatus.innerText = "Time remaining to close : " + countdown;
  }, 1000); // Update every second
}

startTimer();