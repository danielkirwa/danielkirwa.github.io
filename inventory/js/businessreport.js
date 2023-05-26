const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cashiersaletotal = 0;
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();
const currentDate = new Date();
const previousMonthIndex = currentDate.getMonth() - 1;
const previousMonthName = months[previousMonthIndex];

/* =============================================================*/
  // cash sale select
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

  new Chart("barGraphMonthlySalebusiness", {
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


/* =============================================================*/
// credit sale 

// Fetch credit sales data for a specific month
function getMonthCredit(monthName) {
  return new Promise((resolve, reject) => {
    const monthCreditRef = firebase.database().ref("Mymonthlycredit/" + monthName + currentYear);
    monthCreditRef.once("value")
      .then((snapshot) => {
        const childData = snapshot.val();
        if (childData == null) {
          resolve(0);
        } else {
          const totalSale = childData.TotalCredit;
          console.log(totalSale);
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
async function getAllMonthsCredit() {
  const creditData = [];
  for (let i = 0; i < months.length; i++) {
    const monthName = months[i];
    const monthCredit = await getMonthCredit(monthName);
    creditData.push(monthCredit);
  }
  
  let totalcredit = 0;
  for (let i = 0; i < creditData.length; i++) {
    totalcredit += creditData[i];
  }
  const averagecredit = totalcredit / creditData.length;
  console.log("Sales Total :", totalcredit); 
  console.log("Avarage:", averageSales.toFixed(2)); 
  return creditData;
}

// Create the bar graph
function createBarGraphforCredit(creditData) {
  const chartLabels = months.slice(0, creditData.length);
  const chartColors = ["#b91d47", "#00aba9", "#2b5797", "#d4f5dd", "#b91d47", "#00aba9", "#2b5797", "#f1f46f", "#b91d47", "#00aba9", "#df4797", "#00aba9"];

  new Chart("barGraphMonthlyCreditbusiness", {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [{
        backgroundColor: chartColors,
        data: creditData,
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Credit",
      }
    }
  });
}




// call functions in order
getAllMonthsSales()
  .then((salesData) => {
    createBarGraph(salesData);
    //plotSalesTrend(salesData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  getAllMonthsCredit()
  .then((creditData) => {
    createBarGraphforCredit(creditData);
    
    })
  .catch((error) => {
    console.error("Error:", error);
  });