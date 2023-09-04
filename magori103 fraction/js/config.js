
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAp4xtYhDcZPEsdC_ZlIYf_cGI3nF2TKXE",
    authDomain: "juelga-inventory-mangement.firebaseapp.com",
    databaseURL: "https://juelga-inventory-mangement-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "juelga-inventory-mangement",
    storageBucket: "juelga-inventory-mangement.appspot.com",
    messagingSenderId: "273045603480",
    appId: "1:273045603480:web:292e94052c58e7ddbcbced",
    measurementId: "G-WLFPPQPNCD"
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