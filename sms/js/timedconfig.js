
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyBMzFuGI6ICfc5a30yabf5pjA1rB3mkvr4",
  authDomain: "juelga-stock-management.firebaseapp.com",
  databaseURL: "https://juelga-stock-management-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "juelga-stock-management",
  storageBucket: "juelga-stock-management.appspot.com",
  messagingSenderId: "870530675592",
  appId: "1:870530675592:web:6601e37d5e77eda103c03d",
  measurementId: "G-C3YJHKDM91"
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
  var targetDate = new Date("2023-10-25"); // Replace with your specified date

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