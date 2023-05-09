addbusiness = document.getElementById('addbusiness');
var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
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
        var email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='index.html';
      }
    })