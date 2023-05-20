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

function getCashierSales() {
  // body...
   let searchnode = "Mycashiersales";
   var sales;
   var cashiersaletotal = 0;
  // get the stock 
  var ref = firebase.database().ref(searchnode);
  ref.on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot) {
    let childKey = childSnapshot.key;
    let mysales = childSnapshot.child("CashierTotalSale").val();
    cashiersaletotal = +cashiersaletotal + +mysales;
    console.log(childKey + " : " + mysales);
    console.log(cashiersaletotal);

  })
})
}
getCashierSales();