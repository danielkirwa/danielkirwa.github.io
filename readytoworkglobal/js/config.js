const firebaseConfig = {
  apiKey: "AIzaSyDi-CippQQy7CxaqBuPuxFd__rDY9taQT4",
  authDomain: "readytowork-7e43e.firebaseapp.com",
  databaseURL: "https://readytowork-7e43e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "readytowork-7e43e",
  storageBucket: "readytowork-7e43e.appspot.com",
  messagingSenderId: "424775995700",
  appId: "1:424775995700:web:8e6679ab348d744099d561",
  measurementId: "G-RKX42RWMTP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 // Auth reference
     const auth = firebase.auth();
    // Database reference
    const db = firebase.database();
  console.log("Firebase initialized with v8 style!");

