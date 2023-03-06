

/*const dbRef = firebase.database().ref("Application"); // replace with your node path
const queryRef = dbRef.orderByChild("Status").equalTo("0"); // replace with your key and value
queryRef.on("value", (snapshot) => {
  const dataList = [];
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    dataList.push(data);
  });
  // display the list however you like
  console.log(dataList);
});*/

// Get a reference to the database service
    const database = firebase.database();

    // Query the database to get data with a specific value
    const query = database.ref("Application").orderByChild("Status").equalTo("0");

    // Attach an event listener to the query to get the data and display it in the HTML table
    query.on("value", function(snapshot) {
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
        document.getElementById("table-body").appendChild(tableRow);
      });
    });
  

