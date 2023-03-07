
let applicationcount = document.getElementById('applicationcount');
let bookingcount = document.getElementById('bookingcount');

// Get a reference to the database service
    const database = firebase.database();

    // Query the database to get data with a specific value for application that are pending
    const applicationquery = database.ref("Application").orderByChild("Status").equalTo("0");

    // Attach an event listener to the query to get the data and display it in the HTML table
    applicationquery.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const tableRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        const courseCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const phoneCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const actionCell = document.createElement("button");
        nameCell.innerHTML = childData.StudentName;
        courseCell.innerHTML = childData.CourseName;
        emailCell.innerHTML = childData.Email;
        phoneCell.innerHTML = childData.PhoneNumber;
        dateCell.innerHTML = childData.EnrollDate;
        actionCell.innerHTML = "View Details";
        actionCell.value = childData.Email;
        tableRow.appendChild(nameCell);
        tableRow.appendChild(courseCell);
        tableRow.appendChild(emailCell);
        tableRow.appendChild(phoneCell);
        tableRow.appendChild(dateCell);
        tableRow.appendChild(actionCell);
        document.getElementById("table-applications").appendChild(tableRow);

      });
    });


    // Query the database to get data with a specific value
    const bookingquery = database.ref("Bookings").orderByChild("Status").equalTo("0");

    // Attach an event listener to the query to get the data and display it in the HTML table
    bookingquery.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const tableRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        const serviceCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const phoneCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const actionCell = document.createElement("button");
        nameCell.innerHTML = childData.StudentName;
        serviceCell.innerHTML = childData.CourseName;
        emailCell.innerHTML = childData.Email;
        phoneCell.innerHTML = childData.PhoneNumber;
        dateCell.innerHTML = childData.EnrollDate;
        actionCell.innerHTML = "View Details";
        actionCell.value = childData.Email;
        tableRow.appendChild(nameCell);
        tableRow.appendChild(serviceCell);
        tableRow.appendChild(emailCell);
        tableRow.appendChild(phoneCell);
        tableRow.appendChild(dateCell);
        tableRow.appendChild(actionCell);
        document.getElementById("table-bookings").appendChild(tableRow);

      });
    });




// get application count
    var applicationCount = database.ref("Application");
    applicationCount.once("value", function(snapshot) {
  var applycount = snapshot.numChildren();
  applicationcount.innerHTML = applycount;
});
// get booking count
    var bookingCount = database.ref("Bookings");
    bookingCount.once("value", function(snapshot) {
  var bookcount = snapshot.numChildren();
  bookingcount.innerHTML = bookcount;
});
