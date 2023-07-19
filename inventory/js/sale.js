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
var totalamount;
var totalamountbusiness;
var removeditem = 0;
var grandamount = 0;
var recieptitems = 0
var grandamountbuying = 0;
var producttocodeupdate;
var availableproductunittoupdate;
var newavailableproductunittoupdate;
var selectedbuyingprice = 0;

/*function updateValue(e) {
  var price = Itemselected.options[Itemselected.selectedIndex].value;
  count = e.target.value;

  if (count < 1) {
    itemcounter.value = 1;
    newavailableproductunittoupdate = availableproductunittoupdate - count;
    //console.log(newavailableproductunittoupdate);
  } else {
    newavailableproductunittoupdate = availableproductunittoupdate - count;
    if (newavailableproductunittoupdate < 1) {
      myAlert(warning, "All items have been sold. No more items available for sale.");
    } else {
      totalamount = +count * +price;
      newselectprice.innerHTML = "Ksh. " + totalamount;
      txtnewselectitem.innerHTML = "" + item;
      txtnewselectprice.innerHTML = "" + price;
      console.log(newavailableproductunittoupdate);
    }
  }
}*/

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




function updateValue(e) {
  var price = Itemselected.options[Itemselected.selectedIndex].value;
  count = e.target.value;

  if (count < 1) {
    itemcounter.value = 1;
    newavailableproductunittoupdate = availableproductunittoupdate - count;
  } else {
    newavailableproductunittoupdate = availableproductunittoupdate - count;
    //console.log(newavailableproductunittoupdate);
    if (newavailableproductunittoupdate == 0) {
    	newavailableproductunittoupdate = newavailableproductunittoupdate;
      myAlert(warning, "All items have been sold. No more items available for sale. <br> <b> Click add to reciept to sale selected item </b>");
      itemcounter.disabled = true;

    } else {
      totalamount = +count * +price;
      totalamountbusiness = +count * +selectedbuyingprice;
      newselectprice.innerHTML = "Ksh. " + totalamount;
      txtnewselectitem.innerHTML = "" + item;
      txtnewselectprice.innerHTML = "" + price;
     // console.log(newavailableproductunittoupdate);
      console.log(totalamountbusiness);
    }
  }
}

// for local storage 


let recieptitemsarray = [];
let storedArray = [];
let recieptitemsarraybuying = [];
let storedArraybuying = [];

itemselected.addEventListener("change", function(){ 
item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
producttocodeupdate = Itemselected.options[Itemselected.selectedIndex].id;
availableproductunittoupdate = Itemselected.options[Itemselected.selectedIndex].data;
selectedbuyingprice = Itemselected.options[Itemselected.selectedIndex].dataBuying;
	newselectitem.innerHTML=  "Item. " +item;
	newselectprice.innerHTML= "Tsh. " +price;
	newselectcode.innerHTML = "Code. " + producttocodeupdate;
	txtnewselectitem.value =  "" +item;
	txtnewselectprice.value = "" +price;
	txtnewselectedcode.value = "" + producttocodeupdate;
	//itemcounter.value = 1;
	count = 1;
	totalamount = price;
	newavailableproductunittoupdate = availableproductunittoupdate - 1;
	//console.log(newavailableproductunittoupdate);
	console.log(selectedbuyingprice);

});



itemcounter.addEventListener("input", updateValue);

/*function updateValue(e) {
	var price = Itemselected.options[Itemselected.selectedIndex].value;
	 count = e.target.value;
	if (count < 1) {
     itemcounter.value = 1;
     newavailableproductunittoupdate = availableproductunittoupdate - count;
     //console.log(newavailableproductunittoupdate);
	}else{
		newavailableproductunittoupdate = availableproductunittoupdate - count
		if (newavailableproductunittoupdate < 1) {
         myAlert(warning, "All item select No more item to sale");
		}else{
    totalamount = +count * +price;
	newselectprice.innerHTML= "Ksh. " +totalamount;
	txtnewselectitem.innerHTML =  "" +item;
	txtnewselectprice.innerHTML = "" +price;
	console.log(newavailableproductunittoupdate);
      }
	}
	
}*/
  



btnaddtorecipt.addEventListener('click', () =>{
	if (totalamount >= 1) {
	itemcounter.value = 1;
	newselectitem.innerHTML=  "Item. ";
	newselectprice.innerHTML= "Ksh. ";
	newselectcode.innerHTML = "Code. ";
var item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
var code = Itemselected.options[Itemselected.selectedIndex].id;
let remover = '<button class="remove-btn" onclick="removeRow(this)">X</button>';
 recieptitemsarray = storedArray;
 recieptitemsarraybuying = storedArraybuying;
 //console.log(recieptitemsarray);
   // push to an array
 let newitemtoreciept = [item,code, count, totalamount,remover];
 let newbuyingprice = [item,code,totalamountbusiness];
 recieptitemsarray.push(newitemtoreciept);
 recieptitemsarraybuying.push(newbuyingprice);
let storedreciept = JSON.stringify(recieptitemsarray);
let storedbuying = JSON.stringify(recieptitemsarraybuying);
localStorage.setItem('curentreciept', storedreciept);
localStorage.setItem('curentbuying', storedbuying);
// update stock

/// update 
        firebase.database().ref('Myproduct/' + code + '/AvailableUnits').transaction(function(AvailableUnits) {
  if (AvailableUnits === null) {
    return 0; // If the value doesn't exist, set it to 1
   // location.reload();
  } else {
    return AvailableUnits - count; // Increment the value by 1
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
 grandamount = storedArray.reduce((a, b) => a + +b[3],0);
 recieptitems = storedArray.reduce((a, b) => a + +b[2],0);
 grandamountbuying = storedArraybuying.reduce((a,b) => a + +b[2],0);
  console.log(grandamount);
 console.log(grandamountbuying)
  priceholder.innerHTML = grandamount;
  tblpriceholder.innerHTML = grandamount;
  tblgrandpriceholder.innerHTML = grandamount;
  snolabel.innerHTML = recieptitems;


  // if no amount on the receipt clear discount if there
  if (grandamount <= 0) {
    console.log('less');
    localStorage.setItem('Discount', 0.00);
    discountopholder.innerHTML = 0.00;
   tbldiscount.innerHTML = 0.00;
  }else{
    // retain all the data of the discount if were given

  }
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
	 grandamount = grandamount - +removeditem;
	 priceholder.innerHTML = grandamount;
	 tblpriceholder.innerHTML = grandamount;
     tblgrandpriceholder.innerHTML = grandamount;
     recieptitems = +recieptitems - removecount;
  snolabel.innerHTML = recieptitems;
   rowtoremoveformarray = row.rowIndex - 1;
// data to delete
 //console.log(removeditem);
 //console.log(removecount);
 //console.log(removecode)

  recieptitemsarray = storedArray;
  recieptitemsarraybuying = storedArraybuying;
   recieptitemsarray.splice(rowtoremoveformarray,1);
   recieptitemsarraybuying.splice(rowtoremoveformarray,1);
   let storedreciept = JSON.stringify(recieptitemsarray);
   let storedbuying = JSON.stringify(recieptitemsarraybuying);
localStorage.setItem('curentreciept', storedreciept);
localStorage.setItem('curentbuying', storedbuying);
//console.log(recieptitemsarray);
			//remove row after subtraction
/// update product count
        firebase.database().ref('Myproduct/' + removecode + '/AvailableUnits').transaction(function(AvailableUnits) {
  if (AvailableUnits === null) {
    return 0; // If the value doesn't exist, set it to 1
  } else {
    return +AvailableUnits + +removecount; // Increment the value by 1
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
  	 recieptitemsarray = storedArray;
     // remove all the button create code form the reciept
     for (let i = 0; i < recieptitemsarray.length; i++) {
     	for(let j = 0; j < recieptitemsarray[i].length; j++){
     		if (recieptitemsarray[i][j] === "<button class=\"remove-btn\" onclick=\"removeRow(this)\">X</button>") {
     			recieptitemsarray[i].splice(j,1);
     		}
     	}
      }

  	 let storedreciepttodatabase = JSON.stringify(recieptitemsarray);
     //console.log(storedreciepttodatabase);
    /// update product count
        firebase.database().ref('Mysale/' + timestamp).set(storedreciepttodatabase)
  .then(function() {
     // update monthly sales 

    myAlertRefresh(success, "Sale completed ");
    localStorage.removeItem("curentreciept");
    //location.reload();
  })
  .catch(function(error) {
     myAlert(failed, "Sale not completed ");
  });
   // update monthly sales 

    let monthlysalenode = "Mymonthly/"+ currentMonth+currentYear ;
        firebase.database().ref(monthlysalenode).update({

       TotalSale: firebase.database.ServerValue.increment(grandamount),
       TotalStockAmount : firebase.database.ServerValue.increment(grandamountbuying)       
   
      }).then(() => {
   
  })
  .catch((error) => {
     myAlert(failed, "Cummulative not sales captured");
  });

  // update cashier sales 
     
     email = email.replace(/[@.]/g, "&");

    let cashiersales = "Mycashiersales/"+ email ;
        firebase.database().ref(cashiersales).update({

       CashierTotalSale: firebase.database.ServerValue.increment(grandamount)       
   
      }).then(() => {
       
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

var ref = firebase.database().ref("Myproduct");
itemselected.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select Product Name";
optiondefault.value = "Select Product Name";
optiondefault.id = "";
itemselected.add(optiondefault);
ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var product = childData.ProductName;
    var selling = childData.Selling;
    var code = childData.Code;
    var available = childData.AvailableUnits;
    var buying = childData.Buying;
    
    if (available >= 1) { // Add condition to check if AvailableUnits > 1
      var option = document.createElement("option");
      option.text = product;
      option.value = selling;
      option.id = code;
      option.data = available;
      option.dataBuying = buying;
      itemselected.add(option);
    }
  });
});

// discount section 
let lbbtnpercent = document.getElementById('lbbtnpercent');
let lbtoppercentview = document.getElementById('lbtoppercentview');
const discountpercent = document.getElementById('discountpercent');
var discountgiven = 0;
let discountamount = document.getElementById('discountamount');
let newpercent = 0;
discountgiven = localStorage.getItem('Discount');
discountopholder.innerHTML = discountgiven;
tbldiscount.innerHTML = discountgiven;
discountamount.value = discountgiven;
discountpercent.addEventListener('input', function() {
  if (this.value < 0) {
    this.value = '';
  }else{
    if(grandamount <= 0){
   this.value = "";
   myAlert(warning, "No Items on the receipt");
  }else{
   newpercent = this.value;
    discountgiven = (+newpercent / 100 ) * +grandamount;
    discountamount.value = discountgiven;
    lbbtnpercent.innerHTML = newpercent;
    lbtoppercentview.innerHTML = newpercent;
    discountopholder.innerHTML = discountgiven;
    tbldiscount.innerHTML = discountgiven;
    // save the discount
    localStorage.setItem('Discount', discountgiven);
  }
  }
});


// number given
discountamount.addEventListener('input', function() {
  const numericValue = this.value.replace(/[^0-9]/g, '');
  this.value = numericValue;
  discountgiven = this.value;
  if(grandamount <= 0){
   this.value = "";
   myAlert(warning, "No Items on the receipt");
  }else{
  newpercent =  (discountgiven / grandamount) * 100;
  discountpercent.value = newpercent;
  lbbtnpercent.innerHTML = newpercent;
  lbtoppercentview.innerHTML = newpercent;
   discountopholder.innerHTML = discountgiven;
   tbldiscount.innerHTML = discountgiven;
   localStorage.setItem('Discount', discountgiven);
}

});







// end off your code 


let printercredit = document.getElementById('printercredit');
printercredit.addEventListener("click", () =>{
	window.location.href='saledeskcredit.html';
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



