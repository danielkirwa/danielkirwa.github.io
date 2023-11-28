var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";





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
var desiredStatus = 0;
var databasePath = 'Mystoresale/';
console.log("Database Path:", databasePath);

firebase.database().ref(databasePath).once('value')
  .then(function(snapshot) {
    console.log("Snapshot:", snapshot.val());

    // Get the data
    var data = snapshot.val();
    console.log("Data:", data);

    var filteredData = filterDataByStatus(data, desiredStatus);
    console.log("Filtered Data:", filteredData);

    // Display the data
    displayData(filteredData);
  })
  .catch(function(error) {
    console.error("Error:", error);
  });

function filterDataByStatus(data, status) {
  var filteredData = {};
  if (data) {
    Object.keys(data).forEach(function (userEmail) {
      Object.keys(data[userEmail]).forEach(function (timestamp) {
        if (data[userEmail][timestamp].Status === status) {
          if (!filteredData[userEmail]) {
            filteredData[userEmail] = {};
          }
          filteredData[userEmail][timestamp] = data[userEmail][timestamp];
        }
      });
    });
  }
  return filteredData;
}



function displayData(data) {
  // Display the data as you see fit
  var displayHtml = "<h1>Your Pending</h1>";

  if (data) {
    Object.keys(data).forEach(function (userEmail) {
      Object.keys(data[userEmail]).forEach(function (timestamp) {
        var receiptString = data[userEmail][timestamp].Reciept;

        if (receiptString) {
          var receiptArray = JSON.parse(receiptString);

          // Convert timestamp to date and time
          var dateTime = new Date(parseInt(timestamp, 10));

          displayHtml += `
            <p>Delivered  By : ${userEmail}</p>
            <p>Timestamp: ${dateTime.toLocaleString()}</p>
            <p>Status: Pending</p>
            <p>Created by: ${data[userEmail][timestamp].CreatedBy}</p>
            
            <table border="1">
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Details</th>
              </tr>
          `;

          receiptArray.forEach(function (item) {
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
            <button onclick="updateStatus('${userEmail}', '${timestamp}')" class="my-btn">Clear Delivery</button>

            <hr>
          `;
        } else {
          displayHtml += "<p>No receipt data for this timestamp.</p><hr>";
        }
      });
    });
  } else {
    displayHtml += "<p>No data found for the specified criteria.</p>";
  }


  // Display the HTML
  document.getElementById('data-table-container').innerHTML = displayHtml;
}


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
         //usernamedisplay.innerHTML = email;
      }else{
        //alert("No Active user");
        window.location.href='../index.html';
      }
    })