addbusiness = document.getElementById('addbusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');

let searchstock = document.getElementById('searchstock');
let searchcode = document.getElementById('searchcode');
// get display holders
let lbstockname = document.getElementById('lbstockname');
let lbstockfullname = document.getElementById('lbstockfullname');
let lbstockcode = document.getElementById('lbstockcode');
let availableunits = document.getElementById('availableunits');
let createdby = document.getElementById('createdby');
let unitsinstock = document.getElementById('unitsinstock');
let lbclearby = document.getElementById('lbclearby');
let addproduct = document.getElementById('addproduct');

// write code here 
searchstock.addEventListener('click', () =>{
  let newsearchcode = searchcode.value;
  
  if (newsearchcode == "") {
    myAlert(warning, "Enter code to search")
  }else{
  let searchnode = "Mystock/"+ newsearchcode ;
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search code not found")
  }else{
    lbstockname.innerHTML = childData.StockName;
    lbstockfullname.innerHTML = childData.StockName;
    lbstockcode.innerHTML = childData.Code;
    availableunits.innerHTML = childData.UnitSale;
    createdby.innerHTML = childData.Createby;
    unitsinstock.value = childData.UnitSale;
    lbclearby.innerHTML = childData.ClearBy;

  }
  

});
}
})


 // Retrieve data from Firebase database category
      var selectcategory = document.getElementById("selectcategory");
      var ref = firebase.database().ref("Mycategory");
       selectcategory.innerHTML = "";
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var category = childData.Category;
           var option = document.createElement("option");
            option.text = category;
            option.value = category;
            selectcategory.add(option);
        });
      });

// insert new product

addproduct.addEventListener("click", () =>{
let productname = document.getElementById('productname').value.toUpperCase();
let productcode = document.getElementById('productcode').value;
let description = document.getElementById('description').value;
let buying = document.getElementById('buying').value;
let selling = document.getElementById('selling').value;
let unitstosale = document.getElementById('txtunittosale').value;
let clearby = document.getElementById('lbclearby').innerText;
var selecrcategory = document.getElementById("selectcategory");
var selectedcategoryOption = selecrcategory.value;
let stockcodeupdate = document.getElementById('lbstockcode').innerText;
let unitsinstock = document.getElementById('unitsinstock').value;
let stockref = document.getElementById('lbstockcode').innerText;

// validate data
 
 if (productname == "" || productcode == "" || buying == "" || selling == "" || unitstosale == "" || clearby == "" || selectedcategoryOption == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7;
   if (productname == "") {
      fillerror1 = " <br> Enter Product Name";
    }else{
      fillerror1 = "";
    }
    if (productcode == "") {
      fillerror2 = " <br> Enter product code";
    }else{
      fillerror2 = "";
    }
    if (buying == "") {
      fillerror3 = "<br>  Add buying price";
    }else{
      fillerror3 = "";
    }
    if (selling == "") {
      fillerror4 = "<br> Enter selling price";
    }else{
      fillerror4 = "";
    }
    if (unitstosale == "") {
      fillerror5 = "<br> Enter units to sale";
    }else{
      fillerror5 = "";
    }
    if (clearby == "") {
      fillerror6 = " <br> Clear date missing";
    }else{
      fillerror6 = "";
    }
    if (selectedcategoryOption == "") {
      fillerror7 = " <br> Category missing";
    }else{
      fillerror7 = "";
    }
  




  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 +  fillerror4 +  fillerror5 +  fillerror6 +  fillerror7;
  myAlert(warning, fillerror)

 }else{
  
  // insert data or write
    firebase.database().ref('Myproduct/' + productcode).set({

      ProductName: productname,
      Description: description,
      Code: productcode,
      Createby: email,
      DateAdded: datetoday,
      Buying: buying,
      Selling: selling,
      AvailableUnits: unitstosale,
      ClearBy: clearby,
      Category: selectedcategoryOption,
      StockCodeRef: stockref,
      Status: 1

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed add new Product");
     
  } else {
    // Data saved successfully!
    myAlert(success, "New product added ");
    
        /// update 
        firebase.database().ref('Mystock/' + stockcodeupdate).update({ 
          UnitSale: unitsinstock
           })
  .then(() => {
    myAlert(success, "Stock Updated  ");
  })
  .catch((error) => {
    console.error('Update failed on stock: ', error);
  });


    // Refresh the page after a delay of 3 seconds
    setTimeout(function(){
    location.reload();
     }, 3000); // 
 
  }
} );

 }

})


 // Retrieve data from Firebase database all product restricted number of items
      var table = document.getElementById("producttable");
      var ref = firebase.database().ref("Myproduct");
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
          var cell7 = row.insertCell(6)
          var newstatus;
          if (childData.Status == 1) {
            newstatus = "Active";
          }else{
            newstatus = "Not Active";
          }

          cell1.innerHTML = childData.ProductName;
          cell2.innerHTML = childData.Category;
          cell3.innerHTML = childData.Buying;
          cell4.innerHTML = childData.Selling;
          cell5.innerHTML = childData.Description;
          cell6.innerHTML = newstatus;
          cell7.innerHTML = childData.AvailableUnits;

        });
      });






// end off your code 
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