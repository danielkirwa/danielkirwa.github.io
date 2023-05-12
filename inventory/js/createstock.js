addstock = document.getElementById('addstock');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
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
var selectedUnitOption = selectunit.value;



// validate data
 
 if (stockname == "" || code == "" || description == "" || unitcount == "" || selectedUnitOption == "" || unitsale == "" || clearby == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7;
   if (stockname == "") {
      fillerror1 = " Enter stock name";
    }else{
      fillerror1 = "";
    }
    if (code == "") {
      fillerror2 = " Enter code";
    }else{
      fillerror2 = "";
    }
    if (description == "") {
      fillerror3 = " Add description";
    }else{
      fillerror3 = "";
    }
    if (unitcount == "") {
      fillerror4 = " Enter count";
    }else{
      fillerror4 = "";
    }
    if (selectedUnitOption == "") {
      fillerror5 = " Select Units measure";
    }else{
      fillerror5 = "";
    }
    if (unitsale == "") {
      fillerror6 = " Enter units available for sale";
    }else{
      fillerror6 = "";
    }
    if (clearby == "") {
      fillerror7 = " Enter expected date to clear the stock";
    }else{
      fillerror7 = "";
    }

  




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5 +  fillerror6 +  fillerror7;
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
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new Stock");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New Stock added ready to  create product out of stock");
    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
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
        window.location.href='index.html';
      }
    })