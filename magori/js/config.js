
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