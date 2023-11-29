var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";



var cashiersaletotal = 0;
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();
// get prevous month 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const previousMonthIndex = currentDate.getMonth() - 1;
const previousMonthName = months[previousMonthIndex];
var JanSale = 0;var FebSale = 0;var MarSale = 0;var AprSale = 0;var MaySale = 0;var JunSale = 0;var JulSale = 0;var AugSale = 0;var SepSale = 0;var OctSale = 0;var NovSale = 0;var DecSale = 0;

/// get all the last 12 months value

//const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Fetch sales data for a specific month


// Fetch sales data for all months







// Fetch sales data for all months and create the bar graph


/// get the selers report and receipt
let allcashiers = document.getElementById('allcashiers');
let btnsearchcashier = document.getElementById('btnsearchcashier');
let auditof = document.getElementById('auditof');
btnsearchcashier.addEventListener('click', () => {
  let cashiersearchid = allcashiers.value;
  let newcashiersearchid = cashiersearchid.replace(/[@.]/g, "&");
// JavaScript code
// JavaScript code
//const dbRef = firebase.database().ref("Mystoresale");

//const dataTableContainer = document.getElementById("data-table-container");
  var agentId = newcashiersearchid;
  var desiredStatus = 0;

  // Reference to the data path
  var databasePath = 'Mystoresale/' + agentId;

  // Query data from Firebase where 'status' equals the desired value
  firebase.database().ref(databasePath).orderByChild('Status').equalTo(desiredStatus).once('value')
    .then(function(snapshot) {
      // Get the data
      var data = snapshot.val();

      // Display the data
      displayData(data);
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

  function displayData(data) {
    // Display the data as you see fit
    var displayHtml = "<h1>Your Pending</h1>";
    
      if (data) {
    Object.keys(data).forEach(function(timestamp) {
      var receiptString = data[timestamp].Reciept;
      
      if (receiptString) {
        var receiptArray = JSON.parse(receiptString);

        // Convert timestamp to date and time
        var dateTime = new Date(parseInt(timestamp, 10));

        displayHtml += `
          <p>Timestamp: ${dateTime.toLocaleString()}</p>
          <p>Status: Pending</p>
          <p>Created by: ${data[timestamp].CreatedBy}</p>
          <p>Customer Name : ${data[timestamp].CustomerName}</p>
          <p>Customer Phone : ${data[timestamp].CustomerPhone}</p>
          <p>Location : ${data[timestamp].Location}</p>
          <p>Agent Name : ${data[timestamp].AgentName}</p>
          <p>Agent Phone : ${data[timestamp].AgentNumber}</p>
          <p>Agent Location : ${data[timestamp].AgentLocation}</p>
          
          <table border="1">
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Details</th>
            </tr>
        `;

        receiptArray.forEach(function(item) {
          displayHtml += `
            <tr>
              <td>${item[0]}</td>
              <td>${item[1]}</td>
              <td>${item[2]}</td>
              <td>${item[3]}</td>
            </tr>
          `;
        });

        displayHtml += `
          </table>
          
          <!-- Button to update status -->
          <br>
          <button onclick="updateStatus('${timestamp}')" class="my-btn">Clear Delivery</button>
          <button onclick="updateStatusfailed('${timestamp}')" class="my-btn-del">Return to Store</button>
          <hr>
        `;
      } else {
        displayHtml += "<p>No receipt data for this timestamp.</p><hr>";
      }
    });
  } else {
    displayHtml += "<p>No data found for the specified criteria.</p>";
  }

    // Display the HTML
    document.getElementById('data-table-container').innerHTML = displayHtml;
  }




})

function updateStatus(timestamp) {
   let cashiersearchid = allcashiers.value;
  let newcashiersearchid = cashiersearchid.replace(/[@.]/g, "&");
  var agentId = newcashiersearchid;
  // Construct the database path based on your structure
  var databasePath = 'Mystoresale/' + agentId + '/' + timestamp;

  // Update the status to 1
  firebase.database().ref(databasePath).update({ Status: 1 })
    .then(function() {
      myAlertRefresh(success,"Cleared ");
      // You may want to refresh the data display or perform other actions
    })
    .catch(function(error) {
      console.error("Error updating status:", error);
      myAlert(warning, "Failed to clear");
    });
}


// get cashier
function getAllCashier() {
  // body... gets all users 
    var ref = firebase.database().ref("Mystaff");
allcashiers.innerHTML = "";
var optiondefault = document.createElement("option");
optiondefault.text = "Select user / cashier";
optiondefault.value = "cashier";
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
         //usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })