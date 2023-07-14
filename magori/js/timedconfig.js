
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyBUhOlk_7bA2gcGbcE7UnTMF8J_lNwZbqc",
  authDomain: "magorihardware.firebaseapp.com",
  databaseURL: "https://magorihardware-default-rtdb.firebaseio.com",
  projectId: "magorihardware",
  storageBucket: "magorihardware.appspot.com",
  messagingSenderId: "750164123395",
  appId: "1:750164123395:web:483a0a52a15cb6c8219336",
  measurementId: "G-72SG4403H0"
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
  var targetDate = new Date("2023-7-22"); // Replace with your specified date

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