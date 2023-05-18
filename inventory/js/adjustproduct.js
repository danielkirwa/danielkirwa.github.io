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
let openstockforproduct = document.getElementById('openstockforproduct');
// get display holders
let lbproductname = document.getElementById('lbproductkname');
let lbstockfullname = document.getElementById('lbstockfullname');
let lbstockcode = document.getElementById('lbstockcode');
let productavailableunits = document.getElementById('productavailableunits');
let availableunits = document.getElementById('availableunits');
let createdby = document.getElementById('createdby');
let unitsinstock = document.getElementById('unitsinstock');
let lbclearby = document.getElementById('lbclearby');
let updatedproduct = document.getElementById('updatedproduct');
let buyingprice = document.getElementById('buyingprice');
let sellingprice = document.getElementById('sellingprice');
let lbproductcode = document.getElementById('lbproductcode');
let stockcleardate = document.getElementById('stockcleardate');
let lbstockname = document.getElementById('lbstockname');
let lbnewstockcode = document.getElementById('lbnewstockcode');
let lbnewstockname = document.getElementById('lbnewstockname');
let btndeleteproduct = document.getElementById('btndeleteproduct');

// write code here 
searchstock.addEventListener('click', () =>{
  let newsearchcode = searchcode.value;
   let selling = document.getElementById('selling');
  if (newsearchcode == "") {
    myAlert(warning, "Enter code to search")
  }else{
  let searchnode = "Myproduct/"+ newsearchcode ;
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search code not found")
  }else{
    lbproductname.innerHTML = childData.ProductName;
    lbstockfullname.innerHTML = childData.Category;
    lbstockcode.innerHTML = childData.StockCodeRef;
    lbproductcode.innerHTML = childData.Code;
    stockavailableunits.innerHTML = childData.AvailableUnits;
    buyingprice.innerHTML = childData.Buying;
    sellingprice.innerHTML = childData.Selling;
    lbclearby.innerHTML = childData.ClearBy;
    selling.value = childData.Selling;

  }
  

});
}
})


// insert new product

updatedproduct.addEventListener("click", () =>{
let selling = document.getElementById('selling').value;
let unitstosale = document.getElementById('txtunittosale').value;
let unitsinstock = document.getElementById('unitsinstock').value;
let producttoupdate = lbproductcode.innerHTML;
let clearby = lbclearby.innerHTML;
let stocktoupdate = lbstockcode.innerHTML;
let existingunits = stockavailableunits.innerHTML 
// validate data
 
 if (selling == "" || unitstosale == "" || unitsinstock == "" || producttoupdate == "" || clearby == "" || stocktoupdate == "" || existingunits == "") {
  let fillerror,fillerror1,fillerror2,fillerror3,fillerror4,fillerror5,fillerror6,fillerror7;
   if (selling == "") {
      fillerror1 = " <br> Missing selling price";
    }else{
      fillerror1 = "";
    }
    if (unitstosale == "") {
      fillerror2 = " <br> Missing units to sale";
    }else{
      fillerror2 = "";
    }
    if (unitsinstock == "") {
      fillerror3 = "<br>  Missing units in stock <b> You can open stock </b>";
    }else{
      fillerror3 = "";
    }
    if (producttoupdate == "") {
      fillerror4 = "<br>  Product code Missing";
    }else{
      fillerror4 = "";
    }
    if (clearby == "") {
      fillerror5 = "<br>  Missing clear date";
    }else{
      fillerror5 = "";
    }
    if (stocktoupdate == "") {
      fillerror6 = "<br>  No Stock selected";
    }else{
      fillerror6 = "";
    }
     if (existingunits == "") {
      fillerror7 = "<br>  Error No Existing Units";
    }else{
      fillerror7 = "";
    }
   
   
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2 +  fillerror3 + fillerror4 + fillerror5 + fillerror6 + fillerror7;
  myAlert(warning, fillerror)

 }else{
  
  // insert data or write
    firebase.database().ref('Myproduct/' + producttoupdate).update({

      Selling: selling,
      AvailableUnits: +unitstosale + +existingunits,
      ClearBy: clearby

    },  (error) => {
  if (error) {
    // The write failed...
     myAlert(failed, "Failed To Update Product");
     
  } else {
    // Data saved successfully!
    myAlert(success, "Product Update  ");
    
        /// update 
        firebase.database().ref('Mystock/' + stocktoupdate).update({ 
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

 openstockforproduct.addEventListener("click", () => {
  let newstockcode = lbstockcode.innerHTML;
  let unitsinstock = document.getElementById('unitsinstock');   
      if (newstockcode == "") {
    myAlert(warning, "Enter code to search")
  }else{
  let searchnode = "Mystock/"+ newstockcode ;
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search code not found")
  }else{
    unitsinstock.value = childData.UnitSale;
    availableunits.innerHTML = childData.UnitSale;
    lbclearby.innerHTML = childData.ClearBy;
    lbnewstockname.innerHTML = childData.StockName;
    lbnewstockcode.innerHTML = childData.Code;

  }
  

});
}

 })

// delete product here

btndeleteproduct.addEventListener("click" , () =>{

   myAlert(success, "Ready to delete")
})




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