var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();

//start of code
let discountopholder = document.getElementById('discountopholder');
let tbldiscount = document.getElementById('tbldiscount');
let itemnumber  = document.getElementById('itemnumber');

let newselectcount = document.getElementById('newselectcount');
let itemselected = document.getElementById('Itemselected');
let newselectitem = document.getElementById('newselectitem');
let newselectprice = document.getElementById('newselectprice');
let newselectcode = document.getElementById('newselectcode');
let txtnewselectitem = document.getElementById('txtnewselectitem');
let txtnewselectprice = document.getElementById('txtnewselectprice');
let txtnewselectedcode = document.getElementById('txtnewselectedcode');
let itemcounter = document.getElementById('itemcounter');
let btnaddtorecipt = document.getElementById('btnaddtorecipt');
let snolabel = document.getElementById('snolabel');
let priceholder = document.getElementById('priceholder');
let tblpriceholder = document.getElementById('tblpriceholder');
let tblgrandpriceholder = document.getElementById('tblgrandpriceholder');
var count;
var item 
var customercheck = "R [] , M []";
var customercheckbusiness;
var removeditem = 0;
var grandamount = 0;
var recieptitems = 0
var grandamountbuying = 0;
var discountgiven = 0;
var producttocodeupdate;
var availableproductunittoupdate;
var newavailableproductunittoupdate;
var selectedbuyingprice = 0;
var fraction = 0.0;
var price;
discountgiven = localStorage.getItem('Discount');


  // buttons 
 let btnaddfraction = document.getElementById('btnaddfraction');
 let btnsubfraction = document.getElementById('btnsubfraction');



/*=======================================*/ 
// get business details for newly logined in 
 // Retrieve data from Firebase database
var Bname,Baddress,Bphone,Bemail,Bregion,Btown;
      var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
          Bname = childData.BusinessName;
          Bemail = childData.Email;
          Bphone = childData.Phone;
          Baddress = childData.Address;
          Bregion = childData.Region;
          Btown = childData.Town;
            
             console.log(Bname + "Here");

          // Create an array to keep business data
          let myArray = [Bname, Bemail, Bphone, Baddress,Bregion,Btown];

         // Convert the array to a string and store it in local storage
         localStorage.setItem('BusinessDetails', JSON.stringify(myArray));

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];
          
        });
      });


// update counter by adding quantity

// new coding done here

// get cashier
function getAllCashier() {
  // body... gets all users 
    var ref = firebase.database().ref("Mystaff");
allcashiers.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select staff/Store staff";
optiondefault.value = "null";
optiondefault.id = "";
allcashiers.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var cashiername = childData.Email;
  
      var option = document.createElement("option");
      option.text = cashiername;
      option.value = cashiername;
      allcashiers.add(option);
    
  });
});
}
getAllCashier();
// get all item more than 1
var ref = firebase.database().ref("Mystock");
itemselected.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select Item Name";
optiondefault.value = "Select Item Name";
optiondefault.id = "";
itemselected.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var product = childData.StockName;
    var storename = childData.StoreName;
    var code = childData.Code;
    var available = childData.UnitSale;
    var storecode = childData.StoreCode;
    
    if (available >= 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = product;
      option.value = storename;
      option.id = code;
      option.data = available;
      option.dataBuying = storecode;
      itemselected.add(option);
    }
  });
});

// load deatils of selected item


function updateValue(e) {
  price = Itemselected.options[Itemselected.selectedIndex].value;
  count = e.target.value;

  if (count < 1) {
    itemcounter.value = 1;
    newselectcount.innerHTML = "Count :" + count;
    newavailableproductunittoupdate = availableproductunittoupdate - count;
  } else {
    newavailableproductunittoupdate = availableproductunittoupdate - count;
    //console.log(newavailableproductunittoupdate);
    if (newavailableproductunittoupdate == 0) {
      newavailableproductunittoupdate = newavailableproductunittoupdate;
      myAlert(warning, "All items have been sold. No more items available for sale. <br> <b> Click add to reciept to sale selected item </b>");
      itemcounter.disabled = true;
      newselectcount.innerHTML = "Count :" + count;

    } else {
      newselectcount.innerHTML = "Count :" + count;

    }
  }
}

 // add or subtract fraction 

btnaddfraction.addEventListener('click', () =>{

  count = +count + +0.25;
 console.log(count);
 itemcounter.value = count;
newselectcount.innerHTML = "Count :" + count;
 

} )
btnsubfraction.addEventListener('click', () =>{
  if (count === undefined || isNaN(parseFloat(count))) {
    myAlert(warning, "No Item selected");
  }else{
  count = +count - +0.25
  itemcounter.value = count;
  newselectcount.innerHTML = "Count :" + count;
  
  if (count < 0.25) {
    count = 0.25;
    myAlert(warning, "Reach minimum fraction");
    itemcounter.value = count;
    newselectcount.innerHTML = "Count :" + count;
    
  }
 
}
} )


// for local storage 


let recieptitemsarray = [];
let storedArray = [];
let recieptitemsarraybuying = [];
let storedArraybuying = [];

itemselected.addEventListener("change", function(){ 
item = Itemselected.options[Itemselected.selectedIndex].text;
var thestore = Itemselected.options[Itemselected.selectedIndex].value;
producttocodeupdate = Itemselected.options[Itemselected.selectedIndex].id;
availableproductunittoupdate = Itemselected.options[Itemselected.selectedIndex].data;
  newselectitem.innerHTML=  "Item. " +item;
  newselectprice.innerHTML= "Store. " +thestore;
  newselectcode.innerHTML = "Code. " + producttocodeupdate;
  txtnewselectitem.value =  "" +item;
  txtnewselectprice.value = "" +thestore;
  txtnewselectedcode.value = "" + producttocodeupdate;
  //itemcounter.value = 1;
  count = 1;
  newavailableproductunittoupdate = availableproductunittoupdate - 1;
  //console.log(newavailableproductunittoupdate);
  newselectcount.innerHTML = "Count :" + count;


});

itemcounter.addEventListener("input", updateValue);

// add items to reciept
btnaddtorecipt.addEventListener('click', () =>{
  if (count >= 0.25) {
  itemcounter.value = 1;
  newselectitem.innerHTML=  "Item. ";
  newselectprice.innerHTML= "Store. ";
  newselectcode.innerHTML = "Code. ";
  newselectcount.innerHTML = "Count. ";
var item = Itemselected.options[Itemselected.selectedIndex].text;
var thestore = Itemselected.options[Itemselected.selectedIndex].value;
var code = Itemselected.options[Itemselected.selectedIndex].id;
let remover = '<button class="remove-btn" onclick="removeRow(this)">X</button>';
 recieptitemsarray = storedArray;

 //console.log(recieptitemsarray);
   // push to an array
 let newitemtoreciept = [item,code, count, customercheck,remover];

 recieptitemsarray.push(newitemtoreciept);
let storedreciept = JSON.stringify(recieptitemsarray);
localStorage.setItem('curentreciept', storedreciept);
// update stock

/// update 
        firebase.database().ref('Mystock/' + code + '/UnitSale').transaction(function(UnitSale) {
  if (UnitSale === null) {
    return 0; // If the value doesn't exist, set it to 1
   // location.reload();
  } else {
    return UnitSale - count; // Increment the value by 1
    //location.reload();
  }
});

location.reload();


}else{
  alert("Select new item to add ");
}
  
})







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
// alert refresh 

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

onreloadshowitems();
function onreloadshowitems(argument) {
  // body...
  let storeditems = localStorage.getItem('curentreciept');
  let storedbuyingprices = localStorage.getItem('curentbuying');
  discountgiven = localStorage.getItem('Discount');
  // do discount back zero 
  if (storeditems == null || storedbuyingprices == null) {
     
  }else{
// Convert the array string back to an array using JSON.parse()
 storedArray = JSON.parse(storeditems);
 storedArraybuying = JSON.parse(storedbuyingprices);

// Get the table body element
let tableBody = document.getElementById('recieptbody');

// Clear any existing rows in the table
tableBody.innerHTML = '';

// Iterate over the array and create table rows
storedArray.forEach(function(innerArray) {
  let row = document.createElement('tr');
  
  innerArray.forEach(function(element) {
    let cell = document.createElement('td');
    cell.innerHTML = element;
    row.appendChild(cell);

  });
 
  tableBody.appendChild(row);
});
 recieptitems = storedArray.reduce((a, b) => a + +b[2],0);

  snolabel.innerHTML = recieptitems.toLocaleString();
}


}

// delete item from reciept and update database

// delete item
function removeRow(button) {
  let rowtoremoveformarray;
  var removecount,remocevode;
  var row = button.parentNode.parentNode;
   removeditem = row.getElementsByTagName("td")[3].textContent;
   removecount = row.getElementsByTagName("td")[2].textContent;
   removecode = row.getElementsByTagName("td")[1].textContent;
     recieptitems = +recieptitems - removecount;
  snolabel.innerHTML = recieptitems;
   rowtoremoveformarray = row.rowIndex - 1;
// data to delete
 //console.log(removeditem);
 //console.log(removecount);
 //console.log(removecode)

  recieptitemsarray = storedArray;
   recieptitemsarray.splice(rowtoremoveformarray,1);
   let storedreciept = JSON.stringify(recieptitemsarray);
localStorage.setItem('curentreciept', storedreciept);
//console.log(recieptitemsarray);
      //remove row after subtraction
/// update product count
        firebase.database().ref('Mystock/' + removecode + '/UnitSale').transaction(function(UnitSale) {
  if (UnitSale === null) {
    return 0; // If the value doesn't exist, set it to 1
  } else {
    return +UnitSale + +removecount; // Increment the value by 1
  }
});

      row.parentNode.removeChild(row);
      

    }

// select storeman and load it to locastorage

allcashiers.addEventListener('click', () => {
  let cashiersearchid = allcashiers.value;
   recieptdelivery.innerHTML = cashiersearchid;
   localStorage.setItem('deliveryagent', cashiersearchid)
})
recieptdelivery.innerHTML = localStorage.getItem('deliveryagent');

// open delivery check point  for tag customer and agent
let printercredit = document.getElementById('printercredit');
printercredit.addEventListener("click", () =>{
  window.location.href='selectdelivery.html';
})

// end of new code








/*
function updateValue(e) {
  price = Itemselected.options[Itemselected.selectedIndex].value;
  count = e.target.value;

  if (count < 1) {
    itemcounter.value = 1;
    newselectcount.innerHTML = "Count :" + count;
    newavailableproductunittoupdate = availableproductunittoupdate - count;
  } else {
    newavailableproductunittoupdate = availableproductunittoupdate - count;
    //console.log(newavailableproductunittoupdate);
    if (newavailableproductunittoupdate == 0) {
    	newavailableproductunittoupdate = newavailableproductunittoupdate;
      myAlert(warning, "All items have been sold. No more items available for sale. <br> <b> Click add to reciept to sale selected item </b>");
      itemcounter.disabled = true;
      newselectcount.innerHTML = "Count :" + count;

    } else {
      newselectcount.innerHTML = "Count :" + count;

    }
  }
}

 // add or subtract fraction 

btnaddfraction.addEventListener('click', () =>{

  count = +count + +0.25;
 console.log(count);
 itemcounter.value = count;
newselectcount.innerHTML = "Count :" + count;
 

} )
btnsubfraction.addEventListener('click', () =>{
  if (count === undefined || isNaN(parseFloat(count))) {
    myAlert(warning, "No Item selected");
  }else{
  count = +count - +0.25
  itemcounter.value = count;
  newselectcount.innerHTML = "Count :" + count;
  
  if (count < 0.25) {
    count = 0.25;
    myAlert(warning, "Reach minimum fraction");
    itemcounter.value = count;
    newselectcount.innerHTML = "Count :" + count;
    
  }
 
}
} )


// for local storage 


let recieptitemsarray = [];
let storedArray = [];
let recieptitemsarraybuying = [];
let storedArraybuying = [];

itemselected.addEventListener("change", function(){ 
item = Itemselected.options[Itemselected.selectedIndex].text;
var thestore = Itemselected.options[Itemselected.selectedIndex].value;
producttocodeupdate = Itemselected.options[Itemselected.selectedIndex].id;
availableproductunittoupdate = Itemselected.options[Itemselected.selectedIndex].data;
	newselectitem.innerHTML=  "Item. " +item;
	newselectprice.innerHTML= "Store. " +thestore;
	newselectcode.innerHTML = "Code. " + producttocodeupdate;
	txtnewselectitem.value =  "" +item;
	txtnewselectprice.value = "" +thestore;
	txtnewselectedcode.value = "" + producttocodeupdate;
	//itemcounter.value = 1;
	count = 1;
	newavailableproductunittoupdate = availableproductunittoupdate - 1;
	//console.log(newavailableproductunittoupdate);
  newselectcount.innerHTML = "Count :" + count;


});

itemcounter.addEventListener("input", updateValue);



btnaddtorecipt.addEventListener('click', () =>{
	if (count >= 0.25) {
	itemcounter.value = 1;
	newselectitem.innerHTML=  "Item. ";
	newselectprice.innerHTML= "Store. ";
	newselectcode.innerHTML = "Code. ";
  newselectcount.innerHTML = "Count. ";
var item = Itemselected.options[Itemselected.selectedIndex].text;
var thestore = Itemselected.options[Itemselected.selectedIndex].value;
var code = Itemselected.options[Itemselected.selectedIndex].id;
let remover = '<button class="remove-btn" onclick="removeRow(this)">X</button>';
 recieptitemsarray = storedArray;

 //console.log(recieptitemsarray);
   // push to an array
 let newitemtoreciept = [item,code, count, customercheck,remover];

 recieptitemsarray.push(newitemtoreciept);
let storedreciept = JSON.stringify(recieptitemsarray);
localStorage.setItem('curentreciept', storedreciept);
// update stock

/// update 
        firebase.database().ref('Mystock/' + code + '/UnitSale').transaction(function(UnitSale) {
  if (UnitSale === null) {
    return 0; // If the value doesn't exist, set it to 1
   // location.reload();
  } else {
    return UnitSale - count; // Increment the value by 1
    //location.reload();
  }
});

location.reload();


}else{
	alert("Select new item to add ");
}
  
})

// retain table of the reciept data for refresh and picking up
onreloadshowitems();
function onreloadshowitems(argument) {
	// body...
	let storeditems = localStorage.getItem('curentreciept');
	let storedbuyingprices = localStorage.getItem('curentbuying');
  discountgiven = localStorage.getItem('Discount');
  // do discount back zero 
	if (storeditems == null || storedbuyingprices == null) {
     
	}else{
// Convert the array string back to an array using JSON.parse()
 storedArray = JSON.parse(storeditems);
 storedArraybuying = JSON.parse(storedbuyingprices);

// Get the table body element
let tableBody = document.getElementById('recieptbody');

// Clear any existing rows in the table
tableBody.innerHTML = '';

// Iterate over the array and create table rows
storedArray.forEach(function(innerArray) {
  let row = document.createElement('tr');
  
  innerArray.forEach(function(element) {
    let cell = document.createElement('td');
    cell.innerHTML = element;
    row.appendChild(cell);

  });
 
  tableBody.appendChild(row);
});
 recieptitems = storedArray.reduce((a, b) => a + +b[2],0);

  snolabel.innerHTML = recieptitems.toLocaleString();
}


}





// delete item
function removeRow(button) {
	let rowtoremoveformarray;
	var removecount,remocevode;
	var row = button.parentNode.parentNode;
	 removeditem = row.getElementsByTagName("td")[3].textContent;
	 removecount = row.getElementsByTagName("td")[2].textContent;
	 removecode = row.getElementsByTagName("td")[1].textContent;
     recieptitems = +recieptitems - removecount;
  snolabel.innerHTML = recieptitems;
   rowtoremoveformarray = row.rowIndex - 1;
// data to delete
 //console.log(removeditem);
 //console.log(removecount);
 //console.log(removecode)

  recieptitemsarray = storedArray;
   recieptitemsarray.splice(rowtoremoveformarray,1);
   let storedreciept = JSON.stringify(recieptitemsarray);
localStorage.setItem('curentreciept', storedreciept);
//console.log(recieptitemsarray);
			//remove row after subtraction
/// update product count
        firebase.database().ref('Mystock/' + removecode + '/UnitSale').transaction(function(UnitSale) {
  if (UnitSale === null) {
    return 0; // If the value doesn't exist, set it to 1
  } else {
    return +UnitSale + +removecount; // Increment the value by 1
  }
});

			row.parentNode.removeChild(row);
			

		}


// print reciept


printer.addEventListener('click', () => {
  if (storedArray.length === 0) {
  myAlertRefresh(warning, "Select item and add it to the reciept");
} else {

  var divToPrint = document.getElementById("readyreciept").innerHTML;
  var donotprint = document.querySelectorAll(".remove-btn");
  var timestamp = Date.now();
  // console.log(timestamp);
  donotprint.forEach(function(element) {
    element.style.visibility = "none";
  });
  // save sale and print reciept
   //myAlert(success, "ready to save sale");
  	 //recieptitemsarray = storedArray;
// remove all the button create code from the receipt
recieptitemsarray = storedArray;
// remove all the button create code from the receipt
for (let i = 0; i < recieptitemsarray.length; i++) {
  for (let j = 0; j < recieptitemsarray[i].length; j++) {
    if (recieptitemsarray[i][j] === "<button class=\"remove-btn\" onclick=\"removeRow(this)\">X</button>") {
      recieptitemsarray[i].splice(j, 1);
    }
  }
}

// Calculate totals
let totalQuantity = 0;
let totalPrice = 0;
for (let i = 0; i < recieptitemsarray.length; i++) {
  totalQuantity += parseInt(recieptitemsarray[i][2]); // Assuming quantity is in the third element of the inner array
  totalPrice += parseFloat(recieptitemsarray[i][3]); // Assuming total amount is in the fourth element of the inner array
}
grandamount = grandamount - discountgiven;

let lastreceiptitem = ["Totals", grandamount, discountgiven, grandamount - discountgiven];

// Convert storedArray to a new array without references
let storedreciepttodatabase = JSON.parse(JSON.stringify(recieptitemsarray));
storedreciepttodatabase.push(lastreceiptitem);
storedreciepttodatabase = JSON.stringify(storedreciepttodatabase); // Convert back to JSON string


     //console.log(storedreciepttodatabase);
    /// update product count and 
        firebase.database().ref('Mysale/' + timestamp).set(storedreciepttodatabase)
  .then(function() {
     // update monthly sales 

    myAlertRefresh(success, "Sale completed ");
    localStorage.removeItem("curentreciept");
    localStorage.setItem('Discount', 0.00);
    //location.reload();
  })
  .catch(function(error) {
     myAlert(failed, "Sale not completed ");
  });
   // update monthly sales 

    let monthlysalenode = "Mymonthly/"+ currentMonth+currentYear ;
        firebase.database().ref(monthlysalenode).update({

       TotalSale: firebase.database.ServerValue.increment(grandamount),
       TotalStockAmount : firebase.database.ServerValue.increment(grandamountbuying),
       TotalDiscount: firebase.database.ServerValue.increment(+discountgiven)        
   
      }).then(() => {
   
  })
  .catch((error) => {
     myAlert(failed, "Cummulative sale not captured");
  });


  // update cashier sales 
     
     email = email.replace(/[@.]/g, "&");

    let cashiersales = "Mycashiersales/"+ email ;
        firebase.database().ref(cashiersales).update({

       CashierTotalSale: firebase.database.ServerValue.increment(grandamount),
       CashierTotalDiscount: firebase.database.ServerValue.increment(+discountgiven)       
   
      }).then(() => {
       
  })
  .catch((error) => {
     myAlert(failed, "Cummulative not cashier sales captured");
  });

// save all individual cashier sales
  let cashiersalesreceipt = "Mycashiersalesreceipt/" + email + "/" + timestamp;
        firebase.database().ref(cashiersalesreceipt).set(storedreciepttodatabase)

        .then(() => {
       
  })
  .catch((error) => {
     myAlert(failed, "Cummulative not cashier sales captured");
  });


   
  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><body onload="window.print()">' + divToPrint + '</body></html>');
  newWin.document.close();
  setTimeout(function() {
    newWin.close();

  }, 10);
 


}
});




// select product and add to the sale desk

      /*var ref = firebase.database().ref("Myproduct");
       itemselected.innerHTML = "";
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var product = childData.ProductName;
          var selling = childData.Selling;
          var code = childData.Code;
          var available = childData.AvailableUnits;
           var option = document.createElement("option");
            option.text = product;
            option.value = selling;
            option.id = code;
            option.data = available;
            itemselected.add(option);
        });
      });*/

/*=====================================*/
// select only items that more than one
/*
var ref = firebase.database().ref("Mystock");
itemselected.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select Item Name";
optiondefault.value = "Select Item Name";
optiondefault.id = "";
itemselected.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var product = childData.StockName;
    var storename = childData.StoreName;
    var code = childData.Code;
    var available = childData.UnitSale;
    var storecode = childData.StoreCode;
    
    if (available >= 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = product;
      option.value = storename;
      option.id = code;
      option.data = available;
      option.dataBuying = storecode;
      itemselected.add(option);
    }
  });
});

// discount section 
let lbbtnpercent = document.getElementById('lbbtnpercent');
let lbtoppercentview = document.getElementById('lbtoppercentview');
const allcashiers = document.getElementById('allcashiers');
let discountamount = document.getElementById('discountamount');
let newpercent = 0;
discountgiven = localStorage.getItem('Discount');
let recieptdelivery = document.getElementById('recieptdelivery');

// number given


// get cashier
function getAllCashier() {
  // body... gets all users 
    var ref = firebase.database().ref("Mystaff");
allcashiers.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select staff/Store staff";
optiondefault.value = "null";
optiondefault.id = "";
allcashiers.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var cashiername = childData.Email;
  
      var option = document.createElement("option");
      option.text = cashiername;
      option.value = cashiername;
      allcashiers.add(option);
    
  });
});
}
getAllCashier();

allcashiers.addEventListener('click', () => {
  let cashiersearchid = allcashiers.value;
   recieptdelivery.innerHTML = cashiersearchid;
   localStorage.setItem('deliveryagent', cashiersearchid)
})
recieptdelivery.innerHTML = localStorage.getItem('deliveryagent');


// end off your code 


let printercredit = document.getElementById('printercredit');
printercredit.addEventListener("click", () =>{
	window.location.href='selectdelivery.html';
})


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
// alert refresh 

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
         reciepttitle = document.getElementById('reciepttitle');
         recieptaddress = document.getElementById('recieptaddress');
         recieptphone = document.getElementById('recieptphone');
         receiptdate = document.getElementById('receiptdate');
         receiptname = document.getElementById('receiptname');
         recieptaddress1 = document.getElementById('recieptaddress1');
         recieptlocation = document.getElementById('recieptlocation');
         lbbusinessname.innerHTML = storedBusiness[0];
         reciepttitle.innerHTML = storedBusiness[0];
         recieptaddress.innerHTML = storedBusiness[1];
         recieptphone.innerHTML = storedBusiness[2];
         recieptaddress1.innerHTML = storedBusiness[3]
         recieptlocation.innerHTML = storedBusiness[4] + " , " + storedBusiness[5]
         receiptdate.innerHTML = datetoday;




 auth.onAuthStateChanged(function(user){
      if(user){
        email = user.email;
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
      if (role == "Admin") {
       // window.location.href='dashboard.html';
      	usernamedisplay.innerHTML = email;
      	receiptname.innerHTML = email;
      }else if (role == "Cashier") {
        
       usernamedisplay.innerHTML = email;
       //window.location.href='saledesk.html';
       receiptname.innerHTML = email
      }else if (role == "SalesLead") {
        usernamedisplay.innerHTML = email;
        receiptname.innerHTML = email
      }else{;
      	window.location.href='../index.html';
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
        window.location.href='../index.html';
      }
    })
*/


