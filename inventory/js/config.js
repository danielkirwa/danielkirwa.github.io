
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAp4xtYhDcZPEsdC_ZlIYf_cGI3nF2TKXE",
    authDomain: "juelga-inventory-mangement.firebaseapp.com",
    projectId: "juelga-inventory-mangement",
    storageBucket: "juelga-inventory-mangement.appspot.com",
    messagingSenderId: "273045603480",
    appId: "1:273045603480:web:292e94052c58e7ddbcbced",
    measurementId: "G-WLFPPQPNCD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
