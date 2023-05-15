var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
//start of code

let itemselected = document.getElementById('Itemselected');
let newselectitem = document.getElementById('newselectitem');
let newselectprice = document.getElementById('newselectprice');
let newselectcode = document.getElementById('newselectcode');
let txtnewselectitem = document.getElementById('txtnewselectitem');
let txtnewselectprice = document.getElementById('txtnewselectprice');
let txtnewselectedcode = document.getElementById('txtnewselectedcode');
let itemcounter = document.getElementById('itemcounter');
let btnaddtorecipt = document.getElementById('btnaddtorecipt');
let snolabel = document.getElementById('snolabel');
let priceholder = document.getElementById('priceholder');
let tblpriceholder = document.getElementById('tblpriceholder');
let tblgrandpriceholder = document.getElementById('tblgrandpriceholder');
var count;
var item 
var totalamount;
var removeditem = 0;
var grandamount = 0;
var recieptitems = 0
var producttocodeupdate;
var availableproductunittoupdate;
var newavailableproductunittoupdate;



itemselected.addEventListener("change", function(){ 
item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
producttocodeupdate = Itemselected.options[Itemselected.selectedIndex].id;
availableproductunittoupdate = Itemselected.options[Itemselected.selectedIndex].data;
	newselectitem.innerHTML=  "Item. " +item;
	newselectprice.innerHTML= "Ksh. " +price;
	newselectcode.innerHTML = "Code. " + producttocodeupdate;
	txtnewselectitem.value =  "" +item;
	txtnewselectprice.value = "" +price;
	txtnewselectedcode.value = "" + producttocodeupdate;
	count = 1;
	totalamount = price;
	newavailableproductunittoupdate = availableproductunittoupdate - 1;
	//console.log(newavailableproductunittoupdate);
	//console.log(producttocodeupdate);

});



itemcounter.addEventListener("input", updateValue);

function updateValue(e) {
	var price = Itemselected.options[Itemselected.selectedIndex].value;
	 count = e.target.value;
	if (count < 1) {
     itemcounter.value = 1;
     newavailableproductunittoupdate = availableproductunittoupdate - count;
     console.log(newavailableproductunittoupdate);
	}else{
		newavailableproductunittoupdate = availableproductunittoupdate - count
    totalamount = +count * +price;
	newselectprice.innerHTML= "Ksh. " +totalamount;
	txtnewselectitem.innerHTML =  "" +item;
	txtnewselectprice.innerHTML = "" +price;
	console.log(newavailableproductunittoupdate);
	}
	
}

btnaddtorecipt.addEventListener('click', () =>{
	if (totalamount >= 1) {
	itemcounter.value = 1;
	newselectitem.innerHTML=  "Item. ";
	newselectprice.innerHTML= "Ksh. ";
	newselectcode.innerHTML = "Code. ";
var item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
var code = Itemselected.options[Itemselected.selectedIndex].id;
	  // Get the table

  var table = document.getElementById("reciepttable");

  // Create a new row
  var row = table.insertRow(-1);

  // Insert new cells
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  // Add values to the cells
  cell4.innerHTML = totalamount;
  cell3.innerHTML = count;
  cell2.innerHTML = code;
  cell1.innerHTML = item;
  cell5.innerHTML = `<button class="remove-btn" onclick="removeRow(this)">X</button>`;
  cell2.style.visibility = "hidden";
  grandamount = +grandamount + +totalamount;
  recieptitems = +recieptitems + 1;
  priceholder.innerHTML = grandamount;
  tblpriceholder.innerHTML = grandamount;
  tblgrandpriceholder.innerHTML = grandamount;
  snolabel.innerHTML = recieptitems;

}else{
	alert("Select new item to add ");
}
  
})






// delete item
function removeRow(button) {
	var removecount;
	var row = button.parentNode.parentNode;
	 removeditem = row.getElementsByTagName("td")[3].textContent;
	 removecount = row.getElementsByTagName("td")[1].textContent;
	 grandamount = grandamount - +removeditem;
	 priceholder.innerHTML = grandamount;
	 tblpriceholder.innerHTML = grandamount;
     tblgrandpriceholder.innerHTML = grandamount;
     recieptitems = +recieptitems - 1;
  snolabel.innerHTML = recieptitems;

  			console.log(removecount);
			//remove row after subtraction
			row.parentNode.removeChild(row);
			

		}


// print reciept

printer = document.getElementById('printer');
printer.addEventListener('click', () =>{
	var divToPrint = document.getElementById("readyreciept").innerHTML;
			var newWin = window.open('', 'Print-Window');
			newWin.document.open();
			newWin.document.write('<html><body onload="window.print()">' + divToPrint + '</body></html>');
			newWin.document.close();
			setTimeout(function(){newWin.close();},10);




})




// select product and add to the sale desk

      var ref = firebase.database().ref("Myproduct");
       itemselected.innerHTML = "";
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var product = childData.ProductName;
          var selling = childData.Selling;
          var code = childData.Code;
          var available = childData.AvailableUnits;
           var option = document.createElement("option");
            option.text = product;
            option.value = selling;
            option.id = code;
            option.data = available;
            itemselected.add(option);
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
         reciepttitle = document.getElementById('reciepttitle');
         recieptaddress = document.getElementById('recieptaddress');
         recieptphone = document.getElementById('recieptphone');
         receiptdate = document.getElementById('receiptdate');
         receiptname = document.getElementById('receiptname');
         lbbusinessname.innerHTML = storedBusiness[0];
         reciepttitle.innerHTML = storedBusiness[0];
         recieptaddress.innerHTML = storedBusiness[1];
         recieptphone.innerHTML = storedBusiness[2];
         receiptdate.innerHTML = datetoday;




auth.onAuthStateChanged(function(user){
      if(user){
        email = user.email;
        //alert("Active user" + email);
         usernamedisplay.innerHTML = email;
         receiptname.innerHTML = email;
      }else{
        //alert("No Active user");
        //window.location.href='index.html';
      }
    })