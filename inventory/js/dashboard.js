var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var thismonth,previousmonth,previousmonthcredit,thismonthcredit;
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
var businessdivcredit = 0;

// start of the code
let lbthismonthsale = document.getElementById('lbthismonthsale');
let lbcurrentmonth = document.getElementById('lbcurrentmonth');
let lbcurent = document.getElementById('lbcurent');
let lbprevios = document.getElementById('lbprevios');
let lbloancurent = document.getElementById('lbloancurent');
let lbloanprevios = document.getElementById('lbloanprevios');
let lbgrowth = document.getElementById('lbgrowth');
let lbgrowthcredit = document.getElementById('lbgrowthcredit');
let cardpreviousmonth = document.getElementById('cardpreviousmonth');
let cardcurrentmonth = document.getElementById('cardcurrentmonth');



/*=======================================*/ 
// get business details for newly logined in 
 // Retrieve data from Firebase database
var Bname,Baddress,Bphone,Bemail;
      var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
          Bname = childData.BusinessName;
          Bemail = childData.Email;
          Bphone = childData.Phone;
          Baddress = childData.Address;
            
             console.log(Bname + "Here");

          // Create an array to keep business data
          let myArray = [Bname, Bemail, Bphone, Baddress];

         // Convert the array to a string and store it in local storage
         localStorage.setItem('BusinessDetails', JSON.stringify(myArray));

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];
          
        });
      });







//displays 
lbprevios.innerHTML = previousMonthName + " / " + currentYear;
lbcurent.innerHTML = currentMonth + " / "  + currentYear;
lbloanprevios.innerHTML = previousMonthName + " / " + currentYear;
lbloancurent.innerHTML = currentMonth + " / "  + currentYear;
lbcurrentmonth.innerHTML = currentMonth + " / "  + currentYear;

// current month sales
 function getCurrentsales() {
  let innerthismonthsale = document.getElementById('innerthismonthsale');

  /*--------------------------------------*/
let thismonthsales = "Mymonthly/"+ currentMonth+currentYear ;
  // get the stock 
  var ref = firebase.database().ref(thismonthsales);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "No sales found")
  }else{
    lbthismonthsale.innerHTML = childData.TotalSale;
    innerthismonthsale.innerHTML = "Cash = " + childData.TotalSale;
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
   cardpreviousmonth.innerHTML = previousMonthName +" Sale = " + previousmonth;
   cardcurrentmonth.innerHTML =  currentMonth +" Sale = " + thismonth;
    //console.log(businessdiv);
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


  // get credit sales

    function getCurrentcreditsales() {
   let innerthismonthcredit = document.getElementById('innerthismonthcredit');
   let cardcurrentmonthcredit = document.getElementById('cardcurrentmonthcredit');
   let cardpreviousmonthcredit = document.getElementById('cardpreviousmonthcredit');
  /*--------------------------------------*/
let thismonthcreditsales = "Mymonthlycredit/"+ currentMonth+currentYear ;
  // get the stock 
  var ref = firebase.database().ref(thismonthcreditsales);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "No credit sales found")
  }else{
    innerthismonthcredit.innerHTML = "Credit = " + childData.TotalCredit;
    cardcurrentmonthcredit.innerHTML = currentMonth + " Credit = " + childData.TotalCredit;
    thismonthcredit = childData.TotalCredit;
    // get previous
    let previousmonthcreditsales = "Mymonthlycredit/"+ previousMonthName+currentYear ;
  // get the stock 
  var ref = firebase.database().ref(previousmonthcreditsales);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     cardpreviousmonthcredit.innerHTML = previousMonthName +" Credit = " + 0;
     //lbgrowth.innerHTML = "Up : " + '&#128316;'   + thismonth - 0;
     lbgrowthcredit.innerHTML = "Up : " + '&#128681;  ' + thismonthcredit;
  }else{
   
   cardpreviousmonthcredit.innerHTML = previousMonthName +" Credit = " + childData.TotalCredit;
   // calculate loan variation 
   previousmonthcredit = childData.TotalCredit;
   businessdivcredit = +thismonthcredit - +previousmonthcredit;
 
   if (businessdivcredit > 0) {
     
     lbgrowthcredit.innerHTML = "Up : " + '&#128681;  ' + businessdivcredit;
   }else{
    lbgrowthcredit.innerHTML = "Down : " + '&#128316;  ' + businessdivcredit;
   }
   
 
  }
  


});
  }
  

});
}

getCurrentcreditsales();


  function getAllCustomers() {
    // body...

    let customercounter = document.getElementById('customercounter');
    let lbcustomersonloan = document.getElementById('lbcustomersonloan');
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
  /*------------------------*/
var myCustomerloanRef = firebase.database().ref("Mycustomercredit");
  // get on loan
   var onloancount = 0;
// Retrieve the child nodes and check their values
myCustomerloanRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    // Check if the value of CustomerTotalCredit is greater than 1
    if (childData.CustomerTotalCredit > 1) {
      onloancount++;
    }
  });
  
  lbcustomersonloan.innerHTML = "On loan : " + onloancount;
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
        //check the role and open page
         
      const database = firebase.database();

// Function to find a staff member's role by email
function findStaffRoleByEmail(email) {
  const staffRef = database.ref('Mystaff');

  return staffRef.once('value')
    .then((snapshot) => {
      let role = null;
      snapshot.forEach((childSnapshot) => {
        const staffMember = childSnapshot.val();
        if (staffMember.Email === email) {
          role = staffMember.Role;
          return true; // Break the loop if the email is found
        }
      });
      return role;
    })
    .catch((error) => {
      //console.error('Error finding staff member role:', error);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      throw error;
    });
}

// Example usage:
const targetEmail = email; // The email to search for

findStaffRoleByEmail(targetEmail)
  .then((role) => {
    if (role) {
       // open pages accodingly
      console.log(role);
      if (role == "Admin") {
       // window.location.href='dashboard.html';
        usernamedisplay.innerHTML = email;
      }
      if (role == "Cashier") {

       window.location.href='../cashier/saledesk.html';
      }
      if (role == "SalesLead") {
        window.location.href='../sales/saledesk.html';
      }

    } else {
      //console.log('Staff member not found with email:', targetEmail);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      // Handle the case when the staff member is not found
    }
  })
  .catch((error) => {
    // Handle the error
  });
  
  
      }else{
        //myAlert("No Active user");
      }
    })




// hide tabs cashier
   function hideElementsByClassName(className) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
   console.log(i);
  }
}