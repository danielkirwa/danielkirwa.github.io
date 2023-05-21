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
var businessdiv = 0;

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
 function getCurrentsales() {
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
     lbgrowth.innerHTML = "Up : " + '&#128316;'   + thismonth - 0;
  }else{
    previousmonth = childData.TotalSale
   businessdiv = +thismonth - +previousmonth;
   console.log(businessdiv);
   if (businessdiv > 0) {
     lbgrowth.innerHTML = "Up : " + '&#128316;  ' + businessdiv;
   }else{
    lbgrowth.innerHTML = "Down : " + '&#128681;  ' + businessdiv;
   }
 
  }
  


});
  }
  

});
}
 getCurrentsales();


  function getAllCustomers() {
    // body...

    let customercounter = document.getElementById('customercounter');
    // Get a reference to the "Mycustomer" node
var myCustomerRef = firebase.database().ref("Mycustomer");

// Retrieve the data once
myCustomerRef.once("value")
  .then(function(snapshot) {
    // Get the child count
    var childCount = snapshot.numChildren();
     customercounter.innerHTML = childCount;
  })
  .catch(function(error) {
    myAlert(failed, "Can not get the customers in your business")
  });
  }
getAllCustomers();


// get all products having less units in stock
function allProducttoDepleted() {
  // body...
   var table = document.getElementById("outofstocktable");
  var myProductRef = firebase.database().ref("Myproduct");

// Create a query to select child nodes with quantity less than 20
var query = myProductRef.orderByChild("AvailableUnits").endAt(20);

// Retrieve the filtered data
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Access the child node data
      var childData = childSnapshot.val();
       var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var state;
          if (childData.AvailableUnits >= 1) {
            state = childData.AvailableUnits;
          }else{
            state = "Out of stock";
          }

          cell1.innerHTML = childData.ProductName;
          cell2.innerHTML = childData.Code;
          cell3.innerHTML = childData.StockCodeRef;
          cell4.innerHTML = state;




    });
  })
  .catch(function(error) {
    console.error("Error retrieving data:", error);
  });

}
allProducttoDepleted();

// get all products  that are almost expiring 
 function allProducttoExpiry() {
   // body...
   var table = document.getElementById("expirytable");
    
    var myProductRef = firebase.database().ref("Myproduct");
// Calculate the date for 30 days from now
var currentDate = new Date();
var expirationDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
var expirationDateString = expirationDate.toISOString().split("T")[0];

// Create a query to select child nodes with expiration dates less than 30 days from now
var query = myProductRef.orderByChild("ClearBy").endAt(expirationDateString);

// Retrieve the filtered data
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Access the child node data
      var childData = childSnapshot.val();
       
       var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var state;
          if (childData.ClearBy >= 1) {
            state = childData.ClearBy;
          }else{
            state = childData.ClearBy;
          }

          cell1.innerHTML = childData.ProductName;
          cell2.innerHTML = childData.Code;
          cell3.innerHTML = childData.StockCodeRef;
          cell4.innerHTML = state;
      


    });
  })
  .catch(function(error) {
    console.error("Error retrieving data:", error);
  });


 }
 allProducttoExpiry()


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