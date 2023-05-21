var cashiersaletotal = 0;



function createBarGraph() {
    // body...
var chartLabels = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Agu","Sep","Oct","Nov","Dec"];
var chartValues = [5625, 4944, 444,0,45,6227,2933,0,4746,3555,5126,4376];
var chartColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#d4f5dd",
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#f1f46f",
  "#b91d47",
  "#00aba9",
  "#df4797",
  "#00aba9",
];

new Chart("barGraphMonthlySale", {
  type: "bar",
  data: {
    labels: chartLabels,
    datasets: [{
      backgroundColor: chartColors,
      data: chartValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Monthly Sale"
    }
  }
});
}
createBarGraph();

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
  console.log(cashiersaletotal);
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
