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
function getMonthSales(monthName) {
  return new Promise((resolve, reject) => {
    const monthSalesRef = firebase.database().ref("Mymonthly/" + monthName + currentYear);
    monthSalesRef.once("value")
      .then((snapshot) => {
        const childData = snapshot.val();
        if (childData == null) {
          resolve(0);
        } else {
          const totalSale = childData.TotalSale;
          resolve(totalSale);
        }
      })
      .catch((error) => {
        console.error("Error retrieving sales data for " + monthName + ": ", error);
        reject(error);
      });
  });
}


// Fetch sales data for all months
// Fetch sales data for all months
async function getAllMonthsSales() {
  const salesData = [];
  for (let i = 0; i < months.length; i++) {
    const monthName = months[i];
    const monthSales = await getMonthSales(monthName);
    salesData.push(monthSales);
  }
  
  let totalSales = 0;
  for (let i = 0; i < salesData.length; i++) {
    totalSales += salesData[i];
  }
  const averageSales = totalSales / salesData.length;
  console.log("Sales Total :", totalSales); 
  console.log("Avarage:", averageSales.toFixed(2)); 
  return salesData;
}

// Create the bar graph
function createBarGraph(salesData) {
  const chartLabels = months.slice(0, salesData.length);
  const chartColors = ["#b91d47", "#00aba9", "#2b5797", "#d4f5dd", "#b91d47", "#00aba9", "#2b5797", "#f1f46f", "#b91d47", "#00aba9", "#df4797", "#00aba9"];

  new Chart("barGraphMonthlySale", {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [{
        backgroundColor: chartColors,
        data: salesData,
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Sale",
      }
    }
  });
}

// more analysis 
function plotSalesTrend(salesData) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  

  // Prepare data for the chart
  const chartData = {
    labels: months,
    datasets: [{
      label: 'Sales Trend',
      data: salesData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  // Set chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  // Create the line chart
  const lineChart = new Chart('lineGraphMonthlySale', {
    type: 'line',
    data: chartData,
    options: chartOptions
  });
}

// Call the function to plot the sales trend chart
//plotSalesTrend();





// Fetch sales data for all months and create the bar graph
getAllMonthsSales()
  .then((salesData) => {
    createBarGraph(salesData);
    plotSalesTrend(salesData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// get all cahier sales

function getCashierSalesTotal() {
  let searchnode = "Mycashiersales";
  var cashiersaletotal = 0;

  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref(searchnode);
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let mysales = childSnapshot.child("CashierTotalSale").val();
        cashiersaletotal = +cashiersaletotal + +mysales;
      });
      resolve(cashiersaletotal);
    }, (error) => {
      reject(error);
    });
  });
}
getCashierSalesTotal().then((cashiersaletotal) => {
  //console.log(cashiersaletotal);
  getCashierSales(cashiersaletotal);
}).catch((error) => {
  console.log("An error occurred:", error);
});



getCashierSalesTotal();
function getCashierSales(dividby) {
  // body...
   let searchnode = "Mycashiersales";
   var sales;
   var cashiersaletotal = 0;
   var newemail;
   var table = document.getElementById("cahierstable");

  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot) {
    let childKey = childSnapshot.key;
    let mysales = childSnapshot.child("CashierTotalSale").val();
    let mydiscount = childSnapshot.child("CashierTotalDiscount").val();
    cashiersaletotal = +cashiersaletotal + +mysales;
         var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var newpercent;
           newpercent = (mysales/dividby)* 100;
           newpercent = newpercent.toFixed(2);
           // edit email 
           let inputString = childKey;
           let firstIndex = inputString.indexOf("&");
           let secondIndex = inputString.indexOf("&", firstIndex + 1);

           let newemail = inputString.replace("&", "@").replace("&", ".");

           // check if discount is there 
           if (mydiscount == null) {
            mydiscount = 0.00;
           }else{
            mydiscount = mydiscount.toLocaleString();
           }


          cell1.innerHTML = newemail;
          cell2.innerHTML = mysales.toLocaleString();
          cell3.innerHTML = mydiscount;
          cell4.innerHTML = newpercent + " %";

  })
})
}

/// get the selers report and receipt
let allcashiers = document.getElementById('allcashiers');
let btnsearchcashier = document.getElementById('btnsearchcashier');
let auditof = document.getElementById('auditof');
btnsearchcashier.addEventListener('click', () => {
  let cashiersearchid = allcashiers.value;
  let newcashiersearchid = cashiersearchid.replace(/[@.]/g, "&");
// JavaScript code
// JavaScript code
const dbRef = firebase.database().ref("Mycashiersalesreceipt");

const dataTableContainer = document.getElementById("data-table-container");

dbRef.child(newcashiersearchid).once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    if (data == null) {
      myAlert(warning,"Cashier do not have sales yet");
       auditof.innerHTML = "failed for sales found";
       dataTableContainer.innerHTML = "<b> No sales for the cashier selected </b>";
    }else{
      dataTableContainer.innerHTML = "";
      auditof.innerHTML = cashiersearchid;
    }

    // Create an array to hold table elements for sorting
    const sortedTables = [];

    // Create tables for each timestamp
    for (const timestamp in data) {
      const salesDataArray = JSON.parse(data[timestamp]);

      const table = document.createElement("table");

      // Add table caption with the timestamp (formatted as date-time)
      const date = new Date(parseFloat(timestamp));
      const formattedDate = date.toLocaleString(); // Format the timestamp to a human-readable date and time
      const caption = document.createElement("caption");
      caption.textContent = formattedDate;
      table.appendChild(caption);

      const tableBody = document.createElement("tbody");
      table.appendChild(tableBody);

      // Add table header with column names
      const headerRow = tableBody.insertRow();
      const headers = ["Product Name", "Product Code", "Quantity", "Price"];
      headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
      });

      // Populate the table with sales data for the current timestamp
      for (const sale of salesDataArray) {
        const row = tableBody.insertRow();
        sale.forEach(saleData => {
          const cell = row.insertCell();
          cell.textContent = saleData;
        });
      }

      // Add the table to the array for sorting
      sortedTables.push(table);
    }

    // Sort the tables in descending order based on timestamp (most recent first)
    sortedTables.sort((a, b) => {
      const timestampA = new Date(a.caption.textContent).getTime();
      const timestampB = new Date(b.caption.textContent).getTime();
      return timestampB - timestampA;
    });

    // Append the sorted tables to the dataTableContainer
    sortedTables.forEach(table => {
      dataTableContainer.appendChild(table);
    });
  })
  .catch((error) => {
    console.error(error);
  });







})

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