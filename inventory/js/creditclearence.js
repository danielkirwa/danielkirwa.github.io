addbusiness = document.getElementById('addbusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var remainder = 0;
var saleunits = 0;

/*============================*/

// get customer and pin with credit 

let searchcustomerid = document.getElementById('searchcustomerid');
let customersearchid = document.getElementById('customersearchid');
let cutomerpaydate = document.getElementById('cutomerpaydate');
let newamounttorepay = document.getElementById('newamounttorepay');
let hidecurrentcredit = document.getElementById('hidecurrentcredit');
let tbltotalcredit = document.getElementById('tbltotalcredit');
let tblpaiedcredit = document.getElementById('tblpaiedcredit');
let tblcreditbalance = document.getElementById('tblcreditbalance');


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
  let currentcredit = document.getElementById('currentcredit');


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
     myAlertRefresh(failed, "Search customer found")
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
       myAlert(success, "Customer : " + childData.FirstName + "<br>" + "Click OK to clear customer");
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
  
    /*=======================================*/
     // get credit 


       let searchnode = "Mycustomercredit/"+ newsearchcode ;
      // get the credit 
    var ref = firebase.database().ref(searchnode);
     ref.once('value').then(function(snapshot) {
    var childData = snapshot.val();
    if (childData == null) {
     myAlertRefresh(success, "Search customer no credited");
     currentcredit.innerHTML = "0.00";
         cutomerpaydate.value = "";
  
     }else{
         currentcredit.innerHTML = childData.CustomerTotalCredit;
         cutomerpaydate.value = childData.CreditDueDate;
         hidecurrentcredit.value = childData.CustomerTotalCredit;

     }
    })

     }else{
      selectedstatus = "Not Active"
      myAlertRefresh(warning, "Customer : " + childData.FirstName + "<br>" + "Not active and can not be credited");
     }
   

  }
  

});
}

})



/*===================================*/
let generatereciept = document.getElementById('generatereciept');
generatereciept.addEventListener('click', () =>{
  if (newcustomeridnumber.innerText == "" || newamounttorepay.value == "") {
    let fillerror,fillerror1,fillerror2;
   if (newcustomeridnumber.innerText == "") {
      fillerror1 = " <br> Select customer to clear";
    }else{
      fillerror1 = "";
    }
    if (newamounttorepay.value == "") {
      fillerror2 = " <br> Enter Amount pay by customer";
    }else{
      fillerror2 = "";
    }
    
  fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2;
  myAlertRefresh(warning, fillerror)
  }else{

    // check if it will be over payment or underpayment

	myAlert(success,"Generated Successfully");
  tbltotalcredit.innerHTML = hidecurrentcredit.value;
  tblpaiedcredit.innerHTML = saleunits;
  tblcreditbalance.innerHTML = remainder;
}
})




newamounttorepay.addEventListener("input", function(event) {
  let newamounttorepay = document.getElementById('newamounttorepay');
  let currentcredit = document.getElementById('currentcredit');
  const constcurrentcredit = hidecurrentcredit.value;
  saleunits = newamounttorepay.value;

  if (isNaN(saleunits)) {
    newamounttorepay.value = "";
    currentcredit.textContent = constcurrentcredit;
    myAlert(warning,"<b> Enter a number in the amount section</b>");
    return; // Reject the input if it is not a number
  }
   remainder = +constcurrentcredit - +saleunits;
  currentcredit.textContent = remainder;
  if(remainder < 0){
    newamounttorepay.value = "";
    currentcredit.textContent = constcurrentcredit;
    myAlert(warning,"<b> Amount entered exceeds the expected amount </b>");
    return; // Reject the input if it is not a number
  }

 
});





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
         lbbusinessname.innerHTML = storedBusiness[0];
         reciepttitle.innerHTML = storedBusiness[0];
         recieptaddress.innerHTML = storedBusiness[1];
         recieptphone.innerHTML = storedBusiness[2];
         receiptdate.innerHTML = datetoday;



auth.onAuthStateChanged(function(user){
      if(user){
        email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
         receiptname.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })