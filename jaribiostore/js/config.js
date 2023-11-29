
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