let btngenerate = document.getElementById('btngenerate');
let mdk = document.getElementById('mdk');
let mlw = document.getElementById('mlw');
let mpt = document.getElementById('mpt');
let mlr = document.getElementById('mlr');
let fdk = document.getElementById('fdk');
let flw = document.getElementById('flw');
let fpt = document.getElementById('fpt');
let flr = document.getElementById('flr');
let childgen = document.getElementById('childgen');

btngenerate.addEventListener("click", ()=> {

	

// mother	
mdkvalue = mdk.value;
mlwvalue = mlw.value;
mptvalue = mpt.value;
mlrvalue = mlr.value;
// father
fdkvalue = fdk.value;
flwvalue = flw.value;
fptvalue = fpt.value;
flrvalue = flr.value;

// child 
let cdkvalue = 0;
let clwvalue = 0;
let cptvalue = 0;
let clrvalue = 0;


cdkvalue = 0.75 * parseFloat(fdkvalue) + 0.25 * parseFloat(mdkvalue);
clwvalue = 0.75 * parseFloat(flwvalue) + 0.25 * parseFloat(mlwvalue);
cptvalue = 0.75 * parseFloat(fptvalue) + 0.25 * parseFloat(mptvalue);
clrvalue = 0.75 * parseFloat(flrvalue) + 0.25 * parseFloat(mlrvalue);

childgen.innerHTML = "DK : " + cdkvalue + "," + "CL : " + clwvalue + "," + "PT : " + cptvalue + "," + "LR : " + clrvalue + "," ;

console.log(cdkvalue);
})