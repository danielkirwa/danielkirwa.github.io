clearstock = document.getElementById('clearstock');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
let suppliername = document.getElementById('Supplierselected');
var email
var selectedsuppliername;
var selectedsuppliercode;
var totalcost = 0;
// write code here 

// get labels 
  let lbstockname = document.getElementById('lbstockname');
 let lbcreatedby = document.getElementById('lbcreatedby');
 let lbdateadded = document.getElementById('lbdateadded');
 let lbquantity = document.getElementById('lbquantity');
 let lbunits = document.getElementById('lbunits');
  let lbdescription = document.getElementById('lbdescription');
 let lbamount = document.getElementById('lbamount');
 let lbpaid = document.getElementById('lbpaid');
 let lbbalance = document.getElementById('lbbalance');
 let lbstockcode = document.getElementById('lbstockcode');
 let lbnewbalance = document.getElementById('lbnewbalance');
 let txtamounttorepay = document.getElementById('txtamounttorepay');


// get all supplier details  
  selectedsuppliername = suppliername.options[suppliername.selectedIndex].value;
selectedsuppliercode = suppliername.options[suppliername.selectedIndex].id;
  suppliername.addEventListener("change", function(){ 
selectedsuppliername = suppliername.options[suppliername.selectedIndex].value;
selectedsuppliercode = suppliername.options[suppliername.selectedIndex].id;

 console.log(selectedsuppliercode)
// console.log(selectedsuppliername)


          let searchnode = "Mycreditstock/"+ selectedsuppliercode ;
                var ref = firebase.database().ref(searchnode);
            ref.once('value').then(function(snapshot) {
            var childData = snapshot.val();
            if (childData == null) {
                myAlert(failed, "Search ID Number not found");
            }else{
              totalcost = childData.AcquisitionPrice;
              lbstockname.innerHTML = childData.StockName;
              lbcreatedby.innerHTML = childData.Createby;
              lbdateadded.innerHTML = childData.DateAdded;
              lbquantity.innerHTML = childData.UnitSale;
              lbunits.innerHTML = childData.Unit;
              lbdescription.innerHTML = childData.Description;
              lbamount.innerHTML = childData.AcquisitionPrice;
              lbpaid.innerHTML = childData.RepaidAmount
              lbbalance.innerHTML = childData.Balance;
              lbstockcode.innerHTML = childData.Code;
        }

         })



});




// selected all data 


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







// only numbers 

 function restrictToNumbers(inputField) {
    inputField.addEventListener("input", function() {
      let inputValue = inputField.value;
      inputValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
      inputField.value = inputValue;
      lbnewbalance.innerHTML = totalcost - inputValue;

      if ((totalcost - inputValue) < 0 ) {
        myAlert(warning, "Amounr exceeds");
        inputField.value = "";
      }
   
    });
  }


// // select only active supplier

var ref = firebase.database().ref("Mycreditstock");
suppliername.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select Supplier";
optiondefault.value = "Select Supplier";
optiondefault.id = "";
suppliername.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var name = childData.SupplierName;
    var id = childData.Code;
    var stock = childData.StockName;
    var balance = childData.Balance;
    //console.log(balance)
    
    //default
    
    if (balance >= 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = name + " / " + stock ;
      option.value = name;
      option.id = id;
      suppliername.add(option);
    }else{
   
    }
  });
});


// get data to update 
var idtoupdate;
var amounttoupdate;
var newbalance;
clearstock.addEventListener('click', () => {
   idtoupdate = lbstockcode.innerText;
   amounttoupdate = txtamounttorepay.value;
   if (amounttoupdate == "") {
    myAlert(warning, "Enter amount to clear");
   }else{
   newbalance = totalcost - amounttoupdate;
   // update payments now

     let searchednode = "Mycreditstock/"+ selectedsuppliercode ;
        firebase.database().ref(searchednode).update({

       RepaidAmount: firebase.database.ServerValue.increment(+amounttoupdate),
       Balance: newbalance    
   
      }).then(() => {
       myAlertRefresh(success, "Stock taken on credit updated");
  })
  .catch((error) => {
     myAlert(failed, "Failed to update the payment details");
  });


 }
})


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