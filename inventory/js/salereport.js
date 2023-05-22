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
    cashiersaletotal = +cashiersaletotal + +mysales;
         var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var newpercent;
           newpercent = (mysales/dividby)* 100;
           newpercent = newpercent.toFixed(2);
           // edit email 
           let inputString = childKey;
           let firstIndex = inputString.indexOf("&");
           let secondIndex = inputString.indexOf("&", firstIndex + 1);

           let newemail = inputString.replace("&", "@").replace("&", ".");


          cell1.innerHTML = newemail;
          cell2.innerHTML = mysales;
          cell3.innerHTML = newpercent + " %";

  })
})
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