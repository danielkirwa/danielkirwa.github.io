var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
const mailField = document.getElementById('useremail');
const labels = document.getElementById('lbreset');
const sendresetlink = document.getElementById('sendresetlink');

let backlogin = document.getElementById('backlogin');

backlogin.addEventListener("click", () =>{
    window.location.href='index.html';
})



//auth.languageCode = 'DE_de';

auth.useDeviceLanguage();

const resetPasswordFunction = () => {
    const email = mailField.value;

    auth.sendPasswordResetEmail(email)
    .then(() => {
        myAlert(success, "<b style=\"color:greed;\">Reset link have been successfully sent to the email below check your inbox and  follow instruction</b>" + email);
        mailField.value = "";
    })
    .catch(error => {
        let message = error.message;
        myAlert(failed, message)
        mailField.value = "";
    })
}


sendresetlink.addEventListener('click', resetPasswordFunction);

//Animations
mailField.addEventListener('focus', () => {
    labels.item(0).className = "focused-field";
});

mailField.addEventListener('blur', () => {
    if(!mailField.value)
        labels.item(0).className = "unfocused-field";
});

/// get business name and data 

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];


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
