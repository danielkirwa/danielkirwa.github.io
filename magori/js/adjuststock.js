addunits = document.getElementById('addunit');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
var email;
let currentunit = 0;
// write code here 
// labels to display data
let lbstockname = document.getElementById('lbstockname');
let lbstockcode = document.getElementById('lbstockcode');
let availableunits = document.getElementById('availableunits');
let createdby = document.getElementById('createdby');
let lbclearby = document.getElementById('lbclearby');
let lbmeasure = document.getElementById('lbmeasure');
let deleteiteminfor = document.getElementById('deleteiteminfor');

// button to add action
let btnupdatestock = document.getElementById('btnupdatestock');
let btndeletestock = document.getElementById('btndeletestock');
// inputs to get new data
let txtadjustunit = document.getElementById('txtadjustunit');
let txtadjustdate = document.getElementById('txtadjustdate');

let searchstock = document.getElementById('searchstock');
let searchcode = document.getElementById('searchcode');
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
    lbstockcode.innerHTML = childData.Code;
    availableunits.innerHTML = childData.UnitSale;
    createdby.innerHTML = childData.Createby;
    lbmeasure.innerHTML = childData.Unit;
    lbclearby.innerHTML = childData.ClearBy;
    currentunit = childData.UnitSale;
    deleteiteminfor.innerHTML = childData.StockName + " <br>" +  "Available Units : " + childData.UnitSale;
  }
  

});
}
})

// update stock here

btnupdatestock.addEventListener("click" , () =>{
let newadjustunit = txtadjustunit.value;
let newadjustdate = txtadjustdate.value;

 if (newadjustunit == "" || newadjustdate == "" ) {
  let fillerror,fillerror1,fillerror2;
   if (newadjustunit == "") {
      fillerror1 = " <br> Enter new adjust units";
    }else{
      fillerror1 = "";
    }
    if (newadjustdate == "") {
      fillerror2 = " <br> Adjust Expiry date";
    }else{
      fillerror2 = "";
    }
     fillerror = 'Fill in the following :  ' + fillerror1 +  fillerror2;
      myAlert(warning, fillerror);

  }else{
      let newsearchcode = searchcode.value;
       
      if (newsearchcode.length > 0) {
      let searchnode = "Mystock/"+ newsearchcode ;
        firebase.database().ref(searchnode).update({

       UnitSale: +newadjustunit + +currentunit,
       ClearBy: newadjustdate 
   
      }).then(() => {
   myAlert(success, "Stock details successfuly updated");
  })
  .catch((error) => {
     myAlert(failed, "Stock details not updated");
  });
  }else{
  myAlert(failed, "Missing update code");
}
  
  }



})


// delete stock here


btndeletestock.addEventListener("click" , () =>{
  let lbstockcode = document.getElementById('lbstockcode');
  if (lbstockcode.innerText == "") {
      myAlert(warning, "Enter product CODE to Delete");
  }else{
    showConfirmationModal();
  }
  
})

// Get the elements
var deleteButton = document.getElementById("deleteButton");
var confirmationModal = document.getElementById("confirmationModal");
var confirmDeleteButton = document.getElementById("confirmDelete");
var cancelDeleteButton = document.getElementById("cancelDelete");
var closeIcon = document.getElementsByClassName("close")[0];

// Function to display the confirmation modal
function showConfirmationModal() {
  confirmationModal.style.display = "block";
}

// Function to hide the confirmation modal
function hideConfirmationModal() {
  confirmationModal.style.display = "none";
}

// Attach event listeners
confirmDeleteButton.addEventListener("click", deleteItem);
cancelDeleteButton.addEventListener("click", hideConfirmationModal);
closeIcon.addEventListener("click", hideConfirmationModal);

// Function to delete the item
function deleteItem() {
  // Your deletion logic goes here
    let lbstockcode = document.getElementById('lbstockcode');
    let deletecode = lbstockcode.innerText;
    console.log(deletecode);
    var nodeRef = firebase.database().ref("Mystock/" + deletecode);
  // Remove the node
  nodeRef.remove()
    .then(function() {
      myAlertRefresh(success, "Deleted")
      hideConfirmationModal();
    })
    .catch(function(error) {
      myAlertRefresh(failed, "Error deleting node:" + error);
      hideConfirmationModal();
    });


  

}










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