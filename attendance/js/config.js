const firebaseConfig = {
  apiKey: "AIzaSyBsLv0c5B5AmowbHj09Dn61cWev5co0sRE",
  authDomain: "attendance-c50bd.firebaseapp.com",
  databaseURL: "https://attendance-c50bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attendance-c50bd",
  storageBucket: "attendance-c50bd.firebasestorage.app",
  messagingSenderId: "299624767526",
  appId: "1:299624767526:web:0d5bb122aebd6f420486e7",
  measurementId: "G-2DK57MZCPE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

console.log ('connected to firebase')