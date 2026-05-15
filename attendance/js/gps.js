let btnAdd = document.getElementById("btnaddcourse");

  // event
  btnAdd.addEventListener("click", () => {

    // inputs
    let venueName = document.getElementById("txtvenuename").value.trim();
    let venueCode = document.getElementById("txtvenuecode").value.trim();
    let longitude = document.getElementById("txtlongitude").value.trim();
    let latitude = document.getElementById("txtlatitude").value.trim();
    // select status for html dropdown 
    let status = document.querySelector("select").value;
    // get create by 
      let user = firebase.auth().currentUser;
      let createdby = user.email;
      let timenow = Date.now(); 

    // validation
    if (venueName == "") {
      alert("Enter venue name");
      return;
    }
    // check if venue code is empty the return code stops here
    if (venueCode == "") {
      alert("Enter venue code");
      return;
    }
    // check if longitude is empty the return code stops here
    if (longitude == "") {
      alert("Enter longitude");
      return;
    }
    // check if latitude is empty the return code stops here
    if (latitude == "") {
      alert("Enter latitude");
      return;
    }

    // firebase insert
    firebase.database().ref("GpsVenus/" + venueCode).set({
      VenueName: venueName,
      VenueCode: venueCode,
      Status: status,
      Longitude: longitude,
      Latitude: latitude,
      CreatedAt: timenow,
      CreatedBy: createdby
    })

    .then(() => {
      alert("GPS added successfully");

      // clear inputs
      document.getElementById("txtvenuename").value = "";
      document.getElementById("txtvenuecode").value = "";
      document.getElementById("txtlongitude").value = "";
      document.getElementById("txtlatitude").value = "";
      loaddata();
      document.getElementById("txtvenuecode").disabled = false;
      document.getElementById("btnaddcourse").innerText = "Add new GPS";
    })
    .catch((error) => {
      alert(error.message);
    });
  });

function loaddata(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebody");
  // load data
  firebase.database().ref("GpsVenus").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "active"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.VenueCode}</td>
            <td>${data.VenueName}</td>
            <td>${data.Latitude}</td>
            <td>${data.Longitude}</td>

            <td>
              <button class="btn btnred" onclick="closeVenue('${key}')">
                Close GPS Venue
              </button>

              <button class="btn btnblue" onclick="editVenue('${key}')">
                Edit GPS
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddata();


 // function to close venue (set inactive)
  function closeVenue(venueCode) {

    let confirmClose = confirm("Are you sure you want to close this GPS venue?");

    if (!confirmClose) return;

    firebase.database().ref("GpsVenus/" + venueCode).update({
      Status: "inactive"
    })
    .then(() => {
      alert("GPS Venue closed successfully");
    })
    .catch((error) => {
      alert(error.message);
    });

  }


  // function to prepare edit 


function editVenue(venueCode){
  firebase.database().ref("GpsVenus/" + venueCode).once("value")
    .then((snapshot) => {

      let data = snapshot.val();

      // fill form
      document.getElementById("txtvenuename").value = data.VenueName;
      document.getElementById("txtvenuecode").value = data.VenueCode;
      document.getElementById("txtlongitude").value = data.Longitude;
      document.getElementById("txtlatitude").value = data.Latitude;

      document.querySelector("select").value = data.Status;

      // lock venue code
      document.getElementById("txtvenuecode").disabled = true;

      // enable edit mode
      editMode = true;
      editKey = venueCode;

      // change button text
      document.getElementById("btnaddcourse").innerText = "Update GPS";

    });

}

// load data of inactive venue



function loaddatainactive(){
  // Load venue to the table
   // table body
  let tableBody = document.getElementById("tablebodyinactive");
  // load data
  firebase.database().ref("GpsVenus").on("value", (snapshot) => {
    // clear table first
    tableBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      let key = childSnapshot.key; // venueCode key help in modification
      // only active venues
      if(data.Status == "inactive"){
        tableBody.innerHTML += `
          <tr>
            <td>${data.VenueCode}</td>
            <td>${data.VenueName}</td>
            <td>${data.Latitude}</td>
            <td>${data.Longitude}</td>

            <td>
              <button class="btn btngreen" onclick="activatevenue('${key}')">
                Activate GPS Venue
              </button>
            </td>

          </tr>

        `;
      }

    });

  });
}

loaddatainactive();


// function to open venue (set active)
  function activatevenue(venueCode) {

    let confirmClose = confirm("Are you sure you want to open this GPS venue?");

    if (!confirmClose) return;

    firebase.database().ref("GpsVenus/" + venueCode).update({
      Status: "active"
    })
    .then(() => {
      alert("GPS Venue opened successfully");
    })
    .catch((error) => {
      alert(error.message);
    });

  }



// count

let lbtoTotalActiveGps = document.getElementById('lbtoTotalActiveGps')
firebase.database().ref("GpsVenus").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active"){
      total++
    }

  })
  lbtoTotalActiveGps.innerHTML = total
})
// inactive 
let lbtoTotalInactiveGps = document.getElementById('lbtoTotalInactiveGps')
firebase.database().ref("GpsVenus").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "inactive"){
      total++
    }

  })
  lbtoTotalInactiveGps.innerHTML = total
})