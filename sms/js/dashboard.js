var success = "&#9989; Success";
var failed = "&#10060; Failed";
var warning = "&#10071; Warning";
var today = new Date();
var email;
var thismonth,previousmonth,previousmonthcredit,thismonthcredit;
var datetoday = today.toLocaleDateString();
let usernamedisplay = document.getElementById('usernamedisplay');
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();

// get prevous month 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const previousMonthIndex = currentDate.getMonth() - 1;
const previousMonthName = months[previousMonthIndex];
var businessdiv = 0;
var businessdivcredit = 0;

// start of the code
let lbthismonthsale = document.getElementById('lbthismonthsale');
let lbcurrentmonth = document.getElementById('lbcurrentmonth');
let lbcurent = document.getElementById('lbcurent');
let lbprevios = document.getElementById('lbprevios');
let lbloancurent = document.getElementById('lbloancurent');
let lbloanprevios = document.getElementById('lbloanprevios');
let lbgrowth = document.getElementById('lbgrowth');
let lbgrowthcredit = document.getElementById('lbgrowthcredit');
let cardpreviousmonth = document.getElementById('cardpreviousmonth');
let cardcurrentmonth = document.getElementById('cardcurrentmonth');



/*=======================================*/ 
// get business details for newly logined in 
 // Retrieve data from Firebase database
var Bname,Baddress,Bphone,Bemail,Bregion,Btown;
      var ref = firebase.database().ref("Mybusiness");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
          Bname = childData.BusinessName;
          Bemail = childData.Email;
          Bphone = childData.Phone;
          Baddress = childData.Address;
          Bregion = childData.Region;
          Btown = childData.Town;
            
             console.log(Bname + "Here");

          // Create an array to keep business data
          let myArray = [Bname, Bemail, Bphone, Baddress,Bregion,Btown];

         // Convert the array to a string and store it in local storage
         localStorage.setItem('BusinessDetails', JSON.stringify(myArray));

         // Retrieve the array from local storage and parse it back into an array
        let storedBusiness = JSON.parse(localStorage.getItem('BusinessDetails'));

          // Access a specific index of the array
         lbbusinessname = document.getElementById('lbbusinessname');
         lbbusinessname.innerHTML = storedBusiness[0];
          
        });
      });

// count all deliveries not done
function countStatusZeroTimestamps() {
  const path = '/Mystoresale'; // Adjust the path as per your database structure
  const reference = firebase.database().ref(path);

  reference.once('value')
    .then(snapshot => {
      // Prepare the table HTML
      let tableHTML = '<table border="1"><tr><th>Store Staff</th><th>Number of Pending Deliveries</th></tr>';

      snapshot.forEach(agentSnapshot => {
        const agentKey = agentSnapshot.key;
        let statusZeroCount = 0;

        agentSnapshot.forEach(timestampSnapshot => {
          const status = timestampSnapshot.child('Status').val();
          if (status === 0) {
            statusZeroCount++;
          }
        });

        // Add a row for each agent
        tableHTML += `<tr><td>${agentKey}</td><td>${statusZeroCount}</td></tr>`;
      });

      // Close the table tag
      tableHTML += '</table>';

      // Display the table in the specified container
      document.getElementById('statusTableContainer').innerHTML = tableHTML;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Example usage
countStatusZeroTimestamps();

// all complete deliveries per staff
function countStatusCompleteTimestamps() {
  const path = 'Mystoresale'; // Adjust the path as per your database structure
  const reference = firebase.database().ref(path);

  reference.once('value')
    .then(snapshot => {
      // Prepare the table HTML
      let tableHTML = '<table border="1"><tr><th>Store Staff</th><th>Number of Complete Deliveries</th></tr>';

      snapshot.forEach(agentSnapshot => {
        const agentKey = agentSnapshot.key;
        let statusOneCount = 0;

        agentSnapshot.forEach(timestampSnapshot => {
          const status = timestampSnapshot.child('Status').val();
          if (status === 1) {
            statusOneCount++;
          }
        });

        // Add a row for each agent
        tableHTML += `<tr><td>${agentKey}</td><td>${statusOneCount}</td></tr>`;
      });

      // Close the table tag
      tableHTML += '</table>';

      // Display the table in the specified container
      document.getElementById('statusTableContainerforComplete').innerHTML = tableHTML;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Example usage
countStatusCompleteTimestamps()
// count customers in the system

function countStatusCustomers() {
  const path = 'Mycustomer'; // Adjust the path as per your database structure
  const reference = firebase.database().ref(path);

  let statusZeroCount = 0;
  let statusOneCount = 0;

  reference.once('value')
    .then(snapshot => {
      snapshot.forEach(customerSnapshot => {
        const status = customerSnapshot.child('Status').val();
        if (status === 0) {
          statusZeroCount++;
        } else if (status === 1) {
          statusOneCount++;
        }
      });

      // Display the count results
      const countResultsHTML = `
        <p>Active : ${statusOneCount}</p>
        <p>Not Active : ${statusZeroCount}</p>
        
      `;

      document.getElementById('totaluserdisplay').innerHTML = countResultsHTML;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Example usage
countStatusCustomers();

// count suppliers in the system

function countStatusSupplier() {
  const path = 'Mysupplier'; // Adjust the path as per your database structure
  const reference = firebase.database().ref(path);

  let statusZeroCount = 0;
  let statusOneCount = 0;

  reference.once('value')
    .then(snapshot => {
      snapshot.forEach(supplierSnapshot => {
        const status = supplierSnapshot.child('Status').val();
        if (status === 0) {
          statusZeroCount++;
        } else if (status === 1) {
          statusOneCount++;
        }
      });

      // Display the count results
      const countResultsHTML = `
        <p>Active : ${statusOneCount}</p>
        <p>Not Active : ${statusZeroCount}</p>
        
      `;

      document.getElementById('totalsupplierdisplay').innerHTML = countResultsHTML;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Example usage
countStatusSupplier();


// end of the code
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
         lbbusinessname.innerHTML = storedBusiness[0];



 auth.onAuthStateChanged(function(user){
      if(user){
        var email = user.email;
        //check the role and open page
         
      const database = firebase.database();

// Function to find a staff member's role by email
function findStaffRoleByEmail(email) {
  const staffRef = database.ref('Mystaff');

  return staffRef.once('value')
    .then((snapshot) => {
      let role = null;
      snapshot.forEach((childSnapshot) => {
        const staffMember = childSnapshot.val();
        if (staffMember.Email === email) {
          role = staffMember.Role;
          return true; // Break the loop if the email is found
        }
      });
      return role;
    })
    .catch((error) => {
      //console.error('Error finding staff member role:', error);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      throw error;
    });
}

// Example usage:
const targetEmail = email; // The email to search for

findStaffRoleByEmail(targetEmail)
  .then((role) => {
    if (role) {
       // open pages accodingly
      console.log(role);
      if (role == "Admin") {
       // window.location.href='dashboard.html';
        usernamedisplay.innerHTML = email;
      }
      if (role == "Cashier") {

       window.location.href='../cashier/saledesk.html';
      }
      if (role == "SalesLead") {
        window.location.href='../sales/saledesk.html';
      }

    } else {
      //console.log('Staff member not found with email:', targetEmail);
      myAlert(failed, "You have not been given access to the the system kindly contact admin");
      // Handle the case when the staff member is not found
    }
  })
  .catch((error) => {
    // Handle the error
  });
  
  
      }else{
        //myAlert("No Active user");
        window.location.href='../index.html';
      }
    })


// hide tabs cashier
   function hideElementsByClassName(className) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
   console.log(i);
  }
}