addstock = document.getElementById('addstock');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
let suppliername = document.getElementById('suppliername');
var email
// write code here 

addstock.addEventListener("click", () =>{
let stockname = document.getElementById('stockname').value.toUpperCase();
let code = document.getElementById('code').value.toUpperCase();
let description = document.getElementById('description').value;
let unitcount = document.getElementById('unitcount');
let unitsale = document.getElementById('unitsale').value;
let clearby = document.getElementById('clearby').value;
var selectunit = document.getElementById("unit");
let acquisitionprice = document.getElementById('acquisitionprice').value
var selectedUnitOption = selectunit.value;
var selctedmode = document.getElementById('acquisitionmode');
var acquisitionmode = selctedmode.value;



// validate data
 
 if (stockname == "" || code == "" || description == "" || unitcount == "" || selectedUnitOption == "" || unitsale == "" || clearby == "" || acquisitionmode == "" || acquisitionprice == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7,fillerror8,fillerror9;
   if (stockname == "") {
      fillerror1 = "<br> Enter stock name";
    }else{
      fillerror1 = "";
    }
    if (code == "") {
      fillerror2 = "<br> Enter code";
    }else{
      fillerror2 = "";
    }
    if (description == "") {
      fillerror3 = "<br> Add description";
    }else{
      fillerror3 = "";
    }
    if (unitcount == "") {
      fillerror4 = "<br> Enter count";
    }else{
      fillerror4 = "";
    }
    if (selectedUnitOption == "") {
      fillerror5 = "<br> Select Units measure";
    }else{
      fillerror5 = "";
    }
    if (unitsale == "") {
      fillerror6 = "<br> Enter units available for sale";
    }else{
      fillerror6 = "";
    }
    if (clearby == "") {
      fillerror7 = "<br> Enter expected date to clear the stock";
    }else{
      fillerror7 = "";
    }
    if (acquisitionmode == "") {
      fillerror8 = "<br> Select mode of acquisition"
    }else{
       fillerror8 = "";
       
    }
    if (acquisitionprice == "") {
      fillerror9 = "<br> Enter stock worth"
    }else{
       fillerror9 = "";
      
    }

  




  fillerror = ' <b> Fill in the following : </b>  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5 +  fillerror6 +  fillerror7 + fillerror8 + fillerror9;
  myAlert(warning, fillerror)

 }else{
  
  // insert data or write
    firebase.database().ref('Mystock/' + code).set({

      StockName: stockname,
      Unitcount: unitcount,
      Description: description,
      Code: code,
      Createby: email,
      DateAdded: datetoday,
      Unit: selectedUnitOption,
      ClearBy: clearby,
      UnitSale: unitsale,
      AcquisitionMode: "AllCashed",
      AcquisitionPrice: acquisitionprice,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new Stock");
     
  } else {
    // Data saved successfully!
       // update worth
    console.log(acquisitionmode + acquisitionprice);
    if (acquisitionmode == "Cash") {

         let stockWorth = "StockWorth/Cash";
         firebase.database().ref(stockWorth).update({
           TotalCashWorth: firebase.database.ServerValue.increment(parseFloat(acquisitionprice))
         })
         .then(() => {
           // Success
          myAlertRefresh(success, "Stock added success")
         })
         .catch((error) => {
           myAlert(failed, "Cumulative worth not saved");
         });

   
    }else{
      let stockWorth = "StockWorth/Credit";
              firebase.database().ref(stockWorth).update({

             TotalCreditWorth: firebase.database.ServerValue.increment(parseFloat(acquisitionprice))       
   
            }).then(() => {

              // save credit stock for refrence and clearance later 
              firebase.database().ref('Mycreditstock/' + code).set({

      StockName: stockname,
      Unitcount: unitcount,
      Description: description,
      Code: code,
      Createby: email,
      DateAdded: datetoday,
      Unit: selectedUnitOption,
      ClearBy: clearby,
      UnitSale: unitsale,
      AcquisitionMode: "Credit",
      AcquisitionPrice: acquisitionprice,
      RepaidAmount: 0,
      Balance: acquisitionprice,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new Stock");
     
  } else {

       myAlertRefresh(success, "Stock added success")

  }
}
  );
   
        })
        .catch((error) => {
           myAlert(failed, "Cummulative worth not saved");
        });

    }
  }
} );

 }

})



// selected all data 

 // Retrieve data from Firebase database
      var table = document.getElementById("stocktable");
      var ref = firebase.database().ref("Mystock");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
             var newstatus;
          if (childData.Status == 1) {
            newstatus = "Active";
          }else{
            newstatus = "Not Active";
          }

          cell1.innerHTML = childData.StockName;
          cell2.innerHTML = childData.UnitSale;
          cell3.innerHTML = childData.Code;
          cell4.innerHTML = childData.Unit;
          cell5.innerHTML = childData.ClearBy;
          cell6.innerHTML = newstatus;
        });
      });



 // Retrieve data from Firebase database units
      var selectcategory = document.getElementById("unit");
      var ref = firebase.database().ref("Myunits");
       selectcategory.innerHTML = "";
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var unit = childData.Unit;
          var abbreviation = childData.Abbreviation;
           var option = document.createElement("option");
            option.text = unit;
            option.value = abbreviation;
            selectcategory.add(option);
        });
      });


// only numbers 

 function restrictToNumbers(inputField) {
    inputField.addEventListener("input", function() {
      let inputValue = inputField.value;
      inputValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
      inputField.value = inputValue;
    });
  }


// // select only active supplier

var ref = firebase.database().ref("Mysupplier");
suppliername.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "General Supply";
optiondefault.value = "General Supply";
optiondefault.id = "GS001";
suppliername.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var name = childData.FirstName;
    var id = childData.IDNumber;
    var currentstatus = childData.Status;
    
    //default
    
      
    
    if (currentstatus >= 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = name;
      option.value = name;
      option.id = id;
      suppliername.add(option);
    }
  });
});


// off your code 
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



function myAlertRefresh(title,message) {
  var alertBox = document.getElementById("alertBoxRefresh");
  var alertTitle = document.getElementById("alertTitle1");
  var alertMessage = document.getElementById("alertMessage1");
  
  alertTitle.innerHTML = title;
  alertMessage.innerHTML = message;
  alertBox.style.display = "block";
}

function hideAlertRefresh() {
  var alertBox = document.getElementById("alertBoxRefresh");
  alertBox.style.display = "none";
  location.reload();
}

/// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];



auth.onAuthStateChanged(function(user){
      if(user){
         email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })