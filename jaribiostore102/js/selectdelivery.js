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
let newcustomeridnumber = document.getElementById('newcustomeridnumber');
 let cutomerpaydate = document.getElementById('cutomerpaydate');
  let newagentdestination = document.getElementById('newagentdestination');
 let newagentname = document.getElementById('newagentname');
 let newagentnumber = document.getElementById('newagentnumber');
  let receiptagentname = document.getElementById('receiptagentname');
 let recieptagentnumber = document.getElementById('recieptagentnumber');
 let recieptagentlocation = document.getElementById('recieptagentlocation');
var count;
var item 
var totalamount;
var removeditem = 0;
var grandamount = 0;
var grandamountbuying = 0;
var recieptitems = 0
var discountgiven = 0
var producttocodeupdate;
var availableproductunittoupdate;
var newavailableproductunittoupdate;


// for local storage 


let recieptitemsarray = [];
let storedArray = [];
let recieptitemsarraybuying = [];
let storedArraybuying = [];



// retain table of the reciept data for refresh and picking up
onreloadshowitems();
function onreloadshowitems(argument) {
  // body...
  let storeditems = localStorage.getItem('curentreciept');
  let storedbuyingprices = localStorage.getItem('curentbuying');
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
  //console.log(grandamount);
 //console.log(grandamountbuying)
  discountgiven = localStorage.getItem('Discount');
  priceholder.innerHTML = "______________";
  tblpriceholder.innerHTML = "______________";
  tblgrandpriceholder.innerHTML = "______________";
  snolabel.innerHTML = recieptitems;
  discountopholder.innerHTML = "______________";
  tbldiscount.innerHTML = "______________";
  tblgrandpriceholder.innerHTML = "______________";
    priceholder.innerHTML = "______________";
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
     tblgrandpriceholder.innerHTML = grandamount.toLocaleString();
     recieptitems = +recieptitems - removecount;
  snolabel.innerHTML = recieptitems;
  tblgrandpriceholder.innerHTML = (grandamount - discountgiven).toLocaleString();
    priceholder.innerHTML = (grandamount - +discountgiven).toLocaleString();
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
 if (newcustomeridnumber.innerText == "" || cutomerpaydate.value == "") {
     myAlert(warning, "No customer credited to make sale select customer and make credit sale and ensure that the due date is selected");
 }else{

  var divToPrint = document.getElementById("readyreciept").innerHTML;
  var donotprint = document.querySelectorAll(".remove-btn");
  var timestamp = Date.now();
  // console.log(timestamp);
  donotprint.forEach(function(element) {
    element.style.visibility = "none";
  });
  // save sale and print reciept
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

let lastreceiptitem = ["Totals", 0, 0, 0];

// Convert storedArray to a new array without references
let storedreciepttodatabase = JSON.parse(JSON.stringify(recieptitemsarray));
//storedreciepttodatabase.push(lastreceiptitem);
storedreciepttodatabase = JSON.stringify(storedreciepttodatabase); // Convert back to JSON string



/*------------------------------------------------------------*/
    /// update agent deliveries 
  deliverby = localStorage.getItem('deliveryagent').replace(/[@.]/g, "&");
        firebase.database().ref('Mystoresale/' + deliverby + "/" + timestamp).set({
          Reciept:storedreciepttodatabase,
          Status: 0,
          CustomerName: recieptcustomername.innerText,
          CustomerPhone: recieptcustomerphone.innerText,
          Location: recieptcustomeraddress.innerText,
          AgentName: receiptagentname.innerHTML,
          AgentNumber: recieptagentnumber.innerHTML,
          AgentLocation: recieptagentlocation.innerHTML,
          CreatedBy: email})
  /*.then(function() {
     // update monthly sales 

    myAlertRefresh(success, "Sale completed ");
    localStorage.removeItem("curentreciept");
    //location.reload();
  })*/
  .catch(function(error) {
     myAlert(failed, "Sale not completed ");
  });

/*------------------------------------------------------------*/
  // customer reciept 
  var databasePath = 'Mycustomerreceipt/' + newcustomeridnumber.innerText + "/" + timestamp;
      firebase.database().ref(databasePath).set(
        {
          Reciept:storedreciepttodatabase,
          Status: 0,
          CustomerName: recieptcustomername.innerText,
          CustomerPhone: recieptcustomerphone.innerText,
          Location: recieptcustomeraddress.innerText,
          AgentName: receiptagentname.innerHTML,
          AgentNumber: recieptagentnumber.innerHTML,
          AgentLocation: recieptagentlocation.innerHTML,
          Incharge: localStorage.getItem('deliveryagent')})
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


  

/*------------------------------------------------------------*/
  // update cashier sales 
     
     email = email.replace(/[@.]/g, "&");

    let cashiersales = "Mycashiercreditsales/"+ email ;
        firebase.database().ref(cashiersales).update({

       CashierTotalCreditSale: firebase.database.ServerValue.increment(grandamount),
       TotalDiscount: firebase.database.ServerValue.increment(+discountgiven)        
   
      }).then(() => {
       
  })
  .catch((error) => {
     myAlert(failed, "Cummulative cashier credit sales not captured");
  });

  /*------------------------------------------------------------*/


   
  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><body onload="window.print()">' + divToPrint + '</body></html>');
  newWin.document.close();
  setTimeout(function() {
    newWin.close();

  }, 10);
 

}

});


// get customer and pin with credit 

let searchcustomerid = document.getElementById('searchcustomerid');
let customersearchid = document.getElementById('customersearchid');
searchcustomerid.addEventListener("click", () => {

  // get lables 
  let newcustomername = document.getElementById('newcustomername');
  let newcustomerstatus = document.getElementById('newcustomerstatus');
  let newcustomeremail = document.getElementById('newcustomeremail');
  let newcustomerphone = document.getElementById('newcustomerphone');
  let newcustomerotherphone = document.getElementById('newcustomerotherphone');
  let newcustomerregion = document.getElementById('newcustomerregion');
  let newcustomertown = document.getElementById('newcustomertown');
  let newcustomervillage = document.getElementById('newcustomervillage');


  // get for reciept

   let recieptcustomername = document.getElementById('recieptcustomername');
   let recieptcustomeremail = document.getElementById('recieptcustomeremail');
   let recieptcustomerphone = document.getElementById('recieptcustomerphone');
   let receiptcleardate = document.getElementById('receiptcleardate');
   let recieptcustomerlocation = document.getElementById('recieptcustomerlocation');
   let recieptcustomeraddress = document.getElementById('recieptcustomeraddress');


  let newsearchcode = customersearchid.value;
  let selectedstatus;
  
  if (newsearchcode == "") {
    myAlert(warning, "Enter code to search")
    newcustomername.innerHTML = "";
    newcustomerstatus.innerHTML = "";
    newcustomeremail.innerHTML = "";
    newcustomerphone.innerHTML = "";
    newcustomerotherphone.innerHTML = "";
    newcustomerregion.innerHTML = "";
    newcustomertown.innerHTML = "";
    newcustomervillage.innerHTML = "";
    newcustomeridnumber.innerHTML = "";
  }else{
  let searchnode = "Mycustomer/"+ newsearchcode ;
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.once('value').then(function(snapshot) {
  var childData = snapshot.val();
  if (childData == null) {
     myAlert(failed, "Search customer found")
    newcustomername.innerHTML = "";
    newcustomerstatus.innerHTML = "";
    newcustomeremail.innerHTML = "";
    newcustomerphone.innerHTML = "";
    newcustomerotherphone.innerHTML = "";
    newcustomerregion.innerHTML = "";
    newcustomertown.innerHTML = "";
    newcustomervillage.innerHTML = "";
    newcustomeridnumber.innerHTML = "";
  }else{
     if (childData.Status == 1) {
      selectedstatus = "Active";
       myAlert(success, "Customer : " + childData.FirstName + "<br>" + "Click OK to credit customer");
    newcustomername.innerHTML = childData.FirstName;
    newcustomerstatus.innerHTML = selectedstatus;
    newcustomeremail.innerHTML = childData.CustomerEmail;
    newcustomerphone.innerHTML = childData.CustomerPhone;
    newcustomerotherphone.innerHTML = childData.CustomerOtherPhone;
    newcustomerregion.innerHTML = childData.CustomerRiegion;
    newcustomertown.innerHTML = childData.CustomerTown;
    newcustomervillage.innerHTML = childData.CustomerVillage;
    newcustomeridnumber.innerHTML = childData.IDNumber;
    // show on reciept 

    recieptcustomername.innerHTML = childData.FirstName + "  " + childData.OtherName;
    recieptcustomeremail.innerHTML = childData.CustomerEmail
    recieptcustomerphone.innerHTML = childData.CustomerPhone;
    recieptcustomerlocation.innerHTML = childData.CustomerRiegion + " , " + childData.CustomerTown;
    recieptcustomeraddress.innerHTML = childData.CustomerVillage

     }else{
      selectedstatus = "Not Active"
      myAlert(warning, "Customer : " + childData.FirstName + "<br>" + "Not active and can not be credited");
     }
   

  }
  

});
}

})

// second search 
let secondsearch =document.getElementById('secondsearch');
secondsearch.addEventListener("click" , () =>{
  let newsecondsearchname = document.getElementById('newsecondsearchname').value;
  let newsecondsearchid = document.getElementById('newsecondsearchid').value;
  let newsecondsearchemail = document.getElementById('newsecondsearchemail').value;
  let newsecondsearchphone = document.getElementById('newsecondsearchphone').value;
  let newsecondsearchregion = document.getElementById('newsecondsearchregion').value;
  let newsecondsearchtown = document.getElementById('newsecondsearchtown').value;
  let newsecondsearchaddress = document.getElementById('newsecondsearchaddress').value;
  if (newsecondsearchid == "") {
    myAlert(failed,"Enter Id number");

  }else{
    newcustomername.innerHTML = newsecondsearchname;
    newcustomerstatus.innerHTML = "Active";
    newcustomeremail.innerHTML = newsecondsearchemail;
    newcustomerphone.innerHTML = newsecondsearchphone;
    newcustomerotherphone.innerHTML = newsecondsearchphone;
    newcustomerregion.innerHTML = newsecondsearchregion;
    newcustomertown.innerHTML = newsecondsearchtown;
    newcustomervillage.innerHTML = newsecondsearchaddress
    newcustomeridnumber.innerHTML = newsecondsearchid;
    // show on reciept 

    recieptcustomername.innerHTML = newsecondsearchname;
    recieptcustomeremail.innerHTML = newsecondsearchemail;
    recieptcustomerphone.innerHTML = newsecondsearchphone;
    recieptcustomerlocation.innerHTML = newsecondsearchregion + " , " + newsecondsearchtown;
    recieptcustomeraddress.innerHTML = newsecondsearchaddress;
  }
})


// check date customer status and credit\
let creditcustomer = document.getElementById('creditcustomer');

creditcustomer.addEventListener("click" , () => {
 let checknewcustomerstatus = document.getElementById('newcustomerstatus');
 let receiptcleardate = document.getElementById('receiptcleardate');
 if (checknewcustomerstatus.innerText == "Active") {
  if (cutomerpaydate.value == "") {
  myAlert(warning, "Select credit due date");

  }else{
    receiptcleardate.innerHTML = cutomerpaydate.value;
    myAlert(success, "Customer ready to be credited :" + "Due : " + cutomerpaydate.value);
  }
    
 }else if(checknewcustomerstatus.innerText == "Not Active"){
  myAlert(warning, "Customer not active and can not be credited for status check");
 }else{
  myAlert(failed, "Customer status can not be established search or contact Admin");
 }
  
})

// credit data validation 

 function validatecreditDate() {
    var inputDate = new Date(document.getElementById("cutomerpaydate").value);
      var currentDate = new Date();

      // Add one month to the current date
      var maxDate = new Date();
      maxDate.setMonth(currentDate.getMonth() + 1);

      // Set the minimum date to tomorrow
      var minDate = new Date();
      minDate.setDate(currentDate.getDate() + -1);

      if (inputDate < minDate || inputDate > maxDate) {
        myAlert(failed, "Please select a date within one month from the current date and not earlier than tomorrow.");
        document.getElementById("cutomerpaydate").value = ""; // Clear the input field
      }
    }

let makecashsale = document.getElementById('makecashsale');
 // load delivery agent 
    let recieptdelivery = document.getElementById('recieptdelivery');
    recieptdelivery.innerHTML = localStorage.getItem('deliveryagent');
    if (localStorage.getItem('deliveryagent',) === "null") {
      myAlert(failed, "Please select delivery agent");
      printer.style.display = "none";
      makecashsale.innerHTML = "<< Select delivery agent"
    }




// agent search code start here
 // get all agent 
 const allagent = document.getElementById('allagent');

function getAllAgents() {
    // Clear existing options and data attributes
    allagent.innerHTML = "";
    allagent.removeAttribute("data-id");
    allagent.removeAttribute("data-location");

    // Add a default option
    var optiondefault = document.createElement("option");
    optiondefault.text = "Select staff/Store staff";
    optiondefault.value = "null";
    allagent.add(optiondefault);

    // Fetch data from Firebase
    var ref = firebase.database().ref("Myagent");

    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var cashiername = childData.AgentName;
            var agentphone = childData.AgentPhone;
            var agentlocation = childData.AgentTown;
            console.log(agentlocation);

            // Create option element
            var option = document.createElement("option");
            option.text = cashiername;
            option.value = cashiername;

            // Set data attributes on each option
            option.setAttribute("data-id", agentphone);
            option.setAttribute("data-location", agentlocation);

            // Add option to the select element
            allagent.add(option);
        });
    });
}



getAllAgents();

// Define agents in a global scope or in a scope accessible by both functions
let agents = [];

// Assume this function fetches agent data and populates the <select> element
function populateAgents() {
    // ... Your existing code to fetch and populate agents

    // After fetching agents, dynamically build the actions mapping
    actions = {};
    agents.forEach(agent => {
        actions[agent.value] = {
            label: `Use ${agent.value} destination`,
            phoneLabel: 'Agent Phone',
            locationLabel: 'Agent Location'
        };
    });
}

let btnsearchagent = document.getElementById('btnsearchagent');

btnsearchagent.addEventListener('click', () => {
    let allagent = document.getElementById('allagent');
    let selectedOption = allagent.options[allagent.selectedIndex];
    let agentsearchid = selectedOption.value;
    let agentphone = selectedOption.getAttribute("data-id");
    let agentlocation = selectedOption.getAttribute("data-location");

    // Log the selected option details for debugging
    //console.log('Selected Option:', selectedOption);
    console.log('agentsearchid:', agentsearchid);
    console.log('agentphone:', agentphone);
    console.log('agentlocation:', agentlocation);
    newagentdestination.innerHTML = agentlocation;
    newagentname.innerHTML = agentsearchid;
    newagentnumber.innerHTML = agentphone;
    receiptagentname.innerHTML = agentsearchid;
    recieptagentnumber.innerHTML = agentphone;
    recieptagentlocation.innerHTML = agentlocation;

    // Check if the selected option value has a corresponding action
    if (actions.hasOwnProperty(agentsearchid)) {
        const action = actions[agentsearchid];
        console.log(action.label);

        if (action.phoneLabel) {
            console.log(action.phoneLabel + ':', agentphone);
        }

        if (action.locationLabel) {
            console.log(action.locationLabel + ':', agentlocation);
        }
    } else {
       // console.log('Handle other cases if needed');
    }
});

// Call the function to populate agents when needed
populateAgents();






    // agent search code ends here

// end off your code 
// alert 


makecashsale.addEventListener("click" , () => {
  window.location.href='createdelivery.html';
})


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


// refresh alert 
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
       usernamedisplay.innerHTML = email;
       receiptname.innerHTML = email
      }else if (role == "Cashier") {
        
       receiptname.innerHTML = email
       usernamedisplay.innerHTML = email;
       //window.location.href='saledesk.html';
      }else if (role == "SalesLead") {
        receiptname.innerHTML = email
        usernamedisplay.innerHTML = email;
      }else{
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

