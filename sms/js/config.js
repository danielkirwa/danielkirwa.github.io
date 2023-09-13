
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