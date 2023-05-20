var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var thismonth,previousmonth;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();

// get prevous month 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const previousMonthIndex = currentDate.getMonth() - 1;
const previousMonthName = months[previousMonthIndex];

// start of the code
let lbthismonthsale = document.getElementById('lbthismonthsale');
let lbcurrentmonth = document.getElementById('lbcurrentmonth');
let lbcurent = document.getElementById('lbcurent');
let lbprevios = document.getElementById('lbprevios');
let lbgrowth = document.getElementById('lbgrowth');




//displays 
lbprevios.innerHTML = previousMonthName + " / " + currentYear;
lbcurent.innerHTML = currentMonth + " / "  + currentYear;
lbcurrentmonth.innerHTML = currentMonth + " / "  + currentYear;

// current month sales
 function getCurrent() {
let thismonthsales = "Mymonthly/"+ currentMonth+currentYear ;
  // get the stock 
  var ref = firebase.database().ref(thismonthsales);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "No sales found")
  }else{
    lbthismonthsale.innerHTML = childData.TotalSale;
    thismonth = childData.TotalSale;
    // get previous
    let previousmonthsales = "Mymonthly/"+ previousMonthName+currentYear ;
  // get the stock 
  var ref = firebase.database().ref(previousmonthsales);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "No sales found")
     lbgrowth.innerHTML = thismonth - 0;
  }else{

   previousmonth = childData.TotalSale;
   lbgrowth.innerHTML = thismonth - previousmonth;

  }
  


});
  }
  

});
}




 getCurrent();

// end of the code
// alert 

function myAlert(title,message) {
  var alertBox = document.getElementById("alertBox");
  var alertTitle = document.getElementById("alertTitle");
  var alertMessage = document.getElementById("alertMessage");
  
  alertTitle.innerHTML = title;
  alertMessage.innerHTML = message;
  alertBox.style.display = "block";
}

function hideAlert() {
  var alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none";
}
 /// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];



auth.onAuthStateChanged(function(user){
      if(user){
        var email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='index.html';
      }
    })