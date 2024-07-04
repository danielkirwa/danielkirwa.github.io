let btngenerate = document.getElementById('btngenerate');
let name = document.getElementById('name')
let count = document.getElementById('count')
let cost = document.getElementById('cost')
let vat = document.getElementById('vat')
let enddate = document.getElementById('end-date')
let selectElement = document.getElementById('product')
let serial = document.getElementById('serial');

let lbcustomername = document.getElementById('lbcustomername');
let lbvaliddate = document.getElementById('lbvaliddate');
let lbproductname = document.getElementById('lbproductname');
let lbserialnumber = document.getElementById('lbserialnumber');
let productCount = document.getElementById('productCount');
let productPrice = document.getElementById('productPrice');
let productTotalPrice = document.getElementById('productTotalPrice');
let lbvat = document.getElementById('lbvat');
let lblessvat = document.getElementById('lblessvat');
let lbgradetotal = document.getElementById('lbgradetotal');

         function showAlert(title, message) {
            document.getElementById('alertTitle').innerText = title;
            document.getElementById('alertMessage').innerText = message;
            document.getElementById('myAlert').style.display = 'block';
        }

        function closeAlert() {
            document.getElementById('myAlert').style.display = 'none';
        }

btngenerate.addEventListener("click" , () =>{
newname = name.value;
newcount = count.value;
newcost = cost.value;
newvat = vat.value;
newenddate = enddate.value;
newselectElement = selectElement.value;
newserial = serial.value;
   
    var emptyFields = [];

            if (!newname) {
                emptyFields.push("Name");
            }
            if (!newcount) {
                emptyFields.push("Count");
            }
            if (!newcost) {
                emptyFields.push("Cost");
            }
            if (!newvat) {
                emptyFields.push("VAT");
            }
            if (!newenddate) {
                emptyFields.push("End Date");
            }
            if (!newselectElement) {
                emptyFields.push("Product");
            }
             if (!newserial) {
                emptyFields.push("Serial");
            }

            if (emptyFields.length > 0) {
               var alertTitle = "Form Validation Error";
                var alertMessage = "Please fill in the following fields: " + emptyFields.join(", ");
                showAlert(alertTitle, alertMessage);
            } else {
                 lbcustomername.innerText = newname;
                 lbvaliddate.innerText = newenddate;
                 lbproductname.innerText = newselectElement;
                 lbserialnumber.innerText = newserial;
                 productCount.innerHTML = newcount;
                 productPrice.innerHTML = "Ksh. " + (newcost) + ".00";
                 productTotalPrice.innerHTML = "Ksh. " +  (newcost * newcount) + ".00";
                 lbvat.innerHTML = ((newcost * newcount) * (0.1379)).toFixed(2);
                 lblessvat.innerHTML = ((newcost * newcount) - ((newcost * newcount) * (0.1379))).toFixed(2);
                 lbgradetotal.innerHTML = (newcost * newcount) + ".00";
            }



})



function updateProductFeatures() {
            var selectedProduct = document.getElementById('product').value;
            var productNameLabel = document.getElementById('productName');
            var productFeaturesList = document.getElementById('productFeatures');

            // Clear previous features
            productFeaturesList.innerHTML = '';

            // Update product name label
            productNameLabel.textContent = selectedProduct;

            // Add features based on selected product
            switch (selectedProduct) {
                case 'Vehicle Tracking Solution':
                    addFeatures([
                        'Show Realtime status of the vehicle (engine off/on) moving in real-time.',
                        'Historical playback on vehicle movements',
                        'Vehicle visible on google maps with accuracy',
                        'Geo fencing capabilities on multiple areas',
                        'Several alerts on events and action reminders',
                        'Automated fleets reports',
                        'Remote engine cut off in real-time.',
                        'Virtual mileage reader',
                        'Reports can be downloaded on PDF, HTML and Excel formats',
                        'Access via web or mobile app'
                    ]);
                    break;
                case 'Fuel Monitoring Solution':
                    addFeatures([
                        'Realtime Location of the vehicles on google maps',
                        'Current status of the vehicles',
                        'Mileage reports',
                        'Fuel consumption report',
                        'Fuel wastage alerts and reports',
                        'Fuel theft alerts and reports',
                        'Geo fencing capabilities on multiple areas',
                        'Historical playback on vehicle movements',
                        'Service and maintenance reminders',
                        'Access via web or mobile app',
                        'Regular service and device maintenance'
                    ]);
                    break;
                case 'Car Alarms':
                    addFeatures([
                        'Doors closing and opening – accessibility',
                        'Antitheft alert',
                        'Unauthorized driving engine switch off'
                    ]);
                    break;
                default:
                    productNameLabel.textContent = 'Product name here';
                    break;
            }
        }

        function addFeatures(features) {
            var productFeaturesList = document.getElementById('productFeatures');
            features.forEach(function(feature) {
                var li = document.createElement('li');
                li.textContent = feature;
                productFeaturesList.appendChild(li);
            });
        }
 