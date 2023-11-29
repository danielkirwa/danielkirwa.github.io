addstock = document.getElementById('addstock');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
let suppliername = document.getElementById('suppliername');
let storename = document.getElementById('storename');
var email
var selectedsuppliername = "General Supply";
var selectedsuppliercode = "GS001";
var selectedstorename = "";
var selectedstorecode = "";
let viewselectedstore = document.getElementById('viewselectedstore');
let viewselectedstorelocation = document.getElementById('viewselectedstorelocation');
let code;
// write code here 


// get all supplier details  
  selectedsuppliername = suppliername.options[suppliername.selectedIndex].value;
selectedsuppliercode = suppliername.options[suppliername.selectedIndex].id;
  suppliername.addEventListener("change", function(){ 
selectedsuppliername = suppliername.options[suppliername.selectedIndex].value;
selectedsuppliercode = suppliername.options[suppliername.selectedIndex].id;

console.log(selectedsuppliercode)
console.log(selectedsuppliername)

});


  // get all store details  
  selectedstorename = storename.options[storename.selectedIndex].value;
selectedstorecode = storename.options[storename.selectedIndex].id;
  storename.addEventListener("change", function(){ 
     newvaluecode = document.getElementById('code');
  code = document.getElementById('code').value.toUpperCase();
   console.log(code);

selectedstorename = storename.options[storename.selectedIndex].value;
selectedstorecode = storename.options[storename.selectedIndex].id;
  code = code + "-" + selectedstorecode;

   

viewselectedstore.innerHTML = selectedstorename;
viewselectedstorelocation.innerHTML = selectedstorecode;
console.log(code);
newvaluecode.value = code;
});


addstock.addEventListener("click", () =>{
let stockname = document.getElementById('stockname').value.toUpperCase();
code = document.getElementById('code').value.toUpperCase();
let description = document.getElementById('description').value;
let unitcount = document.getElementById('unitcount');
let unitsale = document.getElementById('unitsale').value;
let clearby = document.getElementById('clearby').value;
var selectunit = document.getElementById("unit");
var selectedUnitOption = selectunit.value;
var selctedstorename = document.getElementById('storename');
var storename = selctedstorename.value;




// validate data
 
 if (stockname == "" || code == "" || description == "" || unitcount == "" || selectedUnitOption == "" || unitsale == "" || clearby == "" || storename == "") {
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
    if (storename == "") {
      fillerror8 = "<br> Select Store Name"
    }else{
       fillerror8 = "";
       console.log(selectedstorename);
       console.log(selectedstorecode);
    }
    

  




  fillerror = ' <b> Fill in the following : </b>  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5 +  fillerror6 +  fillerror7 + fillerror8;
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
      SupplierName: selectedsuppliername,
      SupplierCode: selectedsuppliercode,
      ClearBy: clearby,
      UnitSale: unitsale,
      StoreName: selectedstorename,
      StoreCode: selectedstorecode,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new Stock");
     
  } else {
    // Data saved successfully!
     myAlertRefresh(success, "Stock added success")
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


      // Retrieve data from Firebase database for credit
      var tablecredit = document.getElementById("stocktablecredit");
      var ref = firebase.database().ref("Mycreditstock");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var row = tablecredit.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
           
          if (childData.Status == 1) {
              cell1.innerHTML = childData.StockName;
              cell2.innerHTML = childData.UnitSale;
              cell3.innerHTML = childData.Code;
              cell4.innerHTML = childData.Unit;
              cell5.innerHTML = childData.SupplierName;
              cell6.innerHTML = childData.AcquisitionPrice;
              cell7.innerHTML = childData.RepaidAmount;
              cell8.innerHTML = childData.Balance;
              
          }else{
            
          }

          
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
    
      
    
    if (currentstatus == 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = name;
      option.value = name;
      option.id = id;
      suppliername.add(option);
    }
  });
});




// // select only active store

var ref = firebase.database().ref("Mybusiness");
storename.innerHTML = "";
var optiondefaultstore = document.createElement("option");
optiondefaultstore.text = "Select Store here";
optiondefaultstore.value = "";
optiondefaultstore.id = "";
storename.add(optiondefaultstore);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var name = childData.StoreName;
    var id = childData.StoreCode;
    var currentstatus = childData.OpeningStatus;
    
    //default
    
      
    
    if (currentstatus == "Active") { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = name;
      option.value = name;
      option.id = id;
      storename.add(option);
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