const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cashiersaletotal = 0;
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();
const currentDate = new Date();
const previousMonthIndex = currentDate.getMonth() - 1;
const previousMonthName = months[previousMonthIndex];

let tbltotalsale = document.getElementById('tbltotalsale');
let tbltotalcredit = document.getElementById('tbltotalcredit');

let averagecredit = 0;
let totalcredit = 0;
let averageSales = 0;
let totalSales = 0;
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
  

  for (let i = 0; i < salesData.length; i++) {
    totalSales += salesData[i];
  }
  averageSales = totalSales / salesData.length;
  tbltotalsale.innerHTML = "Sales Total : <br>" + totalSales;

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
  
  
  for (let i = 0; i < creditData.length; i++) {
    totalcredit += creditData[i];
  }
  averagecredit = totalcredit / creditData.length;
  tbltotalcredit.innerHTML = "Total Credit : <br>" + totalcredit;
  console.log("Avarage:", averagecredit.toFixed(2)); 
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


/* =============================================================*/

// business numbers
function businessNumbesr() {
	// body...
	let tbltotalsalepercent = document.getElementById('tbltotalsalepercent');
	let tbltotalcreditpercent = document.getElementById('tbltotalcreditpercent');
	let tblgrandtotal = document.getElementById('tblgrandtotal');
	let tblgrandtotalpercent = document.getElementById('tblgrandtotalpercent');
	let tbltotalsaleav = document.getElementById('tbltotalsaleav');
	let tbltotalcreditav = document.getElementById('tbltotalcreditav');

	let newtotalsale = totalSales;
	let newtaotalcredit = totalcredit;
	let avnewtotalsale = averageSales.toFixed(2);
	let avnewtotalcredit = averagecredit.toFixed(2);
	let newgrandtotal = newtaotalcredit + newtotalsale;
	let cashpercent = (newtotalsale / newgrandtotal) * 100 
	cashpercent = cashpercent.toFixed(2);
	let creditpercent = (newtaotalcredit / newgrandtotal) * 100
	creditpercent = creditpercent.toFixed(2);

	// show calculations
	tbltotalsalepercent.innerHTML = cashpercent +  " %";
	tbltotalcreditpercent.innerHTML =  creditpercent + " %";
	tblgrandtotal.innerHTML = "Grand Total : <br>" + newgrandtotal;
	tblgrandtotalpercent.innerHTML = +cashpercent + +creditpercent + " %";
	tbltotalsaleav.innerHTML = "Avarage : <br>" + avnewtotalsale;
	tbltotalcreditav.innerHTML = "Avarage : <br>" + avnewtotalcredit;
}

 function linegraph(salesData,creditData) {
 	// body...

    // Labels for the x-axis (e.g., months, dates, etc.)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Create a new chart instance
    const ctx = document.getElementById('lingraphcomparison').getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cash Sales',
            data: salesData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set the background color of the line area
            borderColor: 'rgba(75, 192, 192, 1)', // Set the border color of the line
            borderWidth: 1, // Set the border width
            fill: 'start', // Fill the area under the line
          },
          {
            label: 'Credit Sales',
            data: creditData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: 'start',
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Prevent the chart from being stretched
        scales: {
          y: {
            beginAtZero: true, // Start the y-axis from zero
          },
        },
      },
    });
 }


linegraph();



// call functions in order
getAllMonthsSales()
  .then((salesData) => {
    createBarGraph(salesData);
    //plotSalesTrend(salesData);
      
  getAllMonthsCredit()
  .then((creditData) => {
    createBarGraphforCredit(creditData);
     businessNumbesr();
     linegraph(salesData,creditData);
    
    })
  .catch((error) => {
    console.error("Error:", error);
  });

  })
  .catch((error) => {
    console.error("Error:", error);
  });



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