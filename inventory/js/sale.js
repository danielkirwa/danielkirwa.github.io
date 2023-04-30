let itemselected = document.getElementById('Itemselected');
let newselectitem = document.getElementById('newselectitem');
let newselectprice = document.getElementById('newselectprice');
let txtnewselectitem = document.getElementById('txtnewselectitem');
let txtnewselectprice = document.getElementById('txtnewselectprice');
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

itemselected.addEventListener("change", function(){ 
item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
	newselectitem.innerHTML=  "Item. " +item;
	newselectprice.innerHTML= "Ksh. " +price;
	txtnewselectitem.value =  "" +item;
	txtnewselectprice.value = "" +price;
	count = 1;
	totalamount = price;

});



itemcounter.addEventListener("input", updateValue);

function updateValue(e) {
	var price = Itemselected.options[Itemselected.selectedIndex].value;
	 count = e.target.value;
	if (count < 1) {
     itemcounter.value = 1;
	}else{
    totalamount = +count * +price;
	newselectprice.innerHTML= "Ksh. " +totalamount;
	txtnewselectitem.innerHTML =  "" +item;
	txtnewselectprice.innerHTML = "" +price;
	}
	
}

btnaddtorecipt.addEventListener('click', () =>{
	if (totalamount >= 1) {
	itemcounter.value = 1;
	newselectitem.innerHTML=  "Item. ";
	newselectprice.innerHTML= "Ksh. ";
var item = Itemselected.options[Itemselected.selectedIndex].text;
var price = Itemselected.options[Itemselected.selectedIndex].value;
	  // Get the table

  var table = document.getElementById("reciepttable");

  // Create a new row
  var row = table.insertRow(-1);

  // Insert new cells
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);


  // Add values to the cells
  cell3.innerHTML = totalamount;
  cell2.innerHTML = count;
  cell1.innerHTML = item;
  cell4.innerHTML = `<button class="remove-btn" onclick="removeRow(this)">X</button>`;
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
	var row = button.parentNode.parentNode;
	 removeditem = row.getElementsByTagName("td")[2].textContent;
	 grandamount = grandamount - +removeditem;
	 priceholder.innerHTML = grandamount;
	 tblpriceholder.innerHTML = grandamount;
     tblgrandpriceholder.innerHTML = grandamount;
     recieptitems = +recieptitems - 1;
  snolabel.innerHTML = recieptitems;
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

